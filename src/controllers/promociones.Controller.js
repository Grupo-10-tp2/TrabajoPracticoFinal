import { promocionesServices } from "../services/promociones.services";
import { videojuegosService } from "../services/videojuegos.services";

export const promocionesController = {
	async getAllPromociones(req, res) {
		try {
			const promociones = await promocionesServices.getAllPromociones();
			res.status(200).json(promociones);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async crearPromocion(req, res) {
		const nuevaPromo = req.body;
		try {
			const promo = await promocionesServices.crearPromocion(nuevaPromo);
			res.status(201).json(promo);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async asignarPromocion(req, res) {
		const promoVideojuego = req.body;
		const idJuego = promoVideojuego.idJuego;
		const idPromocion = promoVideojuego.idPromocion;
		try {
			const promo = await promocionesServices.getPromocionById(idPromocion);
			const juego = await videojuegosService.getJuegoById(idJuego);
			const PV = await promocionesServices.asingarPromocion(
				juego.idJuego,
				promo.idPromocion,
			);
			res.status(201).json(promo);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};
