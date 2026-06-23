# Ice Cream Cart Backend

Backend API for ice cream e-commerce cart functionality only.

## Features

- 🛒 Cart management (add, update, remove, clear)
-  Cart subtotal and item count calculations
- 🎯 Clean RESTful API endpoints
- 🔄 Persistent cart storage with MongoDB
- 🆔 Automatic user ID generation for guest users

## Tech Stack

- Node.js with ES Modules
- Express.js
- MongoDB with Mongoose
- dotenv for environment variables
- cors for cross-origin requests
- cookie-parser for cookie handling
- express-async-handler for async error handling

## Installation

1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your MongoDB URI and other configurations
5. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Cart Operations

#### Get User Cart
```
GET /api/cart/:userId
```
Returns cart items with product details, subtotal, and total items.

#### Add Item to Cart
```
POST /api/cart/add
Body: {
  "userId": "string",
  "product": {
    "id": "string",
    "name": "string",
    "price": "number",
    "image": "string",
    "category": "string"
  },
  "quantity": "number"
}
```

#### Update Cart Item
```
PUT /api/cart/update
Body: {
  "userId": "string",
  "productId": "string",
  "quantity": "number"
}
```

#### Remove Item from Cart
```
DELETE /api/cart/remove
Body: {
  "userId": "string",
  "productId": "string"
}
```

#### Clear Entire Cart
```
DELETE /api/cart/clear/:userId
```

## Database Models

### Cart Model
- userId (String, required, indexed)
- items (Array of Objects)
  - productId (String, required)
  - name (String, required)
  - price (Number, required)
  - image (String, required)
  - category (String, required)
  - quantity (Number, required)

## Frontend Integration

The frontend handles product data locally and only communicates with the backend for cart operations. The backend stores cart items with all necessary product information to avoid database lookups.

## Error Handling

Centralized error middleware with proper HTTP status codes:
- 400: Bad Request (validation errors)
- 404: Not Found (cart not found)
- 500: Internal Server Error

## Environment Variables

```env
MONGO_URI=mongodb://localhost:27017/ice-cream-store
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```
