const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/', authenticate, authorize('jefe', 'supervisor'), userController.list);
router.post('/', authenticate, authorize('jefe'), userController.create);
router.put('/:id', authenticate, authorize('jefe'), userController.update);
router.delete('/:id', authenticate, authorize('jefe'), userController.remove);

module.exports = router;
