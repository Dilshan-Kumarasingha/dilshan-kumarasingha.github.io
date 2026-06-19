import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Mail, Sparkles } from 'lucide-react'
import AIAssistant from './AIAssistant'
import '../styles/Hero.css'

const GithubSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

const LinkedinSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const floatingTags = [
  { text: 'Spring Boot', x: '10%', y: '18%', delay: 0.1, showOnMobile: true },
  { text: 'PostgreSQL', x: '82%', y: '15%', delay: 0.3, showOnMobile: true },
  { text: 'Selenium', x: '78%', y: '68%', delay: 0.5, showOnMobile: false },
  { text: 'React 18', x: '6%', y: '72%', delay: 0.7, showOnMobile: true },
  { text: 'ASP.NET', x: '86%', y: '45%', delay: 0.9, showOnMobile: false },
  { text: 'Docker', x: '14%', y: '48%', delay: 1.1, showOnMobile: false },
]

function Hero() {
  const heroRef = useRef(null)
  const [auroraOffset, setAuroraOffset] = useState({ x: 0, y: 0 })
  const [isAiOpen, setIsAiOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 2
      const y = (e.clientY / innerHeight - 0.5) * 2
      setAuroraOffset({ x: x * 12, y: y * 12 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg">
        <div className="aurora aurora-1" style={{ transform: `translate(${auroraOffset.x}px, ${auroraOffset.y}px)` }} />
        <div className="aurora aurora-2" style={{ transform: `translate(${-auroraOffset.x * 0.7}px, ${auroraOffset.y * 0.7}px)` }} />
        <div className="aurora aurora-3" style={{ transform: `translate(${auroraOffset.x * 0.5}px, ${-auroraOffset.y * 0.5}px)` }} />
        <div className="noise-overlay" />
      </div>

      {floatingTags.map((tag, i) => (
        <motion.div
          key={i}
          className={`floating-tag ${tag.showOnMobile ? '' : 'mobile-hidden'}`}
          style={{ left: tag.x, top: tag.y }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.08, borderColor: 'rgba(56, 189, 248, 0.4)', color: '#f8fafc' }}
          transition={{ delay: tag.delay, duration: 0.6 }}
        >
          {tag.text}
        </motion.div>
      ))}

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div className="hero-badge" whileHover={{ scale: 1.03 }}>
          <span className="badge-dot" />
          Available for hire · Colombo, Sri Lanka
        </motion.div>

        <h1 className="hero-title">
          Full-Stack Engineer
          <br />
          <span className="hero-accent">who tests what</span>
          <br />
          <span className="hero-accent-dim">he ships.</span>
        </h1>

        <p className="hero-sub">
          Banking-grade discipline. Java · Spring Boot · React · .NET · PostgreSQL —
          with Selenium test suites that catch regressions before production does.
        </p>

        <div className="hero-actions">
          <motion.a href="#projects" className="btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <span>See My Work</span>
            <span className="btn-arrow">→</span>
          </motion.a>
          <motion.button className="btn-ai" onClick={() => setIsAiOpen(true)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Sparkles size={16} />
            <span>Ask My AI Assistant</span>
          </motion.button>
        </div>

        <div className="hero-links">
          <a href="https://github.com/Dilshan-Kumarasingha" target="_blank" rel="noreferrer" className="social-link">
            <GithubSVG /><span>GitHub</span>
          </a>
          <div className="social-divider" />
          <a href="https://linkedin.com/in/dilshan-kumarasingha" target="_blank" rel="noreferrer" className="social-link">
            <LinkedinSVG /><span>LinkedIn</span>
          </a>
          <div className="social-divider" />
          <a href="mailto:dilshan.jkumarasingha@gmail.com" className="social-link">
            <Mail size={19} /><span>Email</span>
          </a>
        </div>
      </motion.div>

      <motion.div className="hero-scroll" animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
        <ArrowDown size={16} />
        <span>scroll</span>
      </motion.div>

      <AnimatePresence>
        {isAiOpen && <AIAssistant onClose={() => setIsAiOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}

export default Hero