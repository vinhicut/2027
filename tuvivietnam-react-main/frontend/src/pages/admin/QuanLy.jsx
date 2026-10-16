import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, RefreshCw, Search, ShieldCheck, UserRound, Eye, X, Trash2 } from 'lucide-react';
import './QuanLy.css';

function formatBirth(input = {}) {
  const date = [input.day, input.month, input.year].filter((part) => part !== undefined && part !== '').join('/');
  const time = `${String(input.hour || 0).padStart(2, '0')}:${String(input.minute || 0).padStart(2, '0')}`;
  const calendar = input.is_solar === false || input.isSolar === false ? 'Âm lịch' : 'Dương lịch';
  return `${date} · ${time} · ${input.gender || ''} · ${calendar}`;
}

export default function QuanLy() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [imageError, setImageError] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [devLoginLoading, setDevLoginLoading] = useState(false);
  const [deletingAccountId, setDeletingAccountId] = useState(null);
  const [accountError, setAccountError] = useState('');
  const [deletingLogId, setDeletingLogId] = useState(null);
  const [logError, setLogError] = useState('');
  const isLocalDev = ['localhost', '127.0.0.1'].includes(window.location.hostname);

  const loadLogs = useCallback(async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('tuvi_token');
    if (!token) {
      setAuthorized(false);
      setError('Vui lòng đăng nhập bằng tài khoản quản lý để xem thông tin khách hàng.');
      setLoading(false);
      return;
    }

    try {
      const authResponse = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!authResponse.ok) throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      const authData = await authResponse.json();
      if (authData.user?.role !== 'manager') {
        setAuthorized(false);
        throw new Error('Tài khoản hiện tại không có quyền quản lý.');
      }
      setAuthorized(true);

      const response = await fetch('/api/admin/customer-logs/charts?limit=100', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Không tải được danh sách khách hàng.');
      setLogs(result.data || []);

      const accountsResponse = await fetch('/api/admin/customer-accounts?limit=100', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const accountsResult = await accountsResponse.json().catch(() => ({}));
      setAccounts(accountsResponse.ok ? (accountsResult.data || []) : []);
    } catch (loadError) {
      setError(loadError.message || 'Không tải được thông tin khách hàng.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loginAsLocalManager = async () => {
    setDevLoginLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/dev-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'manager' }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.token) throw new Error(result.message || 'Không đăng nhập được tài khoản quản lý thử nghiệm.');
      localStorage.setItem('tuvi_token', result.token);
      localStorage.setItem('tuvi_user', JSON.stringify(result.user || {}));
      await loadLogs();
    } catch (loginError) {
      setError(loginError.message || 'Không đăng nhập được tài khoản quản lý thử nghiệm.');
    } finally {
      setDevLoginLoading(false);
    }
  };

  const deleteCustomerAccount = async (account) => {
    const identity = account.display_name || account.email;
    if (!window.confirm(`Bạn có chắc muốn xóa tài khoản khách hàng ${identity}?`)) return;

    setDeletingAccountId(account.id);
    setAccountError('');
    try {
      const response = await fetch(`/api/admin/customer-accounts/${account.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('tuvi_token') || ''}` },
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Không thể xóa tài khoản khách hàng.');
      setAccounts((current) => current.filter((item) => item.id !== account.id));
    } catch (deleteError) {
      setAccountError(deleteError.message || 'Không thể xóa tài khoản khách hàng.');
    } finally {
      setDeletingAccountId(null);
    }
  };

  const deleteCustomerLog = async (log) => {
    const customerName = log.customer_name || 'khách vãng lai';
    if (!window.confirm(`Xóa lá số ${log.chart_code} của ${customerName}?`)) return;

    setDeletingLogId(log.id);
    setLogError('');
    try {
      const response = await fetch(`/api/admin/customer-logs/charts/${log.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('tuvi_token') || ''}` },
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Không thể xóa lá số.');
      setLogs((current) => current.filter((item) => item.id !== log.id));
      if (selectedLog?.id === log.id) setSelectedLog(null);
    } catch (deleteError) {
      setLogError(deleteError.message || 'Không thể xóa lá số.');
    } finally {
      setDeletingLogId(null);
    }
  };

  useEffect(() => { loadLogs(); }, [loadLogs]);

  useEffect(() => {
    if (!selectedLog) {
      setSelectedImage('');
      setImageError('');
      return undefined;
    }
    let objectUrl = '';
    const controller = new AbortController();
    setSelectedImage('');
    setImageError('');
    fetch(`/api/admin/customer-logs/charts/${selectedLog.id}/image`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('tuvi_token') || ''}` },
      signal: controller.signal,
    }).then(async (response) => {
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || 'Bản ghi này chưa có ảnh lá số.');
      }
      return response.blob();
    }).then((blob) => {
      objectUrl = URL.createObjectURL(blob);
      setSelectedImage(objectUrl);
    }).catch((error) => {
      if (error.name !== 'AbortError') setImageError(error.message || 'Không tải được ảnh lá số.');
    });
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [selectedLog]);

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('vi');
    if (!query) return logs;
    return logs.filter((log) => [log.customer_name, log.customer_email, log.chart_code]
      .some((value) => String(value || '').toLocaleLowerCase('vi').includes(query)));
  }, [logs, search]);

  return (
    <div className="customer-admin-page">
      <header className="customer-admin-heading">
        <div>
          <span className="customer-admin-eyebrow"><ShieldCheck size={15} /> KHU VỰC QUẢN TRỊ</span>
          <h1>Khách hàng lập lá số</h1>
          <p>Thông tin khách và lá số được gửi khi khách chủ động chọn lập lá số.</p>
        </div>
        <button type="button" className="customer-admin-refresh" onClick={loadLogs} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'customer-admin-spinning' : ''} /> Làm mới
        </button>
      </header>

      <section className="customer-admin-toolbar">
        <div className="customer-admin-count"><UserRound size={18} /><strong>{logs.length}</strong><span>lượt lập lá số gần nhất</span></div>
        <label className="customer-admin-search">
          <Search size={17} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm tên, email hoặc mã lá số" />
        </label>
      </section>

      <section className="customer-admin-accounts">
        <div className="customer-admin-section-heading"><h2>Tài khoản khách đã xác thực Google</h2><strong>{accounts.length}</strong></div>
        {accountError && <p className="customer-admin-account-error" role="alert">{accountError}</p>}
        {accounts.length === 0 ? <p>Chưa có khách đăng nhập Google.</p> : <div className="customer-admin-account-list">{accounts.map((account) => (
          <article className="customer-admin-account" key={account.id}>
            {account.avatar_url ? <img src={account.avatar_url} alt="" /> : <span className="customer-admin-account-avatar">{String(account.display_name || '?').slice(0, 1).toUpperCase()}</span>}
            <div><strong>{account.display_name}</strong><span>{account.email}</span></div>
            <div className="customer-admin-account-meta"><span>Đăng nhập {account.login_count} lần</span><span>Lần cuối: {new Date(account.last_login_at).toLocaleString('vi-VN')}</span></div>
            <button type="button" className="customer-admin-delete-button" onClick={() => deleteCustomerAccount(account)} disabled={deletingAccountId === account.id} aria-label={`Xóa tài khoản ${account.display_name || account.email}`}>
              <Trash2 size={15} /> {deletingAccountId === account.id ? 'Đang xóa…' : 'Xóa'}
            </button>
          </article>
        ))}</div>}
      </section>

      {error && <div className="customer-admin-alert"><AlertCircle size={18} /><span>{error}</span>{!authorized && isLocalDev && <button type="button" onClick={loginAsLocalManager} disabled={devLoginLoading}>{devLoginLoading ? 'Đang đăng nhập…' : 'Đăng nhập quản lý thử nghiệm'}</button>}{!authorized && <button type="button" onClick={() => navigate('/')}>Về trang chủ</button>}</div>}

      <section className="customer-admin-list">
        {logError && <div className="customer-admin-alert" role="alert"><AlertCircle size={18} /><span>{logError}</span></div>}
        {loading ? <div className="customer-admin-empty">Đang tải dữ liệu khách hàng…</div> : filteredLogs.length === 0 ? (
          <div className="customer-admin-empty">{logs.length ? 'Không tìm thấy khách phù hợp.' : 'Chưa có khách nào lập lá số.'}</div>
        ) : filteredLogs.map((log) => {
          const input = log.input_data || log.birth_input || {};
          return (
            <article className="customer-admin-card" key={log.id}>
              <div className="customer-admin-card-main">
                <div className="customer-admin-avatar"><UserRound size={20} /></div>
                <div className="customer-admin-card-copy">
                  <div className="customer-admin-name-row">
                    <h2>{log.customer_name || input.name || 'Khách vãng lai'}</h2>
                    <code>{log.chart_code}</code>
                  </div>
                  <p>{log.customer_email || 'Khách chưa đăng nhập'}{log.customer_id ? ` · Tài khoản #${log.customer_id}` : ''}</p>
                  <p className="customer-admin-birth">{formatBirth(input)}</p>
                </div>
                <div className="customer-admin-date">{new Date(log.created_at).toLocaleString('vi-VN')}</div>
              </div>
              <div className="customer-admin-card-actions">
                <button type="button" className="customer-admin-detail-button" onClick={() => setSelectedLog(log)}>
                  <Eye size={16} /> Xem thông tin lá số
                </button>
                <button type="button" className="customer-admin-log-delete-button" onClick={() => deleteCustomerLog(log)} disabled={deletingLogId === log.id}>
                  <Trash2 size={15} /> {deletingLogId === log.id ? 'Đang xóa…' : 'Xóa'}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {selectedLog && (
        <div className="customer-admin-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedLog(null); }}>
          <section className="customer-admin-dialog" role="dialog" aria-modal="true" aria-labelledby="customer-chart-title">
            <button type="button" className="customer-admin-close" onClick={() => setSelectedLog(null)} aria-label="Đóng"><X size={20} /></button>
            <span className="customer-admin-eyebrow">CHI TIẾT KHÁCH HÀNG</span>
            <h2 id="customer-chart-title">{selectedLog.customer_name || 'Khách vãng lai'}</h2>
            <div className="customer-admin-detail-grid">
              <div><span>Email</span><strong>{selectedLog.customer_email || 'Chưa có email'}</strong></div>
              <div><span>Mã lá số</span><strong>{selectedLog.chart_code}</strong></div>
              <div><span>Ngày giờ sinh</span><strong>{formatBirth(selectedLog.input_data || selectedLog.birth_input || {})}</strong></div>
              <div><span>Thời điểm lập</span><strong>{new Date(selectedLog.created_at).toLocaleString('vi-VN')}</strong></div>
            </div>
            <h3>Ảnh lá số</h3>
            {selectedImage ? <a className="customer-admin-chart-image-link" href={selectedImage} target="_blank" rel="noreferrer" title="Mở ảnh gốc để phóng to"><img className="customer-admin-chart-image" src={selectedImage} alt={`Lá số ${selectedLog.customer_name || ''}`} /><span>Nhấn vào ảnh để mở ảnh gốc và phóng to</span></a> : <p className="customer-admin-image-note">{imageError || 'Đang tải ảnh lá số…'}</p>}
          </section>
        </div>
      )}
    </div>
  );
}
