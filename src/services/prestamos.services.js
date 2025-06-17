import {prestamosRepository} from '../repository/prestamos.repository.js'
import {videojuegosService } from './videojuegos.services.js';
import {usuariosServices } from './usuarios.services.js';

export const prestamosService = {
	async crearPrestamo({
		videojuegoId,
		usuarioIdPrestador,
		usuarioIdReceptor,
		fechaDevolucionEstimada,
	}) {
		
		if (!videojuegoId || !usuarioIdPrestador || !usuarioIdReceptor || !fechaDevolucionEstimada) {
            throw new Error("Faltan datos obligatorios para crear el préstamo.");
        }

        const videojuego = await videojuegosService.obtenerJuegosPorId(videojuegoId);
        if (!videojuego) {
		    throw new Error(`Videojuego con ID ${videojuegoId} no encontrado.`);
        }

        const prestador = await usuariosServices.obtenerUsuarioPorId(usuarioIdPrestador);
        if (!prestador) {
            throw new Error(`Usuario prestador con ID ${usuarioIdPrestador} no encontrado.`);
        }
        const receptor = await usuariosServices.obtenerUsuarioPorId(usuarioIdReceptor);
        if (!receptor) {
             throw new Error(`Usuario receptor con ID ${usuarioIdReceptor} no encontrado.`);
        }

        if (usuarioIdPrestador === usuarioIdReceptor) {
            throw new Error("El usuario prestador y el usuario receptor no pueden ser el mismo.");
        }

        const hoy = new Date();
        const fechaEst = new Date(fechaDevolucionEstimada);
        if (isNaN(fechaEst.getTime()) || fechaEst <= hoy) {
            throw new Error("La fecha de devolución estimada debe ser una fecha válida y posterior a la fecha actual.");
        }

        const datosParaRepositorio = {
            videojuego_id: videojuegoId,
            usuario_id_prestador: usuarioIdPrestador,
            usuario_id_receptor: usuarioIdReceptor,
            fecha_prestamo: new Date().toISOString(), 
            fecha_devolucion_estimada: fechaDevolucionEstimada,
            creado_en: new Date().toISOString(), 
        };

        const prestamoCreado = await prestamosRepository.crearPrestamo(datosParaRepositorio);
        return prestamoCreado;
	},

	async obtenerTodosLosPrestamos() {
		const prestamos = await prestamosRepository.obtenerTodosLosPrestamos();
        return prestamos;
	},

	async obtenerPrestamoPorId(prestamoId){
		const prestamo = await prestamosRepository.obtenerPrestamoPorId(prestamoId);
            if (!prestamo) {
                throw new Error("Préstamo no encontrado.");
            }
            return prestamo;
	},

	async obtenerPrestamosPorUsuarioDados(usuarioId){
		const prestamos = await prestamosRepository.obtenerPrestamosPorUsuarioDados(usuarioId);
        return prestamos;
	},

	async obtenerPrestamosRecibidosPorUsuario(usuarioId){
		const prestamos = await prestamosRepository.obtenerPrestamosPorUsuarioRecibidos(usuarioId);
        return prestamos;
	},
	
	// async obtenerPrestamoPorUsuario(usuarioId) {
	// 	const { data, error } = await supabase
	// 		.from("prestamos_videojuegos")
	// 		.select("*")
	// 		.or(
	// 			`usuario_id_prestador.eq.${usuarioId},usuario_id_receptor.eq.${usuarioId}`,
	// 		);

	// 	if (error)
	// 		throw new Error(
	// 			`Error al obtener préstamos del usuario: ${error.message}`,
	// 		);
	// 	return data;
	// },

	async registrarDevolucion(idPrestamo) {
		const prestamoExistente = await prestamosRepository.obtenerPrestamoPorId(idPrestamo);
        if (!prestamoExistente) {
            throw new Error("Préstamo no encontrado para registrar devolución.");
        }

		if (prestamoExistente.fecha_devolucion_real) {
            throw new Error("El préstamo ya ha sido devuelto.");
        }

		const fechaDevolucionReal = new Date().toISOString();
		const prestamoActualizado = await prestamosRepository.registrarDevolucion(idPrestamo, fechaDevolucionReal);
            if (!prestamoActualizado) {
                throw new Error("No se pudo registrar la devolución del préstamo.");
            }
            return prestamoActualizado;
		
	},
};
