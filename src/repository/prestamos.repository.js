import supabase from "../config/supabaseClient.js";

export const prestamosRepository = {

    async obtenerTodosLosPrestamos(){
        const { data, error } = await supabase
			.from("prestamos_videojuegos")
			.select("*");
		if (error) throw new Error(`Error al obtener préstamos de la BD: ${error.message}`);
		return data;
    },

    async crearPrestamo(datosPrestamo){
        const { data, error } = await supabase
            .from("prestamos_videojuegos")
            .insert([datosPrestamo])
            .select();

            if (error) {
            throw new Error(`Error en la BD al crear el préstamo: ${error.message}`);
            }

            return data[0];
    },

    async obtenerPrestamoPorId(prestamoId){
        const { data, error } = await supabase
                .from("prestamos_videojuegos")
                .select("*")
                .eq("id", prestamoId)
                .single();

        if (error && error.code !== 'PGRST116') { 
            throw new Error(`Error en la BD al obtener préstamo por ID: ${error.message}`);
        } 
        return data;       
    },

    async obtenerPrestamosPorUsuarioDados(usuarioId){
        const { data, error } = await supabase
                .from("prestamos_videojuegos")
                .select("*")
                .eq('usuario_id_prestador', usuarioId);

           if (error) {
                throw new Error(`Error en la BD al obtener préstamos dados por el usuario: ${error.message}`);
            }
            return data;
    },

    async obtenerPrestamosPorUsuarioRecibidos(usuarioId){
        const { data, error } = await supabase
                .from("prestamos_videojuegos")
                .select("*")
                .eq('usuario_id_receptor', usuarioId);

            if (error) {
                console.error("Error Supabase al obtener préstamos recibidos por usuario en el repositorio:", error.message);
                throw new Error(`Error en la BD al obtener préstamos recibidos por el usuario: ${error.message}`);
            }
            return data;
    },

    async registrarDevolucion(idPrestamo, fechaDevolucionReal) { 
            const { data, error } = await supabase
                .from("prestamos_videojuegos")
                .update({ fecha_devolucion_real: fechaDevolucionReal })
                .eq("id", idPrestamo)
                .select(); 
            if (error) {
                throw new Error(`Error en la BD al registrar devolución: ${error.message}`);
            }
            return data;
    }
}