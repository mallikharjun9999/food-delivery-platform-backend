const getDBConnection = require('../config/database');

const addItemToCart = async (userId, item) => {
  const db = await getDBConnection();
  const stmt = `INSERT INTO cart_items (user_id, restaurant_id, item_id, quantity, special_instructions)
                VALUES (?, ?, ?, ?, ?)`;
  const { restaurant_id, item_id, quantity, special_instructions } = item;
  await db.run(stmt, [userId, restaurant_id, item_id, quantity, special_instructions]);
};

const getCartByUser = async (userId) => {
  const db = await getDBConnection();
  return db.all('SELECT * FROM cart_items WHERE user_id = ?', [userId]);
};

module.exports = { addItemToCart, getCartByUser };