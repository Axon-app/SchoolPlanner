@echo off
echo Instalando dependencias para la aplicación de Control Escolar...
npm install

echo.
echo Configurando Tailwind CSS...
npx tailwindcss init -p

echo.
echo Iniciando la aplicación...
npm start
