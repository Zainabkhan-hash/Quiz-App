import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRandomQuestions } from '../utils/api';
import { playCorrectSound, playWrongSound, playTickSound } from '../utils/sounds';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { difficulty } = location.state || { difficulty: 'easy' };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [totalTimeLeft, setTotalTimeLeft] = useState(2400); 
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAnswered, setIsAnswered] = useState(false);

  const answeringRef = useRef(false);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await getRandomQuestions(difficulty, 50);
        if (data && data.length > 0) {
          setQuestions(data);
        } else {
          alert('No questions available for this difficulty!');
          navigate('/');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        alert('Failed to load questions. Please try again.');
        navigate('/');
      }
    };

    fetchQuestions();
  }, [difficulty, navigate]);

  // MAIN TIMER - Runs continuously for entire quiz
  useEffect(() => {
    if (loading || questions.length === 0) return;

    // Quiz time up!
    if (totalTimeLeft === 0) {
      finishQuiz();
      return;
    }

    // Play warning sound in last 5 minutes
    if (totalTimeLeft <= 300 && totalTimeLeft > 295) {
      playTickSound();
    }

    const timer = setInterval(() => {
      setTotalTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [totalTimeLeft, loading, questions]);

  const finishQuiz = () => {
    // Save current answer if any
    let finalAnswers = [...answers];
    
    if (currentQuestion < questions.length && !isAnswered) {
      // User didn't answer current question
      finalAnswers.push({
        question: questions[currentQuestion].question,
        selected: null,
        correct: questions[currentQuestion].correctAnswer,
        isCorrect: false
      });
    }

    navigate('/results', {
      state: {
        score,
        total: questions.length,
        answers: finalAnswers,
        difficulty
      }
    });
  };

  const handleAnswerClick = (index) => {
    if (showFeedback || isAnswered || answeringRef.current) return;

    answeringRef.current = true;
    setIsAnswered(true);
    setSelectedAnswer(index);
    setShowFeedback(true);

    const isCorrect = index === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }

    const answerData = {
      question: questions[currentQuestion].question,
      selected: index,
      correct: questions[currentQuestion].correctAnswer,
      isCorrect
    };

    const newScore = isCorrect ? score + 1 : score;

    // Auto move to next question after 1.5 seconds
    setTimeout(() => {
      moveToNextQuestion(answerData, newScore);
    }, 1500);
  };

  const moveToNextQuestion = (answerData, newScore) => {
    setAnswers(prev => [...prev, answerData]);
    setScore(newScore);

    if (currentQuestion < questions.length - 1) {
      // Move to next question
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsAnswered(false);
      answeringRef.current = false;
    } else {
      // All questions answered
      navigate('/results', {
        state: {
          score: newScore,
          total: questions.length,
          answers: [...answers, answerData],
          difficulty
        }
      });
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <p className="text-white text-xl mb-4">No questions available!</p>
          <button
            onClick={() => navigate('/')}
            className="glass-card py-3 px-6 text-white font-bold rounded-xl hover:bg-white/25"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-8 md:p-12 max-w-3xl w-full">
        {/* Header with Total Quiz Timer */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-white">
            <span className="text-lg font-semibold">Question {currentQuestion + 1}</span>
            <span className="text-white/70"> / {questions.length}</span>
          </div>
          <div className={`glass px-6 py-3 rounded-full ${totalTimeLeft <= 300 ? 'animate-pulse bg-red-500/20' : ''}`}>
            <span className={`text-xl font-bold ${totalTimeLeft <= 300 ? 'text-red-300' : 'text-white'}`}>
              ⏱️ {formatTime(totalTimeLeft)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="glass rounded-full h-3 mb-8 overflow-hidden">
          <div
            className="bg-white/40 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <div className="glass p-6 rounded-2xl mb-6">
          <h2 className="text-white text-2xl md:text-3xl font-bold">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-6">
          {question.options.map((option, index) => {
            let buttonClass = 'w-full glass p-4 rounded-xl text-left text-white font-medium transition-all';
            
            if (showFeedback) {
              if (index === question.correctAnswer) {
                buttonClass += ' bg-green-500/40 border-2 border-green-400';
              } else if (index === selectedAnswer) {
                buttonClass += ' bg-red-500/40 border-2 border-red-400';
              }
            } else {
              buttonClass += ' hover:bg-white/20 transform hover:scale-102 cursor-pointer';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={showFeedback || isAnswered}
                className={buttonClass}
              >
                <span className="text-lg">
                  {String.fromCharCode(65 + index)}. {option}
                  {showFeedback && index === question.correctAnswer && ' ✓'}
                  {showFeedback && index === selectedAnswer && index !== question.correctAnswer && ' ✗'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Score Display */}
        <div className="mt-6 text-center">
          <p className="text-white/80">
            Current Score: <span className="text-white font-bold text-xl">{score}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;