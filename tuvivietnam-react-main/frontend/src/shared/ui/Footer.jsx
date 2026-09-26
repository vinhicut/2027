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
            Diễn đàn Tử Vi Việt Nam được thành lập từ năm 2026 bởi thầy Trần Ngọc Điệp, bút danh tuetvnb, cùng đông đảo thành viên yêu thích bộ
            môn huyền học Tử Vi đẩu số. Và cùng với Câu lạc bộ Phong thủy Thăng
            Long, đây đã là nơi chia sẻ kiến thức và đàm luận về các triết lý
            Văn hoá Phương Đông của nhiều chí sỹ cả trong và ngoài nước.
          </p>
          <div className="contact-info">
            <div>
              Liên hệ: <a href="tel:0920461699">0920461699</a>
            </div>
            <div>
              <a href="https://www.tuvihongan.com" target="_blank" rel="noopener noreferrer">
                www.tuvihongan.com
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
