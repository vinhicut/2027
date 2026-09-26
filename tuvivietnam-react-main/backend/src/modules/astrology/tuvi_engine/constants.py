# constants.py
"""
Hệ thống cơ sở dữ liệu Thiên Can, Địa Chi, 60 Hoa Giáp, Ngũ Hành,
Độ sáng chính tinh và các bảng tra cứu theo chuẩn Vân Đằng Thái Thứ Lang.
"""

CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"]
CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"]
CHI_DISPLAY = ["Tí", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"]
CAN_ABBR = ["G.", "Ấ.", "B.", "Đ.", "M.", "K.", "C.", "T.", "N.", "Q."]
CAN_HANH = ["moc", "moc", "hoa", "hoa", "tho", "tho", "kim", "kim", "thuy", "thuy"]
CHI_HANH = ["thuy", "tho", "moc", "moc", "tho", "hoa", "hoa", "tho", "kim", "kim", "tho", "thuy"]

CUNG_NAMES = [
    "MỆNH", "PHỤ MẪU", "PHÚC ĐỨC", "ĐIỀN TRẠCH", "QUAN LỘC", "NÔ BỘC",
    "THIÊN DI", "TẬT ÁCH", "TÀI BẠCH", "TỬ TỨC", "PHU THÊ", "HUYNH ĐỆ"
]

CUNG_THAN_MAP = {
    0: "MỆNH-THÂN",
    1: "PHỤ-THÂN",
    2: "PHÚC-THÂN",
    3: "ĐIỀN-THÂN",
    4: "QUAN-THÂN",
    5: "NÔ-THÂN",
    6: "DI-THÂN",
    7: "TẬT-THÂN",
    8: "TÀI-THÂN",
    9: "TỬ-THÂN",
    10: "PHU-THÂN",
    11: "HUYNH-THÂN"
}

# 60 Hoa Giáp Nạp Âm
NAP_AM = {
    "Giáp Tý": {"name": "Hải Trung Kim", "hanh": "Kim"}, "Ất Sửu": {"name": "Hải Trung Kim", "hanh": "Kim"},
    "Bính Dần": {"name": "Lư Trung Hỏa", "hanh": "Hỏa"}, "Đinh Mão": {"name": "Lư Trung Hỏa", "hanh": "Hỏa"},
    "Mậu Thìn": {"name": "Đại Lâm Mộc", "hanh": "Mộc"}, "Kỷ Tỵ": {"name": "Đại Lâm Mộc", "hanh": "Mộc"},
    "Canh Ngọ": {"name": "Lộ Bàng Thổ", "hanh": "Thổ"}, "Tân Mùi": {"name": "Lộ Bàng Thổ", "hanh": "Thổ"},
    "Nhâm Thân": {"name": "Kiếm Phong Kim", "hanh": "Kim"}, "Quý Dậu": {"name": "Kiếm Phong Kim", "hanh": "Kim"},
    "Giáp Tuất": {"name": "Sơn Đầu Hỏa", "hanh": "Hỏa"}, "Ất Hợi": {"name": "Sơn Đầu Hỏa", "hanh": "Hỏa"},
    "Bính Tý": {"name": "Giản Hạ Thủy", "hanh": "Thủy"}, "Đinh Sửu": {"name": "Giản Hạ Thủy", "hanh": "Thủy"},
    "Mậu Dần": {"name": "Thành Đầu Thổ", "hanh": "Thổ"}, "Kỷ Mão": {"name": "Thành Đầu Thổ", "hanh": "Thổ"},
    "Canh Thìn": {"name": "Bạch Lạp Kim", "hanh": "Kim"}, "Tân Tỵ": {"name": "Bạch Lạp Kim", "hanh": "Kim"},
    "Nhâm Ngọ": {"name": "Dương Liễu Mộc", "hanh": "Mộc"}, "Quý Mùi": {"name": "Dương Liễu Mộc", "hanh": "Mộc"},
    "Giáp Thân": {"name": "Tuyền Trung Thủy", "hanh": "Thủy"}, "Ất Dậu": {"name": "Tuyền Trung Thủy", "hanh": "Thủy"},
    "Bính Tuất": {"name": "Ốc Thượng Thổ", "hanh": "Thổ"}, "Đinh Hợi": {"name": "Ốc Thượng Thổ", "hanh": "Thổ"},
    "Mậu Tý": {"name": "Tích Lịch Hỏa", "hanh": "Hỏa"}, "Kỷ Sửu": {"name": "Tích Lịch Hỏa", "hanh": "Hỏa"},
    "Canh Dần": {"name": "Tùng Bách Mộc", "hanh": "Mộc"}, "Tân Mão": {"name": "Tùng Bách Mộc", "hanh": "Mộc"},
    "Nhâm Thìn": {"name": "Trường Lưu Thủy", "hanh": "Thủy"}, "Quý Tỵ": {"name": "Trường Lưu Thủy", "hanh": "Thủy"},
    "Giáp Ngọ": {"name": "Sa Trung Kim", "hanh": "Kim"}, "Ất Mùi": {"name": "Sa Trung Kim", "hanh": "Kim"},
    "Bính Thân": {"name": "Sơn Hạ Hỏa", "hanh": "Hỏa"}, "Đinh Dậu": {"name": "Sơn Hạ Hỏa", "hanh": "Hỏa"},
    "Mậu Tuất": {"name": "Bình Địa Mộc", "hanh": "Mộc"}, "Kỷ Hợi": {"name": "Bình Địa Mộc", "hanh": "Mộc"},
    "Canh Tý": {"name": "Bích Thượng Thổ", "hanh": "Thổ"}, "Tân Sửu": {"name": "Bích Thượng Thổ", "hanh": "Thổ"},
    "Nhâm Dần": {"name": "Kim Bạch Kim", "hanh": "Kim"}, "Quý Mão": {"name": "Kim Bạch Kim", "hanh": "Kim"},
    "Giáp Thìn": {"name": "Phúc Đăng Hỏa", "hanh": "Hỏa"}, "Ất Tỵ": {"name": "Phúc Đăng Hỏa", "hanh": "Hỏa"},
    "Bính Ngọ": {"name": "Thiên Hà Thủy", "hanh": "Thủy"}, "Đinh Mùi": {"name": "Thiên Hà Thủy", "hanh": "Thủy"},
    "Mậu Thân": {"name": "Đại Trạch Thổ", "hanh": "Thổ"}, "Kỷ Dậu": {"name": "Đại Trạch Thổ", "hanh": "Thổ"},
    "Canh Tuất": {"name": "Thoa Xuyến Kim", "hanh": "Kim"}, "Tân Hợi": {"name": "Thoa Xuyến Kim", "hanh": "Kim"},
    "Nhâm Tý": {"name": "Tang Đố Mộc", "hanh": "Mộc"}, "Quý Sửu": {"name": "Tang Đố Mộc", "hanh": "Mộc"},
    "Giáp Dần": {"name": "Đại Khê Thủy", "hanh": "Thủy"}, "Ất Mão": {"name": "Đại Khê Thủy", "hanh": "Thủy"},
    "Bính Thìn": {"name": "Sa Trung Thổ", "hanh": "Thổ"}, "Đinh Tỵ": {"name": "Sa Trung Thổ", "hanh": "Thổ"},
    "Mậu Ngọ": {"name": "Thiên Thượng Hỏa", "hanh": "Hỏa"}, "Kỷ Mùi": {"name": "Thiên Thượng Hỏa", "hanh": "Hỏa"},
    "Canh Thân": {"name": "Thạch Lựu Mộc", "hanh": "Mộc"}, "Tân Dậu": {"name": "Thạch Lựu Mộc", "hanh": "Mộc"},
    "Nhâm Tuất": {"name": "Đại Hải Thủy", "hanh": "Thủy"}, "Quý Hợi": {"name": "Đại Hải Thủy", "hanh": "Thủy"}
}

CUC_INFO = {
    "Thủy": {"name": "Thủy nhị cục", "so": 2},
    "Mộc": {"name": "Mộc tam cục", "so": 3},
    "Kim": {"name": "Kim tứ cục", "so": 4},
    "Thổ": {"name": "Thổ ngũ cục", "so": 5},
    "Hỏa": {"name": "Hỏa lục cục", "so": 6}
}

# Chủ Mệnh: Tính chuẩn theo ĐỊA CHI CUNG MỆNH (Tử Vi Đẩu Số Tân Biên - tr. 11)
# 0:Tý, 1:Sửu, 2:Dần, 3:Mão, 4:Thìn, 5:Tỵ, 6:Ngọ, 7:Mùi, 8:Thân, 9:Dậu, 10:Tuất, 11:Hợi
CHU_MENH_TABLE = [
    "Tham Lang", "Cự Môn", "Lộc Tồn", "Văn Khúc", "Liêm Trinh", "Vũ Khúc",
    "Phá Quân", "Vũ Khúc", "Liêm Trinh", "Văn Khúc", "Lộc Tồn", "Cự Môn"
]

# Chủ Thân: Tính chuẩn theo ĐỊA CHI NĂM SINH (Tử Vi Đẩu Số Tân Biên)
# Tuổi Tý: Hỏa Tinh; Sửu, Mùi: Thiên Tướng; Dần, Thân: Thiên Lương;
# Mão, Dậu: Thiên Đồng; Thìn, Tuất: Văn Xương; Tỵ, Hợi: Thiên Cơ; Ngọ: Linh Tinh.
CHU_THAN_TABLE = [
    "Hỏa Tinh", "Thiên Tướng", "Thiên Lương", "Thiên Đồng", "Văn Xương", "Thiên Cơ",
    "Linh Tinh", "Thiên Tướng", "Thiên Lương", "Thiên Đồng", "Văn Xương", "Thiên Cơ"
]

# Bảng độ sáng 14 Chính Tinh (Thái Thứ Lang tr. 33-39)
# Mảng 12 cung: [Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi]
BRIGHTNESS_14 = {
    "Tử Vi":      ['B', 'Đ', 'M', 'B', 'V', 'M', 'M', 'Đ', 'M', 'B', 'V', 'B'],
    "Liêm Trinh": ['V', 'Đ', 'V', 'H', 'M', 'H', 'V', 'Đ', 'V', 'H', 'M', 'H'],
    "Thiên Đồng": ['V', 'H', 'M', 'Đ', 'H', 'Đ', 'H', 'H', 'M', 'H', 'H', 'Đ'],
    "Vũ Khúc":    ['V', 'M', 'V', 'Đ', 'M', 'H', 'V', 'M', 'V', 'Đ', 'M', 'H'],
    "Thái Dương": ['H', 'Đ', 'V', 'V', 'V', 'M', 'M', 'Đ', 'H', 'H', 'H', 'H'],
    "Thiên Cơ":   ['Đ', 'Đ', 'H', 'M', 'M', 'V', 'Đ', 'Đ', 'V', 'M', 'M', 'H'],
    "Thiên Phủ":  ['M', 'B', 'M', 'B', 'V', 'Đ', 'M', 'Đ', 'M', 'B', 'V', 'Đ'],
    "Thái Âm":    ['V', 'Đ', 'H', 'H', 'H', 'H', 'H', 'Đ', 'V', 'M', 'M', 'M'],
    "Tham Lang":  ['H', 'M', 'Đ', 'H', 'V', 'H', 'H', 'M', 'Đ', 'H', 'V', 'H'],
    "Cự Môn":     ['V', 'H', 'V', 'M', 'H', 'H', 'V', 'H', 'Đ', 'M', 'H', 'Đ'],
    "Thiên Tướng":['V', 'Đ', 'M', 'H', 'V', 'Đ', 'V', 'Đ', 'M', 'H', 'V', 'Đ'],
    "Thiên Lương":['V', 'Đ', 'V', 'V', 'M', 'H', 'M', 'Đ', 'V', 'H', 'M', 'H'],
    "Thất Sát":   ['M', 'Đ', 'M', 'H', 'H', 'V', 'M', 'Đ', 'M', 'H', 'H', 'V'],
    "Phá Quân":   ['M', 'V', 'H', 'H', 'Đ', 'H', 'M', 'V', 'H', 'H', 'Đ', 'H']
}

# Ngũ Hành của các sao
SAO_NGU_HANH = {
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
    "Tả Phù": "tho", "Tả Phụ": "tho", "Hữu Bật": "tho", "Văn Xương": "kim", "Văn Khúc": "thuy",
    "Thiên Khôi": "hoa", "Thiên Việt": "hoa", "Tam Thai": "thuy", "Bát Tọa": "thuy",
    "Ân Quang": "moc", "Thiên Quý": "tho", "Hồng Loan": "thuy", "Thiên Hỷ": "thuy",
    "Đào Hoa": "moc", "Hoa Cái": "kim", "Thiên Mã": "hoa", "Kiếp Sát": "hoa", "Phá Toái": "hoa",
    "Cô Thần": "hoa", "Quả Tú": "tho", "Thiên Khốc": "thuy", "Thiên Hư": "thuy",
    "Long Trì": "thuy", "Phượng Các": "tho", "Giải Thần": "moc", "Địa Giải": "tho", "Thiên Giải": "hoa",
    "Thiên Hình": "hoa", "Thiên Riêu": "thuy", "Thiên Diêu": "thuy", "Thiên Y": "thuy",
    "Thai Phụ": "kim", "Phong Cáo": "tho", "Quốc Ấn": "tho", "Đường Phù": "moc",
    "Thiên Quan": "hoa", "Thiên Phúc": "tho", "Thiên Trù": "hoa", "Lưu Hà": "thuy",
    "LN Văn Tinh": "hoa", "Thiên La": "kim", "Địa Võng": "tho", "Thiên Thương": "tho",
    "Thiên Sứ": "thuy", "Thiên Tài": "tho", "Thiên Thọ": "tho", "Đẩu Quân": "hoa",
    "Thiên Đức": "hoa", "Nguyệt Đức": "hoa", "Thiên Không": "hoa",
    # Sao lưu
    "L.Thái Tuế": "hoa", "L.Tang Môn": "moc", "L.Bạch Hổ": "kim",
    "L.Thiên Khốc": "thuy", "L.Thiên Hư": "thuy", "L.Lộc Tồn": "tho",
    "L.Kình Dương": "kim", "L.Đà La": "kim", "L.Thiên Mã": "hoa",
    "L.Hóa Lộc": "moc", "L.Hóa Quyền": "thuy", "L.Hóa Khoa": "thuy", "L.Hóa Kỵ": "thuy"
}

# Bảng Tứ Hóa: [Lộc, Quyền, Khoa, Kỵ]
# Chuẩn Vân Đằng Thái Thứ Lang - Tử Vi Đẩu Số Tân Biên trang 14:
# Can Tân: Hóa Quyền là Thiên Lương, Hóa Khoa là Văn Khúc
# Can Nhâm: Hóa Khoa là Tả Phụ
TU_HOA_TABLE = [
    ['Liêm Trinh', 'Phá Quân', 'Vũ Khúc', 'Thái Dương'],   # 0: Giáp
    ['Thiên Cơ', 'Thiên Lương', 'Tử Vi', 'Thái Âm'],        # 1: Ất
    ['Thiên Đồng', 'Thiên Cơ', 'Văn Xương', 'Liêm Trinh'],  # 2: Bính
    ['Thái Âm', 'Thiên Đồng', 'Thiên Cơ', 'Cự Môn'],        # 3: Đinh
    ['Tham Lang', 'Thái Âm', 'Hữu Bật', 'Thiên Cơ'],        # 4: Mậu
    ['Vũ Khúc', 'Tham Lang', 'Thiên Lương', 'Văn Khúc'],    # 5: Kỷ
    ['Thái Dương', 'Vũ Khúc', 'Thái Âm', 'Thiên Đồng'],     # 6: Canh
    ['Cự Môn', 'Thiên Lương', 'Văn Khúc', 'Văn Xương'],      # 7: Tân (Quyền: Thiên Lương, Khoa: Văn Khúc)
    ['Thiên Lương', 'Tử Vi', 'Tả Phụ', 'Vũ Khúc'],          # 8: Nhâm (Khoa: Tả Phụ)
    ['Phá Quân', 'Cự Môn', 'Thái Âm', 'Tham Lang']          # 9: Quý
]
