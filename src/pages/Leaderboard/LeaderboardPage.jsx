/**
 * Page: LeaderboardPage
 * Purpose: Display leaderboard with top players and their stats
 * Features: Rank table with name, correct answers, attempts, completion time, score
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import { fetchLeaderboard } from '../../services/quizService';

const LeaderboardPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await fetchLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    }
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'border-l-4 border-yellow-400';
    if (rank === 2) return 'border-l-4 border-gray-400';
    if (rank === 3) return 'border-l-4 border-orange-400';
    return 'border-l-4 border-transparent';
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              ← Quay lại
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Bảng xếp hạng</h1>
            <p className="text-gray-600 mt-2">Top những người chơi xuất sắc nhất</p>
          </div>

          {/* Leaderboard table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Thông tin cuộc thi</h2>
              <h3 className="text-lg font-medium text-gray-600 mt-2">Bảng xếp hạng</h3>
            </div>

            <div className="divide-y divide-gray-200">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`p-6 hover:bg-gray-50 transition-colors ${getRankColor(entry.rank)}`}
                >
                  <div className="flex items-center gap-6">
                    {/* Rank */}
                    <div className="text-3xl font-bold text-gray-400 w-12 text-center">
                      {entry.rank}
                    </div>

                    {/* Name */}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-800">{entry.name}</h4>
                      <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <span className="text-green-500">✓</span>
                          {entry.correctAnswers} câu đúng
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-blue-500">👁️</span>
                          {entry.attempts} lần chơi
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-orange-500">⏰</span>
                          {entry.completionTime}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                        <span className="text-green-600">🎓</span>
                        {entry.affiliation}
                      </p>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end mb-1">
                        <span className="text-orange-500">🏆</span>
                        <span className="text-3xl font-bold text-gray-800">{entry.score}</span>
                      </div>
                      <span className="text-gray-600">điểm</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Back button */}
          <div className="mt-8">
            <button
              onClick={() => navigate('/')}
              className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              ← Về trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;