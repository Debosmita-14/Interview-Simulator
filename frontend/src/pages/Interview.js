import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { interviewService } from '../services/api';

const Interview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    startInterview();
  }, []);

  useEffect(() => {
    if (!showFeedback) return;

    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [showFeedback]);

  const startInterview = async () => {
    try {
      const response = await interviewService.startInterview(
        location.state?.interviewType || 'DSA',
        'Easy'
      );
      setInterview(response.data);
      setCurrentQuestion(response.data.question);
      setLoading(false);
    } catch (error) {
      console.error('Error starting interview:', error);
      alert('Failed to start interview');
      navigate('/dashboard');
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      alert('Please provide an answer');
      return;
    }

    setSubmitting(true);
    try {
      const response = await interviewService.submitAnswer(
        interview.interviewId,
        currentQuestion.id,
        answer,
        timeSpent
      );

      setFeedback(response.data.answerFeedback);
      setShowFeedback(true);

      if (response.data.interviewComplete) {
        setTimeout(() => {
          navigate('/results', {
            state: {
              interviewId: interview.interviewId,
              feedback: response.data.feedback,
              score: response.data.score,
            },
          });
        }, 5000);
      } else {
        setTimeout(() => {
          setCurrentQuestion(response.data.nextQuestion);
          setAnswer('');
          setTimeSpent(0);
          setShowFeedback(false);
          setFeedback(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Starting interview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Interview Question</h1>
              <p className="text-gray-600">Question {currentQuestion?.sequenceNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</p>
              <p className="text-gray-600 text-sm">Time spent</p>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {currentQuestion?.text}
            </h2>
            <p className="text-gray-600 text-sm">
              Time Limit: {currentQuestion?.timeLimit} seconds
            </p>
          </div>

          {/* Answer Input */}
          {!showFeedback ? (
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Your Answer
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                placeholder="Type your answer here..."
              />
              <button
                onClick={handleSubmitAnswer}
                disabled={submitting}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {submitting ? 'Evaluating...' : 'Submit Answer'}
              </button>
            </div>
          ) : (
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Feedback</h3>
              <div className="mb-4">
                <p className="text-gray-700 mb-2">{feedback?.feedback}</p>
                {feedback?.improvements?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Suggestions for Improvement:</h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {feedback.improvements.map((imp, idx) => (
                        <li key={idx}>{imp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="text-gray-600">Score: <span className="font-bold text-2xl text-blue-600">{feedback?.score?.toFixed(1) || 'N/A'}%</span></p>
                <p className="text-gray-500 text-sm mt-4">Moving to next question...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;
