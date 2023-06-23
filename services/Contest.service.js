import {contest, contestRequirements, location, overView} from '../sequelize/models.js'
import {createLocation, getLocation} from './Location.service.js'
import QRCode from 'qrcode';

export const createNewContest = async (contestData, contestRequirements, contestLocation) => {
  try {
      const newLocation = await createLocation(contestLocation);
      const newRecuirements = await verifyRequirements(contestRequirements);
      const {expectedId} = contest.build({
        name: contestData.name || 'newcontest',
      })
      const newContest = await contest.create({
        ...contestData,
        qrcode: createQrCode(expectedId),
      });
      await newContest.addLocation(newLocation);
      await newContest.addСontestInfo(newRecuirements);
      return newContest;
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


const createQrCode = async (contestId) => {
    const qrcode = QRCode.toString(String(contestId), {
      type: 'svg',
      errorCorrectionLevel: 'H'
    })
    return qrcode;
};