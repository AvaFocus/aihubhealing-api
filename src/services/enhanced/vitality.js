const { User } = require('../../models');

class VitalityService {
  static generateVitalityData(userId, timeframe = 'week') {
    const data = {
      week: this.generateWeekData(),
      month: this.generateMonthData(), 
      year: this.generateYearData()
    };
    
    return data[timeframe];
  }
  
  static generateWeekData() {
    return Array(7).fill(0).map((_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      value: Math.floor(Math.random() * 30) + 60,
      date: new Date(Date.now() - (6-i) * 24 * 60 * 60 * 1000)
    }));
  }
  
  static generateMonthData() {
    return Array(30).fill(0).map((_, i) => ({
      day: i + 1,
      value: Math.floor(Math.random() * 40) + 50,
      date: new Date(Date.now() - (29-i) * 24 * 60 * 60 * 1000)
    }));
  }
  
  static generateYearData() {
    return Array(12).fill(0).map((_, i) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      value: Math.floor(Math.random() * 20) + 70,
      date: new Date(2024, i, 1)
    }));
  }
  
  static async getUserVitality(userId) {
    try {
      const currentVitality = Math.floor(Math.random() * 20) + 75;
      const burnoutRisk = Math.max(100 - currentVitality - 10, 10);
      
      return {
        current_vitality: currentVitality,
        burnout_risk: burnoutRisk,
        trend: currentVitality > 80 ? 'improving' : 'stable',
        weekly_data: this.generateWeekData(),
        predictions: this.generateForecast()
      };
    } catch (error) {
      throw new Error('Vitality calculation failed');
    }
  }
  
  static generateForecast() {
    return Array(7).fill(0).map((_, i) => ({
      date: new Date(Date.now() + (i+1) * 24 * 60 * 60 * 1000),
      predicted_energy: ['high', 'medium', 'peak', 'medium', 'high', 'low', 'medium'][i],
      confidence: Math.floor(Math.random() * 30) + 70
    }));
  }
}

module.exports = VitalityService;
