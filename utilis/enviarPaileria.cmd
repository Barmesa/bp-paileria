@echo off
setlocal

:: Ruta predefinida del archivo
set "archivoPorDefecto=C:\spool\odpcp.##r"

:: Revisa si un archivo fue arrastrado, si no, usa el archivo por defecto
if "%~1"=="" (
    if exist "%archivoPorDefecto%" (
        set "rutaArchivo=%archivoPorDefecto%"
    ) else (
        echo No se arrastro ningun archivo, y el archivo por defecto "%archivoPorDefecto" no existe.
        pause
        exit /b
    )
) else (
    set "rutaArchivo=%~1"
)

:: URL del Worker de Cloudflare
set "url=https://bp-paileria.barmesa.workers.dev"

:: Hacemos el request POST con curl y enviamos el archivo
:: pon -v al final para ver el proceso
curl -X POST -H "Content-Type: application/octet-stream" --data-binary "@%rutaArchivo%" "%url%"

:: Mantenemos la ventana abierta para ver la respuesta
echo.
echo.
echo Archivo enviado correctamente,
echo los codigos superiores deben de ser los correctos para agregar al archivo de paileria.
echo.
pause
