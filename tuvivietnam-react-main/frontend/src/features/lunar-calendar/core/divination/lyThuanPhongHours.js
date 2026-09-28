/**
 * GIỜ XUẤT HÀNH LÝ THUẦN PHONG
 * Thuật chọn giờ xuất hành cổ điển phối hợp Khổng Minh Lục Diệu cho 12 giờ trong ngày.
 */

export const LY_THUAN_PHONG_STATES = [
  {
    name: 'Đại An',
    isGood: true,
    rating: 'Đại Cát',
    desc: 'Xuất hành giờ này đa phần bình an, cầu tài đi hướng Tây Nam, người xuất hành đều được bình an khỏe mạnh.',
  },
  {
    name: 'Tốc Hỷ',
    isGood: true,
    rating: 'Đại Cát',
    desc: 'Tin vui mau đến, khởi hành việc gì cũng hanh thông, cầu tài hướng Nam gặp nhiều may mắn, việc làm ăn mau chóng phát đạt.',
  },
  {
    name: 'Lưu Niên',
    isGood: false,
    rating: 'Bình / Chậm',
    desc: 'Mưu sự chậm trễ, việc kéo dài, người đi chưa thấy về, nên kiên nhẫn làm việc chu đáo, đề phòng tranh chấp khẩu thiệt.',
  },
  {
    name: 'Xích Khẩu',
    isGood: false,
    rating: 'Hung',
    desc: 'Dễ xảy ra tranh cãi, lời ăn tiếng nói bất hòa, việc quan sự khó khăn, nên hòa nhã nhẫn nhịn tránh thị phi.',
  },
  {
    name: 'Tiểu Cát',
    isGood: true,
    rating: 'Cát Tinh',
    desc: 'Gặp nhiều may mắn, buôn bán có lời, người đi sắp về, phụ nữ có tin mừng, vạn sự thuận hòa hòa khí sinh tài.',
  },
  {
    name: 'Tuyệt Lộ',
    isGood: false,
    rating: 'Đại Hung',
    desc: 'Cầu tài không có lợi, xuất hành dễ gặp trục trặc, việc lớn dễ dở dang, nên tĩnh dưỡng hoặc làm việc thiện cầu an.',
  },
];

/**
 * Tính Giờ Lý Thuần Phong cho 12 khung giờ trong ngày
 * @param {number} lunarDay Ngày âm lịch
 * @param {number} lunarMonth Tháng âm lịch
 * @param {Array} hourlyCanChiList Danh sách 12 giờ can chi trong ngày
 */
export function getLyThuanPhongHours(lunarDay, lunarMonth, hourlyCanChiList) {
  // Điểm khởi đầu của ngày theo Lục Diệu
  const dayBase = ((lunarMonth - 1) + (lunarDay - 1)) % 6;

  return hourlyCanChiList.map((hr, idx) => {
    const stateIndex = (dayBase + idx) % 6;
    const state = LY_THUAN_PHONG_STATES[stateIndex];
    return {
      ...hr,
      lyThuanPhong: {
        name: state.name,
        isGood: state.isGood,
        rating: state.rating,
        desc: state.desc,
      },
    };
  });
}
