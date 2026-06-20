import { motion, useReducedMotion } from 'framer-motion'
import '../styles/About.css'

const stats = [
  { value: '2+', label: 'Years in banking & enterprise software' },
  { value: '3', label: 'QA layers covered — UI, API, Database' },
  { value: '10+', label: 'Business rules tested at service layer' },
  { value: '40+', label: 'Workstations deployed at Lyceum IMS' },
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

function About() {
  const prefersReducedMotion = useReducedMotion()

  const elementVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="about" id="about">
      <div className="about-inner">
        <div className="about-grid">
          <motion.div
            className="about-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={elementVariants}
          >
            <span className="section-eyebrow">
              <span className="eyebrow-bracket">{'//'}</span> About
            </span>
            <h2 className="section-title">
              Built for environments where{' '}
              <span className="headline-accent">bugs cost real money.</span>
            </h2>

            <div className="about-text-stack">
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
            </div>
          </motion.div>

          <div className="about-right">
            <div className="stats-monolithic-grid">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="stat-metric-block"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={elementVariants}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="experience-ledger"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={elementVariants}
            >
              <span className="ledger-header">
                <span className="ledger-header-icon">{'$'}</span> git log
                --career
              </span>

              <div className="ledger-track">
                {timeline.map((entry) => (
                  <div className="ledger-row" key={entry.ref}>
                    <span className="ledger-node" aria-hidden="true" />
                    <span className="ledger-year">{entry.ref}</span>
                    <div className="ledger-details">
                      <span className="ledger-role">{entry.role}</span>
                      <span className="ledger-company">{entry.company}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About