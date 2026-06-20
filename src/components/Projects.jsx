import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
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

// A single highlight, rendered as an annotated source comment rather
// than a test-result line. Reveals via a left-anchored clip driven by
// the row's scroll progress, like a comment being typed/exposed.
function AnnotatedLine({ text, index, progress, prefersReducedMotion }) {
  const start = 0.32 + index * 0.06
  const end = start + 0.12
  const opacity = useTransform(progress, [start, end], [0, 1])
  const x = useTransform(progress, [start, end], [prefersReducedMotion ? 0 : -6, 0])

  return (
    <motion.div
      className="annotated-line"
      style={prefersReducedMotion ? undefined : { opacity, x }}
    >
      <span className="annotated-line-marker">{'//'}</span>
      <span className="annotated-line-text">{text}</span>
    </motion.div>
  )
}

// A single ecosystem badge. Pops in slightly scaled-up-from-small with
// a small per-index scroll offset so the row "populates" left to right
// rather than appearing as one block.
function EcosystemBadge({ tech, index, progress, prefersReducedMotion }) {
  const start = 0.4 + index * 0.025
  const end = start + 0.1
  const opacity = useTransform(progress, [start, end], [0, 1])
  const scale = useTransform(progress, [start, end], [prefersReducedMotion ? 1 : 0.9, 1])

  return (
    <motion.span
      className="ecosystem-badge-token"
      style={prefersReducedMotion ? undefined : { opacity, scale }}
    >
      {tech}
    </motion.span>
  )
}

// A full project row. Owns its own scroll-progress source (rather than
// sharing one across the whole section) since rows can sit far apart
// vertically — each row's animations should respond to that row's own
// position in the viewport. The primary panel and the ecosystem
// sidebar move at slightly different rates as they resolve, echoing
// the depth language used in the About section.
function ProjectRow({ project, prefersReducedMotion }) {
  const rowRef = useRef(null)
  // Front-loaded range: progress reaches 1 once the row is well into
  // view, not as it's already passing the top of the screen. Keeps
  // every child animation finished before the user would be reading
  // that part of the row.
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 0.92', 'start 0.4'],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 28,
    mass: 0.3,
  })

  const panelY = useTransform(progress, [0, 0.35], [prefersReducedMotion ? 0 : 16, 0])
  const panelOpacity = useTransform(progress, [0, 0.3], [0, 1])

  const sidebarY = useTransform(progress, [0.05, 0.4], [prefersReducedMotion ? 0 : 18, 0])
  const sidebarOpacity = useTransform(progress, [0.05, 0.35], [0, 1])

  return (
    <div className="project-ledger-row" ref={rowRef}>
      <motion.div
        className="project-primary-details-panel"
        style={prefersReducedMotion ? undefined : { y: panelY, opacity: panelOpacity }}
      >
        <div className="project-classification-meta">
          <span className="project-index-num">{project.id}</span>
          <span className="classification-slash">/</span>
          <span className="project-domain-tag">{project.type}</span>
        </div>

        <h3 className="project-display-title">{project.name}</h3>
        <p className="project-tagline-text">{project.tagline}</p>
        <p className="project-paragraph-description">{project.description}</p>

        <div className="project-annotated-block">
          <span className="annotated-block-label">
            <span className="annotated-block-bracket">{'/*'}</span> key
            decisions <span className="annotated-block-bracket">{'*/'}</span>
          </span>
          {project.highlights.map((highlight, idx) => (
            <AnnotatedLine
              key={highlight}
              text={highlight}
              index={idx}
              progress={progress}
              prefersReducedMotion={prefersReducedMotion}
            />
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
      </motion.div>

      <motion.div
        className="project-ecosystem-sidebar-panel"
        style={prefersReducedMotion ? undefined : { y: sidebarY, opacity: sidebarOpacity }}
      >
        <span className="ecosystem-sidebar-heading">
          <span className="eyebrow-bracket">{'>'}</span> Ecosystem
        </span>
        <div className="ecosystem-badges-flexbox">
          {project.stack.map((tech, idx) => (
            <EcosystemBadge
              key={tech}
              tech={tech}
              index={idx}
              progress={progress}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function Projects() {
  const prefersReducedMotion = useReducedMotion()

  const headerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="portfolio-projects-section" id="projects">
      <div className="projects-container-inner">
        <motion.div
          className="section-header-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
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
            <ProjectRow
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

export default Projects