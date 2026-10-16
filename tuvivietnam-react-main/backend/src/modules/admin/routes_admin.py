from flask import Blueprint, request, jsonify, g
from modules.auth.auth import role_required
from core.db import admin_get_users, admin_get_charts, admin_get_stats
from core.node_api_proxy import proxy_customer_api

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

@admin_bp.route("/customer-logs/charts", methods=["GET"])
@role_required("manager")
def list_customer_chart_logs():
    return proxy_customer_api("/api/admin/customer-logs/charts")

@admin_bp.route("/customer-logs/charts/<int:chart_id>", methods=["DELETE"])
@role_required("manager")
def delete_customer_chart_log(chart_id):
    return proxy_customer_api(f"/api/admin/customer-logs/charts/{chart_id}")

@admin_bp.route("/customer-accounts", methods=["GET"])
@role_required("manager")
def list_google_customer_accounts():
    return proxy_customer_api("/api/admin/customer-accounts")

@admin_bp.route("/customer-accounts/<int:account_id>", methods=["DELETE"])
@role_required("manager")
def delete_google_customer_account(account_id):
    return proxy_customer_api(f"/api/admin/customer-accounts/{account_id}")

@admin_bp.route("/customer-logs/charts/<int:chart_id>/image", methods=["GET"])
@role_required("manager")
def get_customer_chart_image(chart_id):
    return proxy_customer_api(f"/api/admin/customer-logs/charts/{chart_id}/image")
