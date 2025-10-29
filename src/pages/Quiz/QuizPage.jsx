/**
 * Page: QuizPage
 * Purpose: Display quiz questions with timer and navigation
 * Features: Question display, answer selection, timer countdown, progress tracking
 */

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import QuizHeader from '../../components/quiz/QuizHeader';
import QuestionCard from '../../components/quiz/QuestionCard';
import Modal from '../../components/common/Modal';
import { fetchQuestions, submitAnswers } from '../../services/quizService';
import { useAuth } from '../../contexts/AuthContext';

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user, isRegistered } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startTime] = useState(Date.now());
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    // Redirect to home if not registered
    if (!isRegistered || !user) {
      navigate('/');
      return;
    }
    loadQuestions();
  }, [isRegistered, user, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Pause timer when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      // Note: In production, you might want to prevent this behavior
      // For now, timer continues regardless of tab visibility
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await fetchQuestions(quizId);
      setQuestions(data);
      // Restore saved progress
      const savedAnswers = localStorage.getItem(`quiz_${quizId}_answers`);
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    const questionId = questions[currentQuestionIndex]?.id;
    const newAnswers = { ...answers, [questionId]: answerIndex };
    setAnswers(newAnswers);
    // Save to localStorage
    localStorage.setItem(`quiz_${quizId}_answers`, JSON.stringify(newAnswers));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmit = () => {
    setShowSubmitModal(true);
  };

  const handleAutoSubmit = async () => {
    await submitQuiz();
  };

  const handleConfirmSubmit = async () => {
    await submitQuiz();
  };

  const submitQuiz = async () => {
    try {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const result = await submitAnswers(quizId, answers, questions, timeSpent);
      
      localStorage.setItem(`quiz_${quizId}_result`, JSON.stringify(result));
      localStorage.setItem('quiz_session_active', 'false');
      
      navigate(`/result/${quizId}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const getQuestionStatus = (index) => {
    const questionId = questions[index]?.id;
    if (answers[questionId] !== undefined) {
      return 'answered';
    }
    if (index === currentQuestionIndex) {
      return 'current';
    }
    return 'unanswered';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl">Đang tải câu hỏi...</div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion?.id];

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800 min-h-screen text-white p-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💡</span>
          </div>
          <h1 className="text-xs font-semibold text-gray-300 leading-tight mb-2">
            Cuộc thi Tìm hiểu pháp luật về sử dụng năng lượng tiết kiệm và hiệu quả
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-xs text-orange-400">Đang chơi</span>
          </div>
        </div>

        <div className="mb-6 p-3 bg-yellow-50 rounded-lg text-yellow-800 text-xs">
          <div className="flex items-center gap-2 mb-1">
            <span>⚠️</span>
            <strong>Đang chơi Quiz</strong>
          </div>
          <p>Menu bị khóa cho đến khi hoàn thành quiz</p>
        </div>

        <Sidebar currentPath="/quiz" onNavigate={() => {}} />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <QuizHeader
          user={user}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          timeRemaining={timeRemaining}
          onSubmit={handleSubmit}
        />

        <div className="flex">
          {/* Question area */}
          <div className="flex-1">
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleAnswerSelect}
              onPrev={handlePrev}
              onNext={handleNext}
              hasPrev={currentQuestionIndex > 0}
              hasNext={currentQuestionIndex < questions.length - 1}
            />
          </div>

          {/* Right sidebar */}
          <div className="w-64 bg-white p-4">
            {/* Question list */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Danh sách câu hỏi</h3>
              <div className="grid grid-cols-4 gap-2">
                {questions.map((q, index) => {
                  const status = getQuestionStatus(index);
                  return (
                    <button
                      key={q.id}
                      onClick={() => handleQuestionClick(index)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        status === 'answered'
                          ? 'border-2 border-green-500 bg-green-50 text-green-700'
                          : status === 'current'
                          ? 'border-2 border-orange-500 bg-orange-50 text-orange-700'
                          : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {q.id}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Candidate info */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Thông tin thí sinh</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>👤</span>
                  <span>{user?.fullname}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <span>{user?.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit confirmation modal */}
      <Modal isOpen={showSubmitModal} onClose={() => setShowSubmitModal(false)}>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Xác nhận nộp bài</h2>
          <p className="text-gray-600 mb-6">
            Bạn có chắc chắn muốn nộp bài? Sau khi nộp bài, bạn không thể thay đổi câu trả lời.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirmSubmit}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Nộp bài
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuizPage;
