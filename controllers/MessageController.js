import { messageModel } from "../sequelize/models.js";


export const getMessages = async (req,res) => {
  try {
    const {contestId} = req.query;
    const messages = await messageModel.findAll({
      where: {
        contestId
      },
      order: [
        ['createdAt', 'ASC']
      ]
    })
    return res.status(200).json({
      success: true,
      messages
    })
  } catch (error) {
    console.log(error)
  }
}