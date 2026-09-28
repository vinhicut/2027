import React from 'react';
import { SHORT_WEEKDAYS } from '../../core/index.js';

/**
 * LỊCH THÁNG THU NHỎ (MINI MONTH CALENDAR)
 */
function MiniMonthCalendar({
  viewMonth,
  viewYear,
  selectedDay,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
  today,
}) {
  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();
  const firstDayWeekday = new Date(viewYear, viewMonth - 1, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  return (
    <div className="lvs-mini-month-card">
      <div className="mini-month-header">
        <button
          type="button"
          className="mini-nav-btn prev"
          onClick={onPrevMonth}
          title="Tháng trước"
        >
          ‹
        </button>
        <span className="mini-month-title">
          Tháng {viewMonth} / {viewYear}
        </span>
        <button
          type="button"
          className="mini-nav-btn next"
          onClick={onNextMonth}
          title="Tháng sau"
        >
          ›
        </button>
      </div>

      <div className="mini-weekdays-grid">
        {SHORT_WEEKDAYS.map((w) => (
          <span key={w} className="mini-weekday-col">
            {w}
          </span>
        ))}
      </div>

      <div className="mini-days-grid">
        {calendarDays.map((d, idx) => {
          if (!d) {
            return <div key={`empty-${idx}`} className="mini-day-cell empty" />;
          }

          const isSelected =
            selectedDay.day === d &&
            selectedDay.month === viewMonth &&
            selectedDay.year === viewYear;

          const isCurrentToday =
            viewMonth === today.month &&
            viewYear === today.year &&
            d === today.day;

          return (
            <button
              key={`mini-day-${viewYear}-${viewMonth}-${d}`}
              type="button"
              className={`mini-day-cell ${isSelected ? 'is-selected' : ''} ${
                isCurrentToday ? 'is-today' : ''
              }`}
              onClick={() => onSelectDay(d, viewMonth, viewYear)}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(MiniMonthCalendar);
