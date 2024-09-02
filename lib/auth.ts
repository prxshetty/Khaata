import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
interface AuthenticatedRequest extends NextApiRequest {
    user?: any;
  }
export function authenticateToken(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
  
      if (token == null) return res.status(401).json({ message: 'Unauthorized' });
  
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        (req as AuthenticatedRequest).user = user;
        await handler(req, res);
      } catch (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
    };
  }