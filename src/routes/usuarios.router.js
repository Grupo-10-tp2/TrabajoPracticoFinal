import { Router } from "express";
import { usuariosController } from "../controllers/usuarios.controller.js";
import { verificarToken } from "../middlewares/verificarToken.js";
import { verificarRol } from "../middlewares/verificarRol.js";


const usuariosRouter = Router();

usuariosRouter.get("/", verificarToken, verificarRol(["admin"]),usuariosController.obtenerUsuarios);
usuariosRouter.post("/", usuariosController.crearUsuario);
usuariosRouter.get("/:id",verificarToken, usuariosController.obtenerUsuarioPorId);
usuariosRouter.put("/:id",verificarToken, usuariosController.actualizarDatosUsuario);
usuariosRouter.delete("/:id", verificarToken, verificarRol(["admin"]), usuariosController.eliminarUsuario);

export { usuariosRouter };
