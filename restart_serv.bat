@echo off
echo Killing all Node processes...
taskkill /F /IM node.exe

echo Waiting for processes to terminate...
timeout /t 2 /nobreak

echo Starting Vite dev server...
start cmd /k "npm run dev"

echo Waiting for Vite to start...
timeout /t 3 /nobreak

echo Starting Express API server...
start cmd /k "npm run server"

echo Servers restarted successfully!
