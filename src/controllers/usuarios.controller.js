import supabase from "../config/supabaseClient.js";
import { usuariosServices } from "../services/usuarios.services.js";

export const usuariosController = {
	async obtenerUsuarios(req, res) {
		try {
			const usuarios = await usuariosServices.obtenerUsuarios();
			res.json(usuarios);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async crearUsuario(req, res) {
		try {
			const nuevoUsuario = req.body;
			const resultado = await usuariosServices.crearUsuario(nuevoUsuario);
			res.status(201).json(resultado);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};
