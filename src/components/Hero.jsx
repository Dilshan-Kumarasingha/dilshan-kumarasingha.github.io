import { useState, useRef, useEffect } from 'react'
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion'
import AIAssistant from './AIAssistant'
import profileCutout from '../assets/profile-cutout.png'
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

const TAGS = [
  'ASP.NET Core',
  'React',
  'SQL Server',
  'REST APIs',
  'System Design',
  'Testing',
]

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
      <div className="hero-bg">
        <div className="hero-bg-scrim" />
      </div>

      <div className="hero-dot-grid dot-grid dot-grid--red" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => <span key={i} />)}
      </div>

      <motion.div
        className="hero-frame"
        style={{ opacity: contentOpacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-top-links" variants={revealUpVariants}>
          <a href="https://github.com/Dilshan-Kumarasingha" target="_blank" rel="noreferrer" className="hero-icon-link" data-cursor="hover" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a href="https://linkedin.com/in/dilshan-kumarasingha" target="_blank" rel="noreferrer" className="hero-icon-link" data-cursor="hover" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
        </motion.div>

        <motion.div className="hero-photo-pop" variants={revealUpVariants} aria-hidden="true">
          <span className="hero-photo-glow" />
          <img src={profileCutout} alt="Dilshan Kumarasingha" className="hero-photo-cutout" />
        </motion.div>

        <div className="hero-mask-overflow">
          <motion.h1 className="hero-headline" variants={revealUpVariants} data-cursor="text">
            DILSHAN
            <br />
            KUMARASINGHA
          </motion.h1>
        </div>

        <div className="hero-bottom-row">
          <motion.div className="hero-copy" variants={revealUpVariants}>
            <span className="hero-eyebrow">Available for work</span>
            <p className="hero-subhead">
              I build backend services in <code>C# / ASP.NET Core</code> and the{' '}
              <code>React</code> interfaces on top of them — with the state machines,
              SLA logic, and test coverage that keep them reliable after they ship.
            </p>
            <div className="hero-actions">
              <button className="hero-btn-secondary" onClick={() => setIsAiOpen(true)} data-cursor="hover" data-cursor-label="Ask">
                Ask my assistant
              </button>
            </div>
          </motion.div>

          <motion.a
            href="#contact"
            className="hero-btn-primary"
            variants={revealUpVariants}
            data-cursor="hover"
            data-cursor-label="Go"
          >
            Book a free call <ArrowRightIcon />
          </motion.a>
        </div>

        <motion.div className="hero-tag-strip" variants={revealUpVariants}>
          {TAGS.map((tag) => (
            <span className="hero-tag" key={tag}>{tag}</span>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isAiOpen && <AIAssistant onClose={() => setIsAiOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}

export default Hero;