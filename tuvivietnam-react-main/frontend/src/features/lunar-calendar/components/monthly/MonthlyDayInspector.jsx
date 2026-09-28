import React from 'react';

/**
 * BẢNG XEM NHANH CHI TIẾT NGÀY TRONG THÁNG (MONTHLY DAY INSPECTOR)
 */
function MonthlyDayInspector({ dayAlmanac, onSwitchToDaily }) {
  if (!dayAlmanac) return null;

  const {
    solar,
    lunar,
    canChi,
    solarTerm,
    hoangDao,
    lucDieu,
    truc,
    tu,
    score,
    ratingLabel,
    ratingBadgeClass,
    tasks,
  } = dayAlmanac;

  return (
    <aside className="monthly-day-inspector">
      <div className="inspector-card">
        <div className="inspector-header">
          <h3>Chi Tiết Ngày Đang Chọn</h3>
          <button
            type="button"
            className="jump-daily-btn text-nav"
            onClick={onSwitchToDaily}
          >
            Xem lốc lịch chi tiết ›
          </button>
        </div>

        <div className="inspector-body">
          <div className="insp-solar-head">
            <span className="insp-solar-day">{solar.day}</span>
            <div className="insp-solar-info">
              <strong>{solar.weekdayName}</strong>
              <div>
                Tháng {solar.month}/{solar.year}
              </div>
              <span className={`insp-score-pill ${ratingBadgeClass}`}>
                {ratingLabel} ({score}/10)
              </span>
            </div>
          </div>

          <div className="insp-lunar-section">
            <div className="insp-row">
              <span className="insp-lbl">Âm lịch:</span>
              <span className="insp-val highlight">{lunar.dateStr}</span>
            </div>
            <div className="insp-row">
              <span className="insp-lbl">Can Chi Ngày:</span>
              <span className="insp-val">
                {canChi.day.fullName} ({canChi.day.napAm})
              </span>
            </div>
            <div className="insp-row">
              <span className="insp-lbl">Tháng Âm Lịch:</span>
              <span className="insp-val">
                {canChi.month.fullName} ({canChi.month.napAm})
              </span>
            </div>
            {canChi.solarTermMonth && (
              <div className="insp-row">
                <span className="insp-lbl">Tháng Tiết Khí:</span>
                <span className="insp-val text-accent">
                  {canChi.solarTermMonth.fullName} (từ {canChi.solarTermMonth.termName})
                </span>
              </div>
            )}
            <div className="insp-row">
              <span className="insp-lbl">Tiết Khí:</span>
              <span className="insp-val">{solarTerm.name}</span>
            </div>
          </div>

          <div className="insp-stars-brief">
            <div className="insp-row">
              <span className="insp-lbl">Hoàng Đạo:</span>
              <span
                className={`insp-val ${
                  hoangDao.isHoangDao ? 'text-good' : 'text-bad'
                }`}
              >
                {hoangDao.badgeText}
              </span>
            </div>
            {lucDieu && (
              <div className="insp-row">
                <span className="insp-lbl">Lục Diệu:</span>
                <span className="insp-val">{lucDieu.fullName} ({lucDieu.rating})</span>
              </div>
            )}
            <div className="insp-row">
              <span className="insp-lbl">Thập Nhị Trực:</span>
              <span className="insp-val">
                {truc.fullName} ({truc.rating})
              </span>
            </div>
            <div className="insp-row">
              <span className="insp-lbl">Nhị Thập Bát Tú:</span>
              <span className="insp-val">
                Sao {tu.fullName} ({tu.rating})
              </span>
            </div>
          </div>

          {/* Việc Nên / Kỵ Tóm Tắt */}
          <div className="insp-tasks-brief">
            <div className="insp-task-sec">
              <strong className="text-good">Nên làm:</strong>
              <div className="mini-task-tags">
                {tasks.recommended && tasks.recommended.length > 0 ? (
                  tasks.recommended.slice(0, 4).map((t) => (
                    <span key={t} className="m-task-tag tag-good">
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-muted">Việc thường nhật</span>
                )}
              </div>
            </div>

            <div className="insp-task-sec">
              <strong className="text-bad">Kiêng cữ:</strong>
              <div className="mini-task-tags">
                {tasks.avoid && tasks.avoid.length > 0 ? (
                  tasks.avoid.slice(0, 4).map((t) => (
                    <span key={t} className="m-task-tag tag-bad">
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-muted">Không có việc đại kỵ</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default React.memo(MonthlyDayInspector);
