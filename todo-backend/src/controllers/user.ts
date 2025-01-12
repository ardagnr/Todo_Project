import { Request, Response } from 'express';
import { registerUser, loginUser } from '../business-logic/user';
import { RequestHandler } from 'express';

// User registration
export const register = async (req: Request, res: Response) => {
  const { name, surName, password } = req.body;

  try {
    const user = await registerUser(name, surName, password);
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Error registering user' });
  }
};

// User login
export const login: RequestHandler = async (req, res) => {
  const { name, password } = req.body;

  try {
    const { token } = await loginUser(name, password);
    res.json({ token });
  } catch (err: any) {
    res.status(400).json({ message: err.message || 'Invalid credentials' });
  }
};
