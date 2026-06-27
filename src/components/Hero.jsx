import { useState, useRef } from 'react'
import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import AIAssistant from './AIAssistant'
import profilePhoto from '../assets/Profile 2.jpeg'
import '../styles/Hero.css'

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

function Hero() {
  const [isAiOpen, setIsAiOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96])
  const photoY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -30])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const revealUpVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const panelVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.97, y: prefersReducedMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
    }
  }

  return (
    <section className="dash-hero" ref={heroRef}>
      <motion.div
        className="dash-hero-frame"
        style={{ opacity: contentOpacity, scale: contentScale }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="dash-hero-split-container">

          {/* LEFT SIDE: Content */}
          <div className="dash-hero-left">
            <motion.div className="dash-status-line" variants={revealUpVariants}>
              <span className="dash-status-dot" />
              <strong>status: building</strong>
              <span className="dash-status-sep">|</span>
              .NET &middot; React &middot; PostgreSQL
            </motion.div>

            <div className="dash-mask-overflow">
            <motion.h1 className="dash-hero-headline" variants={revealUpVariants}>
              Building reliable software from<br />
              <span className="dash-headline-dim"> backend to frontend.</span>
            </motion.h1>
            </div>

            <motion.p className="dash-hero-subhead" variants={revealUpVariants}>
              I build backend services in <code>C# / ASP.NET Core</code> and the{' '}
              <code>React</code> interfaces on top of them — with the state machines,
              SLA logic, and test coverage that keep them reliable after they ship.
            </motion.p>

            <motion.div className="dash-metric-strip" variants={revealUpVariants}>
              <div className="dash-metric">
                <span className="dash-metric-val">3</span>
                <span className="dash-metric-label">shipped projects</span>
              </div>
              <div className="dash-metric">
                <span className="dash-metric-val">13</span>
                <span className="dash-metric-label">entity schema (current build)</span>
              </div>
              <div className="dash-metric">
                <span className="dash-metric-val">.NET 10</span>
                <span className="dash-metric-label">primary stack</span>
              </div>
            </motion.div>

            <motion.div className="dash-hero-actions" variants={revealUpVariants}>
              <motion.a
                href="#projects"
                className="dash-btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                View my work <ArrowRightIcon />
              </motion.a>
              <motion.button
                className="dash-btn-secondary"
                onClick={() => setIsAiOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                Ask my assistant
              </motion.button>
            </motion.div>

            <motion.div className="dash-hero-links" variants={revealUpVariants}>
              <a href="https://github.com/Dilshan-Kumarasingha" target="_blank" rel="noreferrer" className="dash-hero-social-link">
                <GithubIcon />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/dilshan-kumarasingha" target="_blank" rel="noreferrer" className="dash-hero-social-link">
                <LinkedinIcon />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Dashboard Panel */}
          <div className="dash-hero-right">
            <motion.div className="dash-panel" variants={panelVariants}>
              <div className="dash-panel-head">
                <span>profile.engineer</span>
                <span className="dash-panel-live">
                  <span className="dash-panel-live-dot" />
                  online
                </span>
              </div>

              <motion.div
                className="dash-photo-frame"
                style={prefersReducedMotion ? undefined : { y: photoY }}
              >
                <img
                  src={profilePhoto}
                  alt="Dilshan Kumarasingha"
                  className="dash-photo-img"
                />
                <div className="dash-photo-caption">
                  <div className="dash-photo-name">Dilshan Kumarasingha</div>
                  <div className="dash-photo-role">Colombo, Sri Lanka</div>
                </div>
              </motion.div>

              <div className="dash-panel-foot">
                <div className="dash-panel-cell">
                  <div className="dash-panel-k">currently</div>
                  <div className="dash-panel-v">HelpDeskHQ &middot; Phase 3</div>
                </div>
                <div className="dash-panel-cell">
                  <div className="dash-panel-k">based in</div>
                  <div className="dash-panel-v">Colombo, LK</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>

      <AnimatePresence>
        {isAiOpen && <AIAssistant onClose={() => setIsAiOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}

export default Hero;