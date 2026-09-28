import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import Navbar from '../shared/ui/Navbar';
import Footer from '../shared/ui/Footer';
import Home from '../pages/Home';
import LaSoTuVi from '../features/astrology/LaSoTuVi';
import CategoryPage from '../pages/articles/CategoryPage';
import BoiKieu from '../features/tarot-kieu/BoiKieu';
import LichVanSu from '../features/lunar-calendar/LichVanSu';
import KhamThienTuViThienTuong from '../features/astrology/KhamThienTuViThienTuong';
import QuickInsights from '../shared/ui/QuickInsights';
import UnderDevelopment from '../shared/ui/UnderDevelopment';
import KhamThienGiamThaiDuong from '../pages/baiviet/KhamThienGiamThaiDuong';
import CuMon from '../pages/baiviet/CuMon';
import ThienLuong from '../pages/baiviet/ThienLuong';
import ThatSat from '../pages/baiviet/ThatSat';
import PhaQuan from '../pages/baiviet/PhaQuan';
import { PhongThuyWidget } from '../phongthuy/PhongThuyWidget';
function App() {
  const { pathname } = useLocation();

  if (pathname === '/') {
    return <Home />;
  }

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route
            path="/la-so-tu-vi"
            element={
              <div className="home-content-flow">
                <LaSoTuVi />
                <QuickInsights />
              </div>
            }
          />
          <Route path="/lich-van-su" element={<LichVanSu />} />
          <Route path="/boi-kieu" element={<BoiKieu />} />
          <Route path="/la-kinh-phong-thuy" element={<PhongThuyWidget />} />
          <Route path="/chuyen-muc" element={<CategoryPage />} />
          <Route path="/chuyen-muc/thien-tuong" element={<KhamThienTuViThienTuong />} />
          <Route path="/chuyen-muc/thien-giam-thai-duong" element={<KhamThienGiamThaiDuong />} />
          <Route path="/chuyen-muc/cu-mon" element={<CuMon />} />
          <Route path="/chuyen-muc/thien-luong" element={<ThienLuong />} />
          <Route path="/chuyen-muc/that-sat" element={<ThatSat />} />
          <Route path="/chuyen-muc/pha-quan" element={<PhaQuan />} />

          {/* Các phân hệ đang trong quá trình phát triển UI&UX */}
          <Route path="/lien-he" element={<UnderDevelopment />} />
          <Route path="/dien-dan" element={<UnderDevelopment />} />
          <Route path="/khoa-hoc" element={<UnderDevelopment />} />
          <Route path="/cua-hang" element={<UnderDevelopment />} />
          <Route path="/ky-mon" element={<UnderDevelopment />} />
          <Route path="/ky-mon-don-giap" element={<UnderDevelopment />} />
          <Route path="/than-so" element={<UnderDevelopment />} />
          <Route path="/than-so-hoc" element={<UnderDevelopment />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;