import { Router } from 'express'
import { userLogin, userSignin } from '../controller/user.controller.js';
const userRouter = Router();

userRouter.post('/signIn', userSignin);
userRouter.post('/logIn', userLogin);

export default userRouter;