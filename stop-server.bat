@echo off
title LEO Server Stopper
color 0C

echo =====================================================================
echo                Stopping LEO Services & Tunnel...
echo =====================================================================
echo.

echo Stopping Cloudflare Tunnel...
taskkill /F /IM cloudflared.exe >nul 2>&1

echo Stopping Node.js processes (Frontend & Backend)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5001 ^| findstr LISTENING') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do taskkill /F /PID %%a >nul 2>&1

echo.
echo All services have been stopped.
echo.
pause
