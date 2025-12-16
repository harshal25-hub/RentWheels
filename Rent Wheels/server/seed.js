const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Car = require('./models/Car');
const User = require('./models/User');
const Booking = require('./models/Booking');


const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGO_URI missing in server/.env; aborting seed');
  process.exit(1);
}

async function seedDatabase() {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connected');

    // Clear existing data
    await Promise.all([
      Car.deleteMany({}),
      User.deleteMany({}),
      Booking.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Cars
    const carsData = [
      { name: 'Tesla Model S', brand: 'Tesla', type: 'Sedan', seats: 5, pricePerDay: 150, image: 'https://images.unsplash.com/photo-1560958089-b8a63c51c1f1?w=500&h=400&fit=crop', isAvailable: true, bookedDates: [] },
      { name: 'BMW X5', brand: 'BMW', type: 'SUV', seats: 7, pricePerDay: 120, image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=400&fit=crop', isAvailable: true, bookedDates: [] },
      { name: 'Audi A4', brand: 'Audi', type: 'Sedan', seats: 5, pricePerDay: 100, image: 'https://images.unsplash.com/photo-1606611013016-969a19f27046?w=500&h=400&fit=crop', isAvailable: true, bookedDates: [] },
      { name: 'Mercedes GLC', brand: 'Mercedes', type: 'SUV', seats: 5, pricePerDay: 130, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b83ad38?w=500&h=400&fit=crop', isAvailable: true, bookedDates: [] },
      { name: 'Honda Civic', brand: 'Honda', type: 'Sedan', seats: 5, pricePerDay: 60, image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=400&fit=crop', isAvailable: true, bookedDates: [] },
      { name: 'Ford Mustang', brand: 'Ford', type: 'Sedan', seats: 4, pricePerDay: 110, image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=400&fit=crop', isAvailable: true, bookedDates: [] },
      { name: 'Hyundai Creta', brand: 'Hyundai', type: 'SUV', seats: 5, pricePerDay: 70, image: 'https://images.unsplash.com/photo-1606611013016-969a19f27046?w=500&h=400&fit=crop', isAvailable: true, bookedDates: [] },
      { name: 'Volkswagen Golf', brand: 'Volkswagen', type: 'Hatchback', seats: 5, pricePerDay: 65, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b83ad38?w=500&h=400&fit=crop', isAvailable: true, bookedDates: [] },
      { name: 'Toyota Fortuner', brand: 'Toyota', type: 'SUV', seats: 7, pricePerDay: 85, image: 'https://images.unsplash.com/photo-1560958089-b8a63c51c1f1?w=500&h=400&fit=crop', isAvailable: true, bookedDates: [] },
      { name: 'Maruti Swift', brand: 'Maruti', type: 'Hatchback', seats: 5, pricePerDay: 50, image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=400&fit=crop', isAvailable: true, bookedDates: [] }
    ];
    const cars = await Car.insertMany(carsData);
    console.log(`✅ Inserted ${cars.length} cars`);

    // Users
    const usersData = [
      { name: 'Admin User', email: 'admin@rentwheels.com', password: await bcrypt.hash('admin123', 10), role: 'admin' },
      { name: 'John Doe', email: 'john@example.com', password: await bcrypt.hash('password123', 10), role: 'user' },
      { name: 'Jane Smith', email: 'jane@example.com', password: await bcrypt.hash('password123', 10), role: 'user' },
      { name: 'Mike Johnson', email: 'mike@example.com', password: await bcrypt.hash('password123', 10), role: 'user' }
    ];
    const users = await User.insertMany(usersData);
    console.log(`✅ Inserted ${users.length} users`);

    // Bookings
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 5);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 3);

    const bookingsData = [
      { user: users[1]._id, car: cars[0]._id, startDate, endDate, totalPrice: 450, insurance: true, status: 'Confirmed' },
      { user: users[2]._id, car: cars[1]._id, startDate: new Date(startDate.getTime() + 7 * 86400000), endDate: new Date(endDate.getTime() + 7 * 86400000), totalPrice: 360, insurance: false, status: 'Pending' },
      { user: users[3]._id, car: cars[4]._id, startDate: new Date(startDate.getTime() + 14 * 86400000), endDate: new Date(endDate.getTime() + 14 * 86400000), totalPrice: 180, insurance: true, status: 'Confirmed' }
    ];
    const bookings = await Booking.insertMany(bookingsData);
    console.log(`✅ Inserted ${bookings.length} bookings`);

    console.log('\n📊 DEMO DATA INSERTED SUCCESSFULLY!\n');
    console.log('------- LOGIN CREDENTIALS -------');
    console.log('Admin: admin@rentwheels.com / admin123');
    console.log('User: john@example.com / password123');
    console.log('--------------------------------\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    try { await mongoose.disconnect(); } catch (_) {}
    process.exit(1);
  }
}

seedDatabase();