import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET =
  process.env.JWT_SECRET ||
  'supersecret';

const authMiddleware = async (
  req,
  res,
  next
) => {
  try {
    const token =
      req.headers.authorization?.split(
        ' '
      )[1];

    if (!token) {
      return res.status(401).json({
        message: 'No token',
      });
    }

    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    const user = await User.findById(
      decoded.userId
    );

    if (!user) {
      return res.status(401).json({
        message: 'User not found',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid token',
    });
  }
};

export default authMiddleware;