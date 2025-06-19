#TrabajoPracticoFinal

📝 Informe de Alcance – TP2: GameHub
🎮 LudORTeca
GameHub – Plataforma social de compra, préstamo y gestión de videojuegos

🎯 Objetivo General
Desarrollar un sistema que permita a los usuarios gestionar su biblioteca digital de juegos, adquirir nuevos títulos y prestarlos a sus amigos. A través de funcionalidades sociales, los usuarios podrán construir su red de amistades, compartir su actividad y realizar transacciones entre ellos.

🔧 Módulos Principales

1. Usuarios

Registro, login y autenticación por TOKEN.

Gestión de perfil.

Visualización de actividad personal (compras, préstamos, etc).


2. Juegos
   
Alta, modificación y baja (Por medio de login ADMIN).

Catálogo navegable con filtros por ID.

Sistema de compra de juegos: un usuario compra un juego y lo agrega a su biblioteca personal.


3. Préstamos

Prestación de juegos a amigos.

Restricciones: solo entre amigos, no se puede prestar si está en préstamo.

El juego queda bloqueado para el dueño mientras esté prestado.

Registro de fecha de inicio, devolución, estado (activo/devuelto).

Historial de préstamos.



✅ Casos de uso de complejidad media/alta

🧩 1. Gestión de Préstamos

Transformación de datos: reglas dinámicas de préstamo (disponibilidad, historial).

Afecta estado del juego y bloquea uso mientras esté prestado.

Permite registrar movimientos temporales y su impacto en la biblioteca.



🛠️ Tecnologías

Backend: Node.js (Express), ES6+ (async/await, módulos).

Persistencia: Supabase (PostgreSQL).

Arquitectura: en capas (Controller, Service, Repository).


Testing: pruebas unitarias con Jest (casos felices + uno no feliz como mínimo).

Configuración: uso de archivos .env para variables.



🗂️ Estructura del proyecto

📁 tp2-gamehub
│── 📂 src
│   ├── 📂 controllers
│   ├── 📂 routes
│   ├── 📂 models
│   ├── 📂 services
│   ├── 📂 repositories
│   ├── 📂 config
│   ├── 📂 tests
│   └── server.js
│── 📂 docs
│── .env
│── package.json
│── README.md



INTEGRANTES: 
Nicolas Rolon
Brian Isaac Quindi
Juan Ignacio Gomez Nevot
Tomas Enzo Abalos Herrera
Uriel Ivan Barrios