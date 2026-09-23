import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import profilePhoto from '../assets/Profile1.jpeg'
import '../styles/About.css'

const stats = [
  { value: 1, suffix: '+', label: 'years, IT ops & internship' },
  { value: 3, suffix: '', label: 'full-stack builds shipped' },
  { value: 3, suffix: '', label: 'QA layers — UI / API / DB' },
  { value: 40, suffix: '+', label: 'workstations deployed', accent: true },
]

const record = [
  {
    span: '2026 — Present',
    role: 'Jr. System Administrator & Lab Demonstrator',
    org: 'Lyceum International Schools',
    status: 'active',
  },
  {
    span: '2023 — 2024',
    role: 'Software Developer Intern',
    org: 'Bank of Ceylon',
    status: 'resolved',
  },
]

function About() {
  const targetRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 0.85', 'end 0.2'],
  })

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.16], [0, 1])
  const headlineY = useTransform(scrollYProgress, [0, 0.16], [prefersReducedMotion ? 0 : 24, 0])
  const smoothHeadlineOpacity = useSpring(headlineOpacity, { damping: 28, stiffness: 160 })
  const smoothHeadlineY = useSpring(headlineY, { damping: 28, stiffness: 160 })

  const bodyOpacity = useTransform(scrollYProgress, [0.1, 0.28], [0, 1])
  const bodyY = useTransform(scrollYProgress, [0.1, 0.28], [prefersReducedMotion ? 0 : 20, 0])
  const smoothBodyOpacity = useSpring(bodyOpacity, { damping: 26 })
  const smoothBodyY = useSpring(bodyY, { damping: 26 })

  return (
    <section className="about" id="about" ref={targetRef}>
      <div className="about-inner">

        <div className="about-intro-split">
          <motion.div
            className="about-photo-stage"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="about-photo-ring" aria-hidden="true" />
            <span className="about-photo-arch" aria-hidden="true" />
            <div className="about-photo-frame">
              <img src={profilePhoto} alt="Portrait of Dilshan Kumarasingha" className="about-photo" />
            </div>
            <div className="about-photo-badge">
              <span className="about-photo-badge-dot" />
              Full-stack Engineer
            </div>
            <div className="dot-grid dot-grid--corner" aria-hidden="true">
              {Array.from({ length: 16 }).map((_, i) => <span key={i} />)}
            </div>
          </motion.div>

          <div className="about-intro-text">
            <div className="about-eyebrow-row">
              <span className="about-eyebrow">who I am</span>
              <div className="dot-grid dot-grid--red" aria-hidden="true">
                {Array.from({ length: 24 }).map((_, i) => <span key={i} />)}
              </div>
            </div>

            <motion.h2
              className="about-headline"
              style={{ opacity: smoothHeadlineOpacity, y: smoothHeadlineY }}
              data-cursor="text"
            >
              Built with the discipline of
              <br />
              <span className="about-headline-accent">production, not practice.</span>
            </motion.h2>

            <motion.div className="about-body" style={{ opacity: smoothBodyOpacity, y: smoothBodyY }}>
              <p className="about-text">
                My experience as a Software Developer Intern at Bank of Ceylon, and my
                current role as a Jr. System Administrator &amp; Lab Demonstrator at
                Lyceum International Schools, gave me a foundation in both software
                development and enterprise IT operations — building things that hold up
                under real, everyday use.
              </p>
              <p className="about-text">
                That's the bar I build to: clean test suites, predictable database
                parameters, scalable deployment. Full-stack systems backed by real
                architecture — not interfaces I ship and hope stay up.
              </p>
              <p className="about-text">
                Currently looking for a full-time Software Engineer, Backend Developer,
                or System Administrator role — somewhere I can keep building things that
                hold weight.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stat cards — bordered panels, single top-tick accent on the standout metric */}
        <div className="about-stats-grid">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              progress={scrollYProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Service record — bordered row list, signal edge marks "active" */}
        <div className="about-record-block">
          <span className="about-record-label">experience</span>
          <div className="about-record-list">
            {record.map((item, i) => (
              <RecordRow
                key={item.org}
                item={item}
                index={i}
                progress={scrollYProgress}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

function StatCard({ stat, index, progress, prefersReducedMotion }) {
  const start = 0.28 + index * 0.05
  const end = start + 0.16

  const opacity = useTransform(progress, [start, end], [0, 1])
  const y = useTransform(progress, [start, end], [prefersReducedMotion ? 0 : 20, 0])
  const smoothOpacity = useSpring(opacity, { damping: 28, stiffness: 150 })
  const smoothY = useSpring(y, { damping: 28, stiffness: 150 })

  return (
    <motion.div
      style={{ opacity: smoothOpacity, y: smoothY }}
      className={`about-stat-card ${stat.accent ? 'about-stat-card--accent' : ''}`}
      data-cursor="hover"
    >
      <div className="about-stat-value">
        {stat.value}
        <span className="about-stat-suffix">{stat.suffix}</span>
      </div>
      <div className="about-stat-label">{stat.label}</div>
    </motion.div>
  )
}

function RecordRow({ item, index, progress, prefersReducedMotion }) {
  const start = 0.5 + index * 0.1
  const end = start + 0.16
  const opacity = useTransform(progress, [start, end], [0, 1])
  const x = useTransform(progress, [start, end], [prefersReducedMotion ? 0 : -18, 0])
  const smoothOpacity = useSpring(opacity, { damping: 28, stiffness: 140 })
  const smoothX = useSpring(x, { damping: 28, stiffness: 140 })

  return (
    <motion.div
      style={{ opacity: smoothOpacity, x: smoothX }}
      className={`about-record-row ${item.status === 'active' ? 'about-record-row--active' : ''}`}
      data-cursor="hover"
      data-cursor-label={item.status === 'active' ? 'Now' : undefined}
    >
      <div className="about-record-edge" />
      <div className="about-record-main">
        <div className="about-record-top">
          <span className="about-record-span">{item.span}</span>
          {item.status === 'active' && <span className="about-record-live">active</span>}
        </div>
        <div className="about-record-role">{item.role}</div>
        <div className="about-record-org">{item.org}</div>
      </div>
    </motion.div>
  )
}

export default About;