import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import '../styles/About.css'

const stats = [
  { value: 2, suffix: '+', label: 'Years in banking & enterprise software' },
  { value: 3, suffix: '', label: 'QA layers covered — UI, API, Database' },
  { value: 10, suffix: '+', label: 'Business rules tested at service layer' },
  { value: 40, suffix: '+', label: 'Workstations deployed at Lyceum IMS' },
]

const timeline = [
  {
    ref: '2026 → present',
    role: 'IT Support & Lab Demonstrator',
    company: 'Lyceum International Schools',
  },
  {
    ref: '2023 → 2024',
    role: 'Software Developer Intern',
    company: 'Bank of Ceylon',
  },
]

const HEADLINE_PLAIN = 'Built for environments where '
const HEADLINE_ACCENT = 'bugs cost real money.'

// One word of the headline. Reads its own slice of the shared scroll
// progress and resolves from a faint, slightly-blurred, lowered state
// into full clarity — driven entirely by scroll position, not a timer.
function ScrollWord({ word, progress, start, end, accent, prefersReducedMotion }) {
  const opacity = useTransform(progress, [start, end], [0.12, 1])
  const y = useTransform(progress, [start, end], [10, 0])
  const blurAmount = useTransform(progress, [start, end], [4, 0])
  const filter = useTransform(blurAmount, (b) => `blur(${b}px)`)

  return (
    <motion.span
      className={accent ? 'headline-accent headline-word' : 'headline-word'}
      style={prefersReducedMotion ? undefined : { opacity, y, filter }}
    >
      {word}{' '}
    </motion.span>
  )
}

// Headline that clips in word-by-word as the section scrolls through
// the viewport. Splits the sentence into words so each resolves at a
// slightly different point along the scroll range, like text being
// exposed by a moving mask rather than typed on a timer.
function ScrollRevealHeadline({ progress, prefersReducedMotion }) {
  const words = (HEADLINE_PLAIN + HEADLINE_ACCENT).split(' ')
  const accentStartIdx = HEADLINE_PLAIN.trim().split(' ').length

  return (
    <h2 className="section-title">
      {words.map((word, i) => {
        const start = (i / words.length) * 0.6
        const end = ((i + 1) / words.length) * 0.6
        return (
          <ScrollWord
            key={i}
            word={word}
            progress={progress}
            start={start}
            end={end}
            accent={i >= accentStartIdx}
            prefersReducedMotion={prefersReducedMotion}
          />
        )
      })}
    </h2>
  )
}

// Single stat card. Value sits static and correct — no count-up
// performance. What moves is a slim progress rail that fills in sync
// with the section's scroll progress, offset per-index so the four
// rails complete in a staggered cascade rather than all at once.
function ScrollStat({ stat, index, progress, prefersReducedMotion }) {
  const start = 0.15 + index * 0.08
  const end = start + 0.35
  const railScale = useTransform(progress, [start, end], [0, 1])
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1])
  const x = useTransform(progress, [start, start + 0.12], [prefersReducedMotion ? 0 : -12, 0])

  return (
    <motion.div
      className="stat-metric-block"
      style={prefersReducedMotion ? undefined : { opacity, x }}
    >
      <span className="stat-rail-track">
        <motion.span
          className="stat-rail-fill"
          style={prefersReducedMotion ? { scaleX: 1 } : { scaleX: railScale }}
        />
      </span>
      <span className="stat-value">
        {stat.value}
        {stat.suffix}
      </span>
      <span className="stat-label">{stat.label}</span>
    </motion.div>
  )
}

// Single timeline entry. Parallax depth: earlier (more recent) entries
// travel further than later ones as they resolve, giving a layered
// sense of depth tied directly to scroll position.
function DepthEntry({ entry, index, progress, prefersReducedMotion }) {
  const start = 0.5 + index * 0.18
  const end = start + 0.3
  const travel = 36 - index * 10
  const x = useTransform(progress, [start, end], [prefersReducedMotion ? 0 : travel, 0])
  const opacity = useTransform(progress, [start, start + 0.15], [0, 1])

  return (
    <motion.div
      className="depth-entry"
      style={prefersReducedMotion ? undefined : { x, opacity }}
    >
      <span className="depth-node" aria-hidden="true" />
      <span className="depth-year">{entry.ref}</span>
      <div className="depth-details">
        <span className="depth-role">{entry.role}</span>
        <span className="depth-company">{entry.company}</span>
      </div>
    </motion.div>
  )
}

// Timeline — redesigned away from the git-log motif. Now a "depth
// rail": a single progress thread fills in lockstep with scroll
// (not a one-shot draw-in), and entries parallax into place at
// staggered rates as you scroll past them.
function ScrollTimeline({ progress, prefersReducedMotion }) {
  const threadScale = useTransform(progress, [0.45, 0.95], [0, 1])

  return (
    <div className="depth-rail">
      <span className="depth-rail-header">
        <span className="depth-rail-header-icon">{'~'}</span> career timeline
      </span>

      <div className="depth-rail-track">
        <span className="depth-rail-line-track" aria-hidden="true" />
        <motion.span
          className="depth-rail-line-fill"
          style={prefersReducedMotion ? { scaleY: 1 } : { scaleY: threadScale }}
          aria-hidden="true"
        />

        {timeline.map((entry, i) => (
          <DepthEntry
            key={entry.ref}
            entry={entry}
            index={i}
            progress={progress}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  )
}

function About() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)

  // Single scroll-progress source for the whole section: 0 when the
  // section first enters the bottom of the viewport, 1 when it exits
  // the top. Every animation below reads from this same timeline, so
  // everything moves in direct response to how far the user has
  // physically scrolled, not on independent timers.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.25'],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  })

  // Left-column body paragraphs parallax in at a slightly slower rate
  // than the headline, reinforcing depth between the two text blocks.
  const paraY = useTransform(progress, [0, 0.4], [prefersReducedMotion ? 0 : 24, 0])
  const paraOpacity = useTransform(progress, [0.05, 0.4], [0, 1])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-inner">
        <div className="about-grid">
          <div className="about-left">
            <span className="section-eyebrow">
              <span className="eyebrow-bracket">{'//'}</span> About
            </span>

            <ScrollRevealHeadline
              progress={progress}
              prefersReducedMotion={prefersReducedMotion}
            />

            <motion.div
              className="about-text-stack"
              style={prefersReducedMotion ? undefined : { y: paraY, opacity: paraOpacity }}
            >
              <p className="about-text">
                I started my career inside Bank of Ceylon — one of Sri
                Lanka's largest state banks — contributing to core banking
                features across the full SDLC in a security-compliant
                environment handling millions of daily transactions.
              </p>
              <p className="about-text">
                That experience shaped how I build: every feature needs to
                work, every edge case needs a test, and every deployment
                needs to be predictable. I bring that same discipline to
                every project I ship.
              </p>
              <p className="about-text">
                Currently targeting enterprise software roles at companies
                like Sampath IT Solutions, WSO2, IFS, and Virtusa — where
                software quality is not optional.
              </p>
            </motion.div>
          </div>

          <div className="about-right">
            <div className="stats-monolithic-grid">
              {stats.map((stat, i) => (
                <ScrollStat
                  key={stat.label}
                  stat={stat}
                  index={i}
                  progress={progress}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>

            <ScrollTimeline
              progress={progress}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About