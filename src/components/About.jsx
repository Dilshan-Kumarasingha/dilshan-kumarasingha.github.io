import { motion } from 'framer-motion'
import '../styles/About.css'

const stats = [
  { value: '2+', label: 'Years in banking & enterprise software' },
  { value: '3', label: 'Layers of QA — UI, API, Database' },
  { value: '10+', label: 'Business rules tested at service layer' },
  { value: '40+', label: 'Workstations deployed at Lyceum IMS' },
]

function About() {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        <div className="about-grid">
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">About</span>
            <h2 className="section-title">Built for environments where bugs cost real money</h2>
            <p className="about-text">
              I started my career inside Bank of Ceylon — one of Sri Lanka's largest state banks — 
              contributing to core banking features across the full SDLC in a security-compliant 
              environment handling millions of daily transactions.
            </p>
            <p className="about-text">
              That experience shaped how I build: every feature needs to work, every edge case 
              needs a test, and every deployment needs to be predictable. I bring that same 
              discipline to every project I ship.
            </p>
            <p className="about-text">
              Currently targeting enterprise software roles at companies like Sampath IT Solutions, 
              WSO2, IFS, and Virtusa — where software quality is not optional.
            </p>
          </motion.div>

          <motion.div
            className="about-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="experience-block">
              <div className="exp-item">
                <span className="exp-period">2026 – Present</span>
                <div className="exp-details">
                  <span className="exp-role">IT Support & Lab Demonstrator</span>
                  <span className="exp-company">Lyceum International Schools</span>
                </div>
              </div>
              <div className="exp-divider" />
              <div className="exp-item">
                <span className="exp-period">2023 – 2024</span>
                <div className="exp-details">
                  <span className="exp-role">Software Developer Intern</span>
                  <span className="exp-company">Bank of Ceylon</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About