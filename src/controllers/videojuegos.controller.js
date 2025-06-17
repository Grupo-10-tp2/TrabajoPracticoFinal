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

	async obtenerJuegoPorId(req,res){
		try {
			const { id } = req.params; 
        	const juego = await videojuegosService.obtenerJuegosPorId(id);
			res.status(200).json(juego)
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
		
	},

	async cambiarDisponibilidadVideojuego(req,res){
		try {
			const { id } = req.params; 
			const videojuegoActualizado = await videojuegosService.cambiarDisponibilidadJuego(id);
			res.status(200).json({
                message: "Disponibilidad del videojuego actualizada exitosamente.",
                videojuego: videojuegoActualizado
            });
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	},

	async actualizarVideojuego(req,res){
		try {
			const { id } = req.params;
			const datosActualizados = req.body;
			const videojuegoActualizado = await videojuegosService.actualizarVideojuego(id, datosActualizados);

            res.status(200).json({
                message: "Videojuego actualizado exitosamente.",
                videojuego: videojuegoActualizado
            });
		} catch (error) {
			 res.status(500).json({ error: error.message});
		}
		
	}
};
