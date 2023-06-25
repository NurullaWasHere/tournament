import {contest, contestRequirements, location, paymentDetails, User, participant} from '../sequelize/models.js'
import {createLocation, getLocation} from './Location.service.js'
import { createExpense } from './ContestExpense.service.js';
import QRCode from 'qrcode';
import { createTeam } from './PrivateContest.service.js';
import { v5 } from 'uuid';

export const createNewContest = async (contestData, requiremenets, contestLocation, expenses, teams) => {
  try {
      const isExistingContest = await contest.findOne({
        where: {
          name: contestData.name
        }
      });
      const expectedId = await contest.count() + 1;
      const key = createUniqueUUID(expectedId);

      if(isExistingContest){
        return false;
      }
      const newLocation = await createLocation(contestLocation);
      const newRecuirements = await verifyRequirements(requiremenets);
      const newQrCode = await createQrCode(String(expectedId));
      const newContest = await contest.create({
        ...contestData,
        qrCode: newQrCode,
        key
      });
      
      await newContest.addLocation(newLocation);
      await newContest.addContestInfo(newRecuirements);
      if(newContest.visibility === 'private'){
        await createTeam(teams, newContest.id);
      }
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

export const addParticipantToContest = async (userId, contestId, opts = {description: '', play_number: 0}) => {
  try {
      if(!userId || !contestId){
        return {success: false, message: 'User or contest not found'};
      }
      const user = await User.findOne({
        where: {
          id: userId
        }
      })
      if(!user){
        return {success: false, message: 'User not found'};
      }
      const contestData = await contest.findOne({
        where: {
          id: contestId
        }
      });
      const newParticipant = await participant.create({
        id: userId,
        fullname: user.firstname + ' ' + user.lastname,
        description: opts.description || 'Участник',
        play_number: String(opts.play_number) || 'Не определен',
      })
      await contestData.addParticipant(newParticipant).then( () => {
        return {success: true};
      }).catch( (err) => {
        return {success: false, message: err};
      });
      return {success: true};
  } catch (error) { 
    console.log(error)
  }
}

export const createUniqueUUID = (id) => {
  const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
  const uuidV5 = v5(String(id), MY_NAMESPACE)
  return uuidV5;
}