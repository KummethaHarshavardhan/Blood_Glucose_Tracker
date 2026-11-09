import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import prisma from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import readingRoutes from './routes/readingRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});

app.use('/api/auth', authRoutes);
app.use('/api/readings', readingRoutes);
app.use('/api/reports', reportRoutes);

app.use(notFound);
app.use(errorHandler);

// Exported so Supertest can call the app without starting a real server
export default app;

// Tests set VITEST=true, which stops the server from listening on the port
if (process.env.VITEST !== 'true') {
  const PORT = Number(process.env.PORT) || 7005;
  const server = app.listen(PORT, () => {
    console.log(`Sweety API running at http://localhost:${PORT}`);
  });

  const shutdown = async () => {
    server.close();
    await prisma.$disconnect();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}
