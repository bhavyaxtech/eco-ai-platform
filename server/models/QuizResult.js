import mongoose from 'mongoose';

const quizResultSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },

      quizId: Number,

      score: Number,

      xp: Number,
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  'QuizResult',
  quizResultSchema
);