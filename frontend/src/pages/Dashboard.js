import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewService } from '../services/api';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FaCode, FaUsers, FaVideo, FaTrophy, FaCalendar, FaBook, FaClock, FaCheckCircle, FaStar, FaArrowUp } from 'react-icons/fa';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};

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

  const handleVideoSession = () => {
    navigate('/video-session');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-white text-2xl font-bold">Loading Dashboard...</div>
      </div>
    );
  }

  const chartData = [
    { name: 'DSA', score: analytics?.categoryAverages?.DSA || 0, fill: '#3b82f6' },
    { name: 'Technical', score: analytics?.categoryAverages?.Technical || 0, fill: '#a855f7' },
    { name: 'System Design', score: analytics?.categoryAverages?.['System Design'] || 0, fill: '#10b981' },
    { name: 'HR', score: analytics?.categoryAverages?.HR || 0, fill: '#f97316' },
  ];

  const interviewRounds = [
    {
      id: 1,
      title: 'DSA Round',
      description: 'Data Structures & Algorithms',
      difficulty: 'Hard',
      icon: '💻',
      color: 'from-blue-500 to-blue-600',
      topics: ['Arrays', 'Trees', 'Graphs', 'DP', 'Sorting'],
      completed: Math.round(Math.random() * 25),
    },
    {
      id: 2,
      title: 'Technical Round',
      description: 'System Design & Core Concepts',
      difficulty: 'Medium',
      icon: '🏗️',
      color: 'from-purple-500 to-purple-600',
      topics: ['Architecture', 'Design Patterns', 'Databases'],
      completed: Math.round(Math.random() * 25),
    },
    {
      id: 3,
      title: 'System Design',
      description: 'High-Level Architecture Design',
      difficulty: 'Hard',
      icon: '🎯',
      color: 'from-green-500 to-green-600',
      topics: ['Microservices', 'Load Balancing', 'Caching'],
      completed: Math.round(Math.random() * 25),
    },
    {
      id: 4,
      title: 'HR Round',
      description: 'Behavioral & HR Interview',
      difficulty: 'Medium',
      icon: '👥',
      color: 'from-orange-500 to-orange-600',
      topics: ['Communication', 'Leadership', 'Problem-Solving'],
      completed: Math.round(Math.random() * 25),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Welcome Back! 🚀</h1>
              <p className="text-blue-100 text-lg">Master IT Interviews with AI-Powered Practice</p>
              <div className="mt-4 flex gap-4">
                <div className="text-white">
                  <p className="text-3xl font-bold">{analytics?.totalInterviews || 0}</p>
                  <p className="text-blue-100 text-sm">Interviews Completed</p>
                </div>
                <div className="text-white">
                  <p className="text-3xl font-bold">{Math.round(analytics?.averageScore || 0)}%</p>
                  <p className="text-blue-100 text-sm">Overall Score</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleVideoSession}
              className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition text-lg shadow-lg"
            >
              <FaVideo className="text-xl" /> Free Demo Call
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl text-white transform hover:scale-105 transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-semibold">DSA Score</p>
                <p className="text-3xl font-bold mt-2">{Math.round(analytics?.categoryAverages?.DSA || 0)}%</p>
              </div>
              <FaCode className="text-4xl opacity-30" />
            </div>
            <div className="mt-4 h-1 bg-blue-400 rounded-full w-full">
              <div className="h-full bg-blue-200 rounded-full" style={{ width: `${analytics?.categoryAverages?.DSA || 0}%` }}></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl text-white transform hover:scale-105 transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-100 text-sm font-semibold">Technical</p>
                <p className="text-3xl font-bold mt-2">{Math.round(analytics?.categoryAverages?.Technical || 0)}%</p>
              </div>
              <FaBook className="text-4xl opacity-30" />
            </div>
            <div className="mt-4 h-1 bg-purple-400 rounded-full w-full">
              <div className="h-full bg-purple-200 rounded-full" style={{ width: `${analytics?.categoryAverages?.Technical || 0}%` }}></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-xl text-white transform hover:scale-105 transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-semibold">System Design</p>
                <p className="text-3xl font-bold mt-2">{Math.round(analytics?.categoryAverages?.['System Design'] || 0)}%</p>
              </div>
              <FaTrophy className="text-4xl opacity-30" />
            </div>
            <div className="mt-4 h-1 bg-green-400 rounded-full w-full">
              <div className="h-full bg-green-200 rounded-full" style={{ width: `${analytics?.categoryAverages?.['System Design'] || 0}%` }}></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl text-white transform hover:scale-105 transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-orange-100 text-sm font-semibold">HR Score</p>
                <p className="text-3xl font-bold mt-2">{Math.round(analytics?.categoryAverages?.HR || 0)}%</p>
              </div>
              <FaUsers className="text-4xl opacity-30" />
            </div>
            <div className="mt-4 h-1 bg-orange-400 rounded-full w-full">
              <div className="h-full bg-orange-200 rounded-full" style={{ width: `${analytics?.categoryAverages?.HR || 0}%` }}></div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaStar className="text-yellow-400" /> Performance Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                />
                <Bar dataKey="score" radius={[12, 12, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Score Distribution
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, score }) => `${name}: ${score}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="score"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Interview Rounds */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Interview Rounds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interviewRounds.map((round) => (
              <div
                key={round.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition cursor-pointer group"
              >
                <div className={`bg-gradient-to-br ${round.color} h-32 flex items-center justify-center text-5xl group-hover:scale-110 transition`}>
                  {round.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{round.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{round.description}</p>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-700">Difficulty</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        round.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                        round.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {round.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Topics:</p>
                    <div className="flex flex-wrap gap-2">
                      {round.topics.map((topic, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartInterview(round.title)}
                    className={`w-full bg-gradient-to-r ${round.color} text-white font-bold py-2 rounded-lg hover:shadow-lg transition mt-4`}
                  >
                    Start Interview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Free Demo Video Section */}
        <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl p-12 text-white mb-12 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-4xl font-bold mb-4">🎥 Free 1-on-1 Video Session</h3>
              <p className="text-xl text-blue-100 mb-6">Get personalized feedback from experienced IT professionals. 30 minutes, completely FREE!</p>
              <ul className="text-blue-100 space-y-2">
                <li className="flex items-center gap-2"><FaCheckCircle /> Live feedback on your answers</li>
                <li className="flex items-center gap-2"><FaCheckCircle /> Personalized recommendations</li>
                <li className="flex items-center gap-2"><FaCheckCircle /> No credit card required</li>
              </ul>
            </div>
            <button
              onClick={handleVideoSession}
              className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition text-lg shadow-xl whitespace-nowrap"
            >
              <FaVideo className="inline mr-2" /> Book Now
            </button>
          </div>
        </div>

        {/* Recent Interviews */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Interviews</h2>
          {analytics?.recentInterviews && analytics.recentInterviews.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Type</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Difficulty</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Score</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Status</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.recentInterviews.map((interview) => (
                    <tr key={interview._id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-4 px-4 font-semibold text-gray-800">{interview.interviewType}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          interview.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                          interview.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {interview.difficulty}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-blue-600">{interview.totalScore?.toFixed(1) || 'N/A'}%</td>
                      <td className="py-4 px-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {interview.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{new Date(interview.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FaCalendar className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No interviews yet. Start your first interview to get feedback!</p>
              <button
                onClick={() => handleStartInterview('DSA Round')}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
              >
                Start First Interview
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
