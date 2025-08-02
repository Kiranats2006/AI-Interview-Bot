class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    // ✅ Fix: use v1 instead of v1beta
this.baseUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
  }

  async generateResponse(prompt) {
  try {
    console.log('🔑 Using API Key:', this.apiKey ? 'Present ✅' : 'Missing ❌');
    console.log('📨 Prompt being sent:\n', prompt);

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
        }]
      })
    });

    console.log('📦 Response Status Code:', response.status);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('❌ Gemini API Error Response:', errorBody);
      throw new Error(`Gemini API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Log full response (optional)
    console.log('✅ Gemini API Success Response:', JSON.stringify(data, null, 2));

    const message = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!message) {
      console.error('❌ Gemini response is missing expected text content.');
      throw new Error('Empty or malformed Gemini response');
    }

    return message;
  } catch (error) {
    console.error('🚨 Gemini API Error (Caught in Catch Block):', error);
    throw new Error('Failed to generate AI response');
  }
}

}
