import { Request, Response, NextFunction } from 'express';
import { jwtUtil, JwtPayload } from '../utils/jwt.util';

// Extend Express Request interface to include the user payload
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token is missing or invalid',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwtUtil.verifyAccessToken(token);
    req.user = payload; // Attach payload to request
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token expired or invalid',
    });
  }
};
