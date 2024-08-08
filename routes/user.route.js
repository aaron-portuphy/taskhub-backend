import { Router } from 'express';
import { loginUser, signUpUser } from '../controllers/user.controllers.js';

export const userRouter = Router();

// User Sign-Up Route
userRouter.post('/signup', signUpUser);
userRouter.post('/login', loginUser);
