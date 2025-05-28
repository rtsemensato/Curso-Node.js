const express = require('express');
const ToughtController = require('../controllers/ToughtController');

const router = express.Router();

//controller

router.get('/dashboard', ToughtController.dashboard);
router.get('/', ToughtController.showToughts);

module.exports = router;
