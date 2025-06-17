import {  userGamesRepository } from "../repository/user_games.repository.js";

export const userGamesServices = {
  adquirirJuego: async (userId, gameId) => {
    
    const yaTieneElJuego = await userGamesRepository.buscarPorUsuarioYJuego(userId, gameId);
    if (yaTieneElJuego) {
      throw new Error("Ya tenés este juego en tu biblioteca");
    }

    
    const juegoEnUso = await userGamesRepository.buscarJuegoEnUso(gameId);
    if (juegoEnUso.length > 0) {
      throw new Error("Este juego ya está en posesión de otro usuario");
    }

   
    const nuevo = await userGamesRepository.asignarJuegoAlUsuario(userId, gameId);
    return nuevo;
  },
};
