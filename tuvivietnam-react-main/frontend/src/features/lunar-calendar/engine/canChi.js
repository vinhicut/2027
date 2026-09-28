/**
 * HỆ THỐNG CAN CHI, NGŨ HÀNH NẠP ÂM & ĐỘN TOÁN BÁT TỰ
 */

export const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

export const CAN_ELEMENTS = {
  Giáp: 'Mộc', Ất: 'Mộc',
  Bính: 'Hỏa', Đinh: 'Hỏa',
  Mậu: 'Thổ', Kỷ: 'Thổ',
  Canh: 'Kim', Tân: 'Kim',
  Nhâm: 'Thủy', Quý: 'Thủy',
};

export const CHI_ELEMENTS = {
  Tý: 'Thủy', Sửu: 'Thổ', Dần: 'Mộc', Mão: 'Mộc',
  Thìn: 'Thổ', Tỵ: 'Hỏa', Ngọ: 'Hỏa', Mùi: 'Thổ',
  Thân: 'Kim', Dậu: 'Kim', Tuất: 'Thổ', Hợi: 'Thủy',
};

/** 60 Hoa Giáp Ngũ Hành Nạp Âm */
export const NAP_AM = {
  'Giáp Tý': 'Hải Trung Kim', 'Ất Sửu': 'Hải Trung Kim',
  'Bính Dần': 'Lư Trung Hỏa', 'Đinh Mão': 'Lư Trung Hỏa',
  'Mậu Thìn': 'Đại Lâm Mộc', 'Kỷ Tỵ': 'Đại Lâm Mộc',
  'Canh Ngọ': 'Lộ Bàng Thổ', 'Tân Mùi': 'Lộ Bàng Thổ',
  'Nhâm Thân': 'Kiếm Phong Kim', 'Quý Dậu': 'Kiếm Phong Kim',
  'Giáp Tuất': 'Sơn Đầu Hỏa', 'Ất Hợi': 'Sơn Đầu Hỏa',
  'Bính Tý': 'Giản Hạ Thủy', 'Đinh Sửu': 'Giản Hạ Thủy',
  'Mậu Dần': 'Thành Đầu Thổ', 'Kỷ Mão': 'Thành Đầu Thổ',
  'Canh Thìn': 'Bạch Lạp Kim', 'Tân Tỵ': 'Bạch Lạp Kim',
  'Nhâm Ngọ': 'Dương Liễu Mộc', 'Quý Mùi': 'Dương Liễu Mộc',
  'Giáp Thân': 'Tuyền Trung Thủy', 'Ất Dậu': 'Tuyền Trung Thủy',
  'Bính Tuất': 'Ốc Thượng Thổ', 'Đinh Hợi': 'Ốc Thượng Thổ',
  'Mậu Tý': 'Tích Lịch Hỏa', 'Kỷ Sửu': 'Tích Lịch Hỏa',
  'Canh Dần': 'Tùng Bách Mộc', 'Tân Mão': 'Tùng Bách Mộc',
  'Nhâm Thìn': 'Trường Lưu Thủy', 'Quý Tỵ': 'Trường Lưu Thủy',
  'Giáp Ngọ': 'Sa Trung Kim', 'Ất Mùi': 'Sa Trung Kim',
  'Bính Thân': 'Sơn Hạ Hỏa', 'Đinh Dậu': 'Sơn Hạ Hỏa',
  'Mậu Tuất': 'Bình Địa Mộc', 'Kỷ Hợi': 'Bình Địa Mộc',
  'Canh Tý': 'Bích Thượng Thổ', 'Tân Sửu': 'Bích Thượng Thổ',
  'Nhâm Dần': 'Kim Bạch Kim', 'Quý Mão': 'Kim Bạch Kim',
  'Giáp Thìn': 'Phúc Đăng Hỏa', 'Ất Tỵ': 'Phúc Đăng Hỏa',
  'Bính Ngọ': 'Thiên Hà Thủy', 'Đinh Mùi': 'Thiên Hà Thủy',
  'Mậu Thân': 'Đại Trạch Thổ', 'Kỷ Dậu': 'Đại Trạch Thổ',
  'Canh Tuất': 'Thoa Xuyến Kim', 'Tân Hợi': 'Thoa Xuyến Kim',
  'Nhâm Tý': 'Tang Đố Mộc', 'Quý Sửu': 'Tang Đố Mộc',
  'Giáp Dần': 'Đại Khê Thủy', 'Ất Mão': 'Đại Khê Thủy',
  'Bính Thìn': 'Sa Trung Thổ', 'Đinh Tỵ': 'Sa Trung Thổ',
  'Mậu Ngọ': 'Thiên Thượng Hỏa', 'Kỷ Mùi': 'Thiên Thượng Hỏa',
  'Canh Thân': 'Thạch Lựu Mộc', 'Tân Dậu': 'Thạch Lựu Mộc',
  'Nhâm Tuất': 'Đại Hải Thủy', 'Quý Hợi': 'Đại Hải Thủy',
};

/** Lấy Ngũ hành chính của Nạp Âm */
export function getElementFromNapAm(napAmStr) {
  if (!napAmStr) return 'Mộc';
  if (napAmStr.includes('Kim')) return 'Kim';
  if (napAmStr.includes('Mộc')) return 'Mộc';
  if (napAmStr.includes('Thủy')) return 'Thủy';
  if (napAmStr.includes('Hỏa')) return 'Hỏa';
  if (napAmStr.includes('Thổ')) return 'Thổ';
  return 'Thổ';
}

/** Can Chi Năm Âm Lịch */
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
    fullName,
    napAm,
    element: getElementFromNapAm(napAm),
  };
}

/** Can Chi Ngày từ Julian Day Number */
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
 * Can Chi Tháng theo Ngũ Hổ Độn (Niên thượng khởi nguyệt pháp)
 * Tháng 1 (Dần) khởi Can theo Can năm:
 * Giáp, Kỷ -> Bính Dần (index Can = 2)
 * Ất, Canh -> Mậu Dần (index Can = 4)
 * Bính, Tân -> Canh Dần (index Can = 6)
 * Đinh, Nhâm -> Nhâm Dần (index Can = 8)
 * Mậu, Quý -> Giáp Dần (index Can = 0)
 */
export function getCanChiMonth(lunarMonth, lunarYear) {
  const canYearIndex = (lunarYear + 6) % 10;
  const startCanMap = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0]; // index 0..9 theo Can Giáp..Quý
  const startCan = startCanMap[canYearIndex];
  // Tháng Giêng là Dần (index Chi = 2)
  const canIndex = (startCan + (lunarMonth - 1)) % 10;
  const chiIndex = (2 + (lunarMonth - 1)) % 12;
  const can = CAN[canIndex];
  const chi = CHI[chiIndex];
  const fullName = `${can} ${chi}`;
  const napAm = NAP_AM[fullName] || '';
  return {
    can,
    chi,
    fullName,
    napAm,
    element: getElementFromNapAm(napAm),
  };
}

/** 12 Khung Giờ Chi trong ngày */
export const HOUR_RANGES = [
  { chi: 'Tý', timeRange: '23:00 - 00:59', chiIndex: 0 },
  { chi: 'Sửu', timeRange: '01:00 - 02:59', chiIndex: 1 },
  { chi: 'Dần', timeRange: '03:00 - 04:59', chiIndex: 2 },
  { chi: 'Mão', timeRange: '05:00 - 06:59', chiIndex: 3 },
  { chi: 'Thìn', timeRange: '07:00 - 08:59', chiIndex: 4 },
  { chi: 'Tỵ', timeRange: '09:00 - 10:59', chiIndex: 5 },
  { chi: 'Ngọ', timeRange: '11:00 - 12:59', chiIndex: 6 },
  { chi: 'Mùi', timeRange: '13:00 - 14:59', chiIndex: 7 },
  { chi: 'Thân', timeRange: '15:00 - 16:59', chiIndex: 8 },
  { chi: 'Dậu', timeRange: '17:00 - 18:59', chiIndex: 9 },
  { chi: 'Tuất', timeRange: '19:00 - 20:59', chiIndex: 10 },
  { chi: 'Hợi', timeRange: '21:00 - 22:59', chiIndex: 11 },
];

/**
 * Can Chi Giờ theo Ngũ Thử Độn (Nhật thượng khởi thời pháp)
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
      chiIndex: hr.chiIndex,
      chi,
      can,
      fullName,
      timeRange: hr.timeRange,
      napAm,
      element: getElementFromNapAm(napAm),
    };
  });
}
