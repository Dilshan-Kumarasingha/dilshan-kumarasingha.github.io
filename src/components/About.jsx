import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import profilePhoto from "../assets/Profile1.jpeg";
import "../styles/About.css";
import "../styles/AboutExperience.css"; // NEW: styles for the redesigned Experience block

/*
  CONTENT RULES FOR THIS FILE
  - Every number and tool below must be something you can explain in an interview.
  - Keep titles, dates and skills identical to LinkedIn, GitHub README and CV.
  - Move a tool from "learning" to "hands-on" only when a repo proves it.
*/

const stats = [
  {
    value: 5,
    kind: "Hands-on",
    title: "DevOps tools",
    detail: "Used hands-on across my projects.",
    chips: ["Docker", "GitHub Actions", "Git", "Linux", "Bash"],
  },
  {
    value: 2,
    kind: "Automated",
    title: "CI pipelines on GitHub",
    detail: "Every push runs through automated test gates.",
    chips: ["GitHub Actions", "Test gates"],
    accent: true,
  },
  {
    value: 3,
    kind: "Learning",
    title: "Cloud tools in progress",
    detail: "Currently building projects to practise them.",
    chips: ["AWS", "Kubernetes", "Terraform"],
    learning: true,
  },
  {
    value: 1,
    kind: "Regulated",
    title: "Banking team",
    detail: "UAT and release validation in a regulated environment.",
    chips: ["UAT", "Release validation"],
  },
];

const record = [
  {
    // TODO: replace with your real start month and year
    span: "2026 — Present",
    duration: "Current role",
    role: "IT Lab Demonstrator",
    org: "Lyceum International Schools",
    mark: "LI",
    summary:
      "Teach practical Python and C. Administer lab systems, deploy the school IMS and monitor uptime.",
    tags: ["Python", "C", "Lab systems", "IMS deployment", "Uptime"],
    status: "active",
  },
  {
    span: "Aug 2023 — Feb 2024",
    duration: "6 months",
    role: "Software Developer Intern",
    org: "Bank of Ceylon, Head Office",
    mark: "BC",
    summary:
      "React Native and SQLite features, UAT and regression checks on a regulated payment platform.",
    tags: ["React Native", "SQLite", "UAT", "Regression testing"],
    status: "resolved",
  },
];

const revealEase = [0.16, 1, 0.3, 1];

function About() {
  const targetRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // With reduced motion, content is fully visible from the start
  const hidden = prefersReducedMotion ? 1 : 0;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.9", "end 0.2"],
  });

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.18], [hidden, 1]);
  const headlineY = useTransform(
    scrollYProgress,
    [0, 0.18],
    [prefersReducedMotion ? 0 : 28, 0]
  );

  const bodyOpacity = useTransform(scrollYProgress, [0.08, 0.3], [hidden, 1]);
  const bodyY = useTransform(
    scrollYProgress,
    [0.08, 0.3],
    [prefersReducedMotion ? 0 : 22, 0]
  );

  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 14, prefersReducedMotion ? 0 : -14]
  );

  const smoothHeadlineOpacity = useSpring(headlineOpacity, {
    damping: 28,
    stiffness: 160,
  });
  const smoothHeadlineY = useSpring(headlineY, {
    damping: 28,
    stiffness: 160,
  });
  const smoothBodyOpacity = useSpring(bodyOpacity, {
    damping: 26,
    stiffness: 150,
  });
  const smoothBodyY = useSpring(bodyY, { damping: 26, stiffness: 150 });
  const smoothPhotoY = useSpring(photoY, { damping: 30, stiffness: 120 });

  return (
    <section
      className="about"
      id="about"
      ref={targetRef}
      aria-labelledby="about-title"
    >
      <div className="about-inner">
        {/* Intro */}
        <div className="about-intro-split">
          {/* Photo */}
          <motion.div
            className="about-photo-column"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.75,
              ease: revealEase,
            }}
          >
            <motion.div
              className="about-photo-stage"
              style={{ y: smoothPhotoY }}
            >
              <span className="about-photo-ring" aria-hidden="true" />
              <span className="about-photo-arch" aria-hidden="true" />
              <span className="about-photo-grid" aria-hidden="true" />

              <div className="about-photo-frame">
                <img
                  src={profilePhoto}
                  alt="Portrait of Dilshan Kumarasingha"
                  className="about-photo"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="about-photo-badge">
                <span className="about-photo-badge-dot" aria-hidden="true" />
                Cloud &amp; DevOps
              </div>
            </motion.div>
          </motion.div>

          {/* Copy */}
          <div className="about-intro-text">
            <div className="about-eyebrow-row">
              <span className="about-eyebrow">Who I am</span>

              <div className="dot-grid dot-grid--red" aria-hidden="true">
                {Array.from({ length: 24 }, (_, index) => (
                  <span key={index} />
                ))}
              </div>
            </div>

            <motion.h2
              id="about-title"
              className="about-headline"
              style={{
                opacity: smoothHeadlineOpacity,
                y: smoothHeadlineY,
              }}
              data-cursor="text"
            >
              From writing code
              <br />
              <span className="about-headline-accent">
                to running it in production.
              </span>
            </motion.h2>

            <motion.div
              className="about-body"
              style={{
                opacity: smoothBodyOpacity,
                y: smoothBodyY,
              }}
            >
              <p className="about-text">
                I am a software engineer with a background in backend and
                mobile development, now moving into DevOps and cloud
                engineering. As a Software Developer Intern at Bank of Ceylon,
                I worked in a regulated banking environment where UAT,
                regression checks and structured releases were part of every
                sprint. At Lyceum International Schools I teach practical
                Python and C, and I also look after lab systems, IMS
                deployment and uptime.
              </p>

              <p className="about-text">
                I believe reliable delivery needs more than working scripts. It
                needs containerized environments, automated pipelines with test
                gates, monitoring, and infrastructure as code.
              </p>

              <p className="about-text">
                Today I work hands-on with Linux, Bash, Git, Docker and GitHub
                Actions. I am learning AWS, Kubernetes and Terraform, and I am
                building projects to put them into practice.
              </p>

              <p className="about-text">
                I am open to junior Cloud, DevOps and Platform Engineer roles
                where I can help build and run reliable delivery pipelines.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <section
          className="about-stats-section"
          aria-label="Career highlights"
        >
          <div className="about-section-heading">
            <span>At a glance</span>
            <span className="about-section-line" />
          </div>

          <div className="gl-grid">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.title}
                stat={stat}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </section>

        {/* Experience (redesigned) */}
        <section
          className="about-experience"
          aria-labelledby="experience-title"
        >
          <div className="about-section-heading">
            <span id="experience-title">Experience</span>
            <span className="about-section-line" />
          </div>

          <ol className="xp-list">
            {record.map((item, index) => (
              <ExperienceItem
                key={`${item.org}-${item.span}`}
                item={item}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </ol>
        </section>
      </div>
    </section>
  );
}

function StatCard({ stat, index, prefersReducedMotion }) {
  const classes = [
    "gl-card",
    stat.accent ? "gl-card--accent" : "",
    stat.learning ? "gl-card--learning" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.article
      className={classes}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.07,
        ease: revealEase,
      }}
      data-cursor="hover"
    >
      <div className="gl-number" aria-hidden="true">
        <span className="gl-index">0{index + 1}</span>
        <span className="gl-value">{stat.value}</span>
      </div>

      <div className="gl-content">
        <div className="gl-top">
          <h3 className="gl-title">{stat.title}</h3>
          <span className="gl-kind">{stat.kind}</span>
        </div>

        <p className="gl-detail">
          <span className="sr-only">{stat.value} </span>
          {stat.detail}
        </p>

        <ul className="gl-chips" aria-label="Tools">
          {stat.chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function ExperienceItem({ item, index, prefersReducedMotion }) {
  const isActive = item.status === "active";

  return (
    <motion.li
      className={`xp-item ${isActive ? "xp-item--active" : ""}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.08,
        ease: revealEase,
      }}
    >
      {/* Left: when */}
      <div className="xp-when">
        <span className="xp-span">{item.span}</span>
        <span className="xp-duration">{item.duration}</span>
      </div>

      {/* Timeline node */}
      <span className="xp-node" aria-hidden="true" />

      {/* Right: card */}
      <article className="xp-card" data-cursor="hover">
        <header className="xp-card-head">
          <span className="xp-mark" aria-hidden="true">
            {item.mark}
          </span>

          <div className="xp-titles">
            <h3 className="xp-role">{item.role}</h3>
            <p className="xp-org">{item.org}</p>
          </div>

          {isActive && <span className="xp-badge">Current</span>}
        </header>

        {item.summary && <p className="xp-summary">{item.summary}</p>}

        {item.tags?.length > 0 && (
          <ul className="xp-tags" aria-label="Skills used">
            {item.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        {item.href && (
          <a
            className="xp-link"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${item.org}`}
          >
            Visit ↗
          </a>
        )}
      </article>
    </motion.li>
  );
}

export default About;