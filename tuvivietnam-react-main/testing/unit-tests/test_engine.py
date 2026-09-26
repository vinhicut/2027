#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
backend/test_engine.py
Bộ kiểm thử tự động giải thuật an sao Tử Vi Đẩu Số (Vân Đằng Thái Thứ Lang).
"""

import sys
import os

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, "..", ".."))
ASTROLOGY_MODULE = os.path.join(PROJECT_ROOT, "backend", "src", "modules", "astrology")

if ASTROLOGY_MODULE not in sys.path:
    sys.path.insert(0, ASTROLOGY_MODULE)

from tuvi_engine import calculate_tuvi_chart


def run_tests():
    print("=" * 60)
    print("🧪 BẮT ĐẦU KIỂM THỬ TUVI ENGINE...")
    print("=" * 60)

    test_cases = [
        {
            "name": "Trường hợp chuẩn 1: Nam sinh năm Canh Ngọ 1990",
            "params": {
                "name": "Nguyễn Văn A",
                "gender": 1,
                "solar_year": 1990,
                "solar_month": 5,
                "solar_day": 15,
                "solar_hour": 6,
                "solar_minute": 30,
                "view_year": 2026,
            }
        },
        {
            "name": "Trường hợp chuẩn 2: Nữ sinh năm Giáp Tuất 1994",
            "params": {
                "name": "Trần Thị B",
                "gender": -1,
                "solar_year": 1994,
                "solar_month": 10,
                "solar_day": 20,
                "solar_hour": 14,
                "solar_minute": 15,
                "view_year": 2026,
            }
        }
    ]

    for idx, tc in enumerate(test_cases, 1):
        print(f"\n▶ Test {idx}: {tc['name']}")
        try:
            res = calculate_tuvi_chart(tc["params"])
            assert isinstance(res, dict), "Kết quả phải là dictionary"
            assert "menhPos" in res, "Thiếu menhPos"
            assert "thanPos" in res, "Thiếu thanPos"
            assert "thien_ban" in res, "Thiếu thien_ban"
            assert "dia_ban" in res, "Thiếu dia_ban"
            assert len(res["dia_ban"]) == 12, "Địa bàn phải có đúng 12 cung"
            assert "tuan_cung" in res, "Thiếu tuan_cung"
            assert "triet_cung" in res, "Thiếu triet_cung"

            tb = res["thien_ban"]
            print(f"   ✓ Cung Mệnh tại: Chi số {res['menhPos']}, Cung Thân tại: Chi số {res['thanPos']}")
            print(f"   ✓ Can Chi Năm: {tb.get('can_chi_nam')}, Cục số: {tb.get('cuc')}")
            print(f"   ✓ Tuần Triệt: Tuần tại {res['tuan_cung']}, Triệt tại {res['triet_cung']}")
            print(f"   ✅ Test {idx} PASSED!")
        except Exception as e:
            print(f"   ❌ Test {idx} FAILED: {e}")
            raise

    print("\n" + "=" * 60)
    print("🎉 TOÀN BỘ KIỂM THỬ THÀNH CÔNG (100% PASS)!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
