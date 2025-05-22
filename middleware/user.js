const { body } = require('express-validator');

exports.create = [
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters long'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

exports.update = [
  body('name')
    .optional()
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters long'),
  body('role')
    .optional()
    .isIn(['admin', 'user'])
    .withMessage('role must be either admin or user'),
];