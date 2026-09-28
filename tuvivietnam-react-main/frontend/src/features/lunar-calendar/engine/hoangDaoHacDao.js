/**
 * THUẬT TOÁN HOÀNG ĐẠO & HẮC ĐẠO
 * Xác định Ngày Hoàng Đạo / Hắc Đạo và 12 Khung Giờ Hoàng Đạo / Hắc Đạo trong ngày.
 */

export const DEITIES = [
  { name: 'Thanh Long', isHoangDao: true, type: 'Hoàng Đạo', rating: 'Đại Cát', desc: 'Thần tài lộc, trăm sự đều hanh thông, cưới hỏi khai trương đại lợi.' },
  { name: 'Minh Đường', isHoangDao: true, type: 'Hoàng Đạo', rating: 'Đại Cát', desc: 'Quý nhân phù trợ, thuận lợi cho việc thi cử, thăng quan, giao tế.' },
  { name: 'Thiên Hình', isHoangDao: false, type: 'Hắc Đạo', rating: 'Tiểu Hung', desc: 'Kỵ kiện tụng, tranh chấp; cẩn trọng thị phi điều tiếng.' },
  { name: 'Chu Tước', isHoangDao: false, type: 'Hắc Đạo', rating: 'Hung', desc: 'Kỵ khẩu thiệt, lời ăn tiếng nói, tranh chấp giấy tờ giao kèo.' },
  { name: 'Kim Quỹ', isHoangDao: true, type: 'Hoàng Đạo', rating: 'Cát', desc: 'Kho vàng bạc, rất tốt cho việc ký kết hợp đồng, tích trữ của cải.' },
  { name: 'Bảo Quang', isHoangDao: true, type: 'Hoàng Đạo', rating: 'Cát', desc: 'Còn gọi là Kim Đường, phát quang vinh hiển, vạn sự hanh thông.' },
  { name: 'Bạch Hổ', isHoangDao: false, type: 'Hắc Đạo', rating: 'Đại Hung', desc: 'Kỵ xuất hành, khởi công, nhập trạch; cẩn trọng thương tích.' },
  { name: 'Ngọc Đường', isHoangDao: true, type: 'Hoàng Đạo', rating: 'Đại Cát', desc: 'Thiên tinh tốt cho mưu sự lớn, thi cử, kết hôn, nhập trạch.' },
  { name: 'Thiên Lao', isHoangDao: false, type: 'Hắc Đạo', rating: 'Hung', desc: 'Khó khăn tắc trở, không nên làm việc lớn trọng đại.' },
  { name: 'Huyền Vũ', isHoangDao: false, type: 'Hắc Đạo', rating: 'Hung', desc: 'Kỵ tiểu nhân gièm pha, mất trộm của cải, kiện tụng bất lợi.' },
  { name: 'Tư Mệnh', isHoangDao: true, type: 'Hoàng Đạo', rating: 'Cát', desc: 'Thần chủ sinh sôi, phúc lộc trường thọ, rất tốt để làm việc thiện.' },
  { name: 'Câu Trận', isHoangDao: false, type: 'Hắc Đạo', rating: 'Tiểu Hung', desc: 'Chậm trễ, vướng mắc trong việc dời đổi, đi xa, xây cất.' },
];

/**
 * Xác định Ngày Hoàng Đạo / Hắc Đạo của ngày âm lịch
 * @param {number} lunarMonth Tháng âm lịch (1..12)
 * @param {number} dayChiIndex Địa chi của ngày (0: Tý .. 11: Hợi)
 */
export function getDayHoangDao(lunarMonth, dayChiIndex) {
  // Điểm khởi đầu của Thanh Long theo tháng âm
  // Tháng 1,7: Tý(0); Tháng 2,8: Dần(2); Tháng 3,9: Thìn(4); Tháng 4,10: Ngọ(6); Tháng 5,11: Thân(8); Tháng 6,12: Tuất(10)
  const startChi = ((lunarMonth - 1) % 6) * 2;
  const offset = (dayChiIndex - startChi + 12) % 12;
  const deity = DEITIES[offset];
  return {
    deityName: deity.name,
    isHoangDao: deity.isHoangDao,
    type: deity.type,
    rating: deity.rating,
    desc: deity.desc,
    badgeText: `${deity.name} ${deity.type}`,
  };
}

/**
 * Tính toán 12 Giờ Hoàng Đạo / Hắc Đạo trong ngày theo Địa Chi của Ngày
 * @param {number} dayChiIndex Địa chi ngày (0: Tý .. 11: Hợi)
 * @param {Array} hourlyCanChiList Danh sách 12 giờ can chi đã tính từ Ngũ Thử Độn
 */
export function getDayHourlyDeities(dayChiIndex, hourlyCanChiList) {
  // Điểm khởi đầu Thanh Long theo chi ngày:
  // Tý/Ngọ: Tý(0) | Sửu/Mùi: Dần(2) | Dần/Thân: Thìn(4) | Mão/Dậu: Ngọ(6) | Thìn/Tuất: Thân(8) | Tỵ/Hợi: Tuất(10)
  const startHourChi = (dayChiIndex % 6) * 2;

  return hourlyCanChiList.map((hr) => {
    const offset = (hr.chiIndex - startHourChi + 12) % 12;
    const deity = DEITIES[offset];
    return {
      ...hr,
      deityName: deity.name,
      isHoangDao: deity.isHoangDao,
      type: deity.type,
      rating: deity.rating,
      desc: deity.desc,
    };
  });
}
