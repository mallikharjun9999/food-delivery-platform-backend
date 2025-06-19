const { createPayment, updatePaymentStatus } = require('../models/payment');

const initiatePayment = async (req, res) => {
  try {
    const paymentId = await createPayment(req.body);
    res.status(201).json({ message: '✅ Payment initiated', paymentId });
  } catch (err) {
    res.status(500).json({ error: 'Error initiating payment' });
  }
};

const completePayment = async (req, res) => {
  try {
    const { paymentId, status } = req.body;
    await updatePaymentStatus(paymentId, status);
    res.json({ message: '✅ Payment status updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating payment' });
  }
};

module.exports = { initiatePayment, completePayment };