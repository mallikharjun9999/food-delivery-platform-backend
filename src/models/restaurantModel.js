const getDBConnection = require('../config/database');

// --- Restaurants ---
const createRestaurant = async (data) => {
  try {
    const db = await getDBConnection();
    const {
      name, description, cuisine, address,
      latitude, longitude, opening_time, closing_time,
      min_order, delivery_fee, avg_prep_time
    } = data;

    const query = `
      INSERT INTO restaurants (
        name, description, cuisine, address,
        latitude, longitude, opening_time, closing_time,
        min_order, delivery_fee, avg_prep_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await db.run(query, [
      name, description, cuisine, address,
      latitude, longitude, opening_time, closing_time,
      min_order, delivery_fee, avg_prep_time
    ]);

    return result.lastID;
  } catch (err) {
    console.error('❌ Error creating restaurant:', err.message);
    throw err;
  }
};

const getAllRestaurants = async () => {
  try {
    const db = await getDBConnection();
    const rows = await db.all('SELECT * FROM restaurants ORDER BY rating DESC');
    return rows;
  } catch (err) {
    console.error('❌ Error fetching restaurants:', err.message);
    throw err;
  }
};

const getRestaurantById = async (id) => {
  try {
    const db = await getDBConnection();
    const row = await db.get('SELECT * FROM restaurants WHERE id = ?', [id]);
    return row;
  } catch (err) {
    console.error('❌ Error fetching restaurant by ID:', err.message);
    throw err;
  }
};

// --- Menu Categories ---
const createMenuCategory = async ({ restaurant_id, name, display_order }) => {
  try {
    const db = await getDBConnection();
    const query = 'INSERT INTO menu_categories (restaurant_id, name, display_order) VALUES (?, ?, ?)';
    const result = await db.run(query, [restaurant_id, name, display_order]);
    return result.lastID;
  } catch (err) {
    console.error('❌ Error creating menu category:', err.message);
    throw err;
  }
};

// --- Menu Items ---
const createMenuItem = async (data) => {
  try {
    const db = await getDBConnection();
    const {
      category_id, name, description,
      price, is_veg, is_available, image
    } = data;

    const query = `
      INSERT INTO menu_items (
        category_id, name, description,
        price, is_veg, is_available, image
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await db.run(query, [
      category_id, name, description, price, is_veg, is_available, image
    ]);

    return result.lastID;
  } catch (err) {
    console.error('❌ Error creating menu item:', err.message);
    throw err;
  }
};

// --- Get Menu with Categories and Items ---
const getMenuByRestaurantId = async (restaurantId) => {
  try {
    const db = await getDBConnection();
    const query = `
      SELECT mc.id as category_id, mc.name as category_name, mi.*
      FROM menu_categories mc
      LEFT JOIN menu_items mi ON mi.category_id = mc.id
      WHERE mc.restaurant_id = ?
      ORDER BY mc.display_order ASC
    `;

    const rows = await db.all(query, [restaurantId]);
    const menuMap = {};

    rows.forEach(row => {
      if (!menuMap[row.category_id]) {
        menuMap[row.category_id] = {
          category_id: row.category_id,
          category_name: row.category_name,
          items: []
        };
      }

      if (row.id) {
        menuMap[row.category_id].items.push({
          id: row.id,
          name: row.name,
          description: row.description,
          price: row.price,
          is_veg: row.is_veg,
          is_available: row.is_available,
          image: row.image
        });
      }
    });

    return Object.values(menuMap);
  } catch (err) {
    console.error('❌ Error fetching menu by restaurant ID:', err.message);
    throw err;
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  createMenuCategory,
  createMenuItem,
  getMenuByRestaurantId
};
