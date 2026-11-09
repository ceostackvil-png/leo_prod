@echo off
title LEO E-Commerce Server Starter
color 0A

echo =====================================================================
echo           LEO - The King Men's Fashion & Streetwear
echo =====================================================================
echo.
echo Starting all services...
echo.

cd /d "%~dp0"

echo [1/3] Starting Backend API Server (Port 5001)...
start "LEO Backend API (:5001)" cmd /k "cd /d "%~dp0server" && node server.js"

timeout /t 2 /nobreak >nul

echo [2/3] Starting Frontend Client Server (Port 3000)...
start "LEO Frontend Store (:3000)" cmd /k "cd /d "%~dp0client" && npm.cmd run dev"

timeout /t 2 /nobreak >nul

echo [3/3] Starting Cloudflare Tunnel for leofashionwear.com...
start "Cloudflare Live Tunnel (leofashionwear.com)" cmd /k "cloudflared tunnel run --token eyJhIjoiMDU4NzM5ZmEzOGM4MzNjMTI4NDYxNmJiYjg4Yjk1MGMiLCJ0IjoiYzBlMDRlMGMtY2M4MC00NDIzLTgwZTctMzAxZThjYmJiMWFmIiwicyI6IlpqTTBOR0kxWVRNdFpqbG1NUzAwT1dJNUxXRTFZekl0TlRNNE1qQTFNVGt5TjJKbU16aGxaVFE1T0dNdFpEbGhZaTAwWWpVekxUbGtNMkl0WW1VMVpUUXpOR05tTVRjNSJ9"

echo.
echo =====================================================================
echo                      ALL SERVICES STARTED!
echo =====================================================================
echo   Storefront (Local) : http://localhost:3000
echo   Admin Dashboard    : http://localhost:3000/admin
echo   Backend API Docs   : http://localhost:3000/api-docs
echo   LIVE PUBLIC DOMAIN : https://leofashionwear.com
echo =====================================================================
echo.
echo You can keep this window open or close it.
echo To stop all services, run stop-server.bat
echo.
pause
