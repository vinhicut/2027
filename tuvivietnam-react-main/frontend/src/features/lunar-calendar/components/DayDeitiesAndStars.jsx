import React from 'react';

/**
 * COMPONENT: CHI TIẾT TRỰC, TÚ, VIỆC NÊN/KIÊNG & SAO CÁT/HUNG (REFINED UX/UI)
 */
function DayDeitiesAndStars({ dayData }) {
  if (!dayData) return null;

  const {
    truc,
    tu,
    tasks,
    stars,
    badDays,
  } = dayData;

  return (
    <div className="lvs-deities-container">
      {/* KHỐI 1: VIỆC NÊN LÀM & VIỆC KIÊNG KỴ (CHIP/TAG STYLE & GENEROUS SPACING) */}
      <div className="lvs-card tasks-card">
        <div className="lvs-card-header">
          <div className="lvs-header-title">
            <h3>Việc Cát Nên Làm & Việc Hung Cần Tránh</h3>
          </div>
        </div>

        <div className="tasks-columns">
          {/* Cột Nên Làm */}
          <div className="task-col good-col">
            <div className="col-title">
              <h4>NÊN LÀM (CÁT SỰ)</h4>
            </div>
            {tasks.recommended && tasks.recommended.length > 0 ? (
              <div className="task-chips-wrap">
                {tasks.recommended.map((item, idx) => (
                  <span key={idx} className="task-chip good">
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <p className="task-empty">Nên cẩn trọng, chỉ nên làm các việc thường nhật.</p>
            )}
          </div>

          {/* Cột Kiêng Kỵ */}
          <div className="task-col bad-col">
            <div className="col-title">
              <h4>KIÊNG KỴ (HUNG SỰ)</h4>
            </div>
            {tasks.avoid && tasks.avoid.length > 0 ? (
              <div className="task-chips-wrap">
                {tasks.avoid.map((item, idx) => (
                  <span key={idx} className="task-chip bad">
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <p className="task-empty">Không có việc đại kỵ nổi bật.</p>
            )}
          </div>
        </div>

        {/* Cảnh báo Ngày kỵ dân gian nếu có */}
        {badDays && badDays.length > 0 && (
          <div className="folk-bad-days-box">
            <div className="bad-days-title">NGÀY KỴ DÂN GIAN</div>
            <div className="bad-days-tags">
              {badDays.map((b, idx) => (
                <div key={idx} className="bad-tag">
                  <strong>{b.name}</strong>: {b.desc}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* KHỐI 2: THẬP NHỊ TRỰC & NHỊ THẬP BÁT TÚ (EQUAL HEIGHT CARDS) */}
      <div className="lvs-two-cards-row equal-height-row">
        {/* Card Trực */}
        <div className="lvs-card half-card equal-card">
          <div className="lvs-card-header">
            <div className="lvs-header-title">
              <h3>Thập Nhị Kiến Trừ</h3>
            </div>
            <span className={`tag-badge ${truc.type === 'Cát' ? 'tag-gold' : 'tag-gray'}`}>
              {truc.rating}
            </span>
          </div>

          <div className="truc-content">
            <div className="truc-name-highlight">{truc.fullName}</div>
            <p className="truc-desc">{truc.desc}</p>
          </div>
        </div>

        {/* Card Tú */}
        <div className="lvs-card half-card equal-card">
          <div className="lvs-card-header">
            <div className="lvs-header-title">
              <h3>Nhị Thập Bát Tú (28 Sao)</h3>
            </div>
            <span className={`tag-badge ${tu.isGood ? 'tag-gold' : 'tag-danger'}`}>
              {tu.rating}
            </span>
          </div>

          <div className="tu-content">
            <div className="tu-name-highlight">
              Sao {tu.fullName} ({tu.direction})
            </div>
            <blockquote className="tu-poem">
              "{tu.poem}"
            </blockquote>
          </div>
        </div>
      </div>

      {/* KHỐI 3: SAO CÁT & SAO HUNG CHIẾU TRONG NGÀY (BALANCED SYMMETRICAL TABLE) */}
      <div className="lvs-card stars-card">
        <div className="lvs-card-header">
          <div className="lvs-header-title">
            <h3>Sao Cát & Sao Hung Chiếu Trong Ngày</h3>
          </div>
        </div>

        <div className="stars-balanced-grid">
          <div className="stars-balanced-col good-side">
            <div className="stars-sub-title">CÁT TINH (SAO TỐT)</div>
            <div className="stars-chips-flow">
              {stars.goodStars.map((s, idx) => (
                <div key={idx} className="star-card-item good">
                  <span className="s-name">{s.name}</span>
                  <span className="s-desc">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="stars-balanced-col bad-side">
            <div className="stars-sub-title">HUNG TINH (SAO XẤU)</div>
            <div className="stars-chips-flow">
              {stars.badStars.length > 0 ? (
                stars.badStars.map((s, idx) => (
                  <div key={idx} className="star-card-item bad">
                    <span className="s-name">{s.name}</span>
                    <span className="s-desc">{s.desc}</span>
                  </div>
                ))
              ) : (
                <div className="star-card-item neutral">
                  <span className="s-name">Bình An</span>
                  <span className="s-desc">Không có hung tinh xấu chiếu mạng hôm nay</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DayDeitiesAndStars;
