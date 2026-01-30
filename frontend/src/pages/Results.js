import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const feedback = location.state?.feedback || {};
  const score = location.state?.score || 0;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-50';
    if (score >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Score Card */}
        <div className={`${getScoreBg(score)} rounded-lg shadow-xl p-12 mb-8 text-center`}>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Interview Complete!</h1>
          <div className={`text-6xl font-bold ${getScoreColor(score)} mb-4`}>
            {score.toFixed(1)}%
          </div>
          <p className="text-gray-600 text-lg mb-4">
            {score >= 80 && 'Excellent performance! You showed great technical skills.'}
            {score >= 60 && score < 80 && 'Good effort! Keep practicing to improve further.'}
            {score < 60 && 'Keep practicing! Focus on the suggested areas.'}
          </p>
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Overall Assessment</h2>
          <p className="text-gray-700 mb-8 text-lg">{feedback.overallAssessment}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Strengths */}
            <div>
              <h3 className="text-xl font-bold text-green-600 mb-4">✓ Strengths</h3>
              <ul className="space-y-2">
                {feedback.strengths?.map((strength, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-4">✗ Areas for Improvement</h3>
              <ul className="space-y-2">
                {feedback.weaknesses?.map((weakness, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span className="text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommendations</h2>
          <ul className="space-y-3">
            {feedback.recommendations?.map((rec, idx) => (
              <li key={idx} className="flex items-start bg-blue-50 p-4 rounded-lg">
                <span className="text-blue-600 font-bold mr-3">{idx + 1}.</span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate('/interview', { state: { interviewType: 'DSA' } })}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            Take Another Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
