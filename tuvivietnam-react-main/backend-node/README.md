# Node.js API + MySQL + phpMyAdmin

This is an additional backend for customer chart logs. The existing Flask API remains responsible for chart calculation and Google login. This Node API stores the selected chart and customer details in MySQL; phpMyAdmin provides a database browser.

## Start the services

1. Install Docker Desktop and make sure the existing Flask API is running on port `2026` (or set another `AUTH_ME_URL`).
2. Copy `.env.example` to `.env` and set unique values for `DB_PASSWORD` and `MYSQL_ROOT_PASSWORD`.
3. From this directory run `docker compose up -d --build`.
4. Set `CUSTOMER_API_URL=http://127.0.0.1:3001` in the Flask backend's `.env` so production requests are forwarded to Node.
5. Start the React app as usual from `../frontend` with `npm run dev`.

The API listens on `http://localhost:3001`. phpMyAdmin opens at `http://localhost:8082`; choose the `tuvi_hongan` database and `customer_chart_logs` table. Sign in with `tuvi_app` and the `DB_PASSWORD` from `.env`, or use `root` and `MYSQL_ROOT_PASSWORD`.

The Node API checks manager sessions against the existing Flask `/api/auth/me` endpoint before returning customer logs. Only managers can read the logs through the admin page. MySQL data is kept in the Docker volume `tuvi_mysql_data`.

## API routes

- `POST /api/customer-logs/charts`: save a chart selected by a visitor.
- `POST /api/customer-accounts/sync`: verify the app session and save/update the signed-in Google account in MySQL.
- `GET /api/admin/customer-logs/charts`: return saved charts; requires a valid manager bearer token.
- `GET /api/admin/customer-accounts`: return Google-authenticated customer accounts; requires a valid manager bearer token.
- `GET /api/health`: check the service.

The `customer_chart_logs` table is created automatically when the API starts. Chart images are stored privately in `backend-node/storage/chart-images` (or the path set by `CHART_IMAGE_DIR`); MySQL keeps only the image filename. The API serves each image only after checking manager access. Images left in the previous MySQL BLOB column are moved to this folder when the Node API starts.
