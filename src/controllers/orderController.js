const orderModel = require('../models/order');

const placeOrder = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const orderData = req.body;
    const orderId = await orderModel.createOrder(userId, orderData);
    res.status(201).json({ message: 'Order placed', orderId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.getOrdersByUser(req.user?.userId);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = { placeOrder, getOrders };