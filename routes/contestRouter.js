import { Router } from "express";
import {createContest, getContest, deleteContest, getPay, isPaid} from '../controllers/ContestController.js'
import { validateCreateContest } from "../validations/contestValidator.js";
import { pay } from "../controllers/ContestController.js";
import { getMessages } from "../controllers/MessageController.js";

const contestRouter = new Router();

contestRouter.post('/create',validateCreateContest,createContest)
contestRouter.get('/getContest',getContest)
// contestRouter.post('/enroll', enrollToContest)

contestRouter.post('/payment', pay)
contestRouter.get('/getPay', getPay)
contestRouter.post('/paymentDetails', isPaid)
contestRouter.post('/deleteContest', deleteContest)


contestRouter.get('/message', getMessages);

export default contestRouter;