const express = require('express');
const { startInterview, continueInterview, generateFeedback } = require('../controllers/interviewController');

const router = express.Router();

// POST /api/interview/start
router.post('/start', startInterview);

// POST /api/interview/continue  
router.post('/continue', continueInterview);

// POST /api/interview/feedback
router.post('/feedback', generateFeedback);

module.exports = router;