import {contest, contestRequirements, location, overView} from '../sequelize/models.js'
import { createNewContest } from '../services/Contest.service.js';


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

  } catch (error) {
    console.log(error)
  }
};

export const updateContest = async (req, res) => {

};

export const deleteContest = async (req, res) => {

};

