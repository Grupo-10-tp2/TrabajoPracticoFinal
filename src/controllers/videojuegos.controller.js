import supabase from '../config/supabaseClient.js';


export const videojuegosController = {
  async obtenerVideojuegos(req, res) {
    try {
      const { data, error } = await supabase.from('videojuegos').select('*');
      if (error) throw error;
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};
