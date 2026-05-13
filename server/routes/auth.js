import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

const JWT_SECRET =
  process.env.JWT_SECRET ||
  'your-secret-key';

/* FAKE DATABASE */
const users = [];

/* REGISTER */
router.post(
  '/register',
  async (req, res) => {

    try {

      const {
        username,
        email,
        password,
      } = req.body;

      const existingUser =
        users.find(
          (user) =>
            user.email === email ||
            user.username === username
        );

      if (existingUser) {

        return res.status(400).json({
          message:
            'User already exists',
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      /* INITIAL USER */

      const newUser = {

        id: users.length + 1,

        username,

        email,

        password:
          hashedPassword,

        role: 'user',

        /* STARTING POINTS */

        points: 1200,
      };

      users.push(newUser);

      const token = jwt.sign(
        {
          userId: newUser.id,
        },
        JWT_SECRET,
        {
          expiresIn: '7d',
        }
      );

      res.status(201).json({

        token,

        user: {

          id: newUser.id,

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

      console.error(error);

      res.status(500).json({
        message:
          'Server error',
      });
    }
  }
);

/* LOGIN */

router.post(
  '/login',
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const user = users.find(
        (user) =>
          user.email === email
      );

      if (!user) {

        return res.status(400).json({
          message:
            'Invalid credentials',
        });
      }

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

      const token = jwt.sign(
        {
          userId: user.id,
        },
        JWT_SECRET,
        {
          expiresIn: '7d',
        }
      );

      res.json({

        token,

        user: {

          id: user.id,

          username:
            user.username,

          email:
            user.email,

          role:
            user.role,

          /* IMPORTANT */

          points:
            user.points || 1200,
        },
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          'Server error',
      });
    }
  }
);

export default router;