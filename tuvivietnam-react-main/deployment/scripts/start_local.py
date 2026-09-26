#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
start_local.py
Kịch bản 1-click khởi chạy toàn bộ hệ thống Website Tử Vi Hồng Ân.
Tự động:
  1. Kiểm tra & tự động giải phóng xung đột port 8080 & 5173 nếu có tiến trình treo cũ.
  2. Kiểm tra node_modules, tự động chạy 'npm install' nếu chưa có.
  3. Khởi chạy Backend Core Engine (Port 8080) và xác minh Health Check qua HTTP.
  4. Khởi chạy Frontend React/Vite dev server (Port 5173).
  5. Đợi hệ thống sẵn sàng và tự động mở trình duyệt.
  6. Bắt tín hiệu Ctrl+C để dừng đồng thời cả 2 tiến trình một cách an toàn.
"""

import os
import sys
import subprocess
import time
import webbrowser
import urllib.request
import urllib.error

def free_port(port):
    """Giải phóng cổng nếu bị chiếm giữ bởi tiến trình nền cũ (Windows)."""
    if os.name == 'nt':
        try:
            output = subprocess.check_output(f'netstat -ano | findstr :{port}', shell=True, text=True, stderr=subprocess.DEVNULL)
            pids = set()
            for line in output.strip().splitlines():
                parts = line.split()
                if len(parts) >= 5 and "LISTENING" in parts[3].upper():
                    pid = parts[-1]
                    if pid != '0' and int(pid) != os.getpid():
                        pids.add(pid)
            for pid in pids:
                print(f"🧹 Đang giải phóng cổng {port} (PID {pid})...")
                subprocess.run(f'taskkill /F /PID {pid}', shell=True, capture_output=True)
                time.sleep(0.5)
        except Exception:
            pass

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Dự án gốc nằm trên deployment/scripts 2 cấp
    if os.path.basename(script_dir) == "scripts":
        project_dir = os.path.abspath(os.path.join(script_dir, "..", ".."))
    else:
        project_dir = os.path.abspath(script_dir)

    frontend_dir = os.path.join(project_dir, "frontend")
    backend_dir = os.path.join(project_dir, "backend", "src")
    server_script = os.path.join(backend_dir, "server.py")
    os.chdir(project_dir)

    print("=" * 65)
    print("🚀 ĐANG KHỞI ĐỘNG HỆ THỐNG WEBSITE TỬ VI HỒNG ÂN")
    print(f"📂 Thư mục dự án: {project_dir}")
    print("=" * 65)

    # 1. Dọn dẹp tiến trình cũ chiếm dụng cổng 8080 và 5173
    free_port(8080)
    free_port(5173)

    # 2. Kiểm tra node_modules frontend
    node_modules_path = os.path.join(frontend_dir, "node_modules")
    if not os.path.exists(node_modules_path):
        print("📦 Chưa tìm thấy node_modules. Đang cài đặt thư viện (npm install)...")
        try:
            npm_cmd = "npm.cmd" if os.name == "nt" else "npm"
            subprocess.run([npm_cmd, "install"], cwd=frontend_dir, check=True)
            print("✅ Cài đặt thư viện frontend hoàn tất!")
        except Exception as e:
            print(f"❌ Lỗi khi cài đặt thư viện frontend: {e}")
            input("Nhấn Enter để thoát...")
            sys.exit(1)

    # 3. Khởi chạy Python Core Engine (backend/src/server.py)
    engine_process = None
    if os.path.exists(server_script):
        print("🔮 Đang khởi động Tu Vi Core Engine (Port 8080)...")
        engine_process = subprocess.Popen([sys.executable, server_script], cwd=backend_dir)

        # Chờ & kiểm tra Backend Health Check thực tế
        backend_ready = False
        health_url = "http://127.0.0.1:8080/api/health"
        for _ in range(15):
            time.sleep(0.4)
            if engine_process.poll() is not None:
                print(f"❌ Backend tiến trình đã dừng đột ngột (Exit Code: {engine_process.returncode})!")
                break
            try:
                with urllib.request.urlopen(health_url, timeout=1) as resp:
                    if resp.status == 200:
                        backend_ready = True
                        break
            except Exception:
                continue

        if backend_ready:
            print("✅ Tu Vi Core Engine đã sẵn sàng tại http://127.0.0.1:8080!")
        else:
            print("⚠️ Cảnh báo: Backend chưa phản hồi health-check, tiếp tục tiến trình...")
    else:
        print(f"⚠️ Cảnh báo: Không tìm thấy {server_script}, bỏ qua backend.")

    # 4. Khởi chạy Vite frontend server
    local_url = "http://localhost:5173"
    print("⚡ Đang khởi động Vite development server (Port 5173)...")
    npm_cmd = "npm.cmd" if os.name == "nt" else "npm"
    vite_process = subprocess.Popen([npm_cmd, "run", "dev"], cwd=frontend_dir)

    # 5. Chờ frontend sẵn sàng và tự động mở trình duyệt
    print("🌐 Đang chờ hệ thống sẵn sàng để mở trình duyệt...")
    opened = False
    for _ in range(30):
        time.sleep(0.5)
        try:
            with urllib.request.urlopen(local_url, timeout=1) as response:
                if response.status == 200:
                    print(f"🎉 Website đã sẵn sàng tại {local_url}!")
                    webbrowser.open(local_url)
                    opened = True
                    break
        except (urllib.error.URLError, ConnectionResetError, OSError):
            continue

    if not opened:
        webbrowser.open(local_url)

    print("\n" + "=" * 65)
    print("💡 HỆ THỐNG ĐANG HOẠT ĐỘNG HOÀN TOÀN:")
    print("   👉 Website Frontend:       http://localhost:5173")
    print("   👉 Tu Vi Core API Engine:  http://127.0.0.1:8080/api/calculate")
    print("   👉 API Health Check:       http://127.0.0.1:8080/api/health")
    print("   👉 Nhấn Ctrl + C để dừng tất cả dịch vụ an toàn.")
    print("=" * 65 + "\n")

    try:
        vite_process.wait()
    except KeyboardInterrupt:
        print("\n🛑 Đang dừng hệ thống...")
        if vite_process:
            vite_process.terminate()
        if engine_process:
            engine_process.terminate()
        print("👋 Đã dừng toàn bộ dịch vụ an toàn.")

if __name__ == "__main__":
    main()
