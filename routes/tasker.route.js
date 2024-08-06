import { Router } from 'express';
import { signUpTasker } from "../controllers/tasker.controllers.js"

export const taskerRouter = Router();


// Tasker Sign-Up Route
taskerRouter.post('/signup', signUpTasker);

