import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaVideo, FaCalendar, FaClock, FaUser, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import API from '../services/api';

const VideoSession = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('General Technical');
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem('user'))?.email || '');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const topics = [
    { value: 'DSA Basics', label: '💻 DSA Basics' },
    { value: 'System Design', label: '🏗️ System Design' },
    { value: 'HR Preparation', label: '👥 HR Preparation' },
    { value: 'General Technical', label: '🧠 General Technical' },
    { value: 'Career Guidance', label: '🎯 Career Guidance' },
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }

    setLoading(true);
    try {
      const sessionDateTime = new Date(`${selectedDate}T${selectedTime}`);
      
      await API.post('/video-session/book', {
        sessionType: 'Free Demo',
        scheduledDateTime: sessionDateTime,
        interviewTopic: selectedTopic,
        isFree: true,
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Failed to book session', error);
      alert('Failed to book session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <FaCheckCircle className="text-5xl text-green-600" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed! 🎉</h2>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <div className="mb-4">
              <p className="text-gray-600 text-sm">Session Type</p>
              <p className="text-gray-800 font-bold">Free Demo - 1-on-1 Video Interview</p>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600 text-sm">Topic</p>
              <p className="text-gray-800 font-bold">{selectedTopic}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600 text-sm">Scheduled Date & Time</p>
              <p className="text-gray-800 font-bold">{selectedDate} at {selectedTime}</p>
            </div>
            
            <div>
              <p className="text-gray-600 text-sm">Duration</p>
              <p className="text-gray-800 font-bold">30 Minutes</p>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Next Steps:</strong> A confirmation email with the video link will be sent to <strong>{email}</strong> 24 hours before your session.
            </p>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-white mb-6 hover:opacity-80 transition"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          
          <h1 className="text-4xl font-bold text-white mb-3">Free 1-on-1 Video Interview 🎥</h1>
          <p className="text-blue-100 text-lg">Get personalized feedback from IT professionals</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Benefits Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">What You'll Get</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Live Feedback</p>
                    <p className="text-sm text-gray-600">Real-time guidance on your answers</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Personalized Tips</p>
                    <p className="text-sm text-gray-600">Recommendations tailored to you</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">30 Minutes Free</p>
                    <p className="text-sm text-gray-600">No credit card required</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Expert Interviewer</p>
                    <p className="text-sm text-gray-600">Senior IT professional</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 shadow-lg text-white">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <FaVideo /> How It Works
              </h4>
              <ol className="text-sm space-y-2 text-blue-100">
                <li><strong>1.</strong> Book your slot below</li>
                <li><strong>2.</strong> Get confirmation email</li>
                <li><strong>3.</strong> Join video call</li>
                <li><strong>4.</strong> Get personalized feedback</li>
              </ol>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Free Session</h2>

              {/* Interview Topic */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  📚 Choose Your Topic
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {topics.map((topic) => (
                    <button
                      key={topic.value}
                      type="button"
                      onClick={() => setSelectedTopic(topic.value)}
                      className={`p-4 rounded-lg border-2 transition text-left font-semibold ${
                        selectedTopic === topic.value
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300'
                      }`}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <FaCalendar className="inline mr-2" /> Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={minDate}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <FaClock className="inline mr-2" /> Select Time (IST)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border-2 transition font-semibold ${
                        selectedTime === time
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Display */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <FaUser className="inline mr-2" /> Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
                <p className="text-sm text-gray-600 mt-2">Confirmation will be sent to this email</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Booking...' : '✨ Book Free Session'}
              </button>

              {/* Info Box */}
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> You'll receive a video link via email 24 hours before your session. Make sure to join 5 minutes early!
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSession;
