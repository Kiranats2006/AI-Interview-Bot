// services/api.js
const API_BASE_URL = 'https://ai-interview-bot-ywme.onrender.com';

export const apiService = {
  startInterview: async (role) => {
    const response = await fetch(`${API_BASE_URL}/api/interview/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });
    return response.json();
  },

  continueInterview: async (role, history, answer) => {
    const response = await fetch(`${API_BASE_URL}/api/interview/continue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, history, answer }),
    });
    return response.json();
  },

  generateFeedback: async (role, history) => {
    const response = await fetch(`${API_BASE_URL}/api/interview/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, history }),
    });
    return response.json();
  },
};