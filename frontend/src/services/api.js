import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://interview-simulator-backend-1.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (name, email, password, targetRole = 'Software Engineer (Fresher)') =>
    api.post('/auth/register', { name, email, password, targetRole }),
  
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  
  getProfile: () =>
    api.get('/auth/profile'),
};

export const interviewService = {
  startInterview: (interviewType, difficulty) =>
    api.post('/interview/start', { interviewType, difficulty }),
  
  submitAnswer: (interviewId, questionId, answerText, timeSpent) =>
    api.post('/interview/answer', { interviewId, questionId, answerText, timeSpent }),
  
  getHistory: () =>
    api.get('/interview/history'),
  
  getInterviewDetails: (interviewId) =>
    api.get(`/interview/${interviewId}`),
  
  getAnalytics: () =>
    api.get('/interview/analytics/dashboard'),
};

export default api;
