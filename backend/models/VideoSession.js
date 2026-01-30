const mongoose = require('mongoose');

const videoSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sessionType: {
      type: String,
      required: true,
      enum: ['Free Demo', 'Scheduled Interview', 'Mock Interview'],
      default: 'Free Demo',
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Active', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
    scheduledDateTime: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
      default: null,
    },
    endTime: {
      type: Date,
      default: null,
    },
    duration: {
      type: Number, // in minutes
      default: 30,
    },
    interviewerName: {
      type: String,
      default: 'Senior IT Professional',
    },
    interviewTopic: {
      type: String,
      enum: ['DSA Basics', 'System Design', 'HR Preparation', 'General Technical', 'Career Guidance'],
      default: 'General Technical',
    },
    videoRoomId: {
      type: String,
      default: null,
    },
    meetingLink: {
      type: String,
      default: null,
    },
    feedback: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    isFree: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('VideoSession', videoSessionSchema);
