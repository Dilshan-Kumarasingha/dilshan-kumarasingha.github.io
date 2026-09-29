import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { projects } from '../data/projects'
import '../styles/Projects.css'

const SWIPE_THRESHOLD = 80

const statusLabels = {
  shipped: 'Shipped',
  development: 'In development',
}

const ChevronIcon = ({ direction = 'right' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {direction === 'left' ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
  </svg>
)

function ProjectLink({ project }) {
  const { repository, demo, caseStudy } = project.links ?? {}
  const link = repository
    ? { href: repository, text: 'View repository', label: `View ${project.name} repository` }
    : demo
    ? { href: demo, text: 'View live demo', label: `View ${project.name} live demo` }
    : caseStudy
    ? { href: caseStudy, text: 'View case study', label: `Read ${project.name} case study` }
    : null

  if (!link) {
    return (
      <span className="project-link project-link--disabled">
        Repository private · available on request
      </span>
    )
  }

  return (
    <a
      className="project-link"
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      data-cursor="hover"
    >
      <span>{link.text}</span>
      <ChevronIcon />
    </a>
  )
}

const slideVariants = (reduce) => ({
  enter: (dir) => (reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: dir > 0 ? 70 : -70, scale: 0.98 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir) => (reduce ? { opacity: 0 } : { opacity: 0, x: dir > 0 ? -70 : 70, scale: 0.98 }),
})

const listStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
}

const listItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

function ProjectCard({ project, index, total, direction, reduceMotion, onSwipe }) {
  const statusLabel = statusLabels[project.status] ?? 'Project'

  return (
    <motion.article
      className="project-card"
      custom={direction}
      variants={slideVariants(reduceMotion)}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: 'spring', stiffness: 300, damping: 30, opacity: { duration: 0.2 } }}
      drag={reduceMotion ? false : 'x'}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.14}
      onDragEnd={(_, info) => {
        if (info.offset.x < -SWIPE_THRESHOLD) onSwipe(1)
        else if (info.offset.x > SWIPE_THRESHOLD) onSwipe(-1)
      }}
    >
      <span className="project-card__arch" aria-hidden="true" />

      <div className="project-card__top">
        <span className="project-card__count">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <span className={`project-status project-status--${project.status}`}>
          <span className="project-status__dot" aria-hidden="true" />
          {statusLabel}
        </span>
      </div>

      <div className="project-card__main">
        <div className="project-card__identity">
          <h3 className="project-card__title">{project.name}</h3>
          <p className="project-card__tagline">{project.tagline}</p>
        </div>

        <div className="project-card__overview">
          <span className="project-label">Overview</span>
          <p>{project.narrative}</p>
        </div>
      </div>

      <div className="project-card__details">
        <div>
          <span className="project-label">Verified implementations</span>
          <motion.ul
            className="project-highlights"
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
            variants={listStagger}
          >
            {project.highlights.map((highlight) => (
              <motion.li key={highlight} variants={listItem}>
                <span className="project-highlights__dot" aria-hidden="true" />
                <span>{highlight}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div>
          <span className="project-label">Technology</span>
          <motion.ul
            className="project-stack"
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
            variants={listStagger}
          >
            {project.stack.map((tech) => (
              <motion.li key={tech} variants={listItem}>
                {tech}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

      <div className="project-card__footer">
        <ProjectLink project={project} />
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const total = projects.length

  const goTo = useCallback(
    (next, dir) => {
      if (!total) return
      setDirection(dir)
      setActiveIndex(((next % total) + total) % total)
    },
    [total]
  )

  const step = useCallback((dir) => goTo(activeIndex + dir, dir), [activeIndex, goTo])

  // Arrow keys work while the slider is focused (no global listener,
  // so it never hijacks scrolling/typing elsewhere on the page).
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      step(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      step(-1)
    }
  }

  if (!total) return null

  const active = projects[activeIndex]

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <div className="projects-section__container">
        <motion.header
          className="projects-header"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="projects-kicker">
            <span className="projects-kicker-dot" aria-hidden="true" />
            Selected work
          </span>
          <h2 id="projects-title">
            Projects that <span className="projects-title-accent">solve real problems.</span>
          </h2>
          <p>
            Pick a project to load it — systems built across backend architecture,
            real-time communication, automation, testing and modern frontend work.
          </p>
        </motion.header>

        {/* ---------- Project selector ---------- */}
        <motion.div
          className="project-dial"
          role="tablist"
          aria-label="Projects"
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
          }}
        >
          {projects.map((project, index) => {
            const isActive = index === activeIndex
            return (
              <motion.button
                key={project.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show project ${index + 1}: ${project.name}`}
                className={`project-dial__btn ${isActive ? 'is-active' : ''}`}
                onClick={() => goTo(index, index > activeIndex ? 1 : -1)}
                data-cursor="hover"
                variants={{
                  hidden: { opacity: 0, y: 14, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.94 }}
              >
                <span className="project-dial__num">{String(index + 1).padStart(2, '0')}</span>
                <span className="project-dial__label">{project.name}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* ---------- Stage ---------- */}
        <div
          className="project-stage"
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="Project showcase"
          onKeyDown={handleKeyDown}
        >
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <ProjectCard
              key={active.id}
              project={active}
              index={activeIndex}
              total={total}
              direction={direction}
              reduceMotion={reduceMotion}
              onSwipe={step}
            />
          </AnimatePresence>

          {/* progress rail beneath the card, echoing the hero pipeline */}
          <div className="project-progress" aria-hidden="true">
            {projects.map((project, index) => (
              <span
                key={project.id}
                className={`project-progress__seg ${index === activeIndex ? 'is-active' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="project-controls">
          <button
            type="button"
            className="project-nav"
            onClick={() => step(-1)}
            aria-label="Previous project"
            data-cursor="hover"
          >
            <ChevronIcon direction="left" />
            <span>Previous</span>
          </button>

          <span className="project-controls__hint">drag or use ← → keys</span>

          <button
            type="button"
            className="project-nav project-nav--primary"
            onClick={() => step(1)}
            aria-label="Next project"
            data-cursor="hover"
          >
            <span>Next</span>
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  )
}