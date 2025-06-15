import { Router } from "express";
import { prestamosController } from "../controllers/prestamos.controller.js";

const prestamosRouter = Router();

prestamosRouter.post("/", prestamosController.crearPrestamoController);
prestamosRouter.get(
	"/",
	prestamosController.obtenerTodosLosPrestamosController,
);
prestamosRouter.get(
	"/usuario/:usuarioId",
	prestamosController.obtenerPrestamoPorUsuarioController,
);
prestamosRouter.put(
	"/devolver/:id",
	prestamosController.registrarDevolucionController,
);

export { prestamosRouter };
