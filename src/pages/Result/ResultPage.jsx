/**
 * Page: ResultPage
 * Purpose: Display quiz results with score and user information
 * Features: Score display, correct answers count, percentage, personal info
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../contexts/AuthContext';

const ResultPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = () => {
    const savedResult = localStorage.getItem(`quiz_${quizId}_result`);
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  };

  const getPerformanceText = (percentage) => {
    if (percentage >= 80) return 'Xuất sắc';
    if (percentage >= 60) return 'Khá';
    if (percentage >= 40) return 'Trung bình';
    if (percentage >= 20) return 'Cần cải thiện';
    return 'Cần cải thiện';
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50';
    if (percentage >= 60) return 'text-blue-600 bg-blue-50';
    if (percentage >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  if (!result) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl">Đang tải kết quả...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          {/* Result card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">🏆</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-3">Kết quả</h1>
              <p className="text-gray-600">Chúc mừng bạn đã hoàn thành bài kiểm tra!</p>
              
              {/* Performance badge */}
              <div className={`inline-block px-4 py-2 rounded-full mt-4 ${getPerformanceColor(result.percentage)}`}>
                <span className="font-semibold">{result.percentage}%</span>
                <span className="ml-2">{getPerformanceText(result.percentage)}</span>
              </div>
            </div>

            {/* Score and correct boxes */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Score */}
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{result.score}</div>
                <div className="text-gray-600">Điểm số</div>
              </div>

              {/* Correct answers */}
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">✓</div>
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {result.correctAnswers}/{result.totalQuestions}
                </div>
                <div className="text-gray-600">Câu đúng</div>
              </div>
            </div>

            {/* User information */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Thông tin thí sinh</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <span>👤</span>
                  <span>{user?.fullname || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span>📞</span>
                  <span>{user?.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span>📧</span>
                  <span>{user?.email || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span>⚧️</span>
                  <span>{user?.gender === 'male' ? 'Nam' : user?.gender === 'female' ? 'Nữ' : 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/leaderboard/${quizId}`)}
                className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                🏆 Bảng xếp hạng
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                ← Trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
