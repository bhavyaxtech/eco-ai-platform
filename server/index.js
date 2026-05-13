import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quizzes.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

/* ROUTES */

app.use('/api/auth', authRoutes);

app.use('/api/quizzes', quizRoutes);

app.use('/api/ai', aiRoutes);

/* TEST */

app.get('/', (req, res) => {

  res.json({
    message:
      'EcoLearn backend running',
  });
});

/* PORT */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});