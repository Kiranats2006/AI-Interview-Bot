import React, { useState } from 'react';

const roles = [
  { id: 'Frontend Developer', title: 'Frontend Developer', icon: '💻', bg: 'from-blue-400 to-blue-600', accent: 'blue' },
  { id: 'Backend Developer', title: 'Backend Developer', icon: '⚙️', bg: 'from-purple-400 to-purple-600', accent: 'purple' },
  { id: 'Full Stack Developer', title: 'Full Stack Developer', icon: '🚀', bg: 'from-indigo-400 to-indigo-600', accent: 'indigo' },
  { id: 'Data Scientist', title: 'Data Scientist', icon: '📊', bg: 'from-green-400 to-green-600', accent: 'green' },
  { id: 'Product Manager', title: 'Product Manager', icon: '📋', bg: 'from-amber-400 to-amber-600', accent: 'amber' },
  { id: 'UI/UX Designer', title: 'UI/UX Designer', icon: '🎨', bg: 'from-pink-400 to-pink-600', accent: 'pink' },
];

function Setup({ onStart }) {
  const [selectedRole, setSelectedRole] = useState('');

  const getAccentColors = (accent, isSelected) => {
    const colors = {
      blue: isSelected ? 'border-blue-500 bg-blue-50 ring-blue-200 shadow-blue-100' : 'hover:border-blue-300 hover:bg-blue-25',
      purple: isSelected ? 'border-purple-500 bg-purple-50 ring-purple-200 shadow-purple-100' : 'hover:border-purple-300 hover:bg-purple-25',
      indigo: isSelected ? 'border-indigo-500 bg-indigo-50 ring-indigo-200 shadow-indigo-100' : 'hover:border-indigo-300 hover:bg-indigo-25',
      green: isSelected ? 'border-green-500 bg-green-50 ring-green-200 shadow-green-100' : 'hover:border-green-300 hover:bg-green-25',
      amber: isSelected ? 'border-amber-500 bg-amber-50 ring-amber-200 shadow-amber-100' : 'hover:border-amber-300 hover:bg-amber-25',
      pink: isSelected ? 'border-pink-500 bg-pink-50 ring-pink-200 shadow-pink-100' : 'hover:border-pink-300 hover:bg-pink-25',
    };
    return colors[accent] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-5xl mx-auto w-full relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl mb-6 text-4xl shadow-2xl animate-bounce">
            🤖
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
            AI Interview Coach
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Master your next technical interview with personalized AI feedback and realistic practice sessions
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white-800 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
          {/* Section Header */}
          <div className="mb-10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                🎯
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
              Choose Your Path
            </h2>
            <p className="text-gray-500 text-center text-lg">Select the role you're preparing for to get tailored questions</p>
          </div>
          
          {/* Role Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${
                    isSelected
                      ? `${getAccentColors(role.accent, true)} ring-4 scale-105 shadow-xl`
                      : `border-gray-200 bg-white hover:shadow-lg ${getAccentColors(role.accent, false)}`
                  }`}
                >
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${role.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Icon with animated background */}
                  <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-3xl transition-all duration-300 ${
                    isSelected 
                      ? `bg-gradient-to-br ${role.bg} text-white shadow-lg` 
                      : `bg-gradient-to-br ${role.bg} bg-opacity-10 group-hover:bg-opacity-20`
                  }`}>
                    {role.icon}
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <h3 className="font-bold text-white-800 text-lg mb-1 group-hover:text-gray-900 transition-colors">
                      {role.title}
                    </h3>
                    <div className={`w-0 h-0.5 bg-gradient-to-r ${role.bg} transition-all duration-300 group-hover:w-full ${isSelected ? 'w-full' : ''}`}></div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Start Button */}
          <div className="flex justify-center">
            <button
              onClick={() => onStart(selectedRole)}
              disabled={!selectedRole}
              className={`relative overflow-hidden px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                selectedRole 
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 hover:scale-105'
                  : 'bg-gray-300 text-white-500 cursor-not-allowed'
              }`}
            >
              {selectedRole && (
                <div className="absolute inset-0 bg-blue from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
              )}
              <span className="relative flex items-center justify-center">
                <span className="mr-2"></span>
                Start Practice Interview
              </span>
            </button>
          </div>

          {/* Selected role indicator */}
          {selectedRole && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200">
                <span className="text-green-600 mr-2">✨</span>
                <span className="text-green-800 font-medium">
                  Ready to practice as {selectedRole}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Setup;