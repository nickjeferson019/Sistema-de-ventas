require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/db');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.get('/api/health', async (req, res, next) => {
  try {
    const result = await db.query('SELECT current_database() AS database');
    res.json({ mensaje: 'API funcionando y conectada a PostgreSQL', baseDatos: result.rows[0].database });
  } catch (error) { next(error); }
});

app.use('/api/productos', require('./src/routes/producto.routes'));
app.use('/api/vendedores', require('./src/routes/vendedor.routes'));
app.use('/api/ventas', require('./src/routes/venta.routes'));

app.use((req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada.' }));
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API disponible en http://localhost:${port}`));
