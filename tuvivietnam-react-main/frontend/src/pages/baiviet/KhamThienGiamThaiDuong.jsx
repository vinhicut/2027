import React from "react";
import { Link } from "react-router-dom";
import "./KhamThienGiamThaiDuong.css";

const sections = [
  { id: "tong-quan", label: "Tổng quan về Thái Dương" },
  { id: "y-nghia", label: "Ý nghĩa của sao Thái Dương" },
  { id: "mien-dieu", label: "Miếu, vượng, đắc, hãm" },
  { id: "nam-nu", label: "Thái Dương ở nam và nữ mệnh" },
  { id: "ket-luan", label: "Kết luận" },
];

function ArticleSection({ id, title, children }) {
  return (
    <section id={id} className="thien-duong-section">
      <h2 className="thien-duong-section-title">{title}</h2>
      <div className="thien-duong-section-body">{children}</div>
    </section>
  );
}

export default function KhamThienGiamThaiDuong() {
  return (
    <main className="thien-duong-page">
      <div className="thien-duong-container">
        <div className="thien-duong-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/chuyen-muc">Tử Vi - Tính Chất</Link>
          <span>›</span>
          <span>Thái Dương</span>
        </div>

        <h1 className="thien-duong-title">
          KHÂM THIÊN GIÁM TỬ VI ĐẨU SỐ – THÁI DƯƠNG
        </h1>

        <div className="thien-duong-meta">
          <span>Tử Vi</span>
          <span>27/09/2026</span>
          <span>Tử Vi Việt Nam</span>
        </div>

        <div className="thien-duong-layout">
        {/* Article */}
        <article className="thien-duong-article">
          <div className="thien-duong-cover">
            <img
              src="https://picsum.photos/seed/thaiduong/1000/500"
              alt="Khâm Thiên Giám Tử Vi Đẩu Số - Thái Dương"
            />
          </div>

          <p className="thien-duong-lead">
            Trong hệ thống Tử Vi Đẩu Số, Thái Dương là một trong những
            chính tinh quan trọng, chủ về ánh sáng, công danh, địa vị,
            khả năng biểu đạt và tinh thần hướng ngoại.
          </p>

          {/* Table of contents */}
          <nav
            aria-label="Mục lục bài viết"
            className="thien-duong-toc"
          >
            <h2>Mục lục</h2>
            <ol>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                  >
                    <span>{index + 1}.</span>
                    <span>{section.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="thien-duong-sections">
            <ArticleSection id="tong-quan" title="1. Tổng quan về Thái Dương">
              <p>
                Thái Dương thuộc nhóm chính tinh trong Tử Vi Đẩu Số, hình
                tượng hóa mặt trời và nguồn sáng. Vì vậy, khi luận sao này,
                thường chú trọng các chủ đề như quang minh, danh tiếng, khả
                năng lãnh đạo, sự chủ động và ảnh hưởng của đương số đối với
                môi trường xung quanh.
              </p>
              <p>
                Thái Dương có tính chất hướng ngoại khá rõ. Khi được đặt trong
                vị trí thuận lợi và hội cùng các yếu tố tốt, tính chất này có
                thể biểu hiện thành sự tự tin, rộng rãi, có tinh thần trách
                nhiệm và mong muốn tạo ảnh hưởng tích cực.
              </p>

              <div className="thien-duong-callout">
                <p className="callout-title">Điểm cốt lõi</p>
                <p>
                  Thái Dương thường được liên hệ với ánh sáng, công danh,
                  danh dự, quyền uy, cha hoặc người nam trưởng trong gia đình
                  tùy theo cung vị và toàn bộ lá số.
                </p>
              </div>
            </ArticleSection>

            <ArticleSection id="y-nghia" title="2. Ý nghĩa của sao Thái Dương">
              <h3>
                Về tính cách
              </h3>
              <p>
                Người có Thái Dương nổi bật trong lá số thường được mô tả là
                có xu hướng thẳng thắn, chủ động, thích thể hiện năng lực và
                có nhu cầu được ghi nhận. Mặt tích cực là tinh thần trách
                nhiệm, khả năng dẫn dắt và sự rộng lượng.
              </p>

              <h3>
                Về công danh
              </h3>
              <p>
                Thái Dương có liên hệ mạnh với công danh và vị thế xã hội.
                Tuy nhiên, không nên luận riêng một sao để kết luận toàn bộ
                sự nghiệp. Cần xem đồng thời cung Mệnh, Quan Lộc, Tài Bạch,
                các sao hội chiếu và trạng thái miếu vượng.
              </p>

              <h3>
                Về ánh sáng và danh tiếng
              </h3>
              <p>
                Hình tượng mặt trời giúp Thái Dương mang ý nghĩa về khả năng
                soi sáng, công khai và được nhìn nhận. Khi bị nhiều yếu tố
                bất lợi tác động, biểu hiện có thể chuyển sang nóng vội,
                hiếu danh hoặc dễ chịu áp lực từ kỳ vọng của người khác.
              </p>
            </ArticleSection>

            <ArticleSection id="mien-dieu" title="3. Miếu, vượng, đắc, hãm">
              <p>
                Một nguyên tắc quan trọng khi luận Thái Dương là phải xét vị
                trí của sao theo địa bàn. Trạng thái miếu, vượng, đắc hay hãm
                giúp xác định mức độ thuận lợi khi phát huy tính chất của sao.
              </p>

              <div className="thien-duong-rating-grid">
                {[
                  ["Miếu", "Khả năng phát huy tính chất của Thái Dương thường rõ và mạnh hơn."],
                  ["Vượng", "Ánh sáng và tính chủ động được thể hiện tương đối thuận lợi."],
                  ["Đắc", "Có điều kiện biểu hiện tốt nhưng vẫn cần xét các sao hội hợp."],
                  ["Hãm", "Tính chất của sao có thể biểu hiện khó khăn hoặc thiên lệch hơn."],
                ].map(([label, text]) => (
                  <div
                    key={label}
                    className="thien-duong-rating"
                  >
                    <div className="rating-title">
                      {label}
                    </div>
                    <p>{text}</p>
                  </div>
                ))}
              </div>

              <p>
                Đây chỉ là khung luận cơ bản. Trong thực hành Tử Vi, một
                trạng thái tốt hoặc xấu của riêng Thái Dương không thể thay
                thế việc phân tích toàn bộ bố cục lá số.
              </p>
            </ArticleSection>

            <ArticleSection
              id="nam-nu"
              title="4. Thái Dương ở nam và nữ mệnh"
            >
              <p>
                Trong cách luận truyền thống, Thái Dương thường có những
                liên hệ khác nhau tùy nam mệnh hay nữ mệnh. Với nam mệnh, sao
                có thể được dùng để khảo sát hình tượng bản thân, công danh,
                cha và những người nam quan trọng. Với nữ mệnh, ngoài các ý
                nghĩa trên, có trường phái còn dùng Thái Dương để khảo sát
                hình tượng người chồng hoặc người nam có ảnh hưởng.
              </p>

              <div className="thien-duong-quote">
                <p className="quote-title">
                  Không luận một sao thành một lá số
                </p>
                <p>
                  Ý nghĩa cụ thể của Thái Dương thay đổi theo cung an, vị trí,
                  các sao đồng cung, tam phương tứ chính, tứ hóa và đại hạn.
                  Vì vậy, cần đặt sao trong tổng thể lá số trước khi đưa ra
                  nhận định.
                </p>
              </div>
            </ArticleSection>

            <ArticleSection id="ket-luan" title="5. Kết luận">
              <p>
                Thái Dương là hình tượng giàu tính biểu tượng trong Tử Vi Đẩu
                Số. Từ hình ảnh mặt trời, sao được liên hệ với ánh sáng, danh
                vọng, quyền uy, công danh và khả năng tạo ảnh hưởng.
              </p>
              <p>
                Để luận giải chính xác hơn, cần kết hợp Thái Dương với toàn
                bộ bố cục của lá số thay vì tách riêng từng sao. Đây cũng là
                nguyên tắc quan trọng khi nghiên cứu Tử Vi theo hướng hệ
                thống.
              </p>
            </ArticleSection>
          </div>

          {/* Footer note */}
          <div className="thien-duong-note">
            <strong>Lưu ý:</strong> Nội dung mang
            tính nghiên cứu và tham khảo về Tử Vi Đẩu Số. Các trường phái có
            thể có cách diễn giải khác nhau.
          </div>
        </article>

        {/* Desktop sidebar */}
        <aside className="thien-duong-sidebar">
          <div>
            <p className="sidebar-label">
              Trong bài viết
            </p>
            <div className="sidebar-links">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                >
                  {section.label}
                </a>
              ))}
            </div>

            <div className="sidebar-star">
              <div>
                <div className="star-icon">
                  ☀
                </div>
                <p className="star-name">
                  Thái Dương
                </p>
                <p className="star-caption">
                  Ánh sáng và công danh
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
      </div>
    </main>
  );
}
