const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['SUV', 'Sedan', 'Hatchback'],
        required: true,
    },
    seats: {
        type: Number,
        required: true,
    },
    pricePerDay: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        default: 'https://placehold.co/600x400?text=Car+Image', // Placeholder
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    bookedDates: [{
        startDate: Date,
        endDate: Date,
    }],
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
