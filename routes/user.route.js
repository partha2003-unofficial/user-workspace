import { Router } from 'express'
import { userLogin, userSignUp } from '../controller/user.controller.js';
import { auth_user } from '../middleware/auth.middleware.js';
const userRouter = Router();

userRouter.post('/signUp', userSignUp);
userRouter.post('/logIn', auth_user, userLogin);

export default userRouter;