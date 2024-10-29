@echo off
setlocal

:: Si no se recibe un archivo, mostrar mensaje de ayuda
if "%~1"=="" (
    echo Por favor arrastra y suelta un archivo en este script para que funcione correctamente.
    pause
    exit /b
)

:: URL del Worker de Cloudflare
set "url=https://bp-paileria.barmesa.workers.dev/diccionario"

:: Hacemos el request POST con curl y enviamos el archivo
:: pon -v al final para ver el proceso
curl -X POST -H "Content-Type: application/octet-stream" --data-binary "@%~1" "%url%"

:: Mantenemos la ventana abierta para ver la respuesta
echo.
echo Diccionario enviado correctamente.
echo.
pause
