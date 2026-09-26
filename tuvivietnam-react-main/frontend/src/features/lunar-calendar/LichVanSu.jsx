import React, { useMemo, useState } from 'react';
import './LichVanSu.css';

/** Đổi ngày dương → Julian Day Number */
function jdFromDate(dd, mm, yyyy) {
  const a = Math.floor((14 - mm) / 12);
  const y = yyyy + 4800 - a;
  const m = mm + 12 * a - 3;
  return (
    dd +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

function _jdToDate(jd) {
  const a = jd + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);
  return [day, month, year];
}

function getNewMoonDay(k, timeZone) {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  let jd =
    2415020.75933 +
    29.53058868 * k +
    0.0001178 * T2 -
    0.000000155 * T3;
  jd += 0.00033 * Math.sin(((166.56 + 132.87 * T - 0.009173 * T2) * Math.PI) / 180);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 =
    (0.1734 - 0.000393 * T) * Math.sin((M * Math.PI) / 180) +
    0.0021 * Math.sin((2 * M * Math.PI) / 180);
  C1 -= 0.4068 * Math.sin((Mpr * Math.PI) / 180);
  C1 += 0.0161 * Math.sin((2 * Mpr * Math.PI) / 180);
  C1 -= 0.0004 * Math.sin((3 * Mpr * Math.PI) / 180);
  C1 += 0.0104 * Math.sin((2 * F * Math.PI) / 180);
  C1 -= 0.0051 * Math.sin(((M + Mpr) * Math.PI) / 180);
  C1 -= 0.0074 * Math.sin(((M - Mpr) * Math.PI) / 180);
  C1 += 0.0004 * Math.sin(((2 * F + M) * Math.PI) / 180);
  C1 -= 0.0004 * Math.sin(((2 * F - M) * Math.PI) / 180);
  C1 -= 0.0006 * Math.sin(((2 * F + Mpr) * Math.PI) / 180);
  C1 += 0.001 * Math.sin(((2 * F - Mpr) * Math.PI) / 180);
  C1 += 0.0005 * Math.sin(((2 * Mpr + M) * Math.PI) / 180);
  const deltat =
    T < -11
      ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
      : -0.000278 + 0.000265 * T + 0.000262 * T2;
  return Math.floor(jd + C1 - deltat + 0.5 + timeZone / 24);
}

function getSunLongitude(jdn, timeZone) {
  const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
  let L = L0 + DL;
  L = L * dr;
  L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2));
  return L;
}

function getLunarMonth11(yyyy, timeZone) {
  const off = jdFromDate(31, 12, yyyy) - 2415021;
  const k = Math.floor(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = Math.floor((getSunLongitude(nm, timeZone) * 180) / Math.PI / 30);
  if (sunLong >= 9) nm = getNewMoonDay(k - 1, timeZone);
  return nm;
}

function getLeapMonthOffset(a11, timeZone) {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = Math.floor((getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone) * 180) / Math.PI / 30);
  do {
    last = arc;
    i += 1;
    arc = Math.floor((getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone) * 180) / Math.PI / 30);
  } while (arc !== last && i < 14);
  return i - 1;
}

/** [ngày âm, tháng âm, năm âm, có phải tháng nhuận] */
function convertSolar2Lunar(dd, mm, yyyy, timeZone = 7) {
  const dayNumber = jdFromDate(dd, mm, yyyy);
  const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) monthStart = getNewMoonDay(k, timeZone);
  let a11 = getLunarMonth11(yyyy, timeZone);
  let b11 = a11;
  let lunarYear;
  if (a11 >= monthStart) {
    lunarYear = yyyy;
    a11 = getLunarMonth11(yyyy - 1, timeZone);
  } else {
    lunarYear = yyyy + 1;
    b11 = getLunarMonth11(yyyy + 1, timeZone);
  }
  const lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);
  let lunarLeap = 0;
  let lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) lunarLeap = 1;
    }
  }
  if (lunarMonth > 12) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
  return [lunarDay, lunarMonth, lunarYear, lunarLeap];
}

const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const WEEKDAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
const MONTH_NAMES = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];

function canChiYear(year) {
  return `${CAN[(year + 6) % 10]} ${CHI[(year + 8) % 12]}`;
}

function canChiDay(jd) {
  return `${CAN[(jd + 9) % 10]} ${CHI[(jd + 1) % 12]}`;
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function LichVanSu() {
  const today = useMemo(() => new Date(), []);
  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();

  const [viewYear, setViewYear] = useState(todayYear);
  const [viewMonth, setViewMonth] = useState(todayMonth); // 1-12
  const [selected, setSelected] = useState({
    d: todayDay,
    m: todayMonth,
    y: todayYear,
  });

  const cells = useMemo(() => {
    const first = new Date(viewYear, viewMonth - 1, 1);
    const startWeekday = first.getDay(); // 0 CN
    const dim = daysInMonth(viewYear, viewMonth);
    const list = [];
    for (let i = 0; i < startWeekday; i++) list.push(null);
    for (let d = 1; d <= dim; d++) {
      const [ld, lm, ly, leap] = convertSolar2Lunar(d, viewMonth, viewYear, 7);
      list.push({
        solarDay: d,
        lunarDay: ld,
        lunarMonth: lm,
        lunarYear: ly,
        leap,
        isToday:
          d === todayDay &&
          viewMonth === todayMonth &&
          viewYear === todayYear,
      });
    }
    return list;
  }, [viewYear, viewMonth, todayDay, todayMonth, todayYear]);

  const selectedInfo = useMemo(() => {
    const { d, m, y } = selected;
    const jd = jdFromDate(d, m, y);
    const [ld, lm, ly, leap] = convertSolar2Lunar(d, m, y, 7);
    const weekday = WEEKDAYS[new Date(y, m - 1, d).getDay()];
    return {
      solar: `${d}/${m}/${y}`,
      weekday,
      lunar: `Ngày ${ld} tháng ${lm}${leap ? ' (nhuận)' : ''} năm ${ly}`,
      canChiNgay: canChiDay(jd),
      canChiNam: canChiYear(ly),
      lunarDay: ld,
      lunarMonth: lm,
      lunarYear: ly,
      leap,
    };
  }, [selected]);

  const prevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const goToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth() + 1);
    setSelected({
      d: today.getDate(),
      m: today.getMonth() + 1,
      y: today.getFullYear(),
    });
  };

  return (
    <div className="lvs-page">
      <div className="lvs-breadcrumb">Home › Phần mềm › Lịch Vạn Sự</div>
      <h1 className="lvs-title">Lịch Vạn Sự – Âm lịch Việt Nam</h1>
      <p className="lvs-desc">Xem ngày dương – âm, Can Chi. Múi giờ Việt Nam (UTC+7).</p>

      <div className="lvs-layout">
        <section className="lvs-calendar">
          <div className="lvs-toolbar">
            <button type="button" onClick={prevMonth}>‹</button>
            <div className="lvs-month-label">
              {MONTH_NAMES[viewMonth - 1]} / {viewYear}
            </div>
            <button type="button" onClick={nextMonth}>›</button>
            <button type="button" className="lvs-today-btn" onClick={goToday}>
              Hôm nay
            </button>
          </div>

          <div className="lvs-weekdays">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((w) => (
              <div key={w} className="lvs-wd">
                {w}
              </div>
            ))}
          </div>

          <div className="lvs-grid">
            {cells.map((cell, idx) =>
              cell ? (
                <button
                  type="button"
                  key={idx}
                  className={[
                    'lvs-day',
                    cell.isToday ? 'is-today' : '',
                    selected.d === cell.solarDay &&
                    selected.m === viewMonth &&
                    selected.y === viewYear
                      ? 'is-selected'
                      : '',
                    cell.lunarDay === 1 ? 'is-m1' : '',
                  ].join(' ')}
                  onClick={() =>
                    setSelected({ d: cell.solarDay, m: viewMonth, y: viewYear })
                  }
                >
                  <span className="solar">{cell.solarDay}</span>
                  <span className="lunar">
                    {cell.lunarDay === 1
                      ? `${cell.lunarDay}/${cell.lunarMonth}${cell.leap ? 'N' : ''}`
                      : cell.lunarDay}
                  </span>
                </button>
              ) : (
                <div key={idx} className="lvs-day empty" />
              )
            )}
          </div>
        </section>

        <aside className="lvs-detail">
          <h2>Chi tiết ngày chọn</h2>
          <div className="lvs-detail-box">
            <div className="row">
              <span className="label">Dương lịch</span>
              <span className="value">{selectedInfo.solar}</span>
            </div>
            <div className="row">
              <span className="label">Thứ</span>
              <span className="value">{selectedInfo.weekday}</span>
            </div>
            <div className="row">
              <span className="label">Âm lịch</span>
              <span className="value">{selectedInfo.lunar}</span>
            </div>
            <div className="row">
              <span className="label">Can Chi ngày</span>
              <span className="value highlight">{selectedInfo.canChiNgay}</span>
            </div>
            <div className="row">
              <span className="label">Can Chi năm âm</span>
              <span className="value highlight">{selectedInfo.canChiNam}</span>
            </div>
          </div>
          <p className="lvs-note">
            * Thuật toán chuyển đổi theo lịch Việt Nam phổ biến (Ho Ngoc Duc / lý thuyết thiên văn gần đúng).
          </p>
        </aside>
      </div>
    </div>
  );
}

export default LichVanSu;
