import Setup from '../../frontend/src/components/Setup';
import Interview from '../../frontend/src/components/Interview';
import Feedback from '../../frontend/src/components/Feedback';
import React, { useState } from 'react';

function App() {
  const [step, setStep] = useState('setup');
  const [selectedRole, setSelectedRole] = useState('');
  const [messages, setMessages] = useState([]);

  const handleStart = (role) => {
    setSelectedRole(role);
    setStep('interview');
  };

  const handleComplete = () => {
    setStep('feedback');
  };

  const handleRestart = () => {
    setStep('setup');
    setSelectedRole('');
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {step === 'setup' && <Setup onStart={handleStart} />}
      
      {step === 'interview' && (
        <Interview 
          role={selectedRole}
          messages={messages}
          setMessages={setMessages}
          onComplete={handleComplete}
        />
      )}
      
      {step === 'feedback' && (
        <Feedback 
          role={selectedRole}
          messages={messages}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;