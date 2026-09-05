require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const contactRoutes = require('./routes/contactRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Connect to MongoDB
connectDB();

const app = express();

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Security and Utility Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'https://ujwal-portfolio1.vercel.app' })); // Locked down CORS
app.use(limiter);

// Payload limit
app.use(express.json({ limit: '10kb' })); 

// Data sanitization against NoSQL injection
// Removed express-mongo-sanitize because it breaks Express 5

// Data sanitization against XSS
// Removed xss-clean because it breaks Express 5

app.use(morgan('dev')); // Request logging

// Health check endpoint
app.get('/health', (req, res) => res.status(200).send('OK'));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
