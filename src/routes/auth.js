const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validateRequest } = require('../middleware/validation');
const { register, login } = require('../controllers/auth');

// Validation rules
const registerRules = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers and underscores'),
  
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const loginRules = [
  body('username').trim().notEmpty(),
  body('password').notEmpty()
];

// Register endpoint
router.post('/register', registerRules, validateRequest, register);

// Login endpoint
router.post('/login', loginRules, validateRequest, login);

module.exports = router;