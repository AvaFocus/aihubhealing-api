const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  groove_contact_id: String,
  stripe_customer_id: String,
  
  archetype_profile: {
    primary: {
      type: String,
      enum: ['alpha', 'beta', 'gamma', 'delta', 'sigma']
    },
    secondary: {
      type: String,
      enum: ['alpha', 'beta', 'gamma', 'delta', 'sigma']
    },
    scores: {
      alpha: { type: Number, default: 0 },
      beta: { type: Number, default: 0 },
      gamma: { type: Number, default: 0 },
      delta: { type: Number, default: 0 },
      sigma: { type: Number, default: 0 }
    },
    confidence_score: { type: Number, min: 0, max: 100 },
    last_assessed: Date
  },
  
  subscription: {
    plan: {
      type: String,
      enum: ['starter', 'pro', 'elite'],
      default: 'starter'
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active'
    },
    stripe_subscription_id: String,
    started_at: Date,
    expires_at: Date
  },
  
  progress: {
    protocols_completed: [String],
    current_protocol: String,
    completion_rate: { type: Number, default: 0 },
    last_active: Date,
    engagement_score: { type: Number, default: 0 },
    milestones_achieved: [String]
  },
  
  preferences: {
    communication_frequency: String,
    time_zone: String,
    preferred_contact_method: String
  },
  
  metadata: {
    source: String,
    utm_params: mongoose.Schema.Types.Mixed,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  }
});

userSchema.pre('save', function(next) {
  this.metadata.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
