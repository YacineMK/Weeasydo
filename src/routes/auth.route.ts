import { Router } from 'express';
import { authController, registerController } from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.route('/').post(authController)
authRouter.route('/register').post(registerController);