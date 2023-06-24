import {contest, contestRequirements, location, overView, User, participant} from '../sequelize/models.js'
import {createLocation, getLocation} from './Location.service.js'
import { createExpense } from './ContestExpense.service.js';
import QRCode from 'qrcode';

export const createNewContest = async (contestData, requiremenets, contestLocation, expenses) => {
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
      const expectedId = await contest.count() + 1;
      const newQrCode = await createQrCode(String(expectedId));
      const newContest = await contest.create({
        ...contestData,
        qrCode: newQrCode,
      });
      await newContest.addLocation(newLocation);
      await newContest.addContestInfo(newRecuirements);

      for (let i = 0; i < expenses.length; i++) {
        const el = expenses[i];
        const newExpesne = await createExpense(el);
        await newContest.addContestExpenses(newExpesne);
      }
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

const createQrCode = async (contestId) => {
    let qrcode = await QRCode.toString(String(`http://localhost:5173/contest/approve?contestId=${contestId}`), {
      type: 'svg',
      errorCorrectionLevel: 'H'
    })
    qrcode = qrcode.replace(/"/g, "'");
    return qrcode;
};

export const addParticipantToContest = async (userId, contestId, opts) => {
  try {
      if(!userId || !contestId){
        return false;
      }
      const user = await User.findOne({
        where: {
          id: userId
        }
      })
      const contestData = await contest.findOne({
        where: {
          id: contestId
        }
      });





      const participant = await participant.create({
        id: userId,
        fullname: user.firstname + ' ' + user.lastname,
        description: opts.description || 'Участник',
        play_number: String(opts.play_number) || 'Не определен',
      })
      await contestData.addParticipant(participant).then( () => {
        return true;
      }).catch( () => {
        return false;
      });
  } catch (error) { 
    console.log(error)
  }
}