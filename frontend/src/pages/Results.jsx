import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveResult } from '../utils/api';  // ADD THIS IMPORT

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, answers, difficulty } = location.state || {
    score: 0,
    total: 0,
    answers: [],
    difficulty: 'easy'
  };

  const percentage = Math.round((score / total) * 100);

  // Determine performance message
  const getPerformanceMessage = () => {
    if (percentage >= 80) return { text: "Excellent! 🎉", color: "text-green-300" };
    if (percentage >= 60) return { text: "Good Job! 👍", color: "text-blue-300" };
    if (percentage >= 40) return { text: "Not Bad! 😊", color: "text-yellow-300" };
    return { text: "Keep Practicing! 💪", color: "text-orange-300" };
  };

  const performance = getPerformanceMessage();

  // Save to localStorage AND backend database
  useEffect(() => {
    // Save to localStorage (for local leaderboard)
    const leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
    
    const newEntry = {
      name: 'Player',
      score,
      total,
      percentage,
      difficulty,
      date: Date.now()
    };
    
    leaderboard.push(newEntry);
    localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));

    // Save to backend database
    const saveToBackend = async () => {
      try {
        const resultData = {
          playerName: 'Player',
          score,
          totalQuestions: total,
          percentage,
          difficulty
        };
        
        await saveResult(resultData);
        console.log('Result saved to database successfully!');
      } catch (error) {
        console.error('Failed to save result to database:', error);
        // App will still work with localStorage even if backend fails
      }
    };

    saveToBackend();
  }, [score, total, percentage, difficulty]);

  const handleRetry = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-8 md:p-12 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Quiz Complete! 🎊
          </h1>
          <p className={`text-3xl font-bold ${performance.color} mb-2`}>
            {performance.text}
          </p>
          <p className="text-white/80 text-lg capitalize">
            Difficulty: {difficulty}
          </p>
        </div>

        {/* Score Display */}
        <div className="glass p-8 rounded-2xl mb-8">
          <div className="flex justify-around items-center flex-wrap gap-6">
            <div className="text-center">
              <p className="text-white/70 text-lg mb-2">Your Score</p>
              <p className="text-white text-5xl font-bold">{score}/{total}</p>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-lg mb-2">Percentage</p>
              <p className="text-white text-5xl font-bold">{percentage}%</p>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-lg mb-2">Correct Answers</p>
              <p className="text-green-300 text-5xl font-bold">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-lg mb-2">Wrong Answers</p>
              <p className="text-red-300 text-5xl font-bold">{total - score}</p>
            </div>
          </div>
        </div>

        {/* Progress Circle Visual */}
        <div className="glass p-6 rounded-2xl mb-8">
          <h3 className="text-white text-xl font-semibold mb-4 text-center">
            Performance Overview
          </h3>
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-white text-4xl font-bold">{percentage}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Answer Review */}
        <div className="glass p-6 rounded-2xl mb-8 max-h-96 overflow-y-auto">
          <h3 className="text-white text-xl font-semibold mb-4">Answer Review</h3>
          <div className="space-y-4">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`glass p-4 rounded-xl ${
                  answer.isCorrect ? 'border-l-4 border-green-400' : 'border-l-4 border-red-400'
                }`}
              >
                <p className="text-white font-semibold mb-2">
                  Q{index + 1}. {answer.question}
                </p>
                <div className="text-sm">
                  {answer.selected !== null ? (
                    <>
                      <p className={`${answer.isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                        Your Answer: {answer.selected !== null ? String.fromCharCode(65 + answer.selected) : 'Not Answered'}
                        {answer.isCorrect ? ' ✓' : ' ✗'}
                      </p>
                      {!answer.isCorrect && (
                        <p className="text-green-300">
                          Correct Answer: {String.fromCharCode(65 + answer.correct)}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-orange-300">Not Answered (Time's Up)</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleRetry}
            className="glass-card py-4 px-8 text-white text-xl font-bold rounded-xl hover:bg-white/25 transition-all transform hover:scale-105"
          >
            🔄 Try Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="glass-card py-4 px-8 text-white text-xl font-bold rounded-xl hover:bg-white/25 transition-all transform hover:scale-105"
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;