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
    status: 'shipped',
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
    link: null,
  },
  {
    id: '02',
    name: 'HelpDeskHQ',
    tagline: 'Internal ITSM & Automated SLA Engine',
    status: 'shipped',
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
    link: null,
  },
  {
    id: '03',
    name: 'LankaCore Banking System',
    tagline: 'High-Performance Transaction Engine',
    status: 'in development',
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
    link: null,
  },
  {
    id: '04',
    name: 'ShopQA E-Commerce',
    tagline: 'Full-Stack Application & Test Automation Suite',
    status: 'in development',
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
    link: null,
  },
]

function ProjectCard({ project, prefersReducedMotion }) {
  const cardRef = useRef(null)
  const isShipped = project.status === 'shipped'

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.95', 'end 0.2'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.25], [prefersReducedMotion ? 0 : 24, 0])

  const smoothOpacity = useSpring(opacity, { damping: 32, stiffness: 160 })
  const smoothY = useSpring(y, { damping: 32, stiffness: 160 })

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity: smoothOpacity, y: smoothY }}
      className="project-card"
      data-cursor="hover"
    >
      <div className={`project-badge ${isShipped ? 'project-badge--shipped' : ''}`}>
        <span className="project-badge-dot" />
        {isShipped ? 'shipped' : 'in development'}
      </div>

      <div className="project-meta-strip">
        <span className="project-id">{project.id}</span>
        <div className="project-identity-stack">
          <h3 className="project-name">{project.name}</h3>
          <p className="project-tagline">{project.tagline}</p>
        </div>
      </div>

      <p className="project-narrative">{project.description}</p>

      <div className="project-details-grid">
        <div>
          <h4 className="detail-title">Verified implementations</h4>
          <ul className="highlights-list">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="highlight-item">
                <span className="highlight-mark" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="detail-title">Ecosystem stack</h4>
          <div className="tech-badges">
            {project.stack.map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="project-action-wrapper">
        {project.link ? (
          <a href={project.link} className="project-link" data-cursor="hover" data-cursor-label="Open">
            <span>Explore architecture specification</span>
            <span className="project-chevron">
              <ChevronRight size={13} />
            </span>
          </a>
        ) : (
          <span className="project-link project-link--disabled">
            <span>Repository private &middot; available on request</span>
          </span>
        )}
      </div>
    </motion.div>
  )
}

function Projects() {
  const prefersReducedMotion = useReducedMotion()

  const headerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <motion.div
          className="projects-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={headerVariants}
        >
          <span className="projects-eyebrow">selected work</span>
          <h2 className="projects-title">
            Systems that scale.
            <br />
            <span className="projects-title-accent">Built with complete rigor.</span>
          </h2>
          <p className="projects-subtitle">
            Enterprise-ready implementations featuring isolated backend services,
            multi-tier automated verification, and deterministic layouts.
          </p>
        </motion.div>

        <div className="projects-grid">
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