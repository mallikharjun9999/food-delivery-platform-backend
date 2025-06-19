const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controllers/orderController');

router.post('/', auth, orderController.placeOrder);
router.get('/', auth, orderController.getOrders);

module.exports = router;