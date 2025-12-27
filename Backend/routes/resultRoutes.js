import express from 'express';
import Result from '../models/Result.js';

const router = express.Router();

// Save quiz result
router.post('/', async (req, res) => {
  try {
    const result = new Result(req.body);
    const savedResult = await result.save();
    res.status(201).json(savedResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all results (leaderboard)
router.get('/', async (_req, res) => {
  try {
    const results = await Result.find()
      .sort({ percentage: -1, createdAt: 1 })
      .limit(10);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get results by difficulty
router.get('/difficulty/:level', async (req, res) => {
  try {
    const { level } = req.params;
    const results = await Result.find({ difficulty: level })
      .sort({ percentage: -1 })
      .limit(10);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;