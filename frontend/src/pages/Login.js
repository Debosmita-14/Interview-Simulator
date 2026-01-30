import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { FaCode, FaBrain, FaTrophy, FaArrowRight } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full relative z-10">
        {/* Left side - Features */}
        <div className="hidden lg:flex flex-col justify-center text-white space-y-8">
          <div>
            <h2 className="text-5xl font-bold mb-4">Master IT Interviews 🚀</h2>
            <p className="text-xl text-blue-200 mb-8">Practice with AI-powered questions and get expert feedback in real-time</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500">
                  <FaCode className="text-white text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold">DSA Round</h3>
                <p className="text-blue-200">Master Data Structures & Algorithms</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500">
                  <FaBrain className="text-white text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold">Technical Round</h3>
                <p className="text-blue-200">System Design & Core Concepts</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500">
                  <FaTrophy className="text-white text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold">Free 1-on-1 Sessions</h3>
                <p className="text-blue-200">Get expert feedback & personalized guidance</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-blue-500">
            <p className="text-sm text-blue-300 mb-4">Join 1000+ IT professionals preparing for their dream jobs</p>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">1000+</p>
                <p className="text-blue-300 text-sm">Users</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">5000+</p>
                <p className="text-blue-300 text-sm">Interviews</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">98%</p>
                <p className="text-blue-300 text-sm">Success Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <div className="mb-8 text-center">
              <div className="inline-block p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mb-4">
                <FaCode className="text-3xl text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">InterviewPro</h1>
              <p className="text-gray-600 text-sm mt-2">AI-Powered IT Interview Practice</p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                <p className="font-semibold">Login Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-5">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Signing in...' : (
                  <>
                    Sign In <FaArrowRight className="text-sm" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to InterviewPro?</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/register')}
              className="w-full mt-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-4 rounded-lg transition"
            >
              Create Account
            </button>

            <p className="text-center text-gray-600 text-xs mt-6">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
