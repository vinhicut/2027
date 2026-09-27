import React from 'react';
import { Link } from 'react-router-dom';
import './KhamThienGiamThaiDuong.css';

const sections = [
  { id: 'tong-quan', label: 'Tổng quan về Thiên Lương' },
  { id: 'dac-tinh', label: 'Đặc tính cơ bản' },
  { id: 'vi-tri', label: 'Vị trí Miếu – Vượng – Đắc – Hãm' },
  { id: 'cung', label: 'Thiên Lương tại các cung quan trọng' },
  { id: 'ket-hop', label: 'Kết hợp sao quan trọng' },
  { id: 'loi-ban', label: 'Lời bàn của Khâm Thiên Giám' },
];

const ThienLuong = () => {
  return (
    <main className="thien-duong-page">
      <div className="thien-duong-container">
        <div className="thien-duong-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/chuyen-muc">Tử Vi - Tính Chất</Link>
          <span>›</span>
          <span>Thiên Lương</span>
        </div>

        <h1 className="thien-duong-title">
          KHÂM THIÊN GIÁM TỬ VI ĐẨU SỐ – THIÊN LƯƠNG
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
                src="https://picsum.photos/seed/thienluong/1000/500"
                alt="Khâm Thiên Giám Tử Vi Đẩu Số - Thiên Lương"
              />
            </div>

            <p className="thien-duong-lead">
              Thiên Lương là chính tinh Nam Đẩu, mang ý nghĩa phúc thọ, che
              chở và giải ách; thường được ví như bóng mát nâng đỡ người khác.
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
        <h2 className="thien-duong-section-title">1. Tổng quan về Thiên Lương</h2>

        <p className="mb-4">
          <strong>Thiên Lương (天梁)</strong> là một trong <strong>14 chính tinh</strong> của hệ thống Tử Vi Đẩu Số, thuộc{' '}
          <strong>Nam Đẩu tinh</strong>, đứng thứ 6 trong vòng sao Thiên Phủ (Thiên Phủ → Thái Âm → Tham Lang → Cự Môn → Thiên Tướng →{' '}
          <strong>Thiên Lương</strong> → Thất Sát → Phá Quân).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-medium text-amber-800">Ngũ hành:</span> Âm Mộc
              </li>
              <li>
                <span className="font-medium text-amber-800">Hóa khí:</span> Ấm (che chở, bảo hộ, tiêu tai giải ách)
              </li>
              <li>
                <span className="font-medium text-amber-800">Tính chất:</span> Phúc tinh – Thọ tinh – Ấm tinh
              </li>
              <li>
                <span className="font-medium text-amber-800">Chủ tinh:</span> Cai quản cung Phụ Mẫu
              </li>
            </ul>
          </div>

          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <p className="text-sm italic text-stone-700">
              Theo cổ thư: <em>“Thiên Lương chủ thọ, chủ giải ách”</em>. Đây là sao mang năng lượng bảo hộ mạnh mẽ nhất trong hệ thống, có khả năng <strong>phùng hung hóa cát</strong>, biến nguy thành an.
            </p>
          </div>
        </div>

        <p className="mb-3">
          Người có Thiên Lương thủ mệnh thường được ví như “cây đại thụ che bóng mát” hoặc “ông quan thanh liêm”, luôn sẵn sàng đỡ đần người khác.
        </p>
        <p>
          <strong>Hình tượng thần chủ:</strong> Lý Tịnh (Lý Thiên Vương – Thác Tháp Thiên Vương) trong Phong Thần Diễn Nghĩa – vị tướng vừa có võ công, vừa có đạo hạnh, trường thọ và bảo hộ chúng sinh.
        </p>
      </section>

      {/* 2. Đặc tính cơ bản */}
      <section id="dac-tinh" className="thien-duong-section">
        <h2 className="thien-duong-section-title">2. Đặc tính cơ bản</h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-amber-100 text-amber-900">
                <th className="border border-amber-200 px-4 py-2 text-left">Thuộc tính</th>
                <th className="border border-amber-200 px-4 py-2 text-left">Nội dung</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-amber-100 px-4 py-2 font-medium">Loại sao</td>
                <td className="border border-amber-100 px-4 py-2">Chính tinh</td>
              </tr>
              <tr className="bg-amber-50/50">
                <td className="border border-amber-100 px-4 py-2 font-medium">Nhóm</td>
                <td className="border border-amber-100 px-4 py-2">Nam Đẩu – Phúc Thọ tinh</td>
              </tr>
              <tr>
                <td className="border border-amber-100 px-4 py-2 font-medium">Âm Dương</td>
                <td className="border border-amber-100 px-4 py-2">Âm</td>
              </tr>
              <tr className="bg-amber-50/50">
                <td className="border border-amber-100 px-4 py-2 font-medium">Ngũ hành</td>
                <td className="border border-amber-100 px-4 py-2">Mộc</td>
              </tr>
              <tr>
                <td className="border border-amber-100 px-4 py-2 font-medium">Hóa khí</td>
                <td className="border border-amber-100 px-4 py-2">Ấm</td>
              </tr>
              <tr className="bg-amber-50/50">
                <td className="border border-amber-100 px-4 py-2 font-medium">Tính cách chính</td>
                <td className="border border-amber-100 px-4 py-2">
                  Nhân hậu, chính trực, trí tuệ, bao dung, thích giúp đỡ
                </td>
              </tr>
              <tr>
                <td className="border border-amber-100 px-4 py-2 font-medium">Nghề nghiệp phù hợp</td>
                <td className="border border-amber-100 px-4 py-2">
                  Giáo dục, y tế, luật pháp, tư vấn, tôn giáo, công chức thanh liêm
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
            <h3 className="font-semibold text-emerald-800 mb-3">Điểm mạnh</h3>
            <ul className="space-y-2 text-sm list-disc list-inside text-emerald-900">
              <li>Chính trực, liêm khiết, ghét gian dối</li>
              <li>Có khả năng hóa giải tai họa, được quý nhân che chở</li>
              <li>Trí tuệ sâu sắc, biết phân tích và đưa lời khuyên chuẩn</li>
              <li>Dễ sống thọ, có phúc đức tổ tiên</li>
            </ul>
          </div>

          <div className="bg-rose-50 rounded-xl p-5 border border-rose-100">
            <h3 className="font-semibold text-rose-800 mb-3">Điểm yếu</h3>
            <ul className="space-y-2 text-sm list-disc list-inside text-rose-900">
              <li>Đôi khi bảo thủ, chậm thay đổi</li>
              <li>Hay lo chuyện bao đồng, dễ bị lợi dụng lòng tốt</li>
              <li>Khi hãm địa dễ gặp nhiều gian nan lúc trẻ (nhưng cuối cùng vẫn thoát nạn)</li>
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
            <p className="font-semibold text-green-900">Thìn · Ngọ · Tuất</p>
          </div>
          <div className="bg-lime-50 border border-lime-200 rounded-lg p-4 text-center">
            <p className="text-xs uppercase text-lime-700 font-medium mb-1">Vượng địa</p>
            <p className="font-semibold text-lime-900">Tý · Mão · Dần · Thân</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-xs uppercase text-yellow-700 font-medium mb-1">Đắc địa</p>
            <p className="font-semibold text-yellow-900">Sửu · Mùi</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-xs uppercase text-red-700 font-medium mb-1">Hãm địa</p>
            <p className="font-semibold text-red-900">Dậu · Tỵ · Hợi</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Khi Thiên Lương <strong>miếu/vượng</strong> thì phát huy tối đa năng lực che chở và phúc thọ. Khi <strong>hãm địa</strong> (đặc biệt Tỵ – Hợi) thì cuộc đời nhiều thử thách lúc trẻ, nhưng vẫn có khả năng “cửu tử nhất sinh”.
        </p>
      </section>

      {/* 4. Tại các cung quan trọng */}
      <section id="cung" className="thien-duong-section">
        <h2 className="thien-duong-section-title">4. Thiên Lương tại các cung quan trọng</h2>

        <div className="space-y-4">
          {[
            {
              title: 'Cung Mệnh',
              content:
                'Người tính tình ôn hòa, nhân hậu, khuôn mặt chữ nhật hoặc thanh tú, nhìn già hơn tuổi. Có phong thái danh sĩ hoặc nhà tu hành. Thích giúp đỡ người khác, được mọi người kính trọng. Nghề nghiệp phù hợp: thầy giáo, bác sĩ, luật sư, cố vấn, quan chức thanh liêm.',
            },
            {
              title: 'Cung Phụ Mẫu',
              content:
                'Cha mẹ nhân hậu, có phúc đức, che chở con cái tốt. Quan hệ với cha mẹ hòa thuận, được hưởng phúc ấm tổ tiên.',
            },
            {
              title: 'Cung Tật Ách',
              content:
                'Rất tốt. Có khả năng tiêu tai giải ách mạnh. Dù gặp sát tinh vẫn dễ thoát nạn. Sức khỏe nhìn chung ổn định, sống thọ.',
            },
            {
              title: 'Cung Phúc Đức',
              content:
                'Phúc đức sâu dày, tổ tiên che chở, tâm linh phát triển. Dễ có duyên với tôn giáo, thiền định, từ thiện.',
            },
            {
              title: 'Cung Quan Lộc',
              content:
                'Sự nghiệp ổn định, thăng tiến chậm nhưng chắc. Phù hợp làm quan thanh liêm, giáo viên, bác sĩ, hoặc các nghề cần uy tín và đạo đức.',
            },
            {
              title: 'Cung Tử Tức',
              content:
                'Con cái hiền hậu, thông minh, hiếu thảo, mang lại phúc khí cho gia đình.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="border border-amber-100 rounded-xl p-5 hover:bg-amber-50/50 transition-colors"
            >
              <h3 className="font-semibold text-amber-800 mb-2">{item.title}</h3>
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
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <strong>Thiên Lương + Thiên Đồng:</strong> Nhân từ + lạc quan → nhà giáo, từ thiện, y đức.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <strong>Thiên Lương + Thái Dương:</strong> Ánh sáng + phúc ấm → quan chức, bác sĩ nổi tiếng.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <strong>Thiên Lương + Văn Xương / Văn Khúc:</strong> Học vấn cao, làm thầy, có danh vọng.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <strong>Thiên Lương + Tả Phụ / Hữu Bật / Khôi Việt:</strong> Được quý nhân giúp đỡ mạnh, dễ thành đạt.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <strong>Thiên Lương gặp sát tinh (Hỏa, Linh, Kình, Đà…):</strong> Nhiều gian nan lúc trẻ nhưng cuối cùng vẫn hóa giải được.
            </span>
          </li>
        </ul>
      </section>

      {/* 6. Lời bàn */}
      <section id="loi-ban" className="thien-duong-section">
        <h2 className="thien-duong-section-title">6. Lời bàn của Khâm Thiên Giám</h2>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
          <p className="mb-4">
            Thiên Lương là sao <strong>phúc ấm chân chính</strong>. Không phải sao mang lại giàu sang đột biến hay quyền lực áp đảo, mà là sao mang lại{' '}
            <strong>sự an toàn bền vững</strong>, tuổi thọ và lòng người. Người mệnh Thiên Lương thường không sống ồn ào, nhưng đến cuối đời mới thấy rõ giá trị của sự vững chãi và phúc đức mà sao này ban tặng.
          </p>
          <blockquote className="border-l-4 border-amber-500 pl-4 italic text-amber-900">
            “Thiên Lương như cây lương cột trời, che chở muôn dân. Có nó thì dù sóng gió cũng không đắm thuyền.”
          </blockquote>
        </div>
      </section>
            </div>

            <div className="thien-duong-note">
              Khâm Thiên Giám Tử Vi Đẩu Số · Thiên Lương Tinh
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
                  <div className="star-icon">梁</div>
                  <p className="star-name">Thiên Lương</p>
                  <p className="star-caption">Phúc thọ và che chở</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ThienLuong;
