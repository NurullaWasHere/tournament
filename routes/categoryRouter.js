import { Router } from "express";
import { category } from '../sequelize/models.js';

const categoryRouter = new Router();

categoryRouter.get('/getAll', async (req,res) => {
  try {
    const categories = await category.findAll()
    return res.status(200).json({
      success: true,
      categories
    })
  } catch (error) {
    console.log(error)
  }
})

export default category;