
        // =========================================================================
        // 1. CƠ SỞ DỮ LIỆU THIÊN CAN, ĐỊA CHI, NẠP ÂM & SAO
        // =========================================================================
        const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
        const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
        const CHI_DISPLAY = ["Tí", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
        const _CAN_ABBR = ["G.", "Ấ.", "B.", "Đ.", "M.", "K.", "C.", "T.", "N.", "Q."];
        const CAN_HANH = ["moc", "moc", "hoa", "hoa", "tho", "tho", "kim", "kim", "thuy", "thuy"];
        const CUNG_NAMES = ["MỆNH", "PHỤ MẪU", "PHÚC ĐỨC", "ĐIỀN TRẠCH", "QUAN LỘC", "NÔ BỘC", "THIÊN DI", "TẬT ÁCH", "TÀI BẠCH", "TỬ TỨC", "PHU THÊ", "HUYNH ĐỆ"];

        // 60 Hoa Giáp Nạp Âm
        const NAP_AM = {
            "Giáp Tý": { name: "Hải Trung Kim", hanh: "Kim" }, "Ất Sửu": { name: "Hải Trung Kim", hanh: "Kim" },
            "Bính Dần": { name: "Lư Trung Hỏa", hanh: "Hỏa" }, "Đinh Mão": { name: "Lư Trung Hỏa", hanh: "Hỏa" },
            "Mậu Thìn": { name: "Đại Lâm Mộc", hanh: "Mộc" }, "Kỷ Tỵ": { name: "Đại Lâm Mộc", hanh: "Mộc" },
            "Canh Ngọ": { name: "Lộ Bàng Thổ", hanh: "Thổ" }, "Tân Mùi": { name: "Lộ Bàng Thổ", hanh: "Thổ" },
            "Nhâm Thân": { name: "Kiếm Phong Kim", hanh: "Kim" }, "Quý Dậu": { name: "Kiếm Phong Kim", hanh: "Kim" },
            "Giáp Tuất": { name: "Sơn Đầu Hỏa", hanh: "Hỏa" }, "Ất Hợi": { name: "Sơn Đầu Hỏa", hanh: "Hỏa" },
            "Bính Tý": { name: "Giản Hạ Thủy", hanh: "Thủy" }, "Đinh Sửu": { name: "Giản Hạ Thủy", hanh: "Thủy" },
            "Mậu Dần": { name: "Thành Đầu Thổ", hanh: "Thổ" }, "Kỷ Mão": { name: "Thành Đầu Thổ", hanh: "Thổ" },
            "Canh Thìn": { name: "Bạch Lạp Kim", hanh: "Kim" }, "Tân Tỵ": { name: "Bạch Lạp Kim", hanh: "Kim" },
            "Nhâm Ngọ": { name: "Dương Liễu Mộc", hanh: "Mộc" }, "Quý Mùi": { name: "Dương Liễu Mộc", hanh: "Mộc" },
            "Giáp Thân": { name: "Tuyền Trung Thủy", hanh: "Thủy" }, "Ất Dậu": { name: "Tuyền Trung Thủy", hanh: "Thủy" },
            "Bính Tuất": { name: "Ốc Thượng Thổ", hanh: "Thổ" }, "Đinh Hợi": { name: "Ốc Thượng Thổ", hanh: "Thổ" },
            "Mậu Tý": { name: "Tích Lịch Hỏa", hanh: "Hỏa" }, "Kỷ Sửu": { name: "Tích Lịch Hỏa", hanh: "Hỏa" },
            "Canh Dần": { name: "Tùng Bách Mộc", hanh: "Mộc" }, "Tân Mão": { name: "Tùng Bách Mộc", hanh: "Mộc" },
            "Nhâm Thìn": { name: "Trường Lưu Thủy", hanh: "Thủy" }, "Quý Tỵ": { name: "Trường Lưu Thủy", hanh: "Thủy" },
            "Giáp Ngọ": { name: "Sa Trung Kim", hanh: "Kim" }, "Ất Mùi": { name: "Sa Trung Kim", hanh: "Kim" },
            "Bính Thân": { name: "Sơn Hạ Hỏa", hanh: "Hỏa" }, "Đinh Dậu": { name: "Sơn Hạ Hỏa", hanh: "Hỏa" },
            "Mậu Tuất": { name: "Bình Địa Mộc", hanh: "Mộc" }, "Kỷ Hợi": { name: "Bình Địa Mộc", hanh: "Mộc" },
            "Canh Tý": { name: "Bích Thượng Thổ", hanh: "Thổ" }, "Tân Sửu": { name: "Bích Thượng Thổ", hanh: "Thổ" },
            "Nhâm Dần": { name: "Kim Bạch Kim", hanh: "Kim" }, "Quý Mão": { name: "Kim Bạch Kim", hanh: "Kim" },
            "Giáp Thìn": { name: "Phúc Đăng Hỏa", hanh: "Hỏa" }, "Ất Tỵ": { name: "Phúc Đăng Hỏa", hanh: "Hỏa" },
            "Bính Ngọ": { name: "Thiên Hà Thủy", hanh: "Thủy" }, "Đinh Mùi": { name: "Thiên Hà Thủy", hanh: "Thủy" },
            "Mậu Thân": { name: "Đại Trạch Thổ", hanh: "Thổ" }, "Kỷ Dậu": { name: "Đại Trạch Thổ", hanh: "Thổ" },
            "Canh Tuất": { name: "Thoa Xuyến Kim", hanh: "Kim" }, "Tân Hợi": { name: "Thoa Xuyến Kim", hanh: "Kim" },
            "Nhâm Tý": { name: "Tang Đố Mộc", hanh: "Mộc" }, "Quý Sửu": { name: "Tang Đố Mộc", hanh: "Mộc" },
            "Giáp Dần": { name: "Đại Khê Thủy", hanh: "Thủy" }, "Ất Mão": { name: "Đại Khê Thủy", hanh: "Thủy" },
            "Bính Thìn": { name: "Sa Trung Thổ", hanh: "Thổ" }, "Đinh Tỵ": { name: "Sa Trung Thổ", hanh: "Thổ" },
            "Mậu Ngọ": { name: "Thiên Thượng Hỏa", hanh: "Hỏa" }, "Kỷ Mùi": { name: "Thiên Thượng Hỏa", hanh: "Hỏa" },
            "Canh Thân": { name: "Thạch Lựu Mộc", hanh: "Mộc" }, "Tân Dậu": { name: "Thạch Lựu Mộc", hanh: "Mộc" },
            "Nhâm Tuất": { name: "Đại Hải Thủy", hanh: "Thủy" }, "Quý Hợi": { name: "Đại Hải Thủy", hanh: "Thủy" }
        };

        const CUC_INFO = {
            "Thủy": { name: "Thủy nhị cục", so: 2 },
            "Mộc": { name: "Mộc tam cục", so: 3 },
            "Kim": { name: "Kim tứ cục", so: 4 },
            "Thổ": { name: "Thổ ngũ cục", so: 5 },
            "Hỏa": { name: "Hỏa lục cục", so: 6 }
        };

        const CHU_MENH_TABLE = ["Văn Khúc", "Vũ Khúc", "Liêm Trinh", "Tham Lang", "Cự Môn", "Lộc Tồn", "Văn Khúc", "Vũ Khúc", "Liêm Trinh", "Tham Lang", "Cự Môn", "Lộc Tồn"];
        const CHU_THAN_TABLE = ["Linh Tinh", "Thiên Tướng", "Thiên Lương", "Thiên Đồng", "Văn Xương", "Thiên Cơ", "Hỏa Tinh", "Thiên Tướng", "Thiên Lương", "Thiên Đồng", "Văn Xương", "Thiên Cơ"];

        const BRIGHTNESS_14 = {
            "Tử Vi":     ['B', 'Đ', 'M', 'B', 'V', 'M', 'M', 'Đ', 'M', 'B', 'V', 'M'],
            "Liêm Trinh": ['V', 'Đ', 'M', 'H', 'V', 'H', 'V', 'Đ', 'M', 'H', 'V', 'H'],
            "Thiên Đồng": ['V', 'H', 'M', 'Đ', 'H', 'H', 'H', 'H', 'M', 'H', 'H', 'Đ'],
            "Vũ Khúc":    ['V', 'M', 'V', 'Đ', 'M', 'B', 'V', 'M', 'V', 'Đ', 'M', 'B'],
            "Thái Dương": ['H', 'Đ', 'V', 'V', 'V', 'M', 'M', 'Đ', 'H', 'H', 'H', 'H'],
            "Thiên Cơ":   ['V', 'H', 'Đ', 'M', 'M', 'Đ', 'V', 'H', 'Đ', 'M', 'M', 'Đ'],
            "Thiên Phủ":  ['M', 'M', 'M', 'B', 'V', 'Đ', 'M', 'M', 'M', 'B', 'V', 'Đ'],
            "Thái Âm":    ['V', 'Đ', 'H', 'H', 'H', 'H', 'H', 'H', 'Đ', 'M', 'M', 'M'],
            "Tham Lang":  ['H', 'M', 'Đ', 'H', 'V', 'H', 'H', 'M', 'Đ', 'H', 'V', 'H'],
            "Cự Môn":     ['Đ', 'H', 'V', 'M', 'H', 'H', 'Đ', 'H', 'V', 'M', 'H', 'Đ'],
            "Thiên Tướng":['V', 'Đ', 'M', 'H', 'V', 'Đ', 'V', 'Đ', 'M', 'H', 'V', 'Đ'],
            "Thiên Lương":['V', 'Đ', 'V', 'M', 'M', 'H', 'M', 'Đ', 'V', 'H', 'M', 'H'],
            "Thất Sát":   ['M', 'Đ', 'M', 'H', 'H', 'V', 'M', 'Đ', 'M', 'H', 'H', 'V'],
            "Phá Quân":   ['M', 'V', 'H', 'H', 'Đ', 'H', 'M', 'V', 'H', 'H', 'Đ', 'H']
        };

        const SAO_NGU_HANH = {
            "Tử Vi": "tho", "Liêm Trinh": "hoa", "Thiên Đồng": "thuy", "Vũ Khúc": "kim", "Thái Dương": "hoa",
            "Thiên Cơ": "moc", "Thiên Phủ": "tho", "Thái Âm": "thuy", "Tham Lang": "thuy", "Cự Môn": "thuy",
            "Thiên Tướng": "thuy", "Thiên Lương": "moc", "Thất Sát": "hoa", "Phá Quân": "hoa",
            "Kình Dương": "hoa", "Đà La": "hoa", "Hỏa Tinh": "hoa", "Hoả Tinh": "hoa", "Linh Tinh": "hoa",
            "Địa Không": "hoa", "Địa Kiếp": "hoa", "Hóa Lộc": "moc", "Hóa Quyền": "moc", "Hóa Khoa": "moc", "Hóa Kỵ": "hoa",
            "Lộc Tồn": "tho", "Bác Sỹ": "thuy", "Lực Sĩ": "tho", "Thanh Long": "moc", "Tiểu Hao": "hoa",
            "Tướng Quân": "moc", "Tấu Thư": "kim", "Phi Liêm": "hoa", "Hỷ Thần": "hoa", "Hỉ Thần": "hoa", "Bệnh Phù": "tho",
            "Đại Hao": "hoa", "Phục Binh": "hoa", "Quan Phủ": "hoa",
            "Thái Tuế": "hoa", "Thiếu Dương": "hoa", "Tang Môn": "hoa", "Thiếu Âm": "tho", "Quan Phù": "hoa",
            "Tử Phù": "hoa", "Tuế Phá": "hoa", "Long Đức": "tho", "Bạch Hổ": "hoa", "Phúc Đức": "tho",
            "Điếu Khách": "hoa", "Trực Phù": "hoa",
            "Tả Phù": "tho", "Hữu Bật": "tho", "Văn Xương": "hoa", "Văn Khúc": "thuy",
            "Thiên Khôi": "hoa", "Thiên Việt": "hoa", "Tam Thai": "kim", "Bát Tọa": "kim",
            "Ân Quang": "kim", "Thiên Quý": "tho", "Hồng Loan": "hoa", "Thiên Hỷ": "hoa",
            "Đào Hoa": "moc", "Hoa Cái": "moc", "Thiên Mã": "tho", "Kiếp Sát": "hoa", "Phá Toái": "hoa",
            "Cô Thần": "tho", "Quả Tú": "tho", "Thiên Khốc": "hoa", "Thiên Hư": "hoa",
            "Long Trì": "moc", "Phượng Các": "moc", "Giải Thần": "moc", "Địa Giải": "tho", "Thiên Giải": "hoa",
            "Thiên Hình": "hoa", "Thiên Riêu": "thuy", "Thiên Diêu": "thuy", "Thiên Y": "moc", "Thai Phụ": "kim", "Phong Cáo": "tho",
            "Quốc Ấn": "tho", "Đường Phù": "moc", "Thiên Quan": "tho", "Thiên Phúc": "tho",
            "Thiên Trù": "tho", "Lưu Hà": "hoa", "LN Văn Tinh": "kim", "Thiên Không": "hoa",
            "Thiên La": "kim", "Địa Võng": "kim", "Thiên Thương": "tho", "Thiên Sứ": "thuy",
            "Thiên Tài": "tho", "Thiên Thọ": "tho", "Đẩu Quân": "hoa", "Nguyệt Đức": "hoa", "Thiên Đức": "hoa"
        };

        // =========================================================================
        // 2. THUẬT TOÁN CHUYỂN ĐỔI LỊCH DƯƠNG - ÂM (TS. HỒ NGỌC ĐỨC)
        // =========================================================================
        function jdn(d, m, y) {
            let a = Math.floor((14 - m) / 12);
            let y1 = y + 4800 - a;
            let m1 = m + 12 * a - 3;
            return d + Math.floor((153 * m1 + 2) / 5) + 365 * y1 + Math.floor(y1 / 4) - Math.floor(y1 / 100) + Math.floor(y1 / 400) - 32045;
        }

        function getNewMoonDay(k, timezone) {
            let T = k / 1236.85;
            let T2 = T * T;
            let T3 = T2 * T;
            let dr = Math.PI / 180;
            let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
            Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
            let M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
            let Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
            let F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
            let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
            C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(2 * dr * Mpr);
            C1 = C1 - 0.0004 * Math.sin(3 * dr * Mpr);
            C1 = C1 + 0.0104 * Math.sin(2 * dr * F) - 0.0051 * Math.sin((M + Mpr) * dr);
            C1 = C1 - 0.0074 * Math.sin((M - Mpr) * dr) + 0.0004 * Math.sin((2 * F + M) * dr);
            C1 = C1 - 0.0004 * Math.sin((2 * F - M) * dr) - 0.0006 * Math.sin((2 * F + Mpr) * dr);
            C1 = C1 + 0.0010 * Math.sin((2 * F - Mpr) * dr) + 0.0005 * Math.sin((M + 2 * Mpr) * dr);
            let JdNew = Jd1 + C1;
            return Math.floor(JdNew + 0.5 + timezone / 24);
        }

        function getSunLongitude(dayNumber, timezone) {
            let T = (dayNumber - 2451545.5 - timezone / 24) / 36525;
            let T2 = T * T;
            let dr = Math.PI / 180;
            let L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
            let M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
            let C = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
            C = C + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
            let theta = L0 + C;
            theta = theta * dr;
            theta = theta - Math.PI * 2 * Math.floor(theta / (Math.PI * 2));
            return Math.floor(theta / Math.PI * 6);
        }

        function getLunarMonth11(yy, timezone) {
            let off = jdn(31, 12, yy) - 2415021;
            let k = Math.floor(off / 29.530588853);
            let nm = getNewMoonDay(k, timezone);
            let sunLong = getSunLongitude(nm, timezone);
            if (sunLong >= 9) nm = getNewMoonDay(k - 1, timezone);
            return nm;
        }

        function getLeapMonthOffset(a11, timezone) {
            let k = Math.floor((a11 - 2415021.076998695) / 29.530588853);
            let last = 0;
            let i = 1;
            let arc = getSunLongitude(getNewMoonDay(k + i, timezone), timezone);
            do {
                last = arc;
                i++;
                arc = getSunLongitude(getNewMoonDay(k + i, timezone), timezone);
            } while (arc != last && i < 14);
            return i - 1;
        }

        function convertSolar2Lunar(dd, mm, yy, timezone = 7) {
            let dayNumber = jdn(dd, mm, yy);
            let k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
            let monthStart = getNewMoonDay(k + 1, timezone);
            if (monthStart > dayNumber) monthStart = getNewMoonDay(k, timezone);
            let a11 = getLunarMonth11(yy, timezone);
            let b11 = a11;
            let lunarYear;
            if (a11 >= monthStart) {
                lunarYear = yy;
                a11 = getLunarMonth11(yy - 1, timezone);
            } else {
                lunarYear = yy + 1;
                b11 = getLunarMonth11(yy + 1, timezone);
            }
            let lunarDay = dayNumber - monthStart + 1;
            let diff = Math.floor((monthStart - a11) / 29);
            let lunarLeap = 0;
            let lunarMonth = diff + 11;
            if (b11 - a11 > 365) {
                let leapMonthDiff = getLeapMonthOffset(a11, timezone);
                if (diff >= leapMonthDiff) {
                    lunarMonth = diff + 10;
                    if (diff == leapMonthDiff) lunarLeap = 1;
                }
            }
            if (lunarMonth > 12) lunarMonth = lunarMonth - 12;
            if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
            return [lunarDay, lunarMonth, lunarYear, lunarLeap];
        }

        // =========================================================================
        // 3. ENGINE LẬP LÁ SỐ TỬ VI ĐẨU SỐ TOÀN DIỆN
        // =========================================================================
        let currentChartData = null;

        function calculateTuViChart(input) {
            let { name, gender, isSolar, day, month, year, hour, minute, isLeapMonthInput, limitYear } = input;
            
            let solarDay = day, solarMonth = month, solarYear = year;
            let lunarDay = day, lunarMonth = month, lunarYear = year, isLeap = isLeapMonthInput ? 1 : 0;

            // Xử lý giờ sinh -> Chi giờ
            let hourChiIdx = (hour >= 23 || hour < 1) ? 0 : Math.floor((hour + 1) / 2) % 12;

            if (isSolar) {
                let lDate = convertSolar2Lunar(solarDay, solarMonth, solarYear, 7);
                lunarDay = lDate[0];
                lunarMonth = lDate[1];
                lunarYear = lDate[2];
                isLeap = lDate[3];
            }

            // Quy tắc tháng nhuận: Ngày 1-15 tính tháng trước, ngày 16 trở đi tính tháng sau
            let calcLunarMonth = lunarMonth;
            if (isLeap && lunarDay > 15) {
                calcLunarMonth = (lunarMonth % 12) + 1;
            }

            // 1. Tính Can Chi 4 Trụ
            let canYearIdx = (lunarYear - 4 + 1000) % 10;
            let chiYearIdx = (lunarYear - 4 + 1200) % 12;
            let canYear = CAN[canYearIdx];
            let chiYear = CHI[chiYearIdx];

            let canMonthIdx = ((canYearIdx % 5) * 2 + 2 + (calcLunarMonth - 1)) % 10;
            let chiMonthIdx = (calcLunarMonth + 1) % 12;
            let canMonth = CAN[canMonthIdx];
            let _chiMonth = CHI[chiMonthIdx];

            let jdDay = jdn(solarDay, solarMonth, solarYear);
            let canDayIdx = (jdDay + 9) % 10;
            let chiDayIdx = (jdDay + 1) % 12;
            let canDay = CAN[canDayIdx];
            let _chiDay = CHI[chiDayIdx];

            let canHourIdx = ((canDayIdx % 5) * 2 + hourChiIdx) % 10;
            let _chiHour = CHI[hourChiIdx];
            let canHour = CAN[canHourIdx];

            // 2. Can Chi Năm Xem Hạn
            let limitCanIdx = (limitYear - 4 + 1000) % 10;
            let limitChiIdx = (limitYear - 4 + 1200) % 12;
            let limitCan = CAN[limitCanIdx];
            let _limitChi = CHI[limitChiIdx];
            let tuoiMu = limitYear - lunarYear + 1;

            // 3. Âm Dương & Nạp Âm Bản Mệnh
            let isDuongCan = (canYearIdx % 2 === 0);
            let amDuongMenh = (isDuongCan ? "Dương " : "Âm ") + gender;
            let isThuanLy = (isDuongCan && gender === "Nam") || (!isDuongCan && gender === "Nữ");
            let stepDir = isThuanLy ? 1 : -1;

            let napAmKey = `${canYear} ${chiYear}`;
            let menhNapAm = NAP_AM[napAmKey] ? NAP_AM[napAmKey].name : "Sa Trung Kim";
            let menhHanh = NAP_AM[napAmKey] ? NAP_AM[napAmKey].hanh : "Kim";

            // 4. An Cung Mệnh & Thân
            let menhPos = (2 + (calcLunarMonth - 1) - hourChiIdx + 1200) % 12;
            let thanPos = (2 + (calcLunarMonth - 1) + hourChiIdx) % 12;

            // Can của 12 Cung (Ngũ Hổ Độn)
            let canDan = ((canYearIdx % 5) * 2 + 2) % 10;
            let canCung = [];
            for (let c = 0; c < 12; c++) {
                let stepFromDan = (c - 2 + 120) % 12;
                canCung[c] = (canDan + stepFromDan) % 10;
            }

            // Tìm Cục từ Nạp Âm của Cung Mệnh
            let canMenh = CAN[canCung[menhPos]];
            let chiMenh = CHI[menhPos];
            let napAmMenhCung = NAP_AM[`${canMenh} ${chiMenh}`] ? NAP_AM[`${canMenh} ${chiMenh}`].hanh : "Thủy";
            let cucInfo = CUC_INFO[napAmMenhCung] || { name: "Thủy nhị cục", so: 2 };
            let cucName = cucInfo.name;
            let cucSo = cucInfo.so;
            let cucHanh = napAmMenhCung;

            // Mối quan hệ Âm Dương & Cục Mệnh
            let isCungMenhDuong = (menhPos % 2 === 0);
            let amDuongLy = (isDuongCan && isCungMenhDuong) || (!isDuongCan && !isCungMenhDuong) 
                ? "Âm Dương thuận lý" 
                : "Âm Dương nghịch lý";

            let cucMenhTuongQuan = "";
            if (menhHanh === cucHanh) cucMenhTuongQuan = "Mệnh Cục tương hòa";
            else if ((cucHanh === "Thủy" && menhHanh === "Mộc") || (cucHanh === "Mộc" && menhHanh === "Hỏa") || 
                     (cucHanh === "Hỏa" && menhHanh === "Thổ") || (cucHanh === "Thổ" && menhHanh === "Kim") || 
                     (cucHanh === "Kim" && menhHanh === "Thủy")) {
                cucMenhTuongQuan = "Cục sinh Mệnh";
            } else if ((menhHanh === "Thủy" && cucHanh === "Mộc") || (menhHanh === "Mộc" && cucHanh === "Hỏa") || 
                       (menhHanh === "Hỏa" && cucHanh === "Thổ") || (menhHanh === "Thổ" && cucHanh === "Kim") || 
                       (menhHanh === "Kim" && cucHanh === "Thủy")) {
                cucMenhTuongQuan = "Mệnh sinh Cục";
            } else if ((cucHanh === "Thủy" && menhHanh === "Hỏa") || (cucHanh === "Hỏa" && menhHanh === "Kim") || 
                       (cucHanh === "Kim" && menhHanh === "Mộc") || (cucHanh === "Mộc" && menhHanh === "Thổ") || 
                       (cucHanh === "Thổ" && menhHanh === "Thủy")) {
                cucMenhTuongQuan = "Cục khắc Mệnh";
            } else {
                cucMenhTuongQuan = "Mệnh khắc Cục";
            }

            let chuMenh = CHU_MENH_TABLE[chiYearIdx];
            let chuThan = CHU_THAN_TABLE[chiYearIdx];

            // 5. Khởi tạo 12 Cung Địa Bàn
            let diaBan = [];
            for (let i = 0; i < 12; i++) {
                diaBan.push({
                    cung_id: i,
                    cung_chi: CHI_DISPLAY[i],
                    can_cung: CAN[canCung[i]],
                    can_chi_cung: `${CAN[canCung[i]]} ${CHI_DISPLAY[i]}`,
                    can_hanh: CAN_HANH[canCung[i]],
                    ten_cung: "",
                    is_than: (i === thanPos),
                    dai_han: 0,
                    tieu_han_chi: "",
                    nguyet_han_thang: 0,
                    trang_sinh: "",
                    chinh_tinh: [],
                    phu_tinh_tot: [],
                    phu_tinh_xau: [],
                    sao_luu: [],
                    has_tuan: false,
                    has_triet: false
                });
            }

            // Phân bổ 12 Cung chức năng (thuận chiều kim đồng hồ từ Mệnh)
            let thanCuName = "";
            for (let i = 0; i < 12; i++) {
                let idx = (menhPos + i) % 12;
                let cName = CUNG_NAMES[i];
                if (i === 10) cName = (gender === "Nam") ? "THÊ" : "PHU";
                diaBan[idx].ten_cung = cName;
                if (idx === thanPos) {
                    diaBan[idx].ten_cung += " <THÂN>";
                    thanCuName = "Thân cư " + ((i === 10 && gender === "Nam") ? "Thê" : (i === 10 ? "Phu" : CUNG_NAMES[i]));
                }
            }

            // 6. Đại Hạn, Tiểu Hạn, Nguyệt Hạn
            for (let i = 0; i < 12; i++) {
                let idx = (menhPos + stepDir * i + 1200) % 12;
                diaBan[idx].dai_han = cucSo + i * 10;
            }

            let tieuHanStart = 0;
            if ([2, 6, 10].includes(chiYearIdx)) tieuHanStart = 4;
            else if ([8, 0, 4].includes(chiYearIdx)) tieuHanStart = 10;
            else if ([5, 9, 1].includes(chiYearIdx)) tieuHanStart = 7;
            else tieuHanStart = 1;

            let tieuHanStep = (gender === "Nam") ? 1 : -1;
            for (let i = 0; i < 12; i++) {
                let chiAge = ((i - tieuHanStart) * tieuHanStep + 1200) % 12;
                diaBan[i].tieu_han_chi = CHI_DISPLAY[chiAge];
            }

            let limitTieuHanCung = (tieuHanStart + tieuHanStep * limitChiIdx + 1200) % 12;
            let month1Cung = (limitTieuHanCung - (calcLunarMonth - 1) + hourChiIdx + 1200) % 12;
            for (let m = 1; m <= 12; m++) {
                let cIdx = (month1Cung + (m - 1)) % 12;
                diaBan[cIdx].nguyet_han_thang = m;
            }

            // 7. An 14 Chính Tinh & Độ Sáng
            let X = (cucSo - (lunarDay % cucSo)) % cucSo;
            let Q = Math.floor((lunarDay + X) / cucSo);
            let tuViPos = (X % 2 === 0) ? ((1 + Q + X) % 12) : ((1 + Q - X + 120) % 12);

            let saoChinhPos = {
                "Tử Vi": tuViPos,
                "Liêm Trinh": (tuViPos - 8 + 120) % 12,
                "Thiên Đồng": (tuViPos - 5 + 120) % 12,
                "Vũ Khúc": (tuViPos - 4 + 120) % 12,
                "Thái Dương": (tuViPos - 3 + 120) % 12,
                "Thiên Cơ": (tuViPos - 1 + 120) % 12
            };

            let thienPhuPos = (16 - tuViPos) % 12;
            saoChinhPos["Thiên Phủ"] = thienPhuPos;
            saoChinhPos["Thái Âm"] = (thienPhuPos + 1) % 12;
            saoChinhPos["Tham Lang"] = (thienPhuPos + 2) % 12;
            saoChinhPos["Cự Môn"] = (thienPhuPos + 3) % 12;
            saoChinhPos["Thiên Tướng"] = (thienPhuPos + 4) % 12;
            saoChinhPos["Thiên Lương"] = (thienPhuPos + 5) % 12;
            saoChinhPos["Thất Sát"] = (thienPhuPos + 6) % 12;
            saoChinhPos["Phá Quân"] = (thienPhuPos + 10) % 12;

            for (let sName in saoChinhPos) {
                let pos = saoChinhPos[sName];
                let dacTinh = BRIGHTNESS_14[sName][pos];
                diaBan[pos].chinh_tinh.push({
                    ten: sName,
                    ngu_hanh: SAO_NGU_HANH[sName],
                    dac_tinh: dacTinh
                });
            }

            function addPhu(name, pos, isGood, dacTinh = "") {
                let obj = {
                    ten: name,
                    ngu_hanh: SAO_NGU_HANH[name] || "tho",
                    dac_tinh: dacTinh
                };
                if (isGood) diaBan[pos].phu_tinh_tot.push(obj);
                else diaBan[pos].phu_tinh_xau.push(obj);
            }

            function addLuu(name, pos, isGood) {
                diaBan[pos].sao_luu.push({
                    ten: name,
                    loai: isGood ? "tot" : "xau"
                });
            }

            // 8. Vòng Thái Tuế
            let thaiTueNames = ['Thái Tuế', 'Thiếu Dương', 'Tang Môn', 'Thiếu Âm', 'Quan Phù', 'Tử Phù', 'Tuế Phá', 'Long Đức', 'Bạch Hổ', 'Phúc Đức', 'Điếu Khách', 'Trực Phù'];
            let thaiTueGood = [false, true, false, true, false, false, false, true, false, true, false, false];
            let thaiTueDac = {
                'Tang Môn': ['Đ', '', 'Đ', 'Đ', '', '', '', '', 'Đ', 'Đ', '', ''],
                'Bạch Hổ': ['Đ', '', 'Đ', 'Đ', '', '', '', '', 'Đ', 'Đ', '', '']
            };

            for (let i = 0; i < 12; i++) {
                let p = (chiYearIdx + i) % 12;
                let sName = thaiTueNames[i];
                let dt = (thaiTueDac[sName] && thaiTueDac[sName][p]) ? thaiTueDac[sName][p] : "";
                addPhu(sName, p, thaiTueGood[i], dt);
                if (sName === "Phúc Đức") addPhu("Thiên Đức", p, true);
            }

            // 9. Vòng Lộc Tồn & Bác Sỹ
            let locTonTable = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0];
            let locTonPos = locTonTable[canYearIdx];
            addPhu("Lộc Tồn", locTonPos, true, "Đ");

            let kinhDuongPos = (locTonPos + 1) % 12;
            let daLaPos = (locTonPos - 1 + 12) % 12;
            let kinhDaDac = [4, 10, 1, 7].includes(kinhDuongPos) ? "Đ" : "H";
            let daLaDac = [4, 10, 1, 7].includes(daLaPos) ? "Đ" : "H";
            addPhu("Kình Dương", kinhDuongPos, false, kinhDaDac);
            addPhu("Đà La", daLaPos, false, daLaDac);

            let bacSyNames = ['Bác Sỹ', 'Lực Sĩ', 'Thanh Long', 'Tiểu Hao', 'Tướng Quân', 'Tấu Thư', 'Phi Liêm', 'Hỷ Thần', 'Bệnh Phù', 'Đại Hao', 'Phục Binh', 'Quan Phủ'];
            let bacSyGood = [true, true, true, false, false, true, false, true, false, false, false, false];
            for (let i = 0; i < 12; i++) {
                let p = (locTonPos + stepDir * i + 1200) % 12;
                let sName = bacSyNames[i];
                let dt = "";
                if (sName === "Đại Hao" || sName === "Tiểu Hao") {
                    dt = [2, 8, 3, 9].includes(p) ? "Đ" : "H";
                }
                addPhu(sName, p, bacSyGood[i], dt);
            }

            // 10. Vòng Tràng Sinh
            let tsStart = 8;
            if (cucSo === 2 || cucSo === 5) tsStart = 8;
            else if (cucSo === 3) tsStart = 11;
            else if (cucSo === 4) tsStart = 5;
            else if (cucSo === 6) tsStart = 2;

            let trangSinhNames = ['Trường Sinh', 'Mộc Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng', 'Suy', 'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'];
            for (let i = 0; i < 12; i++) {
                let p = (tsStart + stepDir * i + 1200) % 12;
                diaBan[p].trang_sinh = trangSinhNames[i];
            }

            // 11. Tứ Hóa
            let tuHoaData = [
                ['Liêm Trinh', 'Phá Quân', 'Vũ Khúc', 'Thái Dương'],
                ['Thiên Cơ', 'Thiên Lương', 'Tử Vi', 'Thái Âm'],
                ['Thiên Đồng', 'Thiên Cơ', 'Văn Xương', 'Liêm Trinh'],
                ['Thái Âm', 'Thiên Đồng', 'Thiên Cơ', 'Cự Môn'],
                ['Tham Lang', 'Thái Âm', 'Hữu Bật', 'Thiên Cơ'],
                ['Vũ Khúc', 'Tham Lang', 'Thiên Lương', 'Văn Khúc'],
                ['Thái Dương', 'Vũ Khúc', 'Thái Âm', 'Thiên Đồng'],
                ['Cự Môn', 'Thái Dương', 'Văn Khúc', 'Văn Xương'],
                ['Thiên Lương', 'Tử Vi', 'Thiên Phủ', 'Vũ Khúc'],
                ['Phá Quân', 'Cự Môn', 'Thái Âm', 'Tham Lang']
            ];

            // 12. Sao Theo Tháng
            let taPhuPos = (4 + (calcLunarMonth - 1)) % 12;
            let huuBatPos = (10 - (calcLunarMonth - 1) + 120) % 12;
            addPhu("Tả Phù", taPhuPos, true);
            addPhu("Hữu Bật", huuBatPos, true);

            let thienHinhPos = (9 + (calcLunarMonth - 1)) % 12;
            let thienHinhDac = [2, 8, 3, 9].includes(thienHinhPos) ? "Đ" : "H";
            addPhu("Thiên Hình", thienHinhPos, false, thienHinhDac);

            let thienDieuPos = (1 + (calcLunarMonth - 1)) % 12;
            let thienDieuDac = [3, 9, 10, 11].includes(thienDieuPos) ? "Đ" : "H";
            addPhu("Thiên Diêu", thienDieuPos, false, thienDieuDac);
            addPhu("Thiên Y", thienDieuPos, true);

            let diaGiaiPos = (7 - (calcLunarMonth - 1) + 120) % 12;
            addPhu("Địa Giải", diaGiaiPos, true);

            let thienGiaiPos = (8 + (calcLunarMonth - 1)) % 12;
            addPhu("Thiên Giải", thienGiaiPos, true);

            // 13. Sao Theo Giờ
            let vanXuongPos = (10 - hourChiIdx + 120) % 12;
            let vanKhucPos = (4 + hourChiIdx) % 12;
            let vanXuongDac = [5, 9, 1, 4, 10].includes(vanXuongPos) ? "Đ" : "H";
            let vanKhucDac = [5, 9, 1, 4, 10].includes(vanKhucPos) ? "Đ" : "H";
            addPhu("Văn Xương", vanXuongPos, true, vanXuongDac);
            addPhu("Văn Khúc", vanKhucPos, true, vanKhucDac);

            let diaKhongPos = (11 - hourChiIdx + 120) % 12;
            let diaKiepPos = (11 + hourChiIdx) % 12;
            let diaKhongDac = [5, 11, 2, 8].includes(diaKhongPos) ? "Đ" : "H";
            let diaKiepDac = [5, 11, 2, 8].includes(diaKiepPos) ? "Đ" : "H";
            addPhu("Địa Không", diaKhongPos, false, diaKhongDac);
            addPhu("Địa Kiếp", diaKiepPos, false, diaKiepDac);

            let hoaBase = 2, linhBase = 10;
            if ([2, 6, 10].includes(chiYearIdx)) { hoaBase = 1; linhBase = 3; }
            else if ([8, 0, 4].includes(chiYearIdx)) { hoaBase = 2; linhBase = 10; }
            else if ([5, 9, 1].includes(chiYearIdx)) { hoaBase = 3; linhBase = 10; }
            else { hoaBase = 9; linhBase = 10; }

            let hoaTinhPos = isThuanLy ? ((hoaBase + hourChiIdx) % 12) : ((hoaBase - hourChiIdx + 120) % 12);
            let linhTinhPos = isThuanLy ? ((linhBase - hourChiIdx + 120) % 12) : ((linhBase + hourChiIdx) % 12);
            let hoaTinhDac = [2, 6, 10, 5, 11].includes(hoaTinhPos) ? "Đ" : "H";
            let linhTinhDac = [2, 6, 10, 5, 11].includes(linhTinhPos) ? "Đ" : "H";
            addPhu("Hoả Tinh", hoaTinhPos, false, hoaTinhDac);
            addPhu("Linh Tinh", linhTinhPos, false, linhTinhDac);

            let thaiPhuPos = (6 + hourChiIdx) % 12;
            let phongCaoPos = (2 + hourChiIdx) % 12;
            addPhu("Thai Phụ", thaiPhuPos, true);
            addPhu("Phong Cáo", phongCaoPos, true);

            // Gán Tứ Hóa
            let currentTuHoa = tuHoaData[canYearIdx];
            let allStarPositions = { ...saoChinhPos, "Văn Xương": vanXuongPos, "Văn Khúc": vanKhucPos, "Tả Phù": taPhuPos, "Hữu Bật": huuBatPos, "Thiên Phủ": thienPhuPos };
            let hoaSuffixes = ["Hóa Lộc", "Hóa Quyền", "Hóa Khoa", "Hóa Kỵ"];
            let hoaGood = [true, true, true, false];
            for (let h = 0; h < 4; h++) {
                let hostStar = currentTuHoa[h];
                let hPos = allStarPositions[hostStar];
                if (hPos !== undefined) {
                    let dt = (canYearIdx === 4) ? ["Đ", "H", "V", "Đ"][h] : "Đ";
                    addPhu(hoaSuffixes[h], hPos, hoaGood[h], dt);
                }
            }

            // 14. Sao Theo Ngày
            let tamThaiPos = (taPhuPos + (lunarDay - 1)) % 12;
            let batToaPos = (huuBatPos - (lunarDay - 1) + 1200) % 12;
            addPhu("Tam Thai", tamThaiPos, true);
            addPhu("Bát Tọa", batToaPos, true);

            let anQuangPos = (vanXuongPos + (lunarDay - 1) - 1 + 1200) % 12;
            let thienQuyPos = (vanKhucPos - (lunarDay - 1) + 1 + 1200) % 12;
            addPhu("Ân Quang", anQuangPos, true);
            addPhu("Thiên Quý", thienQuyPos, true);

            // 15. Sao Theo Chi Năm
            let khoiTable = [1, 0, 11, 11, 1, 0, 6, 6, 3, 3];
            let vietTable = [7, 8, 9, 9, 7, 8, 2, 2, 5, 5];
            addPhu("Thiên Khôi", khoiTable[canYearIdx], true);
            addPhu("Thiên Việt", vietTable[canYearIdx], true);

            let thienMaTable = [2, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8, 5];
            let thienMaPos = thienMaTable[chiYearIdx];
            let thienMaDac = [2, 5, 8, 11].includes(thienMaPos) ? "Đ" : "H";
            addPhu("Thiên Mã", thienMaPos, true, thienMaDac);

            let hoaCaiTable = [4, 1, 10, 7, 4, 1, 10, 7, 4, 1, 10, 7];
            let daoHoaTable = [9, 6, 3, 0, 9, 6, 3, 0, 9, 6, 3, 0];
            let kiepSatTable = [5, 2, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8];
            addPhu("Hoa Cái", hoaCaiTable[chiYearIdx], true);
            addPhu("Đào Hoa", daoHoaTable[chiYearIdx], true);
            addPhu("Kiếp Sát", kiepSatTable[chiYearIdx], false);

            let phaToaiTable = [5, 1, 9, 5, 1, 9, 5, 1, 9, 5, 1, 9];
            addPhu("Phá Toái", phaToaiTable[chiYearIdx], false);

            let thienKhocPos = (6 - chiYearIdx + 120) % 12;
            let thienHuPos = (6 + chiYearIdx) % 12;
            let khocHuDac = [0, 6, 3, 9, 1, 7].includes(thienKhocPos) ? "Đ" : "H";
            addPhu("Thiên Khốc", thienKhocPos, false, khocHuDac);
            addPhu("Thiên Hư", thienHuPos, false, khocHuDac);

            let hongLoanPos = (3 - chiYearIdx + 120) % 12;
            let thienHyPos = (hongLoanPos + 6) % 12;
            addPhu("Hồng Loan", hongLoanPos, true);
            addPhu("Thiên Hỷ", thienHyPos, true);

            let longTriPos = (4 + chiYearIdx) % 12;
            let phuongCacPos = (10 - chiYearIdx + 120) % 12;
            addPhu("Long Trì", longTriPos, true);
            addPhu("Phượng Các", phuongCacPos, true);
            addPhu("Giải Thần", phuongCacPos, true);

            let coThanTable = [2, 2, 5, 5, 5, 8, 8, 8, 11, 11, 11, 2];
            let quaTuTable = [10, 10, 1, 1, 1, 4, 4, 4, 7, 7, 7, 10];
            addPhu("Cô Thần", coThanTable[chiYearIdx], false);
            addPhu("Quả Tú", quaTuTable[chiYearIdx], false);

            let dauQuanPos = ((chiYearIdx - (calcLunarMonth - 1) + 1200) + hourChiIdx) % 12;
            addPhu("Đẩu Quân", dauQuanPos, false);

            let nguyetDucPos = (5 + chiYearIdx) % 12;
            addPhu("Nguyệt Đức", nguyetDucPos, true);

            let thienKhongPos = (chiYearIdx + 1) % 12;
            addPhu("Thiên Không", thienKhongPos, false);

            // 16. Sao Theo Can Năm
            let quocAnPos = (locTonPos + 8) % 12;
            let duongPhuPos = (locTonPos - 7 + 120) % 12;
            addPhu("Quốc Ấn", quocAnPos, true);
            addPhu("Đường Phù", duongPhuPos, true);

            let thienQuanTable = [7, 4, 5, 2, 3, 9, 11, 9, 10, 6];
            let thienPhucTable = [9, 8, 0, 11, 3, 2, 6, 5, 6, 5];
            addPhu("Thiên Quan", thienQuanTable[canYearIdx], true);
            addPhu("Thiên Phúc", thienPhucTable[canYearIdx], true);

            let thienTruTable = [5, 6, 0, 5, 6, 8, 2, 6, 9, 10];
            let luuHaTable = [9, 10, 7, 4, 5, 6, 8, 3, 11, 2];
            let lnVanTinhTable = [5, 6, 8, 9, 8, 9, 11, 0, 2, 3];
            addPhu("Thiên Trù", thienTruTable[canYearIdx], true);
            addPhu("Lưu Hà", luuHaTable[canYearIdx], false);
            addPhu("LN Văn Tinh", lnVanTinhTable[canYearIdx], true);

            // 17. Cung Cố Định & Mệnh/Thân
            addPhu("Thiên La", 4, false);
            addPhu("Địa Võng", 10, false);

            let cungNoBoc = (menhPos + 5) % 12;
            let cungTatAch = (menhPos + 7) % 12;
            addPhu("Thiên Thương", cungNoBoc, false);
            addPhu("Thiên Sứ", cungTatAch, false);

            let thienTaiPos = (menhPos + chiYearIdx) % 12;
            let thienThoPos = (thanPos + chiYearIdx) % 12;
            addPhu("Thiên Tài", thienTaiPos, true);
            addPhu("Thiên Thọ", thienThoPos, true);

            // 18. Tuần Không & Triệt Không
            let trietStart = (8 - (canYearIdx % 5) * 2 + 120) % 12;
            let triet1 = trietStart, triet2 = (trietStart + 1) % 12;
            diaBan[triet1].has_triet = true;
            diaBan[triet2].has_triet = true;

            let tuan1 = (chiYearIdx + (10 - canYearIdx)) % 12;
            let tuan2 = (tuan1 + 1) % 12;
            diaBan[tuan1].has_tuan = true;
            diaBan[tuan2].has_tuan = true;

            // 19. Hệ Thống Sao Lưu
            addLuu("L.Thái Tuế", limitChiIdx, false);
            addLuu("L.Tang Môn", (limitChiIdx + 2) % 12, false);
            addLuu("L.Bạch Hổ", (limitChiIdx + 8) % 12, false);
            addLuu("L.Thiên Khốc", (6 - limitChiIdx + 120) % 12, false);
            addLuu("L.Thiên Hư", (6 + limitChiIdx) % 12, false);

            let luuLocTonPos = locTonTable[limitCanIdx];
            addLuu("L.Lộc Tồn", luuLocTonPos, true);
            addLuu("L.Kình Dương", (luuLocTonPos + 1) % 12, false);
            addLuu("L.Đà La", (luuLocTonPos - 1 + 120) % 12, false);

            let luuThienMaPos = thienMaTable[limitChiIdx];
            addLuu("L.Thiên Mã", luuThienMaPos, true);

            return {
                thien_ban: {
                    ho_ten: name,
                    gioi_tinh: gender,
                    duong_lich: { ngay: solarDay, thang: solarMonth, nam: solarYear, gio: hour, phut: minute },
                    am_lich: { 
                        ngay: lunarDay, 
                        thang: lunarMonth, 
                        nam: lunarYear, 
                        thang_nhuan: isLeap === 1,
                        can_chi_nam: `${canYear} ${CHI_DISPLAY[chiYearIdx]}`,
                        can_chi_thang: `${canMonth} ${CHI_DISPLAY[chiMonthIdx]}`,
                        can_chi_ngay: `${canDay} ${CHI_DISPLAY[chiDayIdx]}`,
                        can_chi_gio: `${canHour} ${CHI_DISPLAY[hourChiIdx]}`
                    },
                    nam_xem_han: { nam: limitYear, can_chi: `${limitCan} ${CHI_DISPLAY[limitChiIdx]}`, tuoi_mu: tuoiMu },
                    am_duong_menh: amDuongMenh,
                    menh_nap_am: menhNapAm,
                    cuc: cucName,
                    chu_menh: chuMenh,
                    chu_than: chuThan,
                    am_duong_ly: amDuongLy,
                    cuc_menh_tuong_quan: cucMenhTuongQuan,
                    than_cu: thanCuName
                },
                dia_ban: diaBan,
                tuan_cung: [tuan1, tuan2],
                triet_cung: [triet1, triet2]
            };
        }

        // =========================================================================
        // 4. BỘ RENDER GIAO DIỆN LÁ SỐ UI
        // =========================================================================
        function renderTuViBoard(chart) {
            currentChartData = chart;
            let tb = chart.thien_ban;
            let db = chart.dia_ban;

            // Cập nhật Thiên Bàn (1 Cột Dọc Đầy Đủ)
            document.getElementById("tb-name").innerText = tb.ho_ten;

            document.getElementById("tb-solar-year").innerText = tb.duong_lich.nam;
            document.getElementById("tb-lunar-year").innerText = tb.am_lich.can_chi_nam;

            document.getElementById("tb-solar-month").innerText = String(tb.duong_lich.thang).padStart(2, '0');
            document.getElementById("tb-lunar-month").innerText = tb.am_lich.can_chi_thang;
            document.getElementById("tb-lunar-month-tag").innerText = `(Th.${tb.am_lich.thang}${tb.am_lich.thang_nhuan ? 'N' : ''} Âm)`;

            document.getElementById("tb-solar-day").innerText = String(tb.duong_lich.ngay).padStart(2, '0');
            document.getElementById("tb-lunar-day").innerText = tb.am_lich.can_chi_ngay;
            document.getElementById("tb-lunar-day-tag").innerText = `(Ng.${tb.am_lich.ngay} Âm)`;

            document.getElementById("tb-solar-hour").innerText = `${String(tb.duong_lich.gio).padStart(2, '0')}:${String(tb.duong_lich.phut).padStart(2, '0')}`;
            document.getElementById("tb-lunar-hour").innerText = tb.am_lich.can_chi_gio;

            document.getElementById("tb-solar-watch").innerText = tb.nam_xem_han.nam;
            document.getElementById("tb-lunar-watch").innerText = tb.nam_xem_han.can_chi;
            document.getElementById("tb-tuoi-mu").innerText = `${tb.nam_xem_han.tuoi_mu} tuổi`;

            document.getElementById("tb-am-duong").innerText = tb.am_duong_menh;
            document.getElementById("tb-menh").innerText = tb.menh_nap_am;
            document.getElementById("tb-cuc").innerText = tb.cuc;
            document.getElementById("tb-chu-menh").innerText = tb.chu_menh;
            document.getElementById("tb-chu-than").innerText = tb.chu_than;
            document.getElementById("tb-am-duong-ly").innerText = tb.am_duong_ly;
            document.getElementById("tb-cuc-menh-ly").innerText = tb.cuc_menh_tuong_quan;
            document.getElementById("tb-than-cu").innerText = tb.than_cu;

            // Xóa 12 Cung cũ (trừ Thiên Bàn)
            const board = document.getElementById("tuviBoard");
            const existingHouses = board.querySelectorAll(".house");
            existingHouses.forEach(h => h.remove());

            // Render 12 Cung với Micro-Grid 4 Zone
            for (let i = 0; i < 12; i++) {
                let c = db[i];
                let houseEl = document.createElement("div");
                houseEl.className = "house";
                houseEl.id = `house-${i}`;

                // Header
                let thanBadge = c.is_than ? `<span class="cung-than-badge">THÂN</span>` : '';
                let cleanTenCung = c.ten_cung.replace(" <THÂN>", "");

                let headerHtml = `
                    <div class="house-header">
                        <div class="house-header-left ${c.can_hanh}">
                            <span class="can-cung">${c.can_cung}</span>
                            <span class="chi-cung">${c.cung_chi}</span>
                        </div>
                        <div class="cung-name-wrap">
                            <span class="cung-name">${cleanTenCung}</span>
                            ${thanBadge}
                        </div>
                        <div class="house-header-right">
                            <span class="dai-han">${c.dai_han}</span>
                        </div>
                    </div>`;

                // Chính tinh (Zone 2)
                let chinhTinhHtml = `<div class="chinh-tinh-box">`;
                if (c.chinh_tinh.length > 0) {
                    c.chinh_tinh.forEach(s => {
                        let dtClass = s.dac_tinh ? `dac-tinh` : '';
                        let dtText = s.dac_tinh ? `(${s.dac_tinh})` : '';
                        chinhTinhHtml += `<div class="chinh-tinh-item ${s.ngu_hanh}">${s.ten}<span class="${dtClass}">${dtText}</span></div>`;
                    });
                }
                chinhTinhHtml += `</div>`;

                // Phụ tinh 2 cột (Zone 3)
                let leftColHtml = `<div class="phu-tinh-col left">`;
                c.phu_tinh_tot.forEach(s => {
                    let dt = s.dac_tinh ? ` (${s.dac_tinh})` : '';
                    leftColHtml += `<span class="star-item ${s.ngu_hanh}">${s.ten}${dt}</span>`;
                });
                c.sao_luu.filter(l => l.loai === "tot").forEach(l => {
                    leftColHtml += `<span class="star-item tho luu">${l.ten}</span>`;
                });
                leftColHtml += `</div>`;

                let rightColHtml = `<div class="phu-tinh-col right">`;
                c.phu_tinh_xau.forEach(s => {
                    let dt = s.dac_tinh ? ` (${s.dac_tinh})` : '';
                    let cls = s.ngu_hanh || 'hoa';
                    rightColHtml += `<span class="star-item ${cls}">${s.ten}${dt}</span>`;
                });
                c.sao_luu.filter(l => l.loai === "xau").forEach(l => {
                    rightColHtml += `<span class="star-item hoa luu">${l.ten}</span>`;
                });
                rightColHtml += `</div>`;

                let phuTinhGridHtml = `<div class="phu-tinh-grid">${leftColHtml}${rightColHtml}</div>`;

                // Chân cung (Zone 4)
                let footerHtml = `
                    <div class="house-footer">
                        <span class="tieu-han-label">${c.tieu_han_chi}</span>
                        <span class="trang-sinh-label">${c.trang_sinh}</span>
                        <span class="nguyet-han-label">Tháng ${c.nguyet_han_thang}</span>
                    </div>`;

                houseEl.innerHTML = headerHtml + chinhTinhHtml + phuTinhGridHtml + footerHtml;
                board.appendChild(houseEl);
            }

            // Cập nhật JSON Viewer nếu đang mở
            document.getElementById("jsonOutputContent").innerText = JSON.stringify(chart, null, 2);
        }

        // =========================================================================
        // 5. EVENT HANDLERS & GIAO DIỆN NGƯỜI DÙNG
        // =========================================================================
        function populateSelect(id, start, end, selected) {
            const select = document.getElementById(id);
            select.innerHTML = "";
            for (let i = start; i <= end; i++) {
                let val = i.toString().padStart(2, '0');
                let option = new Option(val, i);
                if (i === selected) option.selected = true;
                select.add(option);
            }
        }

        function initDropdowns() {
            populateSelect("txtYear", 1930, 2050, 2008);
            populateSelect("txtMonth", 1, 12, 8);
            populateSelect("txtDay", 1, 31, 8);
            populateSelect("txtHour", 0, 23, 10);
            populateSelect("txtMinute", 0, 59, 30);
            populateSelect("txtLimitYear", 2000, 2050, 2026);
        }

        function toggleCalendarType() {
            let isLunar = document.querySelector('input[name="calendar"]:checked').value === "lunar";
            document.getElementById("rowLeapMonth").style.display = isLunar ? "flex" : "none";
        }

        function loadSampleCase() {
            document.getElementById("txtName").value = "Group FB Tử Vi Việt Nam";
            document.querySelector('input[name="gender"][value="Nam"]').checked = true;
            document.querySelector('input[name="calendar"][value="solar"]').checked = true;
            document.getElementById("txtYear").value = 2008;
            document.getElementById("txtMonth").value = 8;
            document.getElementById("txtDay").value = 8;
            document.getElementById("txtHour").value = 10;
            document.getElementById("txtMinute").value = 30;
            document.getElementById("txtLimitYear").value = 2026;
            toggleCalendarType();
            generateTuVi();
        }

        function generateTuVi() {
            let name = document.getElementById("txtName").value.trim() || "Vô Danh";
            let gender = document.querySelector('input[name="gender"]:checked').value;
            let isSolar = document.querySelector('input[name="calendar"]:checked').value === "solar";
            let isLeapMonthInput = document.getElementById("chkIsLeap").checked;

            let year = parseInt(document.getElementById("txtYear").value);
            let month = parseInt(document.getElementById("txtMonth").value);
            let day = parseInt(document.getElementById("txtDay").value);
            let hour = parseInt(document.getElementById("txtHour").value);
            let minute = parseInt(document.getElementById("txtMinute").value);
            let limitYear = parseInt(document.getElementById("txtLimitYear").value);

            let chart = calculateTuViChart({
                name,
                gender,
                isSolar,
                day,
                month,
                year,
                hour,
                minute,
                isLeapMonthInput,
                limitYear
            });

            renderTuViBoard(chart);
        }

        function toggleJsonViewer() {
            let box = document.getElementById("jsonContainer");
            if (!box) return;
            box.style.display = (box.style.display === "block") ? "none" : "block";
            if (box.style.display === "block" && currentChartData) {
                document.getElementById("jsonOutputContent").innerText = JSON.stringify(currentChartData, null, 2);
            }
        }

        function copyJsonData() {
            if (!currentChartData) return;
            navigator.clipboard.writeText(JSON.stringify(currentChartData, null, 2)).then(() => {
                alert("Đã sao chép toàn bộ dữ liệu cấu trúc JSON vào clipboard!");
            });
        }

        window.toggleJsonViewer = toggleJsonViewer;
        window.copyJsonData = copyJsonData;

        // Tự động khởi chạy khi tải trang
        window.onload = function () {
            initDropdowns();
            loadSampleCase();
        };
    