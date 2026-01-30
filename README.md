# 🎯 AI Placement Interview Simulator

An advanced, AI-powered mock interview platform that simulates real technical interviewers from top Indian product-based companies. Features adaptive questioning, real-time feedback, and comprehensive performance analytics.

## ✨ Key Features

### 🤖 AI-Powered Interview Simulation
- **Claude AI Integration**: Real-time question generation and answer evaluation using Anthropic's Claude
- **Adaptive Difficulty**: Questions adjust based on candidate's performance
- **Follow-up Questions**: Intelligent follow-up prompts to test depth of understanding
- **Real Feedback**: Detailed feedback on correctness, clarity, completeness, and efficiency

### 📊 Interview Categories
- **DSA (Data Structures & Algorithms)**: Core programming concepts
- **Aptitude**: Logical reasoning and problem-solving
- **System Design**: Architecture and scalability design
- **HR Rounds**: Behavioral and situational questions

### 📈 Performance Analytics
- **Scoring System**: Automated scoring based on multiple metrics
- **Weakness Detection**: Identifies areas needing improvement
- **Performance Metrics**:
  - Accuracy Rate
  - Consistency Score
  - Communication Score
  - Conceptual Understanding
- **Category-wise Analysis**: Track performance across different interview types
- **Progress Tracking**: Historical data and trends

### 👤 User Management
- **Secure Authentication**: JWT-based authentication
- **User Profiles**: Set target role and company
- **Interview History**: Complete record of all interviews
- **Performance Dashboard**: Visual analytics and insights

## 🏗️ Tech Stack

### Backend
- **Node.js + Express.js**: REST API server
- **MongoDB**: NoSQL database for flexible schema
- **Mongoose**: MongoDB object modeling
- **JWT**: Secure authentication
- **Claude AI SDK**: AI-powered interview logic
- **bcryptjs**: Password encryption

### Frontend
- **React 18**: UI framework
- **React Router v6**: Navigation
- **Tailwind CSS**: Styling
- **Recharts**: Data visualization
- **Axios**: HTTP client

### Database
- **MongoDB**: Main database
  - Users collection
  - Interviews collection
  - Questions collection
  - Answers collection
  - Performance metrics collection

## 📋 Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or cloud)
- Anthropic API Key (for Claude AI)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd My_Project
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your credentials
# MONGODB_URI=mongodb://localhost:27017/interview-simulator
# JWT_SECRET=your_secret_key_here
# CLAUDE_API_KEY=your_anthropic_api_key
# PORT=5000
```

### 3. Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file (optional)
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### 4. Start MongoDB (if running locally)
```bash
# On Windows (if MongoDB is installed)
mongod

# Or use MongoDB Atlas cloud version
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App opens on http://localhost:3000
```

## 📚 API Documentation

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "targetRole": "Software Engineer (Fresher)"
}

Response: { token, user }
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { token, user }
```

#### Get Profile
```
GET /api/auth/profile
Authorization: Bearer <token>

Response: { user object }
```

### Interview Endpoints

#### Start Interview
```
POST /api/interview/start
Authorization: Bearer <token>
Content-Type: application/json

{
  "interviewType": "DSA",
  "difficulty": "Easy"
}

Response: { interviewId, question }
```

#### Submit Answer
```
POST /api/interview/answer
Authorization: Bearer <token>
Content-Type: application/json

{
  "interviewId": "...",
  "questionId": "...",
  "answerText": "Your answer here",
  "timeSpent": 120
}

Response: { 
  nextQuestion OR interviewComplete with feedback 
}
```

#### Get Interview History
```
GET /api/interview/history
Authorization: Bearer <token>

Response: [ { interview objects } ]
```

#### Get Interview Details
```
GET /api/interview/:interviewId
Authorization: Bearer <token>

Response: { interview with questions and answers }
```

#### Get Analytics
```
GET /api/interview/analytics/dashboard
Authorization: Bearer <token>

Response: { 
  totalInterviews,
  averageScore,
  categoryAverages,
  recentInterviews
}
```

## 🎮 Usage Guide

### Taking an Interview

1. **Login/Register**: Create account or log in
2. **Select Interview Type**: Choose DSA, Aptitude, System Design, or HR
3. **Choose Difficulty**: Start with Easy and progress
4. **Answer Questions**: Provide detailed answers to AI-generated questions
5. **Receive Feedback**: Get instant feedback with improvement suggestions
6. **Review Results**: See overall score and performance metrics
7. **Track Progress**: Monitor improvement in analytics dashboard

### Understanding Scores

- **0-40**: Needs significant improvement
- **40-60**: Average performance, requires more practice
- **60-80**: Good performance, minor improvements needed
- **80-100**: Excellent performance, ready for interviews

## 📊 Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  targetRole: String,
  targetCompany: String,
  totalInterviews: Number,
  averageScore: Number,
  lastInterviewDate: Date
}
```

### Interview Schema
```javascript
{
  userId: ObjectId,
  interviewType: String (DSA|Aptitude|System Design|HR),
  difficulty: String (Easy|Medium|Hard),
  totalScore: Number,
  status: String (ongoing|completed|abandoned),
  questions: [ObjectId],
  answers: [ObjectId],
  feedback: Object,
  performanceMetrics: Object
}
```

### Question Schema
```javascript
{
  interviewId: ObjectId,
  questionText: String,
  category: String,
  difficulty: String,
  expectedConceptsCovered: [String],
  timeLimit: Number
}
```

### Answer Schema
```javascript
{
  questionId: ObjectId,
  interviewId: ObjectId,
  userId: ObjectId,
  answerText: String,
  evaluation: {
    correctness: Number,
    clarity: Number,
    completeness: Number,
    efficiency: Number
  },
  feedback: String,
  score: Number
}
```

## 🔧 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/interview-simulator
JWT_SECRET=your_super_secret_key_change_in_production
CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🤖 AI Integration Details

### Claude AI Features

**Question Generation**:
- Analyzes difficulty level and category
- Considers previous answers quality
- Generates practical, real-world questions
- Creates expected concepts list for evaluation

**Answer Evaluation**:
```javascript
{
  correctness: 0-100,    // How accurate is the solution
  clarity: 0-100,        // Explanation quality
  completeness: 0-100,   // All aspects covered
  efficiency: 0-100,     // Optimization level
  feedback: String,      // Detailed feedback
  improvements: [String],// Specific suggestions
  followUp: String       // Follow-up question
}
```

**Final Feedback**:
- Overall assessment
- Key strengths identification
- Areas for improvement
- Learning recommendations
- Confidence level assessment

## 📈 Performance Metrics Explained

- **Accuracy Rate**: Percentage of correct answers
- **Consistency Score**: How consistently well you perform
- **Communication Score**: Clarity of explanation
- **Conceptual Understanding**: Depth of knowledge

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Protected API routes
- ✅ CORS enabled
- ✅ Input validation and sanitization

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongod --version

# Use MongoDB Atlas connection string for cloud
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
```

### Claude API Key Issues
- Get your API key from [Anthropic Console](https://console.anthropic.com)
- Ensure key is added to backend `.env`

### Frontend Not Connecting to Backend
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Check CORS settings in backend

## 📝 Project Structure

```
My_Project/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── claudeClient.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Interview.js
│   │   ├── Question.js
│   │   ├── Answer.js
│   │   └── Performance.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── interview.js
│   ├── services/
│   │   ├── authService.js
│   │   └── interviewService.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Interview.js
│   │   │   └── Results.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .gitignore
│
├── .gitignore
└── README.md
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
```bash
# Add Procfile
echo "web: node server.js" > backend/Procfile

# Deploy with your chosen platform
```

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the build folder
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Built with Claude AI by Anthropic
- React ecosystem
- MongoDB for reliable data storage
- Tailwind CSS for beautiful UI

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Contact: support@interviewsimulator.com

---

**Happy Interviewing! 🎯**

Master your interview skills with AI-powered practice sessions and detailed feedback.
