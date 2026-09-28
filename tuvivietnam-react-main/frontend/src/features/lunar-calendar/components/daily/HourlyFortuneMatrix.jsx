import React from 'react';

/**
 * MA TRẬN 12 KHUNG GIỜ HOÀNG ĐẠO & GIỜ XUẤT HÀNH LÝ THUẦN PHONG
 */
function HourlyFortuneMatrix({ hourlyDeities }) {
  if (!hourlyDeities || hourlyDeities.length === 0) return null;

  return (
    <div className="lvs-hourly-fortune-matrix">
      <div className="matrix-header-title">
        <h3 className="section-title">
          12 Khung Giờ Trong Ngày & Giờ Xuất Hành Lý Thuần Phong
        </h3>
        <span className="matrix-subnote">
          (Màu vàng/xanh: Giờ Hoàng Đạo & Cát Tinh; Màu tối: Giờ Hắc Đạo)
        </span>
      </div>

      <div className="matrix-grid-12">
        {hourlyDeities.map((item) => {
          const isGoodHour = item.isHoangDao;
          const ltp = item.lyThuanPhong;

          return (
            <div
              key={item.timeRange}
              className={`hour-card ${isGoodHour ? 'hour-hoang-dao' : 'hour-hac-dao'}`}
            >
              {/* Header card: Tên giờ & Huy hiệu Hoàng/Hắc Đạo */}
              <div className="hour-card-top">
                <div className="hour-name-time">
                  <span className="hour-chi-title">Giờ {item.chi}</span>
                  <span className="hour-can-text">{item.can} {item.chi}</span>
                </div>
                <span className={`hour-deity-badge ${isGoodHour ? 'badge-hd' : 'badge-bad'}`}>
                  {item.deityName}
                </span>
              </div>

              {/* Khung giờ dương lịch */}
              <div className="hour-time-range">{item.timeRange}</div>

              {/* Ngũ hành nạp âm giờ */}
              <div className="hour-napam-text">{item.napAm}</div>

              {/* Giờ Xuất Hành Lý Thuần Phong (Quyết định 2: Chấp thuận) */}
              {ltp && (
                <div className={`hour-ltp-box ${ltp.isGood ? 'ltp-good' : 'ltp-warning'}`} title={ltp.desc}>
                  <div className="ltp-name-rating">
                    <span className="ltp-tag">{ltp.name}</span>
                    <span className="ltp-rating">({ltp.rating})</span>
                  </div>
                  <div className="ltp-desc-text">{ltp.desc}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(HourlyFortuneMatrix);
