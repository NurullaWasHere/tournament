import { Router } from "express";
import {registration, login, getUser} from '../controllers/AuthController.js'


const api = new Router();

api.post('/registration', registration);
api.post('/login', login);
api.get('/user/:id', getUser);

export default api;

