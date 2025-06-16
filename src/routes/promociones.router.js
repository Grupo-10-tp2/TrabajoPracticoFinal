import { Router } from "express";
import { promocionesController } from "../controllers/promociones.Controller.js";

const promocionesRouter = Router();

promocionesRouter.get("/promociones", promocionesController.getAllPromociones);
promocionesRouter.post("/asignar", promocionesController.asignarPromocion);
promocionesRouter.post("/", promocionesController.crearPromocion);

export { promocionesRouter };