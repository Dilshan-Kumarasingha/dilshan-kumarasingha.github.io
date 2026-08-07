import { useState, useRef, useEffect } from 'react'
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion'
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

// Deterministic sparkline — reads as "commits / activity over time"
const Sparkline = () => {
  const points = [4, 7, 5, 9, 6, 11, 8, 13, 10, 15, 12, 17]
  const max = Math.max(...points)
  const w = 84
  const h = 24
  const step = w / (points.length - 1)
  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i * step).toFixed(1)} ${(h - (p / max) * h).toFixed(1)}`)
    .join(' ')

  return (
    <svg className="glow-sparkline" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparklineGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke="url(#sparklineGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const LOG_LINES = [
  { tag: 'build', text: 'HelpDeskHQ · migration 0013_add_sla_breach_flag applied', tone: 'ok' },
  { tag: 'test', text: '47 integration tests passed · 0 failed', tone: 'ok' },
  { tag: 'deploy', text: 'staging → api.helpdeskhq  ·  2h ago', tone: 'warn' },
  { tag: 'commit', text: 'refactor: extract SLA timer into background service', tone: 'ok' },
]

// Signature element: a rotating "live feed" readout inside the glass card.
const ActivityLog = ({ reduceMotion }) => {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setI((v) => (v + 1) % LOG_LINES.length), 3200)
    return () => clearInterval(id)
  }, [reduceMotion])

  const line = LOG_LINES[i]

  return (
    <div className="glow-log">
      <span className="glow-log-prompt" />
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          className="glow-log-line"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={`glow-log-tag glow-log-tag--${line.tone}`}>{line.tag}</span>
          <span className="glow-log-text">{line.text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/**
 * Magnetic hover wrapper — element eases toward the cursor, springs back on
 * mouseleave. Pairs with the global CustomCursor via data-cursor="hover".
 */
const Magnetic = ({ children, as: Tag = motion.div, strength = 0.35, className = '', ...rest }) => {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 })

  const handleMove = (e) => {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
    </Tag>
  )
}

function Hero() {
  const [isAiOpen, setIsAiOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef(null)
  const panelRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96])
  const photoY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -30])

  // Aurora blobs drift slightly with the pointer — ambient, not distracting.
  const blobX = useMotionValue(0)
  const blobY = useMotionValue(0)
  const springBlobX = useSpring(blobX, { stiffness: 40, damping: 20 })
  const springBlobY = useSpring(blobY, { stiffness: 40, damping: 20 })

  useEffect(() => {
    if (prefersReducedMotion) return
    const handleMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      blobX.set(nx * 24)
      blobY.set(ny * 24)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [prefersReducedMotion, blobX, blobY])

  // --- Subtle 3D tilt for the glass card, cursor-driven ---
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 150, damping: 18, mass: 0.6 })
  const springTiltY = useSpring(tiltY, { stiffness: 150, damping: 18, mass: 0.6 })
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const handlePanelMove = (e) => {
    if (prefersReducedMotion || !panelRef.current) return
    const rect = panelRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const maxDeg = 6
    tiltY.set((px - 0.5) * maxDeg * 2)
    tiltX.set(-(py - 0.5) * maxDeg * 2)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  const handlePanelLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
    glareX.set(50)
    glareY.set(50)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
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
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.94, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
    }
  }

  return (
    <section className="glow-hero" ref={heroRef}>
      {/* SIGNATURE — drifting aurora blob field behind everything */}
      <div className="glow-aurora" aria-hidden="true">
        <motion.span className="glow-blob glow-blob--violet" style={{ x: springBlobX, y: springBlobY }} />
        <motion.span
          className="glow-blob glow-blob--cyan"
          style={{ x: useTransform(springBlobX, (v) => v * -0.7), y: useTransform(springBlobY, (v) => v * -0.7) }}
        />
        <motion.span
          className="glow-blob glow-blob--pink"
          style={{ x: useTransform(springBlobX, (v) => v * 0.5), y: useTransform(springBlobY, (v) => v * -0.5) }}
        />
      </div>
      <div className="glow-grain" aria-hidden="true" />

      <motion.div
        className="glow-hero-frame"
        style={{ opacity: contentOpacity, scale: contentScale }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="glow-hero-split-container">

          {/* LEFT SIDE: Content */}
          <div className="glow-hero-left">
            <motion.div className="glow-status-line" variants={revealUpVariants}>
              <span className="glow-status-dot" />
              <strong>Available for work</strong>
              <span className="glow-status-sep">·</span>
              .NET &middot; React &middot; PostgreSQL
            </motion.div>

            <div className="glow-mask-overflow">
              <motion.h1 className="glow-hero-headline" variants={revealUpVariants} data-cursor="text">
                Building reliable software
                <br />
                <span className="glow-headline-gradient">from backend to frontend.</span>
              </motion.h1>
            </div>

            <motion.p className="glow-hero-subhead" variants={revealUpVariants}>
              I build backend services in <code>C# / ASP.NET Core</code> and the{' '}
              <code>React</code> interfaces on top of them — with the state machines,
              SLA logic, and test coverage that keep them reliable after they ship.
            </motion.p>

            <motion.div className="glow-metric-strip" variants={revealUpVariants}>
              <div className="glow-metric">
                <span className="glow-metric-val">3</span>
                <span className="glow-metric-label">shipped projects</span>
              </div>
              <div className="glow-metric">
                <span className="glow-metric-val">13</span>
                <span className="glow-metric-label">entity schema (current build)</span>
              </div>
              <div className="glow-metric glow-metric--accent">
                <span className="glow-metric-val">.NET 10</span>
                <span className="glow-metric-label">primary stack</span>
              </div>
              <div className="glow-metric glow-metric--graph">
                <Sparkline />
                <span className="glow-metric-label">commits · last 12wk</span>
              </div>
            </motion.div>

            <motion.div className="glow-hero-actions" variants={revealUpVariants}>
              <Magnetic as={motion.a} strength={0.4} className="glow-btn-primary-wrap">
                <a
                  href="#projects"
                  className="glow-btn-primary"
                  data-cursor="hover"
                  data-cursor-label="Go"
                >
                  View my work <ArrowRightIcon />
                </a>
              </Magnetic>
              <Magnetic strength={0.4} className="glow-btn-secondary-wrap">
                <button
                  className="glow-btn-secondary"
                  onClick={() => setIsAiOpen(true)}
                  data-cursor="hover"
                  data-cursor-label="Ask"
                >
                  Ask my assistant
                </button>
              </Magnetic>
            </motion.div>

            <motion.div className="glow-hero-links" variants={revealUpVariants}>
              <Magnetic strength={0.5}>
                <a
                  href="https://github.com/Dilshan-Kumarasingha"
                  target="_blank"
                  rel="noreferrer"
                  className="glow-hero-social-link"
                  data-cursor="hover"
                >
                  <GithubIcon />
                  <span>GitHub</span>
                </a>
              </Magnetic>
              <Magnetic strength={0.5}>
                <a
                  href="https://linkedin.com/in/dilshan-kumarasingha"
                  target="_blank"
                  rel="noreferrer"
                  className="glow-hero-social-link"
                  data-cursor="hover"
                >
                  <LinkedinIcon />
                  <span>LinkedIn</span>
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Glass card — subtle 3D tilt */}
          <div className="glow-hero-right">
            <motion.div
              ref={panelRef}
              className="glow-panel"
              variants={panelVariants}
              data-cursor="hover"
              onMouseMove={handlePanelMove}
              onMouseLeave={handlePanelLeave}
              style={{
                rotateX: springTiltX,
                rotateY: springTiltY,
                transformPerspective: 900,
              }}
            >
              <motion.div
                className="glow-panel-glare"
                style={{
                  background: useTransform(
                    [glareX, glareY],
                    ([gx, gy]) =>
                      `radial-gradient(circle at ${gx}% ${gy}%, rgba(139,92,246,0.35), transparent 55%)`
                  ),
                }}
              />

              <div className="glow-panel-head">
                <span>profile.engineer</span>
                <span className="glow-panel-live">
                  <span className="glow-panel-live-dot" />
                  online
                </span>
              </div>

              <motion.div
                className="glow-photo-frame"
                style={prefersReducedMotion ? undefined : { y: photoY }}
              >
                <img
                  src={profilePhoto}
                  alt="Dilshan Kumarasingha"
                  className="glow-photo-img"
                />
                <div className="glow-photo-caption">
                  <div className="glow-photo-name">Dilshan Kumarasingha</div>
                  <div className="glow-photo-role">Colombo, Sri Lanka</div>
                </div>
              </motion.div>

              <ActivityLog reduceMotion={prefersReducedMotion} />

              <div className="glow-panel-foot">
                <div className="glow-panel-cell">
                  <div className="glow-panel-k">currently</div>
                  <div className="glow-panel-v">HelpDeskHQ &middot; Phase 3</div>
                </div>
                <div className="glow-panel-cell">
                  <div className="glow-panel-k">last deploy</div>
                  <div className="glow-panel-v glow-panel-v--accent">2h ago</div>
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