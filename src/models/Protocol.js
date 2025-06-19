const mongoose = require('mongoose');

const protocolSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  archetype: {
    type: String,
    enum: ['alpha', 'beta', 'gamma', 'delta', 'sigma'],
    required: true
  },
  protocol_type: {
    type: String,
    default: 'standard'
  },
  content: {
    overview: String,
    modules: [{
      week: Number,
      title: String,
      description: String,
      actions: [String],
      resources: [String],
      completion_criteria: String
    }],
    personalization_notes: String
  },
  progress: {
    current_module: {
      type: Number,
      default: 1
    },
    completed_modules: [Number],
    completion_percentage: {
      type: Number,
      default: 0
    },
    last_accessed: Date
  },
  generated_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

protocolSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Protocol', protocolSchema);
