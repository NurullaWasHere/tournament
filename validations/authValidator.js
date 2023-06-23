import {check} from 'express-validator'


export const registerValidation = [
  check('email', 'Please, provide valid email').isEmail(),
  check('password', 'Password must be longer than 4 and shorter than 10').isLength({min: 4, max: 15}),
  check('firstname', 'Firstname must be longer than 2 and shorter than 15').isLength({min: 2, max: 15}),
  check('lastname', 'Lastname must be longer than 2 and shorter than 15').isLength({min: 2, max: 15}),
  check('phone', 'Please, provide valid phone number').isMobilePhone(),
  check('age', 'Please, provide number for age').isNumeric(),
];

export const loginValidation = [
  check('email', 'Please, provide valid email').isEmail(),
  check('password', 'Password must be longer than 4 and shorter than 10').isLength({min: 4, max: 15}),
];

export const validateIsVerified = [
  check('verified', 'Please, provide only boolean').isBoolean().exists()
];
