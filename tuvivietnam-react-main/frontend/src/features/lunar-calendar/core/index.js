/**
 * FACADE API - TỔNG HỢP TOÀN BỘ CÔNG CỤ THUẬT TOÁN LỊCH VẠN SỰ
 * Kết nối các Module Lõi theo chuẩn kiến trúc Clean Architecture.
 */

import { jdFromDate, jdToDate, getDayOfWeekFromJd } from './astronomy/julianDay.js';
import {
  convertSolar2Lunar,
  convertLunar2Solar,
  getLeapMonthOfYear,
  getDaysInLunarMonth,
} from './astronomy/lunarSolarConverter.js';
import { getSolarTerm, SOLAR_TERMS } from './astronomy/solarTerms.js';

import {
  getCanChiYear,
  getCanChiMonth,
  getCanChiMonthBySolarTerm,
  getCanChiDay,
  getHourlyCanChiList,
} from './sexagenary/canChiCalculator.js';

import { getDayHoangDao, getDayHourlyDeities } from './deities/hoangDaoHacDao.js';
import { getDayTruc } from './deities/thapNhiKienTru.js';
import { getDayNhiThapBatTu } from './deities/nhiThapBatTu.js';
import { getDayLucDieu } from './deities/lucDieu.js';
import { checkSpecialBadDays, getDayStars } from './deities/catHungStars.js';

import { getDepartureDirections } from './divination/departureDirections.js';
import { getLyThuanPhongHours } from './divination/lyThuanPhongHours.js';
import { getConflictingAges } from './divination/conflictResolver.js';

import { calculateDayScore } from './evaluation/dayScoringEngine.js';
import { evaluateTasks, PURPOSES } from './evaluation/taskAdvisor.js';
import { getHolidayInfo } from './holidays/vietnameseHolidays.js';

export const WEEKDAYS = [
  'Chủ Nhật',
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
];

export const SHORT_WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

/**
 * Lấy toàn bộ thông tin chi tiết Lịch Vạn Sự của 1 ngày Dương Lịch
 */
export function getFullDayAlmanac(solarDay, solarMonth, solarYear) {
  const jd = jdFromDate(solarDay, solarMonth, solarYear);
  const dayOfWeek = getDayOfWeekFromJd(jd);
  const weekdayName = WEEKDAYS[dayOfWeek];

  // 1. Chuyển đổi Âm lịch (Việt Nam UTC+7)
  const [lunarDay, lunarMonth, lunarYear, isLeap] = convertSolar2Lunar(
    solarDay,
    solarMonth,
    solarYear,
    7
  );

  // 2. Can Chi Năm, Tháng (Dân gian & Tiết khí), Ngày, Giờ
  const canChiYear = getCanChiYear(lunarYear);
  const canChiMonth = getCanChiMonth(lunarMonth, lunarYear);
  const solarTermMonth = getCanChiMonthBySolarTerm(solarDay, solarMonth, solarYear, lunarYear);
  const canChiDay = getCanChiDay(jd);
  const hourlyCanChi = getHourlyCanChiList(canChiDay.canIndex);

  // 3. 24 Tiết Khí
  const solarTerm = getSolarTerm(solarDay, solarMonth, solarYear);

  // 4. Hoàng Đạo / Hắc Đạo (Ngày & 12 Giờ)
  const hoangDao = getDayHoangDao(lunarMonth, canChiDay.chiIndex);
  const baseHourlyDeities = getDayHourlyDeities(canChiDay.chiIndex, hourlyCanChi);

  // 5. Khổng Minh Lục Diệu & Giờ Xuất Hành Lý Thuần Phong
  const lucDieu = getDayLucDieu(lunarDay, lunarMonth);
  const hourlyDeities = getLyThuanPhongHours(lunarDay, lunarMonth, baseHourlyDeities);

  // 6. Thập Nhị Kiến Trừ & Nhị Thập Bát Tú (Chuẩn hóa)
  const truc = getDayTruc(lunarMonth, canChiDay.chiIndex);
  const tu = getDayNhiThapBatTu(jd);

  // 7. Bách Thần Sát & Ngày Kỵ Dân Gian (Khâm Định Hiệp Kỷ Biện Phương Thư)
  const badDays = checkSpecialBadDays(lunarDay, lunarMonth, canChiDay.chi);
  const stars = getDayStars(lunarDay, lunarMonth, canChiDay.can, canChiDay.chi);

  // 8. Hướng xuất hành & Tuổi xung khắc
  const departures = getDepartureDirections(canChiDay.can, canChiDay.chi);
  const conflicts = getConflictingAges(canChiDay.can, canChiDay.chi);

  // 9. Đánh giá Cát Hung & Đề xuất Sự vụ đa chiều
  const scoreInfo = calculateDayScore({
    isHoangDao: hoangDao.isHoangDao,
    truc,
    tu,
    lucDieu,
    badDays,
    stars,
  });

  const tasks = evaluateTasks({
    truc,
    tu,
    lucDieu,
    isHoangDao: hoangDao.isHoangDao,
    badDays,
    stars,
  });

  // 10. Ngày Lễ Tết Dân Tộc & Dương Lịch
  const holiday = getHolidayInfo(solarDay, solarMonth, lunarDay, lunarMonth);

  return {
    solar: {
      day: solarDay,
      month: solarMonth,
      year: solarYear,
      dateStr: `${solarDay.toString().padStart(2, '0')}/${solarMonth.toString().padStart(2, '0')}/${solarYear}`,
      dayOfWeek,
      weekdayName,
      jd,
    },
    lunar: {
      day: lunarDay,
      month: lunarMonth,
      year: lunarYear,
      isLeap: Boolean(isLeap),
      dateStr: `Ngày ${lunarDay} tháng ${lunarMonth}${isLeap ? ' (Nhuận)' : ''} năm ${lunarYear}`,
      shortDateStr: `${lunarDay}/${lunarMonth}${isLeap ? 'N' : ''}`,
    },
    canChi: {
      year: canChiYear,
      month: canChiMonth,
      solarTermMonth, // Bát Tự / Tử Bình Tiết Khí Nguyệt Kiến
      day: canChiDay,
    },
    solarTerm,
    hoangDao,
    hourlyDeities,
    lucDieu,
    truc,
    tu,
    badDays,
    stars,
    departures,
    conflicts,
    score: scoreInfo.score,
    ratingLabel: scoreInfo.label,
    ratingBadgeClass: scoreInfo.badgeClass,
    tasks,
    holiday,
  };
}

/**
 * Lấy ma trận dữ liệu tháng phục vụ hiển thị Lịch Tháng toàn cảnh
 */
export function getMonthAlmanac(month, year) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayWeekday = new Date(year, month - 1, 1).getDay(); // 0: CN
  const matrix = [];

  // Ô trống đầu tháng
  for (let i = 0; i < firstDayWeekday; i++) {
    matrix.push(null);
  }

  // Các ngày trong tháng
  for (let d = 1; d <= daysInMonth; d++) {
    const dayData = getFullDayAlmanac(d, month, year);
    matrix.push(dayData);
  }

  return {
    month,
    year,
    daysInMonth,
    firstDayWeekday,
    days: matrix,
  };
}

/**
 * Tìm các ngày tốt trong tháng theo mục đích công việc
 */
export function findGoodDaysInMonth(month, year, purposeId = 'all') {
  const monthData = getMonthAlmanac(month, year);
  const activeDays = monthData.days.filter(Boolean);

  const matchedDays = activeDays.map((day) => {
    let matchScore = day.score;
    const matchReasons = [];

    // Tiêu chí Hoàng Đạo
    if (day.hoangDao.isHoangDao) {
      matchReasons.push(`Ngày ${day.hoangDao.badgeText}`);
    }

    // Tiêu chí Lục Diệu Cát
    if (day.lucDieu.type === 'Cát') {
      matchReasons.push(`${day.lucDieu.fullName} (${day.lucDieu.rating})`);
    }

    // Tiêu chí Trực Cát
    if (day.truc.type === 'Cát') {
      matchReasons.push(`${day.truc.fullName} - ${day.truc.desc}`);
    }

    // Tiêu chí Nhị Thập Bát Tú Cát
    if (day.tu.isGood) {
      matchReasons.push(`Sao ${day.tu.fullName} (${day.tu.rating})`);
    }

    // Lọc theo mục đích cụ thể
    if (purposeId !== 'all') {
      const purposeObj = PURPOSES.find((p) => p.id === purposeId);
      const purposeKeyword = purposeObj ? purposeObj.name.split(',')[0].trim().toLowerCase() : '';

      const isRecommended = day.tasks.recommended.some((t) =>
        t.toLowerCase().includes(purposeKeyword)
      );
      const isAvoid = day.tasks.avoid.some((t) =>
        t.toLowerCase().includes(purposeKeyword)
      );

      if (isAvoid) {
        matchScore -= 4.0;
        matchReasons.push(`Phạm kiêng kỵ việc ${purposeKeyword}`);
      } else if (isRecommended) {
        matchScore += 2.0;
        matchReasons.push(`Rất tốt cho việc ${purposeKeyword}`);
      }
    }

    // Giờ Hoàng Đạo trong ngày
    const goodHours = day.hourlyDeities.filter((h) => h.isHoangDao);

    return {
      day,
      finalScore: Math.round(Math.max(1, Math.min(10, matchScore)) * 10) / 10,
      reasons: matchReasons,
      goodHours,
    };
  });

  // Sắp xếp ngày điểm cao nhất lên đầu
  matchedDays.sort((a, b) => b.finalScore - a.finalScore);

  return matchedDays;
}

export {
  convertSolar2Lunar,
  convertLunar2Solar,
  getLeapMonthOfYear,
  getDaysInLunarMonth,
  getSolarTerm,
  SOLAR_TERMS,
  PURPOSES,
};
