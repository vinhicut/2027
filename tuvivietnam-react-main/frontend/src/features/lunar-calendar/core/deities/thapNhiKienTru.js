/**
 * THẬP NHỊ KIẾN TRỪ (12 TRỰC)
 * Dựa trên phép chọn ngày kinh điển Đổng Công Tuyển Trạch Yếu Quyết & Hiệp Kỷ Biện Phương Thư.
 */

export const TRUC_LIST = [
  {
    name: 'Kiến',
    type: 'Bình',
    rating: 'Bình Hòa',
    desc: 'Khởi đầu sinh sôi, vạn vật đâm chồi nảy lộc.',
    goodFor: ['Xuất hành', 'Cầu tài lộc', 'Nhậm chức', 'Gặp gỡ bàn việc lớn'],
    badFor: ['Động thổ', 'Đào móng', 'Chôn cất'],
  },
  {
    name: 'Trừ',
    type: 'Cát',
    rating: 'Cát Tinh',
    desc: 'Trừ khử cái xấu, xua tan tai ương uế khí, làm sạch không gian.',
    goodFor: ['Chữa bệnh', 'Tẩy uế', 'Dọn dẹp nhà cửa', 'Cắt tóc', 'Giải oan trừ tà'],
    badFor: ['Khai trương', 'Cưới hỏi', 'Ký hợp đồng đầu tư'],
  },
  {
    name: 'Mãn',
    type: 'Cát',
    rating: 'Đại Cát',
    desc: 'Viên mãn, tròn đầy, sung túc của cải và tài lộc.',
    goodFor: ['Khai trương', 'Cầu tài lộc', 'Mở kho', 'Nhập trạch', 'Tiệc mừng'],
    badFor: ['Khởi công đào đất', 'Chôn cất', 'Tranh chấp kiện tụng'],
  },
  {
    name: 'Bình',
    type: 'Bình',
    rating: 'Bình Hòa',
    desc: 'Bình ổn, yên ổn, vạn sự dĩ hòa vi quý.',
    goodFor: ['Sửa sang nhà cửa', 'San nền đắp bờ', 'Hòa giải tranh chấp', 'Du lịch nghỉ dưỡng'],
    badFor: ['Cưới hỏi', 'Ký hợp đồng đầu tư mạo hiểm'],
  },
  {
    name: 'Định',
    type: 'Cát',
    rating: 'Cát Tinh',
    desc: 'Định liệu vững bền, lâu dài muôn thuở.',
    goodFor: ['Cưới hỏi', 'Ký giao kèo', 'Mua bán nhà đất', 'Hội họp gia đình'],
    badFor: ['Kiện tụng', 'Tranh chấp', 'Chữa bệnh hiểm nghèo'],
  },
  {
    name: 'Chấp',
    type: 'Bình',
    rating: 'Bình Hòa',
    desc: 'Nắm giữ, tuân thủ nguyên tắc, kiên trì theo đuổi.',
    goodFor: ['Gieo trồng', 'Bắt giữ trộm cắp', 'Xây dựng hàng rào tường bao', 'Nghiên cứu học tập'],
    badFor: ['Chuyển nhà', 'Mở kho xuất tiền', 'Khai trương'],
  },
  {
    name: 'Phá',
    type: 'Hung',
    rating: 'Đại Hung',
    desc: 'Đổ vỡ, hao tán, phá bỏ cái cũ để dọn đường cho cái mới.',
    goodFor: ['Phá dỡ công trình cũ', 'Chữa bệnh nan y', 'Trừ khử mối mọt rác thải'],
    badFor: ['Cưới hỏi', 'Khai trương', 'Ký hợp đồng', 'Động thổ', 'Mua xe mới'],
  },
  {
    name: 'Nguy',
    type: 'Hung',
    rating: 'Tiểu Hung',
    desc: 'Hiểm nguy, trắc trở, cần cẩn trọng từng bước đi.',
    goodFor: ['Tế tự cầu an', 'Cúng bái thần linh', 'Làm việc thiện tích đức'],
    badFor: ['Leo núi', 'Đi thuyền vượt biển', 'Khởi công xây nhà cao tầng'],
  },
  {
    name: 'Thành',
    type: 'Cát',
    rating: 'Đại Cát',
    desc: 'Thành tựu mỹ mãn, vạn sự hanh thông, công thành danh toại.',
    goodFor: ['Khai trương', 'Cưới hỏi', 'Nhập trạch', 'Ký hợp đồng', 'Mua xe', 'Thi cử'],
    badFor: ['Kiện tụng kiện cáo', 'Tranh giành tài sản'],
  },
  {
    name: 'Thâu',
    type: 'Cát',
    rating: 'Cát Tinh',
    desc: 'Thu hoạch, gặt hái thành quả, đón tài nạp lộc.',
    goodFor: ['Thu nợ', 'Gặt hái', 'Mua sắm tích trữ', 'Cất giữ tiền bạc', 'Nhập học học nghề'],
    badFor: ['Chữa bệnh', 'Tổ chức tang lễ', 'Xuất hành đi xa'],
  },
  {
    name: 'Khai',
    type: 'Cát',
    rating: 'Đại Cát',
    desc: 'Khai mở vận may, rực rỡ tiền đồ, trăm hoa đua nở.',
    goodFor: ['Khai trương', 'Cưới hỏi', 'Động thổ', 'Nhập học', 'Ký hợp đồng', 'Nhập trạch'],
    badFor: ['Chôn cất', 'Làm việc khuất tất'],
  },
  {
    name: 'Bế',
    type: 'Hung',
    rating: 'Tiểu Hung',
    desc: 'Ngăn bế, bế tắc, thích hợp đóng cửa giữ gìn bảo mật.',
    goodFor: ['Đắp đê ngăn nước', 'Xây hầm', 'Cất giữ tài liệu bảo mật'],
    badFor: ['Chữa mắt', 'Khai trương cửa hàng', 'Cưới hỏi', 'Cầu tài lộc'],
  },
];

/**
 * Tính Trực của ngày theo tháng âm lịch và địa chi của ngày
 * Tháng 1 (Dần) khởi Kiến tại Dần (index 2)
 * Tháng m: khởi Kiến tại Chi = (m + 1) % 12
 */
export function getDayTruc(lunarMonth, dayChiIndex) {
  const startChi = (lunarMonth + 1) % 12;
  const trucIndex = (dayChiIndex - startChi + 12) % 12;
  const truc = TRUC_LIST[trucIndex];
  return {
    trucIndex,
    name: truc.name,
    fullName: `Trực ${truc.name}`,
    type: truc.type,
    rating: truc.rating,
    desc: truc.desc,
    goodFor: truc.goodFor,
    badFor: truc.badFor,
  };
}
