import jwt from "jsonwebtoken";
import supabase from "../config/supabaseClient.js";

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

export const verificarToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verificamos token con la clave secreta
    const decodificado = jwt.verify(token, JWT_SECRET); // sub = user id

    // Buscamos al usuario en Usuarios
    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("id, email, rol")
      .eq("id", decodificado.sub)
      .single();

    if (error || !usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    req.user = usuario; // Guardamos en req.user para proximos middleware
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};
