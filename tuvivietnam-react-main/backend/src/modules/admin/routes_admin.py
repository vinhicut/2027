from flask import Blueprint, request, jsonify, g
from modules.auth.auth import role_required
from core.db import admin_get_users, admin_get_charts, admin_get_stats

admin_bp = Blueprint("admin", __name__, url_prefix="/api/admin")

@admin_bp.route("/users", methods=["GET"])
@role_required("manager")
def list_users():
    """Xem danh sách toàn bộ người dùng trong hệ thống (Dành cho Quản lý)."""
    limit = min(int(request.args.get("limit", 50)), 200)
    offset = int(request.args.get("offset", 0))
    users = admin_get_users(limit=limit, offset=offset)
    return jsonify({
        "status": "success",
        "data": users
    }), 200

@admin_bp.route("/charts", methods=["GET"])
@role_required("manager")
def list_charts():
    """Xem danh sách toàn bộ lá số đã lưu trên website (Dành cho Quản lý)."""
    limit = min(int(request.args.get("limit", 50)), 200)
    offset = int(request.args.get("offset", 0))
    search = request.args.get("search", "").strip() or None
    charts = admin_get_charts(limit=limit, offset=offset, search=search)
    return jsonify({
        "status": "success",
        "data": charts
    }), 200

@admin_bp.route("/stats", methods=["GET"])
@role_required("manager")
def get_stats():
    """Xem thống kê tổng quan hệ thống (Dành cho Quản lý)."""
    stats = admin_get_stats()
    return jsonify({
        "status": "success",
        "data": stats
    }), 200
