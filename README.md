# MediMart 💊 - Medicine E-Commerce Platform

## Overview
MediMart is a modern medicine e-commerce platform that allows users to browse, search, and purchase medicines online. The platform features secure user authentication, prescription verification, seamless order management, and a user-friendly shopping experience. It ensures compliance with regulations for prescription-based purchases.

## Features

### 🔐 Live Link
[Live Demo](https://medi-mart-gules.vercel.app/)

### 🔐 User Authentication & Roles
- Secure login with JWT-based authentication.
- Role-based access control (Customers & Admins).

### 🏥 Medicine Listings & Search
- Search medicines by name, category, or symptoms.
- Detailed product pages with price, stock availability, manufacturer details, and expiry date.

### 🛒 Shopping Cart & Checkout
- Add medicines to the cart and modify quantities.
- Prescription upload for required medicines.
- Secure checkout with payment integration (Stripe, ShurjoPay).

### 📦 Order Management & Tracking
- Users can track their orders (Pending, Processing, Shipped, Delivered).
- Admins can verify prescriptions, approve/reject orders, and update order status.

### 🛠️ Admin Dashboard
- Manage medicines (Add, update, remove medicines).
- Monitor stock levels and orders.
- Approve/reject prescription-based orders.
- View customer details and order history.

### 🔒 Security & Compliance
- Ensures prescription verification for specific medicines.
- Secure authentication and encrypted passwords using bcrypt.

## 🛠 Tech Stack

### Frontend:
- **Next.js**
- **TypeScript** for type safety
- **React** for UI components
- **Tailwind CSS** for styling

### Backend:
- **Node.js** with **Express** for REST APIs
- **MongoDB** (Mongoose) for database management
- **JWT** for authentication
- **bcrypt.js** for password hashing

### Payment Integration:
- **Stripe**
- **ShurjoPay**

## 📂 Project Structure
```
MediMart/
│── backend/       # Node.js & Express backend
│── frontend/      # Next.js frontend
│── docs/          # Documentation & API references
│── .env           # Environment variables
│── package.json   # Dependencies & scripts
│── README.md      # Project documentation
```

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v18+)
- **MongoDB**
- **Yarn** or **npm**

### Installation

#### 1️⃣ Clone the repository:
```bash
git clone https://github.com/your-username/MediMart.git
cd MediMart
```

#### 2️⃣ Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 3️⃣ Configure environment variables:
Create a `.env` file in both `backend/` and `frontend/` with necessary configurations.

#### 4️⃣ Run the project:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd ../frontend
npm run dev
```

Project will be available at **http://localhost:3000**.

## 📜 License
This project is licensed under the MIT License.


