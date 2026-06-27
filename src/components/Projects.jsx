import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import '../styles/Projects.css'

const ChevronRight = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const projects = [
  {
    id: '01',
    name: 'Flowspace',
    tagline: 'Async Team Standup & Decision Platform',
    description:
      'Eliminates synchronous overhead by enabling team members to broadcast updates, flag real-time blockers via SignalR, and maintain an immutable decision status machine that preserves crucial development context.',
    stack: [
      'ASP.NET Core',
      'React 18',
      'TypeScript',
      'PostgreSQL',
      'SignalR',
      'EF Core',
      'FluentValidation',
      'NUnit',
      'Selenium',
    ],
    highlights: [
      'Enforces business boundaries at the service layer, including unique daily update rules returning 409 Conflict.',
      'Drives a real-time collaborative workspace feed utilizing a dedicated SignalR hub for continuous client synchronization.',
      'Maintains a forward-only decision lifecycle state machine (Draft → Open → Decided → Superseded) with voting isolation.',
    ],
    link: '#',
  },
  {
    id: '02',
    name: 'HelpDeskHQ',
    tagline: 'Internal ITSM & Automated SLA Engine',
    description:
      'An enterprise helpdesk application featuring an autonomous rule-evaluation pipeline that actively tracks and updates Service Level Agreement deadlines without requiring human intervention.',
    stack: [
      'ASP.NET Core',
      'React',
      'TypeScript',
      'PostgreSQL',
      'Hangfire',
      'SignalR',
      'EF Core',
      'NUnit',
      'RestSharp',
    ],
    highlights: [
      'Integrates a Hangfire recurring background process to scan tickets, evaluate deadlines, and flag at-risk elements.',
      'Features programmatic ticket escalation routing and server-side state transition validations to prevent bypassing.',
      'Broadcasts live ticket queue changes and rolling 30-day compliance metrics instantaneously across user roles.',
    ],
    link: '#',
  },
  {
    id: '03',
    name: 'LankaCore Banking System',
    tagline: 'High-Performance Transaction Engine',
    description:
      'A secure core banking architecture tailored for multi-account management, automated security auditing, and zero-tolerance transactional accuracy.',
    stack: [
      'Java 25',
      'Spring Boot 4.0',
      'Spring Security',
      'Spring Data JPA',
      'PostgreSQL',
      'React 19',
      'Vite',
      'Recharts',
      'Maven',
    ],
    highlights: [
      'Engineered with modern runtime stacks optimizing Spring Security patterns for multi-tenant account endpoints.',
      'Implements clean data abstraction tiers ensuring strict isolation parameters for high-velocity account computations.',
      'Powers an interactive frontend monitoring dashboard featuring comprehensive ledger and transaction metrics visualization.',
    ],
    link: '#',
  },
  {
    id: '04',
    name: 'ShopQA E-Commerce',
    tagline: 'Full-Stack Application & Test Automation Suite',
    description:
      'A dual-purpose repository featuring a multi-role web platform coupled with an exhaustive, multi-tier QA test engineering framework validating everything from user journeys to persistent data layers.',
    stack: [
      'Java 25',
      'Spring Boot 4.0.6',
      'PostgreSQL 18',
      'React 18',
      'Selenium',
      'TestNG',
      'RestAssured',
      'Allure',
      'GitHub Actions',
    ],
    highlights: [
      'Features complete e-commerce workflows spanning product filtering, JWT-secured checkouts, and admin inventories.',
      'Deploys an end-to-end automation framework spanning UI Page Object Models and isolated REST API test assertions.',
      'Validates transactional persistence layers via direct JDBC structures inside a automated GitHub Actions CI pipeline.',
    ],
    link: '#',
  },
]

function ProjectCard({ project, prefersReducedMotion }) {
  const cardRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.95', 'end 0.2'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.25], [prefersReducedMotion ? 1 : 0.97, 1])
  const y = useTransform(scrollYProgress, [0, 0.25], [prefersReducedMotion ? 0 : 30, 0])

  const smoothOpacity = useSpring(opacity, { damping: 32, stiffness: 160 })
  const smoothScale = useSpring(scale, { damping: 32, stiffness: 160 })
  const smoothY = useSpring(y, { damping: 32, stiffness: 160 })

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity: smoothOpacity, scale: smoothScale, y: smoothY }}
      className="dash-project-card"
      whileHover={prefersReducedMotion ? {} : { y: -4, borderColor: "#2A3140" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="dash-project-meta-strip">
        <span className="dash-project-numerical-id">{project.id}</span>
        <div className="dash-project-identity-stack">
          <h3 className="dash-project-brand-name">{project.name}</h3>
          <p className="dash-project-tagline-text">{project.tagline}</p>
        </div>
        <span className="dash-project-status-pill">
          <span className="dash-project-status-dot" />
          shipped
        </span>
      </div>

      <p className="dash-project-narrative-body">{project.description}</p>

      <div className="dash-project-details-grid">
        <div className="dash-project-highlights-column">
          <h4 className="dash-detail-section-title">Verified implementations</h4>
          <ul className="dash-highlights-list">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="dash-highlight-item">
                <span className="dash-highlight-bullet-point">&middot;</span>
                <span className="dash-highlight-text-content">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dash-project-ecosystem-column">
          <h4 className="dash-detail-section-title">Ecosystem stack</h4>
          <div className="dash-tech-badges-flex">
            {project.stack.map((tech) => (
              <motion.span
                key={tech}
                className="dash-tech-badge"
                whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -1, borderColor: "#3DD68C" }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <div className="dash-project-action-wrapper">
        <a href={project.link} className="dash-link-action">
          <span>Explore architecture specification</span>
          <div className="dash-chevron-box">
            <ChevronRight size={13} />
          </div>
        </a>
      </div>
    </motion.div>
  )
}

function Projects() {
  const prefersReducedMotion = useReducedMotion()

  const headerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="dash-projects-section" id="projects">
      <div className="dash-projects-container">
        <motion.div
          className="dash-section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={headerVariants}
        >
          <span className="dash-section-eyebrow">
            <span className="dash-eyebrow-dot" />
            selected production architecture
          </span>
          <h2 className="dash-section-title">
            Systems that scale. <span className="dash-text-secondary">Built with complete rigor.</span>
          </h2>
          <p className="dash-section-subtitle">
            Enterprise-ready implementations featuring isolated backend services, multi-tier automated verification, and deterministic layouts.
          </p>
        </motion.div>

        <div className="dash-projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects;