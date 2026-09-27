import React from 'react';
import { Link } from 'react-router-dom';
import './KhamThienGiamThaiDuong.css';

const sections = [
  { id: 'tong-quan', label: 'Tổng quan về Thất Sát' },
  { id: 'dac-tinh', label: 'Đặc tính cơ bản' },
  { id: 'vi-tri', label: 'Vị trí Miếu – Vượng – Đắc – Hãm' },
  { id: 'cung', label: 'Thất Sát tại các cung quan trọng' },
  { id: 'ket-hop', label: 'Kết hợp sao quan trọng' },
  { id: 'loi-ban', label: 'Lời bàn của Khâm Thiên Giám' },
];

const ThatSat = () => {
  return (
    <main className="thien-duong-page">
      <div className="thien-duong-container">
        <div className="thien-duong-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/chuyen-muc">Tử Vi - Tính Chất</Link>
          <span>›</span>
          <span>Thất Sát</span>
        </div>

        <h1 className="thien-duong-title">
          KHÂM THIÊN GIÁM TỬ VI ĐẨU SỐ – THẤT SÁT
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
                src="https://picsum.photos/seed/thatsat/1000/500"
                alt="Khâm Thiên Giám Tử Vi Đẩu Số - Thất Sát"
              />
            </div>

            <p className="thien-duong-lead">
              Thất Sát là chính tinh Nam Đẩu mang khí chất quyền uy, quyết
              đoán và hành động mạnh mẽ; biểu tượng của vị tướng tiên phong
              vượt qua thử thách.
            </p>

            <nav aria-label="Mục lục bài viết" className="thien-duong-toc">
              <h2>Mục lục</h2>
              <ol>
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span>{index + 1}.</span>
                      <span>{section.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="thien-duong-sections">

      {/* 1. Tổng quan */}
      <section id="tong-quan" className="thien-duong-section">
        <h2 className="thien-duong-section-title">1. Tổng quan về Thất Sát</h2>

        <p className="mb-4">
          <strong>Thất Sát (七殺)</strong> là một trong <strong>14 chính tinh</strong> của hệ thống Tử Vi Đẩu Số, thuộc{' '}
          <strong>Nam Đẩu tinh</strong>, đứng thứ 7 trong vòng sao Thiên Phủ (Thiên Phủ → Thái Âm → Tham Lang → Cự Môn → Thiên Tướng → Thiên Lương →{' '}
          <strong>Thất Sát</strong> → Phá Quân).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-medium text-red-800">Ngũ hành:</span> Dương Kim (Kim đới Hỏa)
              </li>
              <li>
                <span className="font-medium text-red-800">Hóa khí:</span> Quyền (Tướng tinh)
              </li>
              <li>
                <span className="font-medium text-red-800">Tính chất:</span> Quyền tinh – Sát tinh – Dũng tinh
              </li>
              <li>
                <span className="font-medium text-red-800">Chủ tinh:</span> Uy quyền, sát phạt, hành động quyết liệt
              </li>
            </ul>
          </div>

          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <p className="text-sm italic text-stone-700">
              Theo cổ thư: <em>“Thất Sát tinh quân, Nam Đẩu chi tướng, chủ sát phạt, quyền bính”</em>. Đây là sao mang khí chất của vị đại tướng, vừa sắc bén như thanh kiếm, vừa nóng nảy như sắt nung đỏ.
            </p>
          </div>
        </div>

        <p className="mb-3">
          Thất Sát nằm trong bộ <strong>Sát – Phá – Tham</strong> (Thất Sát, Phá Quân, Tham Lang), tượng trưng cho “Sân” trong Tham – Sân – Si. Người có Thất Sát thủ mệnh thường được ví như “vị tướng xung trận” – mạnh mẽ, quyết đoán, dám xông pha nhưng cũng dễ cô độc và nhiều sóng gió.
        </p>
        <p>
          <strong>Hình tượng:</strong> Đại tướng cầm quyền sinh sát, thích hành động hơn bàn luận, sẵn sàng phá bỏ cái cũ để xây dựng cái mới.
        </p>
      </section>

      {/* 2. Đặc tính cơ bản */}
      <section id="dac-tinh" className="thien-duong-section">
        <h2 className="thien-duong-section-title">2. Đặc tính cơ bản</h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-red-100 text-red-900">
                <th className="border border-red-200 px-4 py-2 text-left">Thuộc tính</th>
                <th className="border border-red-200 px-4 py-2 text-left">Nội dung</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-red-100 px-4 py-2 font-medium">Loại sao</td>
                <td className="border border-red-100 px-4 py-2">Chính tinh</td>
              </tr>
              <tr className="bg-red-50/50">
                <td className="border border-red-100 px-4 py-2 font-medium">Nhóm</td>
                <td className="border border-red-100 px-4 py-2">Nam Đẩu – Sát Phá Tham</td>
              </tr>
              <tr>
                <td className="border border-red-100 px-4 py-2 font-medium">Âm Dương</td>
                <td className="border border-red-100 px-4 py-2">Dương</td>
              </tr>
              <tr className="bg-red-50/50">
                <td className="border border-red-100 px-4 py-2 font-medium">Ngũ hành</td>
                <td className="border border-red-100 px-4 py-2">Kim đới Hỏa</td>
              </tr>
              <tr>
                <td className="border border-red-100 px-4 py-2 font-medium">Hóa khí</td>
                <td className="border border-red-100 px-4 py-2">Quyền (Tướng)</td>
              </tr>
              <tr className="bg-red-50/50">
                <td className="border border-red-100 px-4 py-2 font-medium">Tính cách chính</td>
                <td className="border border-red-100 px-4 py-2">
                  Dũng mãnh, quyết đoán, nóng nảy, cô độc, thích quyền lực
                </td>
              </tr>
              <tr>
                <td className="border border-red-100 px-4 py-2 font-medium">Nghề nghiệp phù hợp</td>
                <td className="border border-red-100 px-4 py-2">
                  Quân sự, công an, chính trị, quản lý, kinh doanh mạo hiểm, thể thao
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
            <h3 className="font-semibold text-emerald-800 mb-3">Điểm mạnh</h3>
            <ul className="space-y-2 text-sm list-disc list-inside text-emerald-900">
              <li>Can đảm, dũng mãnh, không sợ gian nan</li>
              <li>Quyết đoán, hành động nhanh, dám nghĩ dám làm</li>
              <li>Có tài lãnh đạo, uy quyền tự nhiên</li>
              <li>Tự lập mạnh, trọng nghĩa khí, trung thành</li>
            </ul>
          </div>

          <div className="bg-rose-50 rounded-xl p-5 border border-rose-100">
            <h3 className="font-semibold text-rose-800 mb-3">Điểm yếu</h3>
            <ul className="space-y-2 text-sm list-disc list-inside text-rose-900">
              <li>Nóng nảy, bốc đồng, dễ xung đột</li>
              <li>Cô độc, khó gần gũi, hay lấn át người khác</li>
              <li>Dễ khắc người thân, hôn nhân sóng gió</li>
              <li>Khi hãm địa dễ gặp tai nạn, kiện tụng, tù tội</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Vị trí Miếu Vượng Đắc Hãm */}
      <section id="vi-tri" className="thien-duong-section">
        <h2 className="thien-duong-section-title">3. Vị trí Miếu – Vượng – Đắc – Hãm</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-xs uppercase text-green-700 font-medium mb-1">Miếu địa</p>
            <p className="font-semibold text-green-900">Tý · Ngọ · Dần · Thân</p>
          </div>
          <div className="bg-lime-50 border border-lime-200 rounded-lg p-4 text-center">
            <p className="text-xs uppercase text-lime-700 font-medium mb-1">Vượng địa</p>
            <p className="font-semibold text-lime-900">Tỵ · Hợi</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-xs uppercase text-yellow-700 font-medium mb-1">Đắc địa</p>
            <p className="font-semibold text-yellow-900">Sửu · Mùi</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-xs uppercase text-red-700 font-medium mb-1">Hãm địa</p>
            <p className="font-semibold text-red-900">Thìn · Tuất · Mão · Dậu</p>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p>
            <strong>Thất Sát Triều Đẩu / Ngưỡng Đẩu:</strong> Tại Dần – Thân (Triều Đẩu) và Tý – Ngọ (Ngưỡng Đẩu) là thượng cách, chủ phú quý, quyền lực lớn nếu gặp cát tinh.
          </p>
          <p>
            Khi <strong>miếu/vượng</strong> thì phát huy uy quyền và tài lãnh đạo. Khi <strong>hãm địa</strong> dễ trở nên nóng nảy, hung bạo, nhiều tai họa và cô độc.
          </p>
        </div>
      </section>

      {/* 4. Tại các cung quan trọng */}
      <section id="cung" className="thien-duong-section">
        <h2 className="thien-duong-section-title">4. Thất Sát tại các cung quan trọng</h2>

        <div className="space-y-4">
          {[
            {
              title: 'Cung Mệnh',
              content:
                'Người tính cách mạnh mẽ, quyết đoán, dũng cảm, thích hành động. Ngoại hình thường cao lớn, mặt chữ nhật hoặc vuông, mắt to hơi lồi, da ngăm. Tự lập từ sớm, nhiều gian nan nhưng nếu vượt qua thì thành công lớn. Dễ cô độc, nóng nảy, thích quyền lực.',
            },
            {
              title: 'Cung Phụ Mẫu',
              content:
                'Cha mẹ nghiêm khắc, có uy quyền. Quan hệ với cha mẹ dễ khắc khẩu hoặc xa cách. Nếu miếu vượng thì cha mẹ làm trong ngành quân sự, công an; nếu hãm địa dễ mất mát sớm hoặc bất hòa.',
            },
            {
              title: 'Cung Phu Thê',
              content:
                'Hôn nhân nhiều sóng gió, dễ khắc vợ/chồng. Vợ/chồng thường tính cách mạnh mẽ hoặc là người trưởng. Dễ muộn hôn, hoặc phải trải qua nhiều lần mới ổn định (trừ khi tại Dần – Thân).',
            },
            {
              title: 'Cung Tử Tức',
              content:
                'Con cái khó nuôi lúc nhỏ, dễ bệnh tật hoặc xa cách. Số con không nhiều. Nếu miếu vượng tại Dần – Thân thì có quý tử, con cái tài cán.',
            },
            {
              title: 'Cung Quan Lộc',
              content:
                'Rất tốt cho sự nghiệp. Phù hợp ngành quân sự, công an, chính trị, quản lý. Miếu vượng thì uy quyền lớn, dễ thăng tiến; hãm địa thì nhiều thị phi, thăng trầm.',
            },
            {
              title: 'Cung Tài Bạch',
              content:
                'Tiền bạc đến từ sự quyết đoán và mạo hiểm. Miếu vượng (đặc biệt Dần – Thân) dễ kiếm tiền; hãm địa thì tài lộc thất thường, dễ hao tán.',
            },
            {
              title: 'Cung Tật Ách',
              content:
                'Dễ bị thương tích, tai nạn, bệnh về máu huyết hoặc xương khớp. Cần cẩn thận với dao kéo, đao thương. Nếu gặp sát tinh càng dễ gặp họa.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="border border-red-100 rounded-xl p-5 hover:bg-red-50/50 transition-colors"
            >
              <h3 className="font-semibold text-red-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-700">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Kết hợp sao */}
      <section id="ket-hop" className="thien-duong-section">
        <h2 className="thien-duong-section-title">5. Kết hợp sao quan trọng</h2>

        <ul className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="text-red-600 font-bold">•</span>
            <span>
              <strong>Thất Sát + Tử Vi / Thiên Phủ:</strong> Đại tướng phò tá vua → quyền lực lớn, xuất tướng nhập tướng.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-600 font-bold">•</span>
            <span>
              <strong>Thất Sát + Lộc Tồn / Hóa Lộc / Hóa Quyền / Hóa Khoa:</strong> Thượng cách, phú quý, uy quyền.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-600 font-bold">•</span>
            <span>
              <strong>Thất Sát + Tả Phụ / Hữu Bật / Khôi Việt / Xương Khúc:</strong> Được quý nhân giúp, dễ thành đại nghiệp.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-600 font-bold">•</span>
            <span>
              <strong>Thất Sát + Liêm Trinh:</strong> Hùng túc, mạnh mẽ nhưng dễ gặp bi kịch, tai nạn nếu hãm địa.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-600 font-bold">•</span>
            <span>
              <strong>Thất Sát gặp sát tinh (Kình Dương, Đà La, Hỏa, Linh, Không Kiếp):</strong> Nhiều tai họa, thương tích, kiện tụng, cần hết sức thận trọng.
            </span>
          </li>
        </ul>
      </section>

      {/* 6. Lời bàn */}
      <section id="loi-ban" className="thien-duong-section">
        <h2 className="thien-duong-section-title">6. Lời bàn của Khâm Thiên Giám</h2>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
          <p className="mb-4">
            Thất Sát là sao <strong>uy quyền và sát phạt</strong>. Không phải sao mang lại sự êm ấm, mà là sao rèn luyện con người qua lửa thử thách. Người mệnh Thất Sát thường phải tự lực cánh sinh, trải qua nhiều sóng gió mới đạt được thành tựu. Nếu biết kiềm chế nóng nảy, trọng nghĩa khí và hành động đúng đắn, họ có thể trở thành bậc đại tướng, lãnh đạo có uy tín lớn.
          </p>
          <blockquote className="border-l-4 border-red-500 pl-4 italic text-red-900">
            “Thất Sát như thanh kiếm sắc bén. Dùng đúng chỗ thì bảo quốc an dân, dùng sai chỗ thì thương thân hại mình.”
          </blockquote>
        </div>
      </section>
            </div>

            <div className="thien-duong-note">
              Khâm Thiên Giám Tử Vi Đẩu Số · Thất Sát Tinh
            </div>
          </article>

          <aside className="thien-duong-sidebar">
            <div>
              <p className="sidebar-label">Trong bài viết</p>
              <div className="sidebar-links">
                {sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`}>
                    {section.label}
                  </a>
                ))}
              </div>

              <div className="sidebar-star">
                <div>
                  <div className="star-icon">殺</div>
                  <p className="star-name">Thất Sát</p>
                  <p className="star-caption">Quyền uy và quyết đoán</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ThatSat;
