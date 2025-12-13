const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { auth, admin } = require('../middleware/authMiddleware');

// @route   POST api/bookings
// @desc    Create a booking
// @access  Private
router.post('/', auth, bookingController.createBooking);

// @route   GET api/bookings/user
// @desc    Get user bookings
// @access  Private
router.get('/user', auth, bookingController.getUserBookings);

// @route   GET api/bookings/admin
// @desc    Get all bookings (admin)
// @access  Private/Admin
router.get('/admin', auth, admin, bookingController.getAllBookings);

// @route   GET api/bookings/stats
// @desc    Get admin statistics
// @access  Private/Admin
router.get('/stats/admin', auth, admin, bookingController.getAdminStats);


module.exports = router;
