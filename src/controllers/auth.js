const { hashPassword, comparePassword, generateToken } = require('../config/auth');
const { getDB } = require('../config/database');
const logger = require('../utils/logger');

async function register(req, res) {
  try {
    const db = await getDB();
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await db.collection('users').findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Username or email already exists'
      });
    }

    // Create new user
    const hashedPassword = await hashPassword(password);
    const result = await db.collection('users').insertOne({
      username,
      email,
      password: hashedPassword,
      role: 'member',
      createdAt: new Date(),
      status: 'active'
    });

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully'
    });

  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Registration failed'
    });
  }
}

async function login(req, res) {
  try {
    const db = await getDB();
    const { username, password } = req.body;

    // Find user
    const user = await db.collection('users').findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: username.toLowerCase() }
      ]
    });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user);

    // Update last login
    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    );

    res.json({
      status: 'success',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Login failed'
    });
  }
}

module.exports = {
  register,
  login
};