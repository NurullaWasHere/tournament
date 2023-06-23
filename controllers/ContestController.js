import {contest, contestRequirements, location, overView} from '../sequelize/models.js'
import { createNewContest } from '../services/Contest.service.js';


export const createContest = async (req, res) => {
  try {
      const {
        contestData,
        contestRequirements,
        contestLocation
      } = req.body;

      const newContest = await createNewContest(contestData, contestRequirements, contestLocation);

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

