/**
 * DANH SÁCH NGÀY LỄ TẾT TRUYỀN THỐNG VIỆT NAM & DƯƠNG LỊCH
 */

export const SOLAR_HOLIDAYS = {
  '1-1': 'Tết Dương Lịch',
  '14-2': 'Lễ Tình Nhân (Valentine)',
  '8-3': 'Ngày Quốc Tế Phụ Nữ',
  '26-3': 'Ngày Thành Lập Đoàn TNCS Hồ Chí Minh',
  '30-4': 'Ngày Giải Phóng Miền Nam',
  '1-5': 'Ngày Quốc Tế Lao Động',
  '1-6': 'Ngày Quốc Tế Thiếu Nhi',
  '27-7': 'Ngày Thương Binh Liệt Sĩ',
  '19-8': 'Ngày Cách Mạng Tháng Tám',
  '2-9': 'Ngày Quốc Khánh Việt Nam',
  '10-10': 'Ngày Giải Phóng Thủ Đô',
  '20-10': 'Ngày Phụ Nữ Việt Nam',
  '20-11': 'Ngày Nhà Giáo Việt Nam',
  '22-12': 'Ngày Thành Lập Quân Đội Nhân Dân VN',
  '24-12': 'Lễ Giáng Sinh (Noel)',
  '25-12': 'Đại Lễ Giáng Sinh',
};

export const LUNAR_HOLIDAYS = {
  '1-1': 'Mùng 1 Tết Nguyên Đán',
  '2-1': 'Mùng 2 Tết Nguyên Đán',
  '3-1': 'Mùng 3 Tết Nguyên Đán',
  '15-1': 'Tết Nguyên Tiêu (Rằm Tháng Giêng)',
  '3-3': 'Tết Hàn Thực (Bánh Trôi Bánh Chay)',
  '10-3': 'Giỗ Tổ Hùng Vương (10/3 Âm Lịch)',
  '15-4': 'Đại Lễ Phật Đản (Rằm Tháng 4)',
  '5-5': 'Tết Đoan Ngọ (Giết Sâu Bọ)',
  '15-7': 'Lễ Vu Lan Báo Hiếu & Xá Tội Vong Nhân (Rằm Tháng 7)',
  '1-8': 'Tết Trung Thu (Khởi đầu)',
  '15-8': 'Tết Trung Thu (Rằm Tháng 8)',
  '9-9': 'Tết Trùng Cửu',
  '10-10': 'Tết Trùng Thập (Tết Cơm Mới)',
  '15-10': 'Tết Hạ Nguyên (Rằm Tháng 10)',
  '23-12': 'Tết Ông Công Ông Táo Chầu Trời',
  '30-12': 'Tất Niên Đêm Giao Thừa (Tháng Đủ)',
  '29-12': 'Tất Niên Đêm Giao Thừa (Tháng Thiếu)',
};

/**
 * Lấy tên ngày lễ nếu có
 */
export function getHolidayInfo(solarDay, solarMonth, lunarDay, lunarMonth) {
  const solarKey = `${solarDay}-${solarMonth}`;
  const lunarKey = `${lunarDay}-${lunarMonth}`;

  const holidays = [];
  if (LUNAR_HOLIDAYS[lunarKey]) holidays.push(LUNAR_HOLIDAYS[lunarKey]);
  if (SOLAR_HOLIDAYS[solarKey]) holidays.push(SOLAR_HOLIDAYS[solarKey]);

  return holidays.length > 0 ? holidays.join(' • ') : null;
}
