const express = require('express');
const { startInterview, continueInterview, generateFeedback } = require('../controllers/interviewController');

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Interview routes working!' });
});

// POST /api/interview/start
router.post('/start', startInterview);

// POST /api/interview/continue  
router.post('/continue', continueInterview);

// POST /api/interview/feedback
router.post('/feedback', generateFeedback);

module.exports = router;