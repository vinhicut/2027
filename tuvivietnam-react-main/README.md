# 🔮 TỬ VI HỒNG ÂN

> **Phiên bản:** Release 24/09/2026
> **Công nghệ:** React 19 + Vite 8 (Frontend) · Python Flask (Backend)
> **Kho mã nguồn chính:** [github.com/vinhicut/tuvivietnam-react](https://github.com/vinhicut/tuvivietnam-react)
> **Kho mã nguồn phụ:** [github.com/Oops52VN/Hong-An-Horoscope-Website-Backups](https://github.com/Oops52VN/Hong-An-Horoscope-Website-Backups)

---

## Mục lục

1. [Tổng quan cấu trúc thư mục](#1-tổng-quan-cấu-trúc-thư-mục)
2. [Tóm tắt các tinh chỉnh và cập nhật đã thực hiện](#2-tóm-tắt-các-tinh-chỉnh-và-cập-nhật-đã-thực-hiện)
3. [Hướng dẫn chạy trên máy cá nhân (local)](#3-hướng-dẫn-chạy-trên-máy-cá-nhân-local)
4. [Hướng dẫn thiết lập hệ thống bảo mật](#4-hướng-dẫn-thiết-lập-hệ-thống-bảo-mật)
5. [Hướng dẫn đưa website lên máy chủ (server)](#5-hướng-dẫn-đưa-website-lên-máy-chủ-server)
6. [Các lưu ý quan trọng](#6-các-lưu-ý-quan-trọng)

---

## 1. Tổng quan cấu trúc thư mục

Dự án đã được tái cấu trúc theo kiến trúc **Feature-Based (Modular)** kết hợp **Monorepo**, tách bạch rõ ràng giữa Frontend và Backend. Toàn bộ tên thư mục được chuẩn hóa sang tiếng Anh.

```text
Tử Vi Hồng Ân Website/
│
├── backend/                             #    Mã nguồn máy chủ (Python / Flask)
│   ├── requirements.txt                 #    Thư viện Python cần cài đặt
│   ├── .env                             #    Biến môi trường (KHÔNG đẩy lên Git)
│   └── src/
│       ├── server.py                    #    Điểm khởi chạy API (cổng 8080)
│       ├── core/                        #    Logic lõi nền tảng
│       │   ├── config.py                #       Nạp cấu hình từ biến môi trường
│       │   ├── db.py                    #       Truy vấn SQLite (Unified Data Router)
│       │   ├── firebase_db.py           #       Kết nối Google Cloud Firestore
│       │   └── migrate_to_firebase.py   #       Di chuyển dữ liệu SQLite → Firebase
│       ├── data/                        #    Thư mục lưu cơ sở dữ liệu cục bộ (tuvi.db)
│       └── modules/                     #    Các tính năng chuyên biệt (mỗi tính năng = 1 module)
│           ├── admin/                   #       Quản trị hệ thống
│           ├── astrology/               #       Lá Số Tử Vi (chứa tuvi_engine/)
│           ├── auth/                    #       Xác thực Google, quản lý người dùng
│           ├── tarot_kieu/              #       Bói bài Kiều
│           ├── lunar_calendar/          #       Lịch Vạn Sự
│           ├── articles/                #       Bài viết (blog)
│           ├── contact/                 #       Liên hệ
│           ├── courses/                 #       Khóa học
│           ├── forum/                   #       Diễn đàn
│           ├── shop/                    #       Cửa hàng
│           ├── qimen_dunjia/            #       Kỳ Môn Độn Giáp (tương lai)
│           ├── feng_shui/               #       Phong Thủy (tương lai)
│           └── numerology/              #       Thần Số Học (tương lai)
│
├── frontend/                            #       Mã nguồn giao diện (React 19 / Vite 8)
│   ├── package.json                     #    Cấu hình npm và thư viện JavaScript
│   ├── vite.config.js                   #    Cấu hình Vite (proxy, build output)
│   ├── index.html                       #    Trang HTML gốc
│   ├── public/                          #    Tài nguyên tĩnh
│   │   ├── logo.png                     #       Favicon
│   │   ├── astrology-engine/            #       Bộ engine vẽ lá số (HTML/CSS/JS/WASM)
│   │   │   ├── laso-tuvi.html           #       Bảng lá số (phiên bản tách file)
│   │   │   ├── laso-tuvi.bundle.html    #       Bảng lá số (phiên bản gộp tất-cả-trong-một)
│   │   │   ├── css/                     #          board.css, controls.css, ...
│   │   │   └── js/                      #          export-engine.js, ui-controller.js, ...
│   │   └── tarot-kieu/                  #       Bói quẻ Kiều
│   │       ├── boi-que-kieu.html        #       Giao diện bói Kiều
│   │       ├── nen-tarot-kieu.png       #       Hình nền
│   │       └── cards/                   #          210 ảnh quẻ (Que-001.png → Que-210.png)
│   └── src/
│       ├── main.jsx                     #    Điểm khởi chạy React
│       ├── app/                         #    Thiết lập App, CSS toàn cục, cấu hình Router
│       ├── pages/                       #    Các trang chính (Home, Contact, Forum, Shop, ...)
│       ├── features/                    #    Logic tính năng (LaSoTuVi, BoiKieu, LichVanSu, ...)
│       └── shared/                      #    Thành phần dùng chung
│           ├── ui/                      #       Navbar, Footer, Modal, Buttons, ...
│           └── assets/                  #       Hình ảnh, logo (ha-logo.png), font chữ
│
├── deployment/                          # Hạ tầng triển khai
│   ├── docker/                          #    Dockerfile, docker-compose.yml
│   ├── nginx/                           #    Cấu hình Nginx cho máy chủ
│   ├── scripts/                         #    Kịch bản khởi chạy
│   │   ├── start.bat                    #       Nhấp đúp để chạy trên Windows
│   │   ├── start.sh                     #       Chạy trên Linux/macOS
│   │   ├── start_local.py               #       Script thông minh khởi động cả FE & BE
│   │   └── start_android.py             #       Chạy trên thiết bị Android
│   └── terraform/                       #    Hạ tầng dạng mã (dự phòng Cloud)
│
├── security/                            # Bảo mật và chứng chỉ
│   ├── keys-and-secrets/                #    Chứa file nhạy cảm (KHÔNG đẩy lên Git)
│   │   ├── firebase-service-account.json
│   │   ├── client_secret_*.json
│   │   └── tuvi_ui_protected.enc
│   ├── devsecops/                       #    Công cụ tự động hóa bảo mật
│   │   ├── generate_csp.py              #       Sinh Content Security Policy chống XSS
│   │   ├── package_wasm.py              #       Đóng gói WebAssembly
│   │   ├── vault_secrets.py             #       Quản lý secrets qua HashiCorp Vault
│   │   └── wasm_manifest.json
│   └── policies/                        #    Tài liệu chính sách bảo mật
│       └── Deployment_Security_Guide.md
│
├── testing/                             # Kiểm thử
│   ├── unit-tests/                      #    Kiểm thử đơn vị (test_engine.py, ...)
│   ├── e2e/                             #    Kiểm thử từ đầu đến cuối
│   └── load-tests/                      #    Kiểm thử chịu tải
│
├── releases/                            # Quản lý phát hành
│   ├── dist/                            #    Mã nguồn Frontend đã build (đầu ra của npm run build)
│   ├── archives/                        #    Lưu trữ các bản phát hành cũ
│   └── notes/                           #    Ghi chú phiên bản
│
├── packages/                            # Thư viện dùng chung (Monorepo)
├── clients/                             # Dự phòng nền tảng khác (Mobile App, Desktop App)
├── .github/                             # CI/CD Workflows
├── git/                                 # Cấu hình Git Hooks
│
├── .gitignore                           # Danh sách file/thư mục bị loại trừ khỏi Git
├── .env                                 # Biến môi trường cấp dự án
├── start.bat                            # Lối tắt khởi chạy nhanh (ở thư mục gốc)
├── start_local.py                       # Lối tắt khởi chạy nhanh (ở thư mục gốc)
└── temp/                                # Thư mục tạm (tài liệu walkthrough, kế hoạch)
```

### Quy ước đặt tên chuyển đổi tiếng Anh

| Tên tiếng Việt    | Tên thư mục tiếng Anh |
| -------------------- | ------------------------- |
| Tử Vi               | `astrology`             |
| Tarot Kiều          | `tarot_kieu`            |
| Kỳ Môn Độn Giáp | `qimen_dunjia`          |
| Phong Thủy          | `feng_shui`             |
| Lịch Vạn Sự       | `lunar_calendar`        |
| Thần Số Học       | `numerology`            |

---

## 2. Tóm tắt các tinh chỉnh và cập nhật đã thực hiện

### 2.1. Tái cấu trúc toàn bộ dự án

| Hạng mục                               | Mô tả                                                                                                                                                                        |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Kiến trúc Monorepo**           | Tách bạch hoàn toàn Backend (Python) và Frontend (React). Mỗi phần có file cấu hình riêng (`requirements.txt`, `package.json`)                                  |
| **Backend — Domain-Driven**       | Chia tính năng Python thành các module độc lập (`astrology`, `tarot_kieu`, `auth`, `admin`, ...). Code hệ thống (`db.py`, `config.py`) gom vào `core/` |
| **Frontend — Feature-Sliced**     | Mã nguồn React chia thành`app/` (khởi tạo), `pages/` (các trang), `features/` (logic tính năng), `shared/` (thành phần dùng chung)                          |
| **Khử trùng lặp tài nguyên**  | Xóa bản sao thừa của 210 ảnh bài Kiều và 6+ file logo trùng lặp. Chỉ giữ 1 bản chuẩn duy nhất                                                                   |
| **Script khởi chạy thông minh** | `start.bat` / `start_local.py` tự động cài `node_modules`, giải phóng cổng bị chiếm, khởi chạy đồng thời Frontend & Backend chỉ với 1 cú nhấp chuột   |

### 2.2. Tinh chỉnh giao diện (UI/UX) — 9 nhóm thay đổi

| Nhóm | Nội dung                                                                                                                                                                                       | Số file ảnh hưởng |
| :---: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------: |
|   1   | **Phông chữ & văn bản:** Đồng bộ toàn bộ sang font Be Vietnam Pro. Rút gọn "Kỳ môn độn giáp" → "Kỳ môn". Căn chỉnh ngắt dòng, giãn cách dòng                    |           4           |
|   2   | **Bố cục giao diện:** Thu hẹp 6 khối truy cập nhanh. Tăng kích thước icon dropdown. Căn chỉnh khối đăng nhập                                                              |           2           |
|   3   | **Xóa khoảng trắng dư thừa:** Loại bỏ khoảng trống lớn giữa khối "Lập lá số" và Footer. Đổi `min-height` từ `100vh` sang `auto`                                  |           3           |
|   4   | **Chỉnh sửa Footer:** Xóa khối liên kết mạng xã hội. Đổi màu và kiểu chữ tiêu đề "Tư vấn học thuật" sang đỏ chủ đạo                                            |           2           |
|   5   | **Trang "Đang phát triển":** 6 trang (Liên hệ, Diễn đàn, Khóa học, Cửa hàng, Kỳ môn, Thần số) được thay bằng thông báo "UI&UX đang trong quá trình phát triển" |           8           |
|   6   | **Bỏ UI trạng thái xuất file:** Xóa spinner và thanh tiến trình trên 3 nút xuất PDF/ảnh. Giữ nguyên chức năng xuất file                                                  |           3           |
|   7   | **Thay bộ ảnh Tarot Kiều:** Thay 210 ảnh quẻ mới + hình nền mới. Loại bỏ ảnh nền Base64 nặng (~4.6 MB)                                                                      |          213          |
|   8   | **Sửa lỗi hiển thị lá số:** Chữ không còn dính mép cung. Sửa giật màn hình khi xuất file trên điện thoại (dùng kỹ thuật offscreen clone). Cải thiện responsive   |           4           |
|   9   | **Đồng bộ font Input Panel:** Labels, inputs, selects đều render đồng nhất 12px. Sửa lỗi năm "2050" bị cắt trên điện thoại                                               |           2           |

**Tổng cộng: ~234 file** đã được thay đổi hoặc tạo mới (22 file code + 211 ảnh + 1 bundle tái tạo).

### 2.3. Tích hợp Google Cloud Firestore

| Hạng mục                             | Mô tả                                                                                                                                 |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Cơ chế Dual-Engine**         | Hệ thống tự động phát hiện: nếu có file khóa Firebase → lưu lên Cloud Firestore; nếu không → dùng SQLite cục bộ      |
| **File mới**                    | `firebase_db.py` (kết nối Firestore), `migrate_to_firebase.py` (di chuyển dữ liệu)                                             |
| **File sửa**                    | `db.py` nâng cấp thành Unified Data Router, `config.py` thêm cấu hình Firebase, `requirements.txt` thêm `firebase-admin` |
| **3 Collection trên Firestore** | `users` (người dùng), `sessions` (phiên đăng nhập), `user_charts` (lá số tử vi)                                         |

---

## 3. Hướng dẫn chạy trên máy cá nhân (local)

### 3.1. Yêu cầu phần mềm

Trước khi bắt đầu, hãy đảm bảo máy tính đã cài đặt:

| Phần mềm        | Phiên bản tối thiểu        | Kiểm tra bằng lệnh |
| ----------------- | ------------------------------ | --------------------- |
| **Node.js** | 18 trở lên                   | `node --version`    |
| **npm**     | 9 trở lên (đi kèm Node.js) | `npm --version`     |
| **Python**  | 3.9 trở lên                  | `python --version`  |
| **Git**     | Bất kỳ                       | `git --version`     |

### 3.2. Cách 1 — Khởi chạy nhanh bằng 1 cú nhấp chuột (khuyến nghị)

Đây là cách đơn giản nhất, phù hợp cho người dùng không chuyên:

1. Mở thư mục `deployment/scripts/` (hoặc thư mục gốc dự án).
2. **Nhấp đúp** vào file `start.bat`.
3. Hệ thống sẽ tự động thực hiện:
   - Giải phóng các cổng 8080 và 5173 nếu đang bị tiến trình cũ chiếm giữ.
   - Cài đặt thư viện JavaScript (`npm install`) nếu chưa có thư mục `node_modules`.
   - Khởi động Backend (cổng 8080) và kiểm tra sức khỏe hệ thống.
   - Khởi động Frontend (cổng 5173).
   - Tự động mở trình duyệt tại địa chỉ `http://localhost:5173`.
4. Để dừng hệ thống: nhấn `Ctrl + C` trong cửa sổ lệnh.

### 3.3. Cách 2 — Khởi chạy thủ công từng phần

Phù hợp khi cần kiểm soát chi tiết hoặc gỡ lỗi:

#### Bước 1: Cài đặt thư viện

```powershell
# Cài thư viện Frontend
cd frontend
npm install

# Cài thư viện Backend (tùy chọn — nếu muốn dùng Firebase)
cd ../backend
pip install -r requirements.txt
```

#### Bước 2: Khởi chạy Backend

```powershell
cd backend/src
python server.py
```

Nếu thành công, cửa sổ lệnh sẽ hiển thị thông báo máy chủ đang lắng nghe tại cổng 8080.

Kiểm tra nhanh: mở trình duyệt truy cập `http://127.0.0.1:8080/api/health` — nếu trả về kết quả là hệ thống đã sẵn sàng.

#### Bước 3: Khởi chạy Frontend (mở cửa sổ lệnh mới)

```powershell
cd frontend
npm run dev
```

Trình duyệt truy cập `http://localhost:5173` để xem website.

### 3.4. Tổng hợp các địa chỉ truy cập

| Dịch vụ                 | Địa chỉ                              |
| ------------------------- | --------------------------------------- |
| Website giao diện chính | `http://localhost:5173`               |
| API tính toán tử vi    | `http://127.0.0.1:8080/api/calculate` |
| Kiểm tra sức khỏe API  | `http://127.0.0.1:8080/api/health`    |

---

## 4. Hướng dẫn thiết lập hệ thống bảo mật

### 4.1. Bảo vệ các file nhạy cảm

File `.gitignore` của dự án đã được cấu hình để **tự động loại trừ** các file chứa thông tin bí mật:

```text
# Biến môi trường
.env, .env.*

# Chứng chỉ và khóa bí mật
client_secret*.json
firebase-service-account*.json
*-service-account*.json
*.enc

# Cơ sở dữ liệu cục bộ
*.db, *.sqlite, *.sqlite3
```

> **⚠️ Quan trọng:** Tuyệt đối **KHÔNG bao giờ** đẩy các file trên lên Git/GitHub. Nếu lỡ tay commit, phải thu hồi ngay lập tức (xem mục 4.4).

### 4.2. Thiết lập Google Firebase (tùy chọn)

Nếu muốn lưu trữ dữ liệu trên đám mây thay vì SQLite cục bộ:

1. Truy cập [Firebase Console](https://console.firebase.google.com/project/tu-vi-hong/firestore) và kích hoạt **Firestore Database**.
2. Vào mục **Cài đặt dự án** → **Tài khoản dịch vụ** → Nhấn **Tạo khóa riêng tư mới**.
3. Tải file JSON về và đổi tên thành `firebase-service-account.json`.
4. Đặt file này vào thư mục `security/keys-and-secrets/` hoặc `backend/`.
5. Hệ thống sẽ tự động phát hiện và chuyển sang dùng Firebase (cơ chế Dual-Engine).

**Di chuyển dữ liệu từ SQLite sang Firebase:**

```powershell
cd backend/src/core
python migrate_to_firebase.py
```

### 4.3. Thiết lập xác thực đăng nhập Google OAuth

File `client_secret_*.json` chứa thông tin xác thực OAuth đã nằm sẵn trong `security/keys-and-secrets/`. Biến môi trường tương ứng được khai báo trong `backend/.env`:

```env
GOOGLE_CLIENT_ID=714306691526-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4.4. Các biện pháp bảo mật tích hợp sẵn

| Lớp bảo vệ                       | Mô tả                                                                                                                                 |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Chống Path Traversal**     | Backend chặn triệt để các ký tự`..`, đường dẫn nhạy cảm, phần mở rộng `.py`, `.env`, `.git`, `.key`, `.log` |
| **CORS Whitelisting**         | Chỉ cho phép các domain được chỉ định trong biến`CORS_ORIGIN`                                                               |
| **Tiêu đề bảo mật HTTP** | `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Cache-Control`                                                 |
| **DPoP (RFC 9449)**           | Module`dpop.js` sinh chữ ký số ECDSA xác thực thiết bị qua WebCrypto API                                                       |
| **E2EE (AES-256-GCM)**        | Module WebAssembly mã hóa dữ liệu đầu cuối trước khi truyền qua mạng                                                         |
| **CSP động**                | Script`generate_csp.py` tự động sinh Content Security Policy chống tấn công XSS                                                 |

---

## 5. Hướng dẫn đưa website lên máy chủ (server)

### 5.1. Bước 1 — Build bản phát hành (release/dist)

Chạy lệnh build trong thư mục `frontend`:

```powershell
cd frontend
npm run build
```

Kết quả: toàn bộ mã nguồn Frontend được biên dịch, nén và xuất ra thư mục `releases/dist/`. Đây là bản sẵn sàng triển khai lên máy chủ.

> **Ghi chú:** Cấu hình trong `vite.config.js` đã tắt source map (`sourcemap: false`) để ngăn lộ mã nguồn gốc.

### 5.2. Bước 2 — Sinh cấu hình bảo mật CSP (tùy chọn nhưng khuyến nghị)

```bash
pip install -r security/devsecops/requirements.txt
python security/devsecops/generate_csp.py --manifest security/devsecops/wasm_manifest.json --output releases/dist/nginx_csp.conf
```

### 5.3. Bước 3 — Đẩy mã nguồn lên GitHub

```powershell
# Kiểm tra trạng thái
git status

# Thêm toàn bộ file thay đổi
git add .

# Tạo bản ghi thay đổi
git commit -m "Release 24/09/2026 — Tái cấu trúc & tinh chỉnh UI/UX"

# Đẩy lên kho GitHub
git push origin main
```

> **⚠️ Trước khi push**, hãy chạy `git status` để chắc chắn **KHÔNG CÓ** các file nhạy cảm sau trong danh sách:
>
> - `.env`
> - `firebase-service-account.json`
> - `client_secret_*.json`
> - `*.db`
> - `*.enc`

### 5.4. Bước 4 — Triển khai trên máy chủ Linux (VPS/Cloud)

#### Cách A: Triển khai thủ công với Nginx

**1. Kéo mã nguồn từ GitHub về máy chủ:**

```bash
cd /var/www
git clone https://github.com/vinhicut/tuvivietnam-react.git tuvi
cd tuvi
```

**2. Cài đặt và khởi chạy Backend:**

```bash
cd backend
pip3 install -r requirements.txt
cd src
python3 server.py &
```

**3. Sao chép bản Frontend đã build vào thư mục web:**

```bash
# Nếu đã build sẵn trên máy cá nhân:
cp -r releases/dist/* /var/www/tuvi/dist/

# Hoặc build trực tiếp trên máy chủ:
cd frontend
npm install
npm run build
cp -r ../releases/dist/* /var/www/tuvi/dist/
```

**4. Cấu hình Nginx:**

Tạo file cấu hình Nginx tại `/etc/nginx/sites-available/tuvi.conf`:

```nginx
# Giới hạn tần suất gọi API — chống tấn công brute force và DDoS
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

server {
    listen 80;
    server_name ten-mien-cua-ban.com;
    # Tự động chuyển hướng sang HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ten-mien-cua-ban.com;

    # Chứng chỉ SSL (dùng Let's Encrypt miễn phí)
    ssl_certificate     /etc/letsencrypt/live/ten-mien-cua-ban.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ten-mien-cua-ban.com/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;

    # Tiêu đề bảo mật
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Phục vụ giao diện Frontend (file tĩnh từ bản build)
    location / {
        root /var/www/tuvi/dist;
        index index.html;
        try_files $uri $uri/ /index.html;

        # Bật bộ nhớ đệm cho ảnh, font chữ, CSS, JS
        location ~* \.(otf|ttf|woff2|svg|png|jpg|webp|css|js|wasm)$ {
            expires 30d;
            add_header Cache-Control "public, no-transform";
        }
    }

    # Chuyển tiếp yêu cầu API đến Backend Python (cổng 8080)
    location /api/ {
        limit_req zone=api_limit burst=20 nodelay;
        proxy_pass http://127.0.0.1:8080/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 5s;
        proxy_read_timeout 30s;
    }

    # Chặn truy cập file ẩn (.git, .env, ...)
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

**5. Kích hoạt và khởi động lại Nginx:**

```bash
sudo ln -s /etc/nginx/sites-available/tuvi.conf /etc/nginx/sites-enabled/
sudo nginx -t           # Kiểm tra cú pháp cấu hình
sudo systemctl reload nginx
```

**6. Cài đặt chứng chỉ SSL miễn phí (Let's Encrypt):**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d ten-mien-cua-ban.com
```

#### Cách B: Triển khai bằng Docker (nâng cao)

```bash
cd /var/www/tuvi
docker-compose up -d --build
```

File `docker-compose.yml` và `Dockerfile` nằm trong thư mục `deployment/docker/`.

### 5.5. Bước 5 — Quản trị secrets trên môi trường thật (production)

**KHÔNG lưu** mật khẩu hay khóa bí mật trong file `.env` trên máy chủ thật. Thay vào đó, dùng HashiCorp Vault:

```bash
# Khai báo địa chỉ Vault
export VAULT_ADDR="https://vault.ten-mien-cua-ban.com:8200"
export VAULT_TOKEN="s.tokenDuocCapBoi_Vault"

# Nạp secrets tự động vào biến môi trường hệ thống
python security/devsecops/vault_secrets.py --path secret/data/tuvi/production
```

---

## 6. Các lưu ý quan trọng

### 6.1. Về bảng lá số tử vi (astrology-engine)

> **⚠️ `box-sizing: content-box` trên `.tuvi-board-wrapper` là BẮT BUỘC.**
> Viền 2px phải nằm NGOÀI vùng nội dung 737px. Nếu đổi sang `border-box`, bảng sẽ co lại 733px và lưới cung bị lệch.

> **⚠️ Phải tái tạo bundle sau mỗi lần sửa CSS/JS.**
> File `laso-tuvi.bundle.html` là phiên bản gộp toàn bộ. Sau khi sửa bất kỳ file CSS hoặc JS nào trong `astrology-engine/`, chạy lại:
>
> ```powershell
> python make_bundle.py
> ```

### 6.2. Về font chữ trên thiết bị iOS

Phiên bản hiện tại đã xóa override `font-size: 16px` trên thiết bị di động để đồng bộ thị giác giữa label và input (đều 12px). **Hệ quả:** trình duyệt Safari trên iOS có thể tự động phóng to khi người dùng chạm vào ô nhập liệu (do font nhỏ hơn 16px). Đây là sự đánh đổi đã được chấp nhận.

### 6.3. Về bản build chưa hoàn tất

Lệnh `npm run build` **chưa được chạy** cho nhóm thay đổi cuối cùng (Nhóm 9 — đồng bộ font Input Panel). Trước khi triển khai lên máy chủ, cần chạy lại:

```powershell
cd frontend
npm run build
```

### 6.4. Về cơ chế Dual-Engine (Firebase / SQLite)

- Hệ thống **luôn hoạt động** dù chưa kích hoạt Firebase. Khi không tìm thấy file `firebase-service-account.json`, toàn bộ dữ liệu tự động lưu vào SQLite cục bộ.
- Khi đã kích hoạt Firebase, có thể chạy `migrate_to_firebase.py` để chuyển toàn bộ dữ liệu cũ lên đám mây mà không mất bất kỳ dữ liệu nào.

### 6.5. Về biến môi trường CORS

Trong file `backend/.env`, biến `CORS_ORIGIN` hiện đang đặt là `*` (cho phép mọi domain). **Trước khi đưa lên máy chủ thật**, hãy đổi thành tên miền cụ thể:

```env
CORS_ORIGIN=https://ten-mien-cua-ban.com
```

### 6.6. Danh sách kiểm tra trước khi phát hành

| # | Hạng mục                                                                             | Trạng thái |
| :-: | -------------------------------------------------------------------------------------- | :----------: |
| 1 | Chạy`npm run build` thành công, không có lỗi                                   |      ☐      |
| 2 | Chạy`python test_engine.py` — tất cả kiểm thử đều đạt                      |      ☐      |
| 3 | File`.env`, `*.json` bí mật, `*.db` **KHÔNG** nằm trong `git status` |      ☐      |
| 4 | Cài đặt chứng chỉ SSL (HTTPS) trên máy chủ                                     |      ☐      |
| 5 | Đổi`CORS_ORIGIN` từ `*` sang tên miền chính thức                            |      ☐      |
| 6 | Bật giới hạn tần suất API (rate limiting) trên Nginx                             |      ☐      |
| 7 | Thư mục`.git` không thể truy cập từ trình duyệt                              |      ☐      |
| 8 | Chạy`make_bundle.py` tái tạo bundle sau khi sửa CSS/JS cuối cùng               |      ☐      |

---

> **Tài liệu bàn giao này được tạo ngày 24/09/2026.**
