import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Home = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz', { state: { difficulty } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-8 md:p-12 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            QuizMaster
          </h1>
          <p className="text-white/80 text-lg">
            Test your knowledge and challenge yourself!
          </p>
        </div>
        {/* Difficulty Selection */}
        <div className="mb-8">
          <label className="block text-white text-lg font-semibold mb-4">
            Select Difficulty:
          </label>
          <div className="grid grid-cols-3 gap-4">
            {['easy', 'medium', 'hard'].map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`glass py-4 px-6 rounded-xl text-white font-semibold capitalize transition-all ${
                  difficulty === level
                    ? 'bg-white/30 scale-105'
                    : 'hover:bg-white/20'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass p-4 rounded-lg text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <p className="text-white/90 font-medium">Timed Challenge</p>
          </div>
          <div className="glass p-4 rounded-lg text-center">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-white/90 font-medium">Track Progress</p>
          </div>
          <div className="glass p-4 rounded-lg text-center">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-white/90 font-medium">View Results</p>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={startQuiz}
          className="w-full glass-card py-4 px-8 text-white text-xl font-bold rounded-xl hover:bg-white/25 transition-all transform hover:scale-105"
        >
          Start Quiz →
        </button>

        <button
        onClick={() => navigate('/leaderboard')}
        className="w-full glass-card py-4 px-8 text-white text-xl font-bold rounded-xl hover:bg-white/25 transition-all transform hover:scale-105 mt-4"
        >
       🏆 View Leaderboard
        </button>
        {/* Stats */}
        <div className="mt-8 flex justify-around text-white/80">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">50+</p>
            <p className="text-sm">Questions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-sm">Levels</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">∞</p>
            <p className="text-sm">Attempts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;