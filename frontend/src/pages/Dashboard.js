import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewService } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('DSA');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await interviewService.getAnalytics();
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const handleStartInterview = (type) => {
    navigate('/interview', { state: { interviewType: type } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const chartData = [
    { name: 'DSA', score: analytics?.categoryAverages?.DSA || 0 },
    { name: 'Aptitude', score: analytics?.categoryAverages?.Aptitude || 0 },
    { name: 'System Design', score: analytics?.categoryAverages?.['System Design'] || 0 },
    { name: 'HR', score: analytics?.categoryAverages?.HR || 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Let's continue your interview preparation</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Interviews</h3>
            <p className="text-4xl font-bold text-blue-600">{analytics?.totalInterviews || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Average Score</h3>
            <p className="text-4xl font-bold text-green-600">{analytics?.averageScore?.toFixed(1) || 0}%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Best Category</h3>
            <p className="text-2xl font-bold text-purple-600">
              {Object.entries(analytics?.categoryAverages || {}).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
            </p>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Performance by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Interview Types */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Start a New Interview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['DSA', 'Aptitude', 'System Design', 'HR'].map((type) => (
              <button
                key={type}
                onClick={() => handleStartInterview(type)}
                className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-105"
              >
                <div className="text-2xl mb-2">
                  {type === 'DSA' && '💻'}
                  {type === 'Aptitude' && '🧠'}
                  {type === 'System Design' && '🏗️'}
                  {type === 'HR' && '👥'}
                </div>
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Interviews */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Interviews</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Difficulty</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {analytics?.recentInterviews?.map((interview) => (
                  <tr key={interview._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{interview.interviewType}</td>
                    <td className="py-3 px-4">{interview.difficulty}</td>
                    <td className="py-3 px-4 font-semibold">{interview.totalScore?.toFixed(1) || 'N/A'}%</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {interview.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{new Date(interview.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
