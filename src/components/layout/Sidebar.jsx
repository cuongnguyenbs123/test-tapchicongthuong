/**
 * Component: Sidebar
 * Purpose: Navigation sidebar for the quiz application
 * Props: currentPath, onNavigate
 */

import { Link } from 'react-router-dom';

const Sidebar = ({ currentPath, onNavigate }) => {
  const navigation = [
    { 
      path: '/', 
      label: 'Trang chủ', 
      icon: '🏠',
      description: 'Về trang chính',
      key: 'home'
    },
    { 
      path: '/quizzes', 
      label: 'Tất cả Quiz', 
      icon: '🏆',
      description: 'Xem tất cả quiz',
      key: 'quizzes'
    }
  ];

  return (
    <div className="w-64 bg-gray-800 min-h-screen text-white p-6">
      {/* Logo/Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">
            💡
          </div>
        </div>
        <h1 className="text-sm font-semibold text-gray-300 leading-tight">
          Cuộc thi Tìm hiểu pháp luật về sử dụng năng lượng tiết kiệm và hiệu quả
        </h1>
      </div>

      {/* Navigation */}
      <div className="mb-6">
        <h2 className="text-xs uppercase font-semibold text-gray-500 mb-3">
          ĐIỀU HƯỚNG
        </h2>
        
        <div className="space-y-2">
          <Link
            to="/"
            onClick={() => onNavigate('/')}
            className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
              currentPath === '/'
                ? 'bg-green-500 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="text-xl">🏠</span>
            <div className="flex-1">
              <div className="font-medium">Trang chủ</div>
              <div className="text-xs opacity-70">Về trang chính</div>
            </div>
          </Link>

          <Link
            to="/"
            onClick={() => onNavigate('/')}
            className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
              currentPath === '/quizzes'
                ? 'bg-green-500 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="text-xl">🏆</span>
            <div className="flex-1">
              <div className="font-medium">Tất cả Quiz</div>
            </div>
          </Link>
        </div>
      </div>

      {/* User info (if available) */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            NC
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">Nguyễn Đại Cương</div>
            <div className="text-xs text-gray-400 truncate">0392536967</div>
            <div className="flex items-center gap-1 text-xs text-green-400 mt-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Đã đăng nhập
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
