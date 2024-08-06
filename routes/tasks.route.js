import { Router } from 'express';
import { signUpTasker } from "../controllers/tasks.controllers.js"

export const taskerRouter = Router();


// Tasker Sign-Up Route
taskerRouter.post('/tasker/signup', signUpTasker);

