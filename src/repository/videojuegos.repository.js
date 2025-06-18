import supabase from "../config/supabaseClient.js";

export const videojuegosRepository = {

    async obtenerVideojuegos(){
        const { data, error } = await supabase.from("videojuegos").select("*");

		if (error) {
			throw new Error(`Error al buscar usuario por el Id: ${error.message}`);
		}
        return data;
    },

    async obtenerJuegosPorId(juegoId){
        const { data, error } = await supabase
			.from("videojuegos")
			.select("*")
			.eq("id", juegoId)
            .single();

		if (error && error.code !== 'PGRST116') {
			throw new Error(`Error al buscar usuario en la BD por el Id: ${error.message}`);
		}

		return data;
    },

    async crearVideojuego(videojuego){
        const nuevoVideojuego = {
			...videojuego,
			creado_en: new Date().toISOString(),
		};

		const { data, error } = await supabase
			.from("videojuegos")
			.insert([nuevoVideojuego])
			.select();

		if (error) {
			throw new Error(`Error al crear el videojuego en la BD: ${error.message}`);
		}
		return data[0];
    },

    async obtenerJuegoPorTituloYDesarrollador(titulo,desarrollador){
        const {data,error} = await supabase
            .from('videojuegos')
            .select('*')
            .eq('titulo',titulo)
            .eq('desarrollador',desarrollador)
            .single()

            if (error && error.code !== 'PGRST116') {
                throw new Error(`Error al buscar el videojuego en la BD por titulo y desarrollador: ${error.message}`)
            }
            return data;

    },

    async cambiarDisponibilidadJuego(juegoId, nuevaDisponibilidad){
       const { data, error } = await supabase
                .from('videojuegos')
                .update({ esta_disponible: nuevaDisponibilidad }) 
                .eq('id', juegoId)
                .select();

            if (error) {
                throw new Error(`Error en la BD al cambiar la disponibilidad del videojuego: ${error.message}`);
            }
            return data && data.length > 0 ? data[0] : null;
    },

    async actualizarVideojuego(juegoId, datosActualizados){
		const { data, error } = await supabase
                .from('videojuegos')
                .update(datosActualizados)
                .eq('id', juegoId)
                .select(); 

                if (error) {
                throw new Error(`Error en la BD al actualizar el videojuego: ${error.message}`);
            }
            return data;
	},
    eliminarVideojuegoPorId: async (id) => {
  const { data, error } = await supabase
    .from("videojuegos")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error("Error al eliminar videojuego");
  if (!data || data.length === 0) throw new Error("Videojuego no encontrado");
},


}