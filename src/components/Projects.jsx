import { motion, useReducedMotion } from "framer-motion";
import { projects } from "../data/projects";
import "../styles/Projects.css";

const EASE = [0.16, 1, 0.3, 1];

const statusLabels = {
  shipped: "Shipped",
  development: "In development",
};

const getStatusLabel = (status) =>
  statusLabels[status] ?? "Project status unavailable";

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

function ProjectLink({ project }) {
  const repository = project.links?.repository;
  const demo = project.links?.demo;
  const caseStudy = project.links?.caseStudy;

  if (repository) {
    return (
      <a
        className="project-link"
        href={repository}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.name} repository`}
      >
        <span>View repository</span>
        <ChevronRight />
      </a>
    );
  }

  if (demo) {
    return (
      <a
        className="project-link"
        href={demo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.name} live demo`}
      >
        <span>View live demo</span>
        <ChevronRight />
      </a>
    );
  }

  if (caseStudy) {
    return (
      <a
        className="project-link"
        href={caseStudy}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read ${project.name} case study`}
      >
        <span>View case study</span>
        <ChevronRight />
      </a>
    );
  }

  return (
    <span className="project-link project-link--disabled">
      <span>Repository private · available on request</span>
    </span>
  );
}

function ProjectCard({ project, index, shouldReduceMotion }) {
  const statusLabel = getStatusLabel(project.status);

  const cardInitial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 28 };

  const cardVisible = { opacity: 1, y: 0 };

  return (
    <motion.article
      className="project-card"
      initial={cardInitial}
      whileInView={cardVisible}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: 0.6,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.07, 0.28),
        ease: EASE,
      }}
    >
      <div
        className={`project-status project-status--${project.status}`}
        aria-label={`Project status: ${statusLabel}`}
      >
        <span className="project-status__dot" aria-hidden="true" />
        {statusLabel}
      </div>

      <div className="project-card__glow" aria-hidden="true" />

      <header className="project-meta">
        <span className="project-id" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="project-heading">
          <h3 className="project-name">{project.name}</h3>

          <p className="project-tagline">
            {project.tagline}
          </p>
        </div>
      </header>

      <div className="project-content">
        <p className="project-narrative">
          {project.narrative}
        </p>

        <div className="project-details">
          <section className="project-detail" aria-labelledby={`${project.id}-highlights`}>
            <h4
              className="project-detail__label"
              id={`${project.id}-highlights`}
            >
              Verified implementations
            </h4>

            <ul className="project-highlights">
              {project.highlights.map((highlight) => (
                <li key={highlight}>
                  <span className="project-highlight-marker" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="project-detail" aria-labelledby={`${project.id}-stack`}>
            <h4
              className="project-detail__label"
              id={`${project.id}-stack`}
            >
              Technology stack
            </h4>

            <ul className="project-stack" aria-label="Technology stack">
              {project.stack.map((technology) => (
                <li className="tech-badge" key={technology}>
                  {technology}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <footer className="project-footer">
        <ProjectLink project={project} />
      </footer>
    </motion.article>
  );
}

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="projects"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="projects__inner">
        <motion.header
          className="projects-header"
          initial={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 18 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.55,
            ease: EASE,
          }}
        >
          <div className="projects-header__content">
            <span className="projects-eyebrow">
              Selected work
            </span>

            <h2 className="projects-title" id="projects-title">
              Systems that <span>scale.</span>
              <br />
              Built with complete rigor.
            </h2>

            <p className="projects-subtitle">
              Software projects spanning backend architecture,
              real-time systems, automation, testing, and modern
              frontend development.
            </p>
          </div>

          <div
            className="projects-grid-decoration"
            aria-hidden="true"
          />
        </motion.header>

        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}