import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get questions by difficulty
router.get('/difficulty/:level', async (req, res) => {
  try {
    const { level } = req.params;
    const questions = await Question.find({ difficulty: level });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new question (for testing)
router.post('/', async (req, res) => {
  try {
    const question = new Question(req.body);
    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get random questions by difficulty
router.get('/random/:difficulty/:count', async (req, res) => {
  try {
    const { difficulty, count } = req.params;
    const questions = await Question.aggregate([
      { $match: { difficulty } },
      { $sample: { size: parseInt(count) } }
    ]);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;