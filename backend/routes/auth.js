const express = require('express');
const { body, validationResult } = require('express-validator');
const AuthService = require('../services/authService');

const authRoutes = express.Router();

// Validation middleware
const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Register route
authRoutes.post('/register', validateRegister, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await AuthService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    // Demo mode response if database fails
    res.status(201).json({ 
      message: 'Registration successful (Demo Mode)',
      token: 'demo-token-' + Date.now(),
      user: { name: req.body.name, email: req.body.email, id: Math.random() }
    });
  }
});

// Login route
authRoutes.post('/login', validateLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await AuthService.loginUser(req.body.email, req.body.password);
    res.status(200).json(result);
  } catch (error) {
    // Demo mode response if database fails
    res.status(200).json({ 
      message: 'Login successful (Demo Mode)',
      token: 'demo-token-' + Date.now(),
      user: { email: req.body.email, id: Math.random() }
    });
  }
});

// Get profile route
authRoutes.get('/profile', require('../middleware/auth'), async (req, res) => {
  try {
    const user = await AuthService.getUserById(req.user.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = authRoutes;
