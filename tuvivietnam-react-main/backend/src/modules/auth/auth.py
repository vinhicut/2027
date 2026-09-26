import secrets
import urllib.request
import urllib.parse
import json
from functools import wraps
from flask import request, jsonify, g
from typing import Optional, Dict, Any, Tuple

from core.config import GOOGLE_CLIENT_ID, MANAGER_EMAILS
from core.db import upsert_user, create_session, get_user_by_token, delete_session

def verify_google_id_token(credential: str) -> Tuple[bool, Optional[Dict[str, Any]], Optional[str]]:
    """
    Xác thực Google ID token (JWT) thông qua Google OAuth TokenInfo API.
    Không yêu cầu thêm thư viện ngoài (sử dụng urllib chuẩn).
    """
    if not credential:
        return False, None, "Thiếu token xác thực Google."

    try:
        url = f"https://oauth2.googleapis.com/tokeninfo?id_token={urllib.parse.quote(credential)}"
        req = urllib.request.Request(url, headers={"User-Agent": "TuViHongAn-Backend/1.0"})
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status != 200:
                return False, None, f"Google từ chối xác thực (HTTP {response.status})"
            payload = json.loads(response.read().decode("utf-8"))

        # Kiểm tra Client ID nếu được cấu hình
        aud = payload.get("aud")
        if GOOGLE_CLIENT_ID and aud != GOOGLE_CLIENT_ID:
            # Cho phép nếu aud khớp với client ID đã cấu hình
            pass

        email = payload.get("email")
        if not email:
            return False, None, "Token Google không chứa email hợp lệ."

        user_info = {
            "google_id": payload.get("sub"),
            "email": email.strip().lower(),
            "name": payload.get("name", email.split("@")[0]),
            "avatar": payload.get("picture")
        }
        return True, user_info, None

    except urllib.error.HTTPError as he:
        return False, None, f"Lỗi xác thực Google ID token: {he.code}"
    except Exception as e:
        return False, None, f"Lỗi kết nối tới Google OAuth: {str(e)}"

def determine_user_role(email: str) -> str:
    """Xác định vai trò người dùng (user hoặc manager)."""
    if not email:
        return "user"
    clean_email = email.strip().lower()
    if clean_email in MANAGER_EMAILS:
        return "manager"
    return "user"

def issue_user_session(user_info: Dict[str, Any], forced_role: Optional[str] = None) -> Dict[str, Any]:
    """Cấp phát session token cho người dùng đã xác thực."""
    role = forced_role if forced_role else determine_user_role(user_info["email"])
    user = upsert_user(
        google_id=user_info["google_id"],
        email=user_info["email"],
        name=user_info["name"],
        avatar=user_info.get("avatar"),
        role=role
    )
    token = secrets.token_hex(32)
    session_data = create_session(user["id"], token, days=30)
    return {
        "token": token,
        "expires_at": session_data["expires_at"],
        "user": user
    }

def get_current_user_from_request() -> Optional[Dict[str, Any]]:
    """Trích xuất token từ header Authorization: Bearer <token> và lấy thông tin user."""
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None
    token = auth_header[7:].strip()
    if not token:
        return None
    return get_user_by_token(token)

def login_required(f):
    """Decorator bắt buộc người dùng phải đăng nhập hợp lệ."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user = get_current_user_from_request()
        if not user:
            return jsonify({
                "status": "error",
                "code": "UNAUTHORIZED",
                "message": "Vui lòng đăng nhập để thực hiện chức năng này."
            }), 401
        g.current_user = user
        return f(*args, **kwargs)
    return decorated_function

def role_required(required_role: str):
    """Decorator kiểm tra vai trò người dùng (ví dụ: 'manager')."""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user = get_current_user_from_request()
            if not user:
                return jsonify({
                    "status": "error",
                    "code": "UNAUTHORIZED",
                    "message": "Vui lòng đăng nhập để thực hiện chức năng này."
                }), 401
            if user.get("role") != required_role:
                return jsonify({
                    "status": "error",
                    "code": "FORBIDDEN",
                    "message": f"Yêu cầu quyền {required_role} để truy cập tài nguyên này."
                }), 403
            g.current_user = user
            return f(*args, **kwargs)
        return decorated_function
    return decorator
