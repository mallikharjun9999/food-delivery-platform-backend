const express = require('express');
const router = express.Router();
const { postReview, fetchReviews } = require('../controllers/reviewController');

router.post('/', postReview);
router.get('/:restaurantId', fetchReviews);

module.exports = router;