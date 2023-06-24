import { contestExpense } from "../sequelize/models.js";
import { literal , fn} from "sequelize";

export const createExpense = async (expenseData) => {
  try {
    const newExpense = await contestExpense.create({
      name: expenseData.name,
      price: expenseData.price,
      amount: expenseData.amount,
    });
    return newExpense;
  } catch (error) {
    console.log(error)
  }
};


export const getTotalPrice = async (contestId) => {
  try {
    const result = await contestExpense.findAll({
      attributes: [
        'contestId',
        [fn('sum', literal('price * amount')), 'totalExpense']
      ],
      where: { contestId: contestId },
      group: ['contestId']
    });
    return result;
  } catch (error) {
    console.log(error)
  }
};