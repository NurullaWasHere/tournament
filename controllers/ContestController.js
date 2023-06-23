import {contest, contestRequirements, location, overView} from '../sequelize/models.js'


const createContest = async (req, res) => {
  try {
      const {
        contestData,
        contestRequirements,
        contestLocation
      } = req.body;

      const {latitude, longitude, address, city} = contestLocation;
      
      const LocationData = await location.findOne({
        where: {
          address,
          city,
          country: 'Kazakhstan'
        }
      });

  } catch (error) {
    console.log(error)
  }
};

const getContest = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error)
  }
};

const updateContest = async (req, res) => {

};

const deleteContest = async (req, res) => {

};

