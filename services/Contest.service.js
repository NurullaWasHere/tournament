import {contest, contestRequirements, location, overView} from '../sequelize/models.js'
import {createLocation, getLocation} from './Location.service.js'
import { QRCode } from 'qrcode';

export const createNewContest = async (contestData, contestRequirements, contestLocation) => {
  try {
      const newLocation = await createLocation(contestLocation);
      const {locationId} = newLocation;


  } catch (error) {
    console.log(  error ) 
  }
}; 

export const verifyRequirements = async (contestRequirements) => {
  try {
    const {
      mode,
      participation,
      gender,
      minAge,
      maxAge,
      participantsLimit,
      fee
    } = contestRequirements;
  
    const requirements = await contestRequirements.findOne({
      where: {
        participation,
        gender,
        minAge,
        maxAge,
        participantsLimit,
        fee
      }
    });
    if(requirements){
      return requirements;
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

const createQrCode = async (contestId) => {
  
};