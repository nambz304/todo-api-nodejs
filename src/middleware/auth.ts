import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  username: string;
  role: 'admin' | 'user' | 'guest';
}

declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}

// ===== AUTHENTICATION MIDDLEWARE =====
export function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Extract token from Authorization header: "Bearer <token>"
    console.log('--------------authenticationMiddleware');
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload; //check - tại sao phải ép kiểu

    // Attach user payload to request
    req.user = decoded as any;

    return next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}



export function authorizationMiddleware(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('--------------authorizationMiddleware');
      if (!req.user) {
        console.log("-------------1");
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const userRole = (req.user as any).role;

      if (!roles.includes(userRole)) {
        return res.status(403).json({ 
          message: `Access denied. Required roles: ${roles.join(', ')}` 
        });
      }
        console.log("-------------2");
      return next();
    } catch (error) {
      console.error('Authorization error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
}

