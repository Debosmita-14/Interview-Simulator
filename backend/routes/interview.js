const express = require('express');
const authMiddleware = require('../middleware/auth');
const Interview = require('../models/Interview');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Performance = require('../models/Performance');
const InterviewService = require('../services/interviewService');

const interviewRoutes = express.Router();

// Start new interview
interviewRoutes.post('/start', authMiddleware, async (req, res) => {
  try {
    const { interviewType, difficulty } = req.body;

    if (!['DSA', 'Aptitude', 'System Design', 'HR'].includes(interviewType)) {
      return res.status(400).json({ message: 'Invalid interview type' });
    }

    const interview = new Interview({
      userId: req.user.userId,
      interviewType,
      difficulty: difficulty || 'Easy',
      totalQuestions: 5,
    });

    await interview.save();

    // Generate first question
    const question = await InterviewService.generateQuestion(
      interview._id,
      interview.difficulty,
      interviewType
    );

    interview.questions.push(question._id);
    await interview.save();

    res.status(201).json({
      interviewId: interview._id,
      question: {
        id: question._id,
        text: question.questionText,
        timeLimit: question.timeLimit,
        sequenceNumber: question.sequenceNumber,
      },
    });
  } catch (error) {
    console.error('Error starting interview:', error);
    res.status(500).json({ message: error.message });
  }
});

// Submit answer and get next question
interviewRoutes.post('/answer', authMiddleware, async (req, res) => {
  try {
    const { interviewId, questionId, answerText, timeSpent } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Evaluate answer using Claude
    const evaluation = await InterviewService.evaluateAnswer(question, answerText);

    // Save answer
    const answer = new Answer({
      questionId,
      interviewId,
      userId: req.user.userId,
      answerText,
      timeSpent,
      evaluation: {
        correctness: evaluation.correctness,
        clarity: evaluation.clarity,
        completeness: evaluation.completeness,
        efficiency: evaluation.efficiency,
      },
      feedback: evaluation.feedback,
      suggestedImprovements: evaluation.improvements,
      score: (evaluation.correctness + evaluation.clarity + evaluation.completeness + evaluation.efficiency) / 4,
      passedFeedback: evaluation.confidenceDetected === 'High',
    });

    await answer.save();
    interview.answers.push(answer._id);
    interview.completedQuestions += 1;

    // Check if interview is complete
    if (interview.completedQuestions >= interview.totalQuestions) {
      interview.status = 'completed';
      interview.endTime = new Date();

      // Generate final feedback
      const scores = await Answer.find({ interviewId }).select('score');
      const scoreValues = scores.map(s => s.score);
      interview.totalScore = scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length;

      const finalFeedback = await InterviewService.generateFinalFeedback([], scoreValues);
      interview.feedback = finalFeedback;

      await interview.save();

      return res.status(200).json({
        interviewComplete: true,
        feedback: finalFeedback,
        score: interview.totalScore,
        answerFeedback: {
          feedback: evaluation.feedback,
          improvements: evaluation.improvements,
        },
      });
    }

    // Generate next question
    const nextDifficulty =
      evaluation.correctness >= 80 ? 'Hard' :
      evaluation.correctness >= 60 ? 'Medium' : 'Easy';

    const nextQuestion = await InterviewService.generateQuestion(
      interviewId,
      nextDifficulty,
      interview.interviewType,
      [{ quality: evaluation.correctness }]
    );

    interview.questions.push(nextQuestion._id);
    await interview.save();

    res.status(200).json({
      interviewComplete: false,
      nextQuestion: {
        id: nextQuestion._id,
        text: nextQuestion.questionText,
        timeLimit: nextQuestion.timeLimit,
        sequenceNumber: nextQuestion.sequenceNumber,
      },
      answerFeedback: {
        feedback: evaluation.feedback,
        improvements: evaluation.improvements,
        score: answer.score,
      },
      followUp: evaluation.followUp,
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get interview history
interviewRoutes.get('/history', authMiddleware, async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.user.userId })
      .select('interviewType difficulty totalScore status createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get interview details with answers
interviewRoutes.get('/:interviewId', authMiddleware, async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.interviewId)
      .populate('questions')
      .populate('answers');

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get performance analytics
interviewRoutes.get('/analytics/dashboard', authMiddleware, async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.user.userId, status: 'completed' });

    const totalScore = interviews.length > 0
      ? interviews.reduce((sum, i) => sum + (i.totalScore || 0), 0) / interviews.length
      : 0;

    const categoryScores = {};
    for (const interview of interviews) {
      const score = interview.totalScore || 0;
      if (!categoryScores[interview.interviewType]) {
        categoryScores[interview.interviewType] = [];
      }
      categoryScores[interview.interviewType].push(score);
    }

    const categoryAverages = {};
    for (const [category, scores] of Object.entries(categoryScores)) {
      categoryAverages[category] = scores.reduce((a, b) => a + b, 0) / scores.length;
    }

    res.status(200).json({
      totalInterviews: interviews.length,
      averageScore: totalScore,
      categoryAverages,
      recentInterviews: interviews.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = interviewRoutes;
