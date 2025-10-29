/**
 * Service: leaderboardService
 * Purpose: Leaderboard API calls
 * Features: Fetch leaderboard data
 */

import api from './api';

/**
 * Fetch leaderboard for a specific quiz
 * @param {string|number} quizId - The quiz ID
 * @returns {Promise<Array>} Leaderboard data with rankings
 */
export const fetchLeaderboard = async (quizId) => {
  try {
    const response = await api.get(`/leaderboard/${quizId}`);
    return response;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};
