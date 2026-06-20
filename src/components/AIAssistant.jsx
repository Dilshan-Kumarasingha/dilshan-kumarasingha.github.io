import { useState, useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { X, Send, Sparkles, User, Bot } from 'lucide-react'
import '../styles/AIAssistant.css'

const SUGGESTIONS = [
  'What projects has he built?',
  'What skills does he have?',
  'Which project is best for frontend roles?',
]

export default function AIAssistant({ onClose }) {
  const prefersReducedMotion = useReducedMotion()
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi! I'm Dilshan's AI Agent. Ask me anything about his engineering stack, past work, or background!",
    },
  ])
  const [input, setInput] = useState('')
  const chatEndRef = useRef(null)
  const cardRef = useRef(null)
  const inputRef = useRef(null)
  const pendingTimeoutRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus the input on open, and let Escape close the modal — standard
  // expectations for any dialog, not just nice-to-haves.
  useEffect(() => {
    inputRef.current?.focus()
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Cancel any pending bot reply if the modal closes before it fires —
  // otherwise a fast close-after-send triggers a setState-after-unmount.
  useEffect(() => {
    return () => {
      if (pendingTimeoutRef.current) {
        clearTimeout(pendingTimeoutRef.current)
      }
    }
  }, [])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const handleSearchAI = (query) => {
    if (!query.trim()) return

    const userMsg = { role: 'user', text: query }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    pendingTimeoutRef.current = setTimeout(() => {
      let reply =
        'Dilshan specializes in building testable backend architectures with Spring Boot and ASP.NET Core, paired with responsive React frontends. Ask me about his projects, skills, or background!'
      const normalized = query.toLowerCase()

      if (normalized.includes('project')) {
        if (normalized.includes('frontend')) {
          reply =
            'For frontend-focused roles, ShopQA is the strongest example — a full React 18 e-commerce UI with product catalogue, cart, and checkout flows, styled with Tailwind CSS and animated with Framer Motion.'
        } else {
          reply =
            "Dilshan has shipped two full systems: Flowspace, an async team-standup platform built on ASP.NET Core with real-time updates via SignalR, and ShopQA, a Spring Boot e-commerce platform with a complete Selenium/RestAssured QA framework layered on top."
        }
      } else if (
        normalized.includes('skill') ||
        normalized.includes('tech') ||
        normalized.includes('stack')
      ) {
        reply =
          "Dilshan's stack covers:\n• Backend: Java, Spring Boot, ASP.NET Core, Python/Django REST\n• Frontend: React 18, TypeScript, Tailwind CSS, Framer Motion\n• Databases: PostgreSQL, SQL Server, MySQL\n• QA & Testing: Selenium WebDriver, TestNG, NUnit, RestAssured, Allure\n• DevOps & Cloud: Docker, GitHub Actions, AWS, Kubernetes"
      } else if (normalized.includes('bank') || normalized.includes('experience')) {
        reply =
          'Dilshan started his career at Bank of Ceylon as a Software Developer Intern, contributing to core banking features in a security-compliant environment. That background shapes his discipline around testing and predictable deployments today.'
      }

      setMessages((prev) => [...prev, { role: 'bot', text: reply }])
    }, 600)
  }

  return (
    <motion.div
      className="ai-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio AI assistant"
    >
      <motion.div
        className="ai-card"
        ref={cardRef}
        initial={{ scale: prefersReducedMotion ? 1 : 0.95, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: prefersReducedMotion ? 1 : 0.95, y: prefersReducedMotion ? 0 : 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="ai-header">
          <div className="ai-title">
            <Sparkles size={16} className="ai-glow-icon" />
            <h3>Portfolio Intelligence</h3>
          </div>
          <button onClick={onClose} className="ai-close-btn" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="ai-chat-body">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble-container ${msg.role}`}>
              <div className="avatar">
                {msg.role === 'bot' ? <Bot size={14} /> : <User size={14} />}
              </div>
              <div className="chat-bubble">
                {msg.text.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="ai-suggestions">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSearchAI(s)}
              className="suggestion-chip"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSearchAI(input)
          }}
          className="ai-input-form"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my expertise or stack..."
          />
          <button type="submit" className="ai-send-btn" aria-label="Send">
            <Send size={16} />
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}