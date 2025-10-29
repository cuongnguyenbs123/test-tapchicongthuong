/**
 * Service: authService
 * Purpose: Authentication API calls
 * Features: User registration
 */

import api from './api';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.fullName - User's full name
 * @param {string} userData.phone - User's phone number
 * @param {string} userData.email - User's email
 * @param {string} userData.gender - User's gender (male/female/other)
 * @param {string} userData.unit - User's unit/affiliation
 * @returns {Promise<Object>} Registered user data
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response;
  } catch (error) {
    throw error;
  }
};
