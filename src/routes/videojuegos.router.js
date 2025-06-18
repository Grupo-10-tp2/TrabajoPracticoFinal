import { Router } from "express";
import { videojuegosController } from "../controllers/videojuegos.controller.js";
import { verificarToken } from "../middlewares/verificarToken.js";
import { verificarRol } from "../middlewares/verificarRol.js";

const videojuegosRouter = Router();

videojuegosRouter.get("/", videojuegosController.obtenerVideojuegos);
videojuegosRouter.get("/:id", videojuegosController.obtenerJuegoPorId);

videojuegosRouter.post("/",verificarToken,verificarRol(["admin"]), videojuegosController.crearVideojuego);
videojuegosRouter.put("/:id",verificarToken,verificarRol(["admin"]), videojuegosController.actualizarVideojuego);
videojuegosRouter.patch("/:id/disponibilidad", verificarToken,verificarRol(["admin"]),videojuegosController.cambiarDisponibilidadVideojuego);
videojuegosRouter.delete("/:id", verificarToken, verificarRol(["admin"]), videojuegosController.eliminarVideojuego);



export { videojuegosRouter };
