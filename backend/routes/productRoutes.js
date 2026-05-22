const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/', authenticate, productController.list);
router.get('/:id', authenticate, productController.getById);
router.post('/', authenticate, authorize('jefe', 'supervisor', 'tecnico'), productController.create);
router.put('/:id', authenticate, authorize('jefe', 'supervisor'), productController.update);
router.patch('/:id/status', authenticate, authorize('jefe', 'supervisor', 'tecnico'), productController.updateStatus);
router.delete('/:id', authenticate, authorize('jefe'), productController.remove);

module.exports = router;
