import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { projects } from "../data/projects";
import "../styles/Projects.css";

const EASE = [0.16, 1, 0.3, 1];

const statusLabels = {
  shipped: "Shipped",
  development: "In development",
};

const ChevronIcon = ({ direction = "right" }) => (
  <svg
    className={`projects-arrow projects-arrow--${direction}`}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {direction === "left" ? (
      <path d="m15 18-6-6 6-6" />
    ) : (
      <path d="m9 18 6-6-6-6" />
    )}
  </svg>
);

function ProjectLink({ project }) {
  const repository = project.links?.repository;
  const demo = project.links?.demo;
  const caseStudy = project.links?.caseStudy;

  if (repository) {
    return (
      <a
        className="projects-project-link"
        href={repository}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.name} repository`}
      >
        <span>View repository</span>
        <ChevronIcon />
      </a>
    );
  }

  if (demo) {
    return (
      <a
        className="projects-project-link"
        href={demo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.name} live demo`}
      >
        <span>View live demo</span>
        <ChevronIcon />
      </a>
    );
  }

  if (caseStudy) {
    return (
      <a
        className="projects-project-link"
        href={caseStudy}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read ${project.name} case study`}
      >
        <span>View case study</span>
        <ChevronIcon />
      </a>
    );
  }

  return (
    <span className="projects-project-link projects-project-link--disabled">
      Repository private · available on request
    </span>
  );
}

function ProjectSlide({
  project,
  index,
  total,
  direction,
  shouldReduceMotion,
}) {
  const statusLabel =
    statusLabels[project.status] ?? "Project status";

  const variants = {
    enter: shouldReduceMotion
      ? {
          opacity: 1,
          x: 0,
        }
      : {
          opacity: 0,
          x: direction > 0 ? 80 : -80,
        },

    center: {
      opacity: 1,
      x: 0,
    },

    exit: shouldReduceMotion
      ? {
          opacity: 1,
          x: 0,
        }
      : {
          opacity: 0,
          x: direction > 0 ? -80 : 80,
        },
  };

  return (
    <motion.article
      className="projects-slide"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: EASE,
      }}
      drag={shouldReduceMotion ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.12}
      whileDrag={
        shouldReduceMotion
          ? undefined
          : {
              cursor: "grabbing",
            }
      }
    >
      <div className="projects-slide__top">
        <div className="projects-slide__number">
          {String(index + 1).padStart(2, "0")}
          <span>/</span>
          {String(total).padStart(2, "0")}
        </div>

        <div
          className={`projects-slide__status projects-slide__status--${project.status}`}
        >
          <span aria-hidden="true" />
          {statusLabel}
        </div>
      </div>

      <div className="projects-slide__main">
        <div className="projects-slide__identity">
          <span className="projects-slide__index">
            PROJECT {String(index + 1).padStart(2, "0")}
          </span>

          <h3 className="projects-slide__title">
            {project.name}
          </h3>

          <p className="projects-slide__tagline">
            {project.tagline}
          </p>
        </div>

        <div className="projects-slide__description">
          <span className="projects-slide__label">
            Overview
          </span>

          <p>{project.narrative}</p>
        </div>
      </div>

      <div className="projects-slide__divider" />

      <div className="projects-slide__details">
        <div className="projects-slide__column">
          <span className="projects-slide__label">
            Verified implementations
          </span>

          <ul className="projects-highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}>
                <span
                  className="projects-highlight-dot"
                  aria-hidden="true"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="projects-slide__column">
          <span className="projects-slide__label">
            Technology
          </span>

          <ul className="projects-stack">
            {project.stack.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="projects-slide__footer">
        <ProjectLink project={project} />

        <span className="projects-slide__hint">
          {index + 1 < total
            ? "Next project →"
            : "End of selection"}
        </span>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const total = projects.length;

  const goTo = useCallback(
    (nextIndex, nextDirection) => {
      if (!total) return;

      const normalizedIndex =
        (nextIndex + total) % total;

      setDirection(nextDirection);
      setActiveIndex(normalizedIndex);
    },
    [total]
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1, 1);
  }, [activeIndex, goTo]);

  const goPrevious = useCallback(() => {
    goTo(activeIndex - 1, -1);
  }, [activeIndex, goTo]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }
    },
    [goNext, goPrevious]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!projects.length) {
    return null;
  }

  return (
    <section
      className="projects"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="projects__inner">
        <header className="projects-header">
          <div className="projects-header__content">
            <span className="projects-eyebrow">
              Selected work
            </span>

            <h2
              className="projects-title"
              id="projects-title"
            >
              Projects that
              <br />
              <span>solve real problems.</span>
            </h2>

            <p className="projects-subtitle">
              A selection of systems built across backend
              architecture, real-time communication,
              automation, testing, and modern frontend
              development.
            </p>
          </div>

          <div
            className="projects-header__meta"
            aria-hidden="true"
          >
            <span>PROJECT INDEX</span>
            <strong>
              {String(activeIndex + 1).padStart(2, "0")}
              <small> / </small>
              {String(total).padStart(2, "0")}
            </strong>
          </div>
        </header>

        <div
          className="projects-slider"
          tabIndex={0}
          aria-label="Project showcase"
          onKeyDown={handleKeyDown}
        >
          <div className="projects-slider__viewport">
            <AnimatePresence
              initial={false}
              mode="sync"
              custom={direction}
            >
              <ProjectSlide
                key={projects[activeIndex].id}
                project={projects[activeIndex]}
                index={activeIndex}
                total={total}
                direction={direction}
                shouldReduceMotion={shouldReduceMotion}
              />
            </AnimatePresence>
          </div>
        </div>

        <div className="projects-controls">
          <div
            className="projects-progress"
            aria-label={`Project ${activeIndex + 1} of ${total}`}
          >
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className={`projects-progress__item ${
                  index === activeIndex
                    ? "projects-progress__item--active"
                    : ""
                }`}
                onClick={() =>
                  goTo(
                    index,
                    index > activeIndex ? 1 : -1
                  )
                }
                aria-label={`Show project ${index + 1}: ${project.name}`}
                aria-current={
                  index === activeIndex
                    ? "true"
                    : undefined
                }
              >
                <span />
              </button>
            ))}
          </div>

          <div className="projects-navigation">
            <button
              type="button"
              className="projects-nav-button"
              onClick={goPrevious}
              aria-label="Previous project"
            >
              <ChevronIcon direction="left" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              className="projects-nav-button"
              onClick={goNext}
              aria-label="Next project"
            >
              <span>Next</span>
              <ChevronIcon direction="right" />
            </button>
          </div>
        </div>

        <div className="projects-bottom-note">
          <span>DRAG TO EXPLORE</span>
          <span aria-hidden="true">·</span>
          <span>USE ← → KEYS</span>
        </div>
      </div>
    </section>
  );
}