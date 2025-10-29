/**
 * Routes: Quiz Routes
 * Purpose: Quiz attempt management endpoints
 * Endpoints: GET /api/quiz/attempts/:userId, POST /api/quiz/submit
 */

import express from "express";
import { body, validationResult } from "express-validator";
import QuizAttempt from "../models/QuizAttempt.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * GET /api/quiz/attempts/:userId
 * Get all quiz attempts for a user
 */
router.get("/attempts/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const attempts = await QuizAttempt.find({ userId })
      .sort({ submittedAt: -1 })
      .populate("userId", "fullName email phone");

    res.json(attempts);
  } catch (error) {
    console.error("Error fetching attempts:", error);
    res.status(500).json({
      message: "Error fetching quiz attempts",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/**
 * POST /api/quiz/submit
 * Submit quiz answers and save result
 */
router.post(
  "/submit",
  [
    body("quizId")
      .notEmpty()
      .withMessage("Quiz ID is required")
      .isNumeric()
      .withMessage("Quiz ID must be a number"),
    body("userId").notEmpty().withMessage("User ID is required"),
    body("answers").isObject().withMessage("Answers must be an object"),
    body("questions").isArray().withMessage("Questions must be an array"),
    body("timeSpent")
      .isNumeric()
      .withMessage("Time spent must be a number")
      .isInt({ min: 0 })
      .withMessage("Time spent must be a positive integer"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { quizId, userId, answers, questions, timeSpent } = req.body;

      // Verify user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Calculate score
      let correctCount = 0;
      questions.forEach((q) => {
        const userAnswer = answers[q.id.toString()] || answers[q.id];
        if (userAnswer !== undefined && userAnswer === q.correctAnswer) {
          correctCount++;
        }
      });

      const totalQuestions = questions.length;
      const percentage = Math.round((correctCount / totalQuestions) * 100);
      const score = percentage * 10; // Total score points

      // Create quiz attempt
      // Note: Mongoose Map type stores as plain object in MongoDB
      const quizAttempt = new QuizAttempt({
        userId,
        quizId: parseInt(quizId),
        answers: answers, // Mongoose Map will handle this automatically
        score,
        correctAnswers: correctCount,
        totalQuestions,
        percentage,
        timeSpent: parseInt(timeSpent),
        submittedAt: new Date(),
      });

      await quizAttempt.save();

      // Return result
      res.status(201).json({
        score,
        totalQuestions,
        correctAnswers: correctCount,
        percentage,
        timeSpent,
        attemptId: quizAttempt._id,
        submittedAt: quizAttempt.submittedAt,
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      res.status(500).json({
        message: "Error submitting quiz",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
);

export default router;
