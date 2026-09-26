import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import haLogo from '../assets/ha-logo.png';
import AuthModal from '../../features/auth/AuthModal';

const coreTools = [
  { label: 'LÁ SỐ TỬ VI', to: '/la-so-tu-vi' },
  { label: 'TAROT KIỀU', to: '/boi-kieu' },
  { label: 'KỲ MÔN', to: '/ky-mon-don-giap' },
  { label: 'PHONG THỦY', to: '/la-kinh-phong-thuy' },
  { label: 'LỊCH VẠN SỰ', to: '/lich-van-su' },
  { label: 'THẦN SỐ HỌC', to: '/than-so-hoc' },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tuvi_user');
      if (saved) setUser(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  const handleLogout = async () => {
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

  // Close mobile menu when navigating to another route
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="top-navigation-wrapper" ref={headerRef}>
      {/* HEADER ROW */}
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <div className="brand-logo-wrap">
              <img src={haLogo} alt="Tử Vi Hồng Ân Logo" className="brand-logo-img" />
            </div>
            <div className="logo-text">
              <h1 className="logo-main">TỬ VI HỒNG ÂN</h1>
            </div>
          </Link>

          {/* User Auth Badge (Google Avatar & Name/Email) - Desktop */}
          <div
            className="header-user-badge desktop-only"
            onClick={() => setAuthOpen(true)}
            title={user ? 'Quản lý tài khoản' : 'Đăng nhập tài khoản Google'}
          >
            <div className="user-avatar-wrap">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name || 'Người dùng'} className="user-avatar-img" />
              ) : (
                <div className="user-avatar-placeholder">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              )}
            </div>
            <div className="user-info-text">
              <span className="user-name-line">{user?.name || 'ĐĂNG NHẬP'}</span>
              <span className="user-email-line">{user?.email || 'TÀI KHOẢN GOOGLE'}</span>
            </div>
          </div>

          {/* 6 Quick Action Buttons (2 rows x 3 columns) */}
          <div className="header-quick-buttons desktop-only">
            <div className="quick-buttons-grid">
              {coreTools.map((btn) => (
                <Link
                  key={btn.label}
                  to={btn.to}
                  className={`header-quick-btn ${location.pathname === btn.to ? 'active' : ''}`}
                >
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Hotline Badge */}
          <div className="header-actions desktop-only">
            <div className="header-info-badge">
              <span className="info-title">TƯ VẤN HỌC THUẬT & LUẬN GIẢI</span>
              <a href="tel:0920461699" className="info-hotline">0920.461.699</a>
            </div>
          </div>

          {/* Mobile Search & Menu Button: placed in the same line with the logo */}
          <div className="mobile-header-controls mobile-only">
            <button
              type="button"
              className="mobile-auth-icon-btn"
              onClick={() => setAuthOpen(true)}
              aria-label="Đăng nhập"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt="User" className="user-avatar-img-sm" />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              )}
            </button>

            <button
              type="button"
              className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            >
              {mobileMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="mobile-menu-dropdown mobile-only">
            <div className="mobile-quick-buttons">
              <div className="quick-buttons-grid">
                {coreTools.map((btn) => (
                  <Link
                    key={btn.label}
                    to={btn.to}
                    className={`header-quick-btn ${location.pathname === btn.to ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {btn.label}
                  </Link>
                ))}
              </div>
            </div>
            <ul className="mobile-nav-menu">
              <li className={location.pathname === '/' ? 'active' : ''}>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  TRANG CHỦ
                </Link>
              </li>
              <li className={`has-mobile-dropdown ${mobileSubOpen ? 'open' : ''}`}>
                <div
                  className="mobile-dropdown-header"
                  onClick={() => setMobileSubOpen(!mobileSubOpen)}
                >
                  <span>CÔNG CỤ</span>
                  <span className="caret-mobile">{mobileSubOpen ? '▴' : '▾'}</span>
                </div>
                {mobileSubOpen && (
                  <ul className="mobile-submenu">
                    {coreTools.map((item) => (
                      <li key={item.label}>
                        <Link
                          to={item.to}
                          className={location.pathname === item.to ? 'active' : ''}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className={location.pathname.startsWith('/chuyen-muc') ? 'active' : ''}>
                <Link to="/chuyen-muc" onClick={() => setMobileMenuOpen(false)}>
                  BÀI VIẾT
                </Link>
              </li>
              <li className={location.pathname === '/dien-dan' ? 'active' : ''}>
                <Link to="/dien-dan" onClick={() => setMobileMenuOpen(false)}>
                  DIỄN ĐÀN
                </Link>
              </li>
              <li className={location.pathname === '/khoa-hoc' ? 'active' : ''}>
                <Link to="/khoa-hoc" onClick={() => setMobileMenuOpen(false)}>
                  KHÓA HỌC
                </Link>
              </li>
              <li className={location.pathname === '/cua-hang' ? 'active' : ''}>
                <Link to="/cua-hang" onClick={() => setMobileMenuOpen(false)}>
                  CỬA HÀNG
                </Link>
              </li>
              <li className={location.pathname === '/lien-he' ? 'active' : ''}>
                <Link to="/lien-he" onClick={() => setMobileMenuOpen(false)}>
                  LIÊN HỆ
                </Link>
              </li>
            </ul>

            <div className="mobile-menu-contact">
              <div className="mobile-contact-title">TƯ VẤN HỌC THUẬT & LUẬN GIẢI</div>
              <a href="tel:0920461699" className="mobile-hotline-btn">
                📞 0920.461.699
              </a>
            </div>
          </div>
        )}
      </header>

      {/* DESKTOP NAVBAR ROW (Hidden on mobile) */}
      <nav className="navbar desktop-only">
        <div className="navbar-container">
          <ul className="nav-menu">
            <li className={location.pathname === '/' ? 'nav-item active' : 'nav-item'}>
              <Link to="/">TRANG CHỦ</Link>
            </li>
            <li className="nav-item has-dropdown">
              <Link to="/la-so-tu-vi">
                CÔNG CỤ <span className="caret">▾</span>
              </Link>
              <ul className="dropdown-menu">
                {coreTools.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className={location.pathname === item.to ? 'active' : ''}
                    >
                      <span className="dd-label">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className={location.pathname.startsWith('/chuyen-muc') ? 'nav-item active' : 'nav-item'}>
              <Link to="/chuyen-muc">BÀI VIẾT</Link>
            </li>
            <li className={location.pathname === '/dien-dan' ? 'nav-item active' : 'nav-item'}>
              <Link to="/dien-dan">DIỄN ĐÀN</Link>
            </li>
            <li className={location.pathname === '/khoa-hoc' ? 'nav-item active' : 'nav-item'}>
              <Link to="/khoa-hoc">KHÓA HỌC</Link>
            </li>
            <li className={location.pathname === '/cua-hang' ? 'nav-item active' : 'nav-item'}>
              <Link to="/cua-hang">CỬA HÀNG</Link>
            </li>
            <li className={location.pathname === '/lien-he' ? 'nav-item active' : 'nav-item'}>
              <Link to="/lien-he">LIÊN HỆ</Link>
            </li>
          </ul>
        </div>
      </nav>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        user={user}
        onAuthSuccess={(u) => setUser(u)}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default Navbar;
