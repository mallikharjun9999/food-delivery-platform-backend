const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const addressController = require('../controllers/addressController');

router.post('/', auth, addressController.addAddress);
router.get('/', auth, addressController.getUserAddresses);

module.exports = router;