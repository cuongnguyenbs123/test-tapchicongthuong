# Backend Setup Guide

## Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-app?retryWrites=true&w=majority

# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new cluster (select M0 Sandbox - Free tier)
3. Create a database user:
   - Database Access → Add New Database User
   - Choose a username and password
   - Save the credentials securely
4. Whitelist your IP address:
   - Network Access → Add IP Address
   - For development, use `0.0.0.0/0` (allows all IPs - not recommended for production)
5. Get your connection string:
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database>` with your database name (e.g., `quiz-app`)

## Installation

```bash
cd server
npm install
```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `GET /api/quiz/attempts/:userId` - Get user's quiz attempts
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/leaderboard/:quizId` - Get leaderboard for a quiz
