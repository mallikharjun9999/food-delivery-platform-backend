const cartModel = require('../models/cart');

const addToCart = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const item = req.body;
    await cartModel.addItemToCart(userId, item);
    res.status(201).json({ message: 'Item added to cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await cartModel.getCartByUser(req.user?.userId);
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

module.exports = { addToCart, getCartItems };