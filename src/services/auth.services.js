import supabase from '../config/supabaseClient.js'

export const authService = {
  register: async ({ email, password, nombre }) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    })

    if (authError) {
      if (authError.message.includes('already registered')) {
        throw new Error('Este email ya está registrado')
      }
      throw new Error(authError.message)
    }

    const userId = authData.user.id

    //  Validacion de que no haya ya uno creado
    const { data: existe, error: consultaError } = await supabase
      .from('usuarios')
      .select('id')
      .eq('id', userId)

    if (consultaError) throw new Error(consultaError.message)
    if (existe.length > 0) throw new Error('El usuario ya existe en la base de datos')

   //
    const { error: dbError } = await supabase
      .from('usuarios')
      .insert([{ id: userId, email, nombre }])

    if (dbError) throw new Error(dbError.message)

    return { id: userId, email, nombre }
  },
  login: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw new Error('Credenciales inválidas')

    const user = data.user
    const userId = user.id
    const rol = user.user_metadata?.rol || 'sin rol'

    return {
      mensaje: 'Login exitoso',
      user: {
        id: userId,
        email: user.email,
        rol
      },
      token: data.session.access_token
    }
  }
}
