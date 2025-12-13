# RentWheels – Car Rental Service

A MERN stack web application for renting cars online. This project demonstrates a full-stack application with authentication, database management, and CRUD operations.

## Technologies Used

- **Frontend:** React, React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens), bcryptjs

## Features

- **User Authentication:** Register and Login with JWT.
- **Car Catalog:** Browse available cars with details (type, seats, price).
- **Booking System:** Select dates and book cars.
- **Dashboards:**
    - **User:** View personal booking history.
    - **Admin:** View all bookings and manage system (basic).
- **Responsive Design:** Works on mobile and desktop.

## How to Run

### Prerequisites
- Node.js installed
- MongoDB installed and running locally (or use MongoDB Atlas)

### 1. Setup Backend
1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` folder and add your MongoDB URI:
   ```env
   MONGO_URI=mongodb://localhost:27017/rentwheels
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm run dev
   # OR
   node server.js
   ```

### 2. Setup Frontend
1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm run dev
   ```

### 3. Access the App
Open your browser and go to `http://localhost:5173` (or the port shown in your terminal).

## Sample User Flow
1. **Register** a new account.
2. **Login** with your credentials.
3. Browse the **Home** or **Cars** page.
4. Click **View Details** on a car.
5. Click **Book Now**, select dates, and confirm.
6. Go to **Dashboard** to see your booking status.

## Project Structure
```
rentwheels/
├── client/          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
├── server/          # Express Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
└── README.md
```
