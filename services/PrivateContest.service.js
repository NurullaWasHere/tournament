import { contest, participant,invitedUser, contestRequirements, contestExpense, User, team } from "../sequelize/models.js";
import { sendEmail } from './NodeMailer.service.js';


/**
 * @typedef {invitedUser} Contest
 * @property {number} id - user id
 * @property {number} contestId - contest id
 * 
 */

/**
 *  Invites user to contest
 * @param {number} userId 
 * @param {number} contestId 
 * @returns {Contest | Error} 
 */
export const inviteUser = async (userId, contestId) => {
  try {
    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if(!user){
      return {success: false, message: 'User not found'};
    }
    const isInvited = await invitedUser.findOne({
      where: {
        id: userId,
      }
    });  
    if(isInvited){
      return {success: false, message: 'User already invited'};
    }
    const invited = await invitedUser.create({
      id: userId,
      contestId
    });
    return invited;
  } catch (error) {
    console.log(error)
  }
};

export const createTeam = async ( teamData = [{}], contestId) => {
  try {
    const contestData = await contest.findOne({
      where: {
        id: contestId
      }
    });

    for (let j = 0; j < teamData.length; j++) {
      const newTeam = await team.create({
        name: teamData[j].name,
        contestId: contestId
      });
      const users = teamData[j].users;
      for (let i = 0; i < users.length; i++) {
          const newInvitedUser = await invitedUser.create({
            name: users[i].name,
            telegram: users[i].telegram
          });
          sendEmail(users[i].email, 'Приглашение в команду', `Вы были приглашены в команду ${newTeam.name} в соревновании ${contestData.name}`)
          await newTeam.addInvited_user(newInvitedUser);       
      }
    }
    return true;
  } catch (error) {
    console.log(error)
  }
}