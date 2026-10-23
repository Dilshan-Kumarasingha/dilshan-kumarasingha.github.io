import { useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import AIAssistant from './AIAssistant'
import profileCutout from '../assets/profile-cutout.png'
import '../styles/Hero.css'

const iconProps = {
  width: 17,
  height: 17,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const GithubIcon = () => (
  <svg {...iconProps}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LinkedinIcon = () => (
  <svg {...iconProps}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg {...iconProps} width="16" height="16">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

const CheckIcon = () => (
  <svg {...iconProps} width="12" height="12" strokeWidth="3">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

// Only tools I really use. Add Kubernetes and Terraform when they are in a repo.
const CHIPS = [
  { label: 'Build', tool: 'Docker', style: { top: '16%', left: '2%' }, delay: 1.5, float: 0 },
  { label: 'Test', tool: 'GitHub Actions', style: { top: '5%', right: '-1%' }, delay: 2.1, float: 1.2 },
  { label: 'Package', tool: 'Docker Compose', style: { top: '47%', left: '-2%' }, delay: 2.7, float: 0.6 },
  { label: 'Serve', tool: 'nginx', style: { top: '33%', right: '-3%' }, delay: 3.3, float: 1.8 },
  { label: 'Script', tool: 'Linux · Bash', style: { bottom: '14%', left: '6%' }, delay: 3.9, float: 0.3 },
]

// Name is split so each line can slide up on its own
const NAME_LINES = ['Dilshan', 'Kumarasingha']

function Hero() {
  const [isAiOpen, setIsAiOpen] = useState(false)
  const heroRef = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.4])

  // Spotlight follows the mouse
  const spotX = useMotionValue(50)
  const spotY = useMotionValue(35)
  const spotXSmooth = useSpring(spotX, { stiffness: 60, damping: 20 })
  const spotYSmooth = useSpring(spotY, { stiffness: 60, damping: 20 })

  const spotlightBackground = useTransform(
    [spotXSmooth, spotYSmooth],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}% ${y}%, rgba(255, 255, 255, 0.55), transparent 60%)`
  )

  const handlePointerMove = (event) => {
    if (reduce || !heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    spotX.set(((event.clientX - rect.left) / rect.width) * 100)
    spotY.set(((event.clientY - rect.top) / rect.height) * 100)
  }

  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0 : 0.7,
      delay: reduce ? 0 : delay,
      ease: [0.16, 1, 0.3, 1],
    },
  })

  const scrollToContact = (event) => {
    event.preventDefault()
    const target = document.querySelector('#contact')
    if (!target) return
    target.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'start',
    })
    window.history.replaceState(null, '', '#contact')
  }

  return (
    <section
      className="hero"
      id="top"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      aria-labelledby="hero-title"
    >
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      {/* background shapes, just for depth */}
      <div className="hero-shapes" aria-hidden="true">
        <span className="hero-shape hero-shape--ring" />
        <span className="hero-shape hero-shape--square" />
        <span className="hero-shape hero-shape--dot-grid">
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} />
          ))}
        </span>
        <span className="hero-shape hero-shape--line" />
        <span className="hero-shape hero-shape--triangle" />
      </div>

      {!reduce && (
        <motion.div
          className="hero-spotlight"
          aria-hidden="true"
          style={{ background: spotlightBackground }}
        />
      )}

      {/* black bars at the top and bottom edge */}
      <motion.span
        className="hero-bar hero-bar--top"
        initial={{ scaleY: reduce ? 1 : 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />
      <motion.span
        className="hero-bar hero-bar--bottom"
        initial={{ scaleY: reduce ? 1 : 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />

      <motion.div
        className="hero-scene"
        style={{ scale: sceneScale, opacity: sceneOpacity }}
      >
        <div className="hero-inner">
          {/* left side: text */}
          <div className="hero-copy">
            <motion.p className="hero-status" {...rise(0.2)}>
              <span className="hero-status-dot" aria-hidden="true" />
              Junior Cloud &amp; DevOps Engineer
            </motion.p>

            <h1 id="hero-title" className="hero-title" data-cursor="text">
              {NAME_LINES.map((line, lineIndex) => (
                <span className="hero-title-line-mask" key={line}>
                  <motion.span
                    className="hero-title-line"
                    initial={{ y: reduce ? 0 : '120%' }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.9,
                      delay: reduce ? 0 : 0.35 + lineIndex * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p className="hero-lede" {...rise(0.62)}>
              I build and ship software with Docker, GitHub Actions, Linux and
              Bash, coming from a C#/.NET and Java backend background.
              Kubernetes, Terraform and monitoring are what I'm building next.
            </motion.p>

            <motion.div className="hero-actions" {...rise(0.7)}>
              <a
                href="#contact"
                className="hero-btn hero-btn--primary"
                onClick={scrollToContact}
                data-cursor="hover"
                data-cursor-label="Go"
              >
                <span>Get in touch</span>
                <ArrowRightIcon />
              </a>

              <button
                type="button"
                className="hero-btn hero-btn--ghost"
                onClick={() => setIsAiOpen(true)}
                data-cursor="hover"
                data-cursor-label="Ask"
                aria-haspopup="dialog"
                aria-expanded={isAiOpen}
              >
                Ask my assistant
              </button>

              <span className="hero-socials">
                <a
                  href="https://github.com/Dilshan-Kumarasingha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social"
                  data-cursor="hover"
                  aria-label="Visit GitHub profile"
                >
                  <GithubIcon />
                </a>
                <a
                  href="https://linkedin.com/in/dilshan-kumarasingha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social"
                  data-cursor="hover"
                  aria-label="Visit LinkedIn profile"
                >
                  <LinkedinIcon />
                </a>
              </span>
            </motion.div>
          </div>

          {/* right side: photo and tool chips */}
          <div className="hero-visual">
            <motion.div
              className="hero-portrait"
              style={{ y: photoY }}
              initial={{ opacity: 0, y: reduce ? 0 : 40, scale: reduce ? 1 : 1.05 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: reduce ? 0 : 1.1,
                delay: reduce ? 0 : 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              aria-hidden="true"
            >
              <span className="hero-portrait-arch" />
              <span className="hero-portrait-rim" />
              <img
                src={profileCutout}
                alt=""
                className="hero-portrait-img"
                draggable="false"
              />
            </motion.div>

            {CHIPS.map(({ label, tool, style, delay, float }) => (
              <motion.div
                className="hero-chip"
                key={label}
                style={style}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.4, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 18,
                  delay: reduce ? 0 : delay,
                }}
              >
                <span
                  className="hero-chip-inner"
                  style={{ animationDelay: `${float}s` }}
                >
                  <span className="hero-chip-check">
                    <CheckIcon />
                  </span>
                  <span className="hero-chip-label">{label}</span>
                  <span className="hero-chip-tool">{tool}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        className="hero-scrollcue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 1.6 }}
        aria-label="Scroll to About section"
      >
        <span className="hero-scrollcue-track">
          <span className="hero-scrollcue-dot" />
        </span>
        <span className="hero-scrollcue-text">Scroll</span>
      </motion.a>

      <AnimatePresence mode="wait">
        {isAiOpen && <AIAssistant onClose={() => setIsAiOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}

export default Hero