# Scoopy - Ice Cream E-Commerce Platform

A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application for selling ice cream online. Features a modern frontend with Tailwind CSS, a robust backend API, user authentication, shopping cart management, and integrated eSewa payment processing.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Key Features Breakdown](#key-features-breakdown)

---

## 🎯 Project Overview

**Scoopy** is a complete e-commerce solution for ice cream businesses. It allows:
- **Customers** to browse products, add items to cart, and checkout with secure eSewa payment
- **Users** to register, login, manage profiles, and view order history
- **Admins** to manage products, users, and view dashboard analytics
- **Guest users** to shop without account creation

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs for password hashing
- **Payment:** eSewa integration
- **Middleware:** CORS, cookie-parser, express-async-handler

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **Routing:** React Router v7
- **Icons:** Lucide React, React Icons
- **Notifications:** Sonner (toast alerts)
- **Linting:** ESLint

---

## ✨ Features

### 🛍️ Customer Features
- ✅ Browse ice cream products with detailed descriptions
- ✅ Search and filter products by category (classic, specialty, vegan, sugar-free)
- ✅ Add/remove items from cart (persistent storage)
- ✅ Guest checkout or authenticated checkout
- ✅ Secure payment with eSewa integration
- ✅ Order history and tracking
- ✅ Product reviews and testimonials

### 🔐 Authentication
- ✅ User registration and login
- ✅ JWT-based session management
- ✅ Role-based access control (user/admin)
- ✅ Password hashing with bcrypt
- ✅ Change password functionality

### 👨‍💼 Admin Dashboard
- ✅ View all users and manage roles
- ✅ User deactivation/activation
- ✅ View orders and carts
- ✅ Dashboard analytics (total users, orders, carts)
- ✅ Protected admin routes with middleware

### 💳 Payment Processing
- ✅ eSewa payment gateway integration
- ✅ Test credentials support (sandbox environment)
- ✅ Payment success/failure handling
- ✅ Order status tracking

---

## 📁 Project Structure

```
Scoopy/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (register, login, profile)
│   │   ├── cartController.js     # Cart operations (get, add, remove)
│   │   ├── adminController.js    # Admin operations
│   │   └── paymentController.js  # eSewa payment handling
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification & admin protection
│   │   └── errorMiddleware.js    # Error handling
│   ├── models/
│   │   ├── User.js               # User schema (name, email, password, role)
│   │   ├── Cart.js               # Cart schema (userId, items, totals)
│   │   ├── Order.js              # Order schema (user, items, payment)
│   │   └── Product.js            # Product schema (name, price, category, etc)
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth endpoints
│   │   ├── cartRoutes.js         # /api/cart endpoints
│   │   ├── adminRoutes.js        # /api/admin endpoints
│   │   └── paymentRoutes.js      # /api/payment endpoints
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express app setup
│   ├── seed.js                   # Seed products to DB
│   ├── seedAdmin.js              # Seed admin user
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx           # Landing page
    │   │   ├── Products.jsx       # Product listing
    │   │   ├── ProductDetails.jsx # Individual product view
    │   │   ├── Cart.jsx           # Shopping cart
    │   │   ├── Checkout.jsx       # Checkout with eSewa
    │   │   ├── Login.jsx          # Login page
    │   │   ├── Register.jsx       # Registration page
    │   │   ├── Profile.jsx        # User profile
    │   │   ├── Admin.jsx          # Admin dashboard
    │   │   ├── Contact.jsx        # Contact page
    │   │   ├── About.jsx          # About page
    │   │   ├── PaymentSuccess.jsx # Payment success page
    │   │   └── PaymentFailure.jsx # Payment failure page
    │   ├── components/
    │   │   ├── Navbar.jsx         # Navigation bar
    │   │   ├── Footer.jsx         # Footer
    │   │   ├── Hero.jsx           # Hero section
    │   │   ├── FeaturedProduct.jsx# Featured products
    │   │   ├── ProductCard.jsx    # Reusable product card
    │   │   ├── Story.jsx          # Brand story
    │   │   └── Testimonials.jsx   # Customer reviews
    │   ├── context/
    │   │   ├── AuthContext.jsx    # Auth state management
    │   │   └── CartContext.jsx    # Cart state management
    │   ├── services/
    │   │   ├── authService.js     # Auth API calls
    │   │   ├── cartService.js     # Cart API calls
    │   │   ├── productService.js  # Product API calls
    │   │   └── paymentService.js  # Payment API calls
    │   ├── data/
    │   │   └── products.ts        # Mock product data
    │   ├── App.jsx                # Main app component
    │   ├── main.jsx               # React entry point
    │   └── index.css              # Global styles
    ├── public/
    ├── vite.config.js
    ├── package.json
    └── eslint.config.js
```

---

## 📋 Prerequisites

Before running the project, ensure you have:
- **Node.js** v16+ installed
- **npm** or **yarn** package manager
- **MongoDB** account (cloud or local instance)
- **Git** for version control

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Unish4/Scoopy.git
cd Scoopy
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

### Backend (`.env` file in `/backend`)

```properties
# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# JWT Configuration
JWT_SECRET=supersecret123

# eSewa Payment Configuration
ESEWA_MERCHANT_ID=EPAYTEST
ESEWA_SECRET_KEY=8gBm/:&EnhH.1/q
ESEWA_PAYMENT_URL=https://rc-epay.esewa.com.np/api/epay/main/v2/form
```

> **Note:** Use the provided `EPAYTEST` credentials for development/testing in the eSewa sandbox.

### Frontend
- Frontend automatically connects to `http://localhost:5000` (backend API)
- Vite dev server runs on `http://localhost:5173`

---

## 🏃 Running the Application

### Terminal 1: Start Backend
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5000`

### Terminal 2: Start Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Seed Database (Optional)
To populate with sample ice cream products:
```bash
cd backend
npm run seed
```

### Create Admin Account
To create an admin user (Email: `admin@scoopy.com`, Password: `admin123`):
```bash
cd backend
npm run seed-admin
```

---

## 📡 API Endpoints

### 🔐 Auth Routes (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login user |
| GET | `/me` | Get current user profile |
| PUT | `/update-profile` | Update user profile |
| PUT | `/change-password` | Change password |
| POST | `/logout` | Logout user |

### 🛒 Cart Routes (`/api/cart`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get user/guest cart |
| POST | `/add` | Add item to cart |
| PUT | `/update/:itemId` | Update item quantity |
| DELETE | `/remove/:itemId` | Remove item from cart |
| DELETE | `/clear` | Clear entire cart |

### 💳 Payment Routes (`/api/payment`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/esewa/initiate` | Initiate eSewa payment |
| GET | `/esewa/success` | Handle payment success |
| GET | `/esewa/failure` | Handle payment failure |

### 👨‍💼 Admin Routes (`/api/admin`) - Protected
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user details |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |
| GET | `/dashboard` | Get dashboard stats |
| GET | `/carts` | Get all carts |

---

## 🗄️ Database Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'user' | 'admin',
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema
```javascript
{
  name: String,
  slug: String (unique),
  price: Number,
  image: String,
  category: 'classic' | 'specialty' | 'vegan' | 'sugar-free',
  stock: Number,
  description: String,
  flavorNotes: String,
  featured: Boolean,
  isFlavorOfMonth: Boolean,
  pairsWellWith: [String],
  reviews: [{
    author: String,
    rating: Number,
    comment: String,
    date: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Schema
```javascript
{
  userId: String | ObjectId,
  items: [{
    productId: String,
    name: String,
    price: Number,
    image: String,
    category: String,
    quantity: Number
  }],
  subtotal: Number,
  totalItems: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema
```javascript
{
  userId: ObjectId (ref: User),
  items: [{ productId, name, price, quantity }],
  totalAmount: Number,
  paymentMethod: 'esewa',
  paymentStatus: 'pending' | 'completed' | 'failed',
  orderStatus: 'processing' | 'shipped' | 'delivered',
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Key Features Breakdown

### Shopping Experience
1. **Homepage** - Hero section, featured products, testimonials
2. **Product Catalog** - Browse all ice creams with filtering
3. **Product Details** - View detailed info, reviews, recommendations
4. **Shopping Cart** - Add/remove items, persistent storage
5. **Checkout** - Review order, select payment method

### Authentication Flow
1. **Register** - Create new account with email & password
2. **Login** - Authenticate with JWT token
3. **Profile** - View/edit user information
4. **Logout** - Clear session and token

### Payment Integration
1. **eSewa Integration** - Direct payment gateway connection
2. **Test Mode** - Use sandbox credentials for testing
3. **Payment Status** - Success/failure page redirection
4. **Order Creation** - Automatic order on successful payment

### Admin Panel
1. **User Management** - View, edit, deactivate users
2. **Dashboard Stats** - Total users, orders, carts count
3. **Cart Overview** - View all customer carts
4. **Analytics** - Business insights and statistics

---

## 🧪 Testing Credentials

### Admin Account
- **Email:** `admin@scoopy.com`
- **Password:** `admin123`

### eSewa Test Account
- **Account ID:** `9806800001` - `9806800005`
- **Password/MPIN:** `1122` or `1234`
- **OTP Token:** `123456`

---

## 📝 Notes

- Guest users can shop without registration
- Cart data is stored in MongoDB for authenticated users and localStorage for guests
- All passwords are hashed with bcrypt before storage
- JWT tokens expire and require re-login
- eSewa payments use sandbox URLs for development
- Admin routes are protected with middleware checks
- CORS is enabled for frontend communication

---

## 📧 Support & Contact

For issues or questions, please use the contact page at `/contact` or email the support team.

---

## 📄 License

MIT License - See LICENSE file for details


