const getDBConnection = require('../config/database');
const bcrypt = require('bcrypt');

const createUser = async ({ name, email, password, phone }) => {
  try {
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    const db = await getDBConnection();
    const stmt = await db.prepare(
      'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)'
    );

    console.log('📦 Executing insert...');
    const result = await stmt.run(name, email, hashedPassword, phone);
    await stmt.finalize();

    console.log('✅ User created with ID:', result.lastID);
    return result.lastID;
  } catch (err) {
    console.error('❌ Error in createUser:', err.message);
    throw err;
  }
};


const updateDefaultAddress = async (userId, addressId) => {
  try {
    const db = await getDBConnection();

    const stmt = await db.prepare(`
      UPDATE users SET default_address_id = ? WHERE id = ?
    `);

    const result = await stmt.run(addressId, userId);
    await stmt.finalize();

    console.log('✅ Default address updated for user:', userId);
    return result;
  } catch (err) {
    console.error('❌ Failed to update default address:', err.message);
    throw err;
  }
};
const findUserByEmail = async (email) => {
  try {
    const db = await getDBConnection();
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    return user;
  } catch (err) {
    console.error('❌ Error finding user by email:', err.message);
    throw err;
  }
};
module.exports = { createUser, updateDefaultAddress,findUserByEmail};
