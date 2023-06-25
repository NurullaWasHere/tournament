import { messageModel, User } from "../sequelize/models";

export const onSendMessage = async (msg, userId, contestId) => {
  try{
    const user = await User.findOne({
      where: {
        id: userId
      }
    });  
    const fullname = user.firstName + ' ' + user.lastName;
    const message = await messageModel.create({
      text: msg,
      userId: userId,
      contestId,
      userName: fullname
    });
    return msg;
  }
  catch(error){
    console.log(error)
  }
}
