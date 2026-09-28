/**
 * THUẬT TOÁN QUY ĐỔI NGÀY JULIAN (JULIAN DAY NUMBER - JDN)
 * Chuẩn hóa độ chính xác cho thiên văn học và lịch pháp cổ điển.
 */

/**
 * Đổi ngày dương lịch (dd, mm, yyyy) sang Julian Day Number (JDN) tại 0h UTC.
 */
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

/**
 * Đổi Julian Day Number (JDN) sang ngày dương lịch [dd, mm, yyyy].
 */
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

/**
 * Lấy thứ trong tuần từ JDN (0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy).
 */
export function getDayOfWeekFromJd(jd) {
  return (jd + 1) % 7;
}
