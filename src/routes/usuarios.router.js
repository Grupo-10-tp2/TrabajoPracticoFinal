import { Router } from "express";
import { usuariosController } from "../controllers/usuarios.controller.js";

const usuariosRouter = Router();

usuariosRouter.get("/", usuariosController.obtenerUsuarios);
usuariosRouter.post("/", usuariosController.crearUsuario);
usuariosRouter.get("/:id", usuariosController.obtenerUsuarioPorId);
usuariosRouter.put("/:id", usuariosController.actualizarDatosUsuario);

export { usuariosRouter };
