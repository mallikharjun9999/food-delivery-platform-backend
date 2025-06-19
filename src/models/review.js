const getDBConnection = require('../config/database');

const addReview = async (reviewData) => {
  try {
    const db = await getDBConnection();
    const {
      order_id,
      restaurant_id,
      restaurant_rating,
      food_rating,
      delivery_rating,
      comment
    } = reviewData;

    const query = `
      INSERT INTO reviews (order_id, restaurant_id, restaurant_rating, food_rating, delivery_rating, comment)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const result = await db.run(query, [
      order_id,
      restaurant_id,
      restaurant_rating,
      food_rating,
      delivery_rating,
      comment
    ]);

    return result.lastID;
  } catch (err) {
    console.error('❌ Error adding review:', err);
    throw err;
  }
};

const getReviewsByRestaurant = async (restaurant_id) => {
  try {
    const db = await getDBConnection();
    const query = `SELECT * FROM reviews WHERE restaurant_id = ? ORDER BY created_at DESC`;
    const reviews = await db.all(query, [restaurant_id]);
    return reviews;
  } catch (err) {
    console.error('❌ Error fetching reviews:', err);
    throw err;
  }
};

module.exports = { addReview, getReviewsByRestaurant };
