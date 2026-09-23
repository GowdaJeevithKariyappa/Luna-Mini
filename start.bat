@echo off
echo Starting Luna-Mini Backend...
start cmd /k "cd backend && npm start"

echo Starting Luna-Mini Frontend...
start cmd /k "cd frontend && npm start"

echo.
echo ==============================================
echo Luna-Mini is starting!
echo Frontend will open in your browser at http://localhost:3000
echo Backend is running on http://localhost:5000
echo ==============================================
pause
