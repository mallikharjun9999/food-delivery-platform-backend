const { createUser, updateDefaultAddress } = require('../models/authModel');
const { createAddress } = require('../models/addressModel');
const getDBConnection = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findUserByEmail } = require('../models/authModel');

const registerUser = async (req, res) => {
  try {
    const db = await getDBConnection();
    const { name, email, password, phone, address } = req.body;
    console.log('Registering user:', { name, email, phone, address });

    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email])
    if (existingUser) {
        return res.status(409).json({ error: 'Email already registered' });
    }
    const userId = await createUser({ name, email, password, phone });
    console.log('User created with ID from authController:', userId);
    const addressId = await createAddress(userId, address);
    console.log('Address created with ID:', addressId);
    await updateDefaultAddress(userId, addressId);
    console.log('Default address updated for user:', userId);

    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'MysuperSecretKey',
      { expiresIn: '7d' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerUser,loginUser };
