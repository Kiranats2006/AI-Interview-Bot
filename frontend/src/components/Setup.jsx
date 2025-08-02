import React, { useState } from 'react';

const roles = [
  { id: 'Frontend Developer', title: 'Frontend Developer', icon: '💻' },
  { id: 'Backend Developer', title: 'Backend Developer', icon: '⚙️' },
  { id: 'Full Stack Developer', title: 'Full Stack Developer', icon: '🚀' },
  { id: 'Data Scientist', title: 'Data Scientist', icon: '📊' },
  { id: 'Product Manager', title: 'Product Manager', icon: '📋' },
  { id: 'UI/UX Designer', title: 'UI/UX Designer', icon: '🎨' },
];

function Setup({ onStart }) {
  const [selectedRole, setSelectedRole] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4 text-2xl">
            🤖
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Interview Bot</h1>
          <p className="text-lg text-gray-600">Practice technical interviews with AI</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">💼</span>
            Select Your Role
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  selectedRole === role.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="text-2xl mb-2">{role.icon}</div>
                <div className="font-semibold text-gray-800">{role.title}</div>
              </button>
            ))}
          </div>

          <button
            onClick={() => onStart(selectedRole)}
            disabled={!selectedRole}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Start Interview
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setup;