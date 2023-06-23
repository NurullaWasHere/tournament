import { Router } from "express";
import {createContest, getContest, updateContest, deleteContest} from '../controllers/ContestController.js'
import { validateCreateContest } from "../validations/contestValidator.js";

const contestRouter = new Router();

contestRouter.post('/create',validateCreateContest,createContest)

export default contestRouter;