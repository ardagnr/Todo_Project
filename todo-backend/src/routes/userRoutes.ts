import { Router } from 'express';
import UserController from '../controllers/user';

const userController = new UserController

const router = Router();

router.post('/register', userController.register);

router.post('/login', userController.login);

export default router;
