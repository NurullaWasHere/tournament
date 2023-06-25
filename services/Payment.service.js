import { YooCheckout } from "@a2seven/yoo-checkout";
import { paymentDetails, contest } from "../sequelize/models.js";

const checkout = new YooCheckout({
    shopId: '223714',
    secretKey: 'test_ytP7XscPJhEiGf5lx4E-_kfYy24w_ISPLKSjnOELYc4',
});

// export const findPayment = async (userId, contestId) => {
//   try {
//     const details = await paymentDetails.findAll({
//       where: {
//         senderId: userId,
//         contestId
//       },
//     })
//     if(!details){
//       return false;
//     }
//     console.log(details);
//     const isPaid = await getPayment(details.paymentId)
//     if(isPaid && isPaid.payment.status === 'succeeded'){
//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.log(error)
//   }
// }


export const makePayment = async (key, amount={value: 0, currency: 'KZT'}) => {  
  const createPayload = {
    amount,
    payment_method_data: {
      type: 'bank_card'
  },
  confirmation: {
      type: 'redirect',
      return_url: 'test'
  }
  }
  try {
    const payment = await checkout.createPayment(createPayload, key);
    return payment;
  } catch (error) {
    console.log(error)
  }
}

export const getPayment = async (paymentId) => {
  try {
    const payment = await checkout.getPayment(paymentId);
    return payment;
  } catch (error) {
    console.log(error)
  }
}

export const cancelPayment = async (paymentId, idempotenceKey ) => {
  try {
    const payment = await checkout.cancelPayment(paymentId, idempotenceKey);
    return payment;
  } catch (error) {
    console.log(error)
  }
}  


export const createPaymentDetails = async ( userId, contestId, payment_id ) => {
  try {
    const result = await paymentDetails.create({
      sender_id: userId,
      contestId,
      payment_id
    });
    return result;
  }
  catch (error) {
    console.log(error)
  }
}
