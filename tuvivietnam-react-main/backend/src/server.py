#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
backend/server.py
Máy chủ HTTP & REST API phục vụ Website Tử Vi Hồng Ân (Official Production Release 2409).
Cung cấp:
  - REST API /api/calculate : Tính toán và an sao Tử Vi Đẩu Số 14 chính tinh & 110+ phụ tinh.
  - REST API /api/health    : Kiểm tra trạng thái máy chủ (Health Check).
  - REST API /api/auth      : Đăng nhập Google OAuth, kiểm tra phiên, dev-login.
  - REST API /api/admin     : Thống kê và quản trị tài khoản, danh sách lá số.
  - REST API /api/user      : Lưu trữ và tự động điền lá số gần nhất.
  - Phục vụ Static Files    : Ưu tiên 'release website 2409' -> 'dist' -> 'public'.
"""

import os
import sys
import json
import logging
from flask import Flask, request, jsonify, send_from_directory, Response
from werkzeug.serving import run_simple

# Thêm thư mục backend vào sys.path
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BACKEND_DIR, "..", ".."))

if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

# Nạp tự động các biến môi trường từ tệp .env nếu có
for env_file in [os.path.join(PROJECT_ROOT, ".env"), os.path.join(PROJECT_ROOT, "backend", ".env")]:
    if os.path.exists(env_file):
        try:
            with open(env_file, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        key, val = line.split("=", 1)
                        key = key.strip()
                        val = val.strip().strip("'\"")
                        if key not in os.environ:
                            os.environ[key] = val
        except Exception:
            pass

RELEASE_DIR = os.path.join(PROJECT_ROOT, "releases", "dist")
DIST_DIR = os.getenv("DIST_DIR", RELEASE_DIR)
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "frontend", "public")

from modules.astrology.tuvi_engine import calculate_tuvi_chart
from core.db import init_db
from modules.auth.routes_auth import auth_bp
from modules.admin.routes_admin import admin_bp
from modules.astrology.routes_charts import charts_bp

# Cấu hình mặc định
CONFIG = {
    "HOST": os.getenv("HOST", "0.0.0.0"),
    "PORT": int(os.getenv("PORT", "8080")),
    "CORS_ORIGIN": os.getenv("CORS_ORIGIN", "*"),
}


def create_app():
    """Khởi tạo và cấu hình ứng dụng Flask backend."""
    # Khởi tạo cơ sở dữ liệu SQLite / Firebase
    init_db()

    # Thư mục tĩnh ưu tiên: release website 2409 -> dist -> public
    static_folder = RELEASE_DIR if os.path.exists(RELEASE_DIR) else (DIST_DIR if os.path.exists(DIST_DIR) else PUBLIC_DIR)

    app = Flask(
        __name__,
        static_folder=static_folder,
        static_url_path=""
    )

    # Đăng ký các phân hệ API
    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(charts_bp)

    # Cấu hình CORS an toàn
    @app.after_request
    def set_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = CONFIG["CORS_ORIGIN"]
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, HEAD"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, If-None-Match"
        return response

    @app.route("/", defaults={"path": ""}, methods=["OPTIONS"])
    @app.route("/<path:path>", methods=["OPTIONS"])
    def options_handler(path=""):
        return Response("", status=200)

    # 1. API Health Check
    @app.route("/api/health", methods=["GET", "HEAD"])
    def api_health():
        static_label = "release website 2409" if os.path.exists(RELEASE_DIR) else ("dist" if os.path.exists(DIST_DIR) else "public")
        payload = {
            "status": "ok",
            "service": "Tu Vi Hong An Core API Engine",
            "version": "1.0.0-release-2409",
            "static_directory": static_label
        }
        return jsonify(payload)

    # 2. API Tính toán lá số Tử Vi Đẩu Số
    @app.route("/api/calculate", methods=["POST"])
    def api_calculate():
        content_type = request.headers.get("Content-Type", "")
        if "application/json" in content_type:
            params = request.get_json(silent=True) or {}
        else:
            try:
                raw_data = request.get_data(as_text=True)
                params = json.loads(raw_data) if raw_data else {}
            except Exception:
                params = {}

        try:
            chart_data = calculate_tuvi_chart(params)
            return jsonify(chart_data)
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # 3. Phục vụ tài nguyên tĩnh (Static Files & SPA fallback)
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_static_files(path):
        if not path or path == "/":
            path = "index.html"

        folder = app.static_folder

        # Chặn các tệp tin nguy hiểm
        forbidden_extensions = {".py", ".pyc", ".env", ".git", ".bak", ".swp", ".key", ".log", ".DS_Store"}
        forbidden_filenames = {".env", ".gitignore", "requirements.txt", "package.json", "vite.config.js"}
        base_name = os.path.basename(path).lower()
        ext = os.path.splitext(base_name)[1].lower()

        if base_name in forbidden_filenames or ext in forbidden_extensions or (base_name.startswith(".") and base_name not in (".", "..")):
            return Response("Quyền truy cập bị từ chối", status=403)

        target = os.path.join(folder, path)
        if os.path.isfile(target):
            return send_from_directory(folder, path)

        if os.path.isdir(target):
            index_path = os.path.join(target, "index.html")
            if os.path.isfile(index_path):
                return send_from_directory(target, "index.html")

        # SPA Fallback sang index.html nếu không phải là API request
        if not path.startswith("api/"):
            index_file = os.path.join(folder, "index.html")
            if os.path.isfile(index_file):
                return send_from_directory(folder, "index.html")

        return Response("Không tìm thấy trang yêu cầu", status=404)

    return app


def run_server(host: str = None, port: int = None):
    host = host or CONFIG["HOST"]
    port = port or CONFIG["PORT"]

    display_host = "localhost" if host in ["0.0.0.0", ""] else host
    static_folder = RELEASE_DIR if os.path.exists(RELEASE_DIR) else (DIST_DIR if os.path.exists(DIST_DIR) else PUBLIC_DIR)

    print("=" * 60)
    print("  🚀 MÁY CHỦ TỬ VI HỒNG ÂN - CORE API & AUTH ENGINE")
    print(f"  👉 API Endpoint:    http://{display_host}:{port}/api/calculate")
    print(f"  👉 Health Check:     http://{display_host}:{port}/api/health")
    print(f"  👉 Auth Endpoint:   http://{display_host}:{port}/api/auth/google")
    print(f"  👉 Static Files:     {static_folder}")
    print("=" * 60)
    print("  Nhấn Ctrl + C để dừng máy chủ.\n")

    app = create_app()

    # Tắt logging ồn ào của Werkzeug trên dev
    log = logging.getLogger("werkzeug")
    log.setLevel(logging.INFO)

    run_simple(
        hostname=host,
        port=port,
        application=app,
        use_reloader=False,
        use_debugger=False,
        threaded=True
    )


if __name__ == "__main__":
    p = CONFIG["PORT"]
    h = CONFIG["HOST"]
    if len(sys.argv) > 1:
        try:
            p = int(sys.argv[1])
        except ValueError:
            pass
    if len(sys.argv) > 2:
        h = sys.argv[2]
    run_server(h, p)
