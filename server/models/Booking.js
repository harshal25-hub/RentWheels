const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    insurance: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Rejected'],
        default: 'Pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
