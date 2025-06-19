const getDBConnection = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const createOrder = async (userId, data) => {
  const db = await getDBConnection();
  const orderId = uuidv4();
  const stmt = `INSERT INTO orders (order_id, user_id, restaurant_id, address_id, status, total_amount, delivery_fee, payment_method, special_instructions)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const { restaurant_id, address_id, total_amount, delivery_fee, payment_method, special_instructions } = data;
  await db.run(stmt, [orderId, userId, restaurant_id, address_id, 'placed', total_amount, delivery_fee, payment_method, special_instructions]);
  return orderId;
};

const getOrdersByUser = async (userId) => {
  const db = await getDBConnection();
  return db.all('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
};

module.exports = { createOrder, getOrdersByUser };