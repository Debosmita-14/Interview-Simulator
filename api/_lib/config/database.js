const mongoose = require('mongoose');

let cachedConnection = null;

async function connectToDatabase() {
  // Reuse existing connection if available
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/interview-simulator';
    
    // Mongoose maintains a global connection, so we can safely connect
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout for serverless
      });
    }
    
    cachedConnection = mongoose.connection;
    console.log('MongoDB connected successfully');
    return cachedConnection;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
}

module.exports = connectToDatabase;
