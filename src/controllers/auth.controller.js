import { authService } from '../services/auth.services.js'

export const authController = {
  register: async (req, res) => {
    const { email, password, nombre } = req.body
    if (!email || !password || !nombre) {
      return res.status(400).json({ error: 'Faltan campos requeridos' })
    }

    try {
      const user = await authService.register({ email, password, nombre })
      res.status(201).json({ mensaje: 'Usuario registrado', user })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
   login: async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' })
    }

    try {
      const resultado = await authService.login({ email, password })
      res.status(200).json(resultado)
    } catch (error) {
      res.status(401).json({ error: error.message })
    }
  }
}
