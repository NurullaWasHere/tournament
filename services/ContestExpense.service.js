import { contestExpense } from "../sequelize/models";


export const createExpense = async (expenseData) => {
  try {
    const newExpense = await contestExpense.create({
      ...expenseData
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
        [sequelize.fn('sum', sequelize.literal('price * amount')), 'totalExpense']
      ],
      where: { contestId: contestId },
      group: ['contestId']
    });
    return result;
  } catch (error) {
    console.log(error)
  }
};