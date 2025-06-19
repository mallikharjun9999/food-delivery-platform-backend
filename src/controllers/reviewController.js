const { addReview, getReviewsByRestaurant } = require('../models/review');

const postReview = async (req, res) => {
  try {
    const reviewId = await addReview(req.body);
    res.status(201).json({ message: '✅ Review submitted', reviewId });
  } catch (err) {
    res.status(500).json({ error: 'Error submitting review' });
  }
};

const fetchReviews = async (req, res) => {
  try {
    const reviews = await getReviewsByRestaurant(req.params.restaurantId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
};

module.exports = { postReview, fetchReviews };
