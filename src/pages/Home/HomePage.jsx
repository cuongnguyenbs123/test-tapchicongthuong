/**
 * Page: HomePage
 * Purpose: Display list of available quizzes with their details
 * Features: Quiz cards, introduction modal with tabs
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import QuizCard from '../../components/quiz/QuizCard';
import Modal from '../../components/common/Modal';
import RegistrationForm from '../../components/auth/RegistrationForm';
import { fetchQuizzes } from '../../services/quizService';
import { useAuth } from '../../contexts/AuthContext';

const HomePage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('intro');
  const navigate = useNavigate();
  const { isRegistered, register } = useAuth();

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const data = await fetchQuizzes();
      setQuizzes(data);
    } catch (error) {
      console.error('Error loading quizzes:', error);
    }
  };

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    if (isRegistered) {
      setIsModalOpen(true);
    } else {
      setIsRegistrationModalOpen(true);
    }
  };

  const handleStartQuizNow = () => {
    if (selectedQuiz) {
      setIsModalOpen(false);
      navigate(`/quiz/${selectedQuiz.id}`);
    }
  };

  const handleRegistrationSuccess = (userData) => {
    register(userData);
    setIsRegistrationModalOpen(false);
    // Show intro modal after successful registration
    setIsModalOpen(true);
  };

  const handleRegistrationCancel = () => {
    setIsRegistrationModalOpen(false);
    setSelectedQuiz(null);
  };

  const tabs = [
    { id: 'intro', label: 'Giới thiệu' },
    { id: 'rules', label: 'Điều lệ' },
    { id: 'rewards', label: 'Cơ cấu giải thưởng' },
    { id: 'leaderboard', label: 'Bảng xếp hạng' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'intro':
        return (
          <div className="text-gray-700 space-y-4">
            <p>{selectedQuiz?.description}</p>
            <p>Cuộc thi nhằm mục đích góp phần nâng cao nhận thức của cộng đồng.</p>
            <p>Tạo điều kiện để công chúng hiểu và áp dụng các quy định về sử dụng năng lượng tiết kiệm, góp phần thúc đẩy phát triển kinh tế bền vững.</p>
          </div>
        );
      case 'rules':
        return (
          <div className="text-gray-700 space-y-4">
            <p>Thí sinh có thời gian {selectedQuiz?.timeLimit} phút để hoàn thành {selectedQuiz?.questionsCount} câu hỏi.</p>
            <p>Không được phép quay lại trang trước sau khi nộp bài.</p>
            <p>Mỗi câu chỉ có một đáp án đúng.</p>
          </div>
        );
      case 'rewards':
        return (
          <div className="text-gray-700 space-y-4">
            <p>Giải Nhất: 10 triệu đồng</p>
            <p>Giải Nhì: 5 triệu đồng</p>
            <p>Giải Ba: 3 triệu đồng</p>
          </div>
        );
      case 'leaderboard':
        return (
          <div className="text-gray-700">
            <p>Xem bảng xếp hạng sau khi hoàn thành bài thi.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            Cuộc thi Tìm hiểu pháp luật về sử dụng năng lượng tiết kiệm và hiệu quả
          </h1>
          <p className="text-gray-600">
            Được tổ chức bởi Bộ Công Thương, Cục Chuyển đổi số và Công nghệ, 
            Tạp chí Công Thương. Nằm trong khuôn khổ Chương trình quốc gia về sử dụng năng lượng 
            tiết kiệm và hiệu quả giai đoạn 2019-2030 (VNEEP3).
          </p>
        </div>

        {/* Quiz cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} onStart={() => handleStartQuiz(quiz)} />
          ))}
        </div>

        {/* Registration Modal */}
        <Modal isOpen={isRegistrationModalOpen} onClose={handleRegistrationCancel}>
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800 pr-8">
                Đăng ký tham gia cuộc thi
              </h2>
              <button
                onClick={handleRegistrationCancel}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="mb-4 text-gray-600">
              <p>Vui lòng điền thông tin để tiếp tục tham gia cuộc thi.</p>
            </div>
            <RegistrationForm
              onSuccess={handleRegistrationSuccess}
              onCancel={handleRegistrationCancel}
            />
          </div>
        </Modal>

        {/* Introduction Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-8">
            {/* Modal header */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800 pr-8">
                {selectedQuiz?.title} ({selectedQuiz?.subtitle})
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green-500 text-white rounded-t-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="min-h-[200px] mb-6">
              {renderTabContent()}
            </div>

            {/* Modal footer */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Đóng
              </button>
              <button
                onClick={handleStartQuizNow}
                disabled={selectedQuiz?.status !== 'open'}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                ▶️ Bắt đầu chơi ngay
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default HomePage;
