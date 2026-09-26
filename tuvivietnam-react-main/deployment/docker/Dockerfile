# =========================================================
# STAGE 1: Biên dịch Frontend React + Vite
# =========================================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# =========================================================
# STAGE 2: Python Core Engine & Production API Server
# =========================================================
FROM python:3.11-slim
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8080 \
    HOST=0.0.0.0

# Sao chép file requirements và cài đặt
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Sao chép mã nguồn backend
COPY backend/ ./backend/

# Sao chép tài nguyên tĩnh từ stage frontend build
COPY --from=frontend-builder /app/dist ./dist
COPY --from=frontend-builder /app/public ./public

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8080/api/health')" || exit 1

CMD ["python", "backend/server.py"]
