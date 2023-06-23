import {User} from '../sequelize/models.js'
import { sign } from 'jsonwebtoken';

export const login = async (req, res) => {
   try {
    const {
      email,
      password,
    } = req.body;

    const user = await User.findOne({where: {email}});

    if(!user){
      return res.status(200).json({message: 'Invalid user credentials'});
    }
    if(user.password !== password){
      return res.status(200).json({message: 'Incorrect password'});
    }

    const accessToken = sign({id: user.id}, process.env.SECRET_KEY || 'secret123', {expiresIn: '7d'});
    const refreshToken = sign({id: user.id}, process.env.SECRET_KEY || 'secret123', {expiresIn: '30d'});

    return res.status(200).json({message: 'User logged in', accessToken,refreshToken,user});
   } catch (error) {
      console.log(error);
   }
};


export const registration =async  (req, res) => {
    try {
        const {
          firstname,
          lastname,
          email,
          password,
          phone,
          age,
          avatar,
          role,
        } = req.body;

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
        return res.status(200).json({message: 'User created', user});
    } catch (error) {
      console.log(error);

    }
};

export const getUser = async (req, res) => {
  try {
      const {
        id,
      } = req.params;

      const user = await User.findOne({where: {id}});

      if(!user){
        return res.status(200).json({message: 'User not found'});
      }

      return res.status(200).json({message: 'Successfull', user});
  } catch (error) { 
      console.log(error);
  }
};


export const deleteUser = async (req, res) => {
  try {
    const {id} = req.body;

    const isExist = await User.findOne({where: {id}});
    if (!isExist) {
      return res.status(200).json({message: 'User not found'});
    }
    const user = await User.update({deleted: true}, {where: {id}});
  } catch (error) {
    console.log(error);
  } 
};
