const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { sendContactEmail } = require('../controllers/contactController');

// Rate limiting for contact form to prevent spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 contact requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

router.post('/', contactLimiter, sendContactEmail);

module.exports = router;
