const express = require('express');
const router = express.Router();

const controller = require('../controllers/user');
const validate = require('../middleware/validate');
const middleware = require('../middleware/user');

router.post('/users', middleware.create, validate, controller.create);

router.put('/users/:id', middleware.update, validate, controller.update);

router.delete('/users/:id', controller.remove);

router.get('/users', controller.list);

module.exports = router;