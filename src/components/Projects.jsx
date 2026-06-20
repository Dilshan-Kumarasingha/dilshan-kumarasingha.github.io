import { motion, useReducedMotion } from 'framer-motion'
import '../styles/Projects.css'

// Inline SVG keeps this independent of whatever lucide-react version is installed.
const GithubIcon = ({ size = 15 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const projects = [
  {
    id: '01',
    name: 'Flowspace',
    tagline: 'Async Team Standup & Decision Platform',
    description:
      'Eliminates daily sync meetings. Posts, blockers, and decisions propagate instantly via SignalR — with a role-enforced decision log that preserves team knowledge that typically vanishes in Slack threads.',
    stack: [
      'ASP.NET Core',
      'React 18',
      'TypeScript',
      'PostgreSQL',
      'SignalR',
      'NUnit',
      'Selenium',
    ],
    highlights: [
      '10 business rules enforced at service layer, each with a dedicated NUnit test',
      'Three-layer QA: RestSharp API + Selenium UI + Dapper DB validation',
      'CI/CD via GitHub Actions with Allure reporting',
    ],
    github: 'https://github.com/Dilshan-Kumarasingha',
    type: 'Full-Stack + QA',
  },
  {
    id: '02',
    name: 'ShopQA',
    tagline: 'E-Commerce Platform with End-to-End QA Framework',
    description:
      'Production-grade e-commerce app built end-to-end — JWT auth, product catalogue, cart, checkout, order management — with a complete QA automation framework layered on top of the live application.',
    stack: [
      'Spring Boot',
      'React 18',
      'PostgreSQL',
      'Java',
      'Selenium',
      'TestNG',
      'RestAssured',
    ],
    highlights: [
      'Selenium UI tests with Page Object Model pattern',
      'RestAssured API tests + JDBC database validation',
      'Full CI/CD pipeline via GitHub Actions + Allure reports',
    ],
    github: 'https://github.com/Dilshan-Kumarasingha',
    type: 'Full-Stack + QA',
  },
]

function Projects() {
  const prefersReducedMotion = useReducedMotion()

  const blockVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const checkVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.4 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <section className="portfolio-projects-section" id="projects">
      <div className="projects-container-inner">
        <motion.div
          className="section-header-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={blockVariants}
        >
          <span className="section-eyebrow-text">
            <span className="eyebrow-bracket">{'//'}</span> Selected Work
          </span>
          <h2 className="section-main-title">
            Projects that <span className="headline-accent-text">prove the point.</span>
          </h2>
          <p className="section-subtitle-narrative">
            Not side projects — full systems with real architecture decisions
            and test coverage to match.
          </p>
        </motion.div>

        <div className="projects-data-ledger">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-ledger-row"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={blockVariants}
            >
              <div className="project-primary-details-panel">
                <div className="project-classification-meta">
                  <span className="project-index-num">{project.id}</span>
                  <span className="classification-slash">/</span>
                  <span className="project-domain-tag">{project.type}</span>
                </div>

                <h3 className="project-display-title">{project.name}</h3>
                <p className="project-tagline-text">{project.tagline}</p>
                <p className="project-paragraph-description">
                  {project.description}
                </p>

                <div className="project-test-suite-readout">
                  <span className="test-suite-label">test results</span>
                  {project.highlights.map((highlight, idx) => (
                    <motion.div
                      key={highlight}
                      className="test-suite-line"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={checkVariants}
                      transition={{
                        duration: 0.35,
                        delay: 0.15 + idx * 0.15,
                      }}
                    >
                      <span className="test-suite-check">
                        <CheckIcon />
                      </span>
                      <span className="test-suite-text">{highlight}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="project-source-action-row">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-source-anchor-link"
                  >
                    <span>Repository Source</span>
                    <GithubIcon size={14} />
                  </a>
                </div>
              </div>

              <div className="project-ecosystem-sidebar-panel">
                <span className="ecosystem-sidebar-heading">
                  <span className="eyebrow-bracket">{'>'}</span> Ecosystem
                </span>
                <div className="ecosystem-badges-flexbox">
                  {project.stack.map((tech) => (
                    <span key={tech} className="ecosystem-badge-token">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects