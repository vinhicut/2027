import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Compass,
  BookOpen,
  Crown,
  Phone,
  ArrowRight,
  Star,
  ExternalLink,
  Copy,
  Check,
  Menu,
  X,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  // Navigation & UI state
  const [activeSection, setActiveSection] = useState('service');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Copy phone state
  const [copiedPhone, setCopiedPhone] = useState(null);

  // Booking Form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    topic: 'Luận giải toàn diện 12 cung trọn đời',
    note: '',
  });

  const copyToClipboard = (phone, e) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const serviceEl = document.getElementById('service');
      if (serviceEl) {
        serviceEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleNavItemClick = (id) => {
    if (id === 'tuvi') {
      navigate('/la-so-tu-vi');
      return;
    }

    if (id === 'tarot') {
      navigate('/boi-kieu');
      return;
    }

    scrollToSection(id);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const navItems = [
    { id: 'tuvi', label: 'LẬP LÁ SỐ TỬ VI', icon: Sparkles, badge: 'Miễn phí' },
    { id: 'batquai', label: 'BÁT QUÁI - PHONG THỦY', icon: Compass, badge: 'Miễn phí' },
    { id: 'tarot', label: 'TAROT KIỀU', icon: BookOpen, badge: 'Miễn phí' },
    { id: 'service', label: 'LUẬN GIẢI 199K', icon: Crown, highlight: true },
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-stone-800 flex flex-col font-sans selection:bg-amber-600 selection:text-white relative">
      {/* Embedded Component CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .font-cinzel { font-family: 'Cinzel Decorative', cursive, serif; }
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
        .font-display { font-family: 'Playfair Display', Georgia, Cambria, 'Times New Roman', Times, serif; }

        /* Custom oriental scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f5efe6;
        }
        ::-webkit-scrollbar-thumb {
          background: #d4c5b1;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #b45309;
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 1. HEADER & NAVIGATION                                                    */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#fffdfa]/95 backdrop-blur-md border-b border-amber-200/80 text-stone-800 shadow-sm">
        {/* Top Banner Notice */}
        <div className="bg-gradient-to-r from-amber-700 via-red-800 to-amber-800 text-white text-xs py-1.5 px-4 shadow-inner">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 font-medium">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>
                Luận giải đầy đủ chi tiết chỉ{' '}
                <strong className="text-yellow-200 font-bold">199k</strong> tại{' '}
                <a
                  href="https://www.tuvihongan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-yellow-200 transition-colors font-semibold"
                >
                  www.tuvihongan.com
                </a>
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="hidden sm:inline text-amber-100">
                Đặt lịch riêng với thầy qua Zalo:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://zalo.me/0924616199"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-stone-900 hover:text-stone-950 bg-amber-100 hover:bg-white px-2.5 py-0.5 rounded-full font-semibold border border-amber-300 transition-all shadow-xs"
                  title="Mở Zalo nhắn tin trực tiếp"
                >
                  <Phone className="w-3 h-3 text-emerald-700" />
                  <span>0924.6161.99</span>
                  <button
                    type="button"
                    onClick={(e) => copyToClipboard('0924616199', e)}
                    className="hover:text-amber-800 ml-0.5 cursor-pointer"
                    title="Sao chép số"
                  >
                    {copiedPhone === '0924616199' ? (
                      <Check className="w-3 h-3 text-emerald-700" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-60" />
                    )}
                  </button>
                </a>
                <a
                  href="https://zalo.me/0385497085"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 text-stone-900 hover:text-stone-950 bg-amber-100 hover:bg-white px-2.5 py-0.5 rounded-full font-semibold border border-amber-300 transition-all shadow-xs"
                  title="Mở Zalo nhắn tin trực tiếp"
                >
                  <Phone className="w-3 h-3 text-emerald-700" />
                  <span>0385.497.085</span>
                  <button
                    type="button"
                    onClick={(e) => copyToClipboard('0385497085', e)}
                    className="hover:text-amber-800 ml-0.5 cursor-pointer"
                    title="Sao chép số"
                  >
                    {copiedPhone === '0385497085' ? (
                      <Check className="w-3 h-3 text-emerald-700" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-60" />
                    )}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400 bg-[#fffaf2] shadow-md">
              <img
                src="/logo.jpg"
                alt="Tử Vi Hồng Ân Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl sm:text-2xl tracking-wide text-stone-900">
                  Tử Vi{' '}
                  <span className="bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent">
                    Hồng Ân
                  </span>
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium tracking-wider">
                www.tuvihongan.com • Soi Mệnh - Đắc Thời - Định Hướng
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavItemClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
                    item.highlight
                      ? 'bg-gradient-to-r from-red-700 via-amber-700 to-red-800 text-white shadow-md hover:brightness-105 border border-red-800/30'
                      : isActive
                      ? 'bg-amber-100/90 text-amber-900 border border-amber-300 font-bold'
                      : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50/80 border border-transparent'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      item.highlight ? 'text-yellow-300' : 'text-amber-700'
                    }`}
                  />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-amber-900 hover:bg-amber-100/60 rounded-lg cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#fffdfa] border-b border-amber-200 px-4 py-4 space-y-2 shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavItemClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between cursor-pointer ${
                    item.highlight
                      ? 'bg-gradient-to-r from-red-700 to-amber-700 text-white font-semibold'
                      : 'text-stone-700 hover:bg-amber-50 hover:text-amber-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-amber-700" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2 text-xs">
              <a
                href="https://zalo.me/0924616199"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 py-2 rounded-xl border border-emerald-200 font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>Zalo 1: 0924.6161.99</span>
              </a>
              <a
                href="https://zalo.me/0385497085"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 py-2 rounded-xl border border-emerald-200 font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>Zalo 2: 0385.497.085</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT SECTIONS                                                  */}
      {/* ========================================================================= */}
      <main className="flex-1">
        {/* HERO BANNER SECTION */}
        <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 bg-gradient-to-b from-[#fffefc] via-[#fbf8f2] to-[#f6f1e8] border-b border-amber-200/60">
          {/* Background Decorative Warm Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-200/30 via-red-100/20 to-transparent blur-3xl pointer-events-none -z-0" />
          <div className="absolute -top-32 right-10 w-96 h-96 rounded-full border border-amber-300/30 pointer-events-none -z-0" />
          <div className="absolute -top-20 right-24 w-72 h-72 rounded-full border border-amber-400/20 border-dashed pointer-events-none -z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Top Tagline */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Khai Quang Vận Mệnh • Bát Trạch Phong Thủy • Thi Ca Bói Kiều</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-900 text-xs font-bold">
                <Crown className="w-3.5 h-3.5 text-amber-700" />
                <span>Chính Thức: tuvihongan.com</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-stone-900 mb-4 leading-tight sm:leading-tight">
                Tử Vi{' '}
                <span className="bg-gradient-to-r from-red-800 via-amber-700 to-amber-900 bg-clip-text text-transparent">
                  Hồng Ân
                </span>
              </h1>
              <p className="text-base sm:text-xl text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
                Soi tỏ cung Mệnh, định hướng công danh tài lộc, hòa hợp nhân duyên và khai thông vượng khí nhà ở - cơ quan qua thuật số Đông phương chính thống.
              </p>

              {/* Special Promo Highlight Box: 199k & Zalo Booking */}
              <div className="max-w-3xl mx-auto p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#fffdfa] via-white to-amber-50/50 border-2 border-amber-400/80 shadow-[0_10px_35px_rgba(217,119,6,0.12)] mb-10 text-left">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-amber-600 text-white tracking-wide uppercase shadow-xs">
                        Dịch Vụ Nổi Bật
                      </span>
                      <span className="text-xs text-amber-800 font-semibold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" /> Luận giải 1-1 chuyên sâu
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
                      Luận giải đầy đủ{' '}
                      <span className="text-red-700 text-2xl sm:text-3xl font-extrabold underline decoration-amber-500">
                        199k
                      </span>{' '}
                      tại{' '}
                      <a
                        href="https://tuvihongan.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-800 hover:text-red-700 transition-colors inline-flex items-center gap-1 font-bold underline"
                      >
                        tuvihongan.com <ExternalLink className="w-4 h-4" />
                      </a>
                    </h2>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      Bản giải đoán trọn đời 12 cung, 10 năm đại vận, tiểu vận chi tiết, phong thủy tài lộc kích tài tăng phúc.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => scrollToSection('service')}
                      className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-red-700 via-amber-700 to-red-800 text-white font-bold text-sm hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Crown className="w-4 h-4 text-yellow-300" />
                      <span>Đăng Ký Luận 199k</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href="https://zalo.me/0924616199"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Zalo: 0924.6161.99</span>
                      </a>
                      <a
                        href="https://zalo.me/0385497085"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-700" />
                        <span>0385.497.085</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Core Content Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 pt-2">
              {/* Module 1: LẬP LÁ SỐ TỬ VI */}
              <div
                id="card-tuvi-intro"
                onClick={() => navigate('/la-so-tu-vi')}
                className="group relative rounded-3xl bg-white p-6 sm:p-7 border border-amber-200/80 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(180,130,60,0.15)] cursor-pointer flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 group-hover:scale-105 transition-transform shadow-xs">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                      Miễn phí
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-bold text-stone-900 group-hover:text-amber-800 transition-colors mb-2">
                      LẬP LÁ SỐ TỬ VI
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Giải đoán Mệnh - Tài - Quan, Vận hạn, Tình duyên, v.v. Chiêm nghiệm bản mệnh theo ngày giờ sinh chính xác.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-1.5 text-xs">
                    <span className="bg-amber-50/70 text-amber-900 font-medium px-2.5 py-1 rounded-lg border border-amber-200/70">
                      Cung Mệnh
                    </span>
                    <span className="bg-amber-50/70 text-amber-900 font-medium px-2.5 py-1 rounded-lg border border-amber-200/70">
                      Quan Lộc
                    </span>
                    <span className="bg-amber-50/70 text-amber-900 font-medium px-2.5 py-1 rounded-lg border border-amber-200/70">
                      Tài Bạch
                    </span>
                    <span className="bg-amber-50/70 text-amber-900 font-medium px-2.5 py-1 rounded-lg border border-amber-200/70">
                      Phu Thê
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-red-700">
                  <span>Lập lá số ngay</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Module 2: BÁT QUÁI, PHONG THỦY */}
              <div
                id="card-batquai-intro"
                onClick={() => scrollToSection('service')}
                className="group relative rounded-3xl bg-white p-6 sm:p-7 border border-amber-200/80 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(180,130,60,0.15)] cursor-pointer flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 group-hover:scale-105 transition-transform shadow-xs">
                      <Compass className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                      Miễn phí
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-bold text-stone-900 group-hover:text-amber-800 transition-colors mb-2">
                      BÁT QUÁI, PHONG THỦY
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Phu Thê - Tử Tức - Đồng nghiệp xung hợp? Phong Thủy Nhà Ở / Cơ Quan xung hợp? Tra cứu Cung Phi và Bát Trạch.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-1.5 text-xs">
                    <span className="bg-amber-50/70 text-amber-900 font-medium px-2.5 py-1 rounded-lg border border-amber-200/70">
                      Cung Phi Bát Trạch
                    </span>
                    <span className="bg-amber-50/70 text-amber-900 font-medium px-2.5 py-1 rounded-lg border border-amber-200/70">
                      Xung Hợp Nhân Duyên
                    </span>
                    <span className="bg-amber-50/70 text-amber-900 font-medium px-2.5 py-1 rounded-lg border border-amber-200/70">
                      Hướng Nhà & Bàn Làm Việc
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-red-700">
                  <span>Tra cứu xung hợp</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Module 3: TARROT KIỀU */}
              <div
                id="card-tarot-intro"
                onClick={() => navigate('/boi-kieu')}
                className="group relative rounded-3xl bg-white p-6 sm:p-7 border border-amber-200/80 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(180,130,60,0.15)] cursor-pointer flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 group-hover:scale-105 transition-transform shadow-xs">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                      Miễn phí
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-bold text-stone-900 group-hover:text-amber-800 transition-colors mb-2">
                      TAROT KIỀU
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Xin quẻ Bói Kiều (Miễn phí). Lắng nghe vần thơ Đoạn Trường Tân Thanh định hướng tâm trí, nhân duyên, tài vận.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-1.5 text-xs">
                    <span className="bg-amber-50/70 text-amber-900 font-medium px-2.5 py-1 rounded-lg border border-amber-200/70">
                      3254 Câu Thơ Kiều
                    </span>
                    <span className="bg-amber-50/70 text-amber-900 font-medium px-2.5 py-1 rounded-lg border border-amber-200/70">
                      Tịnh Tâm Rút Quẻ
                    </span>
                    <span className="bg-amber-50/70 text-amber-900 font-medium px-2.5 py-1 rounded-lg border border-amber-200/70">
                      Lời Bình & Điềm Báo
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-red-700">
                  <span>Thành tâm xin quẻ</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING & CONSULTATION SECTION */}
        <section
          id="service"
          className="py-14 sm:py-20 bg-gradient-to-b from-[#f8f4ec] via-[#fcfaf7] to-[#fffefc] border-t border-amber-200/70 text-stone-800 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Title */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-900 text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
                <Crown className="w-3.5 h-3.5 text-amber-700" />
                <span>Dịch Vụ Cao Cấp • www.tuvihongan.com</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight mb-3">
                Luận Giải Chuyên Sâu & Đặt Lịch Cùng Thầy
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Nhận bản giải đoán toàn diện 12 cung đời người hoặc đàm thoại trực tiếp 1-1 với Thầy Hồng Ân để định hướng tương lai vững chắc.
              </p>
            </div>

            {/* 2 Main Columns: Gói 199k & Đặt lịch Zalo với thầy */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Card 1: Gói Luận Giải 199k */}
              <div className="lg:col-span-6 bg-gradient-to-b from-white via-[#fffdf9] to-[#fff9ee] p-6 sm:p-8 rounded-3xl border-2 border-amber-400 shadow-md relative flex flex-col justify-between overflow-hidden">
                {/* Corner Badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-l from-red-700 to-amber-600 text-white text-xs font-extrabold px-6 py-1.5 rounded-bl-2xl shadow-sm uppercase tracking-wide">
                  Được Lựa Chọn Nhiều Nhất
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-xs text-amber-800 font-bold uppercase tracking-wider block mb-1">
                      Gói Luận Giải Đầy Đủ
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
                      Luận Giải Chi Tiết Trọn Đời
                    </h3>
                    <div className="mt-4 flex items-baseline gap-3">
                      <span className="text-4xl sm:text-5xl font-extrabold text-red-700 font-display">
                        199.000đ
                      </span>
                      <span className="text-stone-400 line-through text-sm">499.000đ</span>
                      <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Tiết kiệm 60%
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-2 font-medium">
                      Áp dụng chính thức tại website:{' '}
                      <a
                        href="https://www.tuvihongan.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-800 underline font-bold hover:text-red-700"
                      >
                        www.tuvihongan.com
                      </a>
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-stone-900 uppercase tracking-wide block">
                      Quyền lợi bản luận giải 199k bao gồm:
                    </span>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Bản luận giải PDF 15 - 20 trang</strong> chi tiết, rõ ràng, lưu trữ trọn đời.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Giải đoán toàn diện 12 cung</strong>: Mệnh, Thân, Quan Lộc, Tài Bạch, Phu Thê, Tử Tức, Điền Trạch, Phúc Đức, v.v.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Chi tiết 10 năm đại vận</strong> và diễn biến tiểu vận từng tháng trong năm nay & năm tới.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Phương pháp hóa giải sao xấu</strong>: Kình Đà, Không Kiếp, Hỏa Linh, Tang Hổ, thị phi tài lộc.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Tư vấn phong thủy kích hoạt tài lộc</strong>: Chọn màu sắc, số may mắn, hướng bàn làm việc & nhà ở.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-8 space-y-3">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-700 via-amber-700 to-red-800 text-white font-bold text-sm sm:text-base hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Crown className="w-5 h-5 text-yellow-300" />
                    <span>Đăng Ký Luận Giải 199k Ngay</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 px-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Bảo mật thông tin đương số 100%
                    </span>
                    <span>Nhận kết quả trong 24h</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Đặt Lịch Riêng Với Thầy Qua Zalo */}
              <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="pb-4 border-b border-stone-200">
                    <span className="text-xs text-amber-800 font-bold uppercase tracking-wider block mb-1">
                      Tư Vấn Trực Tiếp 1-1
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
                      Đặt Lịch Luận Giải Riêng Với Thầy
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                      Trực tiếp đàm thoại qua Zalo (gọi thoại hoặc gọi video) cùng Thầy Hồng Ân để tháo gỡ vướng mắc, soi cung duyên nợ, định hướng kinh doanh.
                    </p>
                  </div>

                  {/* 2 Số Hotline Zalo nổi bật */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wide block">
                      Liên hệ trực tiếp qua 2 số Zalo chính thức:
                    </span>

                    {/* Zalo 1 */}
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-300 flex items-center justify-center text-emerald-800">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs text-stone-500 font-medium">Hotline Zalo 1:</div>
                          <div className="font-bold text-base text-stone-900">0924.6161.99</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => copyToClipboard('0924616199')}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                        >
                          {copiedPhone === '0924616199' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Đã chép</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 opacity-70" />
                              <span>Sao chép</span>
                            </>
                          )}
                        </button>
                        <a
                          href="https://zalo.me/0924616199"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Nhắn Zalo</span>
                        </a>
                      </div>
                    </div>

                    {/* Zalo 2 */}
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-300 flex items-center justify-center text-emerald-800">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs text-stone-500 font-medium">Hotline Zalo 2:</div>
                          <div className="font-bold text-base text-stone-900">0385.497.085</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => copyToClipboard('0385497085')}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                        >
                          {copiedPhone === '0385497085' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Đã chép</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 opacity-70" />
                              <span>Sao chép</span>
                            </>
                          )}
                        </button>
                        <a
                          href="https://zalo.me/0385497085"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Nhắn Zalo</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Form để lại thông tin hẹn giờ tư vấn */}
                  <div className="p-4 rounded-2xl bg-[#fffdf9] border border-amber-200/80 space-y-3">
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wide block">
                      Hoặc để lại thông tin để Thầy liên hệ lại:
                    </span>

                    {formSubmitted ? (
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-1">
                        <div className="font-bold text-sm flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          <span>Đã gửi thông tin thành công!</span>
                        </div>
                        <p>Thầy Hồng Ân sẽ liên hệ qua số Zalo của quý khách trong thời gian sớm nhất.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="space-y-2.5 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Họ và tên của bạn *"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="px-3 py-2 rounded-xl bg-[#fcfaf7] border border-stone-300 text-stone-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-500"
                          />
                          <input
                            type="tel"
                            placeholder="Số điện thoại Zalo *"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            className="px-3 py-2 rounded-xl bg-[#fcfaf7] border border-stone-300 text-stone-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                        <select
                          value={formData.topic}
                          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#fcfaf7] border border-stone-300 text-stone-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-500 font-medium"
                        >
                          <option>Luận giải toàn diện 12 cung trọn đời</option>
                          <option>Tình duyên, hôn nhân, xung hợp phu thê</option>
                          <option>Công danh, sự nghiệp, kinh doanh, đối tác</option>
                          <option>Phong thủy nhà ở, cơ quan, hướng đất</option>
                          <option>Xem vận hạn năm nay & hóa giải sao xấu</option>
                        </select>
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold border border-amber-300 transition-colors shadow-2xs cursor-pointer"
                        >
                          Gửi Thông Tin Đặt Lịch Hẹn
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment / Booking Modal */}
          {showPaymentModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
              <div className="bg-white border-2 border-amber-400 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-stone-800 relative">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-xl font-bold cursor-pointer"
                >
                  ✕
                </button>

                <div className="text-center space-y-2 mb-6">
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-700">
                    <Crown className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-stone-900">
                    Đăng Ký Luận Giải Đầy Đủ 199k
                  </h4>
                  <p className="text-xs text-stone-500 font-medium">
                    Tử Vi Hồng Ân • www.tuvihongan.com
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                    <div className="flex justify-between pb-2 border-b border-amber-200 text-sm">
                      <span className="font-medium text-stone-700">Chi phí luận giải:</span>
                      <strong className="text-red-700 text-base font-bold">199.000 VNĐ</strong>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      Quý khách vui lòng nhắn tin trực tiếp qua Zalo để gửi ngày giờ sinh và nhận bản luận giải PDF 15-20 trang trong vòng 24 giờ.
                    </p>
                  </div>

                  {/* Zalo Direct Buttons */}
                  <div className="space-y-2 pt-2">
                    <a
                      href="https://zalo.me/0924616199"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 text-sm transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Mở Zalo: 0924.6161.99</span>
                    </a>
                    <a
                      href="https://zalo.me/0385497085"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-white hover:bg-stone-50 text-emerald-900 border border-emerald-300 font-bold flex items-center justify-center gap-2 text-sm transition-colors shadow-2xs"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-700" />
                      <span>Mở Zalo: 0385.497.085</span>
                    </a>
                  </div>

                  <div className="text-center pt-2 text-[11px] text-stone-500">
                    Truy cập cổng thông tin chính thức tại{' '}
                    <a
                      href="https://www.tuvihongan.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-800 font-bold underline"
                    >
                      www.tuvihongan.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 3. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="bg-[#f4efe6] border-t border-amber-200/80 text-stone-600 text-xs pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-300">
            {/* Col 1: Brand Info */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-400 bg-[#fffaf2] shadow-xs">
                  <img
                    src="/logo.jpg"
                    alt="Tử Vi Hồng Ân Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-display font-bold text-lg text-stone-900">
                  Tử Vi Hồng Ân
                </span>
              </div>
              <p className="text-stone-600 text-xs leading-relaxed">
                Khai sáng vận mệnh, hòa hợp nhân duyên và kiến tạo phong thủy cát tường dựa trên tinh hoa học thuật Đông phương chính thống.
              </p>
              <div className="text-stone-900 font-semibold">
                Website:{' '}
                <a
                  href="https://www.tuvihongan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-800 underline hover:text-red-700 font-bold"
                >
                  tuvihongan.com
                </a>
              </div>
            </div>

            {/* Col 2: Dịch Vụ Miễn Phí */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Dịch Vụ Miễn Phí
              </span>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/la-so-tu-vi')}
                    className="hover:text-red-700 transition-colors flex items-center gap-1.5 cursor-pointer text-stone-700"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Lập Lá Số Tử Vi (Miễn phí)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/boi-kieu')}
                    className="hover:text-red-700 transition-colors flex items-center gap-1.5 cursor-pointer text-stone-700"
                  >
                    <Compass className="w-3.5 h-3.5 text-amber-700" />
                    <span>Bát Quái, Phong Thủy (Miễn phí)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('service')}
                    className="hover:text-red-700 transition-colors flex items-center gap-1.5 cursor-pointer text-stone-700"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>Tarot Kiều - Xin Quẻ Bói Kiều</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Dịch Vụ Chuyên Sâu */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Luận Giải Chuyên Sâu
              </span>
              <ul className="space-y-2 text-stone-700">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('service')}
                    className="hover:text-red-700 transition-colors flex items-center gap-1.5 cursor-pointer font-bold text-red-700"
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-700" />
                    <span>Luận giải đầy đủ 199k trọn đời</span>
                  </button>
                </li>
                <li>
                  <span>Bản PDF 15-20 trang luận chi tiết</span>
                </li>
                <li>
                  <span>Hóa giải sao xấu & kích tài vận</span>
                </li>
                <li>
                  <span>Tư vấn hướng nhà & bố trí bàn làm việc</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Đặt Lịch Zalo với Thầy */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Đặt Lịch Riêng Với Thầy
              </span>
              <p className="text-[11px] text-stone-600">
                Nhắn tin hoặc gọi điện trực tiếp qua 2 số Zalo chính thức:
              </p>
              <div className="space-y-2">
                <a
                  href="https://zalo.me/0924616199"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-50 transition-colors shadow-2xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Zalo 1: 0924.6161.99</span>
                </a>
                <a
                  href="https://zalo.me/0385497085"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-50 transition-colors shadow-2xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Zalo 2: 0385.497.085</span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
            <p>© 2026 Tử Vi Hồng Ân (tuvihongan.com). Giữ toàn quyền bản quyền.</p>
            <p className="text-center sm:text-right">
              Thuật số Đông phương hỗ trợ định hướng cuộc sống • Lấy tâm đức làm gốc, thiện lương làm nền tảng.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
