import {videojuegosRepository} from '../repository/videojuegos.repository.js'

export const videojuegosService = {
	async obtenerVideojuegos() {
		// const { data, error } = await supabase.from("videojuegos").select("*");

		// if (error) {
		// 	console.error("Error al obtener videojuegos:", error.message);
		// 	throw new Error("No se pudieron obtener los videojuegos");
		// }
		const videojuegos = await videojuegosRepository.obtenerVideojuegos();

		return videojuegos;
	},

	async obtenerJuegosPorId(id) {
		const juego = await videojuegosRepository.obtenerJuegosPorId(id);
				if (!juego) {
						throw new Error("Videojuego no encontrado.");
					}
				return juego;	
	},

	async crearVideojuego(nuevoVideojuego) {

		if (!nuevoVideojuego.titulo || !nuevoVideojuego.desarrollador || !nuevoVideojuego.genero || !nuevoVideojuego.plataforma ||
				!nuevoVideojuego.fecha_lanzamiento	|| !nuevoVideojuego.calificacion || !nuevoVideojuego.esta_disponible) {
            throw new Error("Faltan campos obligatorios para crear el videojuego: título, género, plataforma.");
        }
		const juegoExistente = videojuegosRepository.obtenerJuegoPorTituloYDesarrollador(nuevoVideojuego.titulo,nuevoVideojuego.desarrollador);
		if (juegoExistente) {
			throw new Error("Ya existe un videojuego con el mismo titulo y desarrollador");
			
		}
		const videojuegoCreado = await videojuegosRepository.crearVideojuego(nuevoVideojuego);
		return videojuegoCreado;
	},

	async cambiarDisponibilidadJuego(juegoId){
        const juegoExistente = await videojuegosRepository.obtenerJuegosPorId(juegoId);
        if (!juegoExistente) {
            throw new Error("Videojuego no encontrado para cambiar disponibilidad.");
        }
		const nuevaDisponibilidad = !juegoExistente.esta_disponible;
		const videojuegoActualizado = await videojuegosRepository.cambiarDisponibilidadJuego(juegoId, nuevaDisponibilidad);
		if (!videojuegoActualizado) {
			throw new Error("Error al actualizar la disponibilidad del videojuego");
			
		}

		return videojuegoActualizado;
    },

	async actualizarVideojuego(juegoId, datosActualizados){
		if (!datosActualizados.titulo || !datosActualizados.desarrollador || !datosActualizados.genero ||
            !datosActualizados.plataforma || !datosActualizados.fecha_lanzamiento ||
            !datosActualizados.calificacion || datosActualizados.esta_disponible === undefined) { 
            throw new Error("Faltan campos obligatorios para crear el videojuego. Asegúrate de incluir: titulo, desarrollador, genero, plataforma, fecha_lanzamiento, calificacion y esta_disponible.");
        }
		const juegoExistente = await videojuegosRepository.obtenerJuegosPorId(juegoId);
        if (!juegoExistente) {
            throw new Error("Videojuego no encontrado para actualizar los datos.");
        }
		const datosAActualizar = { ...datosActualizados };
		let hayCambios = false;
    	for (const key in datosAActualizar) {
			if (datosAActualizar[key] !== juegoExistente[key]) {
				hayCambios = true;
			}
    	}

		if (!hayCambios) {
			throw new Error("No hay cambios que aplicar. Los datos proporcionados son idénticos a los existentes.");
		}

		if ((datosAActualizar.titulo && datosAActualizar.titulo !== juegoExistente.titulo) ||
            (datosAActualizar.desarrollador && datosAActualizar.desarrollador !== juegoExistente.desarrollador)) {

            const nuevoTitulo = datosAActualizar.titulo || juegoExistente.titulo; 
            const nuevoDesarrollador = datosAActualizar.desarrollador || juegoExistente.desarrollador; // Idem

            const juegoConMismoTituloDesarrollador = await videojuegosRepository.obtenerJuegoPorTituloYDesarrollador(
                nuevoTitulo,
                nuevoDesarrollador
            );

            if (juegoConMismoTituloDesarrollador && juegoConMismoTituloDesarrollador.id !== juegoId) {
                throw new Error("El nuevo título y desarrollador ya están registrados por otro videojuego.");
            }
        }

		
		const videojuegoActualizado = await videojuegosRepository.actualizarVideojuego(juegoId, datosAActualizar);

            if (!videojuegoActualizado) {
                throw new Error("No se pudo actualizar el videojuego (problema interno).");
            }
            return videojuegoActualizado;
	},
	eliminarVideojuego: async (id) => {
  return await videojuegosRepository.eliminarVideojuegoPorId(id);
}

};
