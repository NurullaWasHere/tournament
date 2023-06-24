import { Router } from "express";
import {createContest, getContest, enrollToContest, getPay} from '../controllers/ContestController.js'
import { validateCreateContest } from "../validations/contestValidator.js";
import { pay } from "../controllers/ContestController.js";

const contestRouter = new Router();

contestRouter.post('/create',validateCreateContest,createContest)
contestRouter.get('/getContest',getContest)
contestRouter.post('/enroll', enrollToContest)

contestRouter.post('/payment', pay)
contestRouter.get('/getPay', getPay)


export default contestRouter;