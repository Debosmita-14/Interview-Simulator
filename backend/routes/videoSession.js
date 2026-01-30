const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const VideoSession = require('../models/VideoSession');

// Book a new video session
router.post('/book', auth, async (req, res) => {
  try {
    const { sessionType, scheduledDateTime, interviewTopic, isFree } = req.body;

    // Validate required fields
    if (!sessionType || !scheduledDateTime || !interviewTopic) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const videoSession = new VideoSession({
      userId: req.user.userId,
      sessionType,
      scheduledDateTime: new Date(scheduledDateTime),
      interviewTopic,
      isFree: isFree || true,
      status: 'Scheduled',
    });

    await videoSession.save();

    res.status(201).json({
      message: 'Video session booked successfully',
      session: videoSession,
    });
  } catch (error) {
    console.error('Error booking video session:', error);
    res.status(500).json({ message: 'Error booking video session', error: error.message });
  }
});

// Get all video sessions for a user
router.get('/my-sessions', auth, async (req, res) => {
  try {
    const sessions = await VideoSession.find({ userId: req.user.userId })
      .sort({ scheduledDateTime: -1 });

    res.json({
      message: 'Video sessions retrieved',
      sessions,
    });
  } catch (error) {
    console.error('Error fetching video sessions:', error);
    res.status(500).json({ message: 'Error fetching sessions', error: error.message });
  }
});

// Get a specific video session
router.get('/:sessionId', auth, async (req, res) => {
  try {
    const session = await VideoSession.findById(req.params.sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Video session not found' });
    }

    // Check if user owns this session
    if (session.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to access this session' });
    }

    res.json({
      message: 'Video session retrieved',
      session,
    });
  } catch (error) {
    console.error('Error fetching video session:', error);
    res.status(500).json({ message: 'Error fetching session', error: error.message });
  }
});

// Update video session (add feedback after session)
router.put('/:sessionId', auth, async (req, res) => {
  try {
    const { status, feedback, rating, notes } = req.body;
    const sessionId = req.params.sessionId;

    const session = await VideoSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Video session not found' });
    }

    // Check authorization
    if (session.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this session' });
    }

    // Update allowed fields
    if (status) session.status = status;
    if (feedback) session.feedback = feedback;
    if (rating) session.rating = rating;
    if (notes) session.notes = notes;
    if (status === 'Active' && !session.startTime) {
      session.startTime = new Date();
    }
    if (status === 'Completed' && !session.endTime) {
      session.endTime = new Date();
    }

    await session.save();

    res.json({
      message: 'Video session updated',
      session,
    });
  } catch (error) {
    console.error('Error updating video session:', error);
    res.status(500).json({ message: 'Error updating session', error: error.message });
  }
});

// Cancel video session
router.delete('/:sessionId', auth, async (req, res) => {
  try {
    const session = await VideoSession.findById(req.params.sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Video session not found' });
    }

    // Check authorization
    if (session.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this session' });
    }

    // Can only cancel if not started
    if (session.status === 'Active' || session.status === 'Completed') {
      return res.status(400).json({ message: 'Cannot cancel an active or completed session' });
    }

    await VideoSession.findByIdAndDelete(req.params.sessionId);

    res.json({ message: 'Video session cancelled successfully' });
  } catch (error) {
    console.error('Error deleting video session:', error);
    res.status(500).json({ message: 'Error cancelling session', error: error.message });
  }
});

// Get free demo sessions available (for admin/system)
router.get('/admin/free-demos', async (req, res) => {
  try {
    const sessions = await VideoSession.find({ isFree: true, status: 'Scheduled' })
      .populate('userId', 'email')
      .sort({ scheduledDateTime: 1 });

    res.json({
      message: 'Free demo sessions retrieved',
      sessions,
    });
  } catch (error) {
    console.error('Error fetching free demo sessions:', error);
    res.status(500).json({ message: 'Error fetching sessions', error: error.message });
  }
});

module.exports = router;
