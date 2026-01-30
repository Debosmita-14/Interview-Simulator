@echo off
REM AI Placement Interview Simulator - Setup Script for Windows
REM This script sets up the entire project for development

setlocal enabledelayedexpansion

echo.
echo ==========================================
echo Interview Simulator Setup Script
echo ==========================================
echo.

REM Check Node.js installation
echo [*] Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [!] Node.js is not installed. Please install Node.js v16+ from nodejs.org
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% is installed
echo.

REM Check npm installation
echo [*] Checking npm installation...
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [!] npm is not installed
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION% is installed
echo.

REM Setup Backend
echo [*] Setting up backend...
cd backend

if not exist .env (
    echo [*] Creating .env file...
    copy .env.example .env
    echo [!] Please update backend\.env with your configuration:
    echo     - MONGODB_URI (or use default for local MongoDB)
    echo     - JWT_SECRET (use a strong random string)
    echo     - CLAUDE_API_KEY (get from Anthropic)
    echo.
)

echo [*] Installing backend dependencies...
call npm install
echo [OK] Backend dependencies installed
echo.
cd ..

REM Setup Frontend
echo [*] Setting up frontend...
cd frontend

if not exist .env (
    echo [*] Creating .env file...
    (
        echo REACT_APP_API_URL=http://localhost:5000/api
    ) > .env
)

echo [*] Installing frontend dependencies...
call npm install
echo [OK] Frontend dependencies installed
echo.
cd ..

REM Git setup
if not exist .git (
    echo [*] Initializing git repository...
    call git init
    call git config user.email "developer@interviewsimulator.com"
    call git config user.name "Interview Simulator Dev"
    call git add .
    call git commit -m "Initial commit: AI Placement Interview Simulator"
    echo [OK] Git repository initialized
    echo.
)

echo.
echo ==========================================
echo Setup completed!
echo ==========================================
echo.
echo Next Steps:
echo ==========================================
echo.
echo 1. Configure MongoDB:
echo    - Install MongoDB locally, OR
echo    - Use MongoDB Atlas (cloud)
echo.
echo 2. Update configuration files:
echo    - backend\.env with your API keys
echo    - CLAUDE_API_KEY from Anthropic Console
echo.
echo 3. Start development servers:
echo    - Terminal 1: cd backend ^& npm run dev
echo    - Terminal 2: cd frontend ^& npm start
echo.
echo 4. Open browser:
echo    - http://localhost:3000
echo.
echo ==========================================
echo For more information:
echo ==========================================
echo - README.md - Project overview
echo - QUICKSTART.md - Quick start guide
echo - API_DOCUMENTATION.md - API endpoints
echo - DEPLOYMENT.md - Production deployment
echo - SCORING_SYSTEM.md - Scoring details
echo.
pause
