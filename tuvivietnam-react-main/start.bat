@echo off
title Tu Vi Hong An - Start All Services
echo Starting all website services...
python "%~dp0start_local.py"
if errorlevel 1 pause
