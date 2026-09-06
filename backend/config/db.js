const mongoose = require('mongoose');

// Disable buffering to prevent queries from hanging indefinitely if DB is down
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds instead of hanging
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Continuing without DB to prevent app crash
  }
};

module.exports = connectDB;
