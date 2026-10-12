import express from 'express';
import clientesRouter from './routes/clientes.routes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de clientes funcionando'
  });
});

app.use('/clientes', clientesRouter);

export default app;