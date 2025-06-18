import supabase from '../config/supabaseClient.js'

export const userGamesRepository = {
    buscarPorUsuarioYJuego: async (userId, gameId) => {
    const { data, error } = await supabase
      .from("user_games")
      .select("*")
      .eq("user_id", userId)
      .eq("game_id", gameId)
      .maybeSingle();

    if (error) throw new Error("Error al buscar en user_games");
    return data;
  },
 buscarJuegoEnUso: async (gameId) => {
  const { data, error } = await supabase
    .from("user_games")
    .select("id")
    .eq("game_id", gameId)
    .in("status", ["disponible", "prestado"]);

  // en vez de tirar el error directamente, lo logueamos y seguimos
  if (error) {
    console.error("Error en buscarJuegoEnUso:", error.message);
    return [];
  }

  return data || [];
},


     asignarJuegoAlUsuario: async (userId, gameId) => {
    const { data, error } = await supabase
      .from("user_games")
      .insert([
        {
          user_id: userId,
          game_id: gameId,
          estado: "disponible",
          minutos_jugados: 0,
        },
      ])
      .select()
      .single();

    if (error){
      console.error("Error al registrar el juego:", error.message);
      throw new Error("Error al registrar el juego");
    } 
    
    return data;
  },
};