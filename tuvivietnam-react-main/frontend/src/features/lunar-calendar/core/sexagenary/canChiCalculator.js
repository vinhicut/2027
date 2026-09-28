/**
 * BỘ TÍNH TOÁN CAN CHI (NĂM, THÁNG, NGÀY, GIỜ)
 * Áp dụng Ngũ Hổ Độn (Niên Thượng Khởi Nguyệt) & Ngũ Thử Độn (Nhật Thượng Khởi Thời).
 */

import { CAN, CHI, NAP_AM, getElementFromNapAm } from './canChiTables.js';
import { getSolarTermMonthBranch } from '../astronomy/solarTerms.js';

/**
 * 12 Khung Giờ Chi truyền thống trong ngày
 */
export const HOUR_RANGES = [
  { chi: 'Tý', timeRange: '23:00 - 00:59', chiIndex: 0, order: 1 },
  { chi: 'Sửu', timeRange: '01:00 - 02:59', chiIndex: 1, order: 2 },
  { chi: 'Dần', timeRange: '03:00 - 04:59', chiIndex: 2, order: 3 },
  { chi: 'Mão', timeRange: '05:00 - 06:59', chiIndex: 3, order: 4 },
  { chi: 'Thìn', timeRange: '07:00 - 08:59', chiIndex: 4, order: 5 },
  { chi: 'Tỵ', timeRange: '09:00 - 10:59', chiIndex: 5, order: 6 },
  { chi: 'Ngọ', timeRange: '11:00 - 12:59', chiIndex: 6, order: 7 },
  { chi: 'Mùi', timeRange: '13:00 - 14:59', chiIndex: 7, order: 8 },
  { chi: 'Thân', timeRange: '15:00 - 16:59', chiIndex: 8, order: 9 },
  { chi: 'Dậu', timeRange: '17:00 - 18:59', chiIndex: 9, order: 10 },
  { chi: 'Tuất', timeRange: '19:00 - 20:59', chiIndex: 10, order: 11 },
  { chi: 'Hợi', timeRange: '21:00 - 22:59', chiIndex: 11, order: 12 },
];

/**
 * Can Chi Năm Âm Lịch
 */
export function getCanChiYear(year) {
  const canIndex = (year + 6) % 10;
  const chiIndex = (year + 8) % 12;
  const can = CAN[(canIndex + 10) % 10];
  const chi = CHI[(chiIndex + 12) % 12];
  const fullName = `${can} ${chi}`;
  const napAm = NAP_AM[fullName] || '';
  return {
    can,
    chi,
    canIndex: (canIndex + 10) % 10,
    chiIndex: (chiIndex + 12) % 12,
    fullName,
    napAm,
    element: getElementFromNapAm(napAm),
  };
}

/**
 * Can Chi Ngày từ Julian Day Number (JDN)
 */
export function getCanChiDay(jd) {
  const canIndex = (jd + 9) % 10;
  const chiIndex = (jd + 1) % 12;
  const can = CAN[(canIndex + 10) % 10];
  const chi = CHI[(chiIndex + 12) % 12];
  const fullName = `${can} ${chi}`;
  const napAm = NAP_AM[fullName] || '';
  return {
    can,
    chi,
    canIndex: (canIndex + 10) % 10,
    chiIndex: (chiIndex + 12) % 12,
    fullName,
    napAm,
    element: getElementFromNapAm(napAm),
  };
}

/**
 * Can Chi Tháng theo Ngũ Hổ Độn Dân Gian (theo tháng Âm lịch Sóc vọng)
 * Tháng 1 (Dần) khởi Can theo Can năm:
 * Giáp, Kỷ -> Bính Dần (2)
 * Ất, Canh -> Mậu Dần (4)
 * Bính, Tân -> Canh Dần (6)
 * Đinh, Nhâm -> Nhâm Dần (8)
 * Mậu, Quý -> Giáp Dần (0)
 */
export function getCanChiMonth(lunarMonth, lunarYear) {
  const canYearIndex = (lunarYear + 6) % 10;
  const startCanMap = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
  const startCan = startCanMap[canYearIndex];
  const canIndex = (startCan + (lunarMonth - 1)) % 10;
  const chiIndex = (2 + (lunarMonth - 1)) % 12; // Tháng Giêng là Dần (2)
  const can = CAN[canIndex];
  const chi = CHI[chiIndex];
  const fullName = `${can} ${chi}`;
  const napAm = NAP_AM[fullName] || '';
  return {
    can,
    chi,
    canIndex,
    chiIndex,
    fullName,
    napAm,
    element: getElementFromNapAm(napAm),
    system: 'lunar_folk',
  };
}

/**
 * Can Chi Tháng theo Tiết Khí Nguyệt Kiến (Chuẩn Bát Tự / Tử Bình)
 */
export function getCanChiMonthBySolarTerm(dd, mm, yyyy, lunarYear) {
  const branchInfo = getSolarTermMonthBranch(dd, mm, yyyy);
  const canYearIndex = (lunarYear + 6) % 10;
  const startCanMap = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
  const startCan = startCanMap[canYearIndex];
  // Khoảng cách từ Dần (chiIndex 2)
  const offsetFromDan = (branchInfo.chiIndex - 2 + 12) % 12;
  const canIndex = (startCan + offsetFromDan) % 10;
  const can = CAN[canIndex];
  const chi = branchInfo.chi;
  const fullName = `${can} ${chi}`;
  const napAm = NAP_AM[fullName] || '';
  return {
    can,
    chi,
    canIndex,
    chiIndex: branchInfo.chiIndex,
    fullName,
    napAm,
    element: getElementFromNapAm(napAm),
    termName: branchInfo.termName,
    system: 'solar_term',
  };
}

/**
 * 12 Giờ Can Chi trong ngày theo Ngũ Thử Độn (Nhật Thượng Khởi Thời)
 * Giờ Tý khởi Can theo Can ngày:
 * Giáp, Kỷ -> Giáp Tý (0)
 * Ất, Canh -> Bính Tý (2)
 * Bính, Tân -> Mậu Tý (4)
 * Đinh, Nhâm -> Canh Tý (6)
 * Mậu, Quý -> Nhâm Tý (8)
 */
export function getHourlyCanChiList(canDayIndex) {
  const startCanMap = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
  const startCan = startCanMap[canDayIndex % 10];
  return HOUR_RANGES.map((hr, idx) => {
    const canIdx = (startCan + idx) % 10;
    const can = CAN[canIdx];
    const chi = hr.chi;
    const fullName = `${can} ${chi}`;
    const napAm = NAP_AM[fullName] || '';
    return {
      order: hr.order,
      chiIndex: hr.chiIndex,
      chi,
      can,
      canIndex: canIdx,
      fullName,
      timeRange: hr.timeRange,
      napAm,
      element: getElementFromNapAm(napAm),
    };
  });
}
