@echo off
title Menjalankan Coffee Bean Detection System
echo ===================================================
echo   Menjalankan Sistem Deteksi Biji Kopi
echo ===================================================
echo.

echo [1/2] Menjalankan Backend FastAPI (Python YOLO)...
start "Backend FastAPI (Port 8000)" cmd /k "cd /d %~dp0backend && py -3 main.py"

echo [2/2] Menjalankan Frontend Next.js...
start "Frontend Next.js (Port 3000)" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ===================================================
echo  Kedua server sedang berjalan di jendela terpisah:
echo  - Frontend: http://localhost:3000
echo  - Backend : http://localhost:8000
echo ===================================================
echo.
pause
