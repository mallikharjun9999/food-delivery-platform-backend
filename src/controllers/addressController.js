const addressModel = require('../models/addressModel');

const addAddress = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const address = req.body;
    console.log('Adding address for user:', userId, 'Address:', address);
    const id = await addressModel.addAddress(userId, address);
    res.status(201).json({ message: 'Address added', addressId: id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add address' });
  }
};

const getUserAddresses = async (req, res) => {
  try {
    console.log('Fetching addresses for user:', req.user?.userId);
    const addresses = await addressModel.getAddressesByUser(req.user?.userId);
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
};

module.exports = { addAddress, getUserAddresses };