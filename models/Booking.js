const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    apptDate: {
        type: Date,
        require: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true
    },
    car: {
        type: mongoose.Schema.ObjectId,
        ref: 'Car',
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);