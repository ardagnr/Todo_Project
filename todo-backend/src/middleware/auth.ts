import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

class AuthMiddleware {
  // User authentication method
  static authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Token required' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey') as jwt.JwtPayload;
      req.user = { id: decoded.userId, name: decoded.name };
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }
}

export default AuthMiddleware;
