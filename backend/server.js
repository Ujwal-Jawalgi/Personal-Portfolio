require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const contactRoutes = require('./routes/contactRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Connect to Database
connectDB();

const app = express();

// Security and Utility Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' })); // CORS restriction

// Payload limit
app.use(express.json({ limit: '10kb' })); 

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

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
