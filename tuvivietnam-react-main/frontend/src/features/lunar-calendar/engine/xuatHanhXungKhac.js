/**
 * HƯỚNG XUẤT HÀNH & TUỔI XUNG KHẮC VỚI NGÀY
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

const LUC_XUNG_MAP = {
  Tý: 'Ngọ', Sửu: 'Mùi', Dần: 'Thân', Mão: 'Dậu',
  Thìn: 'Tuất', Tỵ: 'Hợi', Ngọ: 'Tý', Mùi: 'Sửu',
  Thân: 'Dần', Dậu: 'Mão', Tuất: 'Thìn', Hợi: 'Tỵ',
};

const CAN_PHA_MAP = {
  Giáp: ['Mậu', 'Canh'],
  Ất: ['Kỷ', 'Tân'],
  Bính: ['Canh', 'Nhâm'],
  Đinh: ['Tân', 'Quý'],
  Mậu: ['Nhâm', 'Giáp'],
  Kỷ: ['Quý', 'Ất'],
  Canh: ['Giáp', 'Bính'],
  Tân: ['Ất', 'Đinh'],
  Nhâm: ['Bính', 'Mậu'],
  Quý: ['Đinh', 'Kỷ'],
};

/**
 * Lấy hướng xuất hành tốt (Hỷ Thần, Tài Thần) và hướng kỵ (Hạc Thần)
 */
export function getDepartureDirections(dayCan, dayChi) {
  return {
    hyThan: HY_THAN_MAP[dayCan] || 'Đông Nam',
    taiThan: TAI_THAN_MAP[dayCan] || 'Chính Nam',
    hacThan: HAC_THAN_MAP[dayChi] || 'Chính Bắc',
    advice: `Xuất hành hướng ${HY_THAN_MAP[dayCan] || 'Đông Nam'} đón Hỷ Thần cầu may mắn, hỷ sự. Hướng ${TAI_THAN_MAP[dayCan] || 'Chính Nam'} đón Tài Thần cầu tài lộc buôn bán. Tránh hướng ${HAC_THAN_MAP[dayChi] || 'Chính Bắc'} (Hạc Thần).`,
  };
}

/**
 * Tính các tuổi xung khắc trực tiếp với ngày
 */
export function getConflictingAges(dayCan, dayChi) {
  const xungChi = LUC_XUNG_MAP[dayChi] || 'Ngọ';
  const phaCans = CAN_PHA_MAP[dayCan] || ['Mậu', 'Canh'];

  const conflictingAges = phaCans.map((can) => `${can} ${xungChi}`);
  // Thêm chính xung chi
  conflictingAges.push(`Tuổi ${xungChi} (nói chung)`);

  return {
    xungChi,
    conflictingAges,
    warning: `Ngày này xung khắc mạnh nhất với các tuổi: ${conflictingAges.join(', ')}. Những người tuổi này không nên đứng mũi chịu sào các đại sự khởi công, cưới hỏi, ký kết trong ngày.`,
  };
}
