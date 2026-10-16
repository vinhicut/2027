import os
import urllib.error
import urllib.request
from flask import Response, request


def proxy_customer_api(path: str) -> Response:
    """Forward customer-log requests to the separate Node/MySQL service."""
    base_url = os.getenv("CUSTOMER_API_URL", "http://127.0.0.1:3001").rstrip("/")
    url = f"{base_url}{path}"
    if request.query_string:
        url = f"{url}?{request.query_string.decode('latin-1')}"
    headers = {}
    for header in ("Authorization", "Content-Type"):
        value = request.headers.get(header)
        if value:
            headers[header] = value

    upstream_request = urllib.request.Request(
        url,
        data=request.get_data() if request.method not in ("GET", "HEAD") else None,
        headers=headers,
        method=request.method,
    )
    try:
        with urllib.request.urlopen(upstream_request, timeout=10) as upstream:
            return Response(upstream.read(), status=upstream.status, content_type=upstream.headers.get("Content-Type", "application/json"))
    except urllib.error.HTTPError as error:
        return Response(error.read(), status=error.code, content_type=error.headers.get("Content-Type", "application/json"))
    except Exception:
        return Response('{"status":"error","message":"Node customer API chưa chạy hoặc không kết nối được."}', status=503, content_type="application/json")
