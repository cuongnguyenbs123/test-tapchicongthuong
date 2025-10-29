/**
 * Routes: Leaderboard Routes
 * Purpose: Leaderboard data endpoints
 * Endpoints: GET /api/leaderboard/:quizId
 */

import express from 'express';
import QuizAttempt from '../models/QuizAttempt.js';
import User from '../models/User.js';

const router = express.Router();

/**
 * GET /api/leaderboard/:quizId
 * Get leaderboard for a specific quiz
 * Returns: Top players ranked by score (then by time, then by submission date)
 */
router.get('/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    const quizIdNum = parseInt(quizId);

    if (isNaN(quizIdNum)) {
      return res.status(400).json({ message: 'Invalid quiz ID' });
    }

    // Get all attempts for this quiz, sorted by score (desc), then time (asc), then submittedAt (asc)
    const attempts = await QuizAttempt.find({ quizId: quizIdNum })
      .populate('userId', 'fullName unit')
      .sort({
        score: -1,
        timeSpent: 1,
        submittedAt: 1
      })
      .limit(100); // Limit to top 100

    // Group by user to get best attempt per user and count attempts
    const userMap = new Map();

    attempts.forEach((attempt) => {
      const userId = attempt.userId._id.toString();
      
      if (!userMap.has(userId)) {
        userMap.set(userId, {
          userId: attempt.userId._id,
          name: attempt.userId.fullName,
          affiliation: attempt.userId.unit || '',
          bestAttempt: attempt,
          attempts: []
        });
      }

      userMap.get(userId).attempts.push(attempt);
    });

    // Convert to array and sort by best score
    let leaderboard = Array.from(userMap.values())
      .map((userData) => {
        const bestAttempt = userData.bestAttempt;
        return {
          rank: 0, // Will be set below
          userId: userData.userId,
          name: userData.name,
          affiliation: userData.affiliation,
          correctAnswers: bestAttempt.correctAnswers,
          attempts: userData.attempts.length,
          completionTime: formatTime(bestAttempt.timeSpent),
          score: bestAttempt.score,
          percentage: bestAttempt.percentage,
          submittedAt: bestAttempt.submittedAt
        };
      })
      .sort((a, b) => {
        // Sort by score (desc), then time (asc), then submission date (asc)
        if (b.score !== a.score) return b.score - a.score;
        const timeA = a.completionTime.split(':').reduce((acc, val, i) => acc + parseInt(val) * Math.pow(60, 2 - i), 0);
        const timeB = b.completionTime.split(':').reduce((acc, val, i) => acc + parseInt(val) * Math.pow(60, 2 - i), 0);
        if (timeA !== timeB) return timeA - timeB;
        return new Date(a.submittedAt) - new Date(b.submittedAt);
      })
      .slice(0, 100); // Top 100

    // Assign ranks
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({
      message: 'Error fetching leaderboard',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * Helper function to format time in seconds to HH:MM:SS
 */
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default router;
