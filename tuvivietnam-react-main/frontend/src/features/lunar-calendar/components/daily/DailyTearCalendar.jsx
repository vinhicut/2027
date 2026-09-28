import React from 'react';

/**
 * COMPONENT: LỐC LỊCH XÉ TRUYỀN THỐNG (MINIMALIST & REFINED ORIENTAL STYLE)
 */
function DailyTearCalendar({
  dayData,
  onPrevDay,
  onNextDay,
  onGoToday,
  isToday,
}) {
  if (!dayData) return null;

  const {
    solar,
    lunar,
    canChi,
    solarTerm,
    hoangDao,
    score,
    ratingLabel,
    ratingBadgeClass,
    holiday,
  } = dayData;

  const isWeekend = solar.dayOfWeek === 0 || solar.dayOfWeek === 6;

  return (
    <div className="lvs-tear-calendar-card">
      {/* Header lốc lịch */}
      <div className="tear-cal-header">
        <button
          type="button"
          className="tear-nav-btn prev"
          onClick={onPrevDay}
          title="Xem ngày hôm trước"
        >
          Hôm trước
        </button>

        <div className="tear-header-center">
          <div className="tear-weekday-text">
            {solar.weekdayName.toUpperCase()}
          </div>
          <div className="tear-month-year-text">
            Tháng {solar.month} Năm {solar.year}
          </div>
        </div>

        <button
          type="button"
          className="tear-nav-btn next"
          onClick={onNextDay}
          title="Xem ngày tiếp theo"
        >
          Hôm sau
        </button>
      </div>

      {/* Thân lốc lịch */}
      <div className="tear-cal-body">
        {/* Dịp lễ nếu có */}
        {holiday && (
          <div className="tear-holiday-banner">
            {holiday}
          </div>
        )}

        {/* Số ngày Dương Lịch cực lớn */}
        <div className={`tear-solar-day ${isWeekend ? 'is-weekend' : ''}`}>
          {solar.day}
        </div>

        {/* Thanh thông tin đánh giá & tiết khí đồng nhất */}
        <div className="tear-unified-info-strip">
          <span
            className={`strip-pill ${
              hoangDao.isHoangDao ? 'is-hoang-dao' : 'is-hac-dao'
            }`}
          >
            {hoangDao.badgeText}
          </span>
          <span className={`strip-pill ${ratingBadgeClass}`}>
            {ratingLabel} ({score}/10)
          </span>
          <span className="strip-pill term-pill">
            Tiết {solarTerm.name}
          </span>
        </div>

        {/* Khối Âm Lịch Liền Mạch */}
        <div className="tear-lunar-streamlined">
          <div className="lunar-left-block">
            <span className="lunar-kicker">ÂM LỊCH</span>
            <div className="lunar-main-day">
              {lunar.day === 1 ? 'Mùng 1' : `Ngày ${lunar.day}`}
            </div>
            <div className="lunar-sub-month">
              Tháng {lunar.month} {lunar.isLeap ? '(Nhuận)' : ''}
            </div>
          </div>

          <div className="lunar-vertical-line" />

          <div className="lunar-right-block">
            <div className="canchi-aligned-row">
              <span className="canchi-label">Năm</span>
              <span className="canchi-value">{canChi.year.fullName}</span>
              <span className="canchi-napam">({canChi.year.napAm})</span>
            </div>
            <div className="canchi-aligned-row">
              <span className="canchi-label">Tháng</span>
              <span className="canchi-value">{canChi.month.fullName}</span>
              <span className="canchi-napam">({canChi.month.napAm})</span>
            </div>
            {/* Phân định Tháng Tiết Khí Bát Tự (Quyết định 1: Lựa chọn A) */}
            {canChi.solarTermMonth && (
              <div className="canchi-aligned-row b系統-row" title="Tháng Tiết Khí khởi theo chu kỳ 24 Tiết Khí (chuẩn môn Bát Tự / Tử Bình)">
                <span className="canchi-label">Tiết khí</span>
                <span className="canchi-value text-accent">{canChi.solarTermMonth.fullName}</span>
                <span className="canchi-napam">(từ tiết {canChi.solarTermMonth.termName})</span>
              </div>
            )}
            <div className="canchi-aligned-row">
              <span className="canchi-label">Ngày</span>
              <span className="canchi-value highlight">{canChi.day.fullName}</span>
              <span className="canchi-napam">({canChi.day.napAm})</span>
            </div>
          </div>
        </div>

        {/* Nút trở về Hôm nay nếu đang xem ngày khác */}
        {!isToday && (
          <div className="tear-actions-bar">
            <button
              type="button"
              className="tear-today-action-btn"
              onClick={onGoToday}
            >
              Quay lại hôm nay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(DailyTearCalendar);
