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

	async obtenerUsuarioPorId(req,res){
		try {
			const {id} = req.params;
			const usuario = await usuariosServices.obtenerUsuarioPorId(id);
			res.status(200).json(usuario);
		} catch (error) {
			return res.status(500).json({error:error.message})
		}
	},

	async actualizarDatosUsuario(req,res){
		try {
			const {id} = req.params;
			const datosActualizados = req.body;
			const usuarioActualizado = await usuariosServices.actualizarDatosUsuario(id,datosActualizados);
			res.status(200).json({
				message: "Usuario actualizado exitosamente.",
                usuario: usuarioActualizado
			})
		} catch (error) {
			res.status(500).json({error:error.message});
		}
	}
};
