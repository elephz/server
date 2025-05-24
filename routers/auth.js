const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const validate = require('../middleware/validate');
const middleware = require('../middleware/user');
const {auth} = require('../middleware/auth');

router.post('/login', authController.login);
router.post('/register', middleware.create, validate, userController.create);
router.get('/me', auth , authController.me); 

  
module.exports = router;