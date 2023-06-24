import {contest, contestRequirements, location, overView, User} from '../sequelize/models.js'
import { createNewContest, addParticipantToContest } from '../services/Contest.service.js';
import { createExpense, getTotalPrice,} from '../services/ContestExpense.service.js';


export const createContest = async (req, res) => {
  try {
      const {
        contestData,
        contestRequirement,
        contestLocation,
        Expenses
      } = req.body;

      const newContest = await createNewContest(contestData, contestRequirement, contestLocation, Expenses);

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
    const {contestId, categoryId} = req.query;
    if(!categoryId && !contestId){
      const contests = await contest.findAll();
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
      return res.status(200).json({
        success: true,
        contestData,
        totalPrice
      });
    }
    if(categoryId){
      const contests = await contest.findAll({
        where: {
          categoryId
        }
      });
      const totalPrice = await getTotalPrice(contestId);
      return res.status(200).json({
        success: true,
        contests,
        totalPrice
      });
    }
  } catch (error) {
    console.log(error)
  }
};

export const enrollToContest = async ( req, res ) => {
    try {
      const {contestId, opts} = req.body;
      const userId = req.user.id;
      const res = await addParticipantToContest(userId, contestId, opts);
      if(!res){
        return res.status(200).json({
          success: false,
          message: 'Something went wrong with enrolling'
        });
      }
      return res.status(200).json({
        success: res
      });
    } catch (error) {
      console.log(error)
    }
}

export const updateContest = async (req, res) => {

};

export const deleteContest = async (req, res) => {

};

