const getDBConnection = require('../config/database');

const createAddress = async (userId, address) => {
  const {
    type,
    address_line1,
    address_line2,
    city,
    state,
    pincode,
    latitude,
    longitude,
  } = address;

  try {
    const db = await getDBConnection();
    console.log('📍 Inserting address for user:', userId);

    const stmt = await db.prepare(`
      INSERT INTO addresses (
        user_id, type, address_line1, address_line2, city, state, pincode, latitude, longitude
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = await stmt.run(
      userId,
      type,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      latitude,
      longitude
    );

    await stmt.finalize();

    console.log('✅ Address inserted with ID:', result.lastID);
    return result.lastID;

  } catch (err) {
    console.error('❌ Failed to create address:', err.message);
    throw err;
  }
};
const getAddressesByUser = async (userId) => {
  const db = await getDBConnection();
  console.log('📍 Fetching addresses for user: from getAddress method', userId);
  return db.all('SELECT * FROM addresses WHERE user_id = ?', [userId]);
};
const addAddress = async (userId, data) => {
  const db = await getDBConnection();
  const stmt = `INSERT INTO addresses (user_id, type, address_line1, address_line2, city, state, pincode, latitude, longitude)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const { type, address_line1, address_line2, city, state, pincode, latitude, longitude } = data;
  const result = await db.run(stmt, [userId, type, address_line1, address_line2, city, state, pincode, latitude, longitude]);
  return result.lastID;
};

module.exports = { createAddress,addAddress, getAddressesByUser };