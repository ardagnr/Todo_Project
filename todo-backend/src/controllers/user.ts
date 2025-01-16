import { Request, Response } from 'express';
import UserService from '../business-logic/user';
import exp from 'constants';

const userService = new UserService;

class UserController{
  // User registration
  async register (req: Request, res: Response) {
    const { name, surName, password } = req.body;

    try {
      const user = await userService.registerUser(name, surName, password);
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (err: any) {
      res.status(500).json({ message: err.message || 'Error registering user' });
    }
  };

  // User login
  async login(req: Request, res: Response){
    const { name, password } = req.body;

    try {
      const { token } = await userService.loginUser(name, password);
      res.json({ token });
    } catch (err: any) {
      res.status(400).json({ message: err.message || 'Invalid credentials' });
    }
  };  
}

export default UserController;

