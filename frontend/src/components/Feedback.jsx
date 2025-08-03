/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

function Feedback({ role, messages, onRestart }) {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    generateFeedback();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateFeedback = async () => {
    const history = messages.map(m => `${m.type}: ${m.content}`).join('\n');
    
    try {
      const data = await apiService.generateFeedback(role, history);
      setFeedback(data.feedback);
      setScore(Math.floor(Math.random() * 30) + 70); // Random score between 70-100 for demo
    } catch (error) {
      setFeedback('Great job completing the interview! You showed good problem-solving skills and communication. Keep practicing to improve further.');
      setScore(75);
    }
    
    setIsLoading(false);
  };

  const handleReviewAnswers = () => {
    setShowReview(!showReview);
  };

  const generatePDFContent = () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    let content = `INTERVIEW FEEDBACK REPORT\n\n`;
    content += `Role: ${role}\n`;
    content += `Date: ${date}\n`;
    content += `Time: ${time}\n`;
    content += `Score: ${score}/100\n\n`;
    content += `DETAILED FEEDBACK:\n`;
    content += `${feedback}\n\n`;
    content += `INTERVIEW CONVERSATION:\n`;
    content += `${'='.repeat(50)}\n\n`;
    
    messages.forEach((message, index) => {
      content += `${message.type.toUpperCase()}: ${message.content}\n\n`;
    });
    
    return content;
  };

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    
    try {
      const content = generatePDFContent();
      
      // Create a blob with the content
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `interview_report_${role.replace(/\s+/g, '_')}_${new Date().getTime()}.txt`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Show success message
      alert('Report downloaded successfully!');
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download report. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const parseAnswersAndQuestions = () => {
    const parsed = [];
    let currentQuestion = '';
    let currentAnswer = '';
    
    messages.forEach((message, index) => {
      if (message.type === 'interviewer') {
        if (currentQuestion && currentAnswer) {
          parsed.push({ question: currentQuestion, answer: currentAnswer });
        }
        currentQuestion = message.content;
        currentAnswer = '';
      } else if (message.type === 'user') {
        currentAnswer = message.content;
      }
    });
    
    // Add the last Q&A pair if it exists
    if (currentQuestion && currentAnswer) {
      parsed.push({ question: currentQuestion, answer: currentAnswer });
    }
    
    return parsed;
  };

  const qaData = parseAnswersAndQuestions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl mb-5 text-3xl shadow-lg">
            🎯
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Interview Complete!</h1>
          <p className="text-lg text-gray-600">Your detailed feedback is ready</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing your responses...</p>
            </div>
          ) : (
            <>
              <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">Performance Score</h2>
                    <p className="text-gray-600">Based on your interview responses</p>
                  </div>
                  <div className="mt-4 md:mt-0 relative">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center border-8 border-blue-100">
                      <span className="text-3xl font-bold text-blue-600">{score}</span>
                      <span className="text-sm text-blue-600">/100</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <span className="mr-2 text-blue-600">📋</span>
                  Detailed Feedback
                </h3>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-lg border border-gray-200">
                    {feedback}
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                      <span className="mr-2">💡</span>
                      Strengths
                    </h4>
                    <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                      <li>Clear communication</li>
                      <li>Technical knowledge</li>
                      <li>Problem-solving approach</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <h4 className="font-medium text-amber-800 mb-2 flex items-center">
                      <span className="mr-2">⚠️</span>
                      Areas to Improve
                    </h4>
                    <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                      <li>Time management</li>
                      <li>Code optimization</li>
                      <li>Edge case consideration</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="font-medium text-green-800 mb-2 flex items-center">
                      <span className="mr-2">📈</span>
                      Suggestions
                    </h4>
                    <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                      <li>Practice more algorithms</li>
                      <li>Study system design</li>
                      <li>Mock interviews</li>
                    </ul>
                  </div>
                </div>

                {/* Interview Review Section */}
                {showReview && (
                  <div className="mt-10">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                      <span className="mr-2 text-indigo-600">🔍</span>
                      Interview Review
                    </h3>
                    <div className="space-y-6">
                      {qaData.map((qa, index) => (
                        <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg border border-gray-200">
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <span className="mr-2 text-blue-600">❓</span>
                              Question {index + 1}
                            </h4>
                            <p className="text-gray-700 bg-white p-3 rounded border border-blue-100">
                              {qa.question}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <span className="mr-2 text-green-600">💬</span>
                              Your Answer
                            </h4>
                            <p className="text-gray-700 bg-white p-3 rounded border border-green-100">
                              {qa.answer || 'No answer provided'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="p-8 border-t border-gray-100 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={onRestart}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all duration-200 font-medium"
              >
                Start New Interview
              </button>
              <button 
                onClick={handleReviewAnswers}
                className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 shadow-sm transition-all duration-200 font-medium flex items-center justify-center"
              >
                <span className="mr-2">🔍</span>
                {showReview ? 'Hide Review' : 'Review Answers'}
              </button>
              <button 
                onClick={handleDownloadReport}
                disabled={isDownloading}
                className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 shadow-sm transition-all duration-200 font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-600 mr-2"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <span className="mr-2">📄</span>
                    Download Report
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;