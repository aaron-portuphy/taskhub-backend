import { Router } from 'express';
import { loginTasker, signUpTasker } from "../controllers/tasker.controllers.js"

export const taskerRouter = Router();


// Tasker Sign-Up Route
taskerRouter.post('/signup', signUpTasker);
taskerRouter.post('/login', loginTasker);

