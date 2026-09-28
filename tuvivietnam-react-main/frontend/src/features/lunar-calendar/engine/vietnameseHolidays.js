/**
 * DANH MỤC LỄ TẾT CỔ TRUYỀN & NGÀY KỶ NIỆM VIỆT NAM
 */

export const LUNAR_HOLIDAYS = [
  { m: 1, d: 1, name: 'Tết Nguyên Đán (Mùng 1)', isMajor: true },
  { m: 1, d: 2, name: 'Tết Nguyên Đán (Mùng 2)', isMajor: true },
  { m: 1, d: 3, name: 'Tết Nguyên Đán (Mùng 3)', isMajor: true },
  { m: 1, d: 15, name: 'Tết Nguyên Tiêu (Rằm Tháng Giêng)', isMajor: true },
  { m: 2, d: 15, name: 'Rằm Tháng Hai' },
  { m: 3, d: 3, name: 'Tết Hàn Thực (Bánh trôi, bánh chay)' },
  { m: 3, d: 10, name: 'Giỗ Tổ Hùng Vương (10/3 ÂL)', isMajor: true },
  { m: 4, d: 8, name: 'Phật Đản (theo truyền thống Bắc Tông)' },
  { m: 4, d: 15, name: 'Đại Lễ Phật Đản (Rằm Tháng Tư)', isMajor: true },
  { m: 5, d: 5, name: 'Tết Đoan Ngọ (Giết sâu bọ)', isMajor: true },
  { m: 6, d: 15, name: 'Rằm Tháng Sáu' },
  { m: 7, d: 7, name: 'Lễ Thất Tịch (Ngưu Lang - Chức Nữ)' },
  { m: 7, d: 15, name: 'Lễ Vu Lan Báo Hiếu & Xá Tội Vong Nhân', isMajor: true },
  { m: 8, d: 15, name: 'Tết Trung Thu (Tết Đoàn Viên)', isMajor: true },
  { m: 9, d: 9, name: 'Tết Trùng Cửu (Leo núi, ngắm hoa cúc)' },
  { m: 10, d: 10, name: 'Tết Thường Tân (Tết Cơm Mới)' },
  { m: 10, d: 15, name: 'Tết Hạ Nguyên (Rằm Tháng Mười)' },
  { m: 11, d: 15, name: 'Rằm Tháng Mười Một' },
  { m: 12, d: 23, name: 'Tiễn Ông Công Ông Táo Chầu Trời', isMajor: true },
  { m: 12, d: 30, name: 'Đêm Giao Thừa (Lễ Tất Niên)', isMajor: true },
];

export const SOLAR_HOLIDAYS = [
  { m: 1, d: 1, name: 'Tết Dương Lịch', isMajor: true },
  { m: 2, d: 14, name: 'Lễ Tình Nhân (Valentine)' },
  { m: 2, d: 27, name: 'Ngày Thầy Thuốc Việt Nam' },
  { m: 3, d: 8, name: 'Ngày Quốc Tế Phụ Nữ', isMajor: true },
  { m: 3, d: 26, name: 'Ngày Thành Lập Đoàn TNCS Hồ Chí Minh' },
  { m: 4, d: 30, name: 'Ngày Giải Phóng Miền Nam', isMajor: true },
  { m: 5, d: 1, name: 'Ngày Quốc Tế Lao Động', isMajor: true },
  { m: 5, d: 19, name: 'Kỷ Niệm Ngày Sinh Chủ Tịch Hồ Chí Minh' },
  { m: 6, d: 1, name: 'Ngày Quốc Tế Thiếu Nhi' },
  { m: 6, d: 21, name: 'Ngày Báo Chí Cách Mạng Việt Nam' },
  { m: 6, d: 28, name: 'Ngày Gia Đình Việt Nam' },
  { m: 7, d: 27, name: 'Ngày Thương Binh Liệt Sĩ' },
  { m: 8, d: 19, name: 'Ngày Cách Mạng Tháng Tám' },
  { m: 9, d: 2, name: 'Ngày Quốc Khánh Việt Nam', isMajor: true },
  { m: 10, d: 10, name: 'Ngày Giải Phóng Thủ Đô' },
  { m: 10, d: 20, name: 'Ngày Phụ Nữ Việt Nam', isMajor: true },
  { m: 11, d: 20, name: 'Ngày Nhà Giáo Việt Nam', isMajor: true },
  { m: 12, d: 22, name: 'Ngày Thành Lập Quân Đội Nhân Dân VN' },
  { m: 12, d: 24, name: 'Lễ Giáng Sinh (Đêm Noel)' },
  { m: 12, d: 25, name: 'Lễ Giáng Sinh (Noel)' },
];

/** Lấy tên ngày lễ nếu có */
export function getHolidayInfo(solarDay, solarMonth, lunarDay, lunarMonth) {
  const lunarH = LUNAR_HOLIDAYS.find((h) => h.m === lunarMonth && h.d === lunarDay);
  if (lunarH) return lunarH.name;

  const solarH = SOLAR_HOLIDAYS.find((h) => h.m === solarMonth && h.d === solarDay);
  if (solarH) return solarH.name;

  return null;
}
