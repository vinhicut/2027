import React, { useState } from 'react';

/**
 * COMPONENT: BẢNG 12 KHUNG GIỜ HOÀNG ĐẠO / HẮC ĐẠO TRONG NGÀY (FULL-WIDTH, VISUAL HIERARCHY)
 */
function HourlyFortuneMatrix({ hourlyDeities }) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'hoangdao' | 'hacdao'

  if (!hourlyDeities || !hourlyDeities.length) return null;

  const displayedHours = hourlyDeities.filter((h) => {
    if (filterType === 'hoangdao') return h.isHoangDao;
    if (filterType === 'hacdao') return !h.isHoangDao;
    return true;
  });

  const getRatingBadgeClass = (rating) => {
    if (rating === 'Đại Cát') return 'badge-dai-cat';
    if (rating === 'Cát') return 'badge-cat';
    if (rating === 'Tiểu Hung') return 'badge-tieu-hung';
    if (rating === 'Đại Hung') return 'badge-dai-hung';
    return 'badge-hung';
  };

  return (
    <div className="lvs-card lvs-hourly-card full-width">
      <div className="lvs-card-header">
        <div className="lvs-header-title">
          <h3>12 Khung Giờ Hoàng Đạo & Hắc Đạo Trong Ngày</h3>
        </div>
        <div className="lvs-filter-pills">
          <button
            type="button"
            className={`pill-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            Tất cả 12 giờ
          </button>
          <button
            type="button"
            className={`pill-btn gold ${filterType === 'hoangdao' ? 'active' : ''}`}
            onClick={() => setFilterType('hoangdao')}
          >
            Chỉ Giờ Hoàng Đạo
          </button>
          <button
            type="button"
            className={`pill-btn dark ${filterType === 'hacdao' ? 'active' : ''}`}
            onClick={() => setFilterType('hacdao')}
          >
            Chỉ Giờ Hắc Đạo
          </button>
        </div>
      </div>

      <div className="hourly-grid-fullwidth">
        {displayedHours.map((h) => {
          return (
            <div
              key={h.chiIndex}
              className={`hour-item ${
                h.isHoangDao ? 'is-hoang-dao' : 'is-hac-dao'
              }`}
            >
              <div className="hour-time-badge">
                <span className="hour-chi">{h.fullName}</span>
                <span className="hour-clock">{h.timeRange}</span>
              </div>

              <div className="hour-deity-info">
                <span
                  className={`deity-tag ${
                    h.isHoangDao ? 'tag-hoang-dao' : 'tag-hac-dao'
                  }`}
                >
                  {h.deityName}
                </span>
                <span className={`deity-rating ${getRatingBadgeClass(h.rating)}`}>
                  {h.rating}
                </span>
              </div>

              <p className="hour-desc">{h.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HourlyFortuneMatrix;
