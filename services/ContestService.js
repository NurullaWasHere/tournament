import {contest, contestRequirements, location, overView} from '../sequelize/models.js'
import {createLocation, getLocation} from './LocationService.js'

const createNewContest = async (contestData, contestRequirements, contestLocation) => {
  try {
      const newLocation = await createLocation(contestLocation);
      const {locationId} = newLocation;


  } catch (error) {
    console.log(  error ) 
  }
}; 

const createQrCode = async (contestId) => {
  
};