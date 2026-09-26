# HƯỚNG DẪN TRIỂN KHAI HỆ THỐNG BẢO MẬT TOÀN DIỆN (ZERO-TRUST & E2EE PRODUCTION)

> **Dự án:** Website Tử Vi Hồng Ân – Official Production Release (Release 1909)  
> **Kho lưu trữ:** [https://github.com/vinhicut/tuvivietnam-react.git](https://github.com/vinhicut/tuvivietnam-react.git)  
> **Kiến trúc bảo mật:** Zero-Trust Architecture, E2EE (WebAssembly AES-256-GCM), DPoP (RFC 9449 / WebCrypto API), Dynamic CSP (Chống XSS), HashiCorp Vault.

---

## 1. CẤU TRÚC THƯ MỤC CHUẨN KHI TRIỂN KHAI TRÊN MÁY CHỦ

Cấu trúc dự án tại bản release chính thức (`release website 1909`) được tổ chức theo tiêu chuẩn phân tách trách nhiệm (Separation of Concerns), sẵn sàng cho môi trường Bare-metal, VPS, hoặc Docker Container:

```text
release website 1909/
├── backend/                           # Máy chủ Python Core Engine & REST API
│   ├── tuvi_engine/                   # Lõi giải thuật an sao chuẩn Vân Đằng Thái Thứ Lang
│   │   ├── __init__.py, constants.py, core.py, han_van.py, lunar_calendar.py, models.py, sao_chinh.py, sao_phu.py, thien_ban.py
│   ├── server.py                      # REST API Server đa luồng (Port 8080) với cơ chế bảo mật chống Path Traversal
│   ├── requirements.txt               # Thư viện phụ thuộc (cryptography>=41.0.0)
│   └── test_engine.py                 # Bộ kiểm thử giải thuật tự động
│
├── devsecops/                         # Công cụ tự động hóa bảo mật CI/CD
│   ├── generate_csp.py                # Tự động sinh Content Security Policy (CSP) chống XSS
│   ├── package_wasm.py                # Tự động đóng gói Rust sang WebAssembly
│   ├── vault_secrets.py               # Quản trị secrets Zero-Trust từ HashiCorp Vault
│   └── README.md
│
├── public/                            # Tài nguyên tĩnh & Client-side Cryptography
│   ├── css/                           # Stylesheets lá số (theme, board, controls, print)
│   ├── js/                            # JavaScript điều khiển lá số
│   │   ├── dpop.js                    # Module WebCrypto sinh chữ ký định danh DPoP
│   │   ├── app.js, ui-controller.js, constants.js, export-engine.js, geometry.js
│   ├── wasm/                          # WebAssembly module mã hóa E2EE (e2ee_wasm.wasm)
│   ├── boi-kieu/                      # Phân hệ Bói Kiều (210 quẻ, bánh xe quay & que-giai.json)
│   ├── cards/, assets/, favicon.svg, icons.svg
│   └── laso-tuvi.html                 # Bảng lá số Micro-Grid 4-Zone
│
├── src/                               # Toàn bộ mã nguồn React 19 Frontend
│   ├── assets/                        # Fonts chữ mỹ thuật & Logo thương hiệu
│   ├── components/                    # Header, Navbar, Footer, LaSoTuVi, LichVanSu, BoiKieu, Contact...
│   ├── utils/                         # Tiện ích JavaScript (tuviEngine.js)
│   ├── App.css, App.jsx, index.css, main.jsx
│
├── .github/workflows/ci.yml           # CI Pipeline kiểm thử và build tự động
├── Dockerfile                         # Multi-stage Docker build cho Production
├── docker-compose.yml                 # Khởi chạy toàn bộ hệ thống bằng Docker
├── nginx.conf                         # File cấu hình Nginx Reverse Proxy mẫu cho Production
├── package.json, package-lock.json    # Cấu hình npm & dependencies
├── start_local.py, start.bat, start.sh # Kịch bản 1-click khởi chạy song song
├── .gitignore                         # Loại trừ tệp nhạy cảm (secrets, cache, build)
├── README.md                          # Tài liệu dự án
├── RELEASE_NOTES_1909.md              # Ghi chú phiên bản
└── Deployment_Security_Guide.md       # Tài liệu hướng dẫn triển khai bảo mật này
```

---

## 2. TRIỂN KHAI BẢO MẬT PHÂN HỆ FRONTEND & CLIENT

### 2.1. Đóng Gói Wasm & Sinh Header CSP Tự Động (Lúc Build)
Trước khi đưa các tệp tĩnh lên máy chủ hoặc CDN:
```bash
# 1. Cài đặt thư viện DevSecOps
pip install -r devsecops/requirements.txt

# 2. Sinh cấu hình Nginx CSP động (chống tấn công XSS & nhúng mã độc)
python devsecops/generate_csp.py --manifest devsecops/wasm_manifest.json --output public/nginx_csp.conf
```

### 2.2. Cơ Chế Mã Hóa Đầu Cuối (E2EE) & Ký Định Danh Thiết Bị (DPoP)
Tại giao diện Client, các request gửi dữ liệu nhạy cảm được bảo vệ 2 lớp:
1. **DPoP (Demonstrating Proof-of-Possession - RFC 9449):** Module `public/js/dpop.js` sử dụng WebCrypto API sinh cặp khóa bất đối xứng ECDSA (P-256) lưu trữ an toàn trong IndexedDB (`extractable: false`). Khi gửi request, chữ ký số DPoP Proof được gắn vào HTTP Header `DPoP`.
2. **E2EE (WebAssembly AES-256-GCM):** Module `public/wasm/e2ee_wasm.wasm` mã hóa payload trước khi truyền tải qua mạng internet.

**Mẫu tích hợp Client (JavaScript):**
```javascript
import { initDPoP, generateDPoPProof } from '/js/dpop.js';

async function sendSecureApiRequest(endpoint, payload) {
    // 1. Đảm bảo Private Key DPoP sẵn sàng trong IndexedDB
    await initDPoP();

    // 2. Ký xác thực DPoP cho request hiện tại
    const method = 'POST';
    const fullUrl = `${window.location.origin}${endpoint}`;
    const dpopProof = await generateDPoPProof(method, fullUrl);

    // 3. Gửi yêu cầu bảo mật kèm chữ ký DPoP
    const res = await fetch(endpoint, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'DPoP': dpopProof
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }
    return await res.json();
}
```

---

## 3. TRIỂN KHAI BẢO MẬT MÁY CHỦ & BACKEND API

### 3.1. Máy Chủ Python API (`backend/server.py`)
Máy chủ API được thiết kế theo nguyên tắc tối thiểu bề mặt tấn công:
- **Ngăn chặn Path Traversal & Leakage:** Chặn triệt để các ký tự `..`, đường dẫn nhạy cảm, chặn truy cập trực tiếp các phần mở rộng `.py`, `.env`, `.git`, `.key`, `.log`.
- **CORS Whitelisting:** Chỉ cho phép các domain được cấp phép thông qua biến môi trường `CORS_ORIGIN`.
- **An Toàn Đa Luồng:** Áp dụng `SafeThreadingHTTPServer` với `SO_EXCLUSIVEADDRUSE` ngăn chặn xung đột hoặc tấn công Port Hijacking trên Windows Server.
- **Tiêu đề Bảo Mật Chuẩn (Security Headers):**
  - `X-Content-Type-Options: nosniff` (chống MIME sniffing).
  - `X-Frame-Options: SAMEORIGIN` (chống Clickjacking).
  - `Cache-Control: public, max-age=3600` cho tài nguyên tĩnh.

### 3.2. Quản Trị Secrets Zero-Trust với HashiCorp Vault
Tuyệt đối **không lưu trữ mật khẩu, khóa bí mật hoặc database credentials trong file `.env` trên máy chủ production**. Thay vào đó, sử dụng kịch bản `devsecops/vault_secrets.py`:

```bash
# Thiết lập biến môi trường nạp lúc Container/Server khởi động:
export VAULT_ADDR="https://vault.yourdomain.com:8200"
export VAULT_TOKEN="s.yourAppRoleGeneratedToken"

# Kéo secrets trực tiếp vào biến môi trường hệ thống:
python devsecops/vault_secrets.py --path secret/data/tuvi/production
```

---

## 4. CẤU HÌNH NGINX REVERSE PROXY CHUẨN AN TOÀN

Khi triển khai trên Ubuntu/Debian/CentOS Server với Nginx, sử dụng cấu hình sau (tương thích tệp `nginx.conf`):

```nginx
# /etc/nginx/sites-available/tuvi_production.conf

# Rate Limiting: Chống Brute Force và DoS vào API
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

server {
    listen 80;
    server_name tuvi.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tuvi.yourdomain.com;

    # SSL / TLS Hardening
    ssl_certificate /etc/letsencrypt/live/tuvi.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tuvi.yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    # Global Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # Nhúng CSP động đã sinh ra từ devsecops/generate_csp.py (nếu có)
    # include /var/www/tuvi/dist/nginx_csp.conf;

    # 1. Phục vụ ứng dụng Frontend tĩnh (React dist/)
    location / {
        root /var/www/tuvi/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # Cache tĩnh cho hình ảnh, font chữ và css/js
        location ~* \.(otf|ttf|woff2|svg|png|jpg|jpeg|webp|css|js|wasm)$ {
            expires 30d;
            add_header Cache-Control "public, no-transform";
        }
    }

    # 2. Reverse Proxy chuyển tiếp API tới Python Core Engine (Port 8080)
    location /api/ {
        limit_req zone=api_limit burst=20 nodelay;

        proxy_pass http://127.0.0.1:8080/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeout an toàn
        proxy_connect_timeout 5s;
        proxy_read_timeout 30s;
        proxy_send_timeout 30s;
    }

    # Chặn triệt để các tệp ẩn và tệp cấu hình máy chủ
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

---

## 5. CHECKLIST KIỂM SOÁT AN NINH TRƯỚC KHI PUBLIC INTERNET

| STT | Hạng Mục Kiểm Tra | Trạng Thái Đạt Yêu Cầu |
|:---:|:---|:---:|
| 1 | **HTTPS/TLS:** Cài đặt chứng chỉ SSL hợp lệ (Let's Encrypt / Cloudflare) | [ ] |
| 2 | **Secrets Management:** Không có file `.env` hoặc API Key nào bị commit vào Git | [x] |
| 3 | **Git Cleanliness:** Thư mục `.git` không thể truy cập từ Web Browser (chặn bằng Nginx) | [x] |
| 4 | **Rate Limiting:** Cấu hình giới hạn tần suất gọi API tại `/api/calculate` (tối đa 10 req/s) | [ ] |
| 5 | **RAM Key Zeroing:** Biến tạm chứa Key AES trên trình duyệt được xóa bằng `.fill(0)` | [x] |
| 6 | **Docker Non-root User:** Container chạy dưới quyền người dùng không đặc quyền (`appuser`) | [ ] |
| 7 | **Automated Tests:** Script `backend/test_engine.py` và `npm run build` chạy thành công 100% | [x] |
| 8 | **Directory Listing:** Tắt hoàn toàn tính năng xem danh sách file của web server | [x] |

---

## 6. QUY TRÌNH ỨNG PHÓ SỰ CỐ AN NINH (INCIDENT RESPONSE)

1. **Khóa tạm thời API bị lạm dụng:**  
   Thêm rule iptables hoặc cấu hình Nginx chặn IP nghi vấn:
   ```bash
   sudo iptables -A INPUT -s <IP_KẺ_TẤN_CÔNG> -j DROP
   ```
2. **Thu hồi và luân chuyển Secrets:**  
   Nếu nghi ngờ lộ Token Vault, thực hiện thu hồi Token ngay lập tức qua Vault CLI:
   ```bash
   vault token revoke <TOKEN_ID>
   ```
3. **Kiểm tra nhật ký truy cập (Logs):**  
   Xem log máy chủ để điều tra request bất thường:
   ```bash
   tail -f /var/log/nginx/access.log | grep "/api/"
   ```
