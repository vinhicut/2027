import React, { useState } from 'react';
import {
  convertSolar2Lunar,
  convertLunar2Solar,
  getFullDayAlmanac,
} from '../engine';
import { LUNAR_HOLIDAYS, SOLAR_HOLIDAYS } from '../engine/vietnameseHolidays';

/**
 * COMPONENT: MODAL ĐỔI NGÀY ÂM - DƯƠNG 2 CHIỀU & TRA CỨU LỄ TẾT
 */
function DateConverterModal({ isOpen, onClose, onSelectDate }) {
  const [activeTab, setActiveTab] = useState('solar2lunar'); // 'solar2lunar' | 'lunar2solar' | 'holidays'

  // State Solar -> Lunar
  const [sDay, setSDay] = useState(new Date().getDate());
  const [sMonth, setSMonth] = useState(new Date().getMonth() + 1);
  const [sYear, setSYear] = useState(new Date().getFullYear());
  const [sResult, setSResult] = useState(null);

  // State Lunar -> Solar
  const [lDay, setLDay] = useState(1);
  const [lMonth, setLMonth] = useState(1);
  const [lYear, setLYear] = useState(new Date().getFullYear());
  const [lLeap, setLLeap] = useState(0);
  const [lResult, setLResult] = useState(null);

  if (!isOpen) return null;

  const handleConvertSolarToLunar = (e) => {
    e.preventDefault();
    const d = parseInt(sDay, 10);
    const m = parseInt(sMonth, 10);
    const y = parseInt(sYear, 10);

    if (isNaN(d) || isNaN(m) || isNaN(y)) return;

    const [ld, lm, ly, leap] = convertSolar2Lunar(d, m, y, 7);
    const almanac = getFullDayAlmanac(d, m, y);
    setSResult({
      lunarDay: ld,
      lunarMonth: lm,
      lunarYear: ly,
      isLeap: leap,
      almanac,
    });
  };

  const handleConvertLunarToSolar = (e) => {
    e.preventDefault();
    const d = parseInt(lDay, 10);
    const m = parseInt(lMonth, 10);
    const y = parseInt(lYear, 10);
    const leap = parseInt(lLeap, 10);

    if (isNaN(d) || isNaN(m) || isNaN(y)) return;

    const solarRes = convertLunar2Solar(d, m, y, leap, 7);
    if (solarRes) {
      const [sd, sm, sy] = solarRes;
      const almanac = getFullDayAlmanac(sd, sm, sy);
      setLResult({
        solarDay: sd,
        solarMonth: sm,
        solarYear: sy,
        almanac,
      });
    } else {
      setLResult({ error: 'Ngày âm lịch này không hợp lệ trong năm đã chọn.' });
    }
  };

  const handleJumpToHoliday = (holiday, isLunar) => {
    const curYear = new Date().getFullYear();
    if (isLunar) {
      const solarRes = convertLunar2Solar(holiday.d, holiday.m, curYear, 0, 7);
      if (solarRes) {
        const [sd, sm, sy] = solarRes;
        onSelectDate(sd, sm, sy);
        onClose();
      }
    } else {
      onSelectDate(holiday.d, holiday.m, curYear);
      onClose();
    }
  };

  return (
    <div className="lvs-modal-overlay" onClick={onClose}>
      <div className="lvs-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="icon">🔄</span>
            <h3>Đổi Ngày Âm - Dương & Tra Cứu Lễ Tết</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="modal-tabs">
          <button
            type="button"
            className={`m-tab-btn ${activeTab === 'solar2lunar' ? 'active' : ''}`}
            onClick={() => setActiveTab('solar2lunar')}
          >
            Dương → Âm
          </button>
          <button
            type="button"
            className={`m-tab-btn ${activeTab === 'lunar2solar' ? 'active' : ''}`}
            onClick={() => setActiveTab('lunar2solar')}
          >
            Âm → Dương
          </button>
          <button
            type="button"
            className={`m-tab-btn ${activeTab === 'holidays' ? 'active' : ''}`}
            onClick={() => setActiveTab('holidays')}
          >
            Lễ Tết Truyền Thống
          </button>
        </div>

        <div className="modal-body">
          {/* TAB 1: DƯƠNG SANG ÂM */}
          {activeTab === 'solar2lunar' && (
            <div className="tab-content">
              <form onSubmit={handleConvertSolarToLunar} className="convert-form">
                <div className="form-inputs-row">
                  <div className="input-field">
                    <label>Ngày Dương</label>
                    <input
                      type="number"
                      min="1"
                      max="31"
                      value={sDay}
                      onChange={(e) => setSDay(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Tháng</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={sMonth}
                      onChange={(e) => setSMonth(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Năm</label>
                    <input
                      type="number"
                      min="1900"
                      max="2100"
                      value={sYear}
                      onChange={(e) => setSYear(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="submit-convert-btn">
                  Chuyển Đổi Sang Âm Lịch
                </button>
              </form>

              {sResult && (
                <div className="convert-result-card">
                  <div className="res-title">KẾT QUẢ ÂM LỊCH:</div>
                  <div className="res-lunar-big">
                    Ngày {sResult.lunarDay} Tháng {sResult.lunarMonth}
                    {sResult.isLeap ? ' (Tháng Nhuận)' : ''} Năm {sResult.lunarYear}
                  </div>
                  <div className="res-can-chi">
                    Can Chi: <strong>{sResult.almanac.canChi.day.fullName}</strong> -{' '}
                    {sResult.almanac.canChi.month.fullName} - {sResult.almanac.canChi.year.fullName}
                  </div>
                  <div className="res-hoang-dao">
                    {sResult.almanac.hoangDao.badgeText} ({sResult.almanac.ratingLabel})
                  </div>
                  <button
                    type="button"
                    className="view-on-cal-btn"
                    onClick={() => {
                      onSelectDate(
                        sResult.almanac.solar.day,
                        sResult.almanac.solar.month,
                        sResult.almanac.solar.year
                      );
                      onClose();
                    }}
                  >
                    Xem chi tiết trên Lịch Vạn Sự →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ÂM SANG DƯƠNG */}
          {activeTab === 'lunar2solar' && (
            <div className="tab-content">
              <form onSubmit={handleConvertLunarToSolar} className="convert-form">
                <div className="form-inputs-row">
                  <div className="input-field">
                    <label>Ngày Âm</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={lDay}
                      onChange={(e) => setLDay(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Tháng Âm</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={lMonth}
                      onChange={(e) => setLMonth(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Năm Âm</label>
                    <input
                      type="number"
                      min="1900"
                      max="2100"
                      value={lYear}
                      onChange={(e) => setLYear(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Tháng Nhuận?</label>
                    <select
                      value={lLeap}
                      onChange={(e) => setLLeap(parseInt(e.target.value, 10))}
                    >
                      <option value={0}>Không phải tháng nhuận</option>
                      <option value={1}>Là tháng nhuận</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="submit-convert-btn">
                  Chuyển Đổi Sang Dương Lịch
                </button>
              </form>

              {lResult && (
                <div className="convert-result-card">
                  {lResult.error ? (
                    <div className="res-error">{lResult.error}</div>
                  ) : (
                    <>
                      <div className="res-title">KẾT QUẢ DƯƠNG LỊCH:</div>
                      <div className="res-solar-big">
                        {lResult.almanac.solar.weekdayName}, Ngày {lResult.solarDay}/{lResult.solarMonth}/{lResult.solarYear}
                      </div>
                      <div className="res-hoang-dao">
                        {lResult.almanac.hoangDao.badgeText} ({lResult.almanac.ratingLabel})
                      </div>
                      <button
                        type="button"
                        className="view-on-cal-btn"
                        onClick={() => {
                          onSelectDate(
                            lResult.solarDay,
                            lResult.solarMonth,
                            lResult.solarYear
                          );
                          onClose();
                        }}
                      >
                        Xem chi tiết trên Lịch Vạn Sự →
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DANH MỤC LỄ TẾT CỔ TRUYỀN */}
          {activeTab === 'holidays' && (
            <div className="tab-content holidays-tab-content">
              <div className="holidays-column">
                <h4>Lễ Tết Âm Lịch</h4>
                <div className="holidays-list">
                  {LUNAR_HOLIDAYS.map((h, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="holiday-item-btn"
                      onClick={() => handleJumpToHoliday(h, true)}
                    >
                      <span className="h-date">{h.d}/{h.m} ÂL:</span>
                      <span className="h-name">{h.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="holidays-column">
                <h4>Ngày Lễ Dương Lịch</h4>
                <div className="holidays-list">
                  {SOLAR_HOLIDAYS.map((h, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="holiday-item-btn"
                      onClick={() => handleJumpToHoliday(h, false)}
                    >
                      <span className="h-date">{h.d}/{h.m} DL:</span>
                      <span className="h-name">{h.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DateConverterModal;
