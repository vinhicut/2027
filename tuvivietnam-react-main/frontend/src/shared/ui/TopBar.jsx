import React, { useState, useEffect } from 'react';
import AuthModal from '../../features/auth/AuthModal';
import AdminModal from '../../features/admin-dashboard/AdminModal';
import './TopBar.css';

function TopBar() {
  const [authOpen, setAuthOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [user, setUser] = useState(null);

  const today = new Date();
  const dateStr = today
    .toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .replace(/^./, (c) => c.toUpperCase());

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tuvi_user');
      if (saved) setUser(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  const logout = async (e) => {
    if (e) e.preventDefault();
    const token = localStorage.getItem('tuvi_token');
    try {
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch {
      /* ignore */
    }
    localStorage.removeItem('tuvi_token');
    localStorage.removeItem('tuvi_user');
    setUser(null);
  };

  const displayName = user?.name || user?.username || user?.email?.split('@')[0] || 'Khách';

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <span className="date">{dateStr}</span>
        </div>
        <div className="top-bar-right">
          {user ? (
            <div className="top-bar-user-wrap">
              {user.avatar ? (
                <img src={user.avatar} alt={displayName} className="user-avatar-thumb" />
              ) : (
                <span className="user-avatar-thumb default-avatar">👤</span>
              )}
              <span className="user-greeting-name">{displayName}</span>
              <span className={`role-tag ${user.role === 'manager' ? 'manager' : 'user'}`}>
                {user.role === 'manager' ? 'MANAGER' : 'THÀNH VIÊN'}
              </span>
              {user.role === 'manager' && (
                <button
                  type="button"
                  className="btn-open-admin"
                  onClick={() => setAdminOpen(true)}
                  title="Mở Bảng Điều Khiển Quản Lý"
                >
                  ⚙ Quản trị
                </button>
              )}
              <a href="#" className="btn-topbar-logout" onClick={logout}>
                Đăng xuất
              </a>
            </div>
          ) : (
            <a
              href="#"
              className="btn-topbar-login"
              onClick={(e) => {
                e.preventDefault();
                setAuthOpen(true);
              }}
            >
              🔐 Đăng nhập Google / Đăng ký
            </a>
          )}
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">
              f
            </a>
            <a href="mailto:lienhe@tuvihongan.com" title="Email">
              ✉
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube">
              ▶
            </a>
          </div>
        </div>
      </div>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
      />

      <AdminModal
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </>
  );
}

export default TopBar;
