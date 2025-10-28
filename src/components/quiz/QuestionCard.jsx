/**
 * Component: QuestionCard
 * Purpose: Display a single question with options
 * Used in: QuizPage
 * Props: question, selectedAnswer, onSelectAnswer, onPrev, onNext, hasPrev, hasNext
 */

const QuestionCard = ({ question, selectedAnswer, onSelectAnswer, onPrev, onNext, hasPrev, hasNext }) => {
  if (!question) return null;

  const options = ['A', 'B', 'C'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto mt-6">
      {/* Question number */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-green-600">Câu {question.id}</h2>
      </div>

      {/* Question text */}
      <p className="text-lg text-gray-800 mb-8 leading-relaxed">
        {question.question}
      </p>

      {/* Options */}
      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          return (
            <button
              key={index}
              onClick={() => onSelectAnswer(index)}
              className={`w-full flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                isSelected ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {options[index]}
              </div>
              <p className="flex-1 text-left text-gray-700">{option}</p>
            </button>
          );
        })}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
            hasPrev
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          ← Câu trước
        </button>

        <span className="text-gray-600 font-medium">
          {question.id}/{20}
        </span>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
            hasNext
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Câu tiếp →
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
