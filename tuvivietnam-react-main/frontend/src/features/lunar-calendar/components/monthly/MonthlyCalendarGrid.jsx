import React from 'react';
import { SHORT_WEEKDAYS } from '../../core/index.js';

/**
 * LƯỚI LỊCH THÁNG TOÀN CẢNH (MONTHLY CALENDAR GRID)
 */
function MonthlyCalendarGrid({
  monthData,
  selectedDay,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
  onGoToday,
  today,
}) {
  if (!monthData) return null;

  const { month, year, days } = monthData;

  return (
    <div className="lvs-monthly-grid-card">
      {/* Header Lịch Tháng */}
      <div className="monthly-grid-header">
        <div className="month-selector-title">
          <h2>
            THÁNG {month} NĂM {year}
          </h2>
        </div>

        <div className="monthly-nav-controls">
          <button
            type="button"
            className="monthly-btn prev"
            onClick={onPrevMonth}
            title="Tháng trước"
          >
            ‹ Tháng trước
          </button>
          <button
            type="button"
            className="monthly-btn today"
            onClick={onGoToday}
            title="Về tháng hiện tại"
          >
            Hôm nay
          </button>
          <button
            type="button"
            className="monthly-btn next"
            onClick={onNextMonth}
            title="Tháng sau"
          >
            Tháng sau ›
          </button>
        </div>
      </div>

      {/* Tiêu đề các thứ trong tuần */}
      <div className="monthly-weekdays-bar">
        {SHORT_WEEKDAYS.map((w, idx) => (
          <div
            key={w}
            className={`month-weekday-head ${idx === 0 || idx === 6 ? 'weekend' : ''}`}
          >
            {w}
          </div>
        ))}
      </div>

      {/* Lưới các ngày trong tháng */}
      <div className="monthly-cells-container">
        {days.map((item, idx) => {
          if (!item) {
            return <div key={`empty-${idx}`} className="month-day-cell empty-cell" />;
          }

          const { solar, lunar, canChi, hoangDao, score, ratingBadgeClass, holiday } = item;

          const isSelected =
            selectedDay.day === solar.day &&
            selectedDay.month === solar.month &&
            selectedDay.year === solar.year;

          const isTodayCell =
            month === today.month &&
            year === today.year &&
            solar.day === today.day &&
            solar.month === today.month &&
            solar.year === today.year;

          const isWeekend = solar.dayOfWeek === 0 || solar.dayOfWeek === 6;

          return (
            <div
              key={`cell-${year}-${month}-${solar.day}`}
              className={`month-day-cell ${isSelected ? 'cell-selected' : ''} ${
                isTodayCell ? 'cell-today' : ''
              } ${isWeekend ? 'cell-weekend' : ''}`}
              onClick={() => onSelectDay(solar.day, solar.month, solar.year)}
            >
              {/* Hàng trên: Số Dương Lịch (Góc trái) + Chỉ báo Hoàng Đạo (Góc phải) */}
              <div className="cell-top-row">
                <div className="cell-solar-group">
                  <span className="cell-solar-num">{solar.day}</span>
                  {holiday && (
                    <span className="cell-holiday-indicator" title={holiday} />
                  )}
                </div>
                {hoangDao.isHoangDao && (
                  <span className="cell-hd-badge" title="Ngày Hoàng Đạo">
                    HĐ
                  </span>
                )}
              </div>

              {/* Giữa ô: Can Chi Ngày (Desktop) */}
              <div className="cell-canchi-text">{canChi.day.fullName}</div>

              {/* Hàng dưới: DUY NHẤT Số Ngày Âm Lịch ở góc phải */}
              <div className="cell-bottom-row">
                <span
                  className={`cell-lunar-num ${
                    lunar.day === 1 || lunar.day === 15 ? 'is-special-lunar' : ''
                  }`}
                  title={`Âm lịch: Ngày ${lunar.day} tháng ${lunar.month}${lunar.isLeap ? ' (Nhuận)' : ''}`}
                >
                  {lunar.day === 1 ? `${lunar.day}/${lunar.month}` : lunar.day}
                  {lunar.isLeap ? 'N' : ''}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(MonthlyCalendarGrid);
