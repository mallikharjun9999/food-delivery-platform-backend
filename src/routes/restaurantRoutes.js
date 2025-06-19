const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', restaurantController.getRestaurants);
router.get('/:id', restaurantController.getRestaurantDetails);
router.get('/:restaurantId/menu', restaurantController.getMenu);

// Protected routes (require login/token)
router.post('/', auth, restaurantController.addRestaurant);
router.post('/menu-category', auth, restaurantController.addMenuCategory);
router.post('/menu-item', auth, restaurantController.addMenuItem);

module.exports = router;
