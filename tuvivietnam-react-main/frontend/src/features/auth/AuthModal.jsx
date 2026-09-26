import React, { useState, useEffect, useRef } from 'react';
import './AuthModal.css';

const API = import.meta.env.VITE_API_URL || '';

function AuthModal({ open, onClose, user, onAuthSuccess, onLogout }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const googleBtnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setError('');

    if (user) return; // Already logged in, no need to init GSI

    const initGoogleGSI = () => {
      const clientId =
        import.meta.env.VITE_GOOGLE_CLIENT_ID ||
        '714306691526-iq2uodqu69fdcdalibn2ipgia2t4lqvs.apps.googleusercontent.com';

      if (window.google?.accounts?.id && googleBtnRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCredentialResponse,
          });

          googleBtnRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'filled_blue',
            size: 'large',
            width: 300,
            text: 'signin_with',
            shape: 'rectangular',
            logo_alignment: 'left',
          });
        } catch (e) {
          console.warn('Google GSI initialization notice:', e);
        }
      }
    };

    const timer = setTimeout(initGoogleGSI, 100);
    return () => clearTimeout(timer);
  }, [open, user]);

  if (!open) return null;

  const handleGoogleCredentialResponse = async (response) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Xác thực Google thất bại');

      localStorage.setItem('tuvi_token', data.token);
      localStorage.setItem('tuvi_user', JSON.stringify(data.user));
      onAuthSuccess?.(data.user);
      onClose?.();
    } catch (err) {
      setError(err.message || 'Không thể kết nối đến máy chủ xác thực.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    onLogout?.();
    onClose?.();
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose} type="button" title="Đóng">
          ×
        </button>

        {user ? (
          <div className="auth-logged-in-box">
            <div className="auth-user-card">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="auth-user-avatar-lg" />
              ) : (
                <div className="auth-user-avatar-lg default">👤</div>
              )}
              <div className="auth-user-name">{user.name}</div>
              <div className="auth-user-email">{user.email}</div>
            </div>
            <button type="button" className="btn-auth-logout" onClick={handleLogout}>
              ĐĂNG XUẤT
            </button>
          </div>
        ) : (
          <div className="auth-signin-box">
            <p className="auth-single-instruction">
              Đăng nhập để lưu trữ<br />và quản lý các lá số của bạn
            </p>

            {error && <div className="auth-error">{error}</div>}

            <div className="google-btn-wrapper" ref={googleBtnRef}></div>
          </div>
        )}

        {loading && (
          <div className="auth-loading-overlay">
            <div className="spinner-small"></div>
            <span>Đang xử lý...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
