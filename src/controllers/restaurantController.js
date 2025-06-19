const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  createMenuCategory,
  getMenuByRestaurantId,
  createMenuItem
} = require('../models/restaurantModel');

const addRestaurant = async (req, res) => {
  try {
    const restaurantId = await createRestaurant(req.body);
    res.status(201).json({ message: 'Restaurant created', restaurantId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to add restaurant' });
  }
};

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await getAllRestaurants();
    res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
};

const getRestaurantDetails = async (req, res) => {
  try {
    const restaurant = await getRestaurantById(req.params.id);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch restaurant details' });
  }
};

const getMenu = async (req, res) => {
  try {
    const menu = await getMenuByRestaurantId(req.params.restaurantId);
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
};

const addMenuCategory = async (req, res) => {
  try {
    const { restaurant_id, name, display_order } = req.body;
    const categoryId = await createMenuCategory({ restaurant_id, name, display_order });
    res.status(201).json({ message: 'Menu category created', categoryId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to add menu category' });
  }
};

const addMenuItem = async (req, res) => {
  try {
    const itemId = await createMenuItem(req.body);
    res.status(201).json({ message: 'Menu item added', itemId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to add menu item' });
  }
};

module.exports = {
  addRestaurant,
  getRestaurants,
  getRestaurantDetails,
  getMenu,
  addMenuCategory,
  addMenuItem
};
