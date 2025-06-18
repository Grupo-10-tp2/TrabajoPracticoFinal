import { Router } from "express";
import { userGamesController } from "../controllers/user_games.controller.js";
import { verificarToken } from "../middlewares/verificarToken.js";
import { verificarRol } from "../middlewares/verificarRol.js";

const userGamesRouter = Router();

userGamesRouter.post(
  "/adquirirJuego",
  verificarToken,
  verificarRol(["jugador"]),
  userGamesController.adquirirJuego
);

export { userGamesRouter };
