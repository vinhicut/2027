/**
 * THUẬT TOÁN THIÊN VĂN LỊCH ÂM DƯƠNG VIỆT NAM (Múi giờ UTC+7)
 * Dựa trên thuật toán thiên văn học chính xác và chuẩn hóa của Hồ Ngọc Đức.
 */

import { jdFromDate, jdToDate } from './julianDay.js';

const PI = Math.PI;

/**
 * Tính ngày Sóc (New Moon) theo số hiệu k và múi giờ timeZone (mặc định 7 cho VN)
 */
export function getNewMoonDay(k, timeZone = 7) {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  let jd =
    2415020.75933 +
    29.53058868 * k +
    0.0001178 * T2 -
    0.000000155 * T3;
  jd += 0.00033 * Math.sin(((166.56 + 132.87 * T - 0.009173 * T2) * PI) / 180);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 =
    (0.1734 - 0.000393 * T) * Math.sin((M * PI) / 180) +
    0.0021 * Math.sin((2 * M * PI) / 180);
  C1 -= 0.4068 * Math.sin((Mpr * PI) / 180);
  C1 += 0.0161 * Math.sin((2 * Mpr * PI) / 180);
  C1 -= 0.0004 * Math.sin((3 * Mpr * PI) / 180);
  C1 += 0.0104 * Math.sin((2 * F * PI) / 180);
  C1 -= 0.0051 * Math.sin(((M + Mpr) * PI) / 180);
  C1 -= 0.0074 * Math.sin(((M - Mpr) * PI) / 180);
  C1 += 0.0004 * Math.sin(((2 * F + M) * PI) / 180);
  C1 -= 0.0004 * Math.sin(((2 * F - M) * PI) / 180);
  C1 -= 0.0006 * Math.sin(((2 * F + Mpr) * PI) / 180);
  C1 += 0.001 * Math.sin(((2 * F - Mpr) * PI) / 180);
  C1 += 0.0005 * Math.sin(((2 * Mpr + M) * PI) / 180);
  const deltat =
    T < -11
      ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
      : -0.000278 + 0.000265 * T + 0.000262 * T2;
  return Math.floor(jd + C1 - deltat + 0.5 + timeZone / 24);
}

/**
 * Tính kinh độ Hoàng Đạo của Mặt Trời (Sun Longitude tính theo Radian)
 */
export function getSunLongitude(jdn, timeZone = 7) {
  const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
  const T2 = T * T;
  const dr = PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
  let L = L0 + DL;
  L = L * dr;
  L = L - PI * 2 * Math.floor(L / (PI * 2));
  return L;
}

/**
 * Tìm ngày Sóc chứa Trung khí Đông Chí (tháng 11 âm lịch)
 */
function getLunarMonth11(yyyy, timeZone = 7) {
  const off = jdFromDate(31, 12, yyyy) - 2415021;
  const k = Math.floor(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = Math.floor((getSunLongitude(nm, timeZone) * 180) / PI / 30);
  if (sunLong >= 9) nm = getNewMoonDay(k - 1, timeZone);
  return nm;
}

/**
 * Tìm tháng nhuận trong năm âm lịch
 */
function getLeapMonthOffset(a11, timeZone = 7) {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = Math.floor((getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone) * 180) / PI / 30);
  do {
    last = arc;
    i += 1;
    arc = Math.floor((getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone) * 180) / PI / 30);
  } while (arc !== last && i < 14);
  return i - 1;
}

/**
 * Đổi ngày Dương lịch sang Âm lịch Việt Nam
 * @returns [lunarDay, lunarMonth, lunarYear, isLeap]
 */
export function convertSolar2Lunar(dd, mm, yyyy, timeZone = 7) {
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

/**
 * Đổi ngày Âm lịch sang Dương lịch Việt Nam
 * @returns [solarDay, solarMonth, solarYear] hoặc null nếu ngày âm không tồn tại
 */
export function convertLunar2Solar(lunarDay, lunarMonth, lunarYear, lunarLeap = 0, timeZone = 7) {
  let a11;
  if (lunarMonth < 11) {
    a11 = getLunarMonth11(lunarYear - 1, timeZone);
  } else {
    a11 = getLunarMonth11(lunarYear, timeZone);
  }
  const b11 = getLunarMonth11(lunarYear, timeZone);
  let off = lunarMonth - 11;
  if (off < 0) off += 12;
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    // Chỉ áp dụng cờ nhuận nếu tháng này thực sự là tháng nhuận
    if (lunarLeap === 1 && off === leapMonthDiff - 1) {
      off += 1;
    } else if (off >= leapMonthDiff) {
      off += 1;
    }
  }
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  const monthStart = getNewMoonDay(k + off, timeZone);
  return jdToDate(monthStart + lunarDay - 1);
}

/**
 * Tìm tháng nhuận trong năm âm lịch (trả về 0 nếu năm không nhuận, hoặc số tháng 1..12)
 */
export function getLeapMonthOfYear(lunarYear, timeZone = 7) {
  let a11;
  let b11;
  if (lunarYear) {
    a11 = getLunarMonth11(lunarYear - 1, timeZone);
    b11 = getLunarMonth11(lunarYear, timeZone);
  }
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    let leapMonth = leapMonthDiff - 2;
    if (leapMonth <= 0) leapMonth += 12;
    return leapMonth;
  }
  return 0; // Năm không có tháng nhuận
}

/**
 * Lấy số ngày thực tế trong tháng âm lịch (29 hay 30 ngày)
 */
export function getDaysInLunarMonth(lunarMonth, lunarYear, isLeap = 0, timeZone = 7) {
  const s30 = convertLunar2Solar(30, lunarMonth, lunarYear, isLeap, timeZone);
  if (!s30) return 29;
  const back = convertSolar2Lunar(s30[0], s30[1], s30[2], timeZone);
  if (back[0] === 30 && back[1] === lunarMonth && back[2] === lunarYear && back[3] === isLeap) {
    return 30;
  }
  return 29;
}
