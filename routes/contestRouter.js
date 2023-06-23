import { Router } from "express";
import {createContest, getContest, updateContest, deleteContest, createNewExpenses} from '../controllers/ContestController.js'
import { validateCreateContest } from "../validations/contestValidator.js";

const contestRouter = new Router();

contestRouter.post('/create',validateCreateContest,createContest)
contestRouter.get('/getContest',getContest)
contestRouter.post('/createExpenses', createNewExpenses)


export default contestRouter;