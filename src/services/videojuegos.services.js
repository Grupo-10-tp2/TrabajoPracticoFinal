import supabase from "../config/supabaseClient.js";

export const videojuegosService = {
	async obtenerVideojuegos() {
		const { data, error } = await supabase.from("videojuegos").select("*");

		if (error) {
			console.error("Error al obtener videojuegos:", error.message);
			throw new Error("No se pudieron obtener los videojuegos");
		}

		return data;
	},
	async getJuegoById(id) {
		const { data, error } = await supabase
			.from("videojuegos")
			.select("*")
			.eq("id", id);

		if (error) {
			console.error("Error al obtener el juego:", error.message);
			throw new Error("No se pudo obtener el juego");
		}

		return data[0];
	},
	async crearVideojuego(videojuego) {
		const nuevoVideojuego = {
			...videojuego,
			creado_en: new Date().toISOString(),
		};

		const { data, error } = await supabase
			.from("videojuegos")
			.insert([nuevoVideojuego])
			.select();

		if (error) {
			console.error("Error al crear videojuego:", error.message);
			throw new Error("No se pudo crear el videojuego");
		}

		return data[0];
	},
};
