import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const JWT_SECRET =
  process.env.JWT_SECRET ||
  'your-secret-key';

/* =========================
   REGISTER
========================= */

router.post(
  '/register',
  async (req, res) => {

    try {

      const {
        username,
        email,
        password,
      } = req.body;

      /* VALIDATION */

      if (
        !username ||
        !email ||
        !password
      ) {
        return res.status(400).json({
          message:
            'All fields are required',
        });
      }

      /* CHECK EXISTING USER */

      const existingUser =
        await User.findOne({
          $or: [
            { email },
            { username },
          ],
        });

      if (existingUser) {

        return res.status(400).json({
          message:
            'User already exists',
        });
      }

      /* HASH PASSWORD */

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      /* CREATE USER */

      const newUser =
        await User.create({

          username,

          email,

          password:
            hashedPassword,

          role: 'user',

          points: 1200,
        });

      /* GENERATE TOKEN */

      const token = jwt.sign(
        {
          userId:
            newUser._id,
        },
        JWT_SECRET,
        {
          expiresIn: '7d',
        }
      );

      /* RESPONSE */

      res.status(201).json({

        token,

        user: {

          id: newUser._id,

          username:
            newUser.username,

          email:
            newUser.email,

          role:
            newUser.role,

          points:
            newUser.points,
        },
      });

    } catch (error) {

      console.error(
        'REGISTER ERROR:',
        error
      );

      res.status(500).json({
        message:
          'Server error',
      });
    }
  }
);

/* =========================
   LOGIN
========================= */

router.post(
  '/login',
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      /* FIND USER */

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(400).json({
          message:
            'Invalid credentials',
        });
      }

      /* CHECK PASSWORD */

      const validPassword =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!validPassword) {

        return res.status(400).json({
          message:
            'Invalid credentials',
        });
      }

      /* TOKEN */

      const token = jwt.sign(
        {
          userId:
            user._id,
        },
        JWT_SECRET,
        {
          expiresIn: '7d',
        }
      );

      /* RESPONSE */

      res.json({

        token,

        user: {

          id: user._id,

          username:
            user.username,

          email:
            user.email,

          role:
            user.role,

          points:
            user.points || 1200,
        },
      });

    } catch (error) {

      console.error(
        'LOGIN ERROR:',
        error
      );

      res.status(500).json({
        message:
          'Server error',
      });
    }
  }
);

export default router;