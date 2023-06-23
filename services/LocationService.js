import {location} from '../sequelize/models'

export const createLocation = async (locationData) => {
    try{
      const {latitude, longitude, address, city} = locationData;
      const LocationData = await location.findOne({
        where: {
          address,
          city,
          country: 'Kazakhstan'
        }
      });
      if(LocationData){
        return LocationData;
      }
      const newLocation = await location.create({
        latitude,
        longitude,
        address,
        city,
        country: 'Kazakhstan'
      });
      return newLocation;
    }catch{
      console.log(error)
    }
}

export const getLocation = async (locationId) => {
  try{
    const LocationData = await location.findOne({
      where: {
        id: locationId
      }
    });

    if(!LocationData){
      return false;
    }
    return LocationData;
  }
  catch(error){
    console.log(error)
  }
}