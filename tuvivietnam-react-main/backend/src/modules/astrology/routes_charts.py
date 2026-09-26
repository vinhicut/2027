import sys
import os
from flask import Blueprint, request, jsonify, g

from modules.auth.auth import login_required
from core.db import save_user_chart, get_latest_user_chart, get_user_charts_list
from modules.astrology.tuvi_engine import calculate_tuvi_chart

charts_bp = Blueprint("charts", __name__, url_prefix="/api")

@charts_bp.route("/calculate", methods=["POST"])
def calculate_chart():
    """
    Endpoint tính toán và an sao Tử Vi Đẩu Số (Core Algorithm).
    Duy trì 100% tương thích ngược với API hiện hữu.
    """
    try:
        params = request.get_json(silent=True) or {}
        chart_result = calculate_tuvi_chart(params)
        return jsonify(chart_result), 200
    except Exception as e:
        return jsonify({
            "error": str(e),
            "message": "Không thể tính toán lá số với tham số đã cung cấp."
        }), 500

@charts_bp.route("/user/charts", methods=["POST"])
@login_required
def save_chart_endpoint():
    """
    Endpoint lưu dữ liệu lá số vào cơ sở dữ liệu có cấu trúc cố định.
    Yêu cầu người dùng đã đăng nhập (User hoặc Manager).
    """
    data = request.get_json(silent=True) or {}
    user_id = g.current_user["id"]

    chart_code = str(data.get("chart_code") or "").strip()
    ho_ten = str(data.get("ho_ten") or "").strip() or "Vô Danh"
    gioi_tinh = str(data.get("gioi_tinh") or "Nam").strip()
    ngay_sinh = int(data.get("ngay_sinh") or 1)
    thang_sinh = int(data.get("thang_sinh") or 1)
    nam_sinh = int(data.get("nam_sinh") or 2000)
    gio_sinh = int(data.get("gio_sinh") or 0)
    phut_sinh = int(data.get("phut_sinh") or 0)
    loai_lich = str(data.get("loai_lich") or "duong_lich").strip()
    thang_nhuan = 1 if data.get("thang_nhuan") else 0
    nam_xem_han = int(data.get("nam_xem_han") or 2026)

    input_data = data.get("input_data") or {}
    chart_data = data.get("chart_data") or {}

    if not chart_code:
        chart_code = f"HA-{nam_sinh}{thang_sinh:02d}{ngay_sinh:02d}"

    try:
        saved_record = save_user_chart(
            user_id=user_id,
            chart_code=chart_code,
            ho_ten=ho_ten,
            gioi_tinh=gioi_tinh,
            ngay_sinh=ngay_sinh,
            thang_sinh=thang_sinh,
            nam_sinh=nam_sinh,
            gio_sinh=gio_sinh,
            phut_sinh=phut_sinh,
            loai_lich=loai_lich,
            thang_nhuan=thang_nhuan,
            nam_xem_han=nam_xem_han,
            input_data=input_data,
            chart_data=chart_data
        )
        return jsonify({
            "status": "success",
            "message": f"Đã lưu thành công lá số {chart_code} của {ho_ten} lên website!",
            "data": saved_record
        }), 201
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Lỗi khi lưu dữ liệu lá số: {str(e)}"
        }), 500

@charts_bp.route("/user/charts/latest", methods=["GET"])
@login_required
def get_latest_chart_endpoint():
    """
    Endpoint truy xuất lá số đã lưu gần nhất của người dùng hiện tại
    để phục vụ tính năng auto-fill khi tải lại trang.
    """
    user_id = g.current_user["id"]
    try:
        latest = get_latest_user_chart(user_id)
        if not latest:
            return jsonify({
                "status": "success",
                "message": "Chưa có lá số nào được lưu trước đó.",
                "data": None
            }), 200

        return jsonify({
            "status": "success",
            "message": "Đã tìm thấy lá số gần nhất.",
            "data": latest
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Lỗi khi truy xuất lá số gần nhất: {str(e)}"
        }), 500

@charts_bp.route("/user/charts", methods=["GET"])
@login_required
def get_user_charts_endpoint():
    """Lấy danh sách các lá số người dùng đã lưu."""
    user_id = g.current_user["id"]
    limit = min(int(request.args.get("limit", 20)), 100)
    offset = int(request.args.get("offset", 0))

    try:
        charts = get_user_charts_list(user_id, limit=limit, offset=offset)
        return jsonify({
            "status": "success",
            "data": charts
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Lỗi khi tải danh sách lá số: {str(e)}"
        }), 500
