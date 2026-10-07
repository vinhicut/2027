import logging
import os
import smtplib
import ssl
from email.message import EmailMessage

from flask import Blueprint, jsonify, request


booking_bp = Blueprint("booking", __name__, url_prefix="/api/booking")
logger = logging.getLogger(__name__)


def _env_flag(name: str, default: bool) -> bool:
    value = os.getenv(name)
    return default if value is None else value.strip().lower() in {"1", "true", "yes", "on"}


@booking_bp.route("", methods=["POST"])
def submit_booking():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Dữ liệu gửi lên không hợp lệ."}), 400

    name = str(data.get("name", "")).strip()
    phone = str(data.get("phone", "")).strip()
    topic = str(data.get("topic", "")).strip()

    if not name or len(name) > 120:
        return jsonify({"error": "Vui lòng nhập họ tên hợp lệ (tối đa 120 ký tự)."}), 400
    if not phone or len(phone) > 32:
        return jsonify({"error": "Vui lòng nhập số điện thoại hợp lệ."}), 400
    if not topic or len(topic) > 200:
        return jsonify({"error": "Vui lòng chọn nội dung tư vấn hợp lệ."}), 400

    smtp_host = os.getenv("SMTP_HOST", "").strip()
    smtp_user = os.getenv("SMTP_USER", "").strip()
    smtp_password = os.getenv("SMTP_PASSWORD", "")
    from_email = os.getenv("SMTP_FROM_EMAIL", smtp_user).strip()
    to_email = os.getenv("BOOKING_NOTIFICATION_EMAIL", "nguyenvinhvan90@gmail.com").strip()

    if not all((smtp_host, smtp_user, smtp_password, from_email, to_email)):
        return jsonify({"error": "Email nhận lịch hẹn chưa được cấu hình trên máy chủ."}), 503

    message = EmailMessage()
    message["Subject"] = "Thông tin đặt lịch tư vấn mới"
    message["From"] = from_email
    message["To"] = to_email
    message.set_content(
        "Bạn nhận được một yêu cầu đặt lịch tư vấn mới từ website Tử Vi Việt Nam.\n\n"
        f"Họ tên: {name}\n"
        f"Số điện thoại Zalo: {phone}\n"
        f"Nội dung cần tư vấn: {topic}\n"
    )

    try:
        port = int(os.getenv("SMTP_PORT", "587"))
        timeout = float(os.getenv("SMTP_TIMEOUT", "15"))
    except ValueError:
        return jsonify({"error": "Cấu hình SMTP trên máy chủ chưa hợp lệ."}), 503
    use_ssl = _env_flag("SMTP_USE_SSL", port == 465)
    use_tls = _env_flag("SMTP_USE_TLS", not use_ssl)

    try:
        if use_ssl:
            with smtplib.SMTP_SSL(
                smtp_host, port, timeout=timeout, context=ssl.create_default_context()
            ) as server:
                server.login(smtp_user, smtp_password)
                server.send_message(message)
        else:
            with smtplib.SMTP(smtp_host, port, timeout=timeout) as server:
                server.ehlo()
                if use_tls:
                    server.starttls(context=ssl.create_default_context())
                    server.ehlo()
                server.login(smtp_user, smtp_password)
                server.send_message(message)
    except (OSError, smtplib.SMTPException, ValueError):
        logger.exception("Failed to send booking notification email")
        return jsonify({"error": "Chưa gửi được email thông báo. Vui lòng thử lại sau."}), 502

    return jsonify({"message": "Đã gửi yêu cầu đặt lịch thành công."}), 200
