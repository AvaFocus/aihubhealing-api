const express = require('express');
const router = express.Router();
const { archetypeQuestions } = require('../services/archetype');

// GET /api/archetypes - Get all archetype information
router.get('/', (req, res) => {
  try {
    const archetypes = {};
    
    for (const [key, config] of Object.entries(archetypeQuestions)) {
      archetypes[key] = {
        name: config.name,
        description: config.description,
        traits: config.traits,
        question_count: config.questions.length
      };
    }

    res.json({
      success: true,
      archetypes: archetypes,
      total_count: Object.keys(archetypes).length
    });

  } catch (error) {
    console.error('Error fetching archetypes:', error);
    res.status(500).json({
      error: 'Error fetching archetype information',
      message: error.message
    });
  }
});

// GET /api/archetypes/:type - Get specific archetype details
router.get('/:type', (req, res) => {
  try {
    const { type } = req.params;
    
    if (!archetypeQuestions[type]) {
      return res.status(404).json({
        error: 'Archetype not found',
        available_types: Object.keys(archetypeQuestions)
      });
    }

    const archetype = archetypeQuestions[type];
    
    res.json({
      success: true,
      archetype: {
        type: type,
        name: archetype.name,
        description: archetype.description,
        traits: archetype.traits,
        questions: archetype.questions,
        weights: archetype.weights,
        protocols: {
          starter: `${archetype.name} Starter Protocol`,
          pro: `${archetype.name} Pro Protocol`,
          elite: `${archetype.name} Elite Protocol`
        }
      }
    });

  } catch (error) {
    console.error('Error fetching archetype:', error);
    res.status(500).json({
      error: 'Error fetching archetype details',
      message: error.message
    });
  }
});

module.exports = router;
