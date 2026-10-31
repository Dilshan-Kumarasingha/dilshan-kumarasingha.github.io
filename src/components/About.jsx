import { motion, useReducedMotion } from "framer-motion";
import profilePhoto from "../assets/Profile1.jpeg";
import "../styles/About.css";
// AboutExperience.css is no longer needed. This file and About.css are self-contained.

// Keep titles, dates and skills the same as LinkedIn, GitHub and my CV.
// A tool moves from "learning" to "hands-on" only when a repo proves it.

const stats = [
  {
    value: 5,
    kind: "Hands-on",
    title: "DevOps tools",
    detail: "Used across my projects.",
    chips: ["Docker", "GitHub Actions", "Git", "Linux", "Bash"],
  },
  {
    value: 3,
    kind: "Automated",
    title: "CI pipelines on GitHub",
    detail: "Builds and tests run on my pull requests and pushes.",
    chips: ["GitHub Actions", "Automated tests"],
    accent: true,
  },
  {
    value: 5,
    kind: "Learning",
    title: "Cloud tools in progress",
    detail: "Building projects to practise them.",
    chips: ["Kubernetes", "Terraform", "AWS", "Prometheus", "Grafana"],
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

// TODO: add one real number to each summary, e.g. users or labs supported,
// uptime %, number of regression checks. Numbers make these read as results.
const record = [
  {
    span: "2026 to Present",
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
    span: "Aug 2023 to Feb 2024",
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
  const reduce = useReducedMotion();

  // One simple reveal. Text is never tied to scroll progress, so it is
  // always readable, including when someone lands on #about directly.
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: reduce ? 0 : 0.6,
      delay: reduce ? 0 : delay,
      ease: revealEase,
    },
  });

  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-inner">
        <div className="about-intro">
          {/* photo */}
          <motion.div className="about-photo-column" {...reveal(0)}>
            <div className="about-photo-stage">
              <span className="about-photo-arch" aria-hidden="true" />
              <div className="about-photo-frame">
                <img
                  src={profilePhoto}
                  alt="Portrait of Dilshan Kumarasingha"
                  className="about-photo"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>

          {/* text */}
          <motion.div className="about-copy" {...reveal(0.1)}>
            <h2 id="about-title" className="about-headline" data-cursor="text">
              From writing code
              <br />
              <span className="about-headline-accent">
                to shipping it reliably.
              </span>
            </h2>

            <p className="about-lede">
              I'm a backend developer (C#/.NET, Java) moving into DevOps. I
              care about what comes after the code: safe releases, automation
              and knowing when something breaks.
            </p>

            <p className="about-text">
              At Bank of Ceylon I worked in a regulated banking environment
              where every change went through UAT, regression checks and
              sign-off before release. At Lyceum International Schools I
              deploy the IMS, manage the lab systems, monitor uptime and
              troubleshoot when something stops working.
            </p>

            <p className="about-text">
              My main project is HelpDeskHQ Platform, a .NET and React app that
              builds, tests and containerises on every pull request. I'm
              learning Kubernetes, Terraform, Prometheus, Grafana and AWS by
              building projects with them.
            </p>

            <p className="about-text about-text--cta">
              I'm open to junior Cloud, DevOps and Platform Engineer roles.{" "}
              <a href="#projects" className="about-link">
                See the projects
              </a>{" "}
              or{" "}
              <a href="#contact" className="about-link">
                get in touch
              </a>
              .
            </p>
          </motion.div>
        </div>

        {/* stats */}
        <section className="about-block" aria-labelledby="stats-title">
          <h3 id="stats-title" className="about-block-title">
            What I work with
          </h3>

          <div className="about-stats">
            {stats.map((stat) => (
              <StatCard key={stat.title} stat={stat} />
            ))}
          </div>
        </section>

        {/* experience */}
        <section className="about-block" aria-labelledby="experience-title">
          <h3 id="experience-title" className="about-block-title">
            Experience
          </h3>

          <ol className="about-timeline">
            {record.map((item) => (
              <ExperienceItem key={`${item.org}-${item.span}`} item={item} />
            ))}
          </ol>
        </section>
      </div>
    </section>
  );
}

function StatCard({ stat }) {
  const classes = [
    "about-stat",
    stat.accent ? "about-stat--accent" : "",
    stat.learning ? "about-stat--learning" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes}>
      <div className="about-stat-head">
        <span className="about-stat-value" aria-hidden="true">
          {stat.value}
        </span>
        <span className="about-stat-kind">{stat.kind}</span>
      </div>

      <h4 className="about-stat-title">
        <span className="about-sr-only">{stat.value} </span>
        {stat.title}
      </h4>
      <p className="about-stat-detail">{stat.detail}</p>

      <ul className="about-chips" aria-label="Tools">
        {stat.chips.map((chip) => (
          <li key={chip}>{chip}</li>
        ))}
      </ul>
    </article>
  );
}

function ExperienceItem({ item }) {
  const isActive = item.status === "active";

  return (
    <li className={`about-job ${isActive ? "about-job--active" : ""}`}>
      <div className="about-job-when">
        <span className="about-job-span">{item.span}</span>
        <span className="about-job-duration">{item.duration}</span>
      </div>

      <span className="about-job-node" aria-hidden="true" />

      <article className="about-job-card">
        <header className="about-job-head">
          <span className="about-job-mark" aria-hidden="true">
            {item.mark}
          </span>

          <div className="about-job-titles">
            <h4 className="about-job-role">{item.role}</h4>
            <p className="about-job-org">{item.org}</p>
          </div>

          {isActive && <span className="about-job-badge">Current</span>}
        </header>

        {item.summary && <p className="about-job-summary">{item.summary}</p>}

        {item.tags?.length > 0 && (
          <ul className="about-chips" aria-label="Skills used">
            {item.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </article>
    </li>
  );
}

export default About;