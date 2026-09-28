# Module Phong Thủy Bát Trạch Minh Kính (React JSX / JavaScript)

Module tra cứu phong thủy nhà ở Bát Trạch, cung mệnh gia chủ, đối chiếu tuổi vợ chồng và kích hoạt đào hoa cho nam gia chủ độc thân. Được viết hoàn toàn bằng **React JSX (.jsx) và JavaScript (.js)** thuần túy, không chứa cú pháp TypeScript, sẵn sàng để copy và tích hợp vào bất kỳ website React (Vite, Next.js, Create React App, Remix...) nào.

---

## 1. Cài đặt các package cần thiết

Trong file `package.json` của website bạn, chỉ cần có các thư viện sau:

```bash
npm install lucide-react
```

Yêu cầu môi trường:
- `react`: `^18.0.0` hoặc `^19.0.0`
- `react-dom`: `^18.0.0` hoặc `^19.0.0`
- `lucide-react`: `^0.400.0` trở lên (dùng cho hệ thống icon phong thủy)
- `tailwindcss`: `^3.0.0` hoặc `^4.0.0` (dự án sử dụng các class Tailwind CSS tiện ích)

---

## 2. Cấu trúc thư mục module

Chỉ cần sao chép toàn bộ thư mục `phongthuy` vào thư mục `components` của dự án bạn:

```text
src/components/phongthuy/
├── index.js                     # File export toàn bộ module & PhongThuyWidget
├── PhongThuyWidget.jsx          # Component chính tích hợp toàn bộ tính năng
├── Header.jsx                   # Thanh tiêu đề & thanh điều hướng tab
├── SelectorBar.jsx              # Thanh chọn năm sinh nam gia chủ & tình trạng hôn nhân
├── OverviewCard.jsx             # Thẻ bản mệnh, cung phi, ngũ hành nạp âm
├── DirectionsSection.jsx        # 8 phương vị cát hung & bảng đối chiếu 2 vợ chồng
├── InteractiveCompass.jsx       # La bàn Bát Quái 360° tương tác
├── SpouseCompatibilitySection.jsx # Luận giải hợp tuổi vợ chồng (thang điểm 10)
├── SingleHomeownerGuide.jsx     # Chuyên mục gia chủ độc thân & tìm tuổi hợp
├── HomeLayoutGuide.jsx          # Cẩm nang bố trí không gian (Tọa hung hướng cát)
├── fengShuiData.js              # Dữ liệu Bát Quái, ngũ hành, phương vị
├── sixtyHoaGiap.js              # 60 hoa giáp & thuật toán tính Cung Phi
└── fengShuiLogic.js             # Thuật toán đánh giá hướng & hôn nhân
```

---

## 3. Cách sử dụng nhanh (Quick Start)

### Cách 1: Sử dụng trọn gói Component `PhongThuyWidget` (Khuyên dùng)

```jsx
import React from 'react';
import PhongThuyWidget from './components/phongthuy';
// hoặc: import { PhongThuyWidget } from './components/phongthuy';

export default function TrangPhongThuy() {
  return (
    <div className="w-full min-h-screen bg-[#F8F6F0] p-4">
      <PhongThuyWidget
        initialHusbandYear={1990}   // Mặc định năm sinh nam gia chủ
        initialWifeYear={1992}      // Mặc định năm sinh nữ (vợ)
        initialIsSingle={false}     // true nếu muốn mở chế độ độc thân mặc định
      />
    </div>
  );
}
```

### Cách 2: Sử dụng các hàm tính toán logic độc lập trong code của bạn

Nếu bạn chỉ muốn tính toán phong thủy để lấy dữ liệu (API, tính toán form riêng):

```jsx
import {
  getYearDetails,
  getDirectionsEvaluation,
  evaluateSpouseCompatibility,
} from './components/phongthuy';

// 1. Lấy thông tin bản mệnh năm sinh
const giaChu = getYearDetails(1990);
console.log(giaChu);
// -> { canChi: "Canh Ngọ", maleCung: "Khảm", maleGroup: "Đông Tứ Mệnh", element: "Thổ", napAm: "Lộ Bàng Thổ", ... }

// 2. Lấy danh sách 8 hướng nhà cát hung theo cung phi gia chủ
const huongNha = getDirectionsEvaluation(giaChu.maleCung);
console.log(huongNha);
// -> Danh sách 8 hướng (Sinh Khí, Thiên Y, Diên Niên, Phục Vị, Tuyệt Mệnh, Ngũ Quỷ, Lục Sát, Họa Hại) kèm khuyến nghị cửa, bếp, phòng ngủ...

// 3. Đánh giá độ hòa hợp tuổi vợ chồng
const ketQuaHonNhan = evaluateSpouseCompatibility(1990, 1992);
console.log(ketQuaHonNhan);
// -> { score: 9.2, rating: "Đại Cát (Rất Tốt)", cungPhi: {...}, nguHanh: {...}, diaChi: {...}, thienCan: {...}, remedySolutions: [...] }
```
