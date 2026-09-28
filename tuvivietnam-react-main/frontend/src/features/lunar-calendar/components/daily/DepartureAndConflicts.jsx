import React from 'react';

/**
 * HƯỚNG XUẤT HÀNH & TUỔI XUNG KHẮC
 */
function DepartureAndConflicts({ departures, conflicts }) {
  if (!departures || !conflicts) return null;

  return (
    <div className="lvs-departure-conflicts-card">
      <div className="dep-con-grid">
        {/* Hướng xuất hành */}
        <div className="dep-side-col">
          <div className="dep-header">
            <h4>HƯỚNG XUẤT HÀNH</h4>
          </div>

          <div className="dep-directions-list">
            <div className="dir-row">
              <span className="dir-label text-hy">Hỷ Thần:</span>
              <strong className="dir-value">{departures.hyThan}</strong>
              <span className="dir-hint">(Cầu may mắn, hỷ sự)</span>
            </div>
            <div className="dir-row">
              <span className="dir-label text-tai">Tài Thần:</span>
              <strong className="dir-value">{departures.taiThan}</strong>
              <span className="dir-hint">(Cầu tài lộc, kinh doanh)</span>
            </div>
            <div className="dir-row dir-warning">
              <span className="dir-label text-hac">Hạc Thần:</span>
              <strong className="dir-value">{departures.hacThan}</strong>
              <span className="dir-hint">(Nên tránh)</span>
            </div>
          </div>
        </div>

        <div className="dep-divider" />

        {/* Tuổi xung khắc */}
        <div className="con-side-col">
          <div className="dep-header">
            <h4>TUỔI XUNG NGÀY</h4>
          </div>

          <p className="conflict-warning-text">{conflicts.warning}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DepartureAndConflicts);
