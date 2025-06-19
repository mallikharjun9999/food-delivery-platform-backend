-- Insert Users
INSERT INTO users (name, email, password, phone) VALUES
('Aarav Mehta', 'aarav@example.com', 'hashed_pwd1', '9876543210'),
('Diya Kapoor', 'diya@example.com', 'hashed_pwd2', '9876501234');

-- Insert Addresses
INSERT INTO addresses (user_id, type, address_line1, city, state, pincode) VALUES
(1, 'home', '12 MG Road', 'Bangalore', 'Karnataka', '560001'),
(2, 'work', '88 Jubilee Hills', 'Hyderabad', 'Telangana', '500033');

-- Insert Restaurants
INSERT INTO restaurants (name, description, cuisine, address, opening_time, closing_time, min_order, delivery_fee, avg_prep_time) VALUES
('Tandoori Treats', 'North Indian delicacies', 'North Indian', '5 Koramangala, Bangalore', '10:00', '23:00', 150, 30, 25),
('Sushi Zen', 'Authentic Japanese Sushi Bar', 'Japanese', 'Baner Road, Pune', '11:00', '22:00', 200, 40, 30);

-- Insert Menu Categories
INSERT INTO menu_categories (restaurant_id, name, display_order) VALUES
(1, 'Starters', 1),
(1, 'Main Course', 2),
(2, 'Sushi Rolls', 1);

-- Insert Menu Items
INSERT INTO menu_items (category_id, name, description, price, is_veg) VALUES
(1, 'Paneer Tikka', 'Spiced grilled cottage cheese cubes', 220, 1),
(2, 'Butter Chicken', 'Creamy tomato-based chicken curry', 300, 0),
(3, 'Salmon Roll', 'Fresh salmon with sticky rice and nori', 450, 0);

-- Insert Cart Items
INSERT INTO cart_items (user_id, restaurant_id, item_id, quantity) VALUES
(1, 1, 1, 2),
(2, 2, 3, 1);

-- Insert Orders
INSERT INTO orders (order_id, user_id, restaurant_id, address_id, total_amount, delivery_fee, payment_method) VALUES
('ORD1001', 1, 1, 1, 470, 30, 'card'),
('ORD1002', 2, 2, 2, 490, 40, 'upi');

-- Insert Order Items
INSERT INTO order_items (order_id, item_id, quantity, price_at_order) VALUES
(1, 1, 2, 220),
(2, 3, 1, 450);

-- Insert Delivery Partners
INSERT INTO delivery_partners (name, phone) VALUES
('Ravi Singh', '9000011122'),
('Meena Sharma', '9000022233');

-- Insert Order Tracking
INSERT INTO order_tracking (order_id, status) VALUES
(1, 'preparing'),
(2, 'delivered');

-- Insert Payments
INSERT INTO payments (order_id, payment_method, transaction_status) VALUES
(1, 'card', 'completed'),
(2, 'upi', 'completed');

-- Insert Reviews
INSERT INTO reviews (order_id, restaurant_id, restaurant_rating, food_rating, delivery_rating, comment) VALUES
(1, 1, 5, 4, 5, 'Great food, quick delivery!'),
(2, 2, 4, 5, 4, 'Sushi was fresh and delicious.');