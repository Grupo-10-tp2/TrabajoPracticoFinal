import express from "express";
import swaggerUi from 'swagger-ui-express'; 
import { authRouter } from "./routes/auth.router.js";
import { prestamosRouter } from "./routes/prestamos.router.js";
import { usuariosRouter } from "./routes/usuarios.router.js";
import { videojuegosRouter } from "./routes/videojuegos.router.js";
import { userGamesRouter } from "./routes/user_games.router.js";
import { specs } from "./config/swagger.js";
const app = express();
const port = 3000;

app.use(express.json());

app.use("/videojuegos", videojuegosRouter);
app.use("/usuarios", usuariosRouter);
app.use("/prestamos", prestamosRouter);
app.use("/auth", authRouter);
app.use("/user-games",userGamesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res) => {
	res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(port, () => {
	console.log(`Servidor escuchando en http://localhost:${port}`);
});
