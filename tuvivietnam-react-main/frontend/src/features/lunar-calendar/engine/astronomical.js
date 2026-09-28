/**
 * THUẬT TOÁN THIÊN VĂN LỊCH ÂM DƯƠNG & 24 TIẾT KHÍ (UTC+7)
 * Dựa trên thuật toán thiên văn học chính xác và chuẩn hóa của Hồ Ngọc Đức.
 */

/** Đổi ngày dương lịch (dd, mm, yyyy) sang Julian Day Number */
export function jdFromDate(dd, mm, yyyy) {
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

/** Đổi Julian Day Number sang ngày dương lịch [dd, mm, yyyy] */
export function jdToDate(jd) {
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

/** Tính ngày Sóc (New Moon) theo số hiệu k và múi giờ timeZone (mặc định 7 cho VN) */
export function getNewMoonDay(k, timeZone = 7) {
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

/** Tính kinh độ Hoàng Đạo của Mặt Trời (Sun Longitude tính theo Radian) */
export function getSunLongitude(jdn, timeZone = 7) {
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

/** Tìm ngày Sóc chứa Trung khí Đông Chí (tháng 11 âm lịch) */
function getLunarMonth11(yyyy, timeZone = 7) {
  const off = jdFromDate(31, 12, yyyy) - 2415021;
  const k = Math.floor(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = Math.floor((getSunLongitude(nm, timeZone) * 180) / Math.PI / 30);
  if (sunLong >= 9) nm = getNewMoonDay(k - 1, timeZone);
  return nm;
}

/** Tìm tháng nhuận trong năm âm lịch */
function getLeapMonthOffset(a11, timeZone = 7) {
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
    if (lunarLeap === 1) {
      off += 1;
    } else if (off >= leapMonthDiff) {
      off += 1;
    }
  }
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  const monthStart = getNewMoonDay(k + off, timeZone);
  return jdToDate(monthStart + lunarDay - 1);
}

/** Danh sách 24 Tiết Khí thiên văn học theo kinh độ mặt trời */
export const SOLAR_TERMS = [
  { id: 0, name: 'Xuân Phân', degree: 0, desc: 'Giữa mùa xuân, ngày đêm dài bằng nhau' },
  { id: 1, name: 'Thanh Minh', degree: 15, desc: 'Trời trong sáng, tảo mộ tưởng nhớ tổ tiên' },
  { id: 2, name: 'Cốc Vũ', degree: 30, desc: 'Mưa rào tưới đẫm mầm lúa' },
  { id: 3, name: 'Lập Hạ', degree: 45, desc: 'Khởi đầu mùa hè' },
  { id: 4, name: 'Tiểu Mãn', degree: 60, desc: 'Hạt lúa bắt đầu đẫy đà' },
  { id: 5, name: 'Mang Chủng', degree: 75, desc: 'Thời vụ thu hoạch ngũ cốc có râu' },
  { id: 6, name: 'Hạ Chí', degree: 90, desc: 'Giữa mùa hè, ngày dài nhất trong năm' },
  { id: 7, name: 'Tiểu Thử', degree: 105, desc: 'Thời tiết bắt đầu nóng gắt' },
  { id: 8, name: 'Đại Thử', degree: 120, desc: 'Thời kỳ nắng nóng đỉnh điểm' },
  { id: 9, name: 'Lập Thu', degree: 135, desc: 'Khởi đầu mùa thu, khí trời dịu mát' },
  { id: 10, name: 'Xử Thử', degree: 150, desc: 'Hết nóng bức của mùa hạ' },
  { id: 11, name: 'Bạch Lộ', degree: 165, desc: 'Sương mù trắng xuất hiện vào ban đêm' },
  { id: 12, name: 'Thu Phân', degree: 180, desc: 'Giữa mùa thu, ngày đêm cân bằng' },
  { id: 13, name: 'Hàn Lộ', degree: 195, desc: 'Sương chuyển lạnh, sắp bước vào đông' },
  { id: 14, name: 'Sương Giáng', degree: 210, desc: 'Sương muối bắt đầu rơi xuống' },
  { id: 15, name: 'Lập Đông', degree: 225, desc: 'Khởi đầu mùa đông' },
  { id: 16, name: 'Tiểu Tuyết', degree: 240, desc: 'Bắt đầu có tuyết rơi nhẹ hạt' },
  { id: 17, name: 'Đại Tuyết', degree: 255, desc: 'Tuyết rơi dày, gió đông lạnh buốt' },
  { id: 18, name: 'Đông Chí', degree: 270, desc: 'Giữa mùa đông, đêm dài nhất trong năm' },
  { id: 19, name: 'Tiểu Hàn', degree: 285, desc: 'Trời rét đậm' },
  { id: 20, name: 'Đại Hàn', degree: 300, desc: 'Thời kỳ rét hại đỉnh điểm trong năm' },
  { id: 21, name: 'Lập Xuân', degree: 315, desc: 'Khởi đầu mùa xuân, vạn vật hồi sinh' },
  { id: 22, name: 'Vũ Thủy', degree: 330, desc: 'Mưa xuân lất phất, ẩm ướt' },
  { id: 23, name: 'Kinh Trập', degree: 345, desc: 'Sấm xuân thức tỉnh sâu bọ côn trùng' },
];

/** Lấy thông tin Tiết Khí của ngày dương lịch */
export function getSolarTerm(dd, mm, yyyy, timeZone = 7) {
  const jd = jdFromDate(dd, mm, yyyy);
  const sunLong = (getSunLongitude(jd, timeZone) * 180) / Math.PI;
  const termIndex = Math.floor(sunLong / 15) % 24;
  return SOLAR_TERMS[termIndex];
}
