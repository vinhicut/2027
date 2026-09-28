/**
 * BỘ CHẤM ĐIỂM CÁT HUNG KHOA HỌC & ĐA CHIỀU (DAY SCORING ENGINE)
 * Tổng hợp trọng số từ Hoàng Đạo, Thập Nhị Trực, Nhị Thập Bát Tú, Khổng Minh Lục Diệu và Bách Thần Sát.
 */

export function calculateDayScore({ isHoangDao, truc, tu, lucDieu, badDays, stars }) {
  let score = 5.0; // Điểm cơ sở bình hòa

  // 1. Hoàng Đạo / Hắc Đạo (Trọng số 2.0)
  if (isHoangDao) {
    score += 2.0;
  } else {
    score -= 1.5;
  }

  // 2. Thập Nhị Trực (Trọng số 1.5)
  if (truc?.type === 'Cát') {
    score += 1.5;
  } else if (truc?.type === 'Hung') {
    score -= 1.8;
  }

  // 3. Nhị Thập Bát Tú (Trọng số 1.5)
  if (tu?.isGood) {
    score += 1.5;
  } else {
    score -= 1.5;
  }

  // 4. Khổng Minh Lục Diệu (Trọng số 1.0)
  if (lucDieu?.type === 'Cát') {
    score += 1.0;
  } else if (lucDieu?.type === 'Hung') {
    score -= 1.2;
  }

  // 5. Cát Tinh hỗ trợ
  if (stars?.goodStars && stars.goodStars.length > 0) {
    score += Math.min(2.0, stars.goodStars.length * 0.5);
  }

  // 6. Hung Tinh & Ngày Kỵ Dân Gian (Phạt nặng)
  if (badDays && badDays.length > 0) {
    score -= badDays.length * 1.5;
  }

  if (stars?.badStars && stars.badStars.length > 0) {
    score -= Math.min(2.0, stars.badStars.length * 0.6);
  }

  // Giới hạn trong khoảng [1.0, 10.0]
  score = Math.max(1.0, Math.min(10.0, score));
  const rounded = Math.round(score * 10) / 10;

  let label = 'Bình Hòa';
  let badgeClass = 'badge-normal';
  if (rounded >= 8.5) {
    label = 'Đại Cát';
    badgeClass = 'badge-great';
  } else if (rounded >= 7.0) {
    label = 'Cát Nhật';
    badgeClass = 'badge-good';
  } else if (rounded <= 3.5) {
    label = 'Đại Hung';
    badgeClass = 'badge-danger';
  } else if (rounded < 5.0) {
    label = 'Tiểu Hung';
    badgeClass = 'badge-warning';
  }

  return {
    score: rounded,
    label,
    badgeClass,
  };
}
