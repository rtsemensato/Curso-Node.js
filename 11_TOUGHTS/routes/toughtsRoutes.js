const express = require('express');
const ToughtController = require('../controllers/ToughtController');

const router = express.Router();

//controller

// helpers
const checkAuth = require('../helpers/auth').checkAuth;

router.get('/add', checkAuth, ToughtController.createTought);
router.post('/add', checkAuth, ToughtController.createToughtSave);
router.get('/dashboard', checkAuth, ToughtController.dashboard);
router.post('/delete', checkAuth, ToughtController.removeTought);
router.get('/', ToughtController.showToughts);

module.exports = router;
