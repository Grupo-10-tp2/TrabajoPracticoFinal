import { videojuegosService } from "../services/videojuegos.services.js";

export const videojuegosController = {
	async obtenerVideojuegos(req, res) {
		try {
			const videojuegos = await videojuegosService.obtenerVideojuegos();
			res.status(200).json(videojuegos);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async crearVideojuego(req, res) {
		try {
			const nuevo = await videojuegosService.crearVideojuego(req.body);
			res.status(201).json(nuevo);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};
