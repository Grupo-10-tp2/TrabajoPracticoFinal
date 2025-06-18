import { userGamesServices } from "../services/user_games.services.js";

export const userGamesController = {
  adquirirJuego: async (req, res) => {
    const userId = req.user.id;
    const { game_id } = req.body;

    if (!game_id) {
      return res.status(400).json({ error: "Falta el ID del juego" });
    }

    try {
      const resultado = await userGamesServices.adquirirJuego(userId, game_id);
      res.status(201).json({ mensaje: "Juego adquirido exitosamente", juego: resultado });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
