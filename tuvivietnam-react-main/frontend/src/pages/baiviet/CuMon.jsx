import React from "react";
import { Link } from "react-router-dom";
import "./KhamThienGiamThaiDuong.css";

const sections = [
  { id: "tong-quan", label: "Tổng quan về sao Cự Môn" },
  { id: "ngon-ngu", label: "Cự Môn và khả năng ngôn ngữ" },
  { id: "tranh-luan", label: "Cự Môn – tranh luận và thị phi" },
  { id: "phan-bien", label: "Cự Môn và tư duy phản biện" },
  { id: "cong-viec", label: "Cự Môn và công việc" },
  { id: "tien-tai", label: "Cự Môn và tiền tài" },
  { id: "quan-he", label: "Cự Môn trong quan hệ con người" },
  { id: "thuan-loi", label: "Cự Môn khi gặp các yếu tố thuận lợi" },
  { id: "bat-loi", label: "Cự Môn khi gặp các yếu tố bất lợi" },
  { id: "bai-hoc", label: "Cự Môn và bài học về lời nói" },
  { id: "tong-the", label: "Cự Môn trong cách nhìn tổng thể" },
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

const positiveItems = [
  "Khả năng ăn nói tốt.",
  "Tư duy logic.",
  "Khả năng phân tích.",
  "Khả năng thuyết phục.",
  "Khả năng xử lý vấn đề.",
  "Khả năng nghiên cứu.",
  "Khả năng nhìn thấy điểm bất hợp lý.",
  "Có năng lực trong lĩnh vực cần giao tiếp và lý luận.",
];

const negativeItems = [
  "Tranh luận nhiều.",
  "Dễ hiểu lầm.",
  "Dễ vướng chuyện lời nói.",
  "Dễ bị cuốn vào thị phi.",
  "Khó kiểm soát phản ứng khi bị phản bác.",
  "Quá chú trọng việc chứng minh đúng – sai.",
  "Quan hệ dễ phát sinh mâu thuẫn vì giao tiếp.",
];

export default function CuMon() {
  return (
    <main className="thien-duong-page">
      <div className="thien-duong-container">
        <div className="thien-duong-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/chuyen-muc">Tử Vi - Tính Chất</Link>
          <span>›</span>
          <span>Cự Môn</span>
        </div>

        <h1 className="thien-duong-title">
          KHÂM THIÊN GIÁM TỬ VI ĐẨU SỐ – CỰ MÔN
        </h1>

        <div className="thien-duong-meta">
          <span>Tử Vi</span>
          <span>27/09/2026</span>
          <span>Tử Vi Việt Nam</span>
        </div>

        <div className="thien-duong-layout">
        <article className="thien-duong-article">
          <div className="thien-duong-cover">
            <img
              src="https://picsum.photos/seed/cumon/1000/500"
              alt="Khâm Thiên Giám Tử Vi Đẩu Số - Cự Môn"
            />
          </div>

          <p className="thien-duong-lead">
            Trong Tử Vi Đẩu Số, Cự Môn là một trong những chính tinh có
            tính chất đặc biệt, thường gắn với lời nói, ngôn ngữ, tư duy
            phân tích, tranh luận, nghi vấn và thị phi.
          </p>

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
            <ArticleSection id="tong-quan" title="1. Tổng quan về sao Cự Môn">
              <p>
                Trong Tử Vi Đẩu Số, Cự Môn là một trong những chính tinh có
                tính chất đặc biệt. Hình tượng của Cự Môn thường gắn với{" "}
                <strong>lời nói, ngôn ngữ, tư duy phân tích, tranh luận, nghi vấn và thị phi</strong>.
              </p>
              <p>
                Nếu Thái Dương tượng trưng cho ánh sáng và sự biểu đạt ra bên
                ngoài, thì Cự Môn lại thiên về quá trình quan sát, đặt câu
                hỏi, phân tích và tìm kiếm điều ẩn phía sau sự việc.
              </p>
              <p>
                Chính vì vậy, Cự Môn có thể biểu hiện thành khả năng ăn nói,
                nghiên cứu, tư duy phản biện và thuyết phục; nhưng trong những
                bố cục bất lợi, cùng tính chất ấy có thể trở thành tranh luận,
                hiểu lầm hoặc vướng mắc bởi lời nói.
              </p>
              <div className="rounded-xl border-l-4 border-amber-600 bg-amber-50 p-4 sm:p-5">
                <p className="font-semibold text-red-950">Điểm cốt lõi</p>
                <p className="mt-1 text-sm leading-7 text-stone-700 sm:text-base">
                  Cự Môn không chỉ được hiểu đơn giản là “thị phi”. Ở mặt
                  tích cực, đây còn là hình tượng của tư duy, ngôn ngữ, phân
                  tích và khả năng dùng lý luận để giải quyết vấn đề.
                </p>
              </div>
            </ArticleSection>

            <ArticleSection id="ngon-ngu" title="2. Cự Môn và khả năng ngôn ngữ">
              <p>
                Một trong những đặc điểm nổi bật nhất của Cự Môn là vấn đề{" "}
                <strong>lời nói</strong>.
              </p>
              <p>
                Người có Cự Môn nổi bật trong lá số thường được mô tả là có xu
                hướng suy nghĩ nhiều trước một vấn đề, thích hỏi “tại sao”,
                “vì sao lại như vậy” và không dễ dàng chấp nhận một kết luận
                nếu chưa hiểu rõ nguyên nhân.
              </p>
              <p>
                Điều này tạo nên khả năng quan sát, đặt câu hỏi, phân tích,
                lập luận và diễn đạt. Nếu được sử dụng đúng hướng, đây là một
                năng lực đáng chú ý trong những lĩnh vực cần giao tiếp và tư
                duy.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Khả năng diễn đạt.",
                  "Tư duy phân tích.",
                  "Khả năng đặt câu hỏi.",
                  "Khả năng tranh biện.",
                  "Khả năng phát hiện vấn đề.",
                  "Khả năng thuyết phục.",
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-amber-900/10 bg-[#fffdf8] p-4 text-sm leading-7 text-stone-600">
                    <span className="mr-2 text-amber-700">✦</span>{item}
                  </div>
                ))}
              </div>
              <p>
                Tuy nhiên, khả năng nói nhiều không đồng nghĩa với khả năng
                nói đúng thời điểm. Đây chính là điểm cần chú ý khi nghiên cứu
                Cự Môn.
              </p>
            </ArticleSection>

            <ArticleSection id="tranh-luan" title="3. Cự Môn – tranh luận và thị phi">
              <p>
                Trong Tử Vi Đẩu Số, Cự Môn thường được nhắc đến cùng chữ{" "}
                <strong>“thị phi”</strong>.
              </p>
              <p>
                Thị phi ở đây có thể hiểu rộng là những vấn đề phát sinh từ
                lời nói, cách diễn đạt, thông tin hoặc sự hiểu khác nhau giữa
                người với người.
              </p>
              <p>
                Một câu nói có thể được hiểu theo nhiều cách. Một ý kiến thẳng
                thắn có thể được người nghe tiếp nhận như một lời phê bình.
                Một cuộc tranh luận về đúng – sai có thể trở thành mâu thuẫn
                cá nhân.
              </p>
              <div className="cumon-highlight">
                <p className="cumon-highlight-title">
                  Nói gì – nói như thế nào – nói với ai?
                </p>
                <p>
                  Điểm đáng chú ý của Cự Môn không chỉ nằm ở nội dung lời nói,
                  mà còn nằm ở cách thông tin được truyền đạt và được người
                  khác tiếp nhận.
                </p>
              </div>
            </ArticleSection>

            <ArticleSection id="phan-bien" title="4. Cự Môn và tư duy phản biện">
              <p>
                Một mặt rất đáng chú ý của Cự Môn là khả năng không dễ dàng
                chấp nhận thông tin một chiều.
              </p>
              <p>Cự Môn có khuynh hướng đặt câu hỏi:</p>
              <div className="space-y-2">
                {[
                  "Điều này có thực sự đúng không?",
                  "Nguyên nhân là gì?",
                  "Có bằng chứng hay không?",
                  "Còn cách giải thích nào khác không?",
                  "Điều gì đang bị bỏ qua?",
                ].map((question) => (
                  <div key={question} className="rounded-lg border-l-2 border-amber-500 bg-amber-50/70 px-4 py-3 italic text-stone-700">
                    “{question}”
                  </div>
                ))}
              </div>
              <p>
                Nếu phát triển theo hướng tích cực, đây chính là nền tảng của
                tư duy phản biện. Người có khả năng này thường không chỉ nhìn
                vào kết quả mà muốn tìm hiểu quá trình tạo ra kết quả.
              </p>
              <p>
                Nhưng nếu thiếu sự cân bằng, việc luôn đặt câu hỏi cũng có thể
                khiến một người trở nên quá nghi ngờ hoặc tranh luận ngay cả
                khi không cần thiết.
              </p>
            </ArticleSection>

            <ArticleSection id="cong-viec" title="5. Cự Môn và công việc">
              <p>
                Khi luận Cự Môn về công danh, không nên chỉ nhìn vào một sao
                rồi kết luận nghề nghiệp. Cần xem Cự Môn nằm ở cung nào, hội
                hợp với những sao nào và toàn bộ bố cục của lá số ra sao.
              </p>
              <p>
                Tuy nhiên, xét riêng về tính chất biểu tượng, Cự Môn thường
                có sự tương ứng với những công việc sử dụng:
              </p>
              <div className="rounded-xl border border-amber-900/10 bg-[#fffdf8] p-5 text-center sm:p-6">
                <p className="font-serif text-xl font-bold text-red-950 sm:text-2xl">
                  Lời nói + Lý luận + Phân tích + Thuyết phục
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Luật sư",
                  "Giáo viên",
                  "Tư vấn viên",
                  "Nhà nghiên cứu",
                  "Nhân viên kinh doanh",
                  "Marketing và truyền thông",
                  "Quan hệ khách hàng",
                  "Đàm phán",
                ].map((job) => (
                  <div key={job} className="rounded-xl bg-white/60 px-4 py-3 text-sm font-medium text-stone-700">
                    <span className="mr-2 text-amber-700">✦</span>{job}
                  </div>
                ))}
              </div>
              <p>
                Điểm quan trọng là Cự Môn không nhất thiết biểu thị một nghề
                nghiệp cụ thể. Nó mô tả một kiểu năng lực, còn năng lực đó
                được sử dụng vào lĩnh vực nào còn phụ thuộc vào toàn bộ lá số
                và hoàn cảnh thực tế.
              </p>
            </ArticleSection>

            <ArticleSection id="tien-tai" title="6. Cự Môn và tiền tài">
              <p>
                Đối với vấn đề tài chính, Cự Môn có thể được nghiên cứu thông
                qua khả năng dùng kiến thức, thông tin và ngôn ngữ để tạo ra
                giá trị.
              </p>
              <p>
                Trong môi trường kinh doanh, khả năng thuyết phục khách hàng,
                đàm phán giá cả, giải thích sản phẩm hoặc xử lý những vấn đề
                phức tạp đều cần đến năng lực giao tiếp.
              </p>
              <div className="rounded-xl border-l-4 border-amber-600 bg-amber-50 p-4 sm:p-5">
                <p className="font-semibold text-red-950">Lời nói có thể tạo ra giá trị</p>
                <p className="mt-1 text-sm leading-7 text-stone-700 sm:text-base">
                  Nhưng lời nói cũng có thể tạo ra tổn thất nếu thông tin
                  không chính xác, cam kết không rõ ràng hoặc tranh chấp không
                  được xử lý khéo léo.
                </p>
              </div>
              <p>
                Vì vậy, khi nghiên cứu Cự Môn ở phương diện tài chính, yếu tố
                minh bạch và chính xác trong giao tiếp đặc biệt quan trọng.
              </p>
            </ArticleSection>

            <ArticleSection id="quan-he" title="7. Cự Môn trong quan hệ con người">
              <p>
                Trong quan hệ giữa người với người, Cự Môn thường đặt ra bài
                toán về <strong>giao tiếp</strong>.
              </p>
              <p>
                Người có tính Cự Môn mạnh có thể rất thích nói chuyện sâu,
                phân tích vấn đề và trao đổi quan điểm. Họ thường không thích
                những câu trả lời quá đơn giản.
              </p>
              <p>
                Tuy nhiên, sự khác biệt về cách giao tiếp có thể tạo ra khoảng
                cách.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Một người", "muốn giải quyết cảm xúc."],
                  ["Một người", "muốn phân tích nguyên nhân."],
                  ["Một người", "muốn được lắng nghe."],
                ].map(([title, text]) => (
                  <div key={title + text} className="rounded-xl border border-amber-900/10 bg-[#fffdf8] p-4">
                    <p className="font-serif font-bold text-red-900">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">{text}</p>
                  </div>
                ))}
              </div>
              <p>
                Khi đó, cuộc trò chuyện dễ chuyển thành tranh luận. Bởi vậy,
                bài học quan trọng của Cự Môn không phải là “ít nói”, mà là:
              </p>
              <blockquote className="border-l-4 border-amber-600 bg-amber-50 px-5 py-4 font-serif text-lg font-semibold italic text-red-950">
                Biết khi nào nên nói, khi nào nên nghe và khi nào không cần
                chứng minh mình đúng.
              </blockquote>
            </ArticleSection>

            <ArticleSection id="thuan-loi" title="8. Cự Môn khi gặp các yếu tố thuận lợi">
              <p>
                Khi Cự Môn được đặt trong một bố cục thuận lợi và hội hợp với
                những yếu tố tốt, các mặt tích cực của sao có thể được phát
                huy.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {positiveItems.map((item) => (
                  <div key={item} className="rounded-xl border border-amber-900/10 bg-[#fffdf8] p-4 text-sm leading-7 text-stone-600">
                    <span className="mr-2 text-amber-700">✦</span>{item}
                  </div>
                ))}
              </div>
              <p>
                Trong trường hợp này, “khẩu thiệt” có thể được chuyển hóa
                thành khả năng dùng lời nói để tạo ra giá trị.
              </p>
            </ArticleSection>

            <ArticleSection id="bat-loi" title="9. Cự Môn khi gặp các yếu tố bất lợi">
              <p>
                Ngược lại, khi bố cục lá số có nhiều yếu tố bất lợi, mặt khó
                của Cự Môn có thể nổi bật hơn.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {negativeItems.map((item) => (
                  <div key={item} className="rounded-xl border border-red-900/10 bg-red-50/60 p-4 text-sm leading-7 text-stone-700">
                    <span className="mr-2 text-red-800">•</span>{item}
                  </div>
                ))}
              </div>
              <p>
                Những biểu hiện trên không nên được hiểu là một kết luận cố
                định về con người. Cùng một tính chất có thể biểu hiện rất
                khác nhau tùy hoàn cảnh, môi trường giáo dục, nghề nghiệp và
                cách mỗi người sử dụng năng lực của mình.
              </p>
            </ArticleSection>

            <ArticleSection id="bai-hoc" title="10. Cự Môn và bài học về lời nói">
              <p>
                Nếu phải cô đọng hình tượng Cự Môn thành một bài học, có thể
                nói:
              </p>
              <div className="rounded-2xl bg-gradient-to-br from-red-950 to-red-900 p-6 text-center text-amber-50 shadow-sm sm:p-8">
                <p className="font-serif text-2xl font-bold sm:text-3xl">
                  “Lời nói là công cụ,
                  <span className="block text-amber-300">
                    nhưng cũng là trách nhiệm.”
                  </span>
                </p>
              </div>
              <p>
                Một người có khả năng nói tốt có thể thuyết phục người khác.
                Một người có khả năng phân tích tốt có thể phát hiện vấn đề.
                Một người có khả năng tranh biện tốt có thể bảo vệ quan điểm.
              </p>
              <p>
                Nhưng tất cả những năng lực đó chỉ thực sự trở thành ưu điểm
                khi được sử dụng đúng lúc và đúng mục đích.
              </p>
              <p>
                Cự Môn vì vậy không chỉ nói về “thị phi”. Nó còn nói về{" "}
                <strong>năng lực sử dụng thông tin và ngôn ngữ</strong>.
              </p>
            </ArticleSection>

            <ArticleSection id="tong-the" title="11. Cự Môn trong cách nhìn tổng thể của Tử Vi Đẩu Số">
              <p>
                Không nên luận Cự Môn độc lập. Khi nghiên cứu một lá số, cần
                xem xét đồng thời:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Cung Mệnh", "Cung Quan Lộc", "Cung Tài Bạch", "Cung Phúc Đức",
                  "Cung Thiên Di", "Các sao đồng cung", "Tam phương tứ chính",
                  "Tứ Hóa", "Đại hạn", "Tiểu hạn", "Toàn bộ bố cục của lá số",
                ].map((item) => (
                  <div key={item} className="rounded-lg bg-white/60 px-4 py-3 text-sm text-stone-700">
                    <span className="mr-2 text-amber-700">✦</span>{item}
                  </div>
                ))}
              </div>
              <p>
                Một Cự Môn giống nhau nhưng nằm ở những cung vị và bố cục khác
                nhau có thể tạo ra những biểu hiện hoàn toàn khác nhau.
              </p>
              <p>
                Đây là nguyên tắc quan trọng để tránh cách luận “một sao = một
                kết luận”.
              </p>
            </ArticleSection>

            <ArticleSection id="ket-luan" title="12. Kết luận">
              <p>
                Cự Môn là một chính tinh có hình tượng đặc biệt trong Tử Vi
                Đẩu Số.
              </p>
              <p>
                Nếu Thái Dương gợi lên hình ảnh <strong>ánh sáng</strong>, thì
                Cự Môn có thể được hình dung như{" "}
                <strong>cánh cửa chứa đựng những điều chưa được nói ra</strong>.
              </p>
              <div className="rounded-xl border border-amber-900/10 bg-[#fffdf8] p-5 sm:p-6">
                <p className="mb-3 font-serif text-xl font-bold text-red-950">
                  Những chủ đề lớn của Cự Môn
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Ngôn ngữ", "Tư duy", "Nghi vấn", "Phân tích", "Tranh luận", "Thị phi"].map((item) => (
                    <span key={item} className="rounded-full bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-900">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <p>
                Ở mặt tích cực, Cự Môn có thể trở thành năng lực về giao tiếp,
                nghiên cứu, phân tích, thuyết phục và phản biện.
              </p>
              <p>
                Ở mặt khó, chính những năng lực ấy có thể dẫn đến tranh luận,
                hiểu lầm và vấn đề do lời nói nếu không được sử dụng đúng cách.
              </p>
              <p>
                Vì vậy, nghiên cứu Cự Môn không chỉ là nghiên cứu về “thị
                phi”, mà sâu hơn là nghiên cứu về cách con người tiếp nhận
                thông tin, sử dụng ngôn ngữ và hình thành quan điểm.
              </p>
              <p>
                Đó cũng là giá trị quan trọng của việc nghiên cứu Cự Môn trong
                Tử Vi Đẩu Số.
              </p>
            </ArticleSection>
          </div>

          <div className="thien-duong-note">
            <strong>Lưu ý:</strong> Nội dung mang
            tính nghiên cứu và tham khảo về Tử Vi Đẩu Số. Các trường phái có
            thể có cách diễn giải khác nhau.
          </div>
        </article>

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
                  門
                </div>
                <p className="star-name">Cự Môn</p>
                <p className="star-caption">
                  Ngôn ngữ và biện luận
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
