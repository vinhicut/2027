/**
 * THUẬT TOÁN HOÀNG ĐẠO & HẮC ĐẠO CỔ ĐIỂN
 * Xác định Ngày Hoàng Đạo / Hắc Đạo và 12 Khung Giờ Hoàng Đạo / Hắc Đạo.
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
  { name: 'Thiên Lao', isHoangDao: false, type: 'Hắc Đạo', rating: 'Hung', desc: 'Khó khăn trắc trở, không nên tiến hành việc trọng đại.' },
  { name: 'Huyền Vũ', isHoangDao: false, type: 'Hắc Đạo', rating: 'Hung', desc: 'Kỵ tiểu nhân gièm pha, mất trộm của cải, kiện tụng bất lợi.' },
  { name: 'Tư Mệnh', isHoangDao: true, type: 'Hoàng Đạo', rating: 'Cát', desc: 'Thần chủ sinh sôi, phúc lộc trường thọ, rất tốt để làm việc thiện, cầu phúc.' },
  { name: 'Câu Trận', isHoangDao: false, type: 'Hắc Đạo', rating: 'Tiểu Hung', desc: 'Chậm trễ, vướng mắc trong việc dời đổi, đi xa, xây cất.' },
];

/**
 * Xác định Ngày Hoàng Đạo / Hắc Đạo của ngày âm lịch
 * Quy tắc:
 * Tháng 1, 7: Thanh Long khởi Tý (0)
 * Tháng 2, 8: Thanh Long khởi Dần (2)
 * Tháng 3, 9: Thanh Long khởi Thìn (4)
 * Tháng 4, 10: Thanh Long khởi Ngọ (6)
 * Tháng 5, 11: Thanh Long khởi Thân (8)
 * Tháng 6, 12: Thanh Long khởi Tuất (10)
 */
export function getDayHoangDao(lunarMonth, dayChiIndex) {
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
 * Quy tắc khởi Thanh Long theo Chi ngày:
 * - Tý, Ngọ: khởi tại Tý (0)
 * - Sửu, Mùi: khởi tại Dần (2)
 * - Dần, Thân: khởi tại Thìn (4)
 * - Mão, Dậu: khởi tại Ngọ (6)
 * - Thìn, Tuất: khởi tại Thân (8)
 * - Tỵ, Hợi: khởi tại Tuất (10)
 */
export function getDayHourlyDeities(dayChiIndex, hourlyCanChiList) {
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
