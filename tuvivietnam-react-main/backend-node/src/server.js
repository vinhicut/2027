import 'dotenv/config';
import crypto from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const port = Number(process.env.PORT || 3001);
const imageDirectory = path.resolve(
  process.env.CHART_IMAGE_DIR || path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'storage', 'chart-images'),
);

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '8mb' }));

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'tuvi_app',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tuvi_hongan',
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
});

async function initializeDatabase() {
  await mkdir(imageDirectory, { recursive: true });
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS customer_accounts (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      google_sub VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(254) NOT NULL UNIQUE,
      display_name VARCHAR(120) NOT NULL,
      avatar_url VARCHAR(1000) NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'user',
      login_count BIGINT UNSIGNED NOT NULL DEFAULT 1,
      first_login_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      last_login_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS customer_chart_logs (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      customer_name VARCHAR(120) NOT NULL,
      customer_email VARCHAR(254) NOT NULL DEFAULT '',
      chart_code VARCHAR(40) NOT NULL,
      birth_input JSON NOT NULL,
      image_path VARCHAR(255) NULL,
      customer_id BIGINT UNSIGNED NULL,
      created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      INDEX idx_customer_chart_logs_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  const [columns] = await pool.execute(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'customer_chart_logs'`,
  );
  const columnNames = new Set(columns.map((column) => column.COLUMN_NAME));
  if (!columnNames.has('image_path')) {
    await pool.execute('ALTER TABLE customer_chart_logs ADD COLUMN image_path VARCHAR(255) NULL');
  }
  if (!columnNames.has('customer_id')) {
    await pool.execute('ALTER TABLE customer_chart_logs ADD COLUMN customer_id BIGINT UNSIGNED NULL AFTER image_path');
  }
  const [customerIndexes] = await pool.execute(
    `SELECT 1 FROM information_schema.STATISTICS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'customer_chart_logs' AND INDEX_NAME = 'idx_customer_chart_logs_customer_id' LIMIT 1`,
  );
  if (customerIndexes.length === 0) {
    await pool.execute('CREATE INDEX idx_customer_chart_logs_customer_id ON customer_chart_logs (customer_id)');
  }

  if (columnNames.has('image_data')) {
    const [legacyRows] = await pool.execute(
      'SELECT id, image_data, image_path FROM customer_chart_logs WHERE image_data IS NOT NULL',
    );
    for (const row of legacyRows) {
      if (!row.image_path) {
        const filename = `legacy-${row.id}.jpg`;
        await writeFile(path.join(imageDirectory, filename), row.image_data);
        await pool.execute(
          'UPDATE customer_chart_logs SET image_path = ?, image_data = NULL WHERE id = ?',
          [filename, row.id],
        );
      } else {
        await pool.execute('UPDATE customer_chart_logs SET image_data = NULL WHERE id = ?', [row.id]);
      }
    }
  }
  if (columnNames.has('chart_data')) {
    await pool.execute('ALTER TABLE customer_chart_logs DROP COLUMN chart_data');
  }
}

async function resolveSessionUser(authorization) {
  if (!authorization?.startsWith('Bearer ')) return null;
  const response = await fetch(process.env.AUTH_ME_URL || 'http://127.0.0.1:8080/api/auth/me', {
    headers: { Authorization: authorization },
    signal: AbortSignal.timeout(4000),
  });
  if (!response.ok) return null;
  const payload = await response.json();
  const user = payload.user;
  if (!user?.google_id || !user.email) return null;
  return user;
}

async function upsertCustomerAccount(user, loginIncrement = 0) {
  await pool.execute(
    `INSERT INTO customer_accounts
      (google_sub, email, display_name, avatar_url, role, login_count, first_login_at, last_login_at)
     VALUES (?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
     ON DUPLICATE KEY UPDATE
       email = VALUES(email), display_name = VALUES(display_name), avatar_url = VALUES(avatar_url),
       role = IF(role = 'manager', role, VALUES(role)),
       login_count = login_count + ?,
       last_login_at = IF(? > 0, CURRENT_TIMESTAMP(3), last_login_at),
       updated_at = CURRENT_TIMESTAMP(3)`,
    [user.google_id, user.email.trim().toLowerCase(), user.name || user.email, user.avatar || null, user.role || 'user', loginIncrement, loginIncrement],
  );
  const [rows] = await pool.execute('SELECT id FROM customer_accounts WHERE google_sub = ? LIMIT 1', [user.google_id]);
  return rows[0]?.id;
}

function parseJsonColumn(value) {
  if (typeof value !== 'string') return value;
  try { return JSON.parse(value); } catch { return value; }
}

async function requireManager(req, res, next) {
  const authorization = req.get('authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', message: 'Cần đăng nhập quản lý.' });
  }

  try {
    const response = await fetch(process.env.AUTH_ME_URL || 'http://127.0.0.1:8080/api/auth/me', {
      headers: { Authorization: authorization },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return res.status(401).json({ status: 'error', message: 'Phiên đăng nhập không hợp lệ.' });
    const payload = await response.json();
    if (payload.user?.role !== 'manager') {
      return res.status(403).json({ status: 'error', message: 'Chỉ quản lý mới được xem log khách hàng.' });
    }
    next();
  } catch {
    res.status(503).json({ status: 'error', message: 'Không xác minh được quyền quản lý với dịch vụ đăng nhập.' });
  }
}

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'Tu Vi Customer API' }));

app.post('/api/customer-accounts/sync', async (req, res) => {
  try {
    const user = await resolveSessionUser(req.get('authorization'));
    if (!user) return res.status(401).json({ status: 'error', message: 'Phiên Google không hợp lệ hoặc đã hết hạn.' });
    const customerId = await upsertCustomerAccount(user, 1);
    res.json({ status: 'success', data: { customer_id: customerId, email: user.email } });
  } catch (error) {
    console.error('Could not sync Google customer account:', error.message);
    res.status(503).json({ status: 'error', message: 'Không thể lưu tài khoản vào MySQL.' });
  }
});

app.post('/api/customer-logs/charts', async (req, res) => {
  const { input_data: inputData } = req.body || {};
  if (!inputData || typeof inputData !== 'object' || Array.isArray(inputData)) {
    return res.status(400).json({ status: 'error', message: 'Thiếu dữ liệu hợp lệ của lá số.' });
  }

  const customerName = String(inputData.name || 'Khách vãng lai').trim().slice(0, 120);
  const chartCode = String(req.body.chart_code || `TV-${crypto.randomUUID().slice(0, 8)}`).trim().slice(0, 40);
  const encodedImage = req.body.image_data;
  if (typeof encodedImage !== 'string' || !encodedImage.startsWith('data:image/jpeg;base64,')) {
    return res.status(400).json({ status: 'error', message: 'Chưa chụp được ảnh lá số. Vui lòng bấm lập lá số lại.' });
  }
  const imageBuffer = Buffer.from(encodedImage.slice('data:image/jpeg;base64,'.length), 'base64');
  if (!imageBuffer.length || imageBuffer.length > 5 * 1024 * 1024) {
    return res.status(413).json({ status: 'error', message: 'Ảnh lá số không hợp lệ hoặc vượt quá 5 MB.' });
  }

  const imageFilename = `${crypto.randomUUID()}.jpg`;
  const imagePath = path.join(imageDirectory, imageFilename);
  try {
    const authorization = req.get('authorization');
    let authenticatedUser = null;
    if (authorization) {
      authenticatedUser = await resolveSessionUser(authorization);
      if (!authenticatedUser) return res.status(401).json({ status: 'error', message: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.' });
    }
    const customerId = authenticatedUser ? await upsertCustomerAccount(authenticatedUser) : null;
    const verifiedName = authenticatedUser?.name || customerName;
    const verifiedEmail = authenticatedUser?.email || '';
    await writeFile(imagePath, imageBuffer, { flag: 'wx' });
    const [result] = await pool.execute(
      `INSERT INTO customer_chart_logs (customer_id, customer_name, customer_email, chart_code, birth_input, image_path)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [customerId, verifiedName, verifiedEmail, chartCode, JSON.stringify(inputData), imageFilename],
    );
    res.status(201).json({ status: 'success', data: { id: result.insertId, chart_code: chartCode } });
  } catch (error) {
    await unlink(imagePath).catch(() => {});
    console.error('Could not save customer chart log:', error.message);
    res.status(500).json({ status: 'error', message: 'Không thể lưu thông tin lá số.' });
  }
});

app.get('/api/admin/customer-logs/charts', requireManager, async (req, res) => {
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 50, 1), 100);
  const offset = Math.max(Number.parseInt(req.query.offset, 10) || 0, 0);
  try {
    const [rows] = await pool.execute(
      `SELECT id, customer_id, customer_name, customer_email, chart_code, birth_input, created_at
       FROM customer_chart_logs ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`,
      [limit, offset],
    );
    res.json({ status: 'success', data: rows.map((row) => ({
      ...row,
      input_data: parseJsonColumn(row.birth_input),
    })) });
  } catch (error) {
    console.error('Could not read customer chart logs:', error.message);
    res.status(500).json({ status: 'error', message: 'Không thể đọc danh sách lá số.' });
  }
});

app.delete('/api/admin/customer-logs/charts/:id', requireManager, async (req, res) => {
  const chartId = Number.parseInt(req.params.id, 10);
  if (!Number.isSafeInteger(chartId) || chartId < 1) {
    return res.status(400).json({ status: 'error', message: 'Mã lá số không hợp lệ.' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT image_path FROM customer_chart_logs WHERE id = ? LIMIT 1',
      [chartId],
    );
    if (!rows.length) {
      return res.status(404).json({ status: 'error', message: 'Không tìm thấy bản ghi lá số.' });
    }
    await pool.execute('DELETE FROM customer_chart_logs WHERE id = ?', [chartId]);
    if (rows[0].image_path) {
      await unlink(path.join(imageDirectory, path.basename(rows[0].image_path))).catch(() => {});
    }
    res.json({ status: 'success', message: 'Đã xóa bản ghi lá số.' });
  } catch (error) {
    console.error('Could not delete customer chart log:', error.message);
    res.status(500).json({ status: 'error', message: 'Không thể xóa bản ghi lá số.' });
  }
});

app.get('/api/admin/customer-accounts', requireManager, async (req, res) => {
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 100, 1), 200);
  try {
    const [rows] = await pool.execute(
      `SELECT id, email, display_name, avatar_url, role, login_count, first_login_at, last_login_at
       FROM customer_accounts WHERE role = 'user' ORDER BY last_login_at DESC, id DESC LIMIT ?`,
      [limit],
    );
    res.json({ status: 'success', data: rows });
  } catch (error) {
    console.error('Could not read Google customer accounts:', error.message);
    res.status(500).json({ status: 'error', message: 'Không thể đọc danh sách tài khoản khách hàng.' });
  }
});

app.delete('/api/admin/customer-accounts/:id', requireManager, async (req, res) => {
  const accountId = Number.parseInt(req.params.id, 10);
  if (!Number.isSafeInteger(accountId) || accountId < 1) {
    return res.status(400).json({ status: 'error', message: 'Mã tài khoản không hợp lệ.' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    await connection.execute('UPDATE customer_chart_logs SET customer_id = NULL WHERE customer_id = ?', [accountId]);
    const [result] = await connection.execute(
      "DELETE FROM customer_accounts WHERE id = ? AND role = 'user'",
      [accountId],
    );
    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ status: 'error', message: 'Không tìm thấy tài khoản khách hàng.' });
    }
    await connection.commit();
    res.json({ status: 'success', message: 'Đã xóa tài khoản khách hàng.' });
  } catch (error) {
    if (connection) await connection.rollback().catch(() => {});
    console.error('Could not delete customer account:', error.message);
    res.status(500).json({ status: 'error', message: 'Không thể xóa tài khoản khách hàng.' });
  } finally {
    connection?.release();
  }
});

app.get('/api/admin/customer-logs/charts/:id/image', requireManager, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT image_path FROM customer_chart_logs WHERE id = ? LIMIT 1',
      [req.params.id],
    );
    if (!rows.length || !rows[0].image_path) {
      return res.status(404).json({ status: 'error', message: 'Bản ghi này chưa có ảnh lá số.' });
    }
    const filename = path.basename(rows[0].image_path);
    res.type('image/jpeg').sendFile(filename, { root: imageDirectory }, (error) => {
      if (error && !res.headersSent) {
        res.status(error.code === 'ENOENT' ? 404 : 500).json({ status: 'error', message: 'Không tìm thấy tệp ảnh lá số.' });
      }
    });
  } catch (error) {
    console.error('Could not read customer chart image:', error.message);
    res.status(500).json({ status: 'error', message: 'Không thể đọc ảnh lá số.' });
  }
});

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ status: 'error', message: 'Dữ liệu JSON không hợp lệ.' });
  }
  res.status(500).json({ status: 'error', message: 'Lỗi máy chủ.' });
});

initializeDatabase().then(() => {
  app.listen(port, '0.0.0.0', () => console.log(`Customer API listening on port ${port}`));
}).catch((error) => {
  console.error('Could not initialize MySQL:', error.message);
  process.exit(1);
});
