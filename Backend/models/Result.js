import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  playerName: {
    type: String,
    default: 'Anonymous'
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  timeTaken: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Result', resultSchema);