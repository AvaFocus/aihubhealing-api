const express = require('express');
const router = express.Router();
const { User, Protocol } = require('../models');
const { archetypeQuestions } = require('../services/archetype');

// Protocol templates for each archetype
const protocolTemplates = {
  alpha: {
    name: "Excellence Optimizer Protocol",
    focus: "Transform perfectionism into productive excellence",
    modules: [
      {
        week: 1,
        title: "Perfectionism Audit",
        description: "Identify and analyze perfectionist patterns",
        actions: ["Track perfectionist triggers", "Quality vs perfection analysis", "Set 'good enough' standards"],
        resources: ["Perfectionism assessment worksheet", "Quality threshold guide"]
      },
      {
        week: 2,
        title: "Excellence Standards Framework", 
        description: "Build sustainable quality systems",
        actions: ["Define excellence criteria", "Create quality checkpoints", "Implement progressive refinement"],
        resources: ["Excellence framework template", "Quality control checklist"]
      },
      {
        week: 3,
        title: "Productive Perfectionism",
        description: "Channel perfectionism productively", 
        actions: ["Time-boxed quality sessions", "Iterative improvement cycles", "Strategic perfectionism"],
        resources: ["Time-boxing templates", "Iteration planning guide"]
      },
      {
        week: 4,
        title: "Excellence Automation",
        description: "Systematize high standards",
        actions: ["Build quality systems", "Automate excellence checks", "Scale quality processes"],
        resources: ["Quality automation tools", "Systems optimization guide"]
      }
    ]
  },
  beta: {
    name: "Focus Architect Protocol",
    focus: "Build sustained focus and complete high-impact projects",
    modules: [
      {
        week: 1,
        title: "Shiny Object Inventory",
        description: "Map and prioritize current projects",
        actions: ["List all active projects", "Priority matrix creation", "Project completion assessment"],
        resources: ["Project inventory template", "Priority matrix guide"]
      },
      {
        week: 2,
        title: "Focus Foundation",
        description: "Build focus infrastructure",
        actions: ["Single-tasking protocols", "Distraction elimination", "Deep work blocks"],
        resources: ["Focus tracking tools", "Distraction audit worksheet"]
      },
      {
        week: 3,
        title: "Project Completion System",
        description: "Develop finishing capabilities",
        actions: ["Completion criteria definition", "Progress tracking system", "Momentum maintenance"],
        resources: ["Completion framework", "Progress tracking templates"]
      },
      {
        week: 4,
        title: "Focus Mastery",
        description: "Sustain long-term focus",
        actions: ["Focus habit stacking", "Attention training", "Long-term focus planning"],
        resources: ["Habit stacking guide", "Attention training exercises"]
      }
    ]
  }
};

// POST /api/ai/protocols - Generate personalized AI protocol
router.post('/protocols', async (req, res) => {
  try {
    const { user_id, archetype, customizations = {} } = req.body;

    if (!user_id || !archetype) {
      return res.status(400).json({
        error: 'user_id and archetype are required'
      });
    }

    // Validate archetype
    if (!archetypeQuestions[archetype]) {
      return res.status(400).json({
        error: 'Invalid archetype',
        available_archetypes: Object.keys(archetypeQuestions)
      });
    }

    // Get user data
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    // Get protocol template
    const template = protocolTemplates[archetype];
    if (!template) {
      return res.status(404).json({
        error: 'Protocol template not found for archetype'
      });
    }

    // Create personalized protocol
    const personalizedProtocol = {
      ...template,
      modules: template.modules.map(module => ({
        ...module,
        personalized_notes: `Customized for ${user.email} based on ${archetype} archetype profile`,
        user_specific_actions: module.actions.map(action => 
          `${action} (tailored for ${archetypeQuestions[archetype].name})`
        )
      }))
    };

    // Save protocol to database
    const protocol = new Protocol({
      user_id: user._id,
      archetype: archetype,
      protocol_type: customizations.type || 'standard',
      content: {
        overview: personalizedProtocol.focus,
        modules: personalizedProtocol.modules,
        personalization_notes: `Generated for ${archetype} archetype with confidence ${user.archetype_profile.confidence_score || 'unknown'}%`
      }
    });

    await protocol.save();

    res.json({
      success: true,
      protocol_id: protocol._id,
      archetype: archetype,
      content: personalizedProtocol,
      generated_at: protocol.generated_at,
      user_id: user_id
    });

  } catch (error) {
    console.error('AI protocol generation error:', error);
    res.status(500).json({
      error: 'Error generating AI protocol',
      message: error.message
    });
  }
});

// GET /api/ai/protocols/:user_id - Get user's protocols
router.get('/protocols/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const protocols = await Protocol.find({ user_id }).sort({ generated_at: -1 });

    res.json({
      success: true,
      protocols: protocols,
      count: protocols.length
    });

  } catch (error) {
    console.error('Error fetching protocols:', error);
    res.status(500).json({
      error: 'Error fetching user protocols',
      message: error.message
    });
  }
});

module.exports = router;
