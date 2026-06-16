import { motion } from 'framer-motion'
import '../styles/Projects.css'

const projects = [
  {
    id: '01',
    name: 'Flowspace',
    tagline: 'Async Team Standup & Decision Platform',
    description: 'Eliminates daily sync meetings. Posts, blockers, and decisions propagate instantly via SignalR — with a role-enforced decision log that preserves team knowledge that typically vanishes in Slack threads.',
    stack: ['ASP.NET Core', 'React 18', 'TypeScript', 'PostgreSQL', 'SignalR', 'NUnit', 'Selenium'],
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
    description: 'Production-grade e-commerce app built end-to-end — JWT auth, product catalogue, cart, checkout, order management — with a complete QA automation framework layered on top of the live application.',
    stack: ['Spring Boot', 'React 18', 'PostgreSQL', 'Java', 'Selenium', 'TestNG', 'RestAssured'],
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
  return (
    <section className="projects" id="projects">
      <div className="projects-inner">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Selected Work</span>
          <h2 className="section-title">Projects that prove the point</h2>
          <p className="section-sub">Not side projects — full systems with real architecture decisions and test coverage to match.</p>
        </motion.div>

        <div className="projects-list">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="project-left">
                <span className="project-number">{project.id}</span>
                <span className="project-type">{project.type}</span>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-tagline">{project.tagline}</p>
                <p className="project-desc">{project.description}</p>
                <div className="project-highlights">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="highlight-item">
                      <span className="highlight-dot" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
                <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                  View on GitHub →
                </a>
              </div>

              <div className="project-right">
                <div className="stack-grid">
                  {project.stack.map((tech) => (
                    <span key={tech} className="stack-tag">{tech}</span>
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