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
          <Route path="/chuyen-muc" element={<CategoryPage />} />
          <Route path="/chuyen-muc/thien-tuong" element={<KhamThienTuViThienTuong />} />

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