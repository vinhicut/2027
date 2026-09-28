import React from 'react';

/**
 * THÔNG TIN THẦN SÁT, TRỰC, TÚ, LỤC DIỆU & VIỆC NÊN/KỴ
 */
function DayDeitiesAndStars({ dayData }) {
  if (!dayData) return null;

  const {
    truc,
    tu,
    lucDieu,
    badDays,
    stars,
    tasks,
  } = dayData;

  return (
    <div className="lvs-deities-stars-panel">
      {/* 1. KHỐI VIỆC NÊN LÀM & KIÊNG CỮ */}
      <div className="deity-section-box tasks-box">
        <h4 className="box-title">
          Việc Nên Làm & Kiêng Cữ Trong Ngày
        </h4>

        <div className="tasks-dual-columns">
          {/* Cột Việc Nên Làm */}
          <div className="task-col good-tasks">
            <span className="task-header-label label-good">VIỆC NÊN LÀM (NGHI)</span>
            <div className="task-tags-cloud">
              {tasks.recommended && tasks.recommended.length > 0 ? (
                tasks.recommended.map((task) => (
                  <span key={task} className="task-tag tag-good">
                    {task}
                  </span>
                ))
              ) : (
                <span className="task-empty-note">Nên làm việc thường nhật, giữ tâm an ổn</span>
              )}
            </div>
          </div>

          {/* Cột Việc Kiêng Cữ */}
          <div className="task-col bad-tasks">
            <span className="task-header-label label-bad">NÊN KIÊNG CỮ (KỴ)</span>
            <div className="task-tags-cloud">
              {tasks.avoid && tasks.avoid.length > 0 ? (
                tasks.avoid.map((task) => (
                  <span key={task} className="task-tag tag-bad">
                    {task}
                  </span>
                ))
              ) : (
                <span className="task-empty-note">Không có việc đại kỵ nổi bật</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. KHỔNG MINH LỤC DIỆU (Quyết định 2: Chấp thuận) */}
      {lucDieu && (
        <div className="deity-section-box lucdieu-box">
          <div className="box-header-row">
            <h4 className="box-title">
              Khổng Minh Lục Diệu
            </h4>
            <span className={`status-pill ${lucDieu.type === 'Cát' ? 'pill-good' : lucDieu.type === 'Hung' ? 'pill-bad' : 'pill-mid'}`}>
              {lucDieu.name} ({lucDieu.rating})
            </span>
          </div>

          <div className="lucdieu-content">
            <p className="lucdieu-desc">{lucDieu.desc}</p>
            {lucDieu.poem && (
              <blockquote className="lucdieu-poem">
                {lucDieu.poem}
              </blockquote>
            )}
          </div>
        </div>
      )}

      {/* 3. THẬP NHỊ TRỰC & NHỊ THẬP BÁT TÚ */}
      <div className="deity-section-box kientru-nhi-thap-box">
        <div className="tructu-dual-grid">
          {/* Thập Nhị Trực */}
          <div className="tructu-col truc-side">
            <div className="tructu-header">
              <span className="tructu-kicker">THẬP NHỊ KIẾN TRỪ</span>
              <div className="tructu-main-title">
                {truc.fullName}
                <span className={`tructu-badge ${truc.type === 'Cát' ? 'badge-cat' : truc.type === 'Hung' ? 'badge-hung' : 'badge-binh'}`}>
                  {truc.rating}
                </span>
              </div>
            </div>
            <p className="tructu-desc">{truc.desc}</p>
          </div>

          {/* Nhị Thập Bát Tú */}
          <div className="tructu-col tu-side">
            <div className="tructu-header">
              <span className="tructu-kicker">NHỊ THẬP BÁT TÚ</span>
              <div className="tructu-main-title">
                Sao {tu.fullName}
                <span className={`tructu-badge ${tu.isGood ? 'badge-cat' : 'badge-hung'}`}>
                  {tu.rating}
                </span>
              </div>
            </div>
            <div className="tu-meta-tags">
              <span className="tu-tag">Phương: {tu.direction}</span>
              <span className="tu-tag">Linh thú: {tu.animal}</span>
              <span className="tu-tag">Hành: {tu.element}</span>
            </div>
            <blockquote className="tu-poem-quote">
              {tu.poem}
            </blockquote>
          </div>
        </div>
      </div>

      {/* 4. SAO CÁT (CÁT TINH) & SAO HUNG (HUNG TINH) */}
      <div className="deity-section-box stars-breakdown-box">
        <h4 className="box-title">
          Hệ Thống Thần Sát (Cát Tinh & Hung Tinh)
        </h4>

        <div className="stars-dual-list">
          {/* Cát Tinh */}
          <div className="stars-list-col good-stars-list">
            <span className="stars-list-title text-good">CÁT TINH CHIẾU</span>
            <div className="stars-items">
              {stars.goodStars && stars.goodStars.length > 0 ? (
                stars.goodStars.map((s) => (
                  <div key={s.name} className="star-card good-card">
                    <strong className="star-name">{s.name}</strong>
                    <span className="star-desc">{s.desc}</span>
                  </div>
                ))
              ) : (
                <div className="star-empty-note">Không có cát tinh đặc biệt</div>
              )}
            </div>
          </div>

          {/* Hung Tinh */}
          <div className="stars-list-col bad-stars-list">
            <span className="stars-list-title text-bad">HUNG TINH & BÁCH KỴ</span>
            <div className="stars-items">
              {/* Ngày Kỵ Dân Gian */}
              {badDays && badDays.length > 0 && (
                badDays.map((b) => (
                  <div key={b.name} className="star-card bad-card danger-card">
                    <div className="star-head">
                      <strong className="star-name">{b.name}</strong>
                      <span className="star-danger-badge">{b.level}</span>
                    </div>
                    <span className="star-desc">{b.desc}</span>
                  </div>
                ))
              )}

              {/* Các Hung Tinh khác */}
              {stars.badStars && stars.badStars.length > 0 ? (
                stars.badStars.map((s) => (
                  <div key={s.name} className="star-card bad-card">
                    <strong className="star-name">{s.name}</strong>
                    <span className="star-desc">{s.desc}</span>
                  </div>
                ))
              ) : null}

              {(!badDays || badDays.length === 0) && (!stars.badStars || stars.badStars.length === 0) && (
                <div className="star-empty-note">Ngày thanh bình, không phạm hung thần</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DayDeitiesAndStars);
