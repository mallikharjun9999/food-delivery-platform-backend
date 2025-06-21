# Food Delivery Platform API Documentation

**Created by:** Penugonda Mallikharjunarao  
**Date:** April 20, 2025  
**Version:** 1.0.0

## 🍽️ API Overview

The Food Delivery Platform API is a comprehensive backend service that powers a complete food delivery application. It provides endpoints for user authentication, restaurant management, menu browsing, cart operations, order processing, payment handling, delivery tracking, and customer reviews.

**Base URL:** `http://localhost:3000/api`  
**Authentication:** JWT Bearer Token  
**Content-Type:** `application/json`

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm
- Visual Studio Code or any preferred IDE

### Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd food-delivery-platform-backend

# Install dependencies
npm install

# Initialize database (creates schema and seed data)
node src/config/init.mjs

# Start development server
node ./src/app.js
```

The server will start on `http://localhost:3000`

### Environment Variables
Create a `.env` file in the root directory:
```
PORT=3000
JWT_SECRET=MysuperSecretKey
```

### Testing Endpoints
You can test the API endpoints using:
- **Postman**: Import the endpoints and test with sample data
- **curl**: Use command line to make HTTP requests
- **VS Code REST Client**: Create `.http` files for testing

## 📋 API Endpoints

### 🔐 Authentication

#### Register User
```
POST /api/auth/register
```

**Description:** Create a new user account

**Request Body:**
```json
{
  "name": "Aryan Patel",
  "email": "ary54dfan@example.com",
  "password": "pass1234",
  "phone": "+919876543210",
  "address": {
    "type": "home",
    "address_line1": "123 MG Road",
    "address_line2": "Near City Mall",
    "city": "Hyderabad",
    "state": "Telangana",
    "pincode": "500081"
  }
}
```

**Response (201):**
```json
{
  "message": "✅ User registered successfully",
  "userId": 3
}
```

**Error Response (400):**
```json
{
  "error": "User already exists"
}
```

---

#### Login User
```
POST /api/auth/login
```

**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "ary54dfan@example.com",
  "password": "pass1234" 
}
```

**Response (200):**
```json
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImVtYWlsIjoiYXJ5NTRkZmFuQGV4YW1wbGUuY29tIiwiaWF0IjoxNzUwNDIyNDMxLCJleHAiOjE3NTEwMjcyMzF9.XQxK_GkljKsIC05kttYrHmy_SihUfhaK74jmvb7Yy90"
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

### 🏠 Address Management

**Authentication Required:** All address endpoints require Authorization header

#### Get User Addresses
```
GET /api/addresses/
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
[
    {
        "id": 5,
        "user_id": 7,
        "type": "home",
        "address_line1": "123 MG Road",
        "address_line2": "Near City Mall",
        "city": "Hyderabad",
        "state": "Telangana",
        "pincode": "500081",
        "latitude": null,
        "longitude": null
    }
]
```

#### Add New Address
```
POST /api/addresses/add
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "type": "work",
  "address_line1": "Tech Park Building",
  "address_line2": "Floor 5",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "latitude": 19.0760,
  "longitude": 72.8777
}
```

**Response (201):**
```json
{
    "message": "Address added",
    "addressId": 6
}
```

---

### 🍴 Restaurant Management

#### Get All Restaurants
```
GET /api/restaurants/
```

**Response (200):**
```json
[
    {
        "id": 1,
        "name": "Tandoori Treats",
        "description": "North Indian delicacies",
        "cuisine": "North Indian",
        "address": "5 Koramangala, Bangalore",
        "latitude": null,
        "longitude": null,
        "opening_time": "10:00",
        "closing_time": "23:00",
        "min_order": 150,
        "delivery_fee": 30,
        "avg_prep_time": 25,
        "is_open": 1,
        "rating": 0
    },
    {
        "id": 2,
        "name": "Sushi Zen",
        "description": "Authentic Japanese Sushi Bar",
        "cuisine": "Japanese",
        "address": "Baner Road, Pune",
        "latitude": null,
        "longitude": null,
        "opening_time": "11:00",
        "closing_time": "22:00",
        "min_order": 200,
        "delivery_fee": 40,
        "avg_prep_time": 30,
        "is_open": 1,
        "rating": 0
    },
    {
        "id": 3,
        "name": "Spice Garden",
        "description": "Authentic South Indian flavors with a twist",
        "cuisine": "South Indian",
        "address": "12 Banjara Hills, Hyderabad",
        "latitude": null,
        "longitude": null,
        "opening_time": "09:00",
        "closing_time": "22:30",
        "min_order": 100,
        "delivery_fee": 20,
        "avg_prep_time": 30,
        "is_open": 1,
        "rating": 0
    }
]
```

#### Get Restaurant Details
```
GET /api/restaurants/:id
```

**Response (200):**
```json
{
    "id": 1,
    "name": "Tandoori Treats",
    "description": "North Indian delicacies",
    "cuisine": "North Indian",
    "address": "5 Koramangala, Bangalore",
    "latitude": null,
    "longitude": null,
    "opening_time": "10:00",
    "closing_time": "23:00",
    "min_order": 150,
    "delivery_fee": 30,
    "avg_prep_time": 25,
    "is_open": 1,
    "rating": 0
}
```
#### Get Restaurant Menu
- **GET** `/api/restaurants/:restaurantId/menu`
- **Description:** Fetch complete menu with categories and items for a restaurant
- **Headers:** None required
- **Path Parameters:**
  - `restaurantId` (integer) - Restaurant ID
- **Response (200):**
```json
[
    {
        "category_id": 1,
        "category_name": "Starters",
        "items": [
            {
                "id": 1,
                "name": "Paneer Tikka",
                "description": "Spiced grilled cottage cheese cubes",
                "price": 220,
                "is_veg": 1,
                "is_available": 1,
                "image": null
            }
        ]
    },
    {
        "category_id": 2,
        "category_name": "Main Course",
        "items": [
            {
                "id": 2,
                "name": "Butter Chicken",
                "description": "Creamy tomato-based chicken curry",
                "price": 300,
                "is_veg": 0,
                "is_available": 1,
                "image": null
            }
        ]
    }
]
```

#### Add Restaurant (Protected)
- **POST** `/api/restaurants/`
- **Description:** Create a new restaurant (requires authentication)
- **Headers:** 
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "New Restaurant",
  "description": "Amazing food place",
  "cuisine": "Italian",
  "address": "123 Food Street, Mumbai",
  "latitude": 19.0760,
  "longitude": 72.8777,
  "opening_time": "09:00",
  "closing_time": "22:00",
  "min_order": 200,
  "delivery_fee": 40,
  "avg_prep_time": 30
}
```
- **Response (201):**
```json
{
  "message": "Restaurant created",
  "restaurantId": 3
}
```

#### Add Menu Category (Protected)
- **POST** `/api/restaurants/menu-category`
- **Description:** Create a new menu category for a restaurant
- **Headers:** 
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body:**
```json
{
  "restaurant_id": 1,
  "name": "Desserts",
  "display_order": 3
}
```
- **Response (201):**
```json
{
  "message": "Menu category created",
  "categoryId": 4
}
```

#### Add Menu Item (Protected)
- **POST** `/api/restaurants/menu-item`
- **Description:** Add a new item to a menu category
- **Headers:** 
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body:**
```json
{
  "category_id": 1,
  "name": "Chicken Tikka",
  "description": "Grilled chicken pieces with spices",
  "price": 280,
  "is_veg": false,
  "is_available": true,
  "image": "https://example.com/chicken-tikka.jpg"
}
```
- **Response (201):**
```json
{
  "message": "Menu item added",
  "itemId": 5
}
```
---

### 🛒 Cart Management

**Authentication Required:** All cart endpoints require Authorization header

#### Get Cart Items
```
GET /api/cart/
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "items": [
    {
      "id": 1,
      "item_name": "Paneer Tikka",
      "quantity": 2,
      "price": 220,
      "restaurant_name": "Tandoori Treats",
      "special_instructions": "Extra spicy"
    }
  ],
  "total": 440
}
```

#### Add Item to Cart
```
POST /api/cart/add
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "restaurant_id": 1,
  "item_id": 1,
  "quantity": 2,
  "special_instructions": "Extra spicy please"
}
```

**Response (201):**
```json
{
  "message": "✅ Item added to cart"
}
```

---

### 📦 Order Management

**Authentication Required:** All order endpoints require Authorization header

#### Place Order
```
POST /api/orders/
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "restaurant_id": 1,
  "address_id": 1,
  "total_amount": 850.00,
  "delivery_fee": 50.00,
  "payment_method": "UPI",
  "special_instructions": "Please leave the food at the doorstep."
}
```

**Response (201):**
```json
{
    "message": "Order placed",
    "orderId": "8384ad0f-bf10-4f5c-b70c-2c5c52caeabe"
}
```

#### Get User Orders
```
GET /api/orders/
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
[
    {
        "id": 4,
        "order_id": "8384ad0f-bf10-4f5c-b70c-2c5c52caeabe",
        "user_id": 7,
        "restaurant_id": 1,
        "address_id": 1,
        "status": "placed",
        "total_amount": 850,
        "delivery_fee": 50,
        "payment_method": "UPI",
        "special_instructions": "Please leave the food at the doorstep.",
        "created_at": "2025-06-20 12:57:31"
    }
]
```

---

### 💳 Payment Management

#### Process Payment
```
POST /api/payments/
```

**Request Body:**
```json
{
  "order_id": 1,
  "payment_method": "upi",
  "amount": 470
}
```

**Response (200):**
```json
{
    "message": "✅ Payment initiated",
    "paymentId": 4
}
```

#### Get Payment Status
```
PUT /api/payments/status
```
**Request Body:**
```json
{
    "paymentId":1,
    "status":"completed"
}

**Response (200):**
```json
{
    "message": "✅ Payment status updated"
}
```

---

### 📍 Order Tracking

#### Add Tracking Update
```
POST /api/tracking/track
```

**Request Body:**
```json
{
  "order_id": "8384ad0f-bf10-4f5c-b70c-2c5c52caeabe",
  "status": "preparing"
}
```

**Response (201):**
```json
{
  "order_id": "8384ad0f-bf10-4f5c-b70c-2c5c52caeabe",
  "status": "preparing"
}
```

#### Get Order Tracking (you can track your order)
```
GET /api/tracking/track/:orderId
```

**Response (200):**
```json
[
  {
    "status": "placed",
    "timestamp": "2025-04-20T10:30:00Z"
  },
  {
    "status": "preparing",
    "timestamp": "2025-04-20T10:35:00Z"
  },
  {
    "status": "out_for_delivery",
    "timestamp": "2025-04-20T11:00:00Z"
  }
]
```

---

### ⭐ Reviews Management

#### Submit Review using below end point
```
POST /api/reviews/
```

**Request Body:**
```json
{
  "order_id": 1,
  "restaurant_id": 1,
  "restaurant_rating": 5,
  "food_rating": 4,
  "delivery_rating": 5,
  "comment": "Great food, quick delivery!"
}
```

**Response (201):**
```json
{
  "message": "✅ Review submitted",
  "reviewId": 1
}
```

#### Get particular Restaurant Reviews by usign below end point
```
GET /api/reviews/:restaurantId
```

**Response (200):**
```json
[
    {
        "id": 4,
        "order_id": "8384ad0f-bf10-4f5c-b70c-2c5c52caeabe",
        "restaurant_id": 1,
        "restaurant_rating": 5,
        "food_rating": 4,
        "delivery_rating": 5,
        "comment": "Great food, quick delivery!",
        "created_at": "2025-06-20 15:29:57"
    },
    {
        "id": 3,
        "order_id": "b7aa00e0-1af1-451e-920e-301c77ee2130",
        "restaurant_id": 1,
        "restaurant_rating": 4,
        "food_rating": 5,
        "delivery_rating": 4,
        "comment": "Quick delivery, great taste!",
        "created_at": "2025-06-19 06:16:47"
    },
    {
        "id": 1,
        "order_id": 1,
        "restaurant_id": 1,
        "restaurant_rating": 5,
        "food_rating": 4,
        "delivery_rating": 5,
        "comment": "Great food, quick delivery!",
        "created_at": "2025-06-18 12:00:32"
    }
]
```

---

## 📊 Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## 🔧 Error Handling

All error responses follow this format:
```json
{
  "error": "Error message description"
}
```

## 🛡️ Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 📝 Order Status Flow

```
placed → confirmed → preparing → ready → out_for_delivery → delivered
```

## 🎯 Rate Limiting

- No rate limiting currently implemented
- Consider implementing for production use

## 📞 Support

For technical support or questions about this API, please contact the development team.

