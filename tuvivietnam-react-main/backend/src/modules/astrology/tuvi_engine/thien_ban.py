import math
from datetime import datetime
from typing import Dict, Any

from .constants import (
    CAN, CHI, CHI_DISPLAY, CAN_HANH, CUNG_NAMES, CUNG_THAN_MAP,
    NAP_AM, CUC_INFO, CHU_MENH_TABLE, CHU_THAN_TABLE
)
from .lunar_calendar import adjust_for_zi_hour, jdn
from .models import ChartContext

def init_thien_ban(params: Dict[str, Any], ctx: ChartContext):
    """
    Phân tích dữ liệu đầu vào, quy đổi âm dương lịch, tính 4 trụ, Mệnh Thân Cục.
    """
    ctx.params = params
    ctx.name = str(params.get("name", "")).strip() or "Vô Danh"
    raw_gender = str(params.get("gender", "Nam")).strip()
    ctx.gender = "Nữ" if raw_gender.lower() in ["nu", "nữ", "female"] else "Nam"
    
    ctx.is_solar = bool(params.get("is_solar", True) if "is_solar" in params else params.get("isSolar", True))
    ctx.is_leap_input = bool(params.get("is_leap_month_input", False) if "is_leap_month_input" in params else params.get("isLeapMonthInput", False))
    
    ctx.day = int(params.get("day", 1))
    ctx.month = int(params.get("month", 1))
    ctx.year = int(params.get("year", 1990))
    ctx.hour = int(params.get("hour", 0))
    ctx.minute = int(params.get("minute", 0))
    
    current_year = datetime.now().year
    ctx.limit_year = int(params.get("limit_year", params.get("limitYear", current_year)))

    # Xử lý Dạ Tý & Lịch Âm Dương
    adj = adjust_for_zi_hour(
        is_solar=ctx.is_solar, day=ctx.day, month=ctx.month, year=ctx.year,
        hour=ctx.hour, minute=ctx.minute, is_leap=(1 if ctx.is_leap_input else 0), timezone=7.0
    )
    ctx.orig_solar_day, ctx.orig_solar_month, ctx.orig_solar_year = adj.orig_solar
    ctx.orig_lunar_day, ctx.orig_lunar_month, ctx.orig_lunar_year, ctx.orig_is_leap = adj.orig_lunar
    ctx.calc_solar_day, ctx.calc_solar_month, ctx.calc_solar_year = adj.calc_solar
    ctx.calc_lunar_day, ctx.calc_lunar_month, ctx.calc_lunar_year, ctx.calc_is_leap = adj.calc_lunar
    ctx.is_late_zi = adj.is_late_zi

    ctx.hour_chi_idx = 0 if (ctx.hour >= 23 or ctx.hour < 1) else math.floor((ctx.hour + 1) / 2) % 12
    
    ctx.can_year_idx = (ctx.calc_lunar_year - 4 + 1000) % 10
    ctx.chi_year_idx = (ctx.calc_lunar_year - 4 + 1200) % 12
    
    ctx.can_month_idx = ((ctx.can_year_idx % 5) * 2 + 2 + (ctx.calc_lunar_month - 1)) % 10
    ctx.chi_month_idx = (ctx.calc_lunar_month + 1) % 12
    
    jd_day = jdn(ctx.calc_solar_day, ctx.calc_solar_month, ctx.calc_solar_year)
    ctx.can_day_idx = (jd_day + 9) % 10
    ctx.chi_day_idx = (jd_day + 1) % 12
    
    ctx.can_hour_idx = ((ctx.can_day_idx % 5) * 2 + ctx.hour_chi_idx) % 10
    
    ctx.limit_can_idx = (ctx.limit_year - 4 + 1000) % 10
    ctx.limit_chi_idx = (ctx.limit_year - 4 + 1200) % 12
    ctx.tuoi_mu = ctx.limit_year - ctx.calc_lunar_year + 1
    
    ctx.is_duong_can = (ctx.can_year_idx % 2 == 0)
    ctx.am_duong_menh = ("Dương " if ctx.is_duong_can else "Âm ") + ctx.gender
    ctx.is_thuan_ly = (ctx.is_duong_can and ctx.gender == "Nam") or (not ctx.is_duong_can and ctx.gender == "Nữ")
    ctx.step_dir = 1 if ctx.is_thuan_ly else -1
    
    can_year = CAN[ctx.can_year_idx]
    chi_year = CHI[ctx.chi_year_idx]
    nap_am_key = f"{can_year} {chi_year}"
    ctx.menh_nap_am = NAP_AM.get(nap_am_key, {}).get("name", "Sa Trung Kim")
    ctx.menh_hanh = NAP_AM.get(nap_am_key, {}).get("hanh", "Kim")
    
    ctx.menh_pos = (2 + (ctx.calc_lunar_month - 1) - ctx.hour_chi_idx + 1200) % 12
    ctx.than_pos = (2 + (ctx.calc_lunar_month - 1) + ctx.hour_chi_idx) % 12
    
    can_dan = ((ctx.can_year_idx % 5) * 2 + 2) % 10
    ctx.can_cung = [(can_dan + ((c - 2 + 120) % 12)) % 10 for c in range(12)]
    
    can_menh = CAN[ctx.can_cung[ctx.menh_pos]]
    chi_menh = CHI[ctx.menh_pos]
    nap_am_menh_cung = NAP_AM.get(f"{can_menh} {chi_menh}", {}).get("hanh", "Thủy")
    cuc_info = CUC_INFO.get(nap_am_menh_cung, {"name": "Thủy nhị cục", "so": 2})
    ctx.cuc_name = cuc_info["name"]
    ctx.cuc_so = cuc_info["so"]
    ctx.cuc_hanh = nap_am_menh_cung
    
    is_cung_menh_duong = (ctx.menh_pos % 2 == 0)
    ctx.am_duong_ly = ("Âm Dương thuận lý" 
                       if ((ctx.is_duong_can and is_cung_menh_duong) or (not ctx.is_duong_can and not is_cung_menh_duong))
                       else "Âm Dương nghịch lý")
    
    if ctx.menh_hanh == ctx.cuc_hanh:
        ctx.cuc_menh_tuong_quan = "Mệnh Cục tương hòa"
    elif ((ctx.cuc_hanh == "Thủy" and ctx.menh_hanh == "Mộc") or (ctx.cuc_hanh == "Mộc" and ctx.menh_hanh == "Hỏa") or 
          (ctx.cuc_hanh == "Hỏa" and ctx.menh_hanh == "Thổ") or (ctx.cuc_hanh == "Thổ" and ctx.menh_hanh == "Kim") or 
          (ctx.cuc_hanh == "Kim" and ctx.menh_hanh == "Thủy")):
        ctx.cuc_menh_tuong_quan = "Cục sinh Mệnh"
    elif ((ctx.menh_hanh == "Thủy" and ctx.cuc_hanh == "Mộc") or (ctx.menh_hanh == "Mộc" and ctx.cuc_hanh == "Hỏa") or 
          (ctx.menh_hanh == "Hỏa" and ctx.cuc_hanh == "Thổ") or (ctx.menh_hanh == "Thổ" and ctx.cuc_hanh == "Kim") or 
          (ctx.menh_hanh == "Kim" and ctx.cuc_hanh == "Thủy")):
        ctx.cuc_menh_tuong_quan = "Mệnh sinh Cục"
    elif ((ctx.cuc_hanh == "Thủy" and ctx.menh_hanh == "Hỏa") or (ctx.cuc_hanh == "Hỏa" and ctx.menh_hanh == "Kim") or 
          (ctx.cuc_hanh == "Kim" and ctx.menh_hanh == "Mộc") or (ctx.cuc_hanh == "Mộc" and ctx.menh_hanh == "Thổ") or 
          (ctx.cuc_hanh == "Thổ" and ctx.menh_hanh == "Thủy")):
        ctx.cuc_menh_tuong_quan = "Cục khắc Mệnh"
    else:
        ctx.cuc_menh_tuong_quan = "Mệnh khắc Cục"
        
    ctx.chu_menh = CHU_MENH_TABLE[ctx.menh_pos]
    ctx.chu_than = CHU_THAN_TABLE[ctx.chi_year_idx]

def init_dia_ban(ctx: ChartContext):
    """
    Khởi tạo 12 cung Địa Bàn và thiết lập tên cung.
    """
    for i in range(12):
        ctx.dia_ban.append({
            "cung_id": i,
            "cung_chi": CHI_DISPLAY[i],
            "can_cung": CAN[ctx.can_cung[i]],
            "can_chi_cung": f"{CAN[ctx.can_cung[i]]} {CHI_DISPLAY[i]}",
            "can_hanh": CAN_HANH[ctx.can_cung[i]],
            "ten_cung": "",
            "is_than": (i == ctx.than_pos),
            "dai_han": 0,
            "tieu_han_chi": "",
            "nguyet_han_thang": 0,
            "trang_sinh": "",
            "chinh_tinh": [],
            "phu_tinh_tot": [],
            "phu_tinh_xau": [],
            "sao_luu": [],
            "has_tuan": False,
            "has_triet": False
        })
        
    for i in range(12):
        idx = (ctx.menh_pos + i) % 12
        c_name = CUNG_NAMES[i]
        if i == 10:
            c_name = "THÊ" if ctx.gender == "Nam" else "PHU"
        if idx == ctx.than_pos:
            if i == 10:
                ctx.dia_ban[idx]["ten_cung"] = "THÊ-THÂN" if ctx.gender == "Nam" else "PHU-THÂN"
            else:
                ctx.dia_ban[idx]["ten_cung"] = CUNG_THAN_MAP.get(i, f"{c_name}-THÂN")
            ctx.than_cu_name = "Thân cư " + (("Thê" if ctx.gender == "Nam" else "Phu") if i == 10 else CUNG_NAMES[i])
        else:
            ctx.dia_ban[idx]["ten_cung"] = c_name
