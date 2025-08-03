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
      blue: isSelected ? 'border-blue-500 ring-blue-200 shadow-blue-500/20' : 'hover:border-blue-300 hover:shadow-blue-200/10',
      purple: isSelected ? 'border-purple-500 ring-purple-200 shadow-purple-500/20' : 'hover:border-purple-300 hover:shadow-purple-200/10',
      indigo: isSelected ? 'border-indigo-500 ring-indigo-200 shadow-indigo-500/20' : 'hover:border-indigo-300 hover:shadow-indigo-200/10',
      green: isSelected ? 'border-green-500 ring-green-200 shadow-green-500/20' : 'hover:border-green-300 hover:shadow-green-200/10',
      amber: isSelected ? 'border-amber-500 ring-amber-200 shadow-amber-500/20' : 'hover:border-amber-300 hover:shadow-amber-200/10',
      pink: isSelected ? 'border-pink-500 ring-pink-200 shadow-pink-500/20' : 'hover:border-pink-300 hover:shadow-pink-200/10',
    };
    return colors[accent] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 flex items-center relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/60 to-indigo-200/60 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-200/60 to-pink-200/60 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-200/40 to-blue-200/40 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl text-5xl shadow-2xl animate-bounce">
              🤖
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl opacity-20 blur-lg animate-pulse"></div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-gray-800 mb-4 tracking-tight">
            AI Interview Coach
          </h1>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Master your next technical interview with{' '}
            <span className="text-blue-600 font-semibold">personalized AI feedback</span>{' '}
            and realistic practice sessions
          </p>
        </div>

        {/* Enhanced Main Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/60 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
            
            {/* Enhanced Section Header */}
            <div className="mb-10">
              <div className="flex items-center justify-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl">
                  🎯
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-3 text-center">
                Choose Your Path
              </h2>
              <p className="text-gray-600 text-center text-lg">
                Select the role you're preparing for to get tailored questions
              </p>
            </div>
            
            {/* Enhanced Role Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
              {roles.map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm ${
                      isSelected
                        ? `${getAccentColors(role.accent, true)} ring-4 scale-105 shadow-xl`
                        : `border-gray-200 hover:shadow-lg ${getAccentColors(role.accent, false)}`
                    }`}
                  >
                    {/* Subtle glow effect for selected */}
                    {isSelected && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${role.bg} opacity-5 rounded-2xl`}></div>
                    )}
                    
                    {/* Enhanced Icon */}
                    <div className={`relative inline-flex items-center justify-center w-18 h-18 rounded-2xl mb-4 text-4xl transition-all duration-300 ${
                      isSelected 
                        ? `bg-gradient-to-br ${role.bg} text-white shadow-lg transform scale-110` 
                        : `bg-gray-100 group-hover:bg-gray-200 text-gray-700 group-hover:scale-105`
                    }`}>
                      {role.icon}
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white text-sm shadow-lg animate-pulse">
                          ✓
                        </div>
                      )}
                    </div>
                    
                    <div className="relative">
                      <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-gray-900 transition-colors">
                        {role.title}
                      </h3>
                      <div className={`mx-auto h-1 bg-gradient-to-r ${role.bg} transition-all duration-300 rounded-full ${
                        isSelected ? 'w-14' : 'w-0 group-hover:w-14'
                      }`}></div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Enhanced Start Button */}
            <div className="flex justify-center">
              <button
                onClick={() => onStart && onStart(selectedRole)}
                disabled={!selectedRole}
                className={`relative overflow-hidden px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                  selectedRole 
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {selectedRole && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
                )}
                <span className="relative flex items-center justify-center">
                  <span className="mr-2"></span>
                  Start Practice Interview
                </span>
              </button>
            </div>

            {/* Enhanced Selected role indicator */}
            {selectedRole && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200 shadow-lg">
                  <span className="text-green-600 mr-2"></span>
                  <span className="text-green-800 font-medium">
                    Ready to practice as {selectedRole}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setup;