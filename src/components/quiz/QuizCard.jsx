/**
 * Component: QuizCard
 * Purpose: Display basic info about a quiz (title, status, duration, etc.)
 * Used in: HomePage
 * Props: quiz, onStart
 */

const QuizCard = ({ quiz, onStart }) => {
  const isOpen = quiz.status === 'open';
  const statusText = isOpen ? 'Đang mở' : 'Đã đóng';
  const statusColor = isOpen ? 'bg-green-500' : 'bg-orange-500';

  return (
    <div className="bg-white rounded-xl shadow-md p-6 relative overflow-hidden">
      {/* Status badge */}
      <div className={`absolute top-4 right-4 ${statusColor} text-white px-3 py-1 rounded-full text-xs font-medium`}>
        {statusText}
      </div>

      {/* Quiz info */}
      <h3 className="text-lg font-bold text-green-700 mb-4 pr-24">
        {quiz.title}
      </h3>
      <p className="text-sm text-gray-600 mb-2">({quiz.subtitle})</p>

      {/* Details */}
      <div className="flex items-center gap-6 mb-6 text-gray-600">
        <div className="flex items-center gap-2">
          <span>📄</span>
          <span className="text-sm">{quiz.questionsCount} câu hỏi</span>
        </div>
        <div className="flex items-center gap-2">
          <span>⏱️</span>
          <span className="text-sm">{quiz.timeLimit} phút</span>
        </div>
      </div>

      {/* Action button */}
      <button
        onClick={onStart}
        disabled={!isOpen}
        className={`w-full py-3 rounded-lg font-medium transition-all ${
          isOpen
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}
      >
        ▶️ Bắt đầu chơi
      </button>
    </div>
  );
};

export default QuizCard;
