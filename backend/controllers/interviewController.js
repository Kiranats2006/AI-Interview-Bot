const geminiService = require('../../backend/services/geminiService');

// Track conversation state (in-memory, for production use a database)
const interviewSessions = new Map();

const startInterview = async (req, res) => {
  try {
    console.log('Starting interview for role:', req.body.role);

    const { role, userId } = req.body;

    if (!role) {
      return res.status(400).json({
        success: false,
        error: 'Role is required'
      });
    }

    const sessionId = userId || Date.now().toString();

    const prompt = `You are an experienced technical interviewer conducting a professional interview for a ${role} position.

Instructions:
- Give a brief welcome message (2-3 sentences)
- Ask the first technical question relevant to ${role}
- Keep it professional but friendly
- Keep your response under 150 words

Start the interview now.`;

    const response = await geminiService.generateResponse(prompt);

    // Initialize session
    interviewSessions.set(sessionId, {
      role,
      history: [
        { role: 'system', content: prompt },
        { role: 'assistant', content: response }
      ],
      questionCount: 1
    });

    // Debug: Log current session keys
    console.log('Session created. Current sessions:', Array.from(interviewSessions.keys()));

    console.log('Interview started successfully');

    res.json({
      success: true,
      message: response,
      questionNumber: 1,
      sessionId
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
    const { sessionId, answer } = req.body;

    if (!sessionId || !answer) {
      return res.status(400).json({
        success: false,
        error: 'Session ID and answer are required'
      });
    }

    // Debug: Log current session keys
    console.log('Looking for session:', sessionId);
    console.log('Current sessions:', Array.from(interviewSessions.keys()));

    const session = interviewSessions.get(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Interview session not found'
      });
    }

    // Add user's answer to history
    session.history.push({ role: 'user', content: answer });

    // Prepare conversation context
    const conversationContext = session.history
      .filter(msg => msg.role !== 'system')
      .map(msg => `${msg.role === 'user' ? 'Candidate' : 'Interviewer'}: ${msg.content}`)
      .join('\n\n');

    const prompt = `You are interviewing for a ${session.role} position.

Previous conversation:
${conversationContext}

As the interviewer:
1. Provide brief, specific feedback on their answer (1 sentence)
2. Ask the next relevant technical question
3. Keep responses professional and under 150 words
4. End your response with a clear question

Respond now as the interviewer:`;

    const response = await geminiService.generateResponse(prompt);

    // Update session
    session.history.push({ role: 'assistant', content: response });
    session.questionCount += 1;

    console.log('Interview continued successfully');

    res.json({
      success: true,
      message: response,
      questionNumber: session.questionCount
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
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Session ID is required'
      });
    }

    // Debug: Log current session keys
    console.log('Looking for session:', sessionId);
    console.log('Current sessions:', Array.from(interviewSessions.keys()));

    const session = interviewSessions.get(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Interview session not found'
      });
    }

    const conversationContext = session.history
      .filter(msg => msg.role !== 'system')
      .map(msg => `${msg.role === 'user' ? 'Candidate' : 'Interviewer'}: ${msg.content}`)
      .join('\n\n');

    const prompt = `Based on this interview for a ${session.role} position:

${conversationContext}

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
