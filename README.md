# 🎮 Trabajo Práctico Final – *LudORTeca (GameHub)*

> Plataforma social para la compra, préstamo y gestión de videojuegos.
> Link DEPLOY: https://trabajopracticofinal.onrender.com/

---

## 📄 Informe de Alcance – TP2

### 🎯 Objetivo General

Desarrollar un sistema que permita a los usuarios:

- Gestionar su biblioteca digital de videojuegos.
- Adquirir nuevos títulos.
- Prestar y recibir préstamos de juegos entre amigos.
- Compartir su actividad a través de funcionalidades sociales.
- Realizar transacciones seguras entre usuarios.

---

## 🔧 Módulos Principales

### 1. 👤 **Usuarios**
- Registro, login y autenticación mediante token JWT.
- Gestión del perfil de usuario.
- Visualización de la actividad personal (compras, préstamos, etc).

### 2. 🕹️ **Juegos**
- Alta, baja y modificación de juegos (solo por usuarios administradores).
- Catálogo navegable con filtros por ID.
- Sistema de compra de juegos con integración a la biblioteca personal.

### 3. 🔁 **Préstamos**
- Permite prestar juegos entre amigos.
- Reglas:
  - Solo es posible prestar entre usuarios amigos.
  - No se puede prestar un juego ya prestado.
  - El juego queda bloqueado para el dueño mientras esté prestado.
- Registro detallado:
  - Fecha de inicio.
  - Fecha de devolución.
  - Estado (activo/devuelto).
- Historial completo de préstamos por usuario.

---

## ✅ Casos de Uso de Complejidad Media/Alta

### 🧩 Gestión de Préstamos
- Aplicación de reglas dinámicas de préstamo basadas en:
  - Disponibilidad.
  - Historial de uso.
- Impacto directo en el estado del juego.
- Registro de movimientos temporales y su efecto en la biblioteca del usuario.

---

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js (Express), ES6+ (async/await, módulos).
- **Persistencia**: Supabase (PostgreSQL).
- **Arquitectura**: En capas (Controller, Service, Repository).
- **Testing**: Jest (con pruebas unitarias para casos positivos y negativos).
- **Configuración**: Uso de variables de entorno en archivos `.env`.

---

## 🗂️ Estructura del Proyecto

```
📁 tp2-gamehub
├── 📂 src
│   ├── 📂 controllers
│   ├── 📂 routes
│   ├── 📂 models
│   ├── 📂 services
│   ├── 📂 repositories
│   ├── 📂 config
│   ├── 📂 tests
│   └── server.js
├── 📂 docs
├── .env
├── package.json
└── README.md
```

---

## 👥 Integrantes del Equipo

- Nicolas Rolon  
- Brian Isaac Quindi  
- Juan Ignacio Gomez Nevot  
- Tomas Enzo Abalos Herrera  
- Uriel Ivan Barrios

---
