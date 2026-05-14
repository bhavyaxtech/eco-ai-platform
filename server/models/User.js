import mongoose from 'mongoose';

const userSchema =
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        default: 'user',
      },

      points: {
        type: Number,
        default: 1200,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  'User',
  userSchema
);