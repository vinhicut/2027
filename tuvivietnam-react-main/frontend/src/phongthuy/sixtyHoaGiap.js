const NAP_AM_MAP = {
  'Giáp Tý': { napAm: 'Hải Trung Kim (Vàng dưới biển)', element: 'Kim' },
  'Ất Sửu': { napAm: 'Hải Trung Kim (Vàng dưới biển)', element: 'Kim' },
  'Bính Dần': { napAm: 'Lư Trung Hỏa (Lửa trong lò)', element: 'Hỏa' },
  'Đinh Mão': { napAm: 'Lư Trung Hỏa (Lửa trong lò)', element: 'Hỏa' },
  'Mậu Thìn': { napAm: 'Đại Lâm Mộc (Cây rừng lớn)', element: 'Mộc' },
  'Kỷ Tỵ': { napAm: 'Đại Lâm Mộc (Cây rừng lớn)', element: 'Mộc' },
  'Canh Ngọ': { napAm: 'Lộ Bàng Thổ (Đất ven đường)', element: 'Thổ' },
  'Tân Mùi': { napAm: 'Lộ Bàng Thổ (Đất ven đường)', element: 'Thổ' },
  'Nhâm Thân': { napAm: 'Kiếm Phong Kim (Vàng mũi kiếm)', element: 'Kim' },
  'Quý Dậu': { napAm: 'Kiếm Phong Kim (Vàng mũi kiếm)', element: 'Kim' },
  'Giáp Tuất': { napAm: 'Sơn Đầu Hỏa (Lửa trên núi)', element: 'Hỏa' },
  'Ất Hợi': { napAm: 'Sơn Đầu Hỏa (Lửa trên núi)', element: 'Hỏa' },
  'Bính Tý': { napAm: 'Giản Hạ Thủy (Nước khe suối)', element: 'Thủy' },
  'Đinh Sửu': { napAm: 'Giản Hạ Thủy (Nước khe suối)', element: 'Thủy' },
  'Mậu Dần': { napAm: 'Thành Đầu Thổ (Đất trên thành)', element: 'Thổ' },
  'Kỷ Mão': { napAm: 'Thành Đầu Thổ (Đất trên thành)', element: 'Thổ' },
  'Canh Thìn': { napAm: 'Bạch Lạp Kim (Vàng sáp ong)', element: 'Kim' },
  'Tân Tỵ': { napAm: 'Bạch Lạp Kim (Vàng sáp ong)', element: 'Kim' },
  'Nhâm Ngọ': { napAm: 'Dương Liễu Mộc (Cây dương liễu)', element: 'Mộc' },
  'Quý Mùi': { napAm: 'Dương Liễu Mộc (Cây dương liễu)', element: 'Mộc' },
  'Giáp Thân': { napAm: 'Tuyền Trung Thủy (Nước trong suối)', element: 'Thủy' },
  'Ất Dậu': { napAm: 'Tuyền Trung Thủy (Nước trong suối)', element: 'Thủy' },
  'Bính Tuất': { napAm: 'Ốc Thượng Thổ (Đất trên nóc nhà)', element: 'Thổ' },
  'Đinh Hợi': { napAm: 'Ốc Thượng Thổ (Đất trên nóc nhà)', element: 'Thổ' },
  'Mậu Tý': { napAm: 'Tích Lịch Hỏa (Lửa sấm sét)', element: 'Hỏa' },
  'Kỷ Sửu': { napAm: 'Tích Lịch Hỏa (Lửa sấm sét)', element: 'Hỏa' },
  'Canh Dần': { napAm: 'Tùng Bách Mộc (Gỗ tùng bách)', element: 'Mộc' },
  'Tân Mão': { napAm: 'Tùng Bách Mộc (Gỗ tùng bách)', element: 'Mộc' },
  'Nhâm Thìn': { napAm: 'Trường Lưu Thủy (Nước chảy dài)', element: 'Thủy' },
  'Quý Tỵ': { napAm: 'Trường Lưu Thủy (Nước chảy dài)', element: 'Thủy' },
  'Giáp Ngọ': { napAm: 'Sa Trung Kim (Vàng trong cát)', element: 'Kim' },
  'Ất Mùi': { napAm: 'Sa Trung Kim (Vàng trong cát)', element: 'Kim' },
  'Bính Thân': { napAm: 'Sơn Hạ Hỏa (Lửa dưới núi)', element: 'Hỏa' },
  'Đinh Dậu': { napAm: 'Sơn Hạ Hỏa (Lửa dưới núi)', element: 'Hỏa' },
  'Mậu Tuất': { napAm: 'Bình Địa Mộc (Cây đồng bằng)', element: 'Mộc' },
  'Kỷ Hợi': { napAm: 'Bình Địa Mộc (Cây đồng bằng)', element: 'Mộc' },
  'Canh Tý': { napAm: 'Bích Thượng Thổ (Đất tẩm vách)', element: 'Thổ' },
  'Tân Sửu': { napAm: 'Bích Thượng Thổ (Đất tẩm vách)', element: 'Thổ' },
  'Nhâm Dần': { napAm: 'Kim Bạch Kim (Vàng lá trắng)', element: 'Kim' },
  'Quý Mão': { napAm: 'Kim Bạch Kim (Vàng lá trắng)', element: 'Kim' },
  'Giáp Thìn': { napAm: 'Phúc Đăng Hỏa (Lửa đèn dầu)', element: 'Hỏa' },
  'Ất Tỵ': { napAm: 'Phúc Đăng Hỏa (Lửa đèn dầu)', element: 'Hỏa' },
  'Bính Ngọ': { napAm: 'Thiên Hà Thủy (Nước trên trời)', element: 'Thủy' },
  'Đinh Mùi': { napAm: 'Thiên Hà Thủy (Nước trên trời)', element: 'Thủy' },
  'Mậu Thân': { napAm: 'Đại Trạch Thổ (Đất cồn lớn)', element: 'Thổ' },
  'Kỷ Dậu': { napAm: 'Đại Trạch Thổ (Đất cồn lớn)', element: 'Thổ' },
  'Canh Tuất': { napAm: 'Thoa Xuyến Kim (Vàng trang sức)', element: 'Kim' },
  'Tân Hợi': { napAm: 'Thoa Xuyến Kim (Vàng trang sức)', element: 'Kim' },
  'Nhâm Tý': { napAm: 'Tang Đố Mộc (Gỗ cây dâu)', element: 'Mộc' },
  'Quý Sửu': { napAm: 'Tang Đố Mộc (Gỗ cây dâu)', element: 'Mộc' },
  'Giáp Dần': { napAm: 'Đại Khê Thủy (Nước khe lớn)', element: 'Thủy' },
  'Ất Mão': { napAm: 'Đại Khê Thủy (Nước khe lớn)', element: 'Thủy' },
  'Bính Thìn': { napAm: 'Sa Trung Thổ (Đất pha cát)', element: 'Thổ' },
  'Đinh Tỵ': { napAm: 'Sa Trung Thổ (Đất pha cát)', element: 'Thổ' },
  'Mậu Ngọ': { napAm: 'Thiên Thượng Hỏa (Lửa trên trời)', element: 'Hỏa' },
  'Kỷ Mùi': { napAm: 'Thiên Thượng Hỏa (Lửa trên trời)', element: 'Hỏa' },
  'Canh Thân': { napAm: 'Thạch Lựu Mộc (Cây lựu đá)', element: 'Mộc' },
  'Tân Dậu': { napAm: 'Thạch Lựu Mộc (Cây lựu đá)', element: 'Mộc' },
  'Nhâm Tuất': { napAm: 'Đại Hải Thủy (Nước biển lớn)', element: 'Thủy' },
  'Quý Hợi': { napAm: 'Đại Hải Thủy (Nước biển lớn)', element: 'Thủy' },
};

const CAN_LIST = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI_LIST = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const ANIMAL_LIST = ['Chuột', 'Trâu', 'Hổ', 'Mèo', 'Rồng', 'Rắn', 'Ngựa', 'Dê', 'Khỉ', 'Gà', 'Chó', 'Lợn'];

export function calculateCungPhi(year, isMale) {
  let sum = year
    .toString()
    .split('')
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  
  while (sum > 9) {
    sum = sum
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }

  let quaiNumber;
  if (year < 2000) {
    if (isMale) {
      quaiNumber = (11 - sum) % 9;
      if (quaiNumber === 0) quaiNumber = 9;
    } else {
      quaiNumber = (4 + sum) % 9;
      if (quaiNumber === 0) quaiNumber = 9;
    }
  } else {
    if (isMale) {
      quaiNumber = (10 - sum) % 9;
      if (quaiNumber === 0) quaiNumber = 9;
    } else {
      quaiNumber = (5 + sum) % 9;
      if (quaiNumber === 0) quaiNumber = 9;
    }
  }

  switch (quaiNumber) {
    case 1: return 'Khảm';
    case 2: return 'Khôn';
    case 3: return 'Chấn';
    case 4: return 'Tốn';
    case 5: return isMale ? 'Khôn' : 'Cấn';
    case 6: return 'Càn';
    case 7: return 'Đoài';
    case 8: return 'Cấn';
    case 9: return 'Ly';
    default: return 'Khảm';
  }
}

export function getMansionGroup(cung) {
  if (['Khảm', 'Chấn', 'Tốn', 'Ly'].includes(cung)) {
    return 'Đông Tứ Mệnh';
  }
  return 'Tây Tứ Mệnh';
}

export function getYearDetails(year) {
  const canIndex = (((year - 4) % 10) + 10) % 10;
  const can = CAN_LIST[canIndex];

  const chiIndex = (((year - 4) % 12) + 12) % 12;
  const chi = CHI_LIST[chiIndex];
  const lunarAnimal = ANIMAL_LIST[chiIndex];

  const canChi = `${can} ${chi}`;
  const napAmInfo = NAP_AM_MAP[canChi] || {
    napAm: 'Lộ Bàng Thổ',
    element: 'Thổ',
  };

  const maleCung = calculateCungPhi(year, true);
  const femaleCung = calculateCungPhi(year, false);

  const maleGroup = getMansionGroup(maleCung);
  const femaleGroup = getMansionGroup(femaleCung);

  let luckyNumbers = [1, 6];
  if (napAmInfo.element === 'Kim') luckyNumbers = [6, 7, 2, 8];
  else if (napAmInfo.element === 'Mộc') luckyNumbers = [3, 4, 1];
  else if (napAmInfo.element === 'Thủy') luckyNumbers = [1, 6, 7];
  else if (napAmInfo.element === 'Hỏa') luckyNumbers = [9, 3, 4];
  else if (napAmInfo.element === 'Thổ') luckyNumbers = [2, 5, 8, 9];

  let colors = {
    birth: ['Trắng', 'Bạc'],
    same: ['Xanh dương', 'Đen'],
    bad: ['Vàng', 'Nâu đất'],
  };
  if (napAmInfo.element === 'Kim') {
    colors = {
      birth: ['Vàng sậm', 'Nâu đất', 'Hổ phách'],
      same: ['Trắng', 'Xám', 'Ghi', 'Vàng ánh kim'],
      bad: ['Đỏ', 'Hồng', 'Tím', 'Cam (Hỏa khắc Kim)'],
    };
  } else if (napAmInfo.element === 'Mộc') {
    colors = {
      birth: ['Đen', 'Xanh nước biển thẫm (Thủy sinh Mộc)'],
      same: ['Xanh lá cây', 'Xanh ngọc lục bảo'],
      bad: ['Trắng', 'Xám', 'Ghi ánh kim (Kim khắc Mộc)'],
    };
  } else if (napAmInfo.element === 'Thủy') {
    colors = {
      birth: ['Trắng', 'Bạc', 'Xám ghi (Kim sinh Thủy)'],
      same: ['Đen', 'Xanh lam', 'Xanh da trời'],
      bad: ['Vàng đất', 'Nâu đất', 'Cam đất (Thổ khắc Thủy)'],
    };
  } else if (napAmInfo.element === 'Hỏa') {
    colors = {
      birth: ['Xanh lá cây', 'Xanh nõn chuối (Mộc sinh Hỏa)'],
      same: ['Đỏ', 'Hồng', 'Tím', 'Cam tươi'],
      bad: ['Đen', 'Xanh nước biển (Thủy khắc Hỏa)'],
    };
  } else if (napAmInfo.element === 'Thổ') {
    colors = {
      birth: ['Đỏ', 'Hồng', 'Cam', 'Tím (Hỏa sinh Thổ)'],
      same: ['Vàng cát', 'Nâu đất', 'Cà phê'],
      bad: ['Xanh lá cây', 'Xanh ngọc bích (Mộc khắc Thổ)'],
    };
  }

  return {
    year,
    can,
    chi,
    canChi,
    lunarAnimal,
    napAm: napAmInfo.napAm,
    element: napAmInfo.element,
    maleCung,
    femaleCung,
    maleGroup,
    femaleGroup,
    luckyNumbers,
    colorColors: colors,
  };
}
