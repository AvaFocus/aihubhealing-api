const express = require('express');
const router = express.Router();
const { calculateArchetypeScores, determineArchetypes } = require('../services/archetype');

// POST /api/realtime/quiz-analysis
router.post('/quiz-analysis', async (req, res) => {
  try {
    const { responses, currentQuestionIndex } = req.body;
    
    // Only analyze if we have at least 2 responses
    if (!responses || responses.length < 2) {
      return res.json({
        success: true,
        confidence: 0,
        predicted_archetype: null,
        emotional_intensity: Math.floor(Math.random() * 40) + 30
      });
    }
    
    // Calculate partial scores
    const partialScores = calculatePartialArchetypeScores(responses, currentQuestionIndex);
    const confidence = Math.min(responses.length * 20, 100);
    
    // Predict likely archetype
    const topArchetype = Object.entries(partialScores)
      .sort(([,a], [,b]) => b - a)[0][0];
    
    // Simulate emotional intensity based on question types
    const emotionalIntensity = calculateEmotionalIntensity(responses, currentQuestionIndex);
    
    res.json({
      success: true,
      confidence,
      predicted_archetype: topArchetype,
      emotional_intensity: emotionalIntensity,
      partial_scores: partialScores
    });
    
  } catch (error) {
    console.error('Real-time analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Real-time analysis failed'
    });
  }
});

// Helper function for partial scoring
function calculatePartialArchetypeScores(responses, currentIndex) {
  const scores = { alpha: 0, beta: 0, gamma: 0, delta: 0, sigma: 0 };
  
  responses.forEach((response, index) => {
    // Map questions to archetypes (simplified)
    const questionArchetypeMap = {
      0: 'alpha', 1: 'beta', 2: 'gamma', 3: 'delta', 4: 'sigma'
    };
    
    const archetype = questionArchetypeMap[index % 5];
    scores[archetype] += response * 0.2;
  });
  
  return scores;
}

function calculateEmotionalIntensity(responses, currentIndex) {
  // Simulate emotional intensity based on response patterns
  const intensity = responses.reduce((sum, response) => {
    return sum + (response > 3 ? response * 10 : response * 5);
  }, 0) / responses.length;
  
  return Math.min(Math.max(intensity, 30), 90);
}

module.exports = router;
