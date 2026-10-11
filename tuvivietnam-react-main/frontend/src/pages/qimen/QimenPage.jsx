import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { qimenArticles } from './qimenArticles';
import { qimenOriginalDetails } from './qimenOriginalDetails';
import './QimenArticles.css';
import '../articles/CategoryPage.css';

const articlePath = (slug) => `/ky-mon-don-giap/${slug}`;

export default function QimenArticles() {
  const { slug } = useParams();
  const selected = qimenArticles.find((article) => article.slug === slug);

  if (slug && !selected) {
    return <section className="qimen-page"><h1>Không tìm thấy bài viết</h1><Link to="/ky-mon-don-giap">Quay lại chuyên mục Kỳ Môn</Link></section>;
  }

  if (selected) {
    return (
      <main className="qimen-page">
        <nav className="qimen-breadcrumb"><Link to="/">Trang chủ</Link><span>›</span><Link to="/ky-mon-don-giap">Kỳ Môn</Link><span>›</span><span>{selected.name}</span></nav>
        <article className="qimen-article">
          <img className="qimen-cover" src={`/qimen/${selected.slug}.webp`} alt={`Minh họa Sao ${selected.name} lấy từ tài liệu Cửu tinh vận trị`} />
          <span className="qimen-label">CỬU DIỆU · VẬN TRỊ</span>
          <h1>Sao {selected.name}: luận giải vận trình và điều cần lưu ý</h1>
          <div className="qimen-meta">Chuyên mục Kỳ Môn <span>·</span> Tử Vi Việt Nam</div>
          <blockquote>{selected.verse}</blockquote>
          <p className="qimen-lead">{selected.intro}</p>
          <section><h2>Thông tin chính</h2><dl><div><dt>Tính chất</dt><dd>{selected.type}</dd></div><div><dt>Tháng cần lưu ý</dt><dd>{selected.months}</dd></div><div><dt>Trọng tâm</dt><dd>{selected.focus}</dd></div></dl></section>
          <section className="qimen-detail-text"><h2>Luận giải chi tiết</h2>{(qimenOriginalDetails[selected.slug] || selected.details).map((detail) => <p key={detail}>{detail}</p>)}</section>
          <p className="qimen-note">Nội dung được biên tập từ tài liệu “Cửu tinh vận trị” do bạn cung cấp. Các luận giải mang tính tham khảo theo quan niệm tử vi dân gian.</p>
          <Link className="qimen-back" to="/ky-mon-don-giap">← Xem các bài khác trong Kỳ Môn</Link>
        </article>
      </main>
    );
  }

  const [featured, ...posts] = qimenArticles;

  return (
    <main className="category-page qimen-category-page">
      <div className="cat-breadcrumb"><Link to="/">Trang chủ</Link>{' › '}<span>Kỳ Môn - Cửu Diệu</span></div>
      <h1 className="cat-title">KỲ MÔN - CỬU DIỆU VẬN TRỊ</h1>
      <div className="cat-hero-grid">
        <Link to={articlePath(featured.slug)} className="cat-card cat-card--large">
          <img src={`/qimen/${featured.slug}.webp`} alt={`Minh họa Sao ${featured.name}`} />
          <div className="cat-card-overlay"><span className="cat-tag">CỬU DIỆU</span><h2>Sao {featured.name}: luận giải vận trình</h2><div className="cat-meta">Tử Vi Việt Nam</div></div>
        </Link>
        <div className="cat-hero-side">
          {posts.slice(0, 4).map((article) => <Link key={article.slug} to={articlePath(article.slug)} className="cat-card cat-card--sm">
            <img src={`/qimen/${article.slug}.webp`} alt={`Minh họa Sao ${article.name}`} />
            <div className="cat-card-overlay"><span className="cat-tag">CỬU DIỆU</span><h3>Sao {article.name}</h3></div>
          </Link>)}
        </div>
      </div>
      <div className="cat-body">
        <div className="cat-grid">
          {posts.slice(4).map((article) => <Link key={article.slug} to={articlePath(article.slug)} className="cat-card cat-card--grid">
            <img src={`/qimen/${article.slug}.webp`} alt={`Minh họa Sao ${article.name}`} />
            <div className="cat-card-body"><span className="cat-tag">CỬU DIỆU</span><h3>Sao {article.name}: luận giải vận trình và điều cần lưu ý</h3><div className="cat-meta">Tử Vi Việt Nam</div></div>
          </Link>)}
        </div>
        <aside className="cat-sidebar"><h4>CÁC BÀI VIẾT</h4><div className="cat-recommendations">
          {qimenArticles.map((article) => <Link key={article.slug} to={articlePath(article.slug)} className="cat-recommendation"><span>Sao {article.name}</span></Link>)}
        </div></aside>
      </div>
    </main>
  );
}
