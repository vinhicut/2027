@echo off
chcp 65001 > nul
title Tu Vi Hong An - Start all services
echo Starting frontend and backend services...
call "%~dp0tuvivietnam-react-main\start.bat"
