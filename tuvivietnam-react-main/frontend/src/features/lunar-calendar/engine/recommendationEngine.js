/**
 * BỘ CHẤM ĐIỂM CÁT HUNG & ĐỀ XUẤT SỰ VỤ (RECOMMENDATION ENGINE)
 */

export const PURPOSES = [
  { id: 'all', name: 'Tất cả mục đích' },
  { id: 'cuoiHoi', name: 'Cưới hỏi, Đính hôn' },
  { id: 'khaiTruong', name: 'Khai trương, Mở hàng' },
  { id: 'dongTho', name: 'Động thổ, Khởi công' },
  { id: 'nhapTrach', name: 'Nhập trạch, Về nhà mới' },
  { id: 'xuatHanh', name: 'Xuất hành, Đi xa' },
  { id: 'muaXe', name: 'Mua xe, Giao dịch lớn' },
  { id: 'teTu', name: 'Tế tự, Cầu an' },
];

/**
 * Tính điểm Cát Hung tổng quan (1 - 10)
 */
export function calculateDayScore({ isHoangDao, truc, tu, badDays }) {
  let score = 5.0; // Điểm cơ sở bình hòa

  // 1. Hoàng Đạo / Hắc Đạo
  if (isHoangDao) {
    score += 2.5;
  } else {
    score -= 1.8;
  }

  // 2. Thập Nhị Trực
  if (truc.type === 'Cát') {
    score += 1.5;
  } else if (truc.type === 'Hung') {
    score -= 1.8;
  }

  // 3. Nhị Thập Bát Tú
  if (tu.isGood) {
    score += 1.5;
  } else {
    score -= 1.5;
  }

  // 4. Ngày Kỵ Dân Gian
  if (badDays && badDays.length > 0) {
    score -= badDays.length * 1.5;
  }

  // Giới hạn trong khoảng [1, 10]
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

/**
 * Phân tích danh sách việc Nên Làm & Kiêng Cữ
 */
export function evaluateTasks({ truc, tu, isHoangDao, badDays }) {
  const goodSet = new Set();
  const badSet = new Set();

  // Nhặt từ Trực
  if (truc.goodFor) truc.goodFor.forEach((t) => goodSet.add(t));
  if (truc.badFor) truc.badFor.forEach((t) => badSet.add(t));

  // Nhặt từ Tú
  if (tu.goodFor) tu.goodFor.forEach((t) => goodSet.add(t));
  if (tu.badFor) tu.badFor.forEach((t) => badSet.add(t));

  // Nếu là ngày kỵ dân gian
  if (badDays && badDays.length > 0) {
    badDays.forEach((b) => {
      if (b.name.includes('Tam Nương')) {
        badSet.add('Cưới hỏi');
        badSet.add('Xuất hành');
        badSet.add('Động thổ');
      }
      if (b.name.includes('Nguyệt Kỵ')) {
        badSet.add('Khai trương');
        badSet.add('Xuất hành xa');
        badSet.add('Ký hợp đồng');
      }
      if (b.name.includes('Sát Chủ') || b.name.includes('Thụ Tử')) {
        badSet.add('Mọi việc đại sự');
      }
    });
  }

  // Nếu là ngày Hoàng Đạo
  if (isHoangDao) {
    goodSet.add('Cầu tài lộc');
    goodSet.add('Gặp gỡ quý nhân');
  }

  // Lọc trùng: việc nào đã kỵ thì không nên làm
  badSet.forEach((item) => {
    goodSet.delete(item);
  });

  return {
    recommended: Array.from(goodSet),
    avoid: Array.from(badSet),
  };
}
