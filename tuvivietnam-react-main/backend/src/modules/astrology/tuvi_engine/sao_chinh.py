from .constants import BRIGHTNESS_14, SAO_NGU_HANH
from .models import ChartContext

def an_sao_chinh(ctx: ChartContext):
    """
    An 14 Chính Tinh dựa vào Cục Số và Ngày Sinh Âm Lịch.
    """
    X = (ctx.cuc_so - (ctx.calc_lunar_day % ctx.cuc_so)) % ctx.cuc_so
    Q = (ctx.calc_lunar_day + X) // ctx.cuc_so
    tu_vi_pos = ((1 + Q + X) % 12) if (X % 2 == 0) else ((1 + Q - X + 120) % 12)
    ctx.tu_vi_pos = tu_vi_pos
    
    sao_chinh_pos = {
        "Tử Vi": tu_vi_pos,
        "Liêm Trinh": (tu_vi_pos - 8 + 120) % 12,
        "Thiên Đồng": (tu_vi_pos - 5 + 120) % 12,
        "Vũ Khúc": (tu_vi_pos - 4 + 120) % 12,
        "Thái Dương": (tu_vi_pos - 3 + 120) % 12,
        "Thiên Cơ": (tu_vi_pos - 1 + 120) % 12
    }
    
    thien_phu_pos = (16 - tu_vi_pos) % 12
    sao_chinh_pos["Thiên Phủ"] = thien_phu_pos
    sao_chinh_pos["Thái Âm"] = (thien_phu_pos + 1) % 12
    sao_chinh_pos["Tham Lang"] = (thien_phu_pos + 2) % 12
    sao_chinh_pos["Cự Môn"] = (thien_phu_pos + 3) % 12
    sao_chinh_pos["Thiên Tướng"] = (thien_phu_pos + 4) % 12
    sao_chinh_pos["Thiên Lương"] = (thien_phu_pos + 5) % 12
    sao_chinh_pos["Thất Sát"] = (thien_phu_pos + 6) % 12
    sao_chinh_pos["Phá Quân"] = (thien_phu_pos + 10) % 12
    
    for s_name, pos in sao_chinh_pos.items():
        dac_tinh = BRIGHTNESS_14[s_name][pos]
        ctx.dia_ban[pos]["chinh_tinh"].append({
            "ten": s_name,
            "ngu_hanh": SAO_NGU_HANH.get(s_name, "tho"),
            "dac_tinh": dac_tinh
        })
        
    ctx.all_star_positions.update(sao_chinh_pos)
