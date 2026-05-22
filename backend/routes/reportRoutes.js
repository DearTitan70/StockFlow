const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/summary', authenticate, authorize('jefe', 'supervisor'), reportController.summary);
router.get('/low-stock', authenticate, authorize('jefe', 'supervisor', 'tecnico'), reportController.lowStock);

module.exports = router;
