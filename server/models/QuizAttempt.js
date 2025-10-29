/**
 * Model: QuizAttempt
 * Purpose: Quiz attempt schema for MongoDB
 * Fields: userId, quizId, answers, score, correctAnswers, timeSpent, submittedAt
 */

import mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  quizId: {
    type: Number,
    required: true,
    index: true
  },
  answers: {
    type: Map,
    of: Number,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  correctAnswers: {
    type: Number,
    required: true,
    min: 0
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  timeSpent: {
    type: Number, // in seconds
    required: true,
    min: 0
  },
  submittedAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Compound index for efficient leaderboard queries
quizAttemptSchema.index({ quizId: 1, score: -1, submittedAt: 1 });
quizAttemptSchema.index({ userId: 1, quizId: 1 });

const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);

export default QuizAttempt;
