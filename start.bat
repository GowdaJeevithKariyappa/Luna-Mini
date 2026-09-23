@echo off
title Luna-Mini Launcher
color 0b

echo ==============================================
echo 🌙 Luna-Mini One-Click Launcher 🌙
echo ==============================================
echo.

echo [1/3] Starting Local AI (Ollama)...
start "Ollama Server" cmd /c "ollama serve"
timeout /t 3 >nul

echo [2/3] Starting Backend Server...
start "Luna Backend" cmd /k "cd backend && npm start"
timeout /t 2 >nul

echo [3/3] Starting Frontend & Opening Browser...
start "Luna Frontend" cmd /k "cd frontend && npm start"

echo.
echo ==============================================
echo ✅ Everything is running! 
echo 🌐 The app will open in your browser automatically.
echo 💡 Keep these black windows open while using Luna.
echo ==============================================
pause >nul
