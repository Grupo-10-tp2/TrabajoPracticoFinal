import supabase from "../config/supabaseClient.js";

export const usuariosServices = {
	async obtenerUsuarios() {
		const { data, error } = await supabase.from("usuarios").select("*");
		if (error) throw new Error(error.message);
		return data;
	},

	async crearUsuario(nuevoUsuario) {
		const { data: existentes, error: errorConsulta } = await supabase
			.from("usuarios")
			.select("*")
			.eq("email", nuevoUsuario.email);

		if (errorConsulta) throw new Error(errorConsulta.message);
		if (existentes.length > 0)
			throw new Error("Ya existe un usuario con ese email");

		const { data, error } = await supabase
			.from("usuarios")
			.insert([nuevoUsuario])
			.select();

		if (error) throw new Error(error.message);
		return data[0];
	},
};
