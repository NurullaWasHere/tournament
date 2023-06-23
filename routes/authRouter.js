import { Router } from "express";
import {registration, login, getUser, deleteUser, isVerified} from '../controllers/AuthController.js'

const authRouter = new Router();

authRouter.get('/user/:id', getUser);
authRouter.post('/registration', registration);
authRouter.post('/login', login);
authRouter.post('/registration/verified', isVerified);

export default authRouter;