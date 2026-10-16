import React, { useState, useEffect } from 'react';
import './AdminModal.css';

function AdminModal({ open, onClose }) {
  const [tab, setTab] = useState('stats'); // 'stats' | 'users' | 'charts'
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [charts, setCharts] = useState([]);
  const [customerLogs, setCustomerLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('tuvi_token');

  useEffect(() => {
    if (!open || !token) return;

    const loadData = async () => {
      setLoading(true);
      setError('');
      try {
        const headers = { Authorization: `Bearer ${token}` };

        if (tab === 'stats') {
          const res = await fetch('/api/admin/stats', { headers });
          if (!res.ok) throw new Error('Không thể tải dữ liệu thống kê');
          const data = await res.json();
          setStats(data.data);
        } else if (tab === 'users') {
          const res = await fetch('/api/admin/users', { headers });
          if (!res.ok) throw new Error('Không thể tải danh sách người dùng');
          const data = await res.json();
          setUsers(data.data || []);
        } else if (tab === 'charts') {
          const url = search
            ? `/api/admin/charts?search=${encodeURIComponent(search)}`
            : '/api/admin/charts';
          const res = await fetch(url, { headers });
          if (!res.ok) throw new Error('Không thể tải danh sách lá số');
          const data = await res.json();
          setCharts(data.data || []);
        } else if (tab === 'leads') {
          const res = await fetch('/api/admin/customer-logs/charts', { headers });
          if (!res.ok) throw new Error('Không thể tải danh sách khách lập lá số');
          const data = await res.json();
          setCustomerLogs(data.data || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [open, tab, search, token]);

  if (!open) return null;

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-header">
          <div className="admin-title-wrap">
            <span className="admin-badge">MANAGER PORTAL</span>
            <h2>Bảng Điều Khiển Quản Lý (Manager)</h2>
          </div>
          <button className="admin-close" onClick={onClose} type="button">
            ×
          </button>
        </div>

        <div className="admin-tabs">
          <button
            type="button"
            className={tab === 'stats' ? 'active' : ''}
            onClick={() => setTab('stats')}
          >
            📊 Thống Kê Tổng Quan
          </button>
          <button
            type="button"
            className={tab === 'users' ? 'active' : ''}
            onClick={() => setTab('users')}
          >
            👥 Quản Lý Người Dùng
          </button>
          <button
            type="button"
            className={tab === 'charts' ? 'active' : ''}
            onClick={() => setTab('charts')}
          >
            📜 Toàn Bộ Lá Số Đã Lưu
          </button>
          <button type="button" className={tab === 'leads' ? 'active' : ''} onClick={() => setTab('leads')}>
            {'Kh\u00e1ch l\u1eadp l\u00e1 s\u1ed1'} ({customerLogs.length})
          </button>
        </div>

        {error && <div className="admin-error">{error}</div>}

        <div className="admin-body">
          {loading && <div className="admin-loading">Đang tải dữ liệu...</div>}

          {/* TAB 1: THỐNG KÊ */}
          {!loading && tab === 'stats' && stats && (
            <div className="admin-stats-grid">
              <div className="stat-card">
                <span className="stat-icon">👥</span>
                <span className="stat-num">{stats.total_users}</span>
                <span className="stat-label">Tổng người dùng</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">⭐</span>
                <span className="stat-num">{stats.total_managers}</span>
                <span className="stat-label">Số Quản lý (Manager)</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">📜</span>
                <span className="stat-num">{stats.total_charts}</span>
                <span className="stat-label">Tổng lá số đã lưu</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">⚡</span>
                <span className="stat-num">{stats.active_sessions}</span>
                <span className="stat-label">Phiên đang hoạt động</span>
              </div>
            </div>
          )}

          {/* TAB 2: NGƯỜI DÙNG */}
          {!loading && tab === 'users' && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Số lá số</th>
                    <th>Đăng nhập gần nhất</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>
                        <strong>{u.name}</strong>
                      </td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`role-pill role-${u.role}`}>
                          {u.role === 'manager' ? '⭐ Quản lý' : 'Thành viên'}
                        </span>
                      </td>
                      <td>{u.total_charts || 0}</td>
                      <td>{new Date(u.last_login_at).toLocaleString('vi-VN')}</td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center' }}>
                        Chưa có người dùng nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: TOÀN BỘ LÁ SỐ */}
          {!loading && tab === 'charts' && (
            <div>
              <div className="admin-search-row">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo Họ tên, Mã lá số, Email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="admin-search-input"
                />
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Mã lá số</th>
                      <th>Họ tên đương số</th>
                      <th>Giới tính</th>
                      <th>Ngày sinh</th>
                      <th>Người tạo</th>
                      <th>Thời gian lưu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {charts.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <code className="chart-code-badge">{c.chart_code}</code>
                        </td>
                        <td>
                          <strong>{c.ho_ten}</strong>
                        </td>
                        <td>{c.gioi_tinh}</td>
                        <td>
                          {c.ngay_sinh}/{c.thang_sinh}/{c.nam_sinh} ({c.gio_sinh}:{String(c.phut_sinh).padStart(2, '0')})
                        </td>
                        <td>
                          {c.user_name} <br />
                          <small style={{ color: '#64748b' }}>{c.user_email}</small>
                        </td>
                        <td>{new Date(c.updated_at).toLocaleString('vi-VN')}</td>
                      </tr>
                    ))}
                    {charts.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center' }}>
                          Không tìm thấy lá số nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!loading && tab === 'leads' && (
            <div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>{'Th\u1eddi gian'}</th><th>{'Kh\u00e1ch h\u00e0ng'}</th><th>{'Email t\u00e0i kho\u1ea3n'}</th><th>{'M\u00e3 l\u00e1 s\u1ed1'}</th><th>{'Ng\u00e0y gi\u1edd sinh'}</th><th></th></tr></thead>
                  <tbody>
                    {customerLogs.map((log) => {
                      const input = log.input_data || {};
                      return <tr key={log.id}>
                        <td>{new Date(log.created_at).toLocaleString('vi-VN')}</td>
                        <td><strong>{log.customer_name}</strong></td>
                        <td>{log.customer_email || 'Kh\u00e1ch ch\u01b0a \u0111\u0103ng nh\u1eadp'}</td>
                        <td><code className="chart-code-badge">{log.chart_code}</code></td>
                        <td>{input.day}/{input.month}/{input.year} - {String(input.hour || 0).padStart(2, '0')}:{String(input.minute || 0).padStart(2, '0')} - {input.gender}</td>
                        <td><button type="button" className="admin-log-view" onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}>{selectedLog?.id === log.id ? '\u0110\u00f3ng' : 'Xem l\u00e1 s\u1ed1'}</button></td>
                      </tr>;
                    })}
                    {customerLogs.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center' }}>{'Ch\u01b0a c\u00f3 kh\u00e1ch n\u00e0o l\u1eadp l\u00e1 s\u1ed1.'}</td></tr>}
                  </tbody>
                </table>
              </div>
              {selectedLog && <section className="admin-chart-detail">
                <h3>{selectedLog.customer_name} - {selectedLog.chart_code}</h3>
                <p>Email: {selectedLog.customer_email || 'Ch\u01b0a c\u00f3 email t\u00e0i kho\u1ea3n'}</p>
                <p>{'Ng\u00e0y l\u1eadp'}: {new Date(selectedLog.created_at).toLocaleString('vi-VN')}</p>
                <h4>{'Th\u00f4ng tin l\u00e1 s\u1ed1'}</h4>
                <pre>{JSON.stringify(selectedLog.chart_data, null, 2)}</pre>
              </section>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminModal;
