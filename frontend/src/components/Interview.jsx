import React, { useState, useEffect, useRef } from 'react';
import { apiService } from '../services/api';

function Interview({ role, messages, setMessages, onComplete }) {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize interview
  useEffect(() => {
    startInterview();
  }, []);

  const startInterview = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.startInterview(role);
      
      if (!data.sessionId) {
        throw new Error('No session ID received from server');
      }

      setSessionId(data.sessionId);
      localStorage.setItem('currentInterviewSession', data.sessionId);
      
      setMessages([{
        type: 'bot',
        content: data.message || 'Welcome! Let\'s begin the interview.',
        timestamp: Date.now()
      }]);
      setQuestionCount(1);
    } catch (error) {
      console.error('Failed to start interview:', error);
      setMessages([{
        type: 'bot',
        content: 'Welcome! Let\'s start with your background. Tell me about yourself.',
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    // Validate session exists
    if (!sessionId) {
      console.error('No active interview session');
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Session error. Please refresh and start again.',
        timestamp: Date.now()
      }]);
      return;
    }

    // Add user message to chat
    const userMessage = {
      type: 'user',
      content: userInput,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      // Continue interview with current session
      const data = await apiService.continueInterview(sessionId, userInput);
      
      // Add bot response
      setMessages(prev => [...prev, {
        type: 'bot',
        content: data.message || 'Thank you for your response.',
        timestamp: Date.now()
      }]);

      // Update question count
      const newCount = questionCount + 1;
      setQuestionCount(newCount);

      // Complete after 6 questions (1 initial + 5 responses)
      if (newCount >= 6) {
        setTimeout(() => {
          // Store session before completing
          localStorage.setItem('feedbackSessionId', sessionId);
          localStorage.removeItem('currentInterviewSession');
          onComplete();
        }, 1500);
      }
    } catch (error) {
      console.error('Failed to continue interview:', error);
      
      // Fallback questions
      const fallbacks = [
        "Can you tell me more about that?",
        "What experience do you have in this area?",
        "How would you approach this problem?",
        "Can you give an example from your experience?",
        "What challenges did you face?",
        "Thank you! That concludes our interview."
      ];
      
      const fallbackMessage = fallbacks[Math.min(questionCount, fallbacks.length - 1)];
      
      setMessages(prev => [...prev, {
        type: 'bot',
        content: fallbackMessage,
        timestamp: Date.now()
      }]);

      // Still complete after 6 questions even if errors occur
      if (questionCount >= 5) {
        setTimeout(() => {
          localStorage.setItem('feedbackSessionId', sessionId);
          onComplete();
        }, 2000);
      } else {
        setQuestionCount(prev => prev + 1);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow">
                🤖
              </div>
              <div>
                <h2 className="font-bold text-gray-800 text-lg">{role} Interview</h2>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>Question {questionCount} of 6</span>
                </div>
              </div>
            </div>
            <div className="w-32 bg-gray-100 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(questionCount / 6) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 pb-28">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 overflow-y-auto max-h-[calc(100vh-220px)]">
            {messages.length === 0 && !isLoading && (
              <div className="text-center py-10 text-gray-500">
                The interview is starting...
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`flex mb-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-xs md:max-w-md lg:max-w-lg ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center text-white shadow ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 ml-3' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 mr-3'
                  }`}>
                    {message.type === 'user' ? '👤' : '🤖'}
                  </div>
                  <div className={`px-3 py-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-green-50 text-gray-800 rounded-tr-none border border-green-100' 
                      : 'bg-blue-50 text-gray-800 rounded-tl-none border border-blue-100'
                  } shadow-sm`}>
                    <div className="whitespace-pre-wrap text-gray-800">{message.content}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex">
                  <div className="w-8 h-8 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 mr-3 flex items-center justify-center text-white shadow">
                    🤖
                  </div>
                  <div className="bg-blue-50 px-3 py-2 rounded-lg rounded-tl-none border border-blue-100 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your response..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-800"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!userInput.trim() || isLoading || !sessionId}
              className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 ${
                !userInput.trim() || isLoading || !sessionId
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md'
              }`}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            {!sessionId ? 'Initializing session...' : 'Press Enter to send'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;