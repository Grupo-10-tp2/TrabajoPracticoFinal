import { prestamosService } from "../services/prestamos.services.js";

export const prestamosController = {
	async crearPrestamoController(req, res) {
		try {
			const {
				videojuego_id,
				usuario_id_prestador,
				usuario_id_receptor,
				fecha_devolucion_estimada,
			} = req.body;

			const nuevoPrestamo = await prestamosService.crearPrestamo({
				videojuegoId: videojuego_id,
				usuarioIdPrestador: usuario_id_prestador,
				usuarioIdReceptor: usuario_id_receptor,
				fechaDevolucionEstimada: fecha_devolucion_estimada,
			});
			res.status(201).json(nuevoPrestamo);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async obtenerTodosLosPrestamosController(req, res) {
		try {
			const prestamos = await prestamosService.obtenerTodosLosPrestamos();
			res.status(200).json(prestamos);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async obtenerPrestamoPorUsuarioController(req, res) {
		try {
			const { usuarioId } = req.params;
			const prestamos =
				await prestamosService.obtenerPrestamoPorUsuario(usuarioId);
			res.status(200).json(prestamos);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async registrarDevolucionController(req, res) {
		try {
			const { id } = req.params;
			const devolucion = await prestamosService.registrarDevolucion(id);
			res.status(200).json(devolucion);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};
