import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Sparkles, AlertTriangle, Shield, TrendingUp, MessageCircle, MapPin } from 'lucide-react'

function AIChat() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [suggestedQuestions, setSuggestedQuestions] = useState([])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Initialize with welcome message and suggested questions
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: 'Hello! I\'m your AI Safety Assistant. I\'m here to help you with safety protocols, risk assessments, and compliance questions. How can I assist you today?',
        timestamp: new Date(),
        category: 'welcome'
      }
    ])

    setSuggestedQuestions([
      'What are the current safety protocols for Zone A?',
      'How do I report a safety incident?',
      'What PPE is required for hot work?',
      'How often should safety inspections be conducted?',
      'What are the emergency evacuation procedures?',
      'How do I request a work permit?'
    ])

    // Load chat history from localStorage
    const savedHistory = localStorage.getItem('aiChatHistory')
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory))
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const simulateAIResponse = async (userMessage) => {
    setIsTyping(true)
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
    
    // Generate AI response based on user input
    let aiResponse = ''
    let category = 'general'
    
    if (userMessage.toLowerCase().includes('zone a') || userMessage.toLowerCase().includes('zone')) {
      aiResponse = 'Zone A is currently operating under normal safety protocols. The area has been inspected within the last 4 hours and shows no immediate safety concerns. All safety equipment is operational and personnel are properly trained for the current operations.'
      category = 'zone_status'
    } else if (userMessage.toLowerCase().includes('incident') || userMessage.toLowerCase().includes('report')) {
      aiResponse = 'To report a safety incident, please use the Incident Tracker in the main dashboard. You can also contact your supervisor immediately. For emergencies, use the emergency hotline: 911. All incidents should be reported within 24 hours for proper investigation and documentation.'
      category = 'incident_reporting'
    } else if (userMessage.toLowerCase().includes('ppe') || userMessage.toLowerCase().includes('hot work')) {
      aiResponse = 'For hot work operations, the following PPE is mandatory: flame-resistant clothing, safety glasses with side shields, heat-resistant gloves, steel-toed boots, and hearing protection if noise levels exceed 85 dB. A fire watch must be maintained throughout the operation.'
      category = 'ppe_requirements'
    } else if (userMessage.toLowerCase().includes('inspection') || userMessage.toLowerCase().includes('safety check')) {
      aiResponse = 'Safety inspections should be conducted daily for high-risk areas, weekly for medium-risk areas, and monthly for low-risk areas. The AI system automatically schedules inspections based on risk assessments and historical data. You can view upcoming inspections in the Dashboard.'
      category = 'inspections'
    } else if (userMessage.toLowerCase().includes('evacuation') || userMessage.toLowerCase().includes('emergency')) {
      aiResponse = 'Emergency evacuation procedures: 1) Sound the alarm, 2) Stop all operations safely, 3) Exit via designated routes, 4) Proceed to assembly point, 5) Account for all personnel, 6) Wait for all-clear signal. Assembly points are marked with green signs throughout the facility.'
      category = 'emergency_procedures'
    } else if (userMessage.toLowerCase().includes('permit') || userMessage.toLowerCase().includes('work permit')) {
      aiResponse = 'Work permits can be requested through the Work Permit Management system. Fill out the required information including work type, location, duration, and safety measures. The AI system will assess the risk level and provide recommendations. Permits are typically approved within 2 hours for standard operations.'
      category = 'work_permits'
    } else {
      aiResponse = 'I understand your question about safety. Let me provide you with some general safety information. Always follow the established safety protocols, wear appropriate PPE, and report any concerns immediately. If you need specific information, please ask about a particular topic like zone status, incident reporting, or safety procedures.'
      category = 'general'
    }
    
    const aiMessage = {
      id: Date.now() + 1,
      type: 'ai',
      content: aiResponse,
      timestamp: new Date(),
      category: category
    }
    
    setMessages(prev => [...prev, aiMessage])
    setIsTyping(false)
    
    // Save to chat history
    const newHistory = [...chatHistory, { user: userMessage, ai: aiResponse, timestamp: new Date() }]
    setChatHistory(newHistory)
    localStorage.setItem('aiChatHistory', JSON.stringify(newHistory))
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!inputMessage.trim() || isTyping) return
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    
    // Generate AI response
    await simulateAIResponse(inputMessage)
  }

  const handleSuggestedQuestion = async (question) => {
    setInputMessage(question)
    // Auto-send the suggested question
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: question,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    
    // Generate AI response
    await simulateAIResponse(question)
  }

  const clearChatHistory = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'ai',
        content: 'Chat history cleared. How can I help you today?',
        timestamp: new Date(),
        category: 'welcome'
      }
    ])
    setChatHistory([])
    localStorage.removeItem('aiChatHistory')
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'zone_status': return <MapPin className="w-4 h-4 text-primary-400" />
      case 'incident_reporting': return <AlertTriangle className="w-4 h-4 text-warning-400" />
      case 'ppe_requirements': return <Shield className="w-4 h-4 text-success-400" />
      case 'inspections': return <TrendingUp className="w-4 h-4 text-primary-400" />
      case 'emergency_procedures': return <AlertTriangle className="w-4 h-4 text-danger-400" />
      case 'work_permits': return <MessageCircle className="w-4 h-4 text-primary-400" />
      default: return <Sparkles className="w-4 h-4 text-primary-400" />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'zone_status': return 'border-primary-500/30 bg-primary-500/10'
      case 'incident_reporting': return 'border-warning-500/30 bg-warning-500/10'
      case 'ppe_requirements': return 'border-success-500/30 bg-success-500/10'
      case 'inspections': return 'border-primary-500/30 bg-primary-500/10'
      case 'emergency_procedures': return 'border-danger-500/30 bg-danger-500/10'
      case 'work_permits': return 'border-primary-500/30 bg-primary-500/10'
      default: return 'border-primary-500/30 bg-primary-500/10'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Safety Assistant</h2>
          <p className="text-dark-300">Get instant answers to safety questions and guidance</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearChatHistory}
          className="px-4 py-2 bg-dark-600 hover:bg-dark-700 text-white rounded-lg font-medium transition-all duration-200 text-sm"
        >
          Clear Chat
        </motion.button>
      </div>

      {/* Suggested Questions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-primary-400" />
          <span>Quick Questions</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestedQuestions.map((question, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSuggestedQuestion(question)}
              className="p-3 bg-dark-700/30 hover:bg-dark-700/50 border border-dark-600/20 rounded-lg text-left transition-all duration-200 text-sm text-dark-300 hover:text-white"
            >
              {question}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Chat Interface */}
      <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-dark-700/30 px-6 py-4 border-b border-dark-600/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">AI Safety Assistant</h3>
              <p className="text-dark-400 text-sm">Online • Ready to help</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-primary-600' 
                    : 'bg-gradient-to-br from-primary-500 to-primary-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`p-4 rounded-xl ${
                  message.type === 'user'
                    ? 'bg-primary-600 text-white'
                    : `bg-dark-700/50 text-white border ${getCategoryColor(message.category)}`
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {message.type === 'ai' && getCategoryIcon(message.category)}
                    <span className="text-xs text-dark-400">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="p-4 bg-dark-700/50 rounded-xl border border-dark-600/20">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="bg-dark-700/30 px-6 py-4 border-t border-dark-600/20">
          <form onSubmit={handleSendMessage} className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me about safety protocols, procedures, or any safety concerns..."
              className="flex-1 bg-dark-700/50 border border-dark-600/30 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50"
              disabled={isTyping}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-dark-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </motion.button>
          </form>
        </div>
      </div>

      {/* Chat Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-4 text-center"
        >
          <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-primary-400" />
          </div>
          <h4 className="text-white font-medium mb-2">Safety Protocols</h4>
          <p className="text-dark-300 text-sm">Get instant access to safety procedures and guidelines</p>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-4 text-center"
        >
          <div className="w-12 h-12 bg-warning-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6 text-warning-400" />
          </div>
          <h4 className="text-white font-medium mb-2">Risk Assessment</h4>
          <p className="text-dark-300 text-sm">AI-powered risk analysis and recommendations</p>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-dark-600/30 rounded-xl p-4 text-center"
        >
          <div className="w-12 h-12 bg-success-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-success-400" />
          </div>
          <h4 className="text-white font-medium mb-2">Compliance</h4>
          <p className="text-dark-300 text-sm">Stay updated with safety regulations and compliance</p>
        </motion.div>
      </div>
    </div>
  )
}

export default AIChat