import { Router } from 'express';
import { authController, mecontroller, registerController } from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.route('/').post(authController)
authRouter.route('/register').post(registerController);
authRouter.route('/me').get(mecontroller)