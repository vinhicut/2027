/**
 * BÁCH THẦN SÁT & CÁC NGÀY KỴ ĐẶC BIỆT (CÁT TINH - HUNG TINH)
 * Chuẩn hóa 100% theo Khâm Định Hiệp Kỷ Biện Phương Thư & Ngọc Hạp Thông Thư.
 */

/** 13 Ngày Dương Công Kỵ Nhật trong năm âm lịch */
export const DUONG_CONG_KY = [
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

/** Bảng Thụ Tử Chi theo 12 tháng âm lịch */
const THU_TU_CHI = ['Tuất', 'Thìn', 'Hợi', 'Tỵ', 'Tý', 'Ngọ', 'Sửu', 'Mùi', 'Dần', 'Thân', 'Mão', 'Dậu'];

/** Bảng Sát Chủ Chi theo 12 tháng âm lịch */
const SAT_CHU_CHI = ['Tỵ', 'Tý', 'Mùi', 'Mão', 'Thân', 'Tuất', 'Sửu', 'Hợi', 'Ngọ', 'Dậu', 'Dần', 'Thìn'];

/** Bảng Vãng Vong Chi theo 12 tháng âm lịch */
const VANG_VONG_CHI = ['Dần', 'Tỵ', 'Thân', 'Hợi', 'Mão', 'Ngọ', 'Dậu', 'Tý', 'Thìn', 'Mùi', 'Tuất', 'Sửu'];

/** Bảng Thiên Đức theo tháng âm lịch */
const THIEN_DUC_MAP = {
  1: 'Đinh', 2: 'Thân', 3: 'Nhâm', 4: 'Tân',
  5: 'Hợi', 6: 'Giáp', 7: 'Quý', 8: 'Dần',
  9: 'Bính', 10: 'Ất', 11: 'Tỵ', 12: 'Canh',
};

/** Bảng Nguyệt Đức theo tháng âm lịch (Tam Hợp Cục) */
const NGUYET_DUC_MAP = {
  1: 'Bính', 5: 'Bính', 9: 'Bính',   // Dần Ngọ Tuất Hỏa Cục
  3: 'Nhâm', 7: 'Nhâm', 11: 'Nhâm',  // Thân Tý Thìn Thủy Cục
  2: 'Giáp', 6: 'Giáp', 10: 'Giáp',  // Hợi Mão Mùi Mộc Cục
  4: 'Canh', 8: 'Canh', 12: 'Canh',  // Tỵ Dậu Sửu Kim Cục
};

/** Bảng Thiên Hỷ theo tháng âm lịch */
const THIEN_HY_CHI = ['Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu'];

/** Bảng Sinh Khí theo tháng âm lịch */
const SINH_KHI_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

/** Lục Hợp Địa Chi */
const LUC_HOP = {
  Tý: 'Sửu', Sửu: 'Tý',
  Dần: 'Hợi', Hợi: 'Dần',
  Mão: 'Tuất', Tuất: 'Mão',
  Thìn: 'Dậu', Dậu: 'Thìn',
  Tỵ: 'Thân', Thân: 'Tỵ',
  Ngọ: 'Mùi', Mùi: 'Ngọ',
};

/** Tam Hợp Địa Chi */
const TAM_HOP = {
  Thân: ['Tý', 'Thìn'], Tý: ['Thân', 'Thìn'], Thìn: ['Thân', 'Tý'],
  Dần: ['Ngọ', 'Tuất'], Ngọ: ['Dần', 'Tuất'], Tuất: ['Dần', 'Ngọ'],
  Tỵ: ['Dậu', 'Sửu'], Dậu: ['Tỵ', 'Sửu'], Sửu: ['Tỵ', 'Dậu'],
  Hợi: ['Mão', 'Mùi'], Mão: ['Hợi', 'Mùi'], Mùi: ['Hợi', 'Mão'],
};

/** Địa chi xung đối (Lục Xung) */
const LUC_XUNG = {
  Tý: 'Ngọ', Ngọ: 'Tý',
  Sửu: 'Mùi', Mùi: 'Sửu',
  Dần: 'Thân', Thân: 'Dần',
  Mão: 'Dậu', Dậu: 'Mão',
  Thìn: 'Tuất', Tuất: 'Thìn',
  Tỵ: 'Hợi', Hợi: 'Tỵ',
};

/** Chi tương ứng với từng tháng âm lịch */
const MONTH_CHI = [
  'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi',
  'Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu',
];

/**
 * Kiểm tra các ngày kỵ đặc biệt dân gian (Bách Kỵ)
 */
export function checkSpecialBadDays(lunarDay, lunarMonth, dayChi) {
  const badDays = [];

  // 1. Ngày Tam Nương Sát
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
  const thuTuChi = THU_TU_CHI[(lunarMonth - 1) % 12];
  if (dayChi === thuTuChi) {
    badDays.push({
      name: 'Thụ Tử',
      level: 'Đại Hung',
      desc: `Ngày Thụ Tử (tháng ${lunarMonth} gặp ngày ${dayChi}), trăm sự đều kỵ, đặc biệt kiêng xuất hành và làm nhà.`,
    });
  }

  // 5. Ngày Sát Chủ
  const satChuChi = SAT_CHU_CHI[(lunarMonth - 1) % 12];
  if (dayChi === satChuChi) {
    badDays.push({
      name: 'Sát Chủ',
      level: 'Đại Hung',
      desc: `Ngày Sát Chủ (tháng ${lunarMonth} gặp ngày ${dayChi}), kỵ xây dựng, cưới hỏi, an táng, nhậm chức.`,
    });
  }

  // 6. Ngày Vãng Vong (Lục Kỵ)
  const vangVongChi = VANG_VONG_CHI[(lunarMonth - 1) % 12];
  if (dayChi === vangVongChi) {
    badDays.push({
      name: 'Vãng Vong',
      level: 'Hung',
      desc: `Ngày Vãng Vong (tháng ${lunarMonth} gặp ngày ${dayChi}), kỵ xuất hành, đi xa, cưới hỏi, cầu tài.`,
    });
  }

  // 7. Ngày Nguyệt Phá
  const monthBranch = MONTH_CHI[(lunarMonth - 1) % 12];
  if (dayChi === LUC_XUNG[monthBranch]) {
    badDays.push({
      name: 'Nguyệt Phá',
      level: 'Đại Hung',
      desc: `Ngày Nguyệt Phá (Chi ngày ${dayChi} trực xung với Chi tháng ${monthBranch}), kỵ khởi công, động thổ, cưới hỏi.`,
    });
  }

  return badDays;
}

/**
 * Liệt kê danh sách Cát Tinh & Hung Tinh chiếu trong ngày
 * Chuẩn xác theo Hiệp Kỷ Biện Phương Thư
 */
export function getDayStars(lunarDay, lunarMonth, dayCan, dayChi) {
  const goodStars = [];
  const badStars = [];

  const mIdx = (lunarMonth - 1) % 12;
  const monthBranch = MONTH_CHI[mIdx];
  const canChiDayName = `${dayCan} ${dayChi}`;

  // 1. Thiên Đức
  const thienDucTarget = THIEN_DUC_MAP[lunarMonth];
  if (dayCan === thienDucTarget || dayChi === thienDucTarget) {
    goodStars.push({ name: 'Thiên Đức', desc: 'Đức trời che chở, hóa giải mọi tai ương ách nạn, trăm sự cát tường.' });
  }

  // 2. Nguyệt Đức
  const nguyetDucTarget = NGUYET_DUC_MAP[lunarMonth];
  if (dayCan === nguyetDucTarget) {
    goodStars.push({ name: 'Nguyệt Đức', desc: 'Phúc tinh mặt trăng chiếu rọi, vạn sự hanh thông, quý nhân phù trợ.' });
  }

  // 3. Thiên Xá (Đại Cát Thần theo 4 mùa)
  if (
    ([1, 2, 3].includes(lunarMonth) && canChiDayName === 'Mậu Dần') ||
    ([4, 5, 6].includes(lunarMonth) && canChiDayName === 'Giáp Ngọ') ||
    ([7, 8, 9].includes(lunarMonth) && canChiDayName === 'Mậu Thân') ||
    ([10, 11, 12].includes(lunarMonth) && canChiDayName === 'Giáp Tý')
  ) {
    goodStars.push({ name: 'Thiên Xá', desc: 'Đại cát tinh tha tội giải tai, mở cửa phúc lộc, muôn việc đều hưng thịnh.' });
  }

  // 4. Thiên Hỷ
  if (dayChi === THIEN_HY_CHI[mIdx]) {
    goodStars.push({ name: 'Thiên Hỷ', desc: 'Mừng vui cát khánh, đại lợi cho việc cưới hỏi, đính hôn, sum họp gia đình.' });
  }

  // 5. Sinh Khí
  if (dayChi === SINH_KHI_CHI[mIdx]) {
    goodStars.push({ name: 'Sinh Khí', desc: 'Vạn vật sinh sôi nảy nở, đại lợi cho động thổ, trồng trọt, cầu tự con cái.' });
  }

  // 6. Dịch Mã (Tốt cho di chuyển, xuất hành, thăng chuyển)
  const isDichMa =
    (['Thân', 'Tý', 'Thìn'].includes(monthBranch) && dayChi === 'Dần') ||
    (['Dần', 'Ngọ', 'Tuất'].includes(monthBranch) && dayChi === 'Thân') ||
    (['Hợi', 'Mão', 'Mùi'].includes(monthBranch) && dayChi === 'Tỵ') ||
    (['Tỵ', 'Dậu', 'Sửu'].includes(monthBranch) && dayChi === 'Hợi');
  if (isDichMa) {
    goodStars.push({ name: 'Dịch Mã', desc: 'Tốt cho việc xuất hành, đi xa, dời chỗ, nhậm chức xa xứ, mưu sự năng động.' });
  }

  // 7. Lục Hợp & Tam Hợp với tháng
  if (LUC_HOP[monthBranch] === dayChi) {
    goodStars.push({ name: 'Nguyệt Đức Hợp', desc: 'Hòa hợp nhân tâm, tốt cho ký kết, ngoại giao, hòa giải.' });
  } else if (TAM_HOP[monthBranch] && TAM_HOP[monthBranch].includes(dayChi)) {
    goodStars.push({ name: 'Tam Hợp', desc: 'Tam hợp đắc lực, quý nhân tương trợ, công việc thuận buồm xuôi gió.' });
  }

  // --- HUNG TINH ---

  // 8. Kiếp Sát
  const isKiepSat =
    (['Dần', 'Ngọ', 'Tuất'].includes(monthBranch) && dayChi === 'Hợi') ||
    (['Thân', 'Tý', 'Thìn'].includes(monthBranch) && dayChi === 'Tỵ') ||
    (['Hợi', 'Mão', 'Mùi'].includes(monthBranch) && dayChi === 'Thân') ||
    (['Tỵ', 'Dậu', 'Sửu'].includes(monthBranch) && dayChi === 'Dần');
  if (isKiepSat) {
    badStars.push({ name: 'Kiếp Sát', desc: 'Kỵ khởi công, động thổ, cẩn phòng tổn thương đụng dao kéo.' });
  }

  // 9. Tai Sát
  const isTaiSat =
    (['Dần', 'Ngọ', 'Tuất'].includes(monthBranch) && dayChi === 'Tý') ||
    (['Thân', 'Tý', 'Thìn'].includes(monthBranch) && dayChi === 'Ngọ') ||
    (['Hợi', 'Mão', 'Mùi'].includes(monthBranch) && dayChi === 'Dậu') ||
    (['Tỵ', 'Dậu', 'Sửu'].includes(monthBranch) && dayChi === 'Mão');
  if (isTaiSat) {
    badStars.push({ name: 'Tai Sát', desc: 'Đề phòng bệnh tật bất ngờ, tranh chấp tai bay vạ gió.' });
  }

  // 10. Đại Hao & Tiểu Hao
  if (LUC_XUNG[monthBranch] === dayChi) {
    badStars.push({ name: 'Đại Hao', desc: 'Tổn hao tiền của lớn, kỵ kinh doanh đầu tư mua sắm quy mô.' });
  }

  return { goodStars, badStars };
}
