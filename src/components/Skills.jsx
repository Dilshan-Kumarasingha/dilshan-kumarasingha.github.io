import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";


import {
  Code2,
  Cloud,
  Container,
  GitBranch,
  Activity,
} from "lucide-react";


import {
  SiDotnet,
  SiPython,
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithubactions,
  SiDocker,
  SiTerraform,
  SiLinux,
  SiKubernetes,
  SiPrometheus,
  SiGrafana,
} from "react-icons/si";


import { DiJava, DiCss3, DiMsqlServer } from "react-icons/di";


import {
  TbBrandCSharp,
  TbBrandAws,
  TbApi,
} from "react-icons/tb";


import "../styles/Skills.css";


const SKILLS = [
  // Cloud & Infrastructure (moved to top - your core focus)
  {
    name: "Linux",
    category: "Cloud & Infrastructure",
    tier: "Core",
    Icon: SiLinux,
    color: "#FCC624",
  },
  {
    name: "Bash",
    category: "Cloud & Infrastructure",
    tier: "Core",
    Icon: SiLinux,
    color: "#4EAA25",
  },
  {
    name: "Python Automation",
    category: "Cloud & Infrastructure",
    tier: "Working",
    Icon: SiPython,
    color: "#3776AB",
  },
  {
    name: "YAML",
    category: "Cloud & Infrastructure",
    tier: "Core",
    Icon: GitBranch,
    color: "#CB171E",
  },
  {
    name: "AWS",
    category: "Cloud & Infrastructure",
    tier: "Working",
    Icon: TbBrandAws,
    color: "#FF9900",
  },
  {
    name: "Terraform",
    category: "Cloud & Infrastructure",
    tier: "Working",
    Icon: SiTerraform,
    color: "#7B42BC",
  },
  {
    name: "Networking",
    category: "Cloud & Infrastructure",
    tier: "Working",
    Icon: Cloud,
    color: "#2563EB",
  },

  // Containers & Kubernetes (your differentiator)
  {
    name: "Docker",
    category: "Containers & Kubernetes",
    tier: "Core",
    Icon: SiDocker,
    color: "#2496ED",
  },
  {
    name: "Kubernetes",
    category: "Containers & Kubernetes",
    tier: "Working",
    Icon: SiKubernetes,
    color: "#326CE5",
  },
  {
    name: "Helm",
    category: "Containers & Kubernetes",
    tier: "Working",
    Icon: Container,
    color: "#0F1689",
  },
  {
    name: "Istio",
    category: "Containers & Kubernetes",
    tier: "Learning",
    Icon: Container,
    color: "#466BB0",
  },
  {
    name: "Ingress",
    category: "Containers & Kubernetes",
    tier: "Working",
    Icon: Container,
    color: "#F59E0B",
  },

  // CI/CD & GitOps (critical DevOps skill)
  {
    name: "Git",
    category: "CI/CD & GitOps",
    tier: "Core",
    Icon: SiGit,
    color: "#F05032",
  },
  {
    name: "GitHub Actions",
    category: "CI/CD & GitOps",
    tier: "Working",
    Icon: SiGithubactions,
    color: "#2088FF",
  },
  {
    name: "CI/CD",
    category: "CI/CD & GitOps",
    tier: "Core",
    Icon: GitBranch,
    color: "#E5484D",
  },
  {
    name: "Argo CD",
    category: "CI/CD & GitOps",
    tier: "Working",
    Icon: GitBranch,
    color: "#EF7B4D",
  },
  {
    name: "GitOps",
    category: "CI/CD & GitOps",
    tier: "Working",
    Icon: GitBranch,
    color: "#22C55E",
  },

  // Observability & SRE (production reliability)
  {
    name: "Prometheus",
    category: "Observability & SRE",
    tier: "Working",
    Icon: SiPrometheus,
    color: "#E6522C",
  },
  {
    name: "Grafana",
    category: "Observability & SRE",
    tier: "Working",
    Icon: SiGrafana,
    color: "#F46800",
  },
  {
    name: "Logging",
    category: "Observability & SRE",
    tier: "Working",
    Icon: Activity,
    color: "#0EA5E9",
  },
  {
    name: "Alerting",
    category: "Observability & SRE",
    tier: "Working",
    Icon: Activity,
    color: "#EF4444",
  },

  // Software Engineering (supporting skill - moved last)
  {
    name: "C#",
    category: "Software Engineering",
    tier: "Working",
    Icon: TbBrandCSharp,
    color: "#9B4F96",
  },
  {
    name: ".NET",
    category: "Software Engineering",
    tier: "Working",
    Icon: SiDotnet,
    color: "#512BD4",
  },
  {
    name: "Python",
    category: "Software Engineering",
    tier: "Core",
    Icon: SiPython,
    color: "#3776AB",
  },
  {
    name: "Java",
    category: "Software Engineering",
    tier: "Learning",
    Icon: DiJava,
    color: "#f89820",
  },
  {
    name: "REST APIs",
    category: "Software Engineering",
    tier: "Working",
    Icon: TbApi,
    color: "#e5484d",
  },
  {
    name: "React",
    category: "Software Engineering",
    tier: "Working",
    Icon: SiReact,
    color: "#61DAFB",
  },
  {
    name: "JavaScript",
    category: "Software Engineering",
    tier: "Working",
    Icon: SiJavascript,
    color: "#F7DF1E",
  },
  {
    name: "TypeScript",
    category: "Software Engineering",
    tier: "Learning",
    Icon: SiTypescript,
    color: "#3178C6",
  },
  {
    name: "HTML",
    category: "Software Engineering",
    tier: "Working",
    Icon: SiHtml5,
    color: "#E34F26",
  },
  {
    name: "CSS",
    category: "Software Engineering",
    tier: "Working",
    Icon: DiCss3,
    color: "#1572B6",
  },
  {
    name: "Tailwind CSS",
    category: "Software Engineering",
    tier: "Learning",
    Icon: SiTailwindcss,
    color: "#06B6D4",
  },
  {
    name: "PostgreSQL",
    category: "Software Engineering",
    tier: "Working",
    Icon: SiPostgresql,
    color: "#4169E1",
  },
  {
    name: "MySQL",
    category: "Software Engineering",
    tier: "Working",
    Icon: SiMysql,
    color: "#4479A1",
  },
  {
    name: "SQL Server",
    category: "Software Engineering",
    tier: "Working",
    Icon: DiMsqlServer,
    color: "#CC2927",
  },
];


const CATEGORY_META = {
  "Cloud & Infrastructure": {
    Icon: Cloud,
    accent: "#FF9900",
    description:
      "Linux administration, cloud platforms, networking, scripting, and infrastructure-as-code with Terraform.",
  },
  "Containers & Kubernetes": {
    Icon: Container,
    accent: "#2496ED",
    description:
      "Containerized applications, Kubernetes orchestration, Helm package management, and service mesh with Istio.",
  },
  "CI/CD & GitOps": {
    Icon: GitBranch,
    accent: "#2088FF",
    description:
      "Version control, automated delivery pipelines, GitOps workflows with Argo CD, and deployment automation.",
  },
  "Observability & SRE": {
    Icon: Activity,
    accent: "#E6522C",
    description:
      "Metrics collection, dashboards, centralized logging, and alerting for production system reliability.",
  },
  "Software Engineering": {
    Icon: Code2,
    accent: "#3178C6",
    description:
      "Full-stack development with C#, .NET, Python, React, and relational databases for building production applications.",
  },
};


const CATEGORIES = Object.keys(CATEGORY_META);


function radiusFor(count) {
  if (count <= 3) return 34;
  if (count <= 5) return 37;
  return 40;
}


function polarPosition(index, total, radius) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const angleDeg = (angle * 180) / Math.PI;
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);


  return {
    left: `${x}%`,
    top: `${y}%`,
    angleDeg,
  };
}


function ConnectorLine({ angleDeg, radius, index, reduceMotion }) {
  return (
    <motion.div
      className="radial-line"
      style={{
        width: `${radius}%`,
        transform: `rotate(${angleDeg}deg)`,
      }}
      initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      exit={
        reduceMotion
          ? undefined
          : {
              scaleX: 0,
              opacity: 0,
              transition: { duration: 0.12 },
            }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 0.35,
              delay: index * 0.045,
              ease: [0.16, 1, 0.3, 1],
            }
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
      style={{
        left: pos.left,
        top: pos.top,
        "--brand": skill.color,
      }}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              scale: 0.2,
              x: "-50%",
              y: "-50%",
            }
      }
      animate={
        reduceMotion
          ? {
              opacity: 1,
              scale: 1,
              x: "-50%",
              y: "-50%",
            }
          : {
              opacity: 1,
              scale: 1,
              x: "-50%",
              y: ["-50%", "-58%", "-50%"],
            }
      }
      exit={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              scale: 0.2,
              transition: { duration: 0.15 },
            }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              scale: {
                type: "spring",
                stiffness: 340,
                damping: 20,
                delay: index * 0.045,
              },
              opacity: {
                duration: 0.25,
                delay: index * 0.045,
              },
              x: {
                type: "spring",
                stiffness: 340,
                damping: 20,
                delay: index * 0.045,
              },
              y: {
                duration: 2.4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: index * 0.045 + 0.4 + floatDelay,
              },
            }
      }
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.12,
              transition: { duration: 0.2 },
            }
      }
      data-cursor="hover"
    >
      <div className="radial-item__icon">
        <Icon />
      </div>


      <span className="radial-item__label">{skill.name}</span>


      <span
        className={`radial-item__tier radial-item__tier--${skill.tier.toLowerCase()}`}
      >
        {skill.tier}
      </span>
    </motion.div>
  );
}


export default function Skills() {
  const [activeCategory, setActiveCategory] =
    useState("Cloud & Infrastructure");
  const reduceMotion = useReducedMotion();


  const activeSkills = useMemo(
    () =>
      SKILLS.filter(
        (skill) => skill.category === activeCategory
      ),
    [activeCategory]
  );


  const meta = CATEGORY_META[activeCategory];
  const HubIcon = meta.Icon;
  const radius = radiusFor(activeSkills.length);


  return (
    <section className="skills-section" id="skills">
      <div
        className="dot-grid dot-grid--red skills-section__dots"
        aria-hidden="true"
      >
        {Array.from({ length: 24 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>


      <div className="skills-section__container">
        <motion.header
          className="skills-header"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <span className="skills-eyebrow">
            technical skills
          </span>


          <h2>
            Built with
            <span> precision.</span>
          </h2>


          <p>
            A DevOps-first stack across cloud infrastructure, Kubernetes,
            automation, CI/CD, observability, and production reliability.
          </p>
        </motion.header>


        {/* Category selector */}
        <motion.div
          className="category-dial"
          role="tablist"
          aria-label="Skill categories"
          initial={reduceMotion ? false : "hidden"}
          whileInView={
            reduceMotion ? undefined : "visible"
          }
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {CATEGORIES.map((category) => {
            const CategoryIcon =
              CATEGORY_META[category].Icon;
            const isActive = category === activeCategory;


            return (
              <motion.button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`category-dial__btn ${
                  isActive ? "is-active" : ""
                }`}
                style={{
                  "--accent": CATEGORY_META[category].accent,
                }}
                onClick={() => setActiveCategory(category)}
                data-cursor="hover"
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 14,
                    scale: 0.9,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  },
                }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 22,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -2,
                      }
                }
                whileTap={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 0.94,
                      }
                }
              >
                <motion.span
                  className="category-dial__icon"
                  animate={
                    isActive && !reduceMotion
                      ? {
                          rotate: [0, -12, 0],
                        }
                      : {
                          rotate: 0,
                        }
                  }
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                >
                  <CategoryIcon size={18} strokeWidth={2} />
                </motion.span>


                <span className="category-dial__label">
                  {category}
                </span>
              </motion.button>
            );
          })}
        </motion.div>


        {/* Radial skill stage */}
        <div className="radial-stage">
          <div className="radial-rings" aria-hidden="true">
            <span className="radial-ring radial-ring--outer" />
            <span className="radial-ring radial-ring--inner" />
            <span
              className="radial-ring radial-ring--sweep"
              style={{ "--accent": meta.accent }}
            />
          </div>


          <AnimatePresence mode="popLayout">
            {activeSkills.map((skill, index) => {
              const { angleDeg } = polarPosition(
                index,
                activeSkills.length,
                radius
              );


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
              style={{ "--accent": meta.accent }}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.6,
                      rotate: -30,
                      x: "-50%",
                      y: "-50%",
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                x: "-50%",
                y: "-50%",
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      scale: 0.6,
                      rotate: 30,
                      x: "-50%",
                      y: "-50%",
                    }
              }
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 22,
              }}
            >
              <span
                className="radial-hub__pulse"
                aria-hidden="true"
              />


              <HubIcon size={30} strokeWidth={1.8} />


              <span className="radial-hub__label">
                {activeCategory}
              </span>


              <span className="radial-hub__count">
                {activeSkills.length} tools
              </span>
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