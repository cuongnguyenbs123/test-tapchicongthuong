/**
 * Model: User
 * Purpose: User schema for MongoDB
 * Fields: fullName, phone, email, gender, unit, createdAt
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[0-9]{10,11}$/, 'Please enter a valid phone number (10-11 digits)'],
    index: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    index: true
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other']
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    trim: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index to ensure unique email and phone
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });

const User = mongoose.model('User', userSchema);

export default User;
