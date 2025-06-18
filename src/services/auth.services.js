import supabase from "../config/supabaseClient.js";

export const authService = {
register: async ({ email, password, nombre, rol = "jugador" }) => {
  // 1. Registrar en Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { rol } // Esto guarda el rol en los user_metadata del token
    }
  });

  if (authError) {
    if (authError.message.includes("already registered")) {
      throw new Error("Este email ya está registrado");
    }
    throw new Error(authError.message);
  }

  const userId = authData.user.id;

  // 2. Verificar si ya existe en la tabla usuarios
  const { data: existe, error: consultaError } = await supabase
    .from("usuarios")
    .select("id")
    .eq("id", userId);

  if (consultaError) throw new Error(consultaError.message);
  if (existe.length > 0)
    throw new Error("El usuario ya existe en la base de datos");

  // 3. Insertar en tabla 'usuarios' propia con el rol
  const { error: dbError } = await supabase.from("usuarios").insert([
    {
      id: userId,
      email,
      nombre,
      rol
    }
  ]);

  if (dbError) throw new Error(dbError.message);

  // 4. Retornar datos útiles
  return {
    id: userId,
    email,
    nombre,
    rol
  };
}
,
	login: async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Credenciales inválidas");

  const userId = data.user.id;

  // consulta en tabla Usuarios para traer el verdadero rol declarado en la misma, y no el rol del user por defecto de Auth de supa.
  const { data: usuario, error: errorUsuario } = await supabase
    .from("usuarios")
    .select("email, rol")
    .eq("id", userId)
    .single();

  if (errorUsuario || !usuario) {
    throw new Error("No se pudo obtener el rol del usuario");
  }

  return {
    mensaje: "Login exitoso",
    user: {
      id: userId,
      email: usuario.email,
      rol: usuario.rol,
    },
    token: data.session.access_token,
  };
},

};
