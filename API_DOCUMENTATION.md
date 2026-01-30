# API Endpoints Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### 1. Register User
```
POST /auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "targetRole": "Software Engineer (Fresher)",
  "targetCompany": "TCS"
}

Response (201 Created):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "60d5ec49c1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com",
    "targetRole": "Software Engineer (Fresher)"
  }
}

Errors:
- 400: Invalid input or user already exists
- 500: Server error
```

### 2. Login User
```
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "60d5ec49c1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com",
    "targetRole": "Software Engineer (Fresher)"
  }
}

Errors:
- 400: Invalid email or password
- 401: Unauthorized
- 500: Server error
```

### 3. Get User Profile
```
GET /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

Response (200 OK):
{
  "_id": "60d5ec49c1234567890abcd",
  "name": "John Doe",
  "email": "john@example.com",
  "targetRole": "Software Engineer (Fresher)",
  "targetCompany": "TCS",
  "totalInterviews": 5,
  "averageScore": 75.5,
  "lastInterviewDate": "2024-01-20T10:30:00Z",
  "createdAt": "2024-01-15T08:00:00Z"
}

Errors:
- 401: No token or invalid token
- 500: Server error
```

## Interview Endpoints

### 4. Start New Interview
```
POST /interview/start
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "interviewType": "DSA",
  "difficulty": "Easy"
}

Valid Interview Types: "DSA", "Aptitude", "System Design", "HR"
Valid Difficulties: "Easy", "Medium", "Hard"

Response (201 Created):
{
  "interviewId": "60d5ec49c1234567890abce",
  "question": {
    "id": "60d5ec49c1234567890abcf",
    "text": "Explain the concept of recursion with an example.",
    "timeLimit": 300,
    "sequenceNumber": 1
  }
}

Errors:
- 400: Invalid interview type or difficulty
- 401: Unauthorized
- 500: Server error
```

### 5. Submit Answer
```
POST /interview/answer
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "interviewId": "60d5ec49c1234567890abce",
  "questionId": "60d5ec49c1234567890abcf",
  "answerText": "Recursion is a programming technique where a function calls itself...",
  "timeSpent": 120
}

Response (200 OK) - Not Last Question:
{
  "interviewComplete": false,
  "nextQuestion": {
    "id": "60d5ec49c1234567890abcg",
    "text": "What is the difference between recursion and iteration?",
    "timeLimit": 300,
    "sequenceNumber": 2
  },
  "answerFeedback": {
    "feedback": "Good explanation of recursion. Clear examples provided.",
    "improvements": [
      "Could mention time complexity",
      "Add space complexity analysis"
    ],
    "score": 82.5
  },
  "followUp": "Can you optimize this recursive solution using dynamic programming?"
}

Response (200 OK) - Interview Complete:
{
  "interviewComplete": true,
  "feedback": {
    "overallAssessment": "You demonstrated good understanding of DSA concepts...",
    "strengths": [
      "Strong array manipulation skills",
      "Good problem-solving approach"
    ],
    "weaknesses": [
      "Need to improve on time complexity analysis",
      "Edge cases handling could be better"
    ],
    "recommendations": [
      "Practice more on string manipulation problems",
      "Study graph algorithms in depth",
      "Focus on optimization techniques"
    ],
    "confidenceLevel": "High"
  },
  "score": 76.3,
  "answerFeedback": {
    "feedback": "Excellent handling of this problem...",
    "improvements": ["Minor improvements in explanation"],
    "score": 78
  }
}

Errors:
- 400: Missing required fields
- 404: Interview or question not found
- 401: Unauthorized
- 500: Server error
```

### 6. Get Interview History
```
GET /interview/history
Authorization: Bearer <token>

Query Parameters (Optional):
- limit: Number of records (default: all)
- skip: Number of records to skip (default: 0)
- status: Filter by status (ongoing, completed, abandoned)

Response (200 OK):
[
  {
    "_id": "60d5ec49c1234567890abce",
    "interviewType": "DSA",
    "difficulty": "Easy",
    "totalScore": 78.5,
    "status": "completed",
    "createdAt": "2024-01-20T10:30:00Z"
  },
  {
    "_id": "60d5ec49c1234567890abcd",
    "interviewType": "Aptitude",
    "difficulty": "Medium",
    "totalScore": 72.3,
    "status": "completed",
    "createdAt": "2024-01-19T14:20:00Z"
  }
]

Errors:
- 401: Unauthorized
- 500: Server error
```

### 7. Get Interview Details
```
GET /interview/:interviewId
Authorization: Bearer <token>

Response (200 OK):
{
  "_id": "60d5ec49c1234567890abce",
  "userId": "60d5ec49c1234567890abcd",
  "interviewType": "DSA",
  "difficulty": "Easy",
  "startTime": "2024-01-20T10:30:00Z",
  "endTime": "2024-01-20T10:45:00Z",
  "totalQuestions": 5,
  "completedQuestions": 5,
  "totalScore": 78.5,
  "status": "completed",
  "questions": [
    {
      "_id": "60d5ec49c1234567890abcf",
      "questionText": "Explain recursion...",
      "difficulty": "Easy",
      "sequenceNumber": 1
    }
  ],
  "answers": [
    {
      "_id": "60d5ec49c1234567890abc0",
      "questionId": "60d5ec49c1234567890abcf",
      "answerText": "Recursion is...",
      "score": 82.5,
      "evaluation": {
        "correctness": 85,
        "clarity": 80,
        "completeness": 85,
        "efficiency": 78
      },
      "feedback": "Good explanation..."
    }
  ],
  "feedback": {
    "overallAssessment": "Good performance...",
    "strengths": ["Array handling", "Problem solving"],
    "weaknesses": ["Time complexity"],
    "recommendations": ["Study graph algorithms"]
  },
  "performanceMetrics": {
    "accuracyRate": 82.5,
    "consistencyScore": 75.3,
    "communicationScore": 78.9,
    "conceptualUnderstanding": 81.2
  }
}

Errors:
- 404: Interview not found
- 401: Unauthorized
- 500: Server error
```

### 8. Get Analytics Dashboard
```
GET /interview/analytics/dashboard
Authorization: Bearer <token>

Response (200 OK):
{
  "totalInterviews": 12,
  "averageScore": 76.5,
  "categoryAverages": {
    "DSA": 78.3,
    "Aptitude": 74.2,
    "System Design": 75.8,
    "HR": 80.5
  },
  "recentInterviews": [
    {
      "_id": "60d5ec49c1234567890abce",
      "interviewType": "DSA",
      "difficulty": "Medium",
      "totalScore": 78.5,
      "status": "completed",
      "createdAt": "2024-01-20T10:30:00Z"
    }
  ]
}

Errors:
- 401: Unauthorized
- 500: Server error
```

## Response Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input or missing fields |
| 401 | Unauthorized | Missing or invalid token |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

## Authentication

All protected endpoints require:

```
Authorization: Bearer <token>
```

Where `<token>` is the JWT token received from login/register endpoint.

Token expiry: 7 days

## Rate Limiting

Currently not implemented. Consider adding for production:
- 100 requests per minute per IP
- 10 interviews per day per user

## Error Response Format

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## Example cURL Requests

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "targetRole": "Software Engineer (Fresher)"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Start Interview
```bash
curl -X POST http://localhost:5000/api/interview/start \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "interviewType": "DSA",
    "difficulty": "Easy"
  }'
```

### Submit Answer
```bash
curl -X POST http://localhost:5000/api/interview/answer \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "interviewId": "INTERVIEW_ID",
    "questionId": "QUESTION_ID",
    "answerText": "Your answer here",
    "timeSpent": 120
  }'
```

### Get Analytics
```bash
curl -X GET http://localhost:5000/api/interview/analytics/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN"
```
