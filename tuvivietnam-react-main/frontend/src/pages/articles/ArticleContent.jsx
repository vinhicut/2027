import React from 'react';
import RelatedArticles from '../../shared/ui/RelatedArticles';

function ArticleContent() {
  return (
    <div className="article-area">
      <div className="breadcrumb">
        Home › Tử Vi - Cách Cục Luận › LỤC THẬP TINH HỆ: TỬ VI Ở CUNG TÍ HOẶC NGỌ
      </div>
      <div className="category-tag">Tử Vi - Cách Cục Luận</div>
      <h1 className="article-title">
        LỤC THẬP TINH HỆ: TỬ VI Ở CUNG TÍ
        <br />
        HOẶC NGỌ
      </h1>
      <div className="article-meta">
        <span>
          By <strong>Phong Thủy Thăng Long</strong> 26/10/2021
        </span>
        <span className="views">👁 2077</span>
        <span className="comments">💬 0</span>
      </div>

      <div className="share-buttons">
        <button className="share-btn">↗ Share</button>
        <button className="social-btn fb">f</button>
        <button className="social-btn x">𝕏</button>
        <button className="social-btn wa">WhatsApp</button>
        <button className="social-btn tg">✈</button>
        <button className="social-btn link">🔗</button>
      </div>

      <div className="article-image">
        <div className="landscape-art">
          <span>Tranh thủy mặc cổ điển - Phong cảnh núi non</span>
        </div>
      </div>

      <div className="article-body">
        <p>
          Tử Vi độc tọa ở hai cung Tí hoặc Ngọ; đối cung là Tham Lang độc tọa;
          cung hội hợp là “Vũ Khúc, Thiên Tướng” và “Liêm Trinh, Thiên Phủ”.
        </p>
        <p>
          Muốn luận đoán đánh giá tính chất của Tử Vi độc tọa, cần phải chú ý
          một điểm quan trọng, đó là sự quân bình giữa tinh thần và vật chất.
        </p>
        <p>
          Bản thân Tử Vi đã có bản chất thuộc về phương diện tinh thần (như
          tính độc đoán mạnh, về phương diện yêu ghét có cá tính đặc thù, về
          phương diện tinh thần ắt sẽ có tiêu khiển và yêu chuộng, có lực quyết
          đoán, v.v…); cũng có tính chất thuộc phương diện vật chất (như thú
          vui, sở thích hưởng thụ vật chất, tài lãnh đạo, tài tổ chức, v.v…);
          hội hợp với các sao khác nhau, sẽ làm mạnh thêm tính chất về phương
          diện tinh thần, hoặc làm mạnh thêm tính chất về phương diện vật chất,
          hay là trong hai có một phương diện yếu đi, thậm chí nhuyễn hóa thành
          một đặc tính khác, khi luận đoán thực sự cần xem trọng.
        </p>
        <p>
          Tham Lang, Vũ Khúc, Thiên Phủ là các sao thuộc về tính vật chất. Liêm
          Trinh, Thiên Tướng là các sao thuộc về tính tinh thần.
        </p>
        <p>
          Nếu Tham Lang Hóa Lộc hoặc Hóa Quyền, Vũ Khúc Hóa Lộc hoặc Hóa Quyền,
          Thiên Phủ Hóa Lộc hoặc Hóa Quyền…
        </p>
      </div>

      <RelatedArticles />
    </div>
  );
}

export default ArticleContent;
