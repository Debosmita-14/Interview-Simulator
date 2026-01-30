const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    interviewType: {
      type: String,
      required: true,
      enum: ['DSA', 'Technical', 'System Design', 'HR', 'Video Demo'],
      default: 'DSA',
    },
    difficulty: {
      type: String,
      default: 'Easy',
      enum: ['Easy', 'Medium', 'Hard'],
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
      default: null,
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
    completedQuestions: {
      type: Number,
      default: 0,
    },
    skippedQuestions: {
      type: Number,
      default: 0,
    },
    totalScore: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'ongoing',
      enum: ['ongoing', 'completed', 'abandoned'],
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
    ],
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
      },
    ],
    feedback: {
      overallAssessment: String,
      strengths: [String],
      weaknesses: [String],
      recommendations: [String],
    },
    performanceMetrics: {
      accuracyRate: {
        type: Number,
        default: 0,
      },
      consistencyScore: {
        type: Number,
        default: 0,
      },
      communicationScore: {
        type: Number,
        default: 0,
      },
      conceptualUnderstanding: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;
