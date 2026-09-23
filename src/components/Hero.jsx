import { useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import AIAssistant from './AIAssistant'
import profileCutout from '../assets/profile-cutout.png'
import '../styles/Hero.css'

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const ArrowDownIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M19 12l-7 7-7-7" />
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

const revealUpVariants = (reducedMotion) => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reducedMotion ? 0 : 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
})

function Hero() {
  const [isAiOpen, setIsAiOpen] = useState(false)

  const heroRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  /*
   * Subtle scroll effects.
   * These completely stop when reduced motion is enabled.
   */
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.65],
    [1, 0]
  )

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -55]
  )

  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 35]
  )

  const photoScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, prefersReducedMotion ? 1 : 0.96]
  )

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 70]
  )

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.07,
        delayChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  }

  const revealVariants = revealUpVariants(prefersReducedMotion)

  const scrollToContact = (event) => {
    event.preventDefault()

    const contactSection = document.querySelector('#contact')

    if (!contactSection) return

    contactSection.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })

    window.history.replaceState(null, '', '#contact')
  }

  return (
    <section
      className="hero"
      id="top"
      ref={heroRef}
      aria-labelledby="hero-title"
    >
      {/* Background */}
      <div className="hero-bg" aria-hidden="true">
        <motion.div
          className="hero-bg-scrim"
          style={{ y: backgroundY }}
        />

        <div className="hero-bg-orb hero-bg-orb--one" />
        <div className="hero-bg-orb hero-bg-orb--two" />
      </div>

      {/* Decorative grid */}
      <div
        className="hero-dot-grid dot-grid dot-grid--red"
        aria-hidden="true"
      >
        {Array.from({ length: 24 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <motion.div
        className="hero-frame"
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Social links */}
        <motion.nav
          className="hero-top-links"
          variants={revealVariants}
          aria-label="Social profiles"
        >
          <a
            href="https://github.com/Dilshan-Kumarasingha"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-icon-link"
            data-cursor="hover"
            aria-label="Visit GitHub profile"
          >
            <GithubIcon />
          </a>

          <a
            href="https://linkedin.com/in/dilshan-kumarasingha"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-icon-link"
            data-cursor="hover"
            aria-label="Visit LinkedIn profile"
          >
            <LinkedinIcon />
          </a>
        </motion.nav>

        {/* Profile image */}
        <motion.div
          className="hero-photo-pop"
          variants={revealVariants}
          style={{
            y: photoY,
            scale: photoScale,
          }}
          aria-hidden="true"
        >
          <span className="hero-photo-glow" />
          <span className="hero-photo-ring" />

          <img
            src={profileCutout}
            alt=""
            className="hero-photo-cutout"
            draggable="false"
          />
        </motion.div>

        {/* Main heading */}
        <div className="hero-mask-overflow">
          <motion.h1
            id="hero-title"
            className="hero-headline"
            variants={revealVariants}
            data-cursor="text"
          >
            <span>Dilshan</span>
            <span>Kumarasingha</span>
          </motion.h1>
        </div>

        {/* Main content */}
        <div className="hero-bottom-row">
          <motion.div
            className="hero-copy"
            variants={revealVariants}
          >
            <span className="hero-eyebrow">
              <span className="hero-status-dot" aria-hidden="true" />
              Available for work
            </span>

            <p className="hero-subhead">
              I build backend services in{' '}
              <code>C# / ASP.NET Core</code> and the{' '}
              <code>React</code> interfaces on top of them — with the
              state machines, SLA logic, and test coverage that keep
              them reliable after they ship.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="hero-btn-secondary"
                onClick={() => setIsAiOpen(true)}
                data-cursor="hover"
                data-cursor-label="Ask"
                aria-haspopup="dialog"
                aria-expanded={isAiOpen}
              >
                <span>Ask my assistant</span>
                <span className="hero-btn-secondary-arrow">
                  <ArrowRightIcon />
                </span>
              </button>
            </div>
          </motion.div>

          <motion.a
            href="#contact"
            className="hero-btn-primary"
            variants={revealVariants}
            onClick={scrollToContact}
            data-cursor="hover"
            data-cursor-label="Go"
          >
            <span>Book a free call</span>
            <ArrowRightIcon />
          </motion.a>
        </div>

        {/* Technology strip */}
        <motion.div
          className="hero-tag-strip"
          variants={revealVariants}
          aria-label="Core technologies"
        >
          <span className="hero-tag-label">Working with</span>

          <div className="hero-tags">
            {TAGS.map((tag) => (
              <span className="hero-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#about"
          className="hero-scroll-cue"
          variants={revealVariants}
          data-cursor="hover"
          aria-label="Scroll to About section"
        >
          <span>Scroll to explore</span>
          <ArrowDownIcon />
        </motion.a>
      </motion.div>

      {/* AI Assistant */}
      <AnimatePresence mode="wait">
        {isAiOpen && (
          <AIAssistant
            onClose={() => setIsAiOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Hero