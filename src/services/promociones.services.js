import supabase from "../config/supabaseClient.js";

export const promocionesServices = {
	async getAllPromociones() {
		const { data, error } = await supabase.from("Promociones").select("*");

		if (error) {
			console.error("Error al obtener promociones:", error.message);
			throw new Error("No se pudieron obtener las promociones :(");
		}

		return data;
	},
	async getPromocionById(id) {
		const { data, error } = await supabase
			.from("Promociones")
			.select("*")
			.eq("id", id);

		if (error) {
			console.error("Error al obtener promocion:", error.message);
			throw new Error("No se pudo obtener la promocion :(");
		}

		return data[0];
	},
	async crearPromocion(promocion) {
		const nuevaPromocion = {
			...promocion,
			inicioPromo: new Date().toISOString(),
		};

		const { data, error } = await supabase
			.from("Promociones")
			.insert([nuevaPromocion])
			.select();

		if (error) {
			console.error("Error al crear promocion:", error.message);
			throw new Error("No se pudo crear la promo :(");
		}

		return data[0];
	},

	async asingarPromocion(idJuego, idPromocion) {
		const promocionVideojuego = {
			idJuego,
			idPromocion,
		};

		const { data, error } = await supabase
			.from("Promocion_Videojuego")
			.insert([promocionVideojuego])
			.select();

		if (error) {
			console.error("Error al asingar promocion al juego:", error.message);
			throw new Error("No se pudo asingar la promo al juego :(");
		}

		return data[0];
	},
};
