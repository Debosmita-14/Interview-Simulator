const connectToDatabase = require('../_lib/config/database');
const AuthService = require('../_lib/services/authService');
const { isValidEmail } = require('../_lib/utils/validation');

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
    const { email, password } = req.body;

    // Collect validation errors
    const errors = [];

    if (!email || email.trim() === '') {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!isValidEmail(email)) {
      errors.push({ field: 'email', message: 'Valid email is required' });
    }
    
    if (!password) {
      errors.push({ field: 'password', message: 'Password is required' });
    }

    if (errors.length > 0) {
      return res.status(400).json({ 
        message: errors[0].message,
        errors
      });
    }

    // Login user
    const result = await AuthService.loginUser(email.trim().toLowerCase(), password);

    res.status(200).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ 
      message: error.message || 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
};
