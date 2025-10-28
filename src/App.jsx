/**
 * Component: App
 * Purpose: Root component with routing configuration
 * Routes: Home, Quiz, Result, Leaderboard
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import QuizPage from './pages/Quiz/QuizPage';
import ResultPage from './pages/Result/ResultPage';
import LeaderboardPage from './pages/Leaderboard/LeaderboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route path="/result/:quizId" element={<ResultPage />} />
        <Route path="/leaderboard/:quizId" element={<LeaderboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
