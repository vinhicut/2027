import React, { useMemo } from 'react';
import { SHORT_WEEKDAYS, convertSolar2Lunar } from '../engine';

/**
 * COMPONENT: LỊCH THÁNG MINI (MINI MONTH CALENDAR)
 * Đặt ở cột trái dưới thẻ ngày để lấp đầy khoảng trống và hỗ trợ chọn ngày nhanh.
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
  const daysInMonth = useMemo(() => {
    return new Date(viewYear, viewMonth, 0).getDate();
  }, [viewYear, viewMonth]);

  const firstWeekday = useMemo(() => {
    return new Date(viewYear, viewMonth - 1, 1).getDay(); // 0: CN
  }, [viewYear, viewMonth]);

  const cells = useMemo(() => {
    const list = [];
    for (let i = 0; i < firstWeekday; i++) {
      list.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const [ld, lm] = convertSolar2Lunar(d, viewMonth, viewYear, 7);
      list.push({
        solarDay: d,
        lunarDay: ld,
        lunarMonth: lm,
        isToday:
          today &&
          d === today.day &&
          viewMonth === today.month &&
          viewYear === today.year,
        isSelected:
          selectedDay &&
          d === selectedDay.day &&
          viewMonth === selectedDay.month &&
          viewYear === selectedDay.year,
      });
    }
    return list;
  }, [daysInMonth, firstWeekday, viewMonth, viewYear, today, selectedDay]);

  return (
    <div className="lvs-card mini-calendar-card">
      <div className="mini-cal-header">
        <span className="mini-cal-title">LỊCH THÁNG {viewMonth}/{viewYear}</span>
        <div className="mini-nav-btns">
          <button
            type="button"
            className="mini-nav-btn"
            onClick={onPrevMonth}
            title="Tháng trước"
          >
            Trước
          </button>
          <button
            type="button"
            className="mini-nav-btn"
            onClick={onNextMonth}
            title="Tháng sau"
          >
            Sau
          </button>
        </div>
      </div>

      <div className="mini-weekdays-row">
        {SHORT_WEEKDAYS.map((w, idx) => (
          <div
            key={w}
            className={`mini-wd-cell ${idx === 0 || idx === 6 ? 'is-weekend' : ''}`}
          >
            {w}
          </div>
        ))}
      </div>

      <div className="mini-days-grid">
        {cells.map((cell, idx) => {
          if (!cell) {
            return <div key={`empty-${idx}`} className="mini-day-cell empty" />;
          }

          return (
            <button
              type="button"
              key={`day-${cell.solarDay}`}
              className={[
                'mini-day-cell',
                cell.isSelected ? 'is-selected' : '',
                cell.isToday ? 'is-today' : '',
              ].join(' ')}
              onClick={() => onSelectDay(cell.solarDay, viewMonth, viewYear)}
            >
              <span className="mini-solar-num">{cell.solarDay}</span>
              <span className="mini-lunar-num">{cell.lunarDay === 1 ? `${cell.lunarDay}/${cell.lunarMonth}` : cell.lunarDay}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MiniMonthCalendar;
