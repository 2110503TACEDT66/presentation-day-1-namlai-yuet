const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    car: {
        type: mongoose.Schema.ObjectId,
        ref: 'Car',
        required: true
    },
    provider:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    carModel:{
        type: String,
        required: true
    },
    pickupDate:{
        type: Date,
        required: true
    },
    pickupLocation:{
        type: String,
        required: true
    },
    returnDate:{
        type: Date,
        required: true
    },
    returnLocation:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);