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

	async obtenerPrestamoPorId(req,res){
		try {
            const { id } = req.params;
            const prestamo = await prestamosService.obtenerPrestamoPorId(id);
            res.status(200).json(prestamo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
	},

	async obtenerPrestamosPorUsuarioDados(req,res){
		try {
            const { usuarioId } = req.params;
            const prestamos = await prestamosService.obtenerPrestamosPorUsuarioDados(usuarioId);
            res.status(200).json(prestamos);
        } catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async obtenerPrestamosPorUsuarioRecibidos(req,res){
		try {
            const { usuarioId } = req.params;
            const prestamos = await prestamosService.obtenerPrestamosRecibidosPorUsuario(usuarioId);
            res.status(200).json(prestamos);
        } catch (error) {
			res.status(500).json({ error: error.message })
		}
	},

	// async obtenerPrestamoPorUsuarioController(req, res) {
	// 	try {
	// 		const { usuarioId } = req.params;
	// 		const prestamos =
	// 			await prestamosService.obtenerPrestamoPorUsuario(usuarioId);
	// 		res.status(200).json(prestamos);
	// 	} catch (error) {
	// 		res.status(500).json({ error: error.message });
	// 	}
	// },

	async registrarDevolucionController(req, res) {
		try {
			const { id } = req.params;
			const devolucion = await prestamosService.registrarDevolucion(id);
			res.status(200).json({
                message: "Devolución registrada exitosamente.",
                prestamo: devolucion
            });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async eliminarPrestamoLogico(req, res) {
		try {
			const { id }  = req.params;
			const resultado = await prestamosService.eliminarPrestamo(id);
			res.status(200).json({
				mensaje: "Préstamo eliminado correctamente.",
				prestamo: resultado,
			});
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},

	async recuperarPrestamo(req, res) {
		try {
			const { id }  = req.params;
			const resultado = await prestamosService.recuperarPrestamo(id);
			res.status(200).json({
				mensaje: "Préstamo recuperado correctamente.",
				prestamo: resultado,
			});
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

};
