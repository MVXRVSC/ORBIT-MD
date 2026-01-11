# 🛰️ ORBIT-MD

### WhatsApp Multi-Device Bot | Open Source

> **ORBIT-MD** es un bot de WhatsApp **Multi-Device** desarrollado desde cero con **Node.js** y **Baileys**, diseñado para ofrecer rendimiento, estabilidad y personalización total.


## 🚀 Características Principales

✅ Conexión **WhatsApp Multi-Device**
✅ Sistema de **comandos y plugins** modular
✅ Soporte para **grupos y privados**
✅ Comandos para **admins y owner**
✅ Respuestas rápidas y automáticas
✅ Arquitectura limpia y escalable
✅ Compatible con **Termux / Linux / VPS**
✅ Preparado para deploy **24/7**

## 🧩 Sistema Modular

ORBIT-MD utiliza un sistema de **plugins** que permite:

* Añadir comandos sin tocar el núcleo
* Activar o desactivar funciones fácilmente
* Mantener el bot ordenado y optimizado

Ejemplo:

```
plugins/
├── menu.js
├── ping.js
├── group.js
└── owner.js
```


## 📁 Estructura del Proyecto

```
ORBIT-MD/
│
├── .github/
├── lib/            # Funciones internas
├── plugins/        # Comandos del bot
├── storage/        # Base de datos local
├── tmp/            # Archivos temporales
│
├── handler.js      # Gestor de comandos
├── main.js         # Conexión WhatsApp
├── index.js        # Inicio del bot
├── server.js       # Servidor uptime
├── config.js       # Configuración global
├── package.json
└── README.md
```

## ⚙️ Requisitos

* **Node.js v18+**
* **Git**
* Cuenta de **WhatsApp activa**
* Termux / VPS / PC

## 📲 Instalación (Termux)

```bash
pkg update -y
pkg install git nodejs -y
git clone https://github.com/MVXRVSC/ORBIT-MD/tree/6c0f9314fd0cd9d292b64366a4a2aa1b20ef4f25)
cd ORBIT-MD
npm install
npm start
```

📸 Escanea el **QR** con WhatsApp y listo.

## 🧪 Comandos Básicos

| Comando  | Descripción        |
| -------- | ------------------ |
| `.ping`  | Ver estado del bot |
| `.menu`  | Mostrar menú       |
| `.owner` | Info del owner     |
| `.grupo` | Funciones de grupo |


## 👑 Owner & Administración

ORBIT-MD incluye funciones exclusivas para:

* Owner
* Admins de grupo
* Control de comandos
* Modo público / privado

Configuración en `config.js`:

```js
ownerNumber: ["+535XXXXXXX"]
```

## 🛡️ Seguridad & Uso

⚠️ ORBIT-MD **no está afiliado a WhatsApp Inc.**
⚠️ El uso del bot es **responsabilidad del usuario**
⚠️ No se garantiza inmunidad ante bloqueos

## 🛠️ Tecnologías Usadas

* Node.js
* Baileys
* JavaScript ESModules
* Git & GitHub

## 🌐 Compatibilidad

✔️ Termux
✔️ Linux
✔️ VPS
✔️ Render / Railway

## 📌 Roadmap (Próximas funciones)

* [ ] Sistema anti-link
* [ ] Juegos / RPG
* [ ] Stickers avanzados
* [ ] Bienvenida automática
* [ ] Sistema de niveles
* [ ] Dashboard web

## 🤝 Contribuciones

Las contribuciones son bienvenidas.

1. Fork el proyecto
2. Crea tu branch
3. Envía Pull Request

## ⭐ Soporte

Si te gusta **ORBIT-MD**, apoya el proyecto con una ⭐ en GitHub.


## 🛰️ Créditos

Desarrollado por **ORBIT Team**
Inspirado en la comunidad Open Source
