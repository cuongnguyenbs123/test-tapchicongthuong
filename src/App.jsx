/**
 * Component: App
 * Purpose: Root component with routing configuration
 * Routes: Home, Quiz, Result, Leaderboard
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/Home/HomePage';
import QuizPage from './pages/Quiz/QuizPage';
import ResultPage from './pages/Result/ResultPage';
import LeaderboardPage from './pages/Leaderboard/LeaderboardPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isRegistered } = useAuth();
  
  if (!isRegistered) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/quiz/:quizId" 
        element={
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        } 
      />
      <Route path="/result/:quizId" element={<ResultPage />} />
      <Route path="/leaderboard/:quizId" element={<LeaderboardPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
