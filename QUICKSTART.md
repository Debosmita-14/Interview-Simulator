# AI Placement Interview Simulator - Quick Start Guide

## Getting Started in 5 Minutes

### Prerequisites
- Node.js installed
- MongoDB running (local or Atlas)
- Anthropic API Key

### Step 1: Configure Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with:
# MONGODB_URI=mongodb://localhost:27017/interview-simulator
# JWT_SECRET=your_secret_key_here
# CLAUDE_API_KEY=sk-ant-xxxxx
# PORT=5000

# Start backend
npm run dev
```

### Step 2: Configure Frontend

```bash
# In another terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend
npm start
```

### Step 3: Access the App

Open http://localhost:3000 in your browser

## Features Explained

### Interview Types
- **DSA**: Data Structure & Algorithm questions
- **Aptitude**: Logical reasoning questions
- **System Design**: Architecture design questions
- **HR**: Behavioral interview questions

### How It Works

1. **Start Interview**: Select type and difficulty
2. **AI Questions**: Claude generates smart questions
3. **Answer**: Type your detailed answer
4. **Evaluation**: AI evaluates on 4 metrics
5. **Feedback**: Get improvement suggestions
6. **Results**: See overall performance

## API Overview

### Auth Routes
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile

### Interview Routes
- `POST /api/interview/start` - Start new interview
- `POST /api/interview/answer` - Submit answer
- `GET /api/interview/history` - Interview history
- `GET /api/interview/:id` - Interview details
- `GET /api/interview/analytics/dashboard` - Performance stats

## Database Models

### User
- Email (unique)
- Password (hashed)
- Target Role
- Interview Stats

### Interview
- Type (DSA/Aptitude/System Design/HR)
- Questions
- Answers
- Score
- Feedback

### Question
- Text
- Category
- Difficulty
- Expected Concepts

### Answer
- Text
- Evaluation Scores
- Feedback
- Time Spent

## Scoring Metrics

Each answer is scored on:
- **Correctness (0-100)**: Accuracy of solution
- **Clarity (0-100)**: Quality of explanation
- **Completeness (0-100)**: Coverage of aspects
- **Efficiency (0-100)**: Optimization level

**Final Score** = Average of all metrics

## Performance Analytics

Dashboard shows:
- Total interviews taken
- Average score across all interviews
- Category-wise performance
- Recent interview history
- Trending performance

## Troubleshooting

### Backend won't start?
- Check MongoDB is running
- Verify .env file exists
- Check port 5000 is free

### Frontend shows 404?
- Verify backend is running on port 5000
- Check REACT_APP_API_URL in .env

### AI questions not generating?
- Verify CLAUDE_API_KEY is correct
- Check Anthropic API quota

## Next Steps

1. Run interviews across different categories
2. Review performance dashboard
3. Practice weak areas
4. Track improvement over time

Happy interviewing! 🚀
