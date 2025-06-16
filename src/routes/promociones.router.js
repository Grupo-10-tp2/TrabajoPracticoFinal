import { Router } from "express";
import { promocionesController } from "../controllers/promociones.Controller";

const promocionesRouter = Router();

usuariosRouter.get("/", promocionesController.getAllPromociones());
usuariosRouter.post("/asignar", promocionesController.asignarPromocion());
usuariosRouter.post("/", promocionesController.crearPromocion());

export { promocionesRouter };
