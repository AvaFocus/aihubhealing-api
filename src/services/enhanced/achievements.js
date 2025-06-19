const achievements = [
  {
    id: 'idea_generator',
    name: 'Idea Generator',
    description: 'Created 10+ unique concepts',
    icon: 'sparkles',
    color: 'from-yellow-600 to-amber-600',
    criteria: { type: 'ideas_created', threshold: 10 }
  },
  {
    id: 'consistency_master',
    name: 'Consistency Master', 
    description: '7-day creative streak',
    icon: 'zap',
    color: 'from-indigo-600 to-purple-600',
    criteria: { type: 'streak_days', threshold: 7 }
  },
  {
    id: 'perfectionism_breaker',
    name: 'Perfectionism Breaker',
    description: 'Completed project without over-polishing',
    icon: 'check-circle',
    color: 'from-green-600 to-emerald-600',
    criteria: { type: 'perfectionism_overcome', threshold: 1 }
  },
  {
    id: 'confidence_builder',
    name: 'Confidence Builder',
    description: 'Increased confidence score by 25%',
    icon: 'trending-up',
    color: 'from-purple-600 to-pink-600',
    criteria: { type: 'confidence_increase', threshold: 25 }
  },
  {
    id: 'flow_master',
    name: 'Flow Master',
    description: 'Achieved 5+ flow states this week',
    icon: 'zap',
    color: 'from-cyan-600 to-blue-600',
    criteria: { type: 'flow_states', threshold: 5 }
  }
];

class AchievementService {
  static getUserAchievements(userId) {
    const userProgress = {
      ideas_created: Math.floor(Math.random() * 15) + 5,
      streak_days: Math.floor(Math.random() * 10) + 3,
      perfectionism_overcome: Math.floor(Math.random() * 3),
      confidence_increase: Math.floor(Math.random() * 40) + 10,
      flow_states: Math.floor(Math.random() * 8) + 2
    };
    
    const unlockedAchievements = achievements.filter(achievement => {
      const { type, threshold } = achievement.criteria;
      return userProgress[type] >= threshold;
    });
    
    return {
      unlocked: unlockedAchievements,
      total_unlocked: unlockedAchievements.length,
      progress: userProgress,
      next_achievements: achievements.filter(a => !unlockedAchievements.includes(a)).slice(0, 2)
    };
  }
  
  static getAchievementById(achievementId) {
    return achievements.find(a => a.id === achievementId);
  }
  
  static getAllAchievements() {
    return achievements;
  }
}

module.exports = AchievementService;
