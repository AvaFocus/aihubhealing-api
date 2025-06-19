const archetypeQuestions = {
  alpha: {
    name: "Excellence Optimizer",
    description: "Transforms perfectionism into productive excellence",
    questions: [1, 3, 7, 12, 16],
    weights: [0.3, 0.25, 0.2, 0.15, 0.1],
    traits: ["perfectionism", "high_standards", "quality_focus"]
  },
  beta: {
    name: "Focus Architect",
    description: "Builds sustained focus and completes high-impact projects",
    questions: [2, 5, 8, 13, 17],
    weights: [0.3, 0.25, 0.2, 0.15, 0.1],
    traits: ["trend_chasing", "shiny_object", "scattered_focus"]
  },
  gamma: {
    name: "Validation Detox",
    description: "Develops internal validation and authentic creative voice",
    questions: [4, 6, 9, 14, 18],
    weights: [0.3, 0.25, 0.2, 0.15, 0.1],
    traits: ["people_pleasing", "external_validation", "approval_seeking"]
  },
  delta: {
    name: "Confidence Builder",
    description: "Builds unshakeable confidence and self-worth",
    questions: [10, 11, 15, 19, 20],
    weights: [0.3, 0.25, 0.2, 0.15, 0.1],
    traits: ["impostor_syndrome", "self_doubt", "undervaluing"]
  },
  sigma: {
    name: "Convergence Engine",
    description: "Masters multi-passionate convergence and integration",
    questions: [21, 22, 23, 24, 25],
    weights: [0.3, 0.25, 0.2, 0.15, 0.1],
    traits: ["multi_passionate", "jack_of_trades", "convergence_seeking"]
  }
};

function calculateArchetypeScores(responses) {
  const scores = {};
  for (const [archetype, config] of Object.entries(archetypeQuestions)) {
    let score = 0;
    config.questions.forEach((questionIndex, i) => {
      const response = responses[questionIndex - 1];
      score += response * config.weights[i];
    });
    scores[archetype] = Math.round(score * 100) / 100;
  }
  return scores;
}

function determineArchetypes(scores) {
  const sortedArchetypes = Object.entries(scores).sort(([,a], [,b]) => b - a);
  const primary = sortedArchetypes[0][0];
  const secondary = sortedArchetypes[1][0];
  const primaryScore = sortedArchetypes[0][1];
  const secondaryScore = sortedArchetypes[1][1];
  const scoreDifference = primaryScore - secondaryScore;
  const confidence = Math.min(100, Math.max(60, 60 + (scoreDifference * 20)));
  
  return {
    primary,
    secondary,
    confidence: Math.round(confidence),
    all_scores: scores
  };
}

module.exports = {
  archetypeQuestions,
  calculateArchetypeScores,
  determineArchetypes
};
