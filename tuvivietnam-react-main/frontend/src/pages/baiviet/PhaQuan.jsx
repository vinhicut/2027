import React from 'react';
import { Link } from 'react-router-dom';
import './KhamThienGiamThaiDuong.css';

const sections = [
  { id: 'tong-quan', label: 'Tổng quan về Phá Quân' },
  { id: 'dac-tinh', label: 'Đặc tính cơ bản' },
  { id: 'vi-tri', label: 'Vị trí Miếu – Vượng – Đắc – Hãm' },
  { id: 'cung', label: 'Phá Quân tại các cung quan trọng' },
  { id: 'ket-hop', label: 'Kết hợp sao quan trọng' },
  { id: 'loi-ban', label: 'Lời bàn của Khâm Thiên Giám' },
];

const PhaQuan = () => {
  return (
    <main className="thien-duong-page">
      <div className="thien-duong-container">
        <div className="thien-duong-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/chuyen-muc">Tử Vi - Tính Chất</Link>
          <span>›</span>
          <span>Phá Quân</span>
        </div>

        <h1 className="thien-duong-title">
          KHÂM THIÊN GIÁM TỬ VI ĐẨU SỐ – PHÁ QUÂN
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
                src="https://picsum.photos/seed/phaquan/1000/500"
                alt="Khâm Thiên Giám Tử Vi Đẩu Số - Phá Quân"
              />
            </div>

            <p className="thien-duong-lead">
              Phá Quân là chính tinh Bắc Đẩu mang tính chất phá cũ lập mới,
              đột phá và biến động; sức mạnh tiên phong cần được sử dụng đúng
              hướng để tạo dựng thành quả.
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
        <h2 className="thien-duong-section-title">1. Tổng quan về Phá Quân</h2>

        <p className="mb-4">
          <strong>Phá Quân (破軍)</strong> là một trong <strong>14 chính tinh</strong> của hệ thống Tử Vi Đẩu Số, thuộc{' '}
          <strong>Bắc Đẩu tinh</strong>, đứng thứ 8 (cuối cùng) trong vòng sao Thiên Phủ (Thiên Phủ → Thái Âm → Tham Lang → Cự Môn → Thiên Tướng → Thiên Lương → Thất Sát →{' '}
          <strong>Phá Quân</strong>).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-medium text-indigo-800">Ngũ hành:</span> Âm Thủy
              </li>
              <li>
                <span className="font-medium text-indigo-800">Hóa khí:</span> Hao (hao tán, phá vỡ)
              </li>
              <li>
                <span className="font-medium text-indigo-800">Tính chất:</span> Quyền tinh – Hao tinh – Bại tinh
              </li>
              <li>
                <span className="font-medium text-indigo-800">Chủ tinh:</span> Phu Thê, Tử Tức, Nô Bộc – phá cũ lập mới
              </li>
            </ul>
          </div>

          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <p className="text-sm italic text-stone-700">
              Theo cổ thư: <em>“Phá Quân thuộc Thủy, Bắc Đẩu đệ thất tinh, tại thiên vi sát khí, tại số vi hao tinh, cố hóa khí viết hao.”</em> Đây là sao mang khí chất của vị tướng tiên phong – phá vỡ cái cũ để mở đường cho cái mới.
            </p>
          </div>
        </div>

        <p className="mb-3">
          Phá Quân nằm trong bộ <strong>Sát – Phá – Tham</strong> (Thất Sát, Phá Quân, Tham Lang), tượng trưng cho “Si” trong Tham – Sân – Si. Người có Phá Quân thủ mệnh thường được ví như “vị tướng xung phong” – dũng mãnh, thích đột phá, nhưng cũng dễ gây hao tán và nhiều biến động.
        </p>
        <p>
          <strong>Hình tượng:</strong> Đại tướng tiên phong, sẵn sàng phá hủy để tái tạo, thích thay đổi và xông pha.
        </p>
      </section>

      {/* 2. Đặc tính cơ bản */}
      <section id="dac-tinh" className="thien-duong-section">
        <h2 className="thien-duong-section-title">2. Đặc tính cơ bản</h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-indigo-100 text-indigo-900">
                <th className="border border-indigo-200 px-4 py-2 text-left">Thuộc tính</th>
                <th className="border border-indigo-200 px-4 py-2 text-left">Nội dung</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-indigo-100 px-4 py-2 font-medium">Loại sao</td>
                <td className="border border-indigo-100 px-4 py-2">Chính tinh</td>
              </tr>
              <tr className="bg-indigo-50/50">
                <td className="border border-indigo-100 px-4 py-2 font-medium">Nhóm</td>
                <td className="border border-indigo-100 px-4 py-2">Bắc Đẩu – Sát Phá Tham</td>
              </tr>
              <tr>
                <td className="border border-indigo-100 px-4 py-2 font-medium">Âm Dương</td>
                <td className="border border-indigo-100 px-4 py-2">Âm</td>
              </tr>
              <tr className="bg-indigo-50/50">
                <td className="border border-indigo-100 px-4 py-2 font-medium">Ngũ hành</td>
                <td className="border border-indigo-100 px-4 py-2">Thủy</td>
              </tr>
              <tr>
                <td className="border border-indigo-100 px-4 py-2 font-medium">Hóa khí</td>
                <td className="border border-indigo-100 px-4 py-2">Hao</td>
              </tr>
              <tr className="bg-indigo-50/50">
                <td className="border border-indigo-100 px-4 py-2 font-medium">Tính cách chính</td>
                <td className="border border-indigo-100 px-4 py-2">
                  Dũng mãnh, hiếu thắng, thích đột phá, dễ hao tán, biến động
                </td>
              </tr>
              <tr>
                <td className="border border-indigo-100 px-4 py-2 font-medium">Nghề nghiệp phù hợp</td>
                <td className="border border-indigo-100 px-4 py-2">
                  Quân sự, kỹ thuật, kinh doanh mạo hiểm, thể thao, sáng tạo, cải cách
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
            <h3 className="font-semibold text-emerald-800 mb-3">Điểm mạnh</h3>
            <ul className="space-y-2 text-sm list-disc list-inside text-emerald-900">
              <li>Thông minh, nhanh nhẹn, dũng cảm, quyết đoán</li>
              <li>Thích đột phá, dám phá bỏ cái cũ để lập cái mới</li>
              <li>Có tài lãnh đạo, thao lược, thích hoạt động</li>
              <li>Tự lập mạnh, không ngại gian nan, thay đổi</li>
            </ul>
          </div>

          <div className="bg-rose-50 rounded-xl p-5 border border-rose-100">
            <h3 className="font-semibold text-rose-800 mb-3">Điểm yếu</h3>
            <ul className="space-y-2 text-sm list-disc list-inside text-rose-900">
              <li>Hiếu thắng, tự đắc, dễ nóng nảy, bạo tính</li>
              <li>Hao tán tiền bạc, hôn nhân, lục thân</li>
              <li>Khó ổn định, nhiều biến động, thăng trầm</li>
              <li>Khi hãm địa dễ ngang ngược, nham hiểm, gây họa</li>
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
            <p className="font-semibold text-green-900">Tý · Ngọ</p>
          </div>
          <div className="bg-lime-50 border border-lime-200 rounded-lg p-4 text-center">
            <p className="text-xs uppercase text-lime-700 font-medium mb-1">Vượng địa</p>
            <p className="font-semibold text-lime-900">Sửu · Mùi</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-xs uppercase text-yellow-700 font-medium mb-1">Đắc địa</p>
            <p className="font-semibold text-yellow-900">Thìn · Tuất</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-xs uppercase text-red-700 font-medium mb-1">Hãm địa</p>
            <p className="font-semibold text-red-900">Mão · Dậu · Dần · Thân · Tỵ · Hợi</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Khi Phá Quân <strong>miếu/vượng/đắc</strong> thì phát huy được tính đột phá và tài năng, dễ thành công sau biến động. Khi <strong>hãm địa</strong> thì tính hao tán, phá hoại mạnh, cuộc đời nhiều trắc trở, khó ổn định.
        </p>
      </section>

      {/* 4. Tại các cung quan trọng */}
      <section id="cung" className="thien-duong-section">
        <h2 className="thien-duong-section-title">4. Phá Quân tại các cung quan trọng</h2>

        <div className="space-y-4">
          {[
            {
              title: 'Cung Mệnh',
              content:
                'Người cá tính mạnh, hiếu thắng, thích đột phá, không chịu ngồi yên. Ngoại hình thường đầy đặn, lưng dày, mắt lộ, mày thưa. Tự lập từ sớm, nhiều thay đổi công việc và nơi ở. Miếu vượng thì thông minh, dũng mãnh; hãm địa dễ ngang ngược, bạo tính.',
            },
            {
              title: 'Cung Phu Thê',
              content:
                'Hôn nhân nhiều biến động, dễ khắc vợ/chồng, cãi vã hoặc ly tán. Vợ/chồng thường cá tính mạnh hoặc hay thay đổi. Nữ mệnh càng bất lợi về tình duyên. Cần muộn hôn hoặc xuất ngoại mới dễ ổn định.',
            },
            {
              title: 'Cung Tử Tức',
              content:
                'Con cái khó nuôi, dễ bệnh tật hoặc hao tổn. Số con không nhiều, quan hệ với con dễ xa cách. Nếu gặp cát tinh thì khá hơn.',
            },
            {
              title: 'Cung Quan Lộc',
              content:
                'Sự nghiệp nhiều thăng trầm, thích thay đổi, đột phá. Phù hợp ngành quân sự, kỹ thuật, kinh doanh mạo hiểm, sáng tạo. Miếu vượng dễ thành công lớn sau biến cố; hãm địa dễ thất bại, phá sản.',
            },
            {
              title: 'Cung Tài Bạch',
              content:
                'Tài lộc thất thường, dễ kiếm được nhưng cũng dễ hao tán. Không nên đầu tư lớn khi hãm địa. Miếu vượng thì có khả năng làm giàu nhờ đột phá.',
            },
            {
              title: 'Cung Phúc Đức',
              content:
                'Phúc đức không dày, tâm lý dễ bất ổn, nhiều lo âu. Dễ gặp biến cố tinh thần hoặc gia đạo. Cần tu dưỡng để hóa giải.',
            },
            {
              title: 'Cung Nô Bộc',
              content:
                'Bạn bè, cấp dưới dễ thay đổi, khó tin cậy lâu dài. Dễ bị phản bội hoặc hao tổn vì người xung quanh.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="border border-indigo-100 rounded-xl p-5 hover:bg-indigo-50/50 transition-colors"
            >
              <h3 className="font-semibold text-indigo-800 mb-2">{item.title}</h3>
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
            <span className="text-indigo-600 font-bold">•</span>
            <span>
              <strong>Phá Quân + Tử Vi:</strong> “Vua đi cùng tướng cướp” → Tử Vi chế ngự bớt hung khí, thành đại nghiệp nếu đắc địa.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-600 font-bold">•</span>
            <span>
              <strong>Phá Quân + Lộc Tồn / Hóa Lộc / Hóa Quyền / Hóa Khoa:</strong> Giảm hao tán, dễ thành công, phú quý.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-600 font-bold">•</span>
            <span>
              <strong>Phá Quân + Tả Phụ / Hữu Bật / Xương Khúc / Khôi Việt:</strong> Được quý nhân giúp, đột phá mạnh.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-600 font-bold">•</span>
            <span>
              <strong>Phá Quân + Thất Sát / Tham Lang:</strong> Sát Phá Tham hội – biến động cực mạnh, thành bại nhanh chóng.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-600 font-bold">•</span>
            <span>
              <strong>Phá Quân gặp sát tinh (Kình Dương, Đà La, Hỏa, Linh, Không Kiếp):</strong> Hao tán nặng, tai họa, phá sản, cần hết sức thận trọng.
            </span>
          </li>
        </ul>
      </section>

      {/* 6. Lời bàn */}
      <section id="loi-ban" className="thien-duong-section">
        <h2 className="thien-duong-section-title">6. Lời bàn của Khâm Thiên Giám</h2>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6">
          <p className="mb-4">
            Phá Quân là sao <strong>phá để lập</strong>. Không phải sao mang lại sự ổn định lâu dài, mà là sao buộc con người phải thay đổi, đột phá và tái tạo. Người mệnh Phá Quân thường phải trải qua nhiều lần “phá” mới có được “lập”. Nếu biết dùng đúng chỗ sức mạnh tiên phong, họ có thể trở thành bậc khai phá, lãnh đạo có tầm nhìn xa. Nếu để tính hiếu thắng và hao tán lấn át, thì cuộc đời sẽ nhiều sóng gió và mất mát.
          </p>
          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-indigo-900">
            “Phá Quân như sóng lớn. Biết cưỡi sóng thì tiến xa, không biết thì bị cuốn trôi.”
          </blockquote>
        </div>
      </section>
            </div>

            <div className="thien-duong-note">
              Khâm Thiên Giám Tử Vi Đẩu Số · Phá Quân Tinh
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
                  <div className="star-icon">破</div>
                  <p className="star-name">Phá Quân</p>
                  <p className="star-caption">Đột phá và đổi mới</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default PhaQuan;
