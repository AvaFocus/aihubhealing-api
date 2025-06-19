const express = require('express');
const router = express.Router();
const { User, QuizResponse } = require('../models');
const { calculateArchetypeScores, determineArchetypes } = require('../services/archetype');

// POST /api/quiz/process - Process quiz responses and determine archetype
router.post('/process', async (req, res) => {
  try {
    const { responses, user_email, user_data = {} } = req.body;

    // Validate input
    if (!responses || !Array.isArray(responses) || responses.length !== 25) {
      return res.status(400).json({
        error: 'Exactly 25 quiz responses required',
        received: responses ? responses.length : 0
      });
    }

    if (!user_email) {
      return res.status(400).json({
        error: 'user_email is required'
      });
    }

    // Validate each response is 1-5
    for (let i = 0; i < responses.length; i++) {
      if (responses[i] < 1 || responses[i] > 5) {
        return res.status(400).json({
          error: `Invalid response at question ${i + 1}. Must be 1-5.`,
          value: responses[i]
        });
      }
    }

    // Calculate archetype scores
    const scores = calculateArchetypeScores(responses);
    const archetypeResults = determineArchetypes(scores);

    // Find or create user
    let user = await User.findOne({ email: user_email.toLowerCase() });
    if (!user) {
      user = new User({
        email: user_email.toLowerCase(),
        archetype_profile: {
          primary: archetypeResults.primary,
          secondary: archetypeResults.secondary,
          scores: archetypeResults.all_scores,
          confidence_score: archetypeResults.confidence,
          last_assessed: new Date()
        },
        metadata: {
          source: 'quiz',
          created_at: new Date()
        }
      });
    } else {
      // Update existing user archetype profile
      user.archetype_profile = {
        primary: archetypeResults.primary,
        secondary: archetypeResults.secondary,
        scores: archetypeResults.all_scores,
        confidence_score: archetypeResults.confidence,
        last_assessed: new Date()
      };
      user.metadata.updated_at = new Date();
    }

    await user.save();

    // Save quiz response
    const quizResponse = new QuizResponse({
      user_id: user._id,
      responses: responses.map((value, index) => ({
        question_id: index + 1,
        response_value: value,
        response_time_ms: user_data.response_times ? user_data.response_times[index] : null
      })),
      archetype_results: {
        scores: archetypeResults.all_scores,
        primary_archetype: archetypeResults.primary,
        secondary_archetype: archetypeResults.secondary,
        analysis_summary: `Primary: ${archetypeResults.primary}, Secondary: ${archetypeResults.secondary}, Confidence: ${archetypeResults.confidence}%`
      },
      ip_address: req.ip,
      user_agent: req.get('User-Agent')
    });

    await quizResponse.save();

    // Return results
    res.json({
      success: true,
      user_id: user._id,
      archetype_results: {
        primary_archetype: archetypeResults.primary,
        secondary_archetype: archetypeResults.secondary,
        confidence_score: archetypeResults.confidence,
        all_scores: archetypeResults.all_scores
      },
      quiz_response_id: quizResponse._id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Quiz processing error:', error);
    res.status(500).json({
      error: 'Internal server error processing quiz',
      message: error.message
    });
  }
});

module.exports = router;
