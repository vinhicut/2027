/**
 * KHỔNG MINH LỤC DIỆU (6 THẦN CỔ TRUYỀN)
 * Phép tính thời vận nhật dụng kinh điển do Gia Cát Khổng Minh truyền lại.
 */

export const LUC_DIEU_LIST = [
  {
    id: 0,
    name: 'Đại An',
    type: 'Cát',
    rating: 'Đại Cát',
    desc: 'Mọi việc yên ổn, gia đạo thái hòa, cầu tài đắc lợi tại phương Tây Nam, quý nhân nâng đỡ.',
    poem: 'Đại An sự sự đáo / Cầu tài tại Tây Nam / Thất vật thân vị viễn / Gia trạch tất an ninh.',
    goodFor: ['Khai trương', 'Cưới hỏi', 'Xuất hành', 'Cầu tài lộc', 'Nhập trạch'],
    badFor: ['Tranh chấp', 'Kiện tụng'],
  },
  {
    id: 1,
    name: 'Lưu Niên',
    type: 'Bình',
    rating: 'Bình Hòa / Dây Dưa',
    desc: 'Mưu sự chậm trễ, việc làm kéo dài mới có kết quả, cần kiên trì, phòng khẩu thiệt thị phi.',
    poem: 'Lưu Niên sự bất toại / Cầu mưu đa trắc trở / Quan sự tất tri hoãn / Thất vật tại phương Nam.',
    goodFor: ['Lập kế hoạch dài hạn', 'Học tập tích lũy kinh nghiệm'],
    badFor: ['Khai trương gấp gáp', 'Ký hợp đồng cần quyết đoán'],
  },
  {
    id: 2,
    name: 'Tốc Hỷ',
    type: 'Cát',
    rating: 'Đại Cát',
    desc: 'Tin mừng mau chóng tới, cầu tài buổi sáng đại thắng, xuất hành phương Nam gặp nhiều may mắn.',
    poem: 'Tốc Hỷ hỷ lai lâm / Cầu tài tại Nam phương / Thất vật ngọ vị kiến / Quan sự tự hòa giải.',
    goodFor: ['Gặp gỡ đối tác', 'Khai trương', 'Ký kết hợp đồng', 'Cầu tài', 'Tỏ tình / Cầu hôn'],
    badFor: ['Khởi công việc đòi hỏi thời gian dài'],
  },
  {
    id: 3,
    name: 'Xích Khẩu',
    type: 'Hung',
    rating: 'Tiểu Hung',
    desc: 'Dễ sinh cãi vã, khẩu thiệt bất hòa, phòng tiểu nhân gièm pha, việc quan sự tranh chấp bất lợi.',
    poem: 'Xích Khẩu chủ khẩu thiệt / Khẩu thiệt thả đề phòng / Sự sự đa trở ngại / Quan sự hữu kinh hoàng.',
    goodFor: ['Trừ tà', 'Dẹp bỏ mối mọt uế khí'],
    badFor: ['Đàm phán', 'Ký kết', 'Hội họp gia đình', 'Cưới hỏi'],
  },
  {
    id: 4,
    name: 'Tiểu Cát',
    type: 'Cát',
    rating: 'Cát Tinh',
    desc: 'May mắn bình an, quý nhân phù trợ, cầu tài lộc và sức khỏe đều thuận hòa như ý.',
    poem: 'Tiểu Cát tối cát tường / Nhân tài lưỡng phong hưng / Cầu tài đắc như ý / Giao thiệp vạn sự thông.',
    goodFor: ['Gặp gỡ bạn bè', 'Mua sắm', 'Xuất hành', 'Khởi nghiệp nhỏ', 'Cầu an'],
    badFor: ['Làm việc khuất tất'],
  },
  {
    id: 5,
    name: 'Không Vong',
    type: 'Hung',
    rating: 'Hung',
    desc: 'Vạn sự dễ dở dang, hao tổn tâm lực tài của, nên an phận thủ thường, hướng thiện cầu an.',
    poem: 'Không Vong sự nan thành / Cầu mưu đồ phí công / Thất vật nan tầm kiến / Phòng ngừa tiểu nhân xâm.',
    goodFor: ['Tĩnh dưỡng', 'Thiền định', 'Làm việc thiện tích đức'],
    badFor: ['Khai trương', 'Đầu tư lớn', 'Cưới hỏi', 'Xuất hành xa'],
  },
];

/**
 * Tính Khổng Minh Lục Diệu của ngày theo Tháng và Ngày âm lịch
 * Quy tắc:
 * Tháng Giêng khởi Đại An (0), Tháng 2 khởi Lưu Niên (1)...
 * Ngày 1 khởi từ cung Tháng, đi thuận mỗi ngày 1 cung.
 */
export function getDayLucDieu(lunarDay, lunarMonth) {
  const monthStart = (lunarMonth - 1) % 6;
  const dayOffset = (lunarDay - 1) % 6;
  const index = (monthStart + dayOffset) % 6;
  const item = LUC_DIEU_LIST[index];
  return {
    id: item.id,
    name: item.name,
    fullName: `Lục Diệu ${item.name}`,
    type: item.type,
    rating: item.rating,
    desc: item.desc,
    poem: item.poem,
    goodFor: item.goodFor,
    badFor: item.badFor,
  };
}
