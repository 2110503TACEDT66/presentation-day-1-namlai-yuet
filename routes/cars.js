const express = require('express')
const {getCars, getCar, createCar, updateCar, deleteCar} = require('../controllers/cars')

const appointmentRouter = require('./appointments')

const router = express.Router()

const {pretect, authorize} = require('../middleware/auth')

router.use('/:carId/appointments/', appointmentRouter)

router.route('/').get(getCars).post(protect, authorize('admin'), createCar)
router.route('/:id').get(getCar).put(protect, authorize('admin'), updateCar).delete(protect, authorize('admin'), deleteCar)

module.exports = router;