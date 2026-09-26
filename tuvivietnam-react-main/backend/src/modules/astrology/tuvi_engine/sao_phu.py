from .constants import TU_HOA_TABLE
from .models import ChartContext

def an_sao_phu(ctx: ChartContext):
    """
    An toàn bộ các phụ tinh: Thái Tuế, Lộc Tồn, Tứ Hóa, các sao theo Tháng/Ngày/Giờ/Năm.
    """
    # 8. Vòng Thái Tuế
    thai_tue_names = ['Thái Tuế', 'Thiếu Dương', 'Tang Môn', 'Thiếu Âm', 'Quan Phù', 'Tử Phù', 
                      'Tuế Phá', 'Long Đức', 'Bạch Hổ', 'Phúc Đức', 'Điếu Khách', 'Trực Phù']
    thai_tue_good = [False, True, False, True, False, False, False, True, False, True, False, False]
    tang_ho_dac = {2: 'Đ', 8: 'Đ', 3: 'Đ', 9: 'Đ'}
    for i in range(12):
        p = (ctx.chi_year_idx + i) % 12
        s_name = thai_tue_names[i]
        dt = ""
        if s_name in ['Tang Môn', 'Bạch Hổ']:
            dt = tang_ho_dac.get(p, "")
        ctx.add_phu(s_name, p, thai_tue_good[i], dt)
        if s_name == "Phúc Đức":
            ctx.add_phu("Thiên Đức", p, True)
            
    # 9. Vòng Lộc Tồn & Bác Sỹ
    loc_ton_table = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0]
    ctx.loc_ton_pos = loc_ton_table[ctx.can_year_idx]
    ctx.add_phu("Lộc Tồn", ctx.loc_ton_pos, True, "")
    
    kinh_duong_pos = (ctx.loc_ton_pos + 1) % 12
    da_la_pos = (ctx.loc_ton_pos - 1 + 12) % 12
    kinh_da_dac = "Đ" if kinh_duong_pos in [4, 10, 1, 7] else "H"
    da_la_dac = "Đ" if da_la_pos in [4, 10, 1, 7] else "H"
    ctx.add_phu("Kình Dương", kinh_duong_pos, False, kinh_da_dac)
    ctx.add_phu("Đà La", da_la_pos, False, da_la_dac)
    
    bac_sy_names = ['Bác Sỹ', 'Lực Sĩ', 'Thanh Long', 'Tiểu Hao', 'Tướng Quân', 'Tấu Thư', 
                    'Phi Liêm', 'Hỷ Thần', 'Bệnh Phù', 'Đại Hao', 'Phục Binh', 'Quan Phủ']
    bac_sy_good = [True, True, True, False, False, True, False, True, False, False, False, False]
    for i in range(12):
        p = (ctx.loc_ton_pos + ctx.step_dir * i + 1200) % 12
        s_name = bac_sy_names[i]
        dt = ""
        if s_name in ["Đại Hao", "Tiểu Hao"]:
            dt = "Đ" if p in [2, 8, 3, 9] else "H"
        ctx.add_phu(s_name, p, bac_sy_good[i], dt)
        
    # 11. Sao Theo Tháng
    ta_phu_pos = (4 + (ctx.calc_lunar_month - 1)) % 12
    huu_bat_pos = (10 - (ctx.calc_lunar_month - 1) + 120) % 12
    ctx.add_phu("Tả Phù", ta_phu_pos, True)
    ctx.add_phu("Hữu Bật", huu_bat_pos, True)
    
    thien_hinh_pos = (9 + (ctx.calc_lunar_month - 1)) % 12
    thien_hinh_dac = "Đ" if thien_hinh_pos in [2, 8, 3, 9] else "H"
    ctx.add_phu("Thiên Hình", thien_hinh_pos, False, thien_hinh_dac)
    
    thien_dieu_pos = (1 + (ctx.calc_lunar_month - 1)) % 12
    thien_dieu_dac = "Đ" if thien_dieu_pos in [2, 3, 9, 10] else "H"
    ctx.add_phu("Thiên Diêu", thien_dieu_pos, False, thien_dieu_dac)
    ctx.add_phu("Thiên Y", thien_dieu_pos, True)
    
    dia_giai_pos = (7 + (ctx.calc_lunar_month - 1)) % 12
    ctx.add_phu("Địa Giải", dia_giai_pos, True)
    
    thien_giai_pos = (8 + (ctx.calc_lunar_month - 1)) % 12
    ctx.add_phu("Thiên Giải", thien_giai_pos, True)
    
    # 12. Sao Theo Giờ
    van_xuong_pos = (10 - ctx.hour_chi_idx + 120) % 12
    van_khuc_pos = (4 + ctx.hour_chi_idx) % 12
    van_xuong_dac = "Đ" if van_xuong_pos in [4, 10, 1, 7, 5, 11] else "H"
    van_khuc_dac = "Đ" if van_khuc_pos in [4, 10, 1, 7, 5, 11] else "H"
    ctx.add_phu("Văn Xương", van_xuong_pos, True, van_xuong_dac)
    ctx.add_phu("Văn Khúc", van_khuc_pos, True, van_khuc_dac)
    
    dia_khong_pos = (11 - ctx.hour_chi_idx + 120) % 12
    dia_kiep_pos = (11 + ctx.hour_chi_idx) % 12
    dia_khong_dac = "Đ" if dia_khong_pos in [5, 11, 2, 8] else "H"
    dia_kiep_dac = "Đ" if dia_kiep_pos in [5, 11, 2, 8] else "H"
    ctx.add_phu("Địa Không", dia_khong_pos, False, dia_khong_dac)
    ctx.add_phu("Địa Kiếp", dia_kiep_pos, False, dia_kiep_dac)
    
    if ctx.chi_year_idx in [2, 6, 10]:
        hoa_base, linh_base = 1, 3
    elif ctx.chi_year_idx in [8, 0, 4]:
        hoa_base, linh_base = 2, 10
    elif ctx.chi_year_idx in [5, 9, 1]:
        hoa_base, linh_base = 3, 10
    else:
        hoa_base, linh_base = 9, 10
        
    hoa_tinh_pos = ((hoa_base + ctx.hour_chi_idx) % 12) if ctx.is_thuan_ly else ((hoa_base - ctx.hour_chi_idx + 120) % 12)
    linh_tinh_pos = ((linh_base - ctx.hour_chi_idx + 120) % 12) if ctx.is_thuan_ly else ((linh_base + ctx.hour_chi_idx) % 12)
    hoa_tinh_dac = "Đ" if hoa_tinh_pos in [2, 3, 4, 5, 6] else "H"
    linh_tinh_dac = "Đ" if linh_tinh_pos in [2, 3, 4, 5, 6] else "H"
    ctx.add_phu("Hoả Tinh", hoa_tinh_pos, False, hoa_tinh_dac)
    ctx.add_phu("Linh Tinh", linh_tinh_pos, False, linh_tinh_dac)
    
    thai_phu_pos = (6 + ctx.hour_chi_idx) % 12
    phong_cao_pos = (2 + ctx.hour_chi_idx) % 12
    ctx.add_phu("Thai Phụ", thai_phu_pos, True)
    ctx.add_phu("Phong Cáo", phong_cao_pos, True)
    
    # 13. TỨ HÓA
    current_tu_hoa = TU_HOA_TABLE[ctx.can_year_idx]
    ctx.all_star_positions.update({
        "Văn Xương": van_xuong_pos,
        "Văn Khúc": van_khuc_pos,
        "Tả Phù": ta_phu_pos,
        "Tả Phụ": ta_phu_pos,
        "Hữu Bật": huu_bat_pos
    })
    
    hoa_names = ["Hóa Lộc", "Hóa Quyền", "Hóa Khoa", "Hóa Kỵ"]
    hoa_good = [True, True, True, False]
    for h in range(4):
        host_star = current_tu_hoa[h]
        h_pos = ctx.all_star_positions.get(host_star)
        if h_pos is not None:
            dt = "Đ" if h == 3 and h_pos in [4, 10, 1, 7] else ""
            ctx.add_phu(hoa_names[h], h_pos, hoa_good[h], dt)
            
    # 14. Sao Theo Ngày
    tam_thai_pos = (ta_phu_pos + (ctx.calc_lunar_day - 1)) % 12
    bat_toa_pos = (huu_bat_pos - (ctx.calc_lunar_day - 1) + 1200) % 12
    ctx.add_phu("Tam Thai", tam_thai_pos, True)
    ctx.add_phu("Bát Tọa", bat_toa_pos, True)
    
    an_quang_pos = (van_xuong_pos + (ctx.calc_lunar_day - 1) - 1 + 1200) % 12
    thien_quy_pos = (van_khuc_pos - (ctx.calc_lunar_day - 1) + 1 + 1200) % 12
    ctx.add_phu("Ân Quang", an_quang_pos, True)
    ctx.add_phu("Thiên Quý", thien_quy_pos, True)
    
    # 15. Sao Theo Chi Năm
    khoi_table = [1, 0, 11, 11, 1, 0, 6, 6, 3, 3]
    viet_table = [7, 8, 9, 9, 7, 8, 2, 2, 5, 5]
    ctx.add_phu("Thiên Khôi", khoi_table[ctx.can_year_idx], True)
    ctx.add_phu("Thiên Việt", viet_table[ctx.can_year_idx], True)
    
    thien_ma_table = [2, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8, 5]
    thien_ma_pos = thien_ma_table[ctx.chi_year_idx]
    thien_ma_dac = "Đ" if thien_ma_pos in [2, 5] else "H"
    ctx.add_phu("Thiên Mã", thien_ma_pos, True, thien_ma_dac)
    
    hoa_cai_table = [4, 1, 10, 7, 4, 1, 10, 7, 4, 1, 10, 7]
    dao_hoa_table = [9, 6, 3, 0, 9, 6, 3, 0, 9, 6, 3, 0]
    kiep_sat_table = [5, 2, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8]
    ctx.add_phu("Hoa Cái", hoa_cai_table[ctx.chi_year_idx], True)
    ctx.add_phu("Đào Hoa", dao_hoa_table[ctx.chi_year_idx], True)
    ctx.add_phu("Kiếp Sát", kiep_sat_table[ctx.chi_year_idx], False)
    
    pha_toai_table = [5, 1, 9, 5, 1, 9, 5, 1, 9, 5, 1, 9]
    ctx.add_phu("Phá Toái", pha_toai_table[ctx.chi_year_idx], False)
    
    thien_khoc_pos = (6 - ctx.chi_year_idx + 120) % 12
    thien_hu_pos = (6 + ctx.chi_year_idx) % 12
    thien_khoc_dac = "Đ" if thien_khoc_pos in [0, 6, 3, 9, 1, 7] else "H"
    thien_hu_dac = "Đ" if thien_hu_pos in [0, 6, 3, 9, 1, 7] else "H"
    ctx.add_phu("Thiên Khốc", thien_khoc_pos, False, thien_khoc_dac)
    ctx.add_phu("Thiên Hư", thien_hu_pos, False, thien_hu_dac)
    
    hong_loan_pos = (3 - ctx.chi_year_idx + 120) % 12
    thien_hy_pos = (hong_loan_pos + 6) % 12
    ctx.add_phu("Hồng Loan", hong_loan_pos, True)
    ctx.add_phu("Thiên Hỷ", thien_hy_pos, True)
    
    long_tri_pos = (4 + ctx.chi_year_idx) % 12
    phuong_cac_pos = (10 - ctx.chi_year_idx + 120) % 12
    ctx.add_phu("Long Trì", long_tri_pos, True)
    ctx.add_phu("Phượng Các", phuong_cac_pos, True)
    ctx.add_phu("Giải Thần", phuong_cac_pos, True)
    
    co_than_table = [2, 2, 5, 5, 5, 8, 8, 8, 11, 11, 11, 2]
    qua_tu_table = [10, 10, 1, 1, 1, 4, 4, 4, 7, 7, 7, 10]
    ctx.add_phu("Cô Thần", co_than_table[ctx.chi_year_idx], False)
    ctx.add_phu("Quả Tú", qua_tu_table[ctx.chi_year_idx], False)
    
    dau_quan_pos = ((ctx.chi_year_idx - (ctx.calc_lunar_month - 1) + 1200) + ctx.hour_chi_idx) % 12
    ctx.add_phu("Đẩu Quân", dau_quan_pos, False)
    
    nguyet_duc_pos = (5 + ctx.chi_year_idx) % 12
    ctx.add_phu("Nguyệt Đức", nguyet_duc_pos, True)
    
    thien_khong_pos = (ctx.chi_year_idx + 1) % 12
    ctx.add_phu("Thiên Không", thien_khong_pos, False)
    
    # 16. Sao Theo Can Năm
    quoc_an_pos = (ctx.loc_ton_pos + 8) % 12
    duong_phu_pos = (ctx.loc_ton_pos - 7 + 120) % 12
    ctx.add_phu("Quốc Ấn", quoc_an_pos, True)
    ctx.add_phu("Đường Phù", duong_phu_pos, True)
    
    thien_quan_table = [7, 4, 5, 2, 3, 9, 11, 9, 10, 6]
    thien_phuc_table = [9, 8, 0, 11, 3, 2, 6, 5, 6, 5]
    ctx.add_phu("Thiên Quan", thien_quan_table[ctx.can_year_idx], True)
    ctx.add_phu("Thiên Phúc", thien_phuc_table[ctx.can_year_idx], True)
    
    thien_tru_table = [5, 6, 0, 5, 6, 8, 2, 6, 9, 10]
    luu_ha_table = [9, 10, 7, 4, 5, 6, 8, 3, 11, 2]
    ln_van_tinh_table = [5, 6, 8, 9, 8, 9, 11, 0, 2, 3]
    ctx.add_phu("Thiên Trù", thien_tru_table[ctx.can_year_idx], True)
    ctx.add_phu("Lưu Hà", luu_ha_table[ctx.can_year_idx], False)
    ctx.add_phu("LN Văn Tinh", ln_van_tinh_table[ctx.can_year_idx], True)
    
    # 17. Cung Cố Định & Mệnh/Thân
    ctx.add_phu("Thiên La", 4, False)
    ctx.add_phu("Địa Võng", 10, False)
    
    cung_no_boc = (ctx.menh_pos + 5) % 12
    cung_tat_ach = (ctx.menh_pos + 7) % 12
    ctx.add_phu("Thiên Thương", cung_no_boc, False)
    ctx.add_phu("Thiên Sứ", cung_tat_ach, False)
    
    thien_tai_pos = (ctx.menh_pos + ctx.chi_year_idx) % 12
    thien_tho_pos = (ctx.than_pos + ctx.chi_year_idx) % 12
    ctx.add_phu("Thiên Tài", thien_tai_pos, True)
    ctx.add_phu("Thiên Thọ", thien_tho_pos, True)
    
    # 18. Tuần Không & Triệt Không
    triet_start = (8 - (ctx.can_year_idx % 5) * 2 + 120) % 12
    triet1, triet2 = triet_start, (triet_start + 1) % 12
    ctx.dia_ban[triet1]["has_triet"] = True
    ctx.dia_ban[triet2]["has_triet"] = True
    
    tuan1 = (ctx.chi_year_idx + (10 - ctx.can_year_idx)) % 12
    tuan2 = (tuan1 + 1) % 12
    ctx.dia_ban[tuan1]["has_tuan"] = True
    ctx.dia_ban[tuan2]["has_tuan"] = True
    ctx.tuan_cung = [tuan1, tuan2]
    ctx.triet_cung = [triet1, triet2]
