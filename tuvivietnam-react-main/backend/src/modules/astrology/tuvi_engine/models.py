# models.py
from typing import List, Dict, Any

class ChartContext:
    def __init__(self):
        self.params: Dict[str, Any] = {}
        # Core inputs
        self.name: str = ""
        self.gender: str = ""
        self.is_solar: bool = True
        self.day: int = 1
        self.month: int = 1
        self.year: int = 1990
        self.hour: int = 0
        self.minute: int = 0
        self.is_leap_input: bool = False
        self.limit_year: int = 0
        
        # Lunar Data
        self.orig_solar_day: int = 0
        self.orig_solar_month: int = 0
        self.orig_solar_year: int = 0
        self.orig_lunar_day: int = 0
        self.orig_lunar_month: int = 0
        self.orig_lunar_year: int = 0
        self.orig_is_leap: bool = False
        self.calc_solar_day: int = 0
        self.calc_solar_month: int = 0
        self.calc_solar_year: int = 0
        self.calc_lunar_day: int = 0
        self.calc_lunar_month: int = 0
        self.calc_lunar_year: int = 0
        self.calc_is_leap: bool = False
        self.is_late_zi: bool = False
        
        # Pillars
        self.hour_chi_idx: int = 0
        self.can_year_idx: int = 0
        self.chi_year_idx: int = 0
        self.can_month_idx: int = 0
        self.chi_month_idx: int = 0
        self.can_day_idx: int = 0
        self.chi_day_idx: int = 0
        self.can_hour_idx: int = 0
        self.limit_can_idx: int = 0
        self.limit_chi_idx: int = 0
        self.tuoi_mu: int = 0
        
        # Thien Ban
        self.is_duong_can: bool = False
        self.am_duong_menh: str = ""
        self.is_thuan_ly: bool = False
        self.step_dir: int = 1
        self.menh_nap_am: str = ""
        self.menh_hanh: str = ""
        self.menh_pos: int = 0
        self.than_pos: int = 0
        self.can_cung: List[int] = []
        self.cuc_name: str = ""
        self.cuc_so: int = 0
        self.cuc_hanh: str = ""
        self.am_duong_ly: str = ""
        self.cuc_menh_tuong_quan: str = ""
        self.chu_menh: str = ""
        self.chu_than: str = ""
        self.than_cu_name: str = ""
        
        # Palace & Star Tracking
        self.dia_ban: List[Dict[str, Any]] = []
        self.tuan_cung: List[int] = []
        self.triet_cung: List[int] = []
        self.loc_ton_pos: int = 0
        self.tu_vi_pos: int = 0
        self.all_star_positions: Dict[str, int] = {}
        
    def add_phu(self, name: str, pos: int, is_good: bool, dac_tinh: str = "", ngu_hanh: str = "tho"):
        obj = {
            "ten": name,
            "ngu_hanh": ngu_hanh,
            "dac_tinh": dac_tinh
        }
        if is_good:
            self.dia_ban[pos]["phu_tinh_tot"].append(obj)
        else:
            self.dia_ban[pos]["phu_tinh_xau"].append(obj)
            
    def add_luu(self, name: str, pos: int, is_good: bool):
        self.dia_ban[pos]["sao_luu"].append({
            "ten": name,
            "loai": "tot" if is_good else "xau"
        })
