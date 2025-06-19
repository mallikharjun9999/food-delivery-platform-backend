const express = require('express');
const router = express.Router();
const orderTrackingController = require('../controllers/orderTrackingController');

router.post('/track', orderTrackingController.addTracking);
router.get('/track/:orderId', orderTrackingController.getTracking);

module.exports = router;