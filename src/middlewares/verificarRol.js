export const verificarRol = (rolesPermitidos) => (req, res, next) => {
  const usuario = req.user;

  if (!usuario) {
    return res.status(401).json({ error: "No hay usuario autenticado" });
  }

  if (!rolesPermitidos.includes(usuario.rol)) {
    return res.status(403).json({ error: "Acceso denegado: rol no autorizado" });
  }

  next();
};