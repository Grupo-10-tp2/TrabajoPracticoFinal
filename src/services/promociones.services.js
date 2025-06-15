import supabase from "../config/supabaseClient";

export const promocionesServices = {
    async obtenerPromociones(){
        const { data, error } = await supabase.from('Promociones').select('*')

       if (error) {
			console.error("Error al obtener promociones:", error.message);
			throw new Error("No se pudieron obtener las promociones");
		}

		return data;
    },
    async crearPromocion(nombrePromo, valorPromo, finPromo){
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
    }
}