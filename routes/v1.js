const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller')

router.post('/search', restaurantController.search);


module.exports = router;
