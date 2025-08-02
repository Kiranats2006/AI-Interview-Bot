const fetch = require('node-fetch');

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
  }

  async generateResponse(prompt) {
    try {
      console.log('API Key:', this.apiKey ? 'Present' : 'Missing');
      console.log('Sending prompt to Gemini API');

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      console.log('Gemini API response status:', response.status);

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('Gemini API error:', errorBody);
        throw new Error(`Gemini API failed: ${response.status} - ${errorBody}`);
      }

      const data = await response.json();
      const message = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!message) {
        console.error('No text content found in Gemini response:', JSON.stringify(data, null, 2));
        throw new Error('No text content received from Gemini API');
      }

      console.log('Response received successfully from Gemini API');
      return message.trim();
    } catch (error) {
      console.error('Gemini Service error:', error.message);
      throw error;
    }
  }
}

module.exports = new GeminiService();
