import { YooCheckout } from "@a2seven/yoo-checkout";

const checkout = new YooCheckout({
    shopId: '223714',
    secretKey: 'test_ytP7XscPJhEiGf5lx4E-_kfYy24w_ISPLKSjnOELYc4',
});

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