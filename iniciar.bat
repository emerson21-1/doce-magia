@echo off
REM ============================================
REM Sweet & Art Bakery — Inicializador Windows
REM Verifica Node, instala deps, roda o Vite
REM ============================================

cd /d "C:\Users\User\Downloads\Claude code\Doce magia"

echo.
echo ============================================
echo   Sweet ^& Art Bakery — Vite Dev Server
echo ============================================
echo.

REM Verificar se o Node.js esta instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Node.js nao encontrado!
    echo.
    echo Por favor, instale o Node.js LTS em:
    echo   https://nodejs.org/
    echo.
    echo Depois de instalar, feche e abra este script novamente.
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js detectado:
node --version
npm --version
echo.

REM Instalar dependencias se nao existir node_modules
if not exist "node_modules" (
    echo [INFO] Instalando dependencias pela primeira vez...
    echo        Isso pode levar alguns minutos.
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERRO] Falha ao instalar dependencias.
        pause
        exit /b 1
    )
) else (
    echo [OK] Dependencias ja instaladas.
)

echo.
echo ============================================
echo   Iniciando servidor de desenvolvimento...
echo   O navegador abrira automaticamente.
echo   Para parar: Ctrl+C nesta janela
echo ============================================
echo.

call npm run dev

pause
