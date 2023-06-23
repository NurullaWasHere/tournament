import { Router } from "express";
import authRouter from './authRouter.js';

const api = new Router();

api.use('/auth', authRouter);

export default api;

