/**
 * HỆ THỐNG SAO CÁT - HUNG & CÁC NGÀY KỴ ĐẶC BIỆT (BÁCH KỴ)
 */

/** Danh sách 13 ngày Dương Công Kỵ Nhật trong năm âm lịch */
const DUONG_CONG_KY = [
  { m: 1, d: 13 },
  { m: 2, d: 11 },
  { m: 3, d: 9 },
  { m: 4, d: 7 },
  { m: 5, d: 5 },
  { m: 6, d: 3 },
  { m: 7, d: 1 },
  { m: 7, d: 29 },
  { m: 8, d: 27 },
  { m: 9, d: 25 },
  { m: 10, d: 23 },
  { m: 11, d: 21 },
  { m: 12, d: 19 },
];

/** Ngày Thụ Tử theo Tháng âm lịch và Chi của ngày */
const THU_TU_CHI = ['Tuất', 'Thìn', 'Hợi', 'Tỵ', 'Tý', 'Ngọ', 'Sửu', 'Mùi', 'Dần', 'Thân', 'Mão', 'Dậu'];

/** Ngày Sát Chủ theo Tháng âm lịch và Chi của ngày */
const SAT_CHU_CHI = ['Tỵ', 'Tý', 'Mùi', 'Mão', 'Thân', 'Tuất', 'Sửu', 'Hợi', 'Ngọ', 'Dậu', 'Dần', 'Thìn'];

/**
 * Kiểm tra các ngày kỵ đặc biệt dân gian
 */
export function checkSpecialBadDays(lunarDay, lunarMonth, dayChi) {
  const badDays = [];

  // 1. Ngày Tam Nương
  if ([3, 7, 13, 18, 22, 27].includes(lunarDay)) {
    badDays.push({
      name: 'Tam Nương Sát',
      level: 'Kỵ',
      desc: 'Ngày Tam Nương (mùng 3, 7, 13, 18, 22, 27 âm lịch) kiêng cưới hỏi, động thổ, xuất hành đi xa.',
    });
  }

  // 2. Ngày Nguyệt Kỵ
  if ([5, 14, 23].includes(lunarDay)) {
    badDays.push({
      name: 'Nguyệt Kỵ',
      level: 'Đại Kỵ',
      desc: 'Mùng năm, mười bốn, hai ba / Đi chơi cũng thiệt nữa là đi buôn. Kiêng khởi sự việc lớn, xuất hành.',
    });
  }

  // 3. Ngày Dương Công Kỵ Nhật
  const isDuongCong = DUONG_CONG_KY.some((item) => item.m === lunarMonth && item.d === lunarDay);
  if (isDuongCong) {
    badDays.push({
      name: 'Dương Công Kỵ',
      level: 'Đại Hung',
      desc: 'Một trong 13 ngày đại kỵ nhất trong năm, trăm sự đều nên kiêng cữ thận trọng.',
    });
  }

  // 4. Ngày Thụ Tử
  const thuTuChiOfDay = THU_TU_CHI[(lunarMonth - 1) % 12];
  if (dayChi === thuTuChiOfDay) {
    badDays.push({
      name: 'Thụ Tử',
      level: 'Đại Hung',
      desc: `Ngày Thụ Tử (tháng ${lunarMonth} gặp ngày ${dayChi}), trăm sự đều kỵ, đặc biệt kiêng xuất hành và làm nhà.`,
    });
  }

  // 5. Ngày Sát Chủ
  const satChuChiOfDay = SAT_CHU_CHI[(lunarMonth - 1) % 12];
  if (dayChi === satChuChiOfDay) {
    badDays.push({
      name: 'Sát Chủ',
      level: 'Đại Hung',
      desc: `Ngày Sát Chủ (tháng ${lunarMonth} gặp ngày ${dayChi}), kỵ xây dựng, cưới hỏi, an táng, nhậm chức.`,
    });
  }

  return badDays;
}

/**
 * Liệt kê danh sách Cát Tinh & Hung Tinh chiếu trong ngày
 */
export function getDayStars(lunarDay, lunarMonth, dayCan, dayChi) {
  const goodStars = [];
  const badStars = [];

  // Mẫu quy tắc Cát Tinh theo Can Chi và Tháng
  // Thiên Đức & Nguyệt Đức
  if (['Đinh', 'Thân', 'Nhâm', 'Tân', 'Bính', 'Giáp', 'Quý', 'Canh'].includes(dayCan)) {
    goodStars.push({ name: 'Thiên Đức', desc: 'Đức trời che chở, giải trừ mọi tai ách, tốt mọi việc' });
  }
  if (['Bính', 'Giáp', 'Nhâm', 'Canh'].includes(dayCan)) {
    goodStars.push({ name: 'Nguyệt Đức', desc: 'Trăng thanh gió mát, vạn sự hanh thông, quý nhân phù trợ' });
  }

  // Thiên Hỷ
  if (['Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân'][(lunarMonth + 7) % 12] === dayChi) {
    goodStars.push({ name: 'Thiên Hỷ', desc: 'Mừng vui cát khánh, tốt cho việc cưới hỏi, đính hôn, sum họp' });
  }

  // Sinh Khí
  if (['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'][(lunarMonth + 2) % 12] === dayChi) {
    goodStars.push({ name: 'Sinh Khí', desc: 'Sinh sôi nảy nở, đại lợi cho động thổ, trồng trọt, cầu con cái' });
  }

  // Dịch Mã (thích hợp đi xa, cầu tài)
  if (['Dần', 'Thân', 'Tỵ', 'Hợi'].includes(dayChi)) {
    goodStars.push({ name: 'Dịch Mã', desc: 'Tốt cho việc xuất hành, đi xa, dời chỗ, nhậm chức xa xứ' });
  }

  // Tam Hợp & Lục Hợp
  goodStars.push({ name: 'Tuế Hợp', desc: 'Thuận hòa nhân tâm, đối ngoại đắc lợi' });

  // Mẫu Hung Tinh
  if (['Thìn', 'Tuất', 'Sửu', 'Mùi'].includes(dayChi)) {
    badStars.push({ name: 'Địa Tặc', desc: 'Khởi công xây cất cẩn trọng hao tài mất trộm' });
  }

  if (['Dần', 'Thân', 'Tỵ', 'Hợi'].includes(dayChi)) {
    badStars.push({ name: 'Kiếp Sát', desc: 'Tránh tranh chấp kiện tụng, đề phòng thương tích' });
  }

  if (lunarDay % 6 === 0) {
    badStars.push({ name: 'Hỏa Tai', desc: 'Cẩn trọng củi lửa, tránh đổ mái, làm bếp' });
  }

  return { goodStars, badStars };
}
