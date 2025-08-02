const geminiService = require('../services/geminiService');

const startInterview = async (req, res) => {
  try {
    console.log('Starting interview for role:', req.body.role);
    
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        success: false,
        error: 'Role is required'
      });
    }

    const prompt = `You are an experienced technical interviewer conducting a professional interview for a ${role} position.

Instructions:
- Give a brief welcome message (2-3 sentences)
- Ask the first technical question relevant to ${role}
- Keep it professional but friendly
- Keep your response under 150 words

Start the interview now.`;

    const response = await geminiService.generateResponse(prompt);

    console.log('Interview started successfully');

    res.json({
      success: true,
      message: response,
      questionNumber: 1
    });
  } catch (error) {
    console.error('Error starting interview:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to start interview: ' + error.message
    });
  }
};

const continueInterview = async (req, res) => {
  try {
    console.log('Continuing interview');

    const { role, history, answer } = req.body;

    if (!role || !answer) {
      return res.status(400).json({
        success: false,
        error: 'Role and answer are required'
      });
    }

    const prompt = `You are interviewing for a ${role} position.

Previous conversation:
${history || 'No previous history'}

Candidate's latest answer: ${answer}

As the interviewer:
1. Provide brief feedback on their answer (1-2 sentences)
2. Ask the next relevant technical question for ${role}
3. Keep it professional and engaging
4. Keep your response under 150 words

Respond as the interviewer:`;

    const response = await geminiService.generateResponse(prompt);

    console.log('Interview continued successfully');

    res.json({
      success: true,
      message: response
    });
  } catch (error) {
    console.error('Error continuing interview:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to continue interview: ' + error.message
    });
  }
};

const generateFeedback = async (req, res) => {
  try {
    console.log('Generating feedback');

    const { role, history } = req.body;

    if (!role || !history) {
      return res.status(400).json({
        success: false,
        error: 'Role and history are required'
      });
    }

    const prompt = `Based on this interview for a ${role} position:

${history}

Provide detailed feedback in this exact format:

**Overall Performance:** [Rating out of 10]

**Strengths:**
- [List 2-3 key strengths]

**Areas for Improvement:**
- [List 2-3 areas to work on]

**Technical Knowledge:** [Brief assessment]

**Communication Skills:** [Brief assessment]

**Recommendations:**
- [2-3 actionable recommendations]

Keep it constructive, professional, and under 300 words.`;

    const response = await geminiService.generateResponse(prompt);

    console.log('Feedback generated successfully');

    res.json({
      success: true,
      feedback: response
    });
  } catch (error) {
    console.error('Error generating feedback:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to generate feedback: ' + error.message
    });
  }
};

module.exports = {
  startInterview,
  continueInterview,
  generateFeedback
};
