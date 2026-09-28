/**
 * HƯỚNG XUẤT HÀNH (HỶ THẦN, TÀI THẦN & HẠC THẦN)
 * Phép tra cứu hướng cát tinh tiếp dẫn khi ra khỏi nhà.
 */

const HY_THAN_MAP = {
  Giáp: 'Đông Bắc', Kỷ: 'Đông Bắc',
  Ất: 'Tây Bắc', Canh: 'Tây Bắc',
  Bính: 'Tây Nam', Tân: 'Tây Nam',
  Đinh: 'Chính Nam', Nhâm: 'Chính Nam',
  Mậu: 'Đông Nam', Quý: 'Đông Nam',
};

const TAI_THAN_MAP = {
  Giáp: 'Đông Nam', Ất: 'Đông Nam',
  Bính: 'Chính Đông', Đinh: 'Chính Đông',
  Mậu: 'Chính Bắc', Kỷ: 'Chính Nam',
  Canh: 'Tây Nam', Tân: 'Tây Nam',
  Nhâm: 'Chính Tây', Quý: 'Chính Bắc',
};

const HAC_THAN_MAP = {
  Tý: 'Chính Nam', Sửu: 'Đông Nam', Dần: 'Chính Đông', Mão: 'Đông Bắc',
  Thìn: 'Chính Bắc', Tỵ: 'Tây Bắc', Ngọ: 'Chính Tây', Mùi: 'Tây Nam',
  Thân: 'Chính Nam', Dậu: 'Đông Nam', Tuất: 'Chính Đông', Hợi: 'Đông Bắc',
};

/**
 * Lấy hướng xuất hành tốt (Hỷ Thần, Tài Thần) và hướng kỵ (Hạc Thần)
 */
export function getDepartureDirections(dayCan, dayChi) {
  const hyThan = HY_THAN_MAP[dayCan] || 'Đông Nam';
  const taiThan = TAI_THAN_MAP[dayCan] || 'Chính Nam';
  const hacThan = HAC_THAN_MAP[dayChi] || 'Chính Bắc';

  return {
    hyThan,
    taiThan,
    hacThan,
    advice: `Xuất hành hướng ${hyThan} đón Hỷ Thần (may mắn, niềm vui). Hướng ${taiThan} đón Tài Thần (tài lộc, thịnh vượng). Nên tránh hướng ${hacThan} (Hạc Thần hung tinh).`,
  };
}
