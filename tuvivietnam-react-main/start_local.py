#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
start_local.py (Root Launcher)
Chuyển tiếp khởi chạy đến deployment/scripts/start_local.py
"""
import os
import runpy

target = os.path.join(os.path.dirname(os.path.abspath(__file__)), "deployment", "scripts", "start_local.py")
if os.path.exists(target):
    runpy.run_path(target, run_name="__main__")
else:
    print(f"❌ Không tìm thấy script khởi động tại: {target}")
