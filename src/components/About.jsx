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

/*
  CONTENT RULES FOR THIS FILE
  - Every number and tool below must be something you can explain in an interview.
  - Keep titles, dates and skills identical to LinkedIn, GitHub README and CV.
  - Move a tool from "learning" to "hands-on" only when a repo proves it.
*/

const stats = [
  {
    value: 5,
    suffix: "",
    label: "DevOps tools used hands-on: Docker, Actions, Git, Linux, Bash",
  },
  {
    value: 2,
    suffix: "",
    label: "CI pipelines on GitHub with automated test gates",
    accent: true,
  },
  {
    value: 3,
    suffix: "",
    label: "cloud tools in progress: AWS, Kubernetes, Terraform",
  },
  {
    value: 1,
    suffix: "",
    label: "regulated banking team: UAT and release validation",
  },
];

const record = [
  {
    // TODO: replace with your real start month and year
    span: "2026 — Present",
    role: "IT Lab Demonstrator",
    org: "Lyceum International Schools",
    summary:
      "Teach practical Python and C. Administer lab systems, deploy the school IMS and monitor uptime.",
    status: "active",
  },
  {
    span: "Aug 2023 — Feb 2024",
    role: "Software Developer Intern",
    org: "Bank of Ceylon, Head Office",
    summary:
      "React Native and SQLite features, UAT and regression checks on a regulated payment platform.",
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

          <div className="about-stats-grid">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                stat={stat}
                index={index}
                progress={scrollYProgress}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </section>

        {/* Experience */}
        <section
          className="about-record-block"
          aria-labelledby="experience-title"
        >
          <div className="about-section-heading">
            <span id="experience-title">Experience</span>
            <span className="about-section-line" />
          </div>

          <div className="about-record-list">
            {record.map((item, index) => (
              <RecordRow
                key={`${item.org}-${item.span}`}
                item={item}
                index={index}
                progress={scrollYProgress}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function StatCard({ stat, index, progress, prefersReducedMotion }) {
  const start = 0.27 + index * 0.045;
  const end = start + 0.16;

  const opacity = useTransform(
    progress,
    [start, end],
    [prefersReducedMotion ? 1 : 0, 1]
  );
  const y = useTransform(
    progress,
    [start, end],
    [prefersReducedMotion ? 0 : 22, 0]
  );

  const smoothOpacity = useSpring(opacity, { damping: 28, stiffness: 150 });
  const smoothY = useSpring(y, { damping: 28, stiffness: 150 });

  return (
    <motion.article
      className={`about-stat-card ${
        stat.accent ? "about-stat-card--accent" : ""
      }`}
      style={{ opacity: smoothOpacity, y: smoothY }}
      data-cursor="hover"
    >
      <div className="about-stat-top">
        <span className="about-stat-index">0{index + 1}</span>
        {stat.accent && <span className="about-stat-mark">+</span>}
      </div>

      <div className="about-stat-value">
        {stat.value}
        <span className="about-stat-suffix">{stat.suffix}</span>
      </div>

      <div className="about-stat-label">{stat.label}</div>
    </motion.article>
  );
}

function RecordRow({ item, index, progress, prefersReducedMotion }) {
  const start = 0.48 + index * 0.09;
  const end = start + 0.17;

  const opacity = useTransform(
    progress,
    [start, end],
    [prefersReducedMotion ? 1 : 0, 1]
  );
  const x = useTransform(
    progress,
    [start, end],
    [prefersReducedMotion ? 0 : -18, 0]
  );

  const smoothOpacity = useSpring(opacity, { damping: 28, stiffness: 140 });
  const smoothX = useSpring(x, { damping: 28, stiffness: 140 });

  return (
    <motion.article
      className={`about-record-row ${
        item.status === "active" ? "about-record-row--active" : ""
      }`}
      style={{ opacity: smoothOpacity, x: smoothX }}
      data-cursor="hover"
      data-cursor-label={item.status === "active" ? "Now" : undefined}
    >
      <div className="about-record-edge" aria-hidden="true" />

      <div className="about-record-marker">
        <span />
      </div>

      <div className="about-record-main">
        <div className="about-record-top">
          <span className="about-record-span">{item.span}</span>

          {item.status === "active" && (
            <span className="about-record-live">Current</span>
          )}
        </div>

        <h3 className="about-record-role">{item.role}</h3>

        <p className="about-record-org">{item.org}</p>

        {item.summary && (
          <p className="about-record-org" style={{ marginTop: "0.45rem" }}>
            {item.summary}
          </p>
        )}
      </div>

      {/* The arrow only appears when a row actually links somewhere */}
      {item.href && (
        <a
          className="about-record-arrow"
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${item.org}`}
        >
          ↗
        </a>
      )}
    </motion.article>
  );
}

export default About;