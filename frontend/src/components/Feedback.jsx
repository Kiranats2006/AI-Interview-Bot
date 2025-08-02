import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

function Feedback({ role, messages, onRestart }) {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateFeedback();
  }, []);

  const generateFeedback = async () => {
    const history = messages.map(m => `${m.type}: ${m.content}`).join('\n');
    
    try {
      const data = await apiService.generateFeedback(role, history);
      setFeedback(data.feedback);
    } catch (error) {
      setFeedback('Great job completing the interview! You showed good problem-solving skills and communication. Keep practicing to improve further.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-4 text-2xl">
            ✅
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Interview Complete!</h1>
          <p className="text-lg text-gray-600">Here's your detailed feedback</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Generating your feedback...</p>
            </div>
          ) : (
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {feedback}
              </div>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button
              onClick={onRestart}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
            >
              Start New Interview
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;