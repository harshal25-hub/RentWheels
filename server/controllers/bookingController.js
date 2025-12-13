const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');

exports.createBooking = async (req, res) => {
    try {
        const { carId, startDate, endDate, totalPrice, insurance } = req.body;

        // Check availability
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Simple overlap check
        const isBooked = car.bookedDates.some(booking => {
            const start = new Date(booking.startDate);
            const end = new Date(booking.endDate);
            const newStart = new Date(startDate);
            const newEnd = new Date(endDate);

            return (newStart >= start && newStart <= end) || (newEnd >= start && newEnd <= end);
        });

        if (isBooked) {
            return res.status(400).json({ message: 'Car is already booked for these dates' });
        }

        const newBooking = new Booking({
            user: req.user.id,
            car: carId,
            startDate,
            endDate,
            totalPrice,
            insurance,
        });

        const booking = await newBooking.save();

        // Update car booked dates
        car.bookedDates.push({ startDate, endDate });
        await car.save();

        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('car');
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user', ['name', 'email']).populate('car');
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAdminStats = async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalCars = await Car.countDocuments();
        
        // Calculate total revenue from confirmed bookings
        const confirmedBookings = await Booking.find({ status: 'Confirmed' });
        const totalRevenue = confirmedBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

        res.json({
            totalBookings,
            totalUsers,
            totalCars,
            totalRevenue
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

