import React from 'react';
import { SHORT_WEEKDAYS } from '../engine';

/**
 * COMPONENT: LƯỚI LỊCH THÁNG PHONG THỦY (TEXT-ONLY & CLEAN MINIMALIST)
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
    <div className="lvs-card lvs-monthly-card">
      {/* Month Toolbar */}
      <div className="lvs-month-toolbar">
        <div className="month-nav-left">
          <button
            type="button"
            className="cal-nav-btn text-nav"
            onClick={onPrevMonth}
            title="Tháng trước"
          >
            Trước
          </button>
          <div className="cal-current-month-label">
            Tháng {month} / {year}
          </div>
          <button
            type="button"
            className="cal-nav-btn text-nav"
            onClick={onNextMonth}
            title="Tháng sau"
          >
            Sau
          </button>
        </div>

        <button
          type="button"
          className="cal-today-btn"
          onClick={onGoToday}
        >
          Hôm nay
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="lvs-weekdays-grid">
        {SHORT_WEEKDAYS.map((w, idx) => (
          <div
            key={w}
            className={`lvs-weekday-cell ${idx === 0 || idx === 6 ? 'is-weekend' : ''}`}
          >
            {w}
          </div>
        ))}
      </div>

      {/* Days Matrix */}
      <div className="lvs-month-days-grid">
        {days.map((dayData, idx) => {
          if (!dayData) {
            return <div key={`empty-${idx}`} className="lvs-day-cell empty" />;
          }

          const { solar, lunar, hoangDao, badDays } = dayData;
          const isSelected =
            selectedDay &&
            selectedDay.day === solar.day &&
            selectedDay.month === solar.month &&
            selectedDay.year === solar.year;

          const isCurrentToday =
            today &&
            today.day === solar.day &&
            today.month === solar.month &&
            today.year === solar.year;

          const isMungMot = lunar.day === 1;
          const isRam = lunar.day === 15;
          const hasBadFolkDay = badDays && badDays.length > 0;

          return (
            <button
              type="button"
              key={`day-${solar.day}`}
              className={[
                'lvs-day-cell',
                isSelected ? 'is-selected' : '',
                isCurrentToday ? 'is-today' : '',
                isMungMot ? 'is-m1' : '',
                isRam ? 'is-ram' : '',
                hoangDao.isHoangDao ? 'has-hoang-dao' : 'has-hac-dao',
              ].join(' ')}
              onClick={() => onSelectDay(solar.day, solar.month, solar.year)}
            >
              {/* Chỉ báo trạng thái góc trên */}
              <div className="cell-top-indicator">
                <span
                  className={`dot-indicator ${
                    hoangDao.isHoangDao ? 'dot-gold' : 'dot-gray'
                  }`}
                  title={hoangDao.badgeText}
                />
                {hasBadFolkDay && (
                  <span className="dot-warning-text" title="Ngày kỵ dân gian">
                    Kỵ
                  </span>
                )}
              </div>

              {/* Số ngày Dương */}
              <div className="cell-solar-num">{solar.day}</div>

              {/* Số ngày Âm */}
              <div className="cell-lunar-num">
                {isMungMot
                  ? `${lunar.day}/${lunar.month}${lunar.isLeap ? 'N' : ''}`
                  : isRam
                  ? '15 (Rằm)'
                  : lunar.day}
              </div>
            </button>
          );
        })}
      </div>

      {/* Chú giải phong thủy dưới lưới */}
      <div className="lvs-calendar-legend">
        <div className="legend-item">
          <span className="legend-dot dot-gold" />
          <span>Ngày Hoàng Đạo</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot dot-gray" />
          <span>Ngày Hắc Đạo</span>
        </div>
        <div className="legend-item">
          <span className="legend-box box-m1" />
          <span>Mùng 1 & Rằm</span>
        </div>
        <div className="legend-item">
          <span className="legend-text-badge">Kỵ</span>
          <span>Tam Nương / Nguyệt Kỵ</span>
        </div>
      </div>
    </div>
  );
}

export default MonthlyCalendarGrid;
