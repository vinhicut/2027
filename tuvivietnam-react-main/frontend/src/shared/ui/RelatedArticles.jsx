import React from 'react';

const relatedPosts = [
  {
    title: 'THAM LANG Ở CÁC CUNG VỊ – PHẦN 1',
    tag: 'Tử Vi - Cách Cục Luận',
    imgClass: 'img1',
  },
  {
    title: 'Thất sát ngưỡng đầu và triều đầu (Tử Vi hay Phá Quân)',
    tag: 'Tử Vi - Cách Cục Luận',
    imgClass: 'img2',
  },
  {
    title: 'Định quý cục',
    tag: 'Tử Vi - Cách Cục Luận',
    imgClass: 'img3',
  },
];

function RelatedArticles() {
  return (
    <div className="related-section">
      <div className="prev-next">
        <div className="prev">
          <span className="label">Previous article</span>
          <a href="#">Sao Liêm Trinh nhập hạn</a>
        </div>
        <div className="next">
          <span className="label">Next article</span>
          <a href="#">Phá Quân độc tọa ở hai cung Dần hoặc Thân</a>
        </div>
      </div>

      <h3 className="section-title">BÀI VIẾT LIÊN QUAN</h3>
      <div className="related-grid">
        {relatedPosts.map((post) => (
          <div className="related-card" key={post.title}>
            <div className={`related-img ${post.imgClass}`}></div>
            <div className="related-tag">{post.tag}</div>
            <h4>{post.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedArticles;
