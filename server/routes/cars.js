const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const { auth, admin } = require('../middleware/authMiddleware');

// @route   GET api/cars
// @desc    Get all cars
// @access  Public
router.get('/', carController.getAllCars);

// @route   GET api/cars/:id
// @desc    Get car by ID
// @access  Public
router.get('/:id', carController.getCarById);

// @route   POST api/cars
// @desc    Create a car
// @access  Private/Admin
router.post('/', auth, admin, carController.createCar);

// @route   PUT api/cars/:id
// @desc    Update a car
// @access  Private/Admin
router.put('/:id', auth, admin, carController.updateCar);

// @route   DELETE api/cars/:id
// @desc    Delete a car
// @access  Private/Admin
router.delete('/:id', auth, admin, carController.deleteCar);

module.exports = router;
