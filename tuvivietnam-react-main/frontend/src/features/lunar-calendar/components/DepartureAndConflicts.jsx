import React from 'react';

/**
 * COMPONENT: HƯỚNG XUẤT HÀNH & TUỔI XUNG KHẮC
 * Đặt ở cột trái để cân bằng chiều cao với cột phải.
 */
function DepartureAndConflicts({ departures, conflicts }) {
  if (!departures || !conflicts) return null;

  return (
    <div className="lvs-card departure-conflicts-card">
      <div className="lvs-card-header">
        <div className="lvs-header-title">
          <h3>Hướng Xuất Hành & Tuổi Xung Khắc</h3>
        </div>
      </div>

      <div className="dep-conf-body">
        {/* Hướng xuất hành */}
        <div className="dep-section">
          <div className="dep-section-title">HƯỚNG XUẤT HÀNH</div>
          <div className="dep-rows-list">
            <div className="dep-item">
              <span className="dep-label">Hỷ Thần (May mắn, cưới hỏi):</span>
              <span className="dep-val gold">{departures.hyThan}</span>
            </div>
            <div className="dep-item">
              <span className="dep-label">Tài Thần (Tài lộc, làm ăn):</span>
              <span className="dep-val gold">{departures.taiThan}</span>
            </div>
            <div className="dep-item">
              <span className="dep-label">Hạc Thần (Hướng kỵ cần tránh):</span>
              <span className="dep-val danger">{departures.hacThan}</span>
            </div>
          </div>
          <p className="dep-advice-text">{departures.advice}</p>
        </div>

        <div className="dep-conf-divider" />

        {/* Tuổi xung khắc */}
        <div className="conf-section">
          <div className="dep-section-title">TUỔI XUNG KHẮC VỚI NGÀY</div>
          <div className="conflict-badge-wrap">
            {conflicts.conflictingAges.map((age, idx) => (
              <span key={idx} className="conflict-chip">
                {age}
              </span>
            ))}
          </div>
          <p className="conflict-advice-text">{conflicts.warning}</p>
        </div>
      </div>
    </div>
  );
}

export default DepartureAndConflicts;
