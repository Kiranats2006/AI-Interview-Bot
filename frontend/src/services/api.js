// services/api.js
const API_BASE_URL = 'https://ai-interview-bot-ywme.onrender.com';

export const apiService = {
  startInterview: async (role) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/interview/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Start interview error:', error);
      throw error;
    }
  },

  continueInterview: async (sessionId, answer, retryCount = 0) => {
    try {
      console.log('Sending data:', { sessionId, answer }); // Debug log
      
      const response = await fetch(`${API_BASE_URL}/api/interview/continue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, answer }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        
        // If it's a 500 error and we haven't retried too many times, try again
        if (response.status === 500 && retryCount < 2) {
          console.log(`Retrying request (attempt ${retryCount + 1})...`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
          return apiService.continueInterview(sessionId, answer, retryCount + 1);
        }
        
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Continue interview error:', error);
      throw error;
    }
  },

  generateFeedback: async (sessionId) => {
    try {
      console.log('Generating feedback for session:', sessionId); // Debug log
      
      const response = await fetch(`${API_BASE_URL}/api/interview/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Feedback error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Generate feedback error:', error);
      throw error;
    }
  },
};