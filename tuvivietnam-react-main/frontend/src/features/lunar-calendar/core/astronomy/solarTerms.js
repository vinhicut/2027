/**
 * HỆ THỐNG 24 TIẾT KHÍ THIÊN VĂN & THÁNG TIẾT KHÍ BÁT TỰ
 * Chuẩn kinh độ Mặt Trời (Ecliptic Longitude) theo múi giờ UTC+7.
 */

import { jdFromDate, jdToDate } from './julianDay.js';
import { getSunLongitude } from './lunarSolarConverter.js';

export const SOLAR_TERMS = [
  { id: 0, name: 'Xuân Phân', degree: 0, season: 'Xuân', desc: 'Giữa mùa xuân, ngày đêm dài bằng nhau' },
  { id: 1, name: 'Thanh Minh', degree: 15, season: 'Xuân', desc: 'Trời trong sáng, tảo mộ tưởng nhớ tổ tiên' },
  { id: 2, name: 'Cốc Vũ', degree: 30, season: 'Xuân', desc: 'Mưa rào tưới đẫm mầm ngũ cốc' },
  { id: 3, name: 'Lập Hạ', degree: 45, season: 'Hạ', desc: 'Khởi đầu mùa hè, vạn vật tươi tốt' },
  { id: 4, name: 'Tiểu Mãn', degree: 60, season: 'Hạ', desc: 'Hạt lúa bắt đầu đẫy đà, đón mưa đầu hạ' },
  { id: 5, name: 'Mang Chủng', degree: 75, season: 'Hạ', desc: 'Thời vụ thu hoạch ngũ cốc có râu' },
  { id: 6, name: 'Hạ Chí', degree: 90, season: 'Hạ', desc: 'Giữa mùa hè, ngày dài nhất trong năm' },
  { id: 7, name: 'Tiểu Thử', degree: 105, season: 'Hạ', desc: 'Thời tiết bắt đầu nắng nóng gắt' },
  { id: 8, name: 'Đại Thử', degree: 120, season: 'Hạ', desc: 'Thời kỳ nắng nóng đỉnh điểm' },
  { id: 9, name: 'Lập Thu', degree: 135, season: 'Thu', desc: 'Khởi đầu mùa thu, khí trời dịu mát' },
  { id: 10, name: 'Xử Thử', degree: 150, season: 'Thu', desc: 'Hết nóng bức của mùa hạ, chuyển sang mát mẻ' },
  { id: 11, name: 'Bạch Lộ', degree: 165, season: 'Thu', desc: 'Sương mù trắng xuất hiện vào ban đêm' },
  { id: 12, name: 'Thu Phân', degree: 180, season: 'Thu', desc: 'Giữa mùa thu, ngày đêm cân bằng' },
  { id: 13, name: 'Hàn Lộ', degree: 195, season: 'Thu', desc: 'Sương chuyển lạnh, sắp bước vào tiết đông' },
  { id: 14, name: 'Sương Giáng', degree: 210, season: 'Thu', desc: 'Sương muối bắt đầu rơi xuống vùng núi' },
  { id: 15, name: 'Lập Đông', degree: 225, season: 'Đông', desc: 'Khởi đầu mùa đông, vạn vật ẩn tàng' },
  { id: 16, name: 'Tiểu Tuyết', degree: 240, season: 'Đông', desc: 'Bắt đầu có tuyết rơi nhẹ hạt' },
  { id: 17, name: 'Đại Tuyết', degree: 255, season: 'Đông', desc: 'Tuyết rơi dày, gió đông buốt giá' },
  { id: 18, name: 'Đông Chí', degree: 270, season: 'Đông', desc: 'Giữa mùa đông, đêm dài nhất trong năm' },
  { id: 19, name: 'Tiểu Hàn', degree: 285, season: 'Đông', desc: 'Thời tiết bắt đầu rét đậm' },
  { id: 20, name: 'Đại Hàn', degree: 300, season: 'Đông', desc: 'Thời kỳ giá rét đỉnh điểm trong năm' },
  { id: 21, name: 'Lập Xuân', degree: 315, season: 'Xuân', desc: 'Khởi đầu mùa xuân, tiết trời ấm áp, vạn vật hồi sinh' },
  { id: 22, name: 'Vũ Thủy', degree: 330, season: 'Xuân', desc: 'Mưa xuân lất phất, đất trời ẩm ướt' },
  { id: 23, name: 'Kinh Trập', degree: 345, season: 'Xuân', desc: 'Sấm xuân thức tỉnh sâu bọ côn trùng' },
];

/**
 * Lấy góc kinh độ Hoàng Đạo của Mặt Trời (tính bằng độ: 0° - 359.99°)
 */
export function getSunDegree(dd, mm, yyyy, timeZone = 7) {
  const jd = jdFromDate(dd, mm, yyyy);
  const sunLongRad = getSunLongitude(jd, timeZone);
  const sunDegree = (sunLongRad * 180) / Math.PI;
  return (sunDegree + 360) % 360;
}

/**
 * Lấy thông tin Tiết Khí của ngày dương lịch
 */
export function getSolarTerm(dd, mm, yyyy, timeZone = 7) {
  const deg = getSunDegree(dd, mm, yyyy, timeZone);
  const termIndex = Math.floor(deg / 15) % 24;
  const term = SOLAR_TERMS[termIndex];
  return {
    ...term,
    currentDegree: Math.round(deg * 100) / 100,
  };
}

/**
 * Xác định Chi của Tháng theo Tiết Khí (Tiết Khí Nguyệt Kiến) trong Bát Tự:
 * - Tiết Lập Xuân (315°) -> Tháng Dần (bắt đầu năm mới Bát Tự)
 * - Tiết Kinh Trập (345°) -> Tháng Mão
 * - Tiết Thanh Minh (15°)  -> Tháng Thìn
 * - Tiết Lập Hạ (45°)    -> Tháng Tỵ
 * - Tiết Mang Chủng (75°) -> Tháng Ngọ
 * - Tiết Tiểu Thử (105°)  -> Tháng Mùi
 * - Tiết Lập Thu (135°)   -> Tháng Thân
 * - Tiết Bạch Lộ (165°)   -> Tháng Dậu
 * - Tiết Hàn Lộ (195°)    -> Tháng Tuất
 * - Tiết Lập Đông (225°)  -> Tháng Hợi
 * - Tiết Đại Tuyết (255°) -> Tháng Tý
 * - Tiết Tiểu Hàn (285°)  -> Tháng Sửu
 */
export function getSolarTermMonthBranch(dd, mm, yyyy, timeZone = 7) {
  const deg = getSunDegree(dd, mm, yyyy, timeZone);
  // Góc 315° đến trước 345° là Dần
  if (deg >= 315 && deg < 345) return { chi: 'Dần', chiIndex: 2, termName: 'Lập Xuân' };
  if (deg >= 345 || deg < 15) return { chi: 'Mão', chiIndex: 3, termName: 'Kinh Trập' };
  if (deg >= 15 && deg < 45) return { chi: 'Thìn', chiIndex: 4, termName: 'Thanh Minh' };
  if (deg >= 45 && deg < 75) return { chi: 'Tỵ', chiIndex: 5, termName: 'Lập Hạ' };
  if (deg >= 75 && deg < 105) return { chi: 'Ngọ', chiIndex: 6, termName: 'Mang Chủng' };
  if (deg >= 105 && deg < 135) return { chi: 'Mùi', chiIndex: 7, termName: 'Tiểu Thử' };
  if (deg >= 135 && deg < 165) return { chi: 'Thân', chiIndex: 8, termName: 'Lập Thu' };
  if (deg >= 165 && deg < 195) return { chi: 'Dậu', chiIndex: 9, termName: 'Bạch Lộ' };
  if (deg >= 195 && deg < 225) return { chi: 'Tuất', chiIndex: 10, termName: 'Hàn Lộ' };
  if (deg >= 225 && deg < 255) return { chi: 'Hợi', chiIndex: 11, termName: 'Lập Đông' };
  if (deg >= 255 && deg < 285) return { chi: 'Tý', chiIndex: 0, termName: 'Đại Tuyết' };
  return { chi: 'Sửu', chiIndex: 1, termName: 'Tiểu Hàn' };
}
