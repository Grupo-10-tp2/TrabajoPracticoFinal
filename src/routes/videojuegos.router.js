import { Router } from "express";
import { videojuegosController } from "../controllers/videojuegos.controller.js";

const videojuegosRouter = Router();

videojuegosRouter.get("/", videojuegosController.obtenerVideojuegos);
videojuegosRouter.post("/", videojuegosController.crearVideojuego);
videojuegosRouter.get("/:id", videojuegosController.obtenerJuegoPorId);
videojuegosRouter.put("/:id", videojuegosController.actualizarVideojuego);
videojuegosRouter.patch("/:id/disponibilidad", videojuegosController.cambiarDisponibilidadVideojuego);



export { videojuegosRouter };
