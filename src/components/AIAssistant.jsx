import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Send, Sparkles, User, Bot } from 'lucide-react'

const SUGGESTIONS = [
  "What projects has he built?",
  "What skills does he have?",
  "Which project is best for frontend roles?"
]

export default function AIAssistant({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm Dilshan's AI Agent. Ask me anything about his engineering stack, past work, or background!" }
  ])
  const [input, setInput] = useState('')
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSearchAI = (query) => {
    if (!query.trim()) return
    
    const userMsg = { role: 'user', text: query }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    setTimeout(() => {
      let reply = "I'm processing that! Dilshan specializes in building highly testable backend architectures with Spring Boot and .NET along with responsive React frontends. Is there a specific framework you're looking for?"
      const normalized = query.toLowerCase()

      if (normalized.includes('project')) {
        if (normalized.includes('frontend') || normalized.includes('best for frontend')) {
          reply = "For frontend-centric roles, Dilshan's React 18 dashboard integrated with Framer Motion and state management demonstrates his focus on building fluid, responsive, and highly polished UI/UX experiences."
        } else {
          reply = "Dilshan has built robust banking-grade microservices using Spring Boot, enterprise relational structures on PostgreSQL, and scalable web apps using ASP.NET. All paired with automated Selenium coverage patterns."
        }
      } else if (normalized.includes('skill') || normalized.includes('tech') || normalized.includes('stack')) {
        reply = "Dilshan's tech ecosystem covers: \n• Backend: Java, Spring Boot, ASP.NET Core\n• Frontend: React 18, Next.js, Modern CSS/Sass\n• Databases & Ops: PostgreSQL, Docker\n• Quality Assurance: Selenium WebDriver suite automated testing."
      }

      setMessages(prev => [...prev, { role: 'bot', text: reply }])
    }, 600)
  }

  return (
    <motion.div 
      className="ai-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="ai-card"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
      >
        <div className="ai-header">
          <div className="ai-title">
            <Sparkles size={18} className="ai-glow-icon" />
            <h3>Portfolio Intelligence</h3>
          </div>
          <button onClick={onClose} className="ai-close-btn"><X size={18} /></button>
        </div>

        <div className="ai-chat-body">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble-container ${msg.role}`}>
              <div className="avatar">
                {msg.role === 'bot' ? <Bot size={14} /> : <User size={14} />}
              </div>
              <div className="chat-bubble">
                {msg.text.split('\n').map((line, idx) => <p key={idx}>{line}</p>)}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="ai-suggestions">
          {SUGGESTIONS.map((s, i) => (
            <button key={i} onClick={() => handleSearchAI(s)} className="suggestion-chip">
              {s}
            </button>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSearchAI(input); }} className="ai-input-form">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my expertise or stack..." 
          />
          <button type="submit" className="ai-send-btn"><Send size={16} /></button>
        </form>
      </motion.div>
    </motion.div>
  )
}