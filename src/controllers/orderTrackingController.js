const trackingModel = require('../models/OrderTracking');

const addTracking = async (req, res) => {
  try {
    const { order_id, status } = req.body;
    if (!order_id || !status) return res.status(400).json({ error: 'Missing fields' });
    const id = await trackingModel.addTrackingStatus(order_id, status);
    res.status(201).json({ message: 'Tracking added', id });
  } catch (err) {
    console.error('Tracking Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTracking = async (req, res) => {
  try {
    const { orderId } = req.params;
    const history = await trackingModel.getTrackingByOrderId(orderId);
    res.json(history);
  } catch (err) {
    console.error('Fetch Tracking Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addTracking, getTracking };