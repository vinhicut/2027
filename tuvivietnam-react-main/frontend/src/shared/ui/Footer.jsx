import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <div className="footer-about">
          <div className="footer-logo">
            <strong>DIỄN ĐÀN TỬ VI HỒNG ÂN</strong>
          </div>
          <p>
            Diễn Đàn Tử Vi Hồng Ân được thành lập từ năm 2026 với sự cố vấn của Thiền Sư Trần Ngọc Điệp, Pháp danh Thích Lăng Nghiêm. Đây là nơi các trí sỹ đồng đạo và những người yêu thích nghiên cứu, chia sẻ, chiêm nghiệm và đàm luận Tử Vi Đẩu Số, Kinh Dịch, Bát Trạch và các bộ môn huyền học Đông Tây.
          </p>
          <div className="contact-info">
            <div>
              Liên hệ: <a href="tel:0924616199">0924.616.199</a>
            </div>
            <div>
              <a href="https://tuvihongan.com" target="_blank" rel="noopener noreferrer">
                https://tuvihongan.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright">
        <div>© 2026 - Diễn đàn Tử Vi Hồng Ân</div>
      </div>
    </footer>
  );
}

export default Footer;
