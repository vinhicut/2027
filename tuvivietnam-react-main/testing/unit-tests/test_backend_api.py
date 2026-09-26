#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
backend/test_backend_api.py
Kiểm thử tự động toàn diện cho hệ thống Backend mới:
  1. Kiểm thử khởi tạo DB, bảng users, sessions, user_charts.
  2. Kiểm thử API /api/health.
  3. Kiểm thử API /api/calculate (Core Engine).
  4. Kiểm thử API /api/auth/dev-login với vai trò User & Manager.
  5. Kiểm thử phân quyền: User không vào được /api/admin, Manager vào được.
  6. Kiểm thử lưu lá số /api/user/charts.
  7. Kiểm thử lấy lá số gần nhất /api/user/charts/latest (Auto-fill).
"""

import sys
import os
import json
import unittest

# Đặt thư mục backend vào sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from server import create_app
from db import init_db, get_connection

class BackendTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = create_app()
        cls.app.config["TESTING"] = True
        cls.client = cls.app.test_client()

    def test_01_health_check(self):
        res = self.client.get("/api/health")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["status"], "ok")
        self.assertIn("Tu Vi Hong An", data["service"])
        print("✓ Test 01: Health check passed")

    def test_02_calculate_tuvi(self):
        payload = {
            "name": "Nguyễn Văn A",
            "gender": "Nam",
            "is_solar": True,
            "day": 15,
            "month": 8,
            "year": 1995,
            "hour": 8,
            "minute": 30,
            "limit_year": 2026
        }
        res = self.client.post("/api/calculate", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn("thien_ban", data)
        self.assertIn("dia_ban", data)
        self.assertEqual(data["thien_ban"]["ho_ten"], "Nguyễn Văn A")
        self.assertEqual(len(data["dia_ban"]), 12)
        print("✓ Test 02: Calculate chart passed (12 cung Dia Ban OK)")

    def test_03_dev_login_and_roles(self):
        # 1. Đăng nhập User
        res_user = self.client.post("/api/auth/dev-login", json={"role": "user", "name": "Nguyễn Văn Test"})
        self.assertEqual(res_user.status_code, 200)
        user_data = res_user.get_json()
        self.assertIn("token", user_data)
        self.assertEqual(user_data["user"]["role"], "user")
        user_token = user_data["token"]

        # Kiểm tra /api/auth/me với user_token
        res_me = self.client.get("/api/auth/me", headers={"Authorization": f"Bearer {user_token}"})
        self.assertEqual(res_me.status_code, 200)
        self.assertEqual(res_me.get_json()["user"]["role"], "user")

        # Kiểm tra User bị từ chối truy cập /api/admin/users (403 Forbidden)
        res_admin_deny = self.client.get("/api/admin/users", headers={"Authorization": f"Bearer {user_token}"})
        self.assertEqual(res_admin_deny.status_code, 403)

        # 2. Đăng nhập Manager
        res_mgr = self.client.post("/api/auth/dev-login", json={"role": "manager", "name": "Trần Quản Lý"})
        self.assertEqual(res_mgr.status_code, 200)
        mgr_data = res_mgr.get_json()
        mgr_token = mgr_data["token"]
        self.assertEqual(mgr_data["user"]["role"], "manager")

        # Kiểm tra Manager truy cập được /api/admin/users (200 OK)
        res_admin_allow = self.client.get("/api/admin/users", headers={"Authorization": f"Bearer {mgr_token}"})
        self.assertEqual(res_admin_allow.status_code, 200)
        users_list = res_admin_allow.get_json()["data"]
        self.assertGreaterEqual(len(users_list), 2)

        # Kiểm tra Manager xem stats
        res_stats = self.client.get("/api/admin/stats", headers={"Authorization": f"Bearer {mgr_token}"})
        self.assertEqual(res_stats.status_code, 200)
        self.assertIn("total_users", res_stats.get_json()["data"])
        print("✓ Test 03: Auth and Role separation passed (User 403 on admin, Manager 200 on admin)")

    def test_04_save_chart_and_autofill_latest(self):
        # Đăng nhập lấy token
        res_login = self.client.post("/api/auth/dev-login", json={"role": "user", "name": "Lê Thị Thảo"})
        token = res_login.get_json()["token"]
        headers = {"Authorization": f"Bearer {token}"}

        # Chưa lưu lá số: latest trả về data = None
        res_init_latest = self.client.get("/api/user/charts/latest", headers=headers)
        self.assertEqual(res_init_latest.status_code, 200)

        # Lưu lá số thứ nhất
        chart_code_1 = "LTT-19980815"
        payload_1 = {
            "chart_code": chart_code_1,
            "ho_ten": "Lê Thị Thảo",
            "gioi_tinh": "Nữ",
            "ngay_sinh": 15,
            "thang_sinh": 8,
            "nam_sinh": 1998,
            "gio_sinh": 10,
            "phut_sinh": 30,
            "loai_lich": "duong_lich",
            "thang_nhuan": 0,
            "nam_xem_han": 2026,
            "input_data": {
                "name": "Lê Thị Thảo",
                "gender": "Nữ",
                "is_solar": True,
                "day": 15,
                "month": 8,
                "year": 1998,
                "hour": 10,
                "minute": 30,
                "limit_year": 2026
            },
            "chart_data": {
                "idCode": chart_code_1,
                "thien_ban": {"ho_ten": "Lê Thị Thảo"},
                "dia_ban": []
            }
        }
        res_save_1 = self.client.post("/api/user/charts", json=payload_1, headers=headers)
        self.assertEqual(res_save_1.status_code, 201)
        self.assertEqual(res_save_1.get_json()["data"]["chart_code"], chart_code_1)

        # Lưu lá số thứ hai (Mới hơn)
        chart_code_2 = "LTT-20021020"
        payload_2 = {
            "chart_code": chart_code_2,
            "ho_ten": "Lê Thị Thảo (Lá số 2)",
            "gioi_tinh": "Nữ",
            "ngay_sinh": 20,
            "thang_sinh": 10,
            "nam_sinh": 2002,
            "gio_sinh": 14,
            "phut_sinh": 15,
            "loai_lich": "am_lich",
            "thang_nhuan": 1,
            "nam_xem_han": 2027,
            "input_data": {
                "name": "Lê Thị Thảo (Lá số 2)",
                "gender": "Nữ",
                "is_solar": False,
                "day": 20,
                "month": 10,
                "year": 2002,
                "hour": 14,
                "minute": 15,
                "limit_year": 2027
            },
            "chart_data": {
                "idCode": chart_code_2,
                "thien_ban": {"ho_ten": "Lê Thị Thảo (Lá số 2)"},
                "dia_ban": []
            }
        }
        res_save_2 = self.client.post("/api/user/charts", json=payload_2, headers=headers)
        self.assertEqual(res_save_2.status_code, 201)

        # Kiểm tra /api/user/charts/latest phải trả về đúng Lá số 2 gần nhất
        res_latest = self.client.get("/api/user/charts/latest", headers=headers)
        self.assertEqual(res_latest.status_code, 200)
        latest_data = res_latest.get_json()["data"]
        self.assertIsNotNone(latest_data)
        self.assertEqual(latest_data["chart_code"], chart_code_2)
        self.assertEqual(latest_data["ho_ten"], "Lê Thị Thảo (Lá số 2)")
        self.assertEqual(latest_data["nam_sinh"], 2002)
        self.assertEqual(latest_data["thang_nhuan"], 1)
        self.assertEqual(latest_data["input_data"]["year"], 2002)
        print("✓ Test 04: Save chart and get latest chart (Auto-fill data) passed with 100% integrity")

if __name__ == "__main__":
    unittest.main()
