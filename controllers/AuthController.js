import {User} from '../sequelize/models.js'
import jwt from 'jsonwebtoken';
import {sendEmail} from '../services/NodeMailer.service.js'
import { createUser } from '../services/Authorization.service.js';
import { verifyEmail } from '../services/Authorization.service.js';
import { validationResult } from 'express-validator';

export const login = async (req, res) => {
   try {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(200).json({message: 'Invalid login credentials', errors: errors.array()});
    }

    const {
      email,
      password,
    } = req.body;

    const user = await User.findOne({where: {email}});

    if(!user){
      return res.status(200).json({message: 'Invalid user credentials'});
    }
    if(user.password !== password){
      return res.status(200).json({message: 'Incorrect password', errors: [{msg: 'Incorrect password'}]});
    }

    const accessToken = jwt.sign({id: user.id}, process.env.SECRET_KEY || 'secret123', {expiresIn: '7d'});
    const refreshToken = jwt.sign({id: user.id}, process.env.SECRET_KEY || 'secret123', {expiresIn: '30d'});

    return res.status(200).json({message: 'User logged in', accessToken,refreshToken,user});
   } catch (error) {
      console.log(error);
   }
};

export const registration = async  (req, res) => {
    try {
        const errors = validationResult(req);
        const {email} = req.body
        if(!errors.isEmpty()){
          return res.status(200).json({message: 'Invalid registration credentials', errors: errors.array()});
        }

        const isExist = await User.findOne({where: {email}});
        if (isExist) {
          return res.status(200).json({message: 'User already exist'});
        }
        const code = verifyEmail(email);
        return res.status(200).json({message: 'Request code sent to email', code});
    } catch (error) {
      console.log(error);
    }
};

export const isVerified = async (req, res) => {
  try {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(200).json({message: 'Invalid isVerified credentials', errors: errors.array()});
    }

    const {verified} = req.body;
    if (!verified) {
      return res.status(200).json({message: 'Email not verified'});
    }
    const user = await createUser(req.body);
    return res.status(200).json({message: 'User created', user});
  } catch (error) {
    console.log(error)
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