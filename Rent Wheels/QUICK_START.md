
## What You Need Before Starting

1. **Node.js** - Download from [nodejs.org](https://nodejs.org/)
2. **MongoDB** - Follow the MongoDB setup below
3. **Code Editor** - VS Code or any editor

---

##  MongoDB Setup (Choose One)

### Option 1: MongoDB Cloud (Recommended - Easiest)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up" and create a free account
3. Create a new cluster (click "Create")
4. Wait for cluster to be created
5. Click "Connect"
6. Choose "Connect your application"
7. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)



## Setup & Run Instructions

### Step 1: Setup Backend

```bash
# Go to server folder
cd server

# Install packages
npm install

# Create .env file and add these lines:
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=secretkey123
PORT=5000

# Start the backend server
node server.js
```

The backend will run on: `http://localhost:5000`

### Step 2: Setup Frontend

```bash
# Open a NEW terminal/command prompt
# Go to client folder
cd client

# Install packages
npm install

# Start the frontend
npm run dev
```

The frontend will run on: `http://localhost:5173`

### Step 3: Open in Browser

Click the link shown in terminal OR go to: `http://localhost:5173`

---

## 🌱 Load Demo Data (Optional)

To add test cars and users:

```bash
# Go to server folder
cd server

# Run the seed script
node seed.js
```

**Demo Login Credentials:**
```
Admin:
Email: admin@rentwheels.com
Password: admin123

User:
Email: john@example.com
Password: password123
```

---

## 🎯 How to Use the App

1. **Register** - Create a new account OR use demo credentials
2. **Login** - Enter your email and password
3. **Browse Cars** - Click "Our Fleet" to see all cars
4. **Book a Car** - Click a car → select dates → confirm booking
5. **View Bookings** - Click your name in navbar to see your bookings
6. **Admin Page** - If logged as admin, view all bookings and stats

---

## ⚠️ Common Issues & Fixes

**Error: "Cannot connect to MongoDB"**
- Check your MONGO_URI in .env file
- Make sure it's correct and MongoDB is running
- If using MongoDB Atlas, check your IP whitelist

**Error: "Port 5000 already in use"**
- Change PORT in .env file (use 5001, 5002, etc.)
- OR close the app using port 5000

**Frontend showing blank page**
- Check browser console for errors (F12)
- Make sure backend is running
- Try refreshing the page

**Demo data not showing**
- Run `node seed.js` in server folder
- Make sure backend is connected to MongoDB

---

## 📁 Project Structure

```
Rent-Wheels/
├── server/          ← Backend (Node.js + Express)
├── client/          ← Frontend (React)
└── README.md        ← This file
```

---

## ✅ Checklist Before Running

- [ ] Node.js installed
- [ ] MongoDB account created OR local MongoDB installed
- [ ] Backend .env file created with MONGO_URI
- [ ] Terminal opened in correct folder
- [ ] npm install completed for both server and client

---

## 🆘 Need Help?

- Check terminal for error messages
- Make sure both frontend AND backend are running
- Verify MongoDB connection string is correct
- Restart your terminals and try again

---

**Happy Renting! 🚗💨**
