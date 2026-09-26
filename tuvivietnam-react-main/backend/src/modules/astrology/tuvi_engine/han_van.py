from .constants import CHI_DISPLAY, TU_HOA_TABLE
from .models import ChartContext

def an_han_van(ctx: ChartContext):
    """
    Tính Đại Vận, Tiểu Vận, Nguyệt Vận, Vòng Tràng Sinh và Sao Lưu.
    """
    # 6. Đại Hạn, Tiểu Hạn, Nguyệt Hạn
    for i in range(12):
        idx = (ctx.menh_pos + ctx.step_dir * i + 1200) % 12
        ctx.dia_ban[idx]["dai_han"] = ctx.cuc_so + i * 10
        
    if ctx.chi_year_idx in [2, 6, 10]:
        tieu_han_start = 4
    elif ctx.chi_year_idx in [8, 0, 4]:
        tieu_han_start = 10
    elif ctx.chi_year_idx in [5, 9, 1]:
        tieu_han_start = 7
    else:
        tieu_han_start = 1
        
    tieu_han_step = 1 if ctx.gender == "Nam" else -1
    for i in range(12):
        if tieu_han_step == 1:
            b = (i - tieu_han_start + ctx.chi_year_idx) % 12
        else:
            b = (tieu_han_start - i + ctx.chi_year_idx) % 12
        ctx.dia_ban[i]["tieu_han_chi"] = CHI_DISPLAY[b]
        
    if tieu_han_step == 1:
        limit_tieu_han_cung = (tieu_han_start + ctx.tuoi_mu - 1) % 12
    else:
        limit_tieu_han_cung = (tieu_han_start - (ctx.tuoi_mu - 1)) % 12
        
    month_1_cung = (limit_tieu_han_cung - ctx.calc_lunar_month + 1 + ctx.hour_chi_idx + 1200) % 12
    for m in range(1, 13):
        c_idx = (month_1_cung + (m - 1)) % 12
        ctx.dia_ban[c_idx]["nguyet_han_thang"] = m
        
    # 10. Vòng Tràng Sinh
    if ctx.cuc_so in [2, 5]:
        ts_start = 8
    elif ctx.cuc_so == 3:
        ts_start = 11
    elif ctx.cuc_so == 4:
        ts_start = 5
    else:
        ts_start = 2
        
    trang_sinh_names = ['Trường Sinh', 'Mộc Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng', 'Suy', 
                        'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng']
    for i in range(12):
        p = (ts_start + ctx.step_dir * i + 1200) % 12
        ctx.dia_ban[p]["trang_sinh"] = trang_sinh_names[i]
        
    # 19. Hệ Thống Sao Lưu
    ctx.add_luu("L.Thái Tuế", ctx.limit_chi_idx, False)
    ctx.add_luu("L.Tang Môn", (ctx.limit_chi_idx + 2) % 12, False)
    ctx.add_luu("L.Bạch Hổ", (ctx.limit_chi_idx + 8) % 12, False)
    ctx.add_luu("L.Thiên Khốc", (6 - ctx.limit_chi_idx + 120) % 12, False)
    ctx.add_luu("L.Thiên Hư", (6 + ctx.limit_chi_idx) % 12, False)
    
    luu_loc_ton_pos = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0][ctx.limit_can_idx]
    ctx.add_luu("L.Lộc Tồn", luu_loc_ton_pos, True)
    ctx.add_luu("L.Kình Dương", (luu_loc_ton_pos + 1) % 12, False)
    ctx.add_luu("L.Đà La", (luu_loc_ton_pos - 1 + 120) % 12, False)
    
    luu_thien_ma_pos = [2, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8, 5][ctx.limit_chi_idx]
    ctx.add_luu("L.Thiên Mã", luu_thien_ma_pos, True)
    
    limit_tu_hoa = TU_HOA_TABLE[ctx.limit_can_idx]
    limit_hoa_loc_host = limit_tu_hoa[0]
    limit_hoa_loc_pos = ctx.all_star_positions.get(limit_hoa_loc_host)
    if limit_hoa_loc_pos is not None:
        ctx.add_luu("L.Hóa Lộc", limit_hoa_loc_pos, True)
