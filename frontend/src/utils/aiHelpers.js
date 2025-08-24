// AI Response Generator for Safety Questions
export const generateAIResponse = (userMessage) => {
  const message = userMessage.toLowerCase();
  
  // Safety-related responses
  if (message.includes('ppe') || message.includes('equipment') || message.includes('gear')) {
    return {
      content: "Personal Protective Equipment (PPE) is crucial for workplace safety. Always ensure you're wearing the appropriate gear for your task, including hard hats, safety glasses, gloves, and steel-toed boots when required. Check your equipment before each use and report any damage immediately.",
      type: 'safety-tip',
      priority: 'high'
    };
  }
  
  if (message.includes('permit') || message.includes('work permit')) {
    return {
      content: "Work permits are required for high-risk activities like hot work, confined space entry, or working at heights. Always verify your permit is current and follow all specified safety procedures. Never proceed without proper authorization.",
      type: 'procedure',
      priority: 'high'
    };
  }
  
  if (message.includes('incident') || message.includes('accident') || message.includes('report')) {
    return {
      content: "If you witness or are involved in an incident, immediately stop work, secure the area, and report it to your supervisor. Document everything and don't move anything unless it's necessary for safety. Your safety and the safety of others comes first.",
      type: 'emergency',
      priority: 'critical'
    };
  }
  
  if (message.includes('training') || message.includes('certification')) {
    return {
      content: "Regular safety training keeps everyone safe. Check your training status in the system and attend refresher courses as scheduled. New procedures or equipment require updated training before use.",
      type: 'information',
      priority: 'medium'
    };
  }
  
  if (message.includes('weather') || message.includes('conditions')) {
    return {
      content: "Weather conditions can significantly impact safety. Check the daily weather report and adjust work plans accordingly. High winds, rain, or extreme temperatures may require work stoppage or additional safety measures.",
      type: 'environmental',
      priority: 'medium'
    };
  }
  
  if (message.includes('emergency') || message.includes('evacuation')) {
    return {
      content: "Know your emergency procedures and evacuation routes. In case of emergency, follow the established protocols, use designated exits, and proceed to the assembly point. Don't use elevators during evacuations.",
      type: 'emergency',
      priority: 'critical'
    };
  }
  
  // Default helpful response
  return {
    content: "I'm here to help with any safety-related questions. You can ask me about PPE, work permits, incident reporting, training requirements, weather conditions, emergency procedures, or any other safety concerns. What would you like to know more about?",
    type: 'general',
    priority: 'low'
  };
};

// Safety Tips Database
export const safetyTips = [
  "Always perform a pre-task safety assessment before starting work",
  "Keep your work area clean and organized to prevent tripping hazards",
  "Use the buddy system when working in isolated areas",
  "Report near misses - they help prevent future incidents",
  "Take regular breaks to maintain focus and alertness",
  "Know the location of emergency equipment and first aid supplies",
  "Follow lockout/tagout procedures when servicing equipment",
  "Maintain proper posture to prevent ergonomic injuries",
  "Stay hydrated, especially in hot weather conditions",
  "Communicate clearly with team members about safety concerns"
];

// Risk Assessment Helper
export const assessRiskLevel = (activity, conditions) => {
  let riskScore = 0;
  
  // Activity-based risk
  if (activity.includes('height')) riskScore += 30;
  if (activity.includes('confined')) riskScore += 25;
  if (activity.includes('hot work')) riskScore += 20;
  if (activity.includes('electrical')) riskScore += 15;
  
  // Condition-based risk
  if (conditions.includes('weather')) riskScore += 10;
  if (conditions.includes('night')) riskScore += 15;
  if (conditions.includes('rush')) riskScore += 20;
  
  if (riskScore >= 60) return 'high';
  if (riskScore >= 30) return 'medium';
  return 'low';
};

// Predictive Safety Alerts
export const generatePredictiveAlert = (metrics, trends) => {
  const alerts = [];
  
  if (metrics.nearMisses > 10) {
    alerts.push({
      type: 'warning',
      message: 'Near miss incidents are above normal levels. Consider additional safety briefings.',
      priority: 'medium'
    });
  }
  
  if (metrics.riskScore > 70) {
    alerts.push({
      type: 'high-risk',
      message: 'Overall risk score is elevated. Review current safety protocols.',
      priority: 'high'
    });
  }
  
  if (trends === 'increasing') {
    alerts.push({
      type: 'info',
      message: 'Risk trends are increasing. Monitor closely and implement preventive measures.',
      priority: 'medium'
    });
  }
  
  return alerts;
};