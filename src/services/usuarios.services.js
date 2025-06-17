import {usuarioRepository} from '../repository/usuarios.repository.js';

export const usuariosServices = {
	async obtenerUsuarios() {
		const data = await usuarioRepository.obtenerUsuarios();
		return data;
	},

	async crearUsuario(nuevoUsuario) {
		const existentes = await usuarioRepository.obtenerUsuarioPorEmail(nuevoUsuario.email);
		if (existentes)
			throw new Error("Ya existe un usuario con ese email");

		const usuarioCreado = await usuarioRepository.crearUsuario(nuevoUsuario);
		return usuarioCreado;
	},

	async obtenerUsuarioPorId(usuarioID){
		const user = await usuarioRepository.obtenerUsuarioPorId(usuarioID);
		if (!user) {
                throw new Error("Usuario no encontrado.");
            }
        return user;	
	},
	
	async actualizarDatosUsuario(usuarioID, datosActualizados){
		const usuarioExistente = await usuarioRepository.obtenerUsuarioPorId(usuarioID);
		if (!usuarioExistente) {
			throw new Error("Usuario no encontrado para actualizar los datos");
		}
		const datosAActualizar = { ...datosActualizados };

    	let hayCambios = false;
    
    	for (const key in datosAActualizar) {
			if (datosAActualizar[key] !== usuarioExistente[key]) {
				hayCambios = true;
			}
    	}	
    
		if (!hayCambios) {
			throw new Error("No hay cambios que aplicar. Los datos proporcionados son idénticos a los existentes.");
		}

		if (datosAActualizar.email && datosAActualizar.email !== usuarioExistente.email) {
            const mailExistente = await usuarioRepository.obtenerUsuarioPorEmail(datosAActualizar.email);
            if (mailExistente && mailExistente.id !== usuarioID) {
                throw new Error("El nuevo email ya está registrado por otro usuario.");
            }
        }

		const usuarioActualizado = await usuarioRepository.actualizarUsuario(usuarioID, datosAActualizar);
		return usuarioActualizado;

	}
};
