/**
 * Component: QuizHeader
 * Purpose: Display quiz header with user info, timer, and progress
 * Used in: QuizPage
 * Props: user, currentQuestion, totalQuestions, timeRemaining, onSubmit
 */

const QuizHeader = ({ user, currentQuestion, totalQuestions, timeRemaining, onSubmit }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span>👤</span>
          <span>{user?.fullname || 'User'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📶</span>
          <span>Đang trực tuyến</span>
        </div>
        <div className="text-lg font-semibold">
          {currentQuestion}/{totalQuestions} câu
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span>⏰</span>
          <span className="font-mono text-xl">{formatTime(timeRemaining)}</span>
        </div>
        <button
          onClick={onSubmit}
          className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          NỘP BÀI
        </button>
      </div>
    </div>
  );
};

export default QuizHeader;