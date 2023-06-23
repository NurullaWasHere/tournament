import { Router } from "express";
import authRouter from './authRouter.js';
import categoryRouter from "./categoryRouter.js";
import contestRouter from "./contestRouter.js";

const api = new Router();

api.use('/auth', authRouter);
api.use('/category', categoryRouter)
api.use('/contest', contestRouter)

export default api;

