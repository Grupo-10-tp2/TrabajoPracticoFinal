import supabase from "../config/supabaseClient.js";

export const prestamosService = {
	async crearPrestamo({
		videojuegoId,
		usuarioIdPrestador,
		usuarioIdReceptor,
		fechaDevolucionEstimada,
	}) {
		const { data, error } = await supabase
			.from("prestamos_videojuegos")
			.insert([
				{
					videojuego_id: videojuegoId,
					usuario_id_prestador: usuarioIdPrestador,
					usuario_id_receptor: usuarioIdReceptor,
					fecha_prestamo: new Date().toISOString(),
					fecha_devolucion_estimada: fechaDevolucionEstimada,
					creado_en: new Date().toISOString(),
				},
			])
			.select();

		if (error) {
			console.error("Error Supabase al insertar préstamo:", error.message);
			throw new Error(`El préstamo no se pudo crear: ${error.message}`);
		}

		if (!data || data.length === 0)
			throw new Error("El préstamo no se pudo crear");

		return data[0];
	},

	async obtenerTodosLosPrestamos() {
		const { data, error } = await supabase
			.from("prestamos_videojuegos")
			.select("*");
		if (error) throw new Error(`Error al obtener préstamos: ${error.message}`);
		return data;
	},

	async obtenerPrestamoPorUsuario(usuarioId) {
		const { data, error } = await supabase
			.from("prestamos_videojuegos")
			.select("*")
			.or(
				`usuario_id_prestador.eq.${usuarioId},usuario_id_receptor.eq.${usuarioId}`,
			);

		if (error)
			throw new Error(
				`Error al obtener préstamos del usuario: ${error.message}`,
			);
		return data;
	},

	async registrarDevolucion(
		idPrestamo,
		fechaDevolucionReal = new Date().toISOString(),
	) {
		const { data, error } = await supabase
			.from("prestamos_videojuegos")
			.update({ fecha_devolucion_real: fechaDevolucionReal })
			.eq("id", idPrestamo)
			.select();

		if (error)
			throw new Error(`Error al registrar devolución: ${error.message}`);

		return data[0];
	},
};
