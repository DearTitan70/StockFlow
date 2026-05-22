const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movementController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/', authenticate, authorize('jefe', 'supervisor'), movementController.list);
router.post('/', authenticate, authorize('jefe', 'supervisor', 'tecnico'), movementController.create);

module.exports = router;
