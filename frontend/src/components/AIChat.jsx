import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  MessageCircle, 
  X, 
  Sparkles,
  AlertTriangle,
  Shield,
  Clock,
  Zap
} from 'lucide-react';
import useStore from '../store/useStore';
import { generateAIResponse, safetyTips } from '../utils/aiHelpers';

const ChatMessage = ({ message, isAI }) => {
  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${isAI ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isAI 
            ? 'bg-gradient-to-br from-purple-500 to-indigo-600' 
            : 'bg-gradient-to-br from-blue-500 to-cyan-600'
        }`}>
          {isAI ? (
            <Bot className="w-4 h-4 text-white" />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        
        <motion.div
          className={`px-4 py-3 rounded-2xl shadow-sm ${
            isAI 
              ? 'bg-white border border-gray-200 text-gray-800' 
              : 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
          <div className={`flex items-center justify-between mt-2 text-xs ${
            isAI ? 'text-gray-500' : 'text-blue-100'
          }`}>
            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
            {isAI && (
              <div className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>AI</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const SafetyTipCard = ({ tip, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 cursor-pointer hover:shadow-md transition-all duration-200"
  >
    <div className="flex items-start space-x-2">
      <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
      <p className="text-sm text-gray-700">{tip}</p>
    </div>
  </motion.div>
);

const ChatInput = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-3">
      <div className="flex-1 relative">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me about safety procedures, PPE, permits, or any safety concerns..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200"
          rows="2"
          disabled={disabled}
        />
        <div className="absolute right-3 bottom-3 text-xs text-gray-400">
          Press Enter to send
        </div>
      </div>
      
      <motion.button
        type="submit"
        disabled={!input.trim() || disabled}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`p-3 rounded-xl transition-all duration-200 ${
          input.trim() && !disabled
            ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg hover:shadow-xl'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Send className="w-5 h-5" />
      </motion.button>
    </form>
  );
};

function AIChat() {
  const { chat, addChatMessage, setChatOpen, markChatAsRead } = useStore();
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  useEffect(() => {
    if (chat.isOpen) {
      markChatAsRead();
    }
  }, [chat.isOpen, markChatAsRead]);

  const handleSendMessage = async (message) => {
    // Add user message
    addChatMessage({
      type: 'user',
      content: message,
    });

    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      addChatMessage({
        type: 'ai',
        content: aiResponse.content,
      });
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const suggestedQuestions = [
    "What PPE do I need for this task?",
    "How do I report a near miss?",
    "What are the permit requirements?",
    "Tell me about emergency procedures",
  ];

  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };

  const toggleChat = () => {
    setChatOpen(!chat.isOpen);
  };

  // Memoize safety tips to prevent unnecessary re-renders
  const displayedTips = useMemo(() => 
    safetyTips.slice(0, 3), []
  );

  return (
    <>
      {/* Floating Chat Button */}
      {!chat.isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white z-50 hover:shadow-purple-500/50 transition-all duration-300"
        >
          <MessageCircle className="w-8 h-8" />
          {chat.unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
            >
              {chat.unreadCount}
            </motion.div>
          )}
        </motion.button>
      )}

      {/* Chat Interface */}
      <AnimatePresence>
        {chat.isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Safety Assistant</h3>
                    <p className="text-xs text-purple-100">Always here to help</p>
                  </div>
                </div>
                <button
                  onClick={toggleChat}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatContainerRef}>
              <AnimatePresence>
                {chat.messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isAI={message.type === 'ai'}
                  />
                ))}
              </AnimatePresence>
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {chat.messages.length === 1 && (
              <div className="px-4 pb-3">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <span>Quick Questions</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs text-left p-2 bg-gray-50 hover:bg-purple-50 rounded-lg border border-gray-200 hover:border-purple-300 transition-all duration-200"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Safety Tips */}
            <div className="px-4 pb-3">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-green-500" />
                <span>Safety Tips</span>
              </h4>
              <div className="space-y-2">
                {displayedTips.map((tip, index) => (
                  <SafetyTipCard key={index} tip={tip} index={index} />
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChat;