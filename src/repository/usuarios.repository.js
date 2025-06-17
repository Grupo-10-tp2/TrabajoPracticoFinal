import supabase from "../config/supabaseClient.js";

export const usuarioRepository = {
    async obtenerUsuarios(){
        const { data, errorConsulta } = await supabase.from("usuarios").select("*");
        if (errorConsulta) throw new Error(`Error al traer los usuarios de la BD: ${errorConsulta.message}`);
		return data;
    },

    async obtenerUsuarioPorEmail(email){
        const { data, errorConsulta } = await supabase
            .from("usuarios")
            .select("*")
            .eq("email", email)
            .single();
            if (errorConsulta && errorConsulta.code !== 'PGRST116') { // PGRST116 es 'No rows found'
            throw new Error(`Error al buscar usuario por email en la BD: ${errorConsulta.message}`);
        }   
        return data;
    },

    async crearUsuario(nuevoUsuario){
        const { data, errorConsulta } = await supabase
			.from("usuarios")
			.insert([nuevoUsuario])
			.select();

		if (errorConsulta) throw new Error(`Error al crear usuario en la BD: ${errorConsulta.message}`);
		return data[0];
    },

    async obtenerUsuarioPorId(userId){
        const {data,errorConsulta} = await supabase
            .from('usuarios')
            .select('*')
            .eq('id',userId)
            .single();

            if(errorConsulta && errorConsulta.code !== 'PGRST116'){
                throw new Error(`Error al buscar usuario por el Id: ${errorConsulta.message}`)
            }
            return data;
    },
    
    async actualizarUsuario(userId, datosNuevos){
        const{data,errorConsulta} = await supabase
            .from('usuarios')
            .update(datosNuevos)
            .eq('id',userId)
            .select();

            if(errorConsulta){
                throw new Error(`Error al actualizar datos del usuario en BD: ${errorConsulta.message}`)
            }

            return data;

    }
}