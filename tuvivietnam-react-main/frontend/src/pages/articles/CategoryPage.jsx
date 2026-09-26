
// src/components/CategoryPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

// ==========================================
// BÀI VIẾT NỔI BẬT
// ==========================================
const featured = {
  id: 1,
  title: 'KHÂM THIÊN GIÁM TỬ VI ĐẨU SỐ – Thiên Tướng',
  tag: 'TỬ VI',
  date: '22/10/2020',
  author: 'Tử Vi Việt Nam',
  image: 'https://picsum.photos/seed/tv1/800/500',
  large: true,

  // URL bài viết
  link: '/chuyen-muc/thien-tuong',
};


// ==========================================
// DANH SÁCH BÀI VIẾT
// ==========================================
const posts = [
  {
    id: 2,
    title: 'KHÂM THIÊN GIÁM TỬ VI ĐẨU SỐ – Thiên Lương',
    tag: 'TỬ VI',
    date: '22/10/2020',
    image: 'https://picsum.photos/seed/tv2/400/280',

    link: '/chuyen-muc/thien-luong',
  },

  {
    id: 3,
    title: 'KHÂM THIÊN GIÁM TỬ VI ĐẨU SỐ – Thái Dương',
    tag: 'TỬ VI',
    date: '22/10/2020',
    image: 'https://picsum.photos/seed/tv3/400/280',

    link: '/chuyen-muc/thai-duong',
  },

  {
    id: 4,
    title: 'Tử vi đẩu số toàn thư hán việt – Phần cuối',
    tag: 'TỬ VI',
    date: '22/10/2020',
    image: 'https://picsum.photos/seed/tuvi-toan-thu/400/280',

    link: '/chuyen-muc/tu-vi-dau-so-toan-thu',
  },

  {
    id: 5,
    title: 'KHÂM THIÊN GIÁM TỬ VI ĐẨU SỐ – Cự Môn',
    tag: 'TỬ VI',
    date: '22/10/2020',
    image: 'https://picsum.photos/seed/tv5/400/280',

    link: '/chuyen-muc/cu-mon',
  },

  {
    id: 6,
    title: 'KHÂM THIÊN GIÁM TỬ VI ĐẨU SỐ – Thiên Tướng',
    tag: 'TỬ VI',
    date: '22/10/2020',
    image: 'https://picsum.photos/seed/tv6/400/300',

    link: '/chuyen-muc/thien-tuong',
  },

  {
    id: 7,
    title: 'KHÂM THIÊN GIÁM TỬ VI ĐẨU SỐ – Thiên Lương',
    tag: 'TỬ VI',
    date: '22/10/2020',
    image: 'https://picsum.photos/seed/tv7/400/300',

    link: '/chuyen-muc/thien-luong',
  },

  {
    id: 8,
    title: 'KHÂM THIÊN GIÁM TỬ VI ĐẨU SỐ – Thất Sát',
    tag: 'TỬ VI',
    date: '22/10/2020',
    image: 'https://picsum.photos/seed/tv8/400/300',

    link: '/chuyen-muc/that-sat',
  },

  {
    id: 9,
    title: 'KHÂM THIÊN GIÁM TỬ VI ĐẨU SỐ – Phá Quân',
    tag: 'TỬ VI',
    date: '22/10/2020',
    image: 'https://picsum.photos/seed/tv9/400/300',

    link: '/chuyen-muc/pha-quan',
  },
];


// ==========================================
// COMPONENT
// ==========================================
function CategoryPage() {
  return (
    <div className="category-page">

      {/* =====================================
          BREADCRUMB
      ====================================== */}
      <div className="cat-breadcrumb">
        <Link to="/">Home</Link>
        {' › '}
        <span>Tử Vi - Tính Chất</span>
      </div>


      {/* =====================================
          TIÊU ĐỀ
      ====================================== */}
      <h1 className="cat-title">
        TỬ VI - TÍNH CHẤT
      </h1>


      {/* =====================================
          HÀNG TRÊN
          1 BÀI LỚN + 4 BÀI NHỎ
      ====================================== */}
      <div className="cat-hero-grid">

        {/* BÀI LỚN */}
        <Link
          to={featured.link}
          className="cat-card cat-card--large"
        >
          <img
            src={featured.image}
            alt={featured.title}
          />

          <div className="cat-card-overlay">

            <span className="cat-tag">
              {featured.tag}
            </span>

            <h2>
              {featured.title}
            </h2>

            <div className="cat-meta">
              {featured.author} · {featured.date}
            </div>

          </div>
        </Link>


        {/* 4 BÀI NHỎ */}
        <div className="cat-hero-side">

          {posts.slice(0, 4).map((p) => (

            <Link
              key={p.id}
              to={p.link}
              className="cat-card cat-card--sm"
            >

              <img
                src={p.image}
                alt={p.title}
              />

              <div className="cat-card-overlay">

                <span className="cat-tag">
                  {p.tag}
                </span>

                <h3>
                  {p.title}
                </h3>

              </div>

            </Link>

          ))}

        </div>

      </div>


      {/* =====================================
          LƯỚI BÀI VIẾT BÊN DƯỚI
      ====================================== */}
      <div className="cat-body">

        <div className="cat-grid">

          {posts.slice(4).map((p) => (

            <Link
              key={p.id}
              to={p.link}
              className="cat-card cat-card--grid"
            >

              <img
                src={p.image}
                alt={p.title}
              />

              <div className="cat-card-body">

                <span className="cat-tag">
                  {p.tag}
                </span>

                <h3>
                  {p.title}
                </h3>

                <div className="cat-meta">
                  Tử Vi Việt Nam · {p.date}
                </div>

              </div>

            </Link>

          ))}

        </div>


        {/* =====================================
            SIDEBAR
        ====================================== */}
        <aside className="cat-sidebar">

          <h4>
            CÓ THỂ BẠN THÍCH
          </h4>

        </aside>

      </div>

    </div>
  );
}

export default CategoryPage;
