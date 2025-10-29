# Quiz App Setup Guide

This guide will help you set up both the frontend and backend for the Quiz App.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (free tier is sufficient)

## Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file in the root directory (optional):

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

3. Run development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Backend Setup

1. Navigate to server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in `server/` directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-app?retryWrites=true&w=majority
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. See `server/SETUP.md` for detailed MongoDB Atlas setup instructions

5. Run the server:

```bash
npm run dev
```

The backend will run on `http://localhost:3001`

## MongoDB Atlas Setup

### Step 1: Create Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account

### Step 2: Create Cluster

1. Click "Build a Database"
2. Select "M0 Sandbox" (Free tier)
3. Choose a cloud provider and region
4. Click "Create"

### Step 3: Create Database User

1. Go to "Database Access" → "Add New Database User"
2. Choose "Password" authentication
3. Enter username and generate a secure password
4. Save the password securely (you won't see it again)
5. Set privileges to "Atlas admin" or custom role
6. Click "Add User"

### Step 4: Configure Network Access

1. Go to "Network Access" → "Add IP Address"
2. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
3. For production, add specific IP addresses
4. Click "Confirm"

### Step 5: Get Connection String

1. Go to "Clusters" → Click "Connect"
2. Select "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<database>` with `quiz-app` (or your preferred database name)
6. Add this to your `server/.env` file as `MONGODB_URI`

Example connection string:

```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/quiz-app?retryWrites=true&w=majority
```

## Running Both Frontend and Backend

### Option 1: Run Separately

Open two terminal windows:

- Terminal 1: `npm run dev` (frontend)
- Terminal 2: `cd server && npm run dev` (backend)

### Option 2: Use npm scripts (requires running separately)

```bash
# Install all dependencies
npm run install:all

# Run frontend
npm run dev

# In another terminal, run backend
npm run server:dev
```

## Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── RegistrationForm.jsx
│   │   ├── common/
│   │   ├── layout/
│   │   └── quiz/
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── quizService.js
│   │   └── leaderboardService.js
│   └── App.jsx
├── server/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   └── QuizAttempt.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── quiz.js
│   │   └── leaderboard.js
│   ├── index.js
│   └── package.json
└── package.json
```

## Troubleshooting

### MongoDB Connection Issues

- Verify your connection string is correct
- Check that your IP is whitelisted
- Verify database user credentials
- Ensure cluster is running (not paused)

### CORS Errors

- Make sure `FRONTEND_URL` in `server/.env` matches your frontend URL
- Verify backend is running on the correct port

### Port Already in Use

- Change `PORT` in `server/.env` to a different port
- Update `VITE_API_BASE_URL` in frontend `.env` accordingly
