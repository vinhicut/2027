/**
 * constants.js
 * Các hằng số định dạng và ưu tiên hiển thị giao diện lá số Tử Vi.
 */

const CHI_HANH = ["thuy", "tho", "moc", "moc", "tho", "hoa", "hoa", "tho", "kim", "kim", "tho", "thuy"];

const SAO_NGU_HANH = {
    "Tử Vi": "tho", "Liêm Trinh": "hoa", "Thiên Đồng": "thuy", "Vũ Khúc": "kim", "Thái Dương": "hoa",
    "Thiên Cơ": "moc", "Thiên Phủ": "tho", "Thái Âm": "thuy", "Tham Lang": "thuy", "Cự Môn": "thuy",
    "Thiên Tướng": "thuy", "Thiên Lương": "moc", "Thất Sát": "kim", "Phá Quân": "thuy",
    "Kình Dương": "kim", "Đà La": "kim", "Hỏa Tinh": "hoa", "Hoả Tinh": "hoa", "Linh Tinh": "hoa",
    "Địa Không": "hoa", "Địa Kiếp": "hoa", "Hóa Lộc": "moc", "Hóa Quyền": "thuy", "Hóa Khoa": "thuy", "Hóa Kỵ": "thuy",
    "Lộc Tồn": "tho", "Bác Sỹ": "thuy", "Lực Sĩ": "hoa", "Thanh Long": "thuy", "Tiểu Hao": "hoa",
    "Tướng Quân": "moc", "Tấu Thư": "kim", "Phi Liêm": "hoa", "Hỷ Thần": "hoa", "Hỉ Thần": "hoa", "Bệnh Phù": "tho",
    "Đại Hao": "hoa", "Phục Binh": "hoa", "Quan Phủ": "hoa",
    "Thái Tuế": "hoa", "Thiếu Dương": "hoa", "Tang Môn": "moc", "Thiếu Âm": "thuy", "Quan Phù": "hoa",
    "Tử Phù": "kim", "Tuế Phá": "hoa", "Long Đức": "thuy", "Bạch Hổ": "kim", "Phúc Đức": "tho",
    "Điếu Khách": "hoa", "Trực Phù": "hoa",
    "Tả Phù": "tho", "Hữu Bật": "tho", "Văn Xương": "kim", "Văn Khúc": "thuy",
    "Thiên Khôi": "hoa", "Thiên Việt": "hoa", "Tam Thai": "thuy", "Bát Tọa": "thuy",
    "Ân Quang": "moc", "Thiên Quý": "tho", "Hồng Loan": "thuy", "Thiên Hỷ": "thuy",
    "Đào Hoa": "moc", "Hoa Cái": "kim", "Thiên Mã": "hoa", "Kiếp Sát": "hoa", "Phá Toái": "hoa",
    "Cô Thần": "hoa", "Quả Tú": "tho", "Thiên Khốc": "thuy", "Thiên Hư": "thuy",
    "Long Trì": "thuy", "Phượng Các": "tho", "Giải Thần": "moc", "Địa Giải": "tho", "Thiên Giải": "hoa",
    "Thiên Hình": "hoa", "Thiên Riêu": "thuy", "Thiên Diêu": "thuy", "Thiên Y": "thuy", "Thai Phụ": "kim", "Phong Cáo": "tho",
    "Quốc Ấn": "tho", "Đường Phù": "moc", "Thiên Quan": "hoa", "Thiên Phúc": "tho",
    "Thiên Trù": "tho", "Lưu Hà": "thuy", "LN Văn Tinh": "hoa", "Thiên Không": "hoa",
    "Thiên La": "kim", "Địa Võng": "tho", "Thiên Thương": "tho", "Thiên Sứ": "thuy",
    "Thiên Tài": "tho", "Thiên Thọ": "tho", "Đẩu Quân": "hoa", "Nguyệt Đức": "hoa", "Thiên Đức": "hoa",
    "L.Thái Tuế": "hoa", "L.Tang Môn": "moc", "L.Bạch Hổ": "kim", "L.Thiên Khốc": "thuy", "L.Thiên Hư": "thuy",
    "L.Lộc Tồn": "tho", "L.Kình Dương": "kim", "L.Đà La": "kim", "L.Thiên Mã": "hoa",
    "L.Hóa Lộc": "moc", "L.Hóa Quyền": "thuy", "L.Hóa Khoa": "thuy", "L.Hóa Kỵ": "thuy"
};

const PHU_TINH_PRIORITY_TOT = {
    "Hóa Khoa": 10, "Hóa Quyền": 11, "Hóa Lộc": 12,
    "Tả Phù": 20, "Hữu Bật": 21, "Văn Xương": 22, "Văn Khúc": 23, "Thiên Khôi": 24, "Thiên Việt": 25,
    "Lộc Tồn": 30, "Thiên Mã": 31,
    "Thiếu Dương": 41, "Thiếu Âm": 42, "Long Đức": 43, "Phúc Đức": 44,
    "Bác Sỹ": 50, "Lực Sĩ": 51, "Thanh Long": 52, "Tấu Thư": 54, "Hỷ Thần": 55,
    "Đào Hoa": 60, "Hồng Loan": 61, "Thiên Hỷ": 62, "Hoa Cái": 63,
    "Long Trì": 64, "Phượng Các": 65, "Giải Thần": 66, "Địa Giải": 67, "Thiên Giải": 68,
    "Ân Quang": 70, "Thiên Quý": 71, "Tam Thai": 72, "Bát Tọa": 73,
    "Thai Phụ": 74, "Phong Cáo": 75, "Quốc Ấn": 76, "Đường Phù": 77,
    "Thiên Quan": 80, "Thiên Phúc": 81, "Thiên Đức": 82, "Nguyệt Đức": 83,
    "Thiên Y": 84, "Thiên Trù": 85, "LN Văn Tinh": 86, "Thiên Tài": 87, "Thiên Thọ": 88
};

const PHU_TINH_PRIORITY_XAU = {
    "Hóa Kỵ": 10,
    "Kình Dương": 20, "Đà La": 21, "Hỏa Tinh": 22, "Hoả Tinh": 22, "Linh Tinh": 23, "Địa Không": 24, "Địa Kiếp": 25,
    "Thiên Hình": 30, "Thiên Riêu": 31, "Thiên Diêu": 31,
    "Thái Tuế": 39, "Tang Môn": 40, "Bạch Hổ": 41, "Tuế Phá": 42, "Điếu Khách": 43, "Quan Phù": 44, "Tử Phù": 45, "Trực Phù": 46,
    "Tướng Quân": 49, "Đại Hao": 50, "Tiểu Hao": 51, "Phi Liêm": 52, "Bệnh Phù": 53, "Phục Binh": 54, "Quan Phủ": 55,
    "Thiên Không": 60, "Kiếp Sát": 61, "Phá Toái": 62, "Cô Thần": 63, "Quả Tú": 64,
    "Thiên Khốc": 65, "Thiên Hư": 66, "Thiên La": 67, "Địa Võng": 68,
    "Thiên Thương": 69, "Thiên Sứ": 70, "Lưu Hà": 71, "Đẩu Quân": 72
};

window.CHI_HANH = CHI_HANH;
window.SAO_NGU_HANH = SAO_NGU_HANH;
window.PHU_TINH_PRIORITY_TOT = PHU_TINH_PRIORITY_TOT;
window.PHU_TINH_PRIORITY_XAU = PHU_TINH_PRIORITY_XAU;
