class CorporateService {
  static generateTeamHeatmap() {
    const heatmapData = Array(64).fill(0).map((_, i) => {
      const intensity = Math.random();
      return {
        id: i,
        x: i % 8,
        y: Math.floor(i / 8),
        intensity: intensity,
        risk_level: intensity > 0.8 ? 'critical' : 
                   intensity > 0.6 ? 'high' : 
                   intensity > 0.4 ? 'medium' : 'low',
        employee_id: 'emp_' + i,
        department: ['Design', 'Marketing', 'Product', 'Engineering'][Math.floor(Math.random() * 4)]
      };
    });
    
    return heatmapData;
  }
  
  static getTeamAnalytics() {
    return {
      team_vitality: 76,
      peak_performers: 5,
      intervention_alerts: 2,
      departments: [
        { name: 'Design Team', risk: 'medium', vitality: 72, burnout_risk: 28 },
        { name: 'Marketing', risk: 'critical', vitality: 45, burnout_risk: 65 },
        { name: 'Product Team', risk: 'low', vitality: 88, burnout_risk: 15 },
        { name: 'Engineering', risk: 'medium', vitality: 70, burnout_risk: 35 }
      ],
      roi_projection: 327,
      cost_savings: 125000,
      productivity_increase: 23
    };
  }
  
  static getTeamConnections() {
    return [
      { from: 'emp_12', to: 'emp_25', strength: 0.8, type: 'collaboration' },
      { from: 'emp_8', to: 'emp_33', strength: 0.6, type: 'mentorship' },
      { from: 'emp_15', to: 'emp_41', strength: 0.9, type: 'innovation' },
      { from: 'emp_22', to: 'emp_7', strength: 0.7, type: 'support' },
      { from: 'emp_35', to: 'emp_18', strength: 0.5, type: 'communication' }
    ];
  }
  
  static getInterventionAlerts() {
    return [
      {
        id: 1,
        team: 'Design Team',
        type: 'burnout_risk',
        severity: 'medium',
        affected_members: 3,
        recommendation: 'Implement creative breaks and workload redistribution'
      },
      {
        id: 2,
        team: 'Marketing',
        type: 'creative_block',
        severity: 'critical',
        affected_members: 5,
        recommendation: 'Schedule team innovation workshop and stress reduction program'
      },
      {
        id: 3,
        team: 'Product Team',
        type: 'peak_performance',
        severity: 'positive',
        affected_members: 8,
        recommendation: 'Document and share successful collaboration patterns'
      }
    ];
  }
}

module.exports = CorporateService;
