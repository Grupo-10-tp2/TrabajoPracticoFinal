import express from 'express';
import supabase from './config/supabaseClient.js'; 
import { videojuegosRouter } from './routes/videojuegos.router.js';
import { usuariosRouter } from './routes/usuarios.router.js';

const app = express();
const port = 3000;

app.use('/videojuegos', videojuegosRouter);
app.use ('/usuarios', usuariosRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
