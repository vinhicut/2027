import React from 'react';
import { PURPOSES } from '../../core/index.js';
import { useGoodDayFinder } from '../../hooks/useGoodDayFinder.js';

/**
 * BỘ LỌC & TÌM KIẾM NGÀY TỐT THEO MỤC ĐÍCH SỰ VỤ
 */
function GoodDayFilterView({ initialMonth, initialYear, onSelectDayAndSwitch }) {
  const {
    filterMonth,
    filterYear,
    selectedPurpose,
    setSelectedPurpose,
    goodDays,
    handlePrevMonth,
    handleNextMonth,
  } = useGoodDayFinder(initialMonth, initialYear);

  return (
    <div className="lvs-good-days-view">
      {/* Thanh công cụ lọc */}
      <div className="good-days-filter-card">
        <div className="filter-card-header">
          <div className="filter-title-group">
            <h3>Tra Cứu Ngày Cát Lợi Theo Công Việc</h3>
            <p>
              Hệ thống kết hợp Hoàng Đạo, Khổng Minh Lục Diệu, Thập Nhị Trực, Nhị Thập Bát Tú và Bách Thần Sát để chọn ngày tốt nhất.
            </p>
          </div>

          <div className="filter-month-stepper">
            <button
              type="button"
              className="stepper-nav-btn prev"
              onClick={handlePrevMonth}
            >
              ‹
            </button>
            <span className="stepper-month-label">
              Tháng {filterMonth} / {filterYear}
            </span>
            <button
              type="button"
              className="stepper-nav-btn next"
              onClick={handleNextMonth}
            >
              ›
            </button>
          </div>
        </div>

        {/* Danh sách nút chọn mục đích */}
        <div className="purpose-chips-container">
          {PURPOSES.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`purpose-chip ${selectedPurpose === p.id ? 'active' : ''}`}
              onClick={() => setSelectedPurpose(p.id)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Danh sách các ngày phù hợp */}
      <div className="good-days-results-grid">
        {goodDays.length === 0 ? (
          <div className="good-days-empty">
            Không tìm thấy ngày nào phù hợp trong tháng này.
          </div>
        ) : (
          goodDays.map(({ day, finalScore, reasons, goodHours }) => {
            const { solar, lunar, canChi, hoangDao, truc, tu, lucDieu } = day;

            return (
              <div
                key={solar.dateStr}
                className="good-day-card"
                onClick={() => onSelectDayAndSwitch(solar.day, solar.month, solar.year)}
              >
                <div className="gday-card-header">
                  <div className="gday-date-group">
                    <span className="gday-solar-date">
                      {solar.weekdayName}, {solar.dateStr}
                    </span>
                    <span className="gday-lunar-date">
                      Âm lịch: {lunar.shortDateStr} ({canChi.day.fullName})
                    </span>
                  </div>

                  <div className="gday-score-pill">
                    <span className="score-num">{finalScore}</span>
                    <span className="score-max">/10</span>
                  </div>
                </div>

                <div className="gday-metas">
                  <span className={`gday-tag ${hoangDao.isHoangDao ? 'tag-hd' : 'tag-bad'}`}>
                    {hoangDao.badgeText}
                  </span>
                  {lucDieu && (
                    <span className="gday-tag tag-lucdieu">
                      {lucDieu.fullName}
                    </span>
                  )}
                  <span className="gday-tag tag-truc">
                    {truc.fullName}
                  </span>
                  <span className="gday-tag tag-tu">
                    Sao {tu.fullName}
                  </span>
                </div>

                {/* Các lý do cát lợi */}
                <div className="gday-reasons">
                  <strong>Điểm sáng trong ngày:</strong>
                  <ul>
                    {reasons.slice(0, 3).map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                {/* Giờ Hoàng Đạo gợi ý */}
                <div className="gday-good-hours">
                  <span className="ghours-label">Giờ tốt:</span>
                  <div className="ghours-chips">
                    {goodHours.map((h) => (
                      <span key={h.timeRange} className="ghour-chip">
                        {h.chi} ({h.timeRange.split(' - ')[0]})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="gday-action-hint">
                  Nhấn để xem chi tiết lốc lịch ngày này ›
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default React.memo(GoodDayFilterView);
