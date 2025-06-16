#TrabajoPracticoFinal

📝 Informe de Alcance – TP2: GameHub
🎮 LudORTeca
GameHub – Plataforma social de compra, préstamo y gestión de videojuegos

🎯 Objetivo General
Desarrollar un sistema que permita a los usuarios gestionar su biblioteca digital de juegos, adquirir nuevos títulos, prestarlos a sus amigos y aprovechar ofertas dinámicas. A través de funcionalidades sociales, los usuarios podrán construir su red de amistades, compartir su actividad y realizar transacciones entre ellos.

🔧 Módulos Principales
1. Usuarios
Registro y autenticación.


Gestión de perfil.


Sistema de amistad (solicitar, aceptar, rechazar).


Visualización de actividad personal (compras, préstamos, etc).


2. Juegos
Alta, modificación y baja (administradores).


Catálogo navegable con filtros por género, precio, etc.


Sistema de compra de juegos: un usuario compra un juego y lo agrega a su biblioteca personal.


3. Préstamos
Prestación de juegos a amigos.


Restricciones: solo entre amigos, no se puede prestar si está en préstamo.


El juego queda bloqueado para el dueño mientras esté prestado.


Registro de fecha de inicio, devolución, estado (activo/devuelto).


Historial de préstamos.


4. Sistema de Ofertas (Funcionalidad adicional de complejidad media/alta)
Administración de promociones sobre juegos:


Descuento por porcentaje o precio fijo.


Vigencia temporal (fecha inicio/fin).


Aplicación automática del precio promocional si corresponde.


Registro de ofertas aplicadas para estadísticas futuras.


Opción futura: alertas de juegos deseados en oferta.



✅ Casos de uso de complejidad media/alta
🧩 1. Gestión de Préstamos
Transformación de datos: reglas dinámicas de préstamo (verificación de amistad, disponibilidad, historial).


Afecta estado del juego y bloquea uso mientras esté prestado.


Permite registrar movimientos temporales y su impacto en la biblioteca.


🧩 2. Sistema de Ofertas y Promociones
Lógica de cálculo de precio final según condiciones activas.


Administración de reglas por parte del administrador.


Consideración automática de validez temporal.


Posibilidad de reportes (juegos más vendidos en oferta, duración promedio de promociones, etc).



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









🤑 Sistema de Ofertas para Juegos
📌 Descripción
Permitir aplicar descuentos temporales a ciertos juegos del catálogo, administrados por un "rol admin". Las ofertas pueden ser:
Por porcentaje (ej: 25% OFF)


Por precio fijo promocional (ej: $500 en vez de $1000)


Limitadas por tiempo (ej: desde 01/07 al 07/07)



⚙️ Lógica a implementar (esto es lo que da complejidad real)
1. Aplicación dinámica de ofertas
El precio mostrado de un juego debe ser el precio actual según las reglas activas, no el base.


Si hay múltiples ofertas posibles, elegir la más conveniente para el usuario.


2. Restricción temporal
El sistema debe validar que la oferta esté activa (fecha_inicio <= hoy <= fecha_fin).


Al expirar, vuelve automáticamente al precio base.


3. Persistencia histórica
Guardar historial de ofertas aplicadas (por juego y por fecha).


O incluso de compras hechas bajo oferta (para estadísticas).


4. Opcional: sistema de alertas
Mostrar a los usuarios qué juegos de su biblioteca o deseados están en oferta.



📊 ¿Por qué cumple con la consigna?
✅ Transforma datos (precio base → precio con descuento dinámico).
 ✅ Tiene reglas de negocio: fechas, combinaciones, prioridad de oferta.
 ✅ Puede extenderse con estadísticas (juegos más vendidos en oferta, etc).
 ✅ Puede tener pruebas:
Caso feliz: compra de juego en oferta.


Caso no feliz: intento de comprar después de vencida la oferta.



🧱 Cómo encaja en la arquitectura
Modelos involucrados:
Juego: tiene precio_base


Oferta: relaciona con Juego, y tiene tipo (porcentaje o fijo), fecha_inicio, fecha_fin

INTEGRANTES: 
Nicolas Rolon
Brian Isaac Quindi
Juan Ignacio Gomez Nevot
Tomas Enzo Abalos Herrera
Uriel Ivan Barrios