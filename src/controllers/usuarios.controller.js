import supabase from '../config/supabaseClient.js';

export const usuariosController = {
  async obtenerUsuarios(req, res) {
    try {
      const { data, error } = await supabase.from('usuarios').select('*');
      if (error) throw error;
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};