const mongoose = require('mongoose');

const quizResponseSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quiz_version: {
    type: String,
    default: 'v1.0'
  },
  responses: [{
    question_id: {
      type: Number,
      required: true
    },
    question_text: String,
    response_value: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    response_time_ms: Number
  }],
  archetype_results: {
    scores: {
      alpha: Number,
      beta: Number,
      gamma: Number,
      delta: Number,
      sigma: Number
    },
    primary_archetype: {
      type: String,
      enum: ['alpha', 'beta', 'gamma', 'delta', 'sigma']
    },
    secondary_archetype: {
      type: String,
      enum: ['alpha', 'beta', 'gamma', 'delta', 'sigma']
    },
    analysis_summary: String,
    ai_insights: String
  },
  completed_at: {
    type: Date,
    default: Date.now
  },
  ip_address: String,
  user_agent: String
});

module.exports = mongoose.model('QuizResponse', quizResponseSchema);
