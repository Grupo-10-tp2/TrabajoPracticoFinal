import { Router } from "express";
import { videojuegosController } from "../controllers/videojuegos.controller.js";

const videojuegosRouter = Router();

videojuegosRouter.get('/',videojuegosController.obtenerVideojuegos);

export {videojuegosRouter};