import {contest, contestRequirements, location, overView, User} from '../sequelize/models.js'
import { createNewContest } from '../services/Contest.service.js';
import { createExpense, getTotalPrice} from '../services/ContestExpense.service.js';


export const createContest = async (req, res) => {
  try {
      const {
        contestData,
        contestRequirement,
        contestLocation
      } = req.body;

      const newContest = await createNewContest(contestData, contestRequirement, contestLocation);

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

export const enrollContest = async (req, res) => {
  const id = req.user.id;
  const {contestId} = req.body;
  try {
    const user = await User.findOne({
      where: {
        id
      }
    });
    const contestData = await contest.findOne({
      where: {
        id: contestId
      }
    });
    if(user.hasContest(contestData)){
      return res.status(200).json({
        success: false,
        message: 'You already have this contest'
      });
    }
    await user.addContest(contestData);
    return res.status(200).json({
      success: true,
      message: 'You have successfully enrolled in this contest'
    });
  } catch (error) {
    
  }
};

export const createNewExpenses = async (req,res) => {
  try {
    const {expenses} = req.body
    if(typeof expenses !== 'array'){
      return res.status(200).json({
        success: false,
        message: 'Expenses should be in array type'
      });
    }
    for (let i = 0; i < expenses.length; i++) {
      const el = expenses[i];
      await createExpense(el);
    }
    return res.status(200).json({
      success: true,
      message: 'Expenses created successfully',
      expenses
    });
  } catch (error) {
    console.log(error)
  }
}

export const updateContest = async (req, res) => {

};

export const deleteContest = async (req, res) => {

};

