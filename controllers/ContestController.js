import {contest, contestRequirements, location, contestExpense, team, paymentDetails, participant} from '../sequelize/models.js'
import { createNewContest, addParticipantToContest } from '../services/Contest.service.js';
import { getAllExpenses, getTotalPrice,} from '../services/ContestExpense.service.js';
import { createUniqueUUID } from '../services/Contest.service.js';
import { createPaymentDetails, makePayment } from '../services/Payment.service.js';
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
    const {contestId, categoryId, key, organizerId} = req.query;
    if(!categoryId && !contestId && !key && !organizerId){
      const contests = await contest.findAll({
        where: {
          visibility: 'public'
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
          },
          {
            model: participant,
            as: 'participants'
          }
        ]
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
          },
          {
            model: participant,
            as: 'participants'
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
    if(organizerId){
      const contests = await contest.findAll({
        where: {
          organizerId
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
          },
          {
            model: participant,
            as: 'participants'
          }
        ]
      });
      return res.status(200).json({
        success: true,
        contests
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
        contests
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
    const {value} = req.body;    
    const key = createUniqueUUID(Math.random());
    const makePaymentResult = await makePayment(key, {value, currency: 'RUB'});

    await createPaymentDetails( req.body.userId, req.body.contestId, makePaymentResult.id)

    const participantResult = await addParticipantToContest(req.body.userId, req.body.contestId, {description: 'Оплачено'})
    console.log(participantResult);
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

export const isPaid = async (req,res) => {
  try {
    const {userId, contestId} = req.body;

    const detailsOfUserPayment = await paymentDetails.findAll({
      where: {
        sender_id: userId,
        contestId
      }
    });
    console.log(detailsOfUserPayment);
    if(detailsOfUserPayment.length === 0){
      return res.status(200).json({
        success: false,
        message: 'Payment details not found'
      });
    }
    const payment = await getPayment(detailsOfUserPayment[0].dataValues.payment_id);
    console.log(payment);
    if(payment.status === 'waiting_for_capture'){
      return res.status(200).json({
        success: true,
        payment
      });
    }

    return res.status(200).json({
      success: false,
      message: 'Payment not succeeded'
    });
  } catch (error) {
    console.log(error)
  }
}

export const payout = (bank_card) => {

};