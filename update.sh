#!/bin/bash
echo "Actualizando repositorio..."
git pull origin main
echo "Instalando dependencias..."
npm install
echo "Reiniciando bot..."
pkill node
node archivo.js &

