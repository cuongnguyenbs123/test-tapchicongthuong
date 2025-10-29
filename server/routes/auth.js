/**
 * Routes: Auth Routes
 * Purpose: User registration and authentication endpoints
 * Endpoints: POST /api/auth/register
 */

import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required'),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[0-9]{10,11}$/).withMessage('Phone number must be 10-11 digits'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('gender')
    .notEmpty().withMessage('Gender is required')
    .isIn(['male', 'female', 'other']).withMessage('Invalid gender value'),
  body('unit')
    .trim()
    .notEmpty().withMessage('Unit is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { fullName, phone, email, gender, unit } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { phone: phone }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or phone already exists'
      });
    }

    // Create new user
    const user = new User({
      fullName,
      phone,
      email: email.toLowerCase(),
      gender,
      unit
    });

    await user.save();

    // Return user data (excluding sensitive info if needed)
    res.status(201).json({
      _id: user._id,
      id: user._id,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      gender: user.gender,
      unit: user.unit,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Error registering user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
