
import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import "../styles/Skills.css";

const SKILLS = [
  // Backend
  {
    name: "C#",
    category: "Backend",
    tier: "Core",
    mark: "C#",
  },
  {
    name: ".NET",
    category: "Backend",
    tier: "Core",
    mark: ".NET",
  },
  {
    name: "Java",
    category: "Backend",
    tier: "Core",
    mark: "JAVA",
  },
  {
    name: "Spring Boot",
    category: "Backend",
    tier: "Working",
    mark: "SB",
  },
  {
    name: "Python",
    category: "Backend",
    tier: "Working",
    mark: "PY",
  },
  {
    name: "Django",
    category: "Backend",
    tier: "Familiar",
    mark: "DJ",
  },
  {
    name: "REST APIs",
    category: "Backend",
    tier: "Core",
    mark: "API",
  },

  // Frontend
  {
    name: "React",
    category: "Frontend",
    tier: "Core",
    mark: "RE",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    tier: "Core",
    mark: "JS",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    tier: "Working",
    mark: "TS",
  },
  {
    name: "HTML",
    category: "Frontend",
    tier: "Core",
    mark: "HTML",
  },
  {
    name: "CSS",
    category: "Frontend",
    tier: "Core",
    mark: "CSS",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    tier: "Working",
    mark: "TW",
  },
  {
    name: "Framer Motion",
    category: "Frontend",
    tier: "Working",
    mark: "FM",
  },

  // Databases
  {
    name: "PostgreSQL",
    category: "Databases",
    tier: "Working",
    mark: "PG",
  },
  {
    name: "MySQL",
    category: "Databases",
    tier: "Working",
    mark: "SQL",
  },
  {
    name: "SQL Server",
    category: "Databases",
    tier: "Working",
    mark: "MS",
  },

  // QA & Testing
  {
    name: "Selenium",
    category: "QA & Testing",
    tier: "Core",
    mark: "SE",
  },
  {
    name: "NUnit",
    category: "QA & Testing",
    tier: "Working",
    mark: "NU",
  },
  {
    name: "TestNG",
    category: "QA & Testing",
    tier: "Working",
    mark: "TN",
  },
  {
    name: "Rest Assured",
    category: "QA & Testing",
    tier: "Working",
    mark: "RA",
  },
  {
    name: "Postman",
    category: "QA & Testing",
    tier: "Core",
    mark: "PM",
  },
  {
    name: "API Testing",
    category: "QA & Testing",
    tier: "Core",
    mark: "API",
  },
  {
    name: "UI Automation",
    category: "QA & Testing",
    tier: "Core",
    mark: "UI",
  },

  // DevOps & Tools
  {
    name: "Git",
    category: "DevOps & Tools",
    tier: "Core",
    mark: "GIT",
  },
  {
    name: "GitHub Actions",
    category: "DevOps & Tools",
    tier: "Working",
    mark: "CI",
  },
  {
    name: "Docker",
    category: "DevOps & Tools",
    tier: "Working",
    mark: "DK",
  },
  {
    name: "Visual Studio",
    category: "DevOps & Tools",
    tier: "Core",
    mark: "VS",
  },
  {
    name: "VS Code",
    category: "DevOps & Tools",
    tier: "Core",
    mark: "VS",
  },
  {
    name: "IntelliJ IDEA",
    category: "DevOps & Tools",
    tier: "Working",
    mark: "IJ",
  },
];

const CATEGORIES = [
  "All",
  "Backend",
  "Frontend",
  "Databases",
  "QA & Testing",
  "DevOps & Tools",
];

const CATEGORY_META = {
  Backend: {
    number: "01",
    description:
      "Application logic, APIs and server-side systems.",
  },
  Frontend: {
    number: "02",
    description:
      "Interfaces, interactions and client-side experiences.",
  },
  Databases: {
    number: "03",
    description:
      "Relational data storage and persistence.",
  },
  "QA & Testing": {
    number: "04",
    description:
      "Automation, validation and software quality.",
  },
  "DevOps & Tools": {
    number: "05",
    description:
      "Development workflow, delivery and engineering tools.",
  },
};

function TechnologyMark({ mark }) {
  return (
    <span className="technology-mark" aria-hidden="true">
      {mark}
    </span>
  );
}

function TechnologyCard({ skill, index }) {
  return (
    <motion.article
      className={`technology-card technology-card--${skill.tier.toLowerCase()}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.035, 0.18),
      }}
    >
      <span
        className="technology-card__signal"
        aria-hidden="true"
      />

      <div className="technology-card__icon">
        <TechnologyMark mark={skill.mark} />
      </div>

      <div className="technology-card__content">
        <span className="technology-card__category">
          {skill.category}
        </span>

        <h3>{skill.name}</h3>

        <span className="technology-card__tier">
          {skill.tier}
        </span>
      </div>
    </motion.article>
  );
}

function SkillCategory({ category, skills }) {
  const meta = CATEGORY_META[category];

  return (
    <motion.section
      className="skill-category"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="skill-category__header">
        <div className="skill-category__index">
          {meta.number}
        </div>

        <div>
          <p className="skill-category__eyebrow">
            SYSTEM / {meta.number}
          </p>

          <h3>{category}</h3>

          <p className="skill-category__description">
            {meta.description}
          </p>
        </div>
      </div>

      <div className="technology-grid">
        {skills.map((skill, index) => (
          <TechnologyCard
            key={skill.name}
            skill={skill}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const shouldReduceMotion = useReducedMotion();

  const visibleSkills = useMemo(() => {
    if (activeCategory === "All") {
      return SKILLS;
    }

    return SKILLS.filter(
      (skill) => skill.category === activeCategory
    );
  }, [activeCategory]);

  const groupedSkills = useMemo(() => {
    return visibleSkills.reduce((groups, skill) => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }

      groups[skill.category].push(skill);

      return groups;
    }, {});
  }, [visibleSkills]);

  const visibleCategories =
    activeCategory === "All"
      ? Object.keys(CATEGORY_META)
      : [activeCategory];

  return (
    <section className="skills-section" id="skills">
      <div
        className="skills-section__grid"
        aria-hidden="true"
      />

      <div className="skills-section__container">
        <motion.header
          className="skills-header"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 24 }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <div className="skills-header__eyebrow">
            <span className="skills-header__line" />
            <span>04 / TECHNOLOGY STACK</span>
          </div>

          <h2>
            Built with
            <span> precision.</span>
          </h2>

          <p>
            A practical technology stack spanning backend
            engineering, modern interfaces, databases,
            automated testing and development tooling.
          </p>
        </motion.header>

        <nav
          className="skills-filters"
          aria-label="Filter technologies by category"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? "skills-filter is-active"
                  : "skills-filter"
              }
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              <span>{category}</span>

              {activeCategory === category && (
                <span
                  className="skills-filter__dot"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="skills-categories">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0 }
              }
              animate={{ opacity: 1 }}
              exit={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 0 }
              }
              transition={{ duration: 0.25 }}
            >
              {visibleCategories.map((category) => (
                <SkillCategory
                  key={category}
                  category={category}
                  skills={groupedSkills[category] || []}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

