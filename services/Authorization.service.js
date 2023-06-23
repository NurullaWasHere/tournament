import {User} from '../sequelize/models.js'
import { sendEmail } from './NodeMailer.service.js';

export const createUser = async (userDto) => {
  try{
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      age,
      avatar,
      role,
    } = userDto;

    const isExist = await User.findOne({where: {email}});
    if (isExist) {
      return res.status(200).json({message: 'User already exist'});
    }

    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      phone: phone || null,
      age: age,
      avatar: avatar || '',
      role: role || 'USER',
    });

    return user;
  }catch(error){
    console.log(error)
  }
};  

export const verifyEmail = (email) => {
    const code = generateUniqueCode();
    sendEmail(email, code);
    return code;
};

function generateUniqueCode() {
  return Math.floor(100000 + Math.random() * 900000);
}