import { Router } from "express";
import { videojuegosController } from "../controllers/videojuegos.controller.js";

const videojuegosRouter = Router();

videojuegosRouter.get("/", videojuegosController.obtenerVideojuegos);
videojuegosRouter.post("/", videojuegosController.crearVideojuego);

export { videojuegosRouter };
