import React, { useState, useEffect, useRef } from 'react';
import { apiService } from '../services/api';

function Interview({ role, messages, setMessages, onComplete }) {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    startInterview();
  }, []);

  const startInterview = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.startInterview(role);
      setMessages([{
        type: 'bot',
        content: data.message,
        timestamp: Date.now()
      }]);
      setQuestionCount(1);
    } catch (error) {
      setMessages([{
        type: 'bot',
        content: 'Welcome! Let\'s start with your background. Tell me about yourself.',
        timestamp: Date.now()
      }]);
    }
    setIsLoading(false);
  };

  const sendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      content: userInput,
      timestamp: Date.now()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    const history = newMessages.map(m => `${m.type}: ${m.content}`).join('\n');

    try {
      const data = await apiService.continueInterview(role, history, userInput);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: data.message,
        timestamp: Date.now()
      }]);
      
      setQuestionCount(prev => prev + 1);
      
      if (questionCount >= 5) {
        setTimeout(() => onComplete(), 2000);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Can you provide more details on that?',
        timestamp: Date.now()
      }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm border-b sticky top-4 z-10 mb-4">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                🤖
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">{role} Interview</h2>
                <div className="text-sm text-gray-500">🕒 Question {questionCount} of 6</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm min-h-96 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto max-h-96">
            {messages.map((message, index) => (
              <div key={index} className={`flex mb-6 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                    message.type === 'user' ? 'bg-green-600 ml-2' : 'bg-blue-600 mr-2'
                  }`}>
                    {message.type === 'user' ? '👤' : '🤖'}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-6">
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-blue-600 mr-2 flex items-center justify-center text-white">
                    🤖
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your answer..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!userInput.trim() || isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;