import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import '../styles/About.css'

const stats = [
  { value: 1, suffix: '+', label: 'Years across IT operations & internship' },
  { value: 3, suffix: '', label: 'Production-style full-stack projects shipped' },
  { value: 3, suffix: '', label: 'QA layers covered — UI, API, Database' },
  { value: 40, suffix: '+', label: 'Workstations deployed at Lyceum IMS' },
]

const timeline = [
  {
    ref: '2026 — Present',
    role: 'IT Support & Lab Demonstrator',
    company: 'Lyceum International Schools',
  },
  {
    ref: '2023 — 2024',
    role: 'Software Developer Intern',
    company: 'Bank of Ceylon',
  },
]

const HEADLINE_PLAIN = 'Built with the discipline of '
const HEADLINE_ACCENT = 'production, not practice.'

function ScrollWord({ word, progress, start, end, accent, prefersReducedMotion }) {
  const opacity = useTransform(progress, [start, end], [0.2, 1])
  const y = useTransform(progress, [start, end], [prefersReducedMotion ? 0 : 12, 0])
  const filter = useTransform(progress, [start, end], [
    prefersReducedMotion ? 'blur(0px)' : 'blur(4px)',
    'blur(0px)',
  ])

  const springConfig = { damping: 32, stiffness: 180, mass: 0.35 }
  const smoothOpacity = useSpring(opacity, springConfig)
  const smoothY = useSpring(y, springConfig)

  return (
    <motion.span
      style={{
        opacity: smoothOpacity,
        y: smoothY,
        filter: prefersReducedMotion ? undefined : filter,
      }}
      className={`dash-about-word ${accent ? 'dash-about-word-accent' : ''}`}
    >
      {word}&nbsp;
    </motion.span>
  )
}

function ScrollStat({ stat, index, progress, prefersReducedMotion }) {
  const start = 0.08 + index * 0.05
  const end = start + 0.18

  const opacity = useTransform(progress, [start, end], [0, 1])
  const scale = useTransform(progress, [start, end], [prefersReducedMotion ? 1 : 0.96, 1])
  const y = useTransform(progress, [start, end], [prefersReducedMotion ? 0 : 20, 0])

  const springConfig = { damping: 28, stiffness: 140, mass: 0.5 }
  const smoothOpacity = useSpring(opacity, springConfig)
  const smoothScale = useSpring(scale, springConfig)
  const smoothY = useSpring(y, springConfig)

  return (
    <motion.div
      style={{ opacity: smoothOpacity, scale: smoothScale, y: smoothY }}
      className="dash-stat-card"
      whileHover={{ scale: 1.015, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="dash-stat-value">
        {stat.value}
        <span className="dash-stat-suffix">{stat.suffix}</span>
      </div>
      <div className="dash-stat-label">{stat.label}</div>
    </motion.div>
  )
}

function ScrollTimeline({ progress, prefersReducedMotion }) {
  const scaleY = useTransform(progress, [0.22, 0.6], [0, 1])
  const smoothScaleY = useSpring(scaleY, { damping: 35, stiffness: 120 })

  return (
    <div className="dash-rail-container">
      <div className="dash-rail-track" />
      <motion.div
        style={{ scaleY: smoothScaleY }}
        className="dash-rail-line-fill"
      />

      <div className="dash-entries-stack">
        {timeline.map((item, i) => {
          const entryStart = 0.25 + i * 0.12
          const entryEnd = entryStart + 0.16

          const entryOpacity = useTransform(progress, [entryStart, entryEnd], [0, 1])
          const entryX = useTransform(progress, [entryStart, entryEnd], [prefersReducedMotion ? 0 : 15, 0])

          const smoothOpacity = useSpring(entryOpacity, { damping: 26, stiffness: 130 })
          const smoothX = useSpring(entryX, { damping: 26, stiffness: 130 })

          return (
            <motion.div
              key={item.company}
              style={{ opacity: smoothOpacity, x: smoothX }}
              className="dash-entry"
            >
              <div className="dash-node" />
              <div className="dash-year">{item.ref}</div>
              <div className="dash-role">{item.role}</div>
              <div className="dash-company">{item.company}</div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function About() {
  const targetRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 0.85', 'end 0.25'],
  })

  const plainWords = HEADLINE_PLAIN.split(' ')
  const accentWords = HEADLINE_ACCENT.split(' ')
  const totalWords = plainWords.length + accentWords.length

  return (
    <section className="dash-about" id="about" ref={targetRef}>
      <div className="dash-about-inner">
        <div className="dash-about-grid">

          {/* LEFT COLUMN: Narrative Details */}
          <div className="dash-about-left">
            <span className="dash-section-eyebrow">
              <span className="dash-eyebrow-dot" />
              01 &middot; about.log
            </span>

            <h2 className="dash-about-headline">
              {plainWords.map((word, i) => {
                const start = (i / totalWords) * 0.32
                const end = start + 0.14
                return (
                  <ScrollWord
                    key={`p-${i}`}
                    word={word}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                    accent={false}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                )
              })}
              {accentWords.map((word, i) => {
                const idx = plainWords.length + i
                const start = (idx / totalWords) * 0.32
                const end = start + 0.14
                return (
                  <ScrollWord
                    key={`a-${i}`}
                    word={word}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                    accent={true}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                )
              })}
            </h2>

            <motion.div
              className="dash-about-paragraphs"
              style={{
                opacity: useSpring(useTransform(scrollYProgress, [0.18, 0.38], [0.3, 1]), { damping: 25 })
              }}
            >
              <p className="dash-about-text">
                My experience as a Software Developer Intern at Bank of Ceylon and my current role as an IT Support & Lab Demonstrator 
                at Lyceum International Schools
                have given me a strong foundation in both software development and enterprise IT operations. 
                Working across development, troubleshooting, and system support has taught me to build solutions that are reliable, 
                maintainable, and practical for real-world environments
              </p>
              <p className="dash-about-text">
                That experience set the bar for how I build: every service requires clean test suites,
                predictable database parameters, and scalable deployment operations. I apply that
                engineering discipline to design end-to-end full-stack systems backed by robust architecture
                rather than just shipping interfaces and hoping they stay active.
              </p>
              <p className="dash-about-text">
                I'm currently seeking a full-time Software Engineer, Backend Developer, 
                or System Administrator opportunity where I can continue building high-quality software, 
                improve my technical skills, and contribute to projects that make a real impact.
              </p>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Statistics & Timeline Panels */}
          <div className="dash-about-right">
            <div className="dash-stats-grid">
              {stats.map((stat, i) => (
                <ScrollStat
                  key={stat.label}
                  stat={stat}
                  index={i}
                  progress={scrollYProgress}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>

            <ScrollTimeline
              progress={scrollYProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default About;