import React from 'react';

const insightPillars = [
  {
    icon: '🔮',
    title: 'An Sao Tinh Chuẩn',
    desc: 'Hệ thống an sao Tử Vi Nam Bắc Phái, kết hợp an Lưu Niên, Tiểu Hạn, Nguyệt Hạn chuẩn từng tiết khí âm dương.',
  },
  {
    icon: '✨',
    title: 'Lục Thập Tinh Hệ',
    desc: 'Phân tích thế đứng 60 hệ thống tinh tú, miếu hãm, đắc địa giúp nhìn thấu bản mệnh và đại vận 10 năm.',
  },
  {
    icon: '🧭',
    title: 'Cân Bằng Âm Dương',
    desc: 'Định hướng công danh, tài bạch, gia đạo và hóa giải hung hiểm dựa trên nguyên lý tương sinh tương khắc Ngũ Hành.',
  },
  {
    icon: '📜',
    title: 'Kho Tàng Thư Tịch',
    desc: 'Hàng ngàn bài khảo luận từ các cổ thư: Tử Vi Đẩu Số Toàn Thư, Khâm Thiên Giám, Tăng Bổ Bốc Phệ.',
  },
];

function QuickInsights() {
  return (
    <section className="home-insights-section">
      <div className="section-header-wrap">
        <h2 className="section-title">HỆ THỐNG LUẬN GIẢI TỬ VI ĐANG ĐƯỢC PHÁT TRIỂN</h2>
      </div>

      <div className="pillars-grid">
        {insightPillars.map((item, idx) => (
          <div className="pillar-card" key={idx}>
            <div className="pillar-top">
              <span className="pillar-icon">{item.icon}</span>
            </div>
            <h3 className="pillar-title">{item.title}</h3>
            <p className="pillar-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuickInsights;
