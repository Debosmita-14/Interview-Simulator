const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    answerText: {
      type: String,
      required: true,
    },
    answeredAt: {
      type: Date,
      default: Date.now,
    },
    timeSpent: {
      type: Number,
      default: 0, // seconds
    },
    evaluation: {
      correctness: {
        type: Number,
        min: 0,
        max: 100,
      },
      clarity: {
        type: Number,
        min: 0,
        max: 100,
      },
      completeness: {
        type: Number,
        min: 0,
        max: 100,
      },
      efficiency: {
        type: Number,
        min: 0,
        max: 100,
      },
    },
    feedback: {
      type: String,
      default: '',
    },
    suggestedImprovements: [String],
    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    passedFeedback: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;
