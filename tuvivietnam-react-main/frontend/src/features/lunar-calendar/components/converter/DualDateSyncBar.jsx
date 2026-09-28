import React, { useState, useEffect } from 'react';
import { getLeapMonthOfYear } from '../../core/index.js';

/**
 * BỘ CHUYỂN ĐỔI NGÀY ÂM - DƯƠNG SONG HÀNH (DUAL DATE SYNC BAR)
 * Hỗ trợ gõ bàn phím tự do, không bị khóa clamping giữa chừng.
 * Tự động tính toán tháng nhuận thông minh theo thuật toán thiên văn học.
 */
function DualDateSyncBar({
  dayAlmanac,
  selectedDate,
  commitSolarDate,
  commitLunarDate,
  onSolarStep,
  onLunarStep,
}) {
  // Local draft states để người dùng gõ bàn phím tự do không bị can thiệp giữa chừng
  const [solarDayStr, setSolarDayStr] = useState(dayAlmanac?.solar ? String(dayAlmanac.solar.day) : '1');
  const [solarMonthStr, setSolarMonthStr] = useState(dayAlmanac?.solar ? String(dayAlmanac.solar.month) : '1');
  const [solarYearStr, setSolarYearStr] = useState(dayAlmanac?.solar ? String(dayAlmanac.solar.year) : '2026');

  const [lunarDayStr, setLunarDayStr] = useState(dayAlmanac?.lunar ? String(dayAlmanac.lunar.day) : '1');
  const [lunarMonthStr, setLunarMonthStr] = useState(dayAlmanac?.lunar ? String(dayAlmanac.lunar.month) : '1');
  const [lunarYearStr, setLunarYearStr] = useState(dayAlmanac?.lunar ? String(dayAlmanac.lunar.year) : '2026');

  // Đồng bộ lại local string khi ngày nguồn thay đổi từ các nguồn khác
  useEffect(() => {
    if (dayAlmanac?.solar) {
      setSolarDayStr(String(dayAlmanac.solar.day));
      setSolarMonthStr(String(dayAlmanac.solar.month));
      setSolarYearStr(String(dayAlmanac.solar.year));
    }
  }, [dayAlmanac?.solar?.day, dayAlmanac?.solar?.month, dayAlmanac?.solar?.year]);

  useEffect(() => {
    if (dayAlmanac?.lunar) {
      setLunarDayStr(String(dayAlmanac.lunar.day));
      setLunarMonthStr(String(dayAlmanac.lunar.month));
      setLunarYearStr(String(dayAlmanac.lunar.year));
    }
  }, [dayAlmanac?.lunar?.day, dayAlmanac?.lunar?.month, dayAlmanac?.lunar?.year, dayAlmanac?.lunar?.isLeap]);

  if (!dayAlmanac) return null;

  const { solar, lunar, canChi, solarTerm } = dayAlmanac;

  // Kiểm tra tháng nhuận của năm âm lịch hiện tại
  const leapMonthOfYear = getLeapMonthOfYear(lunar.year, 7);
  const isCurrentMonthLeapCandidate = leapMonthOfYear > 0 && lunar.month === leapMonthOfYear;

  // --- Xử lý Commit Dương Lịch ---
  const handleSolarBlurOrEnter = () => {
    commitSolarDate(solarDayStr, solarMonthStr, solarYearStr);
  };

  const handleSolarYearChange = (val) => {
    setSolarYearStr(val);
    // Khi gõ đủ 4 số năm hợp lệ, tự động cập nhật ngay
    if (val.length === 4) {
      const num = parseInt(val, 10);
      if (num >= 1900 && num <= 2100) {
        commitSolarDate(solarDayStr, solarMonthStr, num);
      }
    }
  };

  // --- Xử lý Commit Âm Lịch ---
  const handleLunarBlurOrEnter = () => {
    commitLunarDate(lunarDayStr, lunarMonthStr, lunarYearStr, lunar.isLeap ? 1 : 0);
  };

  const handleLunarYearChange = (val) => {
    setLunarYearStr(val);
    // Khi gõ đủ 4 số năm hợp lệ, tự động cập nhật ngay
    if (val.length === 4) {
      const num = parseInt(val, 10);
      if (num >= 1900 && num <= 2100) {
        commitLunarDate(lunarDayStr, lunarMonthStr, num, lunar.isLeap ? 1 : 0);
      }
    }
  };

  const handleLeapSelectChange = (e) => {
    const requestedLeap = parseInt(e.target.value, 10);
    commitLunarDate(lunar.day, lunar.month, lunar.year, requestedLeap);
  };

  return (
    <div className="lvs-dual-date-sync">
      {/* CỘT TRÁI: LỊCH DƯƠNG */}
      <div className="sync-col sync-side-card solar-side">
        <div className="sync-side-header">
          <div className="sync-title-group">
            <span className="sync-side-title">LỊCH DƯƠNG</span>
            <span className="sync-weekday-tag">{solar.weekdayName}</span>
          </div>
        </div>

        <div className="sync-fields-grid solar-grid">
          {/* Ngày Dương */}
          <div className="sync-stepper-cell">
            <span className="sync-cell-label">NGÀY</span>
            <div className="sync-stepper-box">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onSolarStep('day', -1)}
                title="Giảm 1 ngày"
              >
                −
              </button>
              <input
                type="text"
                inputMode="numeric"
                className="stepper-input"
                value={solarDayStr}
                onChange={(e) => setSolarDayStr(e.target.value)}
                onBlur={handleSolarBlurOrEnter}
                onKeyDown={(e) => e.key === 'Enter' && handleSolarBlurOrEnter()}
              />
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onSolarStep('day', 1)}
                title="Tăng 1 ngày"
              >
                +
              </button>
            </div>
          </div>

          {/* Tháng Dương */}
          <div className="sync-stepper-cell">
            <span className="sync-cell-label">THÁNG</span>
            <div className="sync-stepper-box">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onSolarStep('month', -1)}
                title="Giảm 1 tháng"
              >
                −
              </button>
              <input
                type="text"
                inputMode="numeric"
                className="stepper-input"
                value={solarMonthStr}
                onChange={(e) => setSolarMonthStr(e.target.value)}
                onBlur={handleSolarBlurOrEnter}
                onKeyDown={(e) => e.key === 'Enter' && handleSolarBlurOrEnter()}
              />
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onSolarStep('month', 1)}
                title="Tăng 1 tháng"
              >
                +
              </button>
            </div>
          </div>

          {/* Năm Dương */}
          <div className="sync-stepper-cell">
            <span className="sync-cell-label">NĂM</span>
            <div className="sync-stepper-box">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onSolarStep('year', -1)}
                title="Giảm 1 năm"
              >
                −
              </button>
              <input
                type="text"
                inputMode="numeric"
                className="stepper-input"
                value={solarYearStr}
                onChange={(e) => handleSolarYearChange(e.target.value)}
                onBlur={handleSolarBlurOrEnter}
                onKeyDown={(e) => e.key === 'Enter' && handleSolarBlurOrEnter()}
                placeholder="1900-2100"
              />
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onSolarStep('year', 1)}
                title="Tăng 1 năm"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="sync-meta-note">
          Tiết khí: <strong>{solarTerm.name}</strong> ({solarTerm.desc})
        </div>
      </div>

      {/* ĐƯỜNG PHÂN CÁCH TRUNG TÂM */}
      <div className="sync-center-control" title="Quy đổi Âm - Dương Tự Động">
        <div className="sync-sep-line" />
        <div className="sync-switch-circle" aria-label="Chuyển đổi Âm Dương">
          <svg
            className="sync-switch-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Mũi tên trên trỏ sang phải */}
            <path d="M7 8h10" />
            <path d="M13 4l4 4-4 4" />
            {/* Mũi tên dưới trỏ sang trái */}
            <path d="M17 16H7" />
            <path d="M11 20l-4-4 4-4" />
          </svg>
        </div>
        <div className="sync-sep-line" />
      </div>

      {/* CỘT PHẢI: LỊCH ÂM */}
      <div className="sync-col sync-side-card lunar-side">
        <div className="sync-side-header">
          <div className="sync-title-group">
            <span className="sync-side-title">LỊCH ÂM</span>
            <span className="sync-canchi-tag">{canChi.day.fullName}</span>
          </div>
        </div>

        <div className="sync-fields-grid lunar-grid">
          {/* Ngày Âm */}
          <div className="sync-stepper-cell">
            <span className="sync-cell-label">NGÀY</span>
            <div className="sync-stepper-box">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onLunarStep('day', -1)}
                title="Giảm 1 ngày âm"
              >
                −
              </button>
              <input
                type="text"
                inputMode="numeric"
                className="stepper-input"
                value={lunarDayStr}
                onChange={(e) => setLunarDayStr(e.target.value)}
                onBlur={handleLunarBlurOrEnter}
                onKeyDown={(e) => e.key === 'Enter' && handleLunarBlurOrEnter()}
              />
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onLunarStep('day', 1)}
                title="Tăng 1 ngày âm"
              >
                +
              </button>
            </div>
          </div>

          {/* Tháng Âm */}
          <div className="sync-stepper-cell">
            <span className="sync-cell-label">THÁNG</span>
            <div className="sync-stepper-box">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onLunarStep('month', -1)}
                title="Giảm 1 tháng âm"
              >
                −
              </button>
              <input
                type="text"
                inputMode="numeric"
                className="stepper-input"
                value={lunarMonthStr}
                onChange={(e) => setLunarMonthStr(e.target.value)}
                onBlur={handleLunarBlurOrEnter}
                onKeyDown={(e) => e.key === 'Enter' && handleLunarBlurOrEnter()}
              />
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onLunarStep('month', 1)}
                title="Tăng 1 tháng âm"
              >
                +
              </button>
            </div>
          </div>

          {/* Năm Âm */}
          <div className="sync-stepper-cell">
            <span className="sync-cell-label">NĂM</span>
            <div className="sync-stepper-box">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onLunarStep('year', -1)}
                title="Giảm 1 năm âm"
              >
                −
              </button>
              <input
                type="text"
                inputMode="numeric"
                className="stepper-input"
                value={lunarYearStr}
                onChange={(e) => handleLunarYearChange(e.target.value)}
                onBlur={handleLunarBlurOrEnter}
                onKeyDown={(e) => e.key === 'Enter' && handleLunarBlurOrEnter()}
                placeholder="1900-2100"
              />
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onLunarStep('year', 1)}
                title="Tăng 1 năm âm"
              >
                +
              </button>
            </div>
          </div>

          {/* Ô THÔNG MINH: THÁNG NHUẬN (Tự động tính toán - Không ép buộc người dùng) */}
          <div className="sync-stepper-cell leap-cell">
            <span className="sync-cell-label">NHUẬN</span>
            <div className="sync-stepper-box">
              {isCurrentMonthLeapCandidate ? (
                /* Chỉ khi năm này có tháng nhuận và người dùng chọn đúng tháng đó mới hiển thị lựa chọn */
                <select
                  className="stepper-select highlight-leap"
                  value={lunar.isLeap ? 1 : 0}
                  onChange={handleLeapSelectChange}
                  title="Chọn tháng thường hoặc tháng nhuận"
                >
                  <option value={0}>Thường</option>
                  <option value={1}>Nhuận</option>
                </select>
              ) : (
                /* Các tháng/năm thông thường: Hệ thống tự động báo trạng thái, người dùng không phải thao tác */
                <div
                  className="stepper-badge-auto"
                  title={
                    leapMonthOfYear > 0
                      ? `Năm ${lunar.year} có tháng ${leapMonthOfYear} nhuận`
                      : `Năm ${lunar.year} là năm thường không có tháng nhuận`
                  }
                >
                  {leapMonthOfYear > 0 ? `Nhuận T${leapMonthOfYear}` : 'Không'}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="sync-meta-note">
          Năm <strong>{canChi.year.fullName}</strong> ({canChi.year.napAm})
        </div>
      </div>
    </div>
  );
}

export default React.memo(DualDateSyncBar);
