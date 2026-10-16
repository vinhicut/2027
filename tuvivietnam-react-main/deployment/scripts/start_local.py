#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Start all local Tu Vi website services."""

import os
import shutil
import subprocess
import sys
import time
import socket
import urllib.error
import urllib.request
import webbrowser


def wait_for(url, process=None, attempts=30):
    for _ in range(attempts):
        if process is not None and process.poll() is not None:
            return False
        try:
            with urllib.request.urlopen(url, timeout=1) as response:
                if response.status == 200:
                    return True
        except (urllib.error.URLError, OSError):
            time.sleep(1)
    return False


def port_is_open(port):
    try:
        with socket.create_connection(("127.0.0.1", port), timeout=0.5):
            return True
    except OSError:
        return False


def main():
    project_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    frontend_dir = os.path.join(project_dir, "frontend")
    backend_dir = os.path.join(project_dir, "backend", "src")
    server_script = os.path.join(backend_dir, "server.py")
    node_dir = os.path.join(project_dir, "backend-node")
    compose_file = os.path.join(node_dir, "docker-compose.yml")
    env_file = os.path.join(node_dir, ".env")
    docker = shutil.which("docker") or shutil.which("docker.exe")
    docker_services_started = False
    if not docker and os.name == "nt":
        for candidate in (
            os.path.join(os.environ.get("ProgramFiles", r"C:\Program Files"), "Docker", "Docker", "resources", "bin", "docker.exe"),
            os.path.join(os.environ.get("LOCALAPPDATA", ""), "Programs", "Docker", "Docker", "resources", "bin", "docker.exe"),
        ):
            if os.path.isfile(candidate):
                docker = candidate
                break
    npm = "npm.cmd" if os.name == "nt" else "npm"

    print("Starting all website services...")
    if not os.path.isfile(env_file):
        print("Missing backend-node/.env. Copy .env.example to .env and configure DB_PASSWORD and MYSQL_ROOT_PASSWORD.")
        return 1
    if docker:
        try:
            subprocess.run([docker, "compose", "version"], check=True, capture_output=True)
            subprocess.run(
                [docker, "compose", "-f", compose_file, "--env-file", env_file, "up", "-d", "--build"],
                cwd=project_dir,
                check=True,
            )
            docker_services_started = True
        except (OSError, subprocess.CalledProcessError) as exc:
            print(f"Docker Compose unavailable; continuing without database services: {exc}")
            docker = None
    else:
        print("Docker not installed; continuing without MySQL and phpMyAdmin.")

    phpmyadmin_url = "http://localhost:8082" if docker_services_started else "http://localhost/phpmyadmin/"
    xampp_started = False
    if not docker_services_started:
        xampp_start = r"C:\xampp\xampp_start.exe"
        if os.name == "nt" and os.path.isfile(xampp_start) and not (port_is_open(80) and port_is_open(3306)):
            print("Starting XAMPP Apache and MySQL for phpMyAdmin...")
            try:
                creationflags = getattr(subprocess, "CREATE_NO_WINDOW", 0)
                subprocess.Popen([xampp_start], cwd=r"C:\xampp", creationflags=creationflags)
                xampp_started = True
            except OSError as exc:
                print(f"Could not start XAMPP: {exc}")
        if xampp_started and not wait_for(phpmyadmin_url, attempts=30):
            print("XAMPP started, but phpMyAdmin did not respond at http://localhost/phpmyadmin/.")

    if not os.path.isdir(os.path.join(frontend_dir, "node_modules")):
        print("Installing frontend dependencies...")
        try:
            subprocess.run([npm, "install"], cwd=frontend_dir, check=True)
        except (OSError, subprocess.CalledProcessError) as exc:
            print(f"Frontend dependency installation failed: {exc}")
            return 1

    python_exe = sys.executable
    venv_python = os.path.abspath(os.path.join(project_dir, "..", ".venv", "Scripts", "python.exe"))
    if os.path.isfile(venv_python):
        python_exe = venv_python

    processes = []
    try:
        if not os.path.isfile(server_script):
            print(f"Python backend not found: {server_script}")
            return 1
        print("Starting Flask Core API on port 8080...")
        backend = subprocess.Popen([python_exe, "-X", "utf8", server_script], cwd=backend_dir)
        processes.append(backend)
        if not wait_for("http://127.0.0.1:8080/api/health", backend, attempts=20):
            print("Flask backend did not become ready. Check Python dependencies and port 8080.")
            return 1

        mysql_available = docker_services_started or port_is_open(3307) or port_is_open(3306)
        if mysql_available:
            print("Starting Node Customer API...")
            customer_api = subprocess.Popen([npm, "start"], cwd=node_dir)
            processes.append(customer_api)
            if not wait_for("http://127.0.0.1:3001/api/health", customer_api, attempts=15):
                print("Customer API could not start; check its MySQL settings.")
                if customer_api.poll() is None:
                    customer_api.terminate()
                processes.remove(customer_api)
        else:
            print("MySQL is not running; skipping Node Customer API (it requires MySQL to start).")

        print("Starting React/Vite frontend on port 5173...")
        frontend = subprocess.Popen([npm, "run", "dev", "--", "--host", "0.0.0.0", "--strictPort"], cwd=frontend_dir)
        processes.append(frontend)
        if not wait_for("http://127.0.0.1:5173", frontend, attempts=30):
            print("Frontend did not become ready. Check port 5173 and frontend dependencies.")
            return 1

        print("\nAll services are running:")
        print("  Frontend:     http://localhost:5173")
        print("  Flask API:    http://localhost:8080/api/health")
        print("  Customer API: http://localhost:3001/api/health")
        print(f"  phpMyAdmin:   {phpmyadmin_url}")
        print("Press Ctrl+C to stop the local processes and Docker services, if started.")
        webbrowser.open("http://localhost:5173")
        if wait_for(phpmyadmin_url, attempts=1):
            webbrowser.open(phpmyadmin_url)
        frontend.wait()
    except KeyboardInterrupt:
        print("\nStopping services...")
    finally:
        for process in reversed(processes):
            if process.poll() is None:
                process.terminate()
        if docker and os.path.isfile(env_file):
            subprocess.run(
                [docker, "compose", "-f", compose_file, "--env-file", env_file, "stop"],
                cwd=project_dir,
                check=False,
            )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
