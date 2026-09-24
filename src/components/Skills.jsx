import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import {
  SiDotnet, SiSpringboot, SiPython, SiDjango, SiReact, SiJavascript,
  SiTypescript, SiHtml5, SiTailwindcss, SiFramer, SiPostgresql, SiMysql,
  SiSelenium, SiPostman, SiGit, SiGithubactions, SiDocker, SiIntellijidea,
} from "react-icons/si";
import { DiJava, DiCss3, DiMsqlServer, DiVisualstudio } from "react-icons/di";
import { TbBrandCSharp, TbBrandVscode, TbApi, TbFlaskFilled, TbRobot } from "react-icons/tb";

import "../styles/Skills.css";

const SKILLS = [
  // Backend
  { name: "C#", category: "Backend", tier: "Core", Icon: TbBrandCSharp, color: "#9B4F96" },
  { name: ".NET", category: "Backend", tier: "Core", Icon: SiDotnet, color: "#512BD4" },
  { name: "Java", category: "Backend", tier: "Core", Icon: DiJava, color: "#f89820" },
  { name: "Spring Boot", category: "Backend", tier: "Working", Icon: SiSpringboot, color: "#6DB33F" },
  { name: "Python", category: "Backend", tier: "Working", Icon: SiPython, color: "#3776AB" },
  { name: "Django", category: "Backend", tier: "Familiar", Icon: SiDjango, color: "#0C4B33" },
  { name: "REST APIs", category: "Backend", tier: "Core", Icon: TbApi, color: "#e5484d" },

  // Frontend
  { name: "React", category: "Frontend", tier: "Core", Icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", category: "Frontend", tier: "Core", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", category: "Frontend", tier: "Working", Icon: SiTypescript, color: "#3178C6" },
  { name: "HTML", category: "Frontend", tier: "Core", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", category: "Frontend", tier: "Core", Icon: DiCss3, color: "#1572B6" },
  { name: "Tailwind CSS", category: "Frontend", tier: "Working", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Framer Motion", category: "Frontend", tier: "Working", Icon: SiFramer, color: "#0055FF" },

  // Databases
  { name: "PostgreSQL", category: "Databases", tier: "Working", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", category: "Databases", tier: "Working", Icon: SiMysql, color: "#4479A1" },
  { name: "SQL Server", category: "Databases", tier: "Working", Icon: DiMsqlServer, color: "#CC2927" },

  // QA & Testing
  { name: "Selenium", category: "QA & Testing", tier: "Core", Icon: SiSelenium, color: "#43B02A" },
  { name: "NUnit", category: "QA & Testing", tier: "Working", Icon: TbFlaskFilled, color: "#7C3AED" },
  { name: "TestNG", category: "QA & Testing", tier: "Working", Icon: TbFlaskFilled, color: "#EF4444" },
  { name: "Rest Assured", category: "QA & Testing", tier: "Working", Icon: TbApi, color: "#e5484d" },
  { name: "Postman", category: "QA & Testing", tier: "Core", Icon: SiPostman, color: "#FF6C37" },
  { name: "API Testing", category: "QA & Testing", tier: "Core", Icon: TbApi, color: "#e5484d" },
  { name: "UI Automation", category: "QA & Testing", tier: "Core", Icon: TbRobot, color: "#0EA5E9" },

  // DevOps & Tools
  { name: "Git", category: "DevOps & Tools", tier: "Core", Icon: SiGit, color: "#F05032" },
  { name: "GitHub Actions", category: "DevOps & Tools", tier: "Working", Icon: SiGithubactions, color: "#2088FF" },
  { name: "Docker", category: "DevOps & Tools", tier: "Working", Icon: SiDocker, color: "#2496ED" },
  { name: "Visual Studio", category: "DevOps & Tools", tier: "Core", Icon: DiVisualstudio, color: "#5C2D91" },
  { name: "VS Code", category: "DevOps & Tools", tier: "Core", Icon: TbBrandVscode, color: "#007ACC" },
  { name: "IntelliJ IDEA", category: "DevOps & Tools", tier: "Working", Icon: SiIntellijidea, color: "#FE315D" },
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
  Backend: { number: "01", description: "Application logic, APIs and server-side systems." },
  Frontend: { number: "02", description: "Interfaces, interactions and client-side experiences." },
  Databases: { number: "03", description: "Relational data storage and persistence." },
  "QA & Testing": { number: "04", description: "Automation, validation and software quality." },
  "DevOps & Tools": { number: "05", description: "Development workflow, delivery and engineering tools." },
};

function TechnologyCard({ skill, index }) {
  const Icon = skill.Icon;
  return (
    <motion.article
      className={`technology-card technology-card--${skill.tier.toLowerCase()}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.035, 0.18) }}
      data-cursor="hover"
    >
      <div
        className="technology-card__icon"
        style={{ '--brand': skill.color }}
      >
        <Icon />
      </div>

      <div className="technology-card__content">
        <span className="technology-card__category">{skill.category}</span>
        <h3>{skill.name}</h3>
        <span className={`technology-card__tier technology-card__tier--${skill.tier.toLowerCase()}`}>
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
        <div className="skill-category__index">{meta.number}</div>

        <div>
          <p className="skill-category__eyebrow">SYSTEM / {meta.number}</p>
          <h3>{category}</h3>
          <p className="skill-category__description">{meta.description}</p>
        </div>
      </div>

      <div className="technology-grid">
        {skills.map((skill, index) => (
          <TechnologyCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </motion.section>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  const visibleSkills = useMemo(() => {
    if (activeCategory === "All") return SKILLS;
    return SKILLS.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  const groupedSkills = useMemo(() => {
    return visibleSkills.reduce((groups, skill) => {
      if (!groups[skill.category]) groups[skill.category] = [];
      groups[skill.category].push(skill);
      return groups;
    }, {});
  }, [visibleSkills]);

  const visibleCategories =
    activeCategory === "All" ? Object.keys(CATEGORY_META) : [activeCategory];

  return (
    <section className="skills-section" id="skills">
      <div className="dot-grid dot-grid--red skills-section__dots" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => <span key={i} />)}
      </div>

      <div className="skills-section__container">
        <motion.header
          className="skills-header"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <span className="skills-eyebrow">technical skills</span>

          <h2>
            Built with
            <span> precision.</span>
          </h2>

          <p>
            A practical technology stack spanning backend engineering, modern
            interfaces, databases, automated testing and development tooling.
          </p>
        </motion.header>

        <nav className="skills-filters" aria-label="Filter technologies by category">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={activeCategory === category ? "skills-filter is-active" : "skills-filter"}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              data-cursor="hover"
            >
              <span>{category}</span>
            </button>
          ))}
        </nav>

        <div className="skills-categories">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {visibleCategories.map((category) => (
                <SkillCategory key={category} category={category} skills={groupedSkills[category] || []} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
