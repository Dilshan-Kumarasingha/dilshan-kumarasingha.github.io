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

const stats = [
  {
    value: 1,
    suffix: "+",
    label: "years in IT operations and software development",
  },
  {
    value: 3,
    suffix: "",
    label: "full-stack applications built",
  },
  {
    value: 40,
    suffix: "+",
    label: "workstations and lab systems deployed",
    accent: true,
  },
  {
    value: 12,
    suffix: "+",
    label: "DevOps and cloud technologies being developed",
  },
];

const record = [
  {
    span: "2026 — Present",
    role: "Jr. System Administrator & Lab Demonstrator",
    org: "Lyceum International Schools",
    status: "active",
  },
  {
    span: "2023 — 2024",
    role: "Software Developer Intern",
    org: "Bank of Ceylon",
    status: "resolved",
  },
];

const revealEase = [0.16, 1, 0.3, 1];

function About() {
  const targetRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.9", "end 0.2"],
  });

  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.18],
    [0, 1]
  );

  const headlineY = useTransform(
    scrollYProgress,
    [0, 0.18],
    [prefersReducedMotion ? 0 : 28, 0]
  );

  const bodyOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.3],
    [0, 1]
  );

  const bodyY = useTransform(
    scrollYProgress,
    [0.08, 0.3],
    [prefersReducedMotion ? 0 : 22, 0]
  );

  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    [
      prefersReducedMotion ? 0 : 14,
      prefersReducedMotion ? 0 : -14,
    ]
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

  const smoothBodyY = useSpring(bodyY, {
    damping: 26,
    stiffness: 150,
  });

  const smoothPhotoY = useSpring(photoY, {
    damping: 30,
    stiffness: 120,
  });

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
            initial={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.75,
              ease: revealEase,
            }}
          >
            <motion.div
              className="about-photo-stage"
              style={{ y: smoothPhotoY }}
            >
              <span
                className="about-photo-ring"
                aria-hidden="true"
              />

              <span
                className="about-photo-arch"
                aria-hidden="true"
              />

              <span
                className="about-photo-grid"
                aria-hidden="true"
              />

              <div className="about-photo-frame">
                <img
                  src={profilePhoto}
                  alt="Portrait of Gihan Jeewantha"
                  className="about-photo"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div
                className="about-photo-badge"
                aria-label="Software engineer with DevOps and cloud-native focus"
              >
                <span
                  className="about-photo-badge-dot"
                  aria-hidden="true"
                />
                Software Engineer · DevOps & Cloud
              </div>
            </motion.div>
          </motion.div>

          {/* Copy */}
          <div className="about-intro-text">
            <div className="about-eyebrow-row">
              <span className="about-eyebrow">
                Who I am
              </span>

              <div
                className="dot-grid dot-grid--red"
                aria-hidden="true"
              >
                {Array.from(
                  { length: 24 },
                  (_, index) => (
                    <span key={index} />
                  )
                )}
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
              Built for reliable
              <br />
              <span className="about-headline-accent">
                systems in production.
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
                My experience as a Software Developer Intern
                at Bank of Ceylon and as a Jr. System
                Administrator and Lab Demonstrator at Lyceum
                International Schools has given me a strong
                foundation in software development,
                infrastructure, and enterprise IT operations.
                I use that foundation to build reliable
                applications and develop the systems that
                support them.
              </p>

              <p className="about-text">
                I believe production-ready software requires
                more than a working interface. It needs clean
                code, meaningful tests, containerized
                environments, automated delivery, monitoring,
                and infrastructure that teams can operate with
                confidence.
              </p>

              <p className="about-text">
                My current focus is a structured transition
                into DevOps and cloud engineering. I am
                developing hands-on skills in Linux,
                networking, Bash, Python, Docker, Kubernetes,
                Helm, Istio, Terraform, AWS, and CI/CD
                automation while building on my full-stack
                development and infrastructure experience.
              </p>

              <p className="about-text">
                I am currently seeking opportunities as a
                Software Engineer, DevOps Engineer, Cloud
                Engineer, or Platform Engineer where I can
                combine application development with
                infrastructure automation to build reliable,
                scalable, and maintainable systems.
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

function StatCard({
  stat,
  index,
  progress,
  prefersReducedMotion,
}) {
  const start = 0.27 + index * 0.045;
  const end = start + 0.16;

  const opacity = useTransform(
    progress,
    [start, end],
    [0, 1]
  );

  const y = useTransform(
    progress,
    [start, end],
    [prefersReducedMotion ? 0 : 22, 0]
  );

  const smoothOpacity = useSpring(opacity, {
    damping: 28,
    stiffness: 150,
  });

  const smoothY = useSpring(y, {
    damping: 28,
    stiffness: 150,
  });

  return (
    <motion.article
      className={`about-stat-card ${
        stat.accent ? "about-stat-card--accent" : ""
      }`}
      style={{
        opacity: smoothOpacity,
        y: smoothY,
      }}
      data-cursor="hover"
    >
      <div className="about-stat-top">
        <span className="about-stat-index">
          0{index + 1}
        </span>

        {stat.accent && (
          <span className="about-stat-mark">+</span>
        )}
      </div>

      <div className="about-stat-value">
        {stat.value}
        <span className="about-stat-suffix">
          {stat.suffix}
        </span>
      </div>

      <div className="about-stat-label">{stat.label}</div>
    </motion.article>
  );
}

function RecordRow({
  item,
  index,
  progress,
  prefersReducedMotion,
}) {
  const start = 0.48 + index * 0.09;
  const end = start + 0.17;

  const opacity = useTransform(
    progress,
    [start, end],
    [0, 1]
  );

  const x = useTransform(
    progress,
    [start, end],
    [prefersReducedMotion ? 0 : -18, 0]
  );

  const smoothOpacity = useSpring(opacity, {
    damping: 28,
    stiffness: 140,
  });

  const smoothX = useSpring(x, {
    damping: 28,
    stiffness: 140,
  });

  return (
    <motion.article
      className={`about-record-row ${
        item.status === "active"
          ? "about-record-row--active"
          : ""
      }`}
      style={{
        opacity: smoothOpacity,
        x: smoothX,
      }}
      data-cursor="hover"
      data-cursor-label={
        item.status === "active" ? "Now" : undefined
      }
    >
      <div
        className="about-record-edge"
        aria-hidden="true"
      />

      <div className="about-record-marker">
        <span />
      </div>

      <div className="about-record-main">
        <div className="about-record-top">
          <span className="about-record-span">
            {item.span}
          </span>

          {item.status === "active" && (
            <span className="about-record-live">
              Current
            </span>
          )}
        </div>

        <h3 className="about-record-role">
          {item.role}
        </h3>

        <p className="about-record-org">{item.org}</p>
      </div>

      <div
        className="about-record-arrow"
        aria-hidden="true"
      >
        ↗
      </div>
    </motion.article>
  );
}

export default About;