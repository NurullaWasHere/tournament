import {contest, contestRequirements, location, overView} from '../sequelize/models.js'
import {createLocation, getLocation} from './Location.service.js'
import QRCode from 'qrcode';

export const createNewContest = async (contestData, requiremenets, contestLocation) => {
  try {
      const isExistingContest = await contest.findOne({
        where: {
          name: contestData.name
        }
      });
      if(isExistingContest){
        return false;
      }
      const newLocation = await createLocation(contestLocation);
      const newRecuirements = await verifyRequirements(requiremenets);
      const newQrCode = await createQrCode(expectedId);
      const newContest = await contest.create({
        ...contestData,
        qrCode: newQrCode,
      });
      await newContest.addLocation(newLocation);
      await newContest.addContestInfo(newRecuirements);
      return newContest;
  } catch (error) {
    console.log(  error ) 
  }
}; 

export const verifyRequirements = async (requirements) => {
  try {
    const {
      mode,
      participation,
      gender,
      minAge,
      maxAge,
      participantsLimit,
      fee
    } = requirements;
  
    const existingRequirement = await contestRequirements.findOne({
      where: {
        participation,
        gender,
        minAge,
        maxAge,
        participantsLimit,
        fee
      }
    });
    if(existingRequirement){
      return existingRequirement;
    }
  
    const newRequirements = await contestRequirements.create({
      participation,
      mode,
      gender,
      minAge,
      maxAge,
      participantsLimit,
      fee
    });
  
    return newRequirements;
  } catch (error) {
    console.log(error)
  }
};

export const getContest = async (contestId) => {
  try {
    const contestData = await contest.findOne({
      where: {
        id: contestId
      },
      include: [
        {
          model: location,
          as: 'location'
        },
        {
          model: contestRequirements,
          as: 'contestRequirements'
        },
        {
          model: overView,
          as: 'overView'
        }
      ]
    });
    if(!contestData){
      return false;
    }
    return contestData;
  } catch (error) {
    console.log(error)
  }
};

const createQrCode = async (request) => {
    const qrcode = await QRCode.toString(String("http://localhost:5173/login"), {
      type: 'svg',
      errorCorrectionLevel: 'H'
    })
    return qrcode;
};