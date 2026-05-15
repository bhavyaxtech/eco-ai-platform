import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quizzes.js';
import aiRoutes from './routes/ai.js';

/* LOAD ENV */
dotenv.config();

/* DEBUG */
console.log(
  'OPENROUTER KEY:',
  process.env.OPENROUTER_API_KEY
    ? 'Loaded ✅'
    : 'Missing ❌'
);

console.log(
  'MONGO URI:',
  process.env.MONGO_URI
    ? 'Loaded ✅'
    : 'Missing ❌'
);

/* EXPRESS APP */
const app = express();

/* MIDDLEWARE */
app.use(cors());

app.use(express.json());

/* DATABASE CONNECTION */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected ✅');
  })
  .catch((err) => {
    console.log(
      'MongoDB Error ❌'
    );

    console.log(err);
  });

/* ROUTES */
app.use('/api/auth', authRoutes);

app.use('/api/quizzes', quizRoutes);

app.use('/api/ai', aiRoutes);

/* TEST ROUTE */
app.get('/', (req, res) => {
  res.json({
    message:
      'EcoLearn backend running 🚀',
  });
});

/* PORT */
const PORT =
  process.env.PORT || 5000;

/* START SERVER */
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} 🚀`
  );
});