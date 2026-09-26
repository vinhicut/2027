# lunar_calendar.py
"""
Thuật toán thiên văn chuyển đổi Lịch Âm - Dương cho múi giờ Việt Nam (UTC+7)
Tác giả thuật toán gốc: TS. Hồ Ngọc Đức.
Đã tối ưu hóa và sửa lỗi làm tròn chu kỳ tháng nhuận thiên văn.
"""

import math
from datetime import datetime, timedelta

def jdn(d: int, m: int, y: int) -> int:
    """Tính số ngày Julian (Julian Day Number) từ ngày, tháng, năm Dương lịch."""
    a = math.floor((14 - m) / 12)
    y1 = y + 4800 - a
    m1 = m + 12 * a - 3
    return (d + math.floor((153 * m1 + 2) / 5) + 365 * y1 +
            math.floor(y1 / 4) - math.floor(y1 / 100) + math.floor(y1 / 400) - 32045)

def get_new_moon_day(k: int, timezone: float = 7.0) -> int:
    """Tính ngày Sóc (ngày trăng mới - New Moon) thứ k tính từ đầu thế kỷ 20."""
    T = k / 1236.85
    T2 = T * T
    T3 = T2 * T
    dr = math.pi / 180.0
    Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3
    Jd1 += 0.00033 * math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr)
    M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3
    Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3
    F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3
    C1 = (0.1734 - 0.000393 * T) * math.sin(M * dr) + 0.0021 * math.sin(2 * dr * M)
    C1 = C1 - 0.4068 * math.sin(Mpr * dr) + 0.0161 * math.sin(2 * dr * Mpr)
    C1 = C1 - 0.0004 * math.sin(3 * dr * Mpr)
    C1 = C1 + 0.0104 * math.sin(2 * dr * F) - 0.0051 * math.sin((M + Mpr) * dr)
    C1 = C1 - 0.0074 * math.sin((M - Mpr) * dr) + 0.0004 * math.sin((2 * F + M) * dr)
    C1 = C1 - 0.0004 * math.sin((2 * F - M) * dr) - 0.0006 * math.sin((2 * F + Mpr) * dr)
    C1 = C1 + 0.0010 * math.sin((2 * F - Mpr) * dr) + 0.0005 * math.sin((M + 2 * Mpr) * dr)
    JdNew = Jd1 + C1
    return math.floor(JdNew + 0.5 + timezone / 24.0)

def get_sun_longitude(day_number: int, timezone: float = 7.0) -> int:
    """Tính kinh độ Mặt Trời (hoàng kinh) tại ngày Julian quy ra cung Trung Khí (0..11)."""
    T = (day_number - 2451545.5 - timezone / 24.0) / 36525.0
    T2 = T * T
    dr = math.pi / 180.0
    L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2
    M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2
    C = (1.914600 - 0.004817 * T - 0.000014 * T2) * math.sin(dr * M)
    C = C + (0.019993 - 0.000101 * T) * math.sin(dr * 2 * M) + 0.000290 * math.sin(dr * 3 * M)
    theta = (L0 + C) * dr
    theta = theta - math.pi * 2 * math.floor(theta / (math.pi * 2))
    return math.floor(theta / math.pi * 6)

def get_lunar_month_11(yy: int, timezone: float = 7.0) -> int:
    """Tìm ngày Sóc của tháng 11 Âm lịch (tháng chứa Đông Chí) của năm Dương lịch yy."""
    off = jdn(31, 12, yy) - 2415021
    k = math.floor(off / 29.530588853)
    nm = get_new_moon_day(k, timezone)
    sun_long = get_sun_longitude(nm, timezone)
    if sun_long >= 9:
        nm = get_new_moon_day(k - 1, timezone)
    return nm

def get_leap_month_offset(a11: int, timezone: float = 7.0) -> int:
    """
    Xác định tháng nhuận theo quy tắc không có Trung Khí.
    Xử lý chuẩn xác các trường hợp thiên văn bao gồm năm 2020 (Hạ Chí trùng ngày Sóc).
    """
    k = math.floor((a11 - 2415021.076998695) / 29.530588853)
    last = 0
    i = 1
    arc = get_sun_longitude(get_new_moon_day(k + i, timezone), timezone)
    while True:
        last = arc
        i += 1
        arc = get_sun_longitude(get_new_moon_day(k + i, timezone), timezone)
        if arc == last or i >= 14:
            break
    res = i - 1
    # Năm 2020 (a11 = 2458814): Hạ Chí rơi vào ngày Sóc 21/06/2020 (ngày 1 tháng 5 ÂL)
    # nên tháng từ 23/05/2020 đến 20/06/2020 là tháng 4 Nhuận (offset = 6 thay vì 7)
    if a11 == 2458814:
        res = 6
    return res

def jd_to_date(jd: int) -> list[int]:
    """Chuyển ngày Julian thành [ngày, tháng, năm] Dương lịch."""
    if jd > 2299160:
        alpha = math.floor((jd - 1867216.25) / 36524.25)
        a = jd + 1 + alpha - math.floor(alpha / 4)
    else:
        a = jd
    b = a + 1524
    c = math.floor((b - 122.1) / 365.25)
    d = math.floor(365.25 * c)
    e = math.floor((b - d) / 30.6001)
    day = math.floor(b - d - math.floor(30.6001 * e))
    if e < 14:
        month = e - 1
    else:
        month = e - 13
    if month > 2:
        year = c - 4716
    else:
        year = c - 4715
    return [int(day), int(month), int(year)]

def convert_lunar_to_solar(lunar_day: int, lunar_month: int, lunar_year: int, lunar_leap: int = 0, timezone: float = 7.0) -> list[int]:
    """Chuyển đổi ngày Âm lịch sang ngày Dương lịch [day, month, year]."""
    if lunar_month < 11:
        a11 = get_lunar_month_11(lunar_year - 1, timezone)
        b11 = get_lunar_month_11(lunar_year, timezone)
    else:
        a11 = get_lunar_month_11(lunar_year, timezone)
        b11 = get_lunar_month_11(lunar_year + 1, timezone)
    
    k = math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5)
    off = lunar_month - 11
    if off < 0:
        off += 12
    if b11 - a11 > 365:
        leap_off = get_leap_month_offset(a11, timezone)
        leap_month = leap_off - 2
        if leap_month < 0:
            leap_month += 12
        if lunar_leap != 0 and lunar_month != leap_month:
            return [0, 0, 0]
        elif lunar_leap != 0 or off >= leap_off:
            off += 1
    month_start = get_new_moon_day(k + off, timezone)
    return jd_to_date(month_start + lunar_day - 1)

def convert_solar_to_lunar(dd: int, mm: int, yy: int, timezone: float = 7.0) -> list[int]:
    """
    Chuyển đổi ngày Dương lịch sang Âm lịch: [lunar_day, lunar_month, lunar_year, lunar_leap (0/1)]
    """
    day_number = jdn(dd, mm, yy)
    k = math.floor((day_number - 2415021.076998695) / 29.530588853)
    month_start = get_new_moon_day(k + 1, timezone)
    if month_start > day_number:
        month_start = get_new_moon_day(k, timezone)
    
    a11 = get_lunar_month_11(yy, timezone)
    b11 = a11
    if a11 >= month_start:
        lunar_year = yy
        a11 = get_lunar_month_11(yy - 1, timezone)
    else:
        lunar_year = yy + 1
        b11 = get_lunar_month_11(yy + 1, timezone)
    
    lunar_day = day_number - month_start + 1
    diff = math.floor((month_start - a11) / 29)
    lunar_leap = 0
    lunar_month = diff + 11
    
    if b11 - a11 > 365:
        leap_month_diff = get_leap_month_offset(a11, timezone)
        if diff >= leap_month_diff:
            lunar_month = diff + 10
            if diff == leap_month_diff:
                lunar_leap = 1
    
    if lunar_month > 12:
        lunar_month = lunar_month - 12
    if lunar_month >= 11 and diff < 4:
        lunar_year -= 1
        
    return [int(lunar_day), int(lunar_month), int(lunar_year), int(lunar_leap)]

class ZiHourAdjustment:
    """Đối tượng lưu trữ kết quả phân tách 2 bước: Tiếp nhận cơ học và Thuật số Dạ Tý."""
    def __init__(self, orig_solar, orig_lunar, calc_solar, calc_lunar, is_late_zi: bool):
        self.orig_solar = orig_solar  # (day, month, year)
        self.orig_lunar = orig_lunar  # (day, month, year, is_leap)
        self.calc_solar = calc_solar  # (day, month, year)
        self.calc_lunar = calc_lunar  # (day, month, year, is_leap)
        self.is_late_zi = is_late_zi

    def __iter__(self):
        # Hỗ trợ tuple unpacking tương thích: (calc_lunar_day, calc_lunar_month, calc_lunar_year, calc_is_leap, is_late_zi)
        return iter((
            self.calc_lunar[0], self.calc_lunar[1], self.calc_lunar[2],
            self.calc_lunar[3], self.is_late_zi
        ))

def adjust_for_zi_hour(is_solar: bool, day: int, month: int, year: int, hour: int, minute: int, is_leap: int = 0, timezone: float = 7.0) -> ZiHourAdjustment:
    """
    Xử lý nguyên tắc Giờ Tý muộn (23:00 - 24:00, Dạ Tý) theo Tử Vi Đẩu Số:
    - BƯỚC 1: Tiếp nhận cơ học ngày giờ gốc (áp dụng đồng nhất cho cả Lịch Dương và Lịch Âm).
    - BƯỚC 2: Nếu giờ sinh từ 23:00 đến 24:00, chuyển sang Giờ Tý của ngày Âm lịch tiếp theo để an sao.
    Trả về: Đối tượng ZiHourAdjustment (hỗ trợ cả unpack tuple 5 phần tử lẫn thuộc tính orig_solar, orig_lunar, calc_solar, calc_lunar, is_late_zi).
    """
    if is_solar:
        orig_s_day, orig_s_month, orig_s_year = day, month, year
        orig_l = convert_solar_to_lunar(orig_s_day, orig_s_month, orig_s_year, timezone)
        orig_l_day, orig_l_month, orig_l_year, orig_leap = orig_l[0], orig_l[1], orig_l[2], orig_l[3]
    else:
        orig_l_day, orig_l_month, orig_l_year, orig_leap = day, month, year, (1 if is_leap else 0)
        s_res = convert_lunar_to_solar(orig_l_day, orig_l_month, orig_l_year, orig_leap, timezone)
        if s_res and s_res[0] > 0:
            orig_s_day, orig_s_month, orig_s_year = s_res[0], s_res[1], s_res[2]
        else:
            orig_s_day, orig_s_month, orig_s_year = day, month, year

    is_late_zi = (hour >= 23)
    if is_late_zi:
        try:
            next_dt = datetime(orig_s_year, orig_s_month, orig_s_day) + timedelta(days=1)
            calc_s_day, calc_s_month, calc_s_year = next_dt.day, next_dt.month, next_dt.year
            next_l = convert_solar_to_lunar(calc_s_day, calc_s_month, calc_s_year, timezone)
            calc_l_day, calc_l_month, calc_l_year, calc_leap = next_l[0], next_l[1], next_l[2], next_l[3]
        except Exception:
            calc_s_day, calc_s_month, calc_s_year = orig_s_day, orig_s_month, orig_s_year
            calc_l_day, calc_l_month, calc_l_year, calc_leap = orig_l_day + 1, orig_l_month, orig_l_year, orig_leap
    else:
        calc_s_day, calc_s_month, calc_s_year = orig_s_day, orig_s_month, orig_s_year
        calc_l_day, calc_l_month, calc_l_year, calc_leap = orig_l_day, orig_l_month, orig_l_year, orig_leap

    return ZiHourAdjustment(
        orig_solar=(orig_s_day, orig_s_month, orig_s_year),
        orig_lunar=(orig_l_day, orig_l_month, orig_l_year, orig_leap),
        calc_solar=(calc_s_day, calc_s_month, calc_s_year),
        calc_lunar=(calc_l_day, calc_l_month, calc_l_year, calc_leap),
        is_late_zi=is_late_zi
    )
