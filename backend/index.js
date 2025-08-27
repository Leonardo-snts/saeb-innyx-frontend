import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import lookerRoutes from './routes/looker.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração do CORS
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

app.use('/api/looker', lookerRoutes);

app.get('/', (req, res) => {
  res.send('Servidor backend do Looker Dashboard está rodando');
});

// Rodar servidor local apenas em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

// Exportar app para uso no Firebase Functions
export { app };