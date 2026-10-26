import { Router } from 'express'
import { userLogin, userSignin } from '../controller/user.controller.js';
import { auth_user } from '../middleware/auth.middleware.js';
const userRouter = Router();

userRouter.post('/signIn', userSignin);
userRouter.post('/logIn', auth_user, userLogin);

export default userRouter;