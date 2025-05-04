const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/index');

// Initialize the controller
const indexController = new IndexController();

// Define routes
router.get('/', indexController.getDashboard);
router.get('/api/network-speed', indexController.getNetworkSpeed);
router.get('/api/isp-info', indexController.getIspInfo);

// Export the router
module.exports = router;