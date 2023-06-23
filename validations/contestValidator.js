import { check } from "express-validator";

export const validateCreateContest = [
  check("contestData.name").isLength({min: 2, max: 50}).withMessage('Contest name must be longer than 2 and shorter than 50'),
  check("contestData.visibility").isLength({min: 4, max: 15}).withMessage('Contest visibility must be longer than 2 and shorter than 50'),
  check("contestData.organizerId").exists().withMessage('Contest organizerId is required'),
  check("contestData.startDate").exists().withMessage('Contest start date must be exist'),
  check("contestData.endDate").exists().withMessage('Contest end date must be exist'),
  check("contestData.qrCode").exists().withMessage('Contest qrCode must be exist'),

  check("contestRequirements.participation").isLength({min: 4, max: 15}).withMessage('Contest participation must be longer than 4 and shorter than 15'),
  check("contestRequirements.minAge").isNumeric().withMessage('Contest minAge must be number'),
  check("contestRequirements.maxAge").isNumeric().withMessage('Contest maxAge must be number'),
  check("contestRequirements.participantsLimit").isNumeric().withMessage('Contest participantsLimit must be number'),
  check("contestRequirements.fee").isNumeric().withMessage('Contest fee must be number'),
  check("contestRequirements.gender").isLength({min: 2, max: 15}).withMessage('Contest gender must be longer than 4 and shorter than 15'),

  check("contestLocation.country").isLength({min: 2, max: 50}).withMessage('Contest country must be longer than 2 and shorter than 50'),
  check("contestLocation.city").isLength({min: 2, max: 50}).withMessage('Contest city must be longer than 2 and shorter than 50'),
  check("contestLocation.address").isLength({min: 2, max: 50}).withMessage('Contest address must be longer than 2 and shorter than 50'),
  check("contestLocation.latitude").isString().withMessage('Contest latitude must be string'),
  check("contestLocation.longitude").isString().withMessage('Contest longitude must be string'),
]