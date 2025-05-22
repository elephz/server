const express = require('express');
const router = express.Router();

const { create, update, remove, list } = require('../controllers/user');

router.post('/users', create);

router.put('/users/:id', update);

router.delete('/users/:id', remove);

router.get('/users', list);

module.exports = router;