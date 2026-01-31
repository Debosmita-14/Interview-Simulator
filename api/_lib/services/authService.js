const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthService {
  static generateToken(userId) {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
  }

  static async registerUser(userData) {
    const { name, email, password, targetRole, targetCompany } = userData;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      targetRole: targetRole || 'Software Engineer (Fresher)',
      targetCompany: targetCompany || 'Top Indian Product-Based Company',
    });

    await newUser.save();

    const token = this.generateToken(newUser._id);
    return {
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        targetRole: newUser.targetRole,
      },
    };
  }

  static async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = this.generateToken(user._id);
    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        targetRole: user.targetRole,
      },
    };
  }

  static async getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    return user;
  }
}

module.exports = AuthService;
