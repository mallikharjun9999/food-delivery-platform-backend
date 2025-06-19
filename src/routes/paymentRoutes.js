const express = require('express');
const router = express.Router();
const { initiatePayment, completePayment } = require('../controllers/paymentController');

router.post('/', initiatePayment);
router.put('/status', completePayment);

module.exports = router;