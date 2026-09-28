/**
 * TÍNH TOÁN TUỔI XUNG KHẮC VỚI NGÀY
 * Phân tích Lục Xung, Thiên Can Phá, Tứ Hành Xung và Tương Hình.
 */

const LUC_XUNG_MAP = {
  Tý: 'Ngọ', Ngọ: 'Tý',
  Sửu: 'Mùi', Mùi: 'Sửu',
  Dần: 'Thân', Thân: 'Dần',
  Mão: 'Dậu', Dậu: 'Mão',
  Thìn: 'Tuất', Tuất: 'Thìn',
  Tỵ: 'Hợi', Hợi: 'Tỵ',
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
 * Tính các tuổi xung khắc trực tiếp với ngày
 */
export function getConflictingAges(dayCan, dayChi) {
  const xungChi = LUC_XUNG_MAP[dayChi] || 'Ngọ';
  const phaCans = CAN_PHA_MAP[dayCan] || ['Mậu', 'Canh'];

  const conflictingAges = phaCans.map((can) => `${can} ${xungChi}`);
  conflictingAges.push(`Tuổi ${xungChi} (nói chung)`);

  return {
    xungChi,
    conflictingAges,
    warning: `Ngày này xung khắc mạnh nhất với các tuổi: ${conflictingAges.join(', ')}. Những người tuổi này không nên đứng mũi chịu sào các đại sự khởi công, cưới hỏi, ký kết trong ngày.`,
  };
}
