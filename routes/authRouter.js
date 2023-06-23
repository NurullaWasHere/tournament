import { Router } from "express";
import {registration, login, getUser, deleteUser, isVerified} from '../controllers/AuthController.js'
import {validateIsVerified, loginValidation, registerValidation} from '../validations/authValidator.js'

const authRouter = new Router();

authRouter.get('/getUser/:id', getUser);
authRouter.post('/registration',registerValidation,registration);
authRouter.post('/login',loginValidation,login);
authRouter.post('/registration/verified',validateIsVerified,isVerified);

export default authRouter;