const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview',
      required: true,
    },
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    categoryScores: {
      DSA: {
        type: Number,
        default: 0,
      },
      Aptitude: {
        type: Number,
        default: 0,
      },
      'System Design': {
        type: Number,
        default: 0,
      },
      HR: {
        type: Number,
        default: 0,
      },
    },
    weaknesses: [
      {
        topic: String,
        score: Number,
        recommendations: [String],
      },
    ],
    strengths: [
      {
        topic: String,
        score: Number,
      },
    ],
    improvementAreas: [String],
    conceptsMastered: [String],
    nextRecommendedTopics: [String],
    confidenceLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
  },
  {
    timestamps: true,
  }
);

const Performance = mongoose.model('Performance', performanceSchema);
module.exports = Performance;
