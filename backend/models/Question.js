const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview',
      required: true,
    },
    questionText: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['DSA', 'Aptitude', 'System Design', 'HR'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    sequenceNumber: {
      type: Number,
      required: true,
    },
    generatedBy: {
      type: String,
      default: 'Claude AI',
    },
    followUpQuestions: [String],
    expectedConceptsCovered: [String],
    timeLimit: {
      type: Number,
      default: 300, // seconds
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
