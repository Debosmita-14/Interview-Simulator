const connectToDatabase = require('../_lib/config/database');
const AuthService = require('../_lib/services/authService');
const { isValidEmail, isValidPassword } = require('../_lib/utils/validation');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to database
    await connectToDatabase();

    // Validate request body
    const { name, email, password, targetRole } = req.body;

    // Collect validation errors
    const errors = [];

    if (!name || name.trim() === '') {
      errors.push({ field: 'name', message: 'Name is required' });
    }
    
    if (!email || email.trim() === '') {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!isValidEmail(email)) {
      errors.push({ field: 'email', message: 'Valid email is required' });
    }
    
    if (!password) {
      errors.push({ field: 'password', message: 'Password is required' });
    } else if (!isValidPassword(password, 6)) {
      errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
      return res.status(400).json({ 
        message: errors[0].message,
        errors
      });
    }

    // Register user
    const result = await AuthService.registerUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      targetRole,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ 
      message: error.message || 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
};
