import {contest, contestRequirements, location, contestExpense, team} from '../sequelize/models.js'
import { createNewContest, addParticipantToContest } from '../services/Contest.service.js';
import { getAllExpenses, getTotalPrice,} from '../services/ContestExpense.service.js';
import { createUniqueUUID } from '../services/Contest.service.js';
import { makePayment } from '../services/Payment.service.js';
import { getPayment } from '../services/Payment.service.js';


export const createContest = async (req, res) => {
  try {
      const {
        contestData,
        contestRequirement,
        contestLocation,
        Expenses,
        teams
      } = req.body;

      const newContest = await createNewContest(contestData, contestRequirement, contestLocation, Expenses,teams);

      if(!newContest){
        return res.status(200).json({
          success: false,
          message: 'Contest with this name already exists'
        });
      }

      return res.status(200).json({
        success: true,
        newContest
      });
  } catch (error) {
    console.log(error)
  }
};

export const getContest = async (req, res) => {
  try {
    const {contestId, categoryId, key} = req.query;
    if(!categoryId && !contestId && !key){
      const contests = await contest.findAll({
        where: {
          visibility: 'public'
        }
      });
      return res.status(200).json({
        success: true,
        contests
      });
    }
    if(contestId){
      const contestData = await contest.findOne({
        where: {
          id: contestId
        },
        include: [
          {
            model: location,
            as: 'locations'
          },
          {
            model: contestRequirements,
            as: 'contestInfos'
          },
          {
            model: team,
            as: 'teams'
          },
          {
            model: contestExpense,
            as: 'contestExpenses'
          }
        ]
      });
      if(!contestData){
        return res.status(200).json({
          success: false,
          message: 'Contest not found'
        });
      }
      const totalPrice = await getTotalPrice(contestId);
      const allExpenses = await getAllExpenses(contestId);
      return res.status(200).json({
        success: true,
        contestData,
        totalPrice,
        allExpenses
      });
    }
    if(categoryId){
      const contests = await contest.findAll({
        where: {
          categoryId
        }
      });
      return res.status(200).json({
        success: true,
        contests,
        totalPrice
      });
    }
    if(key){
      const contest1 = await contest.findOne({
        where: {
          key
        },
        include: [
          {
            model: location,
            as: 'locations'
          },
          {
            model: contestRequirements,
            as: 'contestInfos'
          },
          {
            model: team,
            as: 'teams'
          },
          {
            model: contestExpense,
            as: 'contestExpenses'
          }
        ]
      });
      const totalPrice = await getTotalPrice(contest1.id);
      return res.status(200).json({
        success: true,
        contest1,
        totalPrice
      });
    }
  } catch (error) {
    console.log(error)
  }
};

export const enrollToContest = async ( req, res ) => {
    try {
      const {contestId, userId,opts} = req.body;
      const result = await addParticipantToContest(userId, contestId, opts);
      return res.status(200).json({
        success: result
      });
    } catch (error) {
      console.log(error)
    }
}

export const updateContest = async (req, res) => {

};

export const deleteContest = async (req, res) => {

};

export const pay = async (req,res) => {
  try {
    const {value, currency} = req.body;    
    const key = createUniqueUUID(Math.random());
    const makePaymentResult = await makePayment(key, {value: value, currency: currency});
    return res.status(200).json({
      success: true,
      makePaymentResult
    });
  } catch (error) {
    console.log(error)
  }
}

export const getPay = async (req, res) => {
  try {
    const {paymentId} = req.query;
    const payment = await getPayment(paymentId);
    return res.status(200).json({
      payment
    });
  } catch (error) {
    console.log(error)
  }
};