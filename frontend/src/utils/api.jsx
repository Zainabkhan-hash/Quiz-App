import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Get questions by difficulty
export const getQuestionsByDifficulty = async (difficulty) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/questions/difficulty/${difficulty}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

// Get random questions
export const getRandomQuestions = async (difficulty, count) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/questions/random/${difficulty}/${count}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching random questions:', error);
    throw error;
  }
};

// Save quiz result
export const saveResult = async (resultData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/results`, resultData);
    return response.data;
  } catch (error) {
    console.error('Error saving result:', error);
    throw error;
  }
};

// Get leaderboard
export const getLeaderboard = async (difficulty = null) => {
  try {
    const url = difficulty 
      ? `${API_BASE_URL}/results/difficulty/${difficulty}`
      : `${API_BASE_URL}/results`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};