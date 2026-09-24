import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { Server, LayoutPanelTop, Database, ShieldCheck, Wrench } from "lucide-react";
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

const CATEGORY_META = {
  Backend: { Icon: Server, accent: "#e5484d", description: "Application logic, APIs and server-side systems." },
  Frontend: { Icon: LayoutPanelTop, accent: "#3178C6", description: "Interfaces, interactions and client-side experiences." },
  Databases: { Icon: Database, accent: "#4169E1", description: "Relational data storage and persistence." },
  "QA & Testing": { Icon: ShieldCheck, accent: "#43B02A", description: "Automation, validation and software quality." },
  "DevOps & Tools": { Icon: Wrench, accent: "#F05032", description: "Development workflow, delivery and engineering tools." },
};

const CATEGORIES = Object.keys(CATEGORY_META);

// Radius (as % of the stage box) at which items orbit the hub.
// Fewer items sit slightly closer in so the ring doesn't look sparse.
function radiusFor(count) {
  if (count <= 3) return 34;
  if (count <= 5) return 37;
  return 40;
}

function polarPosition(index, total, radius) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // start at top, go clockwise
  const angleDeg = (angle * 180) / Math.PI;
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);
  return { left: `${x}%`, top: `${y}%`, angleDeg };
}

function ConnectorLine({ angleDeg, radius, index, reduceMotion }) {
  return (
    <motion.div
      className="radial-line"
      style={{ width: `${radius}%`, transform: `rotate(${angleDeg}deg)` }}
      initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      exit={reduceMotion ? undefined : { scaleX: 0, opacity: 0, transition: { duration: 0.12 } }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.35, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] }
      }
    />
  );
}

function RadialItem({ skill, index, total, radius, reduceMotion }) {
  const Icon = skill.Icon;
  const pos = polarPosition(index, total, radius);
  const floatDelay = index * 0.15;

  return (
    <motion.div
      className="radial-item"
      style={{ left: pos.left, top: pos.top, '--brand': skill.color }}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.2, x: "-50%", y: "-50%" }}
      animate={
        reduceMotion
          ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" }
          : {
              opacity: 1,
              scale: 1,
              x: "-50%",
              y: ["-50%", "-58%", "-50%"],
            }
      }
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.2, transition: { duration: 0.15 } }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              scale: { type: "spring", stiffness: 340, damping: 20, delay: index * 0.045 },
              opacity: { duration: 0.25, delay: index * 0.045 },
              x: { type: "spring", stiffness: 340, damping: 20, delay: index * 0.045 },
              y: {
                duration: 2.4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: index * 0.045 + 0.4 + floatDelay,
              },
            }
      }
      whileHover={reduceMotion ? undefined : { scale: 1.12, transition: { duration: 0.2 } }}
      data-cursor="hover"
    >
      <div className="radial-item__icon">
        <Icon />
      </div>
      <span className="radial-item__label">{skill.name}</span>
      <span className={`radial-item__tier radial-item__tier--${skill.tier.toLowerCase()}`}>
        {skill.tier}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Backend");
  const reduceMotion = useReducedMotion();

  const activeSkills = useMemo(
    () => SKILLS.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  const meta = CATEGORY_META[activeCategory];
  const HubIcon = meta.Icon;
  const radius = radiusFor(activeSkills.length);

  return (
    <section className="skills-section" id="skills">
      <div className="dot-grid dot-grid--red skills-section__dots" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => <span key={i} />)}
      </div>

      <div className="skills-section__container">
        <motion.header
          className="skills-header"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <span className="skills-eyebrow">technical skills</span>
          <h2>
            Built with
            <span> precision.</span>
          </h2>
          <p>
            Pick a system to load its stack — the related tools cycle into
            view around the hub, like an inventory select.
          </p>
        </motion.header>

        {/* ---------- Category dial — the "weapon wheel" selector ---------- */}
        <motion.div
          className="category-dial"
          role="tablist"
          aria-label="Skill categories"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
          }}
        >
          {CATEGORIES.map((category) => {
            const CatIcon = CATEGORY_META[category].Icon;
            const isActive = category === activeCategory;
            return (
              <motion.button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`category-dial__btn ${isActive ? "is-active" : ""}`}
                style={{ '--accent': CATEGORY_META[category].accent }}
                onClick={() => setActiveCategory(category)}
                data-cursor="hover"
                variants={{
                  hidden: { opacity: 0, y: 14, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.94 }}
              >
                <motion.span
                  className="category-dial__icon"
                  animate={isActive && !reduceMotion ? { rotate: [0, -12, 0] } : { rotate: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <CatIcon size={18} strokeWidth={2} />
                </motion.span>
                <span className="category-dial__label">{category}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ---------- Radial stage — hub + orbiting tool icons ---------- */}
        <div className="radial-stage">
          <div className="radial-rings" aria-hidden="true">
            <span className="radial-ring radial-ring--outer" />
            <span className="radial-ring radial-ring--inner" />
            <span className="radial-ring radial-ring--sweep" style={{ '--accent': meta.accent }} />
          </div>

          <AnimatePresence mode="popLayout">
            {activeSkills.map((skill, index) => {
              const { angleDeg } = polarPosition(index, activeSkills.length, radius);
              return (
                <ConnectorLine
                  key={`line-${activeCategory}-${skill.name}`}
                  angleDeg={angleDeg}
                  radius={radius}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              );
            })}
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCategory}
              className="radial-hub"
              style={{ '--accent': meta.accent }}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.6, rotate: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <span className="radial-hub__pulse" aria-hidden="true" />
              <HubIcon size={30} strokeWidth={1.8} />
              <span className="radial-hub__label">{activeCategory}</span>
              <span className="radial-hub__count">{activeSkills.length} tools</span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            {activeSkills.map((skill, index) => (
              <RadialItem
                key={`${activeCategory}-${skill.name}`}
                skill={skill}
                index={index}
                total={activeSkills.length}
                radius={radius}
                reduceMotion={reduceMotion}
              />
            ))}
          </AnimatePresence>
        </div>

        <p className="radial-caption">{meta.description}</p>
      </div>
    </section>
  );
}