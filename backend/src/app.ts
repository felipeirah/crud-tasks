import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const status = err.message.includes('não encontrada') ? 404 : err.message.includes('obrigatório') || err.message.includes('inválid') ? 400 : 500;
  res.status(status).json({ error: status === 500 ? 'Erro interno no servidor' : err.message });
});

export default app;
