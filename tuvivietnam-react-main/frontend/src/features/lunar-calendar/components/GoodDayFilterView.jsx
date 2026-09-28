import React, { useState, useMemo } from 'react';
import { PURPOSES, findGoodDaysInMonth } from '../engine';

/**
 * COMPONENT: BỘ LỌC TÌM NGÀY TỐT THEO CÔNG VIỆC (TEXT-ONLY)
 */
function GoodDayFilterView({ viewMonth, viewYear, onSelectDayAndSwitchToDaily }) {
  const [selectedPurpose, setSelectedPurpose] = useState('all');

  const goodDaysList = useMemo(() => {
    return findGoodDaysInMonth(viewMonth, viewYear, selectedPurpose);
  }, [viewMonth, viewYear, selectedPurpose]);

  return (
    <div className="lvs-good-day-finder">
      {/* Bộ chọn mục đích */}
      <div className="lvs-card finder-filter-card">
        <div className="finder-header">
          <div className="finder-title-row">
            <h3>Tìm Ngày Tốt Trong Tháng {viewMonth}/{viewYear}</h3>
          </div>
          <p className="finder-subtitle">
            Hệ thống phân tích Hoàng Đạo, Thập Nhị Trực, Nhị Thập Bát Tú và lọc trừ ngày kỵ dân gian để đề xuất ngày đẹp nhất cho bạn.
          </p>
        </div>

        <div className="purpose-pill-container">
          {PURPOSES.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`purpose-pill ${selectedPurpose === p.id ? 'active' : ''}`}
              onClick={() => setSelectedPurpose(p.id)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Danh sách kết quả ngày tốt */}
      <div className="finder-results-list">
        {goodDaysList.map(({ day, finalScore, reasons, goodHours }) => {
          const isHighRank = finalScore >= 8.0;

          return (
            <div
              key={day.solar.dateStr}
              className={`finder-result-card ${isHighRank ? 'is-top-rank' : ''}`}
            >
              <div className="result-card-left">
                <div className="res-solar-day">{day.solar.day}</div>
                <div className="res-solar-meta">
                  Tháng {day.solar.month}/{day.solar.year} ({day.solar.weekdayName})
                </div>
                <div className="res-lunar-date">
                  Âm lịch: Ngày {day.lunar.day}/{day.lunar.month} ({day.canChi.day.fullName})
                </div>
              </div>

              <div className="result-card-center">
                <div className="res-badges-row">
                  <span className={`score-badge ${day.ratingBadgeClass}`}>
                    {finalScore}/10 điểm ({day.ratingLabel})
                  </span>
                  <span
                    className={`status-pill ${
                      day.hoangDao.isHoangDao ? 'hoang-dao' : 'hac-dao'
                    }`}
                  >
                    {day.hoangDao.badgeText}
                  </span>
                  <span className="solar-term-pill">
                    Tiết {day.solarTerm.name}
                  </span>
                </div>

                {/* Các lý do cát lợi */}
                <div className="res-reasons-list">
                  {reasons.slice(0, 3).map((r, idx) => (
                    <div key={idx} className="reason-item">
                      - {r}
                    </div>
                  ))}
                </div>

                {/* Khung giờ hoàng đạo đẹp nhất */}
                <div className="res-good-hours">
                  <span className="label">Giờ đẹp:</span>
                  <div className="hours-tags">
                    {goodHours.map((gh) => (
                      <span key={gh.chiIndex} className="hour-tag" title={gh.timeRange}>
                        {gh.fullName} ({gh.deityName})
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="result-card-right">
                <button
                  type="button"
                  className="view-detail-btn"
                  onClick={() =>
                    onSelectDayAndSwitchToDaily(
                      day.solar.day,
                      day.solar.month,
                      day.solar.year
                    )
                  }
                >
                  Xem lốc lịch ngày này
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GoodDayFilterView;
