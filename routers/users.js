const express = require('express');
const router = express.Router();

const controller = require('../controllers/user');
const validate = require('../middleware/validate');
const middleware = require('../middleware/user');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware.auth)

router.post('', authMiddleware.isAdmin, validate, controller.create);

router.put('/:id', authMiddleware.isAdmin, middleware.update, validate, controller.update);

router.delete('/:id', authMiddleware.isAdmin, controller.remove);

router.get('', controller.list);

router.get('/:id', controller.read);

module.exports = router;