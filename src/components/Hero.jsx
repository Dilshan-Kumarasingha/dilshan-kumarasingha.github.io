import { useState, useRef, useEffect } from 'react'
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion'
import AIAssistant from './AIAssistant'
import profilePhoto from '../assets/Profile 2.jpeg'
import '../styles/Hero.css'

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const LOG_LINES = [
  { text: 'HelpDeskHQ · migration 0013_add_sla_breach_flag applied', live: false },
  { text: '47 integration tests passed · 0 failed', live: false },
  { text: 'staging → api.helpdeskhq deployed · 2h ago', live: false },
  { text: 'refactor: extract SLA timer into background service', live: true },
]

function SystemPanel() {
  return (
    <div className="hero-panel-wrap">
      <span className="hero-panel-corner-bl" />
      <span className="hero-panel-corner-br" />
      <div className="hero-panel">
        <div className="hero-panel-head">
          <span className="hero-panel-title">recent activity</span>
          <span className="hero-panel-dot" />
        </div>
        <div className="hero-panel-body">
          {LOG_LINES.map((line, i) => (
            <div
              key={line.text}
              className={`hero-panel-row${line.live ? ' hero-panel-row--live' : ''}`}
            >
              <span className="hero-panel-row-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="hero-panel-row-text">{line.text}</span>
            </div>
          ))}
        </div>
        <div className="hero-panel-foot">
          <span>3 repos · .NET 10 / React 18</span>
          <span className="hero-panel-foot-live">live</span>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  const [isAiOpen, setIsAiOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const revealUpVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 }
    }
  }

  return (
    <section className="hero" ref={heroRef}>
      <motion.div
        className="hero-frame"
        style={{ opacity: contentOpacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top identity strip */}
        <motion.div className="hero-top-row" variants={revealUpVariants}>
          <div className="hero-byline">
            <div className="hero-avatar-frame">
              <img src={profilePhoto} alt="Dilshan Kumarasingha" className="hero-avatar" />
            </div>
            <div className="hero-byline-text">
              <span className="hero-byline-name">Dilshan Kumarasingha</span>
              <span className="hero-byline-role">Full-stack engineer</span>
            </div>
          </div>

          <span className="hero-coords">
            <span className="hero-coords-cross">+</span>
            6.9271° N, 79.8612° E — Colombo, LK
          </span>

          <div className="hero-top-links">
            <a href="https://github.com/Dilshan-Kumarasingha" target="_blank" rel="noreferrer" className="hero-icon-link" data-cursor="hover" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a href="https://linkedin.com/in/dilshan-kumarasingha" target="_blank" rel="noreferrer" className="hero-icon-link" data-cursor="hover" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
          </div>
        </motion.div>

        <div className="hero-body">
          <div>
            <motion.span className="hero-eyebrow" variants={revealUpVariants}>
              Available for work
            </motion.span>

            <div className="hero-mask-overflow">
              <motion.h1 className="hero-headline" variants={revealUpVariants} data-cursor="text">
                Building software
                <br />
                that stays <span className="hero-headline-accent">up.</span>
              </motion.h1>
            </div>

            <motion.p className="hero-subhead" variants={revealUpVariants}>
              I build backend services in <code>C# / ASP.NET Core</code> and the{' '}
              <code>React</code> interfaces on top of them — with the state machines,
              SLA logic, and test coverage that keep them reliable after they ship.
            </motion.p>

            <motion.div className="hero-actions" variants={revealUpVariants}>
              <a href="#projects" className="hero-btn-primary" data-cursor="hover" data-cursor-label="Go">
                View my work <ArrowRightIcon />
              </a>
              <button className="hero-btn-secondary" onClick={() => setIsAiOpen(true)} data-cursor="hover" data-cursor-label="Ask">
                Ask my assistant
              </button>
            </motion.div>

            <motion.div className="hero-credential-strip" variants={revealUpVariants}>
              <div className="hero-credential">
                <span className="hero-credential-val">3</span>
                <span className="hero-credential-label">shipped projects</span>
              </div>
              <div className="hero-credential">
                <span className="hero-credential-val">13</span>
                <span className="hero-credential-label">entity schema</span>
              </div>
              <div className="hero-credential hero-credential--accent">
                <span className="hero-credential-val">.NET 10</span>
                <span className="hero-credential-label">primary stack</span>
              </div>
            </motion.div>
          </div>

          <motion.div variants={revealUpVariants}>
            <SystemPanel />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isAiOpen && <AIAssistant onClose={() => setIsAiOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}

export default Hero;