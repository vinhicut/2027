#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
start_local.py (Root Launcher)
Chuyển tiếp khởi chạy đến deployment/scripts/start_local.py
"""
import os
import sys

target = os.path.join(os.path.dirname(os.path.abspath(__file__)), "deployment", "scripts", "start_local.py")
if os.path.exists(target):
    with open(target, "r", encoding="utf-8") as f:
        code = f.read()
    exec(compile(code, target, "exec"))
else:
    print(f"❌ Không tìm thấy script khởi động tại: {target}")
