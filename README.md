# Online Quiz Competition Website

A full-featured React web application for online quiz competitions, built with React, TailwindCSS, and React Router v7.

## 🎯 Features

- **Home Page**: Displays all available quizzes with status, duration, and question count
- **Quiz Introduction Modal**: Tabbed interface showing Introduction, Rules, Rewards, and Leaderboard
- **Quiz Page**: 
  - Timer countdown (30 minutes default)
  - One question at a time with multiple choice answers
  - Previous/Next navigation
  - Question list sidebar with status indicators
  - Progress tracking and answer persistence
- **Result Page**: Shows score, correct answers, percentage, and user information
- **Leaderboard Page**: Displays top players with rankings, stats, and completion times

## 🛠️ Tech Stack

- **React** 18.2
- **React Router** v7
- **TailwindCSS** 3.4
- **Vite** 5.0
- **localStorage** for state persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── common/
│   │   └── Modal.jsx          # Reusable modal component
│   ├── layout/
│   │   ├── Layout.jsx         # Main layout wrapper
│   │   └── Sidebar.jsx        # Navigation sidebar
│   └── quiz/
│       ├── QuizCard.jsx       # Quiz card display
│       ├── QuizHeader.jsx     # Quiz page header
│       └── QuestionCard.jsx   # Question display component
├── pages/
│   ├── Home/
│   │   └── HomePage.jsx       # Home page with quiz list
│   ├── Quiz/
│   │   └── QuizPage.jsx       # Active quiz page
│   ├── Result/
│   │   └── ResultPage.jsx     # Quiz results display
│   └── Leaderboard/
│       └── LeaderboardPage.jsx # Rankings display
├── services/
│   └── quizService.js         # Mock API layer
├── hooks/
│   └── useLocalStorage.js     # Custom localStorage hook
├── styles/
│   └── index.css              # Global styles
└── App.jsx                    # Main app component with routing
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 💾 Local Storage

The app uses localStorage to persist:
- User information (`quiz_logged_user`)
- Quiz session state (`quiz_session_active`)
- Answer progress (`quiz_{quizId}_answers`)
- Quiz results (`quiz_{quizId}_result`)

## 🎨 Styling

The UI is styled with TailwindCSS and follows a modern, clean design with:
- Soft color gradients
- Rounded edges
- Elegant spacing
- Subtle animations
- Fully responsive layout

## 📝 Mock Data

The app uses mock data from `src/services/quizService.js`:
- Sample quizzes with different statuses
- 20 questions per quiz
- Leaderboard data with top performers

## 🎯 Usage Flow

1. **Home**: View all available quizzes
2. **Start Quiz**: Click "Bắt đầu chơi" (Start Playing) on an open quiz
3. **Quiz Modal**: Review introduction, rules, and rewards
4. **Quiz Page**: Answer questions with timer running
5. **Submit**: Review answers before final submission
6. **Result**: View score and performance
7. **Leaderboard**: See top performers

## 📄 Code Conventions

- Each component/page starts with a comment block describing its purpose
- Self-documenting code with meaningful variable names
- Clean separation between UI and logic
- Organized Tailwind class strings
- Modular, reusable components

## 🎓 Future Enhancements

- Real backend API integration
- User authentication
- Question randomization
- Advanced analytics
- Social sharing features
- Multi-language support

## 📄 License

MIT
