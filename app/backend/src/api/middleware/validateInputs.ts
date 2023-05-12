import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import validateLoginSchema from './joi';

const SECRET_KEY = process.env.JWT_SECRET || 'jwt_secret';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  const { error } = validateLoginSchema({ email, password });
  if (error) return res.status(401).json({ message: 'Invalid email or password' });
  next();
};

const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token === undefined) return res.status(401).json({ message: 'Token not found' });
  try {
    const decode = jwt.verify(token, SECRET_KEY);
    req.body.currentUser = decode;
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export { validateLogin, validateTokenMiddleware };
