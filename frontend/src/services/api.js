const API_BASE_URL = 'http://localhost:5000/api/interview';

export const apiService = {
  async startInterview(role) {
    const response = await fetch(`${API_BASE_URL}/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to start interview');
    }
    
    return response.json();
  },

  async continueInterview(role, history, answer) {
    const response = await fetch(`${API_BASE_URL}/continue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, history, answer }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to continue interview');
    }
    
    return response.json();
  },

  async generateFeedback(role, history) {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, history }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate feedback');
    }
    
    return response.json();
  }
};