import { Router } from 'express';
import { usuariosController } from '../controllers/usuarios.controller.js';

const usuariosRouter = Router();

usuariosRouter.get('/', usuariosController.obtenerUsuarios);

export { usuariosRouter };
