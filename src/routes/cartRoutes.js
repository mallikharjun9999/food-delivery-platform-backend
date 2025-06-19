const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cartController = require('../controllers/cartController');

router.post('/', auth, cartController.addToCart);
router.get('/', auth, cartController.getCartItems);

module.exports = router;