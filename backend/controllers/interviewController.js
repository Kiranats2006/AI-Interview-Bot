const geminiService = require('../services/geminiService');

const startInterview = async (req, res) => {
  try {
    const { role } = req.body;
    
    const prompt = `You are an experienced technical interviewer conducting a professional interview for a ${role} position. 

Instructions:
- Give a brief welcome message
- Ask the first technical question relevant to ${role}
- Keep it professional but friendly
- Keep responses concise

Start the interview now.`;

    const response = await geminiService.generateResponse(prompt);
    
    res.json({
      success: true,
      message: response,
      questionNumber: 1
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to start interview'
    });
  }
};

const continueInterview = async (req, res) => {
  try {
    const { role, history, answer } = req.body;
    
    const prompt = `You are interviewing for a ${role} position.

Previous conversation:
${history}

Candidate's latest answer: ${answer}

As the interviewer:
1. Give brief feedback on their answer (1-2 sentences)
2. Ask the next relevant technical question for ${role}
3. Keep it professional and engaging

Respond as the interviewer:`;

    const response = await geminiService.generateResponse(prompt);
    
    res.json({
      success: true,
      message: response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to continue interview'
    });
  }
};

const generateFeedback = async (req, res) => {
  try {
    const { role, history } = req.body;
    
    const prompt = `Based on this interview for a ${role} position:

${history}

Provide detailed feedback in this format:

**Overall Performance:** [Rating out of 10]

**Strengths:**
- [List key strengths]

**Areas for Improvement:**
- [List areas to work on]

**Technical Knowledge:** [Assessment]

**Communication Skills:** [Assessment]

**Recommendations:**
- [Actionable recommendations]

Keep it constructive and professional.`;

    const response = await geminiService.generateResponse(prompt);
    
    res.json({
      success: true,
      feedback: response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate feedback'
    });
  }
};

module.exports = {
  startInterview,
  continueInterview,
  generateFeedback
};