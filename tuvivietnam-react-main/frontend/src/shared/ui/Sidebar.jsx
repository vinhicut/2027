import React from 'react';

const suggestedPosts = [
  {
    title: 'KHÂM THIÊN GIÁM TỬ VI ĐẨU SỐ – Phá Quân',
    date: '22/10/2020',
    imgClass: 'img-a',
  },
  {
    title: 'Chương 31 – Luận Chính Quan',
    date: '24/03/2020',
    imgClass: 'img-b',
  },
  {
    title: 'TĂNG BỔ BỐC PHỆ CHÍNH TÔNG – Phần 16',
    date: '17/02/2020',
    imgClass: 'img-c',
  },
  {
    title: 'MẪU NGƯỜI “THAM VŨ ĐỒNG HÀNH”',
    date: '16/02/2020',
    imgClass: 'img-d',
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="fb-page">
        <div className="fb-header">
          <div className="fb-avatar tea"></div>
          <div>
            <div className="fb-name">Cổ Nhân Trà …</div>
            <div className="fb-followers">296 người theo dõi</div>
          </div>
        </div>
        <button className="fb-follow">f Theo dõi Trang</button>
      </div>

      <div className="fb-page">
        <div className="fb-header">
          <div className="fb-avatar logo-sm"></div>
          <div>
            <div className="fb-name">Phong Thủy …</div>
            <div className="fb-followers">33K người theo dõi</div>
          </div>
        </div>
        <button className="fb-follow">f Theo dõi Trang</button>
      </div>

      <div className="you-may-like">
        <h3>CÓ THỂ BẠN THÍCH</h3>
        {suggestedPosts.map((post) => (
          <div className="like-item" key={post.title}>
            <div className={`like-img ${post.imgClass}`}></div>
            <div>
              <div className="like-title">{post.title}</div>
              <div className="like-date">{post.date}</div>
            </div>
          </div>
        ))}
        <button className="load-more">Load more ›</button>
      </div>
    </aside>
  );
}

export default Sidebar;
