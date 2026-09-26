import os
import shutil
import subprocess
import sys
from typing import List, Optional

# ================= CẤU HÌNH =================
# Cổng máy chủ web Vite (Frontend)
MAIN_PORT = 5173
# Danh sách các cổng cần ánh xạ sang Android (Frontend Vite: 5173, Backend API: 8080)
PORTS_TO_REVERSE = [5173, 8080]
URL = f"http://localhost:{MAIN_PORT}"
CHROME_PACKAGE = "com.android.chrome"
# ============================================


def find_adb_executable() -> str:
    """Tự động tìm kiếm đường dẫn thực thi adb."""
    # 1. Kiểm tra trong PATH
    adb_path = shutil.which("adb")
    if adb_path:
        return adb_path

    # 2. Kiểm tra các thư mục mặc định trên Windows
    possible_paths = []
    local_app_data = os.environ.get("LOCALAPPDATA", "")
    user_profile = os.environ.get("USERPROFILE", "")
    android_home = os.environ.get("ANDROID_HOME", "")
    android_sdk_root = os.environ.get("ANDROID_SDK_ROOT", "")

    if local_app_data:
        possible_paths.append(os.path.join(local_app_data, "Android", "Sdk", "platform-tools", "adb.exe"))
    if user_profile:
        possible_paths.append(os.path.join(user_profile, "AppData", "Local", "Android", "Sdk", "platform-tools", "adb.exe"))
    if android_home:
        possible_paths.append(os.path.join(android_home, "platform-tools", "adb.exe" if sys.platform == "win32" else "adb"))
    if android_sdk_root:
        possible_paths.append(os.path.join(android_sdk_root, "platform-tools", "adb.exe" if sys.platform == "win32" else "adb"))

    for path in possible_paths:
        if os.path.isfile(path):
            return path

    return "adb"


ADB_BIN = find_adb_executable()


def run_adb_cmd(args: List[str], check: bool = True) -> subprocess.CompletedProcess:
    """Thực thi một lệnh ADB và trả về kết quả."""
    cmd = [ADB_BIN] + args
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            check=check,
            encoding="utf-8",
            errors="ignore",
        )
        return result
    except FileNotFoundError:
        print(f"[LỖI] Không tìm thấy lệnh '{ADB_BIN}'. Vui lòng kiểm tra lại biến môi trường PATH hoặc cài đặt Android SDK.")
        sys.exit(1)
    except subprocess.CalledProcessError as e:
        print(f"[LỖI] Lệnh thất bại: {' '.join(cmd)}")
        print(f"Chi tiết: {e.stderr.strip()}")
        raise


def get_connected_devices() -> List[str]:
    """Lấy danh sách ID các thiết bị đang ở trạng thái 'device'."""
    result = run_adb_cmd(["devices"])
    lines = result.stdout.strip().splitlines()

    devices = []
    # Dòng đầu tiên là 'List of devices attached', duyệt từ dòng thứ 2
    for line in lines[1:]:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        if len(parts) >= 2 and parts[1] == "device":
            devices.append(parts[0])

    return devices


def verify_connection() -> Optional[str]:
    """Bước 1: Kiểm tra kết nối thiết bị qua adb devices."""
    print("-> Đang kiểm tra kết nối thiết bị ADB...")
    devices = get_connected_devices()

    if not devices:
        print("[THẤT BẠI] Không tìm thấy thiết bị Android nào được kết nối ở chế độ 'device'.")
        print("Gợi ý: Kiểm tra cáp USB, bật USB Debugging hoặc cấp quyền RSA xác thực trên điện thoại.")
        return None

    device_id = devices[0]
    print(f"[THÀNH CÔNG] Đã phát hiện thiết bị: {device_id} (Tổng số: {len(devices)})")
    return device_id


def setup_port_forwarding(ports: List[int]) -> bool:
    """Bước 2: Xóa reverse rules cũ và thiết lập port reverse mới cho toàn bộ các port cần thiết."""
    print(f"\n-> Đang thiết lập Port Reverse cho các cổng: {ports}...")
    try:
        # Xóa toàn bộ reverse port rules cũ để tránh xung đột
        run_adb_cmd(["reverse", "--remove-all"], check=False)

        # Thiết lập port reverse cho từng cổng
        for port in ports:
            result = run_adb_cmd(["reverse", f"tcp:{port}", f"tcp:{port}"])
            status = result.stdout.strip() or f"tcp:{port} -> tcp:{port}"
            print(f"   [OK] Ánh xạ thành công: {status}")
        return True
    except Exception as e:
        print(f"[THẤT BẠI] Lỗi khi cấu hình port reverse: {e}")
        return False


def launch_chrome_with_url(url: str) -> bool:
    """Bước 3: Mở Google Chrome trên Android và điều hướng tới URL."""
    print(f"\n-> Đang mở Google Chrome tới URL: {url}...")
    try:
        # Giải thích tham số lệnh Intent:
        # -S: Buộc dừng Chrome trước nếu đang chạy để làm mới phiên làm việc
        # -a android.intent.action.VIEW: Thực hiện Action xem nội dung
        # -d <url>: Địa chỉ Data URI cần mở
        # com.android.chrome: Package của trình duyệt Chrome
        intent_cmd = [
            "shell",
            "am",
            "start",
            "-n",
            f"{CHROME_PACKAGE}/com.google.android.apps.chrome.Main",
            "-a",
            "android.intent.action.VIEW",
            "-d",
            url,
            "-f",
            "0x10000000",
            "--activity-brought-to-front",
            "--activity-clear-top",
        ]

        result = run_adb_cmd(intent_cmd)
        print(f"[THÀNH CÔNG] Lệnh mở trình duyệt đã gửi thành công:")
        print(f"            {result.stdout.strip()}")
        return True
    except Exception as e:
        print(f"[THẤT BẠI] Không thể khởi chạy Chrome: {e}")
        return False


def main():
    print("=== TỰ ĐỘNG HÓA KẾT NỐI ADB VÀ TEST LOCALHOST WEBSITE ===")

    # 1. Kiểm tra kết nối
    device = verify_connection()
    if not device:
        sys.exit(1)

    # 2. Xóa reverse cũ và ánh xạ tất cả các cổng
    if not setup_port_forwarding(PORTS_TO_REVERSE):
        sys.exit(1)

    # 3. Khởi chạy Chrome với Intent
    if not launch_chrome_with_url(URL):
        sys.exit(1)

    print(f"\n Hoàn tất! Website trên laptop hiện có thể truy cập mượt mà trên Chrome Android tại {URL}.")


if __name__ == "__main__":
    main()