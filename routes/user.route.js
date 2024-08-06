import { Router } from 'express';
import { signUpUser } from "../controllers/user.controllers.js"

export const userRouter = Router();


// User Sign-Up Route
userRouter.post('/user/signup', signUpUser);