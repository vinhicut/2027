/**
 * BỘ PHÂN TÍCH & KHUYẾN NGHỊ SỰ VỤ (TASK ADVISOR)
 * Đánh giá Việc Nên Làm (Nghi) & Kiêng Cữ (Kỵ) cho các đại sự đời người.
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
 * Phân tích danh sách việc Nên Làm & Kiêng Cữ
 */
export function evaluateTasks({ truc, tu, lucDieu, isHoangDao, badDays, stars }) {
  const goodSet = new Set();
  const badSet = new Set();

  // 1. Nhặt từ Thập Nhị Trực
  if (truc?.goodFor) truc.goodFor.forEach((t) => goodSet.add(t));
  if (truc?.badFor) truc.badFor.forEach((t) => badSet.add(t));

  // 2. Nhặt từ Nhị Thập Bát Tú
  if (tu?.goodFor) tu.goodFor.forEach((t) => goodSet.add(t));
  if (tu?.badFor) tu.badFor.forEach((t) => badSet.add(t));

  // 3. Nhặt từ Khổng Minh Lục Diệu
  if (lucDieu?.goodFor) lucDieu.goodFor.forEach((t) => goodSet.add(t));
  if (lucDieu?.badFor) lucDieu.badFor.forEach((t) => badSet.add(t));

  // 4. Nhặt từ Ngày Kỵ Dân Gian (Bách Kỵ)
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
      if (b.name.includes('Sát Chủ') || b.name.includes('Thụ Tử') || b.name.includes('Dương Công Kỵ')) {
        badSet.add('Mọi việc đại sự');
      }
      if (b.name.includes('Vãng Vong')) {
        badSet.add('Xuất hành đi xa');
      }
      if (b.name.includes('Nguyệt Phá')) {
        badSet.add('Động thổ');
        badSet.add('Cưới hỏi');
      }
    });
  }

  // 5. Cát Tinh
  if (isHoangDao) {
    goodSet.add('Cầu tài lộc');
    goodSet.add('Gặp gỡ quý nhân');
  }

  if (stars?.goodStars) {
    stars.goodStars.forEach((s) => {
      if (s.name === 'Thiên Hỷ') goodSet.add('Cưới hỏi');
      if (s.name === 'Sinh Khí') goodSet.add('Động thổ');
      if (s.name === 'Dịch Mã') goodSet.add('Xuất hành');
    });
  }

  // Lọc triệt để: việc nào đã kỵ thì tuyệt đối loại khỏi danh sách khuyến nghị
  badSet.forEach((item) => {
    goodSet.delete(item);
  });

  return {
    recommended: Array.from(goodSet),
    avoid: Array.from(badSet),
  };
}
