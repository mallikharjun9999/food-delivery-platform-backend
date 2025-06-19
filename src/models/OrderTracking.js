const getDBConnection = require('../config/database');

const addTrackingStatus = async (orderId, status) => {
  const db = await getDBConnection();
  const query = `INSERT INTO order_tracking (order_id, status) VALUES (?, ?)`;
  const result = await db.run(query, [orderId, status]);
  return result.lastID;
};

const getTrackingByOrderId = async (orderId) => {
  console.log('📍 Fetching tracking for order:', orderId);
  const db = await getDBConnection();
  const query = `SELECT * FROM order_tracking WHERE order_id = ? ORDER BY timestamp ASC`;
  const rows = await db.all(query, [orderId]);
  return rows;
};

module.exports = {
  addTrackingStatus,
  getTrackingByOrderId
};