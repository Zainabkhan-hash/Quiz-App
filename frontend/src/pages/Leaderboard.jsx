import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Get leaderboard from localStorage
    const saved = localStorage.getItem('quizLeaderboard');
    if (saved) {
      const data = JSON.parse(saved);
      // Sort by score (descending), then by time (ascending)
      data.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.date - b.date;
      });
      setLeaderboard(data.slice(0, 10)); // Top 10
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-8 md:p-12 max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            🏆 Leaderboard
          </h1>
          <p className="text-white/80 text-lg">
            Top 10 Quiz Masters
          </p>
        </div>

        {leaderboard.length === 0 ? (
          <div className="glass p-8 rounded-2xl text-center">
            <p className="text-white text-xl">No scores yet! Be the first to play!</p>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {leaderboard.map((entry, index) => (
              <div
                key={index}
                className={`glass p-6 rounded-xl flex items-center justify-between ${
                  index === 0 ? 'bg-yellow-500/20 border-2 border-yellow-400' :
                  index === 1 ? 'bg-gray-400/20 border-2 border-gray-300' :
                  index === 2 ? 'bg-orange-600/20 border-2 border-orange-500' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-white">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </span>
                  <div>
                    <p className="text-white font-bold text-xl">{entry.name}</p>
                    <p className="text-white/70 text-sm capitalize">Difficulty: {entry.difficulty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-2xl">{entry.score}/{entry.total}</p>
                  <p className="text-white/70 text-sm">{entry.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="w-full glass-card py-4 px-8 text-white text-xl font-bold rounded-xl hover:bg-white/25 transition-all transform hover:scale-105"
        >
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;