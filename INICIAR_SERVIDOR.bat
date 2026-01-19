@echo off
echo ========================================
echo  INICIANDO SERVIDOR - Diagnostico Financeiro
echo ========================================
echo.
echo Abrindo servidor na porta 8000...
echo.
echo Acesse no navegador: http://localhost:8000
echo.
echo Pressione Ctrl+C para parar o servidor
echo ========================================
echo.

cd /d "%~dp0"
python -m http.server 8000
pause
