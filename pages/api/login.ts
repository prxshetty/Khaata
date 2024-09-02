import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      
      if (result.rows.length > 0) {
        const user = result.rows[0];
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
          res.status(200).json({ token });
        } else {
          res.status(400).json({ message: 'Invalid credentials' });
        }
      } else {
        res.status(400).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}