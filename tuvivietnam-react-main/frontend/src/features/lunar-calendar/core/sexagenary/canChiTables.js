/**
 * HỆ THỐNG BẢNG TRA THIÊN CAN, ĐỊA CHI, ÂM DƯƠNG & 60 HOA GIÁP NẠP ÂM
 */

export const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

export const CAN_YIN_YANG = {
  Giáp: 'Dương', Ất: 'Âm',
  Bính: 'Dương', Đinh: 'Âm',
  Mậu: 'Dương', Kỷ: 'Âm',
  Canh: 'Dương', Tân: 'Âm',
  Nhâm: 'Dương', Quý: 'Âm',
};

export const CHI_YIN_YANG = {
  Tý: 'Dương', Sửu: 'Âm',
  Dần: 'Dương', Mão: 'Âm',
  Thìn: 'Dương', Tỵ: 'Âm',
  Ngọ: 'Dương', Mùi: 'Âm',
  Thân: 'Dương', Dậu: 'Âm',
  Tuất: 'Dương', Hợi: 'Âm',
};

export const CAN_ELEMENTS = {
  Giáp: 'Mộc', Ất: 'Mộc',
  Bính: 'Hỏa', Đinh: 'Hỏa',
  Mậu: 'Thổ', Kỷ: 'Thổ',
  Canh: 'Kim', Tân: 'Kim',
  Nhâm: 'Thủy', Quý: 'Thủy',
};

export const CHI_ELEMENTS = {
  Tý: 'Thủy', Sửu: 'Thổ', Dần: 'Mộc', Mão: 'Mộc',
  Thìn: 'Thổ', Tỵ: 'Hỏa', Ngọ: 'Hỏa', Mùi: 'Thổ',
  Thân: 'Kim', Dậu: 'Kim', Tuất: 'Thổ', Hợi: 'Thủy',
};

/** 60 Hoa Giáp Ngũ Hành Nạp Âm chuẩn xác */
export const NAP_AM = {
  'Giáp Tý': 'Hải Trung Kim', 'Ất Sửu': 'Hải Trung Kim',
  'Bính Dần': 'Lư Trung Hỏa', 'Đinh Mão': 'Lư Trung Hỏa',
  'Mậu Thìn': 'Đại Lâm Mộc', 'Kỷ Tỵ': 'Đại Lâm Mộc',
  'Canh Ngọ': 'Lộ Bàng Thổ', 'Tân Mùi': 'Lộ Bàng Thổ',
  'Nhâm Thân': 'Kiếm Phong Kim', 'Quý Dậu': 'Kiếm Phong Kim',
  'Giáp Tuất': 'Sơn Đầu Hỏa', 'Ất Hợi': 'Sơn Đầu Hỏa',
  'Bính Tý': 'Giản Hạ Thủy', 'Đinh Sửu': 'Giản Hạ Thủy',
  'Mậu Dần': 'Thành Đầu Thổ', 'Kỷ Mão': 'Thành Đầu Thổ',
  'Canh Thìn': 'Bạch Lạp Kim', 'Tân Tỵ': 'Bạch Lạp Kim',
  'Nhâm Ngọ': 'Dương Liễu Mộc', 'Quý Mùi': 'Dương Liễu Mộc',
  'Giáp Thân': 'Tuyền Trung Thủy', 'Ất Dậu': 'Tuyền Trung Thủy',
  'Bính Tuất': 'Ốc Thượng Thổ', 'Đinh Hợi': 'Ốc Thượng Thổ',
  'Mậu Tý': 'Tích Lịch Hỏa', 'Kỷ Sửu': 'Tích Lịch Hỏa',
  'Canh Dần': 'Tùng Bách Mộc', 'Tân Mão': 'Tùng Bách Mộc',
  'Nhâm Thìn': 'Trường Lưu Thủy', 'Quý Tỵ': 'Trường Lưu Thủy',
  'Giáp Ngọ': 'Sa Trung Kim', 'Ất Mùi': 'Sa Trung Kim',
  'Bính Thân': 'Sơn Hạ Hỏa', 'Đinh Dậu': 'Sơn Hạ Hỏa',
  'Mậu Tuất': 'Bình Địa Mộc', 'Kỷ Hợi': 'Bình Địa Mộc',
  'Canh Tý': 'Bích Thượng Thổ', 'Tân Sửu': 'Bích Thượng Thổ',
  'Nhâm Dần': 'Kim Bạch Kim', 'Quý Mão': 'Kim Bạch Kim',
  'Giáp Thìn': 'Phúc Đăng Hỏa', 'Ất Tỵ': 'Phúc Đăng Hỏa',
  'Bính Ngọ': 'Thiên Hà Thủy', 'Đinh Mùi': 'Thiên Hà Thủy',
  'Mậu Thân': 'Đại Trạch Thổ', 'Kỷ Dậu': 'Đại Trạch Thổ',
  'Canh Tuất': 'Thoa Xuyến Kim', 'Tân Hợi': 'Thoa Xuyến Kim',
  'Nhâm Tý': 'Tang Đố Mộc', 'Quý Sửu': 'Tang Đố Mộc',
  'Giáp Dần': 'Đại Khê Thủy', 'Ất Mão': 'Đại Khê Thủy',
  'Bính Thìn': 'Sa Trung Thổ', 'Đinh Tỵ': 'Sa Trung Thổ',
  'Mậu Ngọ': 'Thiên Thượng Hỏa', 'Kỷ Mùi': 'Thiên Thượng Hỏa',
  'Canh Thân': 'Thạch Lựu Mộc', 'Tân Dậu': 'Thạch Lựu Mộc',
  'Nhâm Tuất': 'Đại Hải Thủy', 'Quý Hợi': 'Đại Hải Thủy',
};

/** Lấy ngũ hành cơ bản từ chuỗi Nạp Âm */
export function getElementFromNapAm(napAmStr) {
  if (!napAmStr) return 'Mộc';
  if (napAmStr.includes('Kim')) return 'Kim';
  if (napAmStr.includes('Mộc')) return 'Mộc';
  if (napAmStr.includes('Thủy')) return 'Thủy';
  if (napAmStr.includes('Hỏa')) return 'Hỏa';
  if (napAmStr.includes('Thổ')) return 'Thổ';
  return 'Thổ';
}
