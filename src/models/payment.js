const getDBConnection = require('../config/database');

const createPayment = async ({ order_id, payment_method }) => {
  try {
    const db = await getDBConnection();
    const query = `
      INSERT INTO payments (order_id, payment_method, transaction_status)
      VALUES (?, ?, 'pending')
    `;
    const result = await db.run(query, [order_id, payment_method]);
    return result.lastID;
  } catch (err) {
    console.error('❌ Error creating payment:', err);
    throw err;
  }
};

const updatePaymentStatus = async (paymentId, status) => {
  try {
    const db = await getDBConnection();
    const query = `UPDATE payments SET transaction_status = ? WHERE id = ?`;
    await db.run(query, [status, paymentId]);
    return true;
  } catch (err) {
    console.error('❌ Error updating payment status:', err);
    throw err;
  }
};

module.exports = { createPayment, updatePaymentStatus };