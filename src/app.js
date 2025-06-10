import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();


console.log("URL:", process.env.SUPABASE_URL); // ⬅️ DEBERÍA IMPRIMIR LA URL
console.log("KEY:", process.env.SUPABASE_KEY?.slice(0, 10) + "..."); // parcial

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;



const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = 3000;

app.get('/videojuegos', async (req, res) => {
  const { data, error } = await supabase
    .from('videojuegos')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`); 
});