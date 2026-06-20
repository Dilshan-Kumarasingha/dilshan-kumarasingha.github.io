import { motion, useReducedMotion } from 'framer-motion'
import '../styles/Skills.css'

const skillGroups = [
  {
    category: 'Backend',
    skills: [
      { name: 'Java', level: 75 },
      { name: 'Spring Boot', level: 60 },
      { name: 'C#', level: 68 },
      { name: 'ASP.NET Core', level: 65 },
      { name: 'Python', level: 68 },
      { name: 'Django REST', level: 55 },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React 18', level: 75 },
      { name: 'TypeScript', level: 70 },
      { name: 'JavaScript', level: 75 },
      { name: 'Tailwind CSS', level: 60 },
      { name: 'Framer Motion', level: 62 },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 75 },
      { name: 'SQL Server', level: 62 },
      { name: 'MySQL', level: 68 },
    ],
  },
  {
    category: 'QA & Testing',
    skills: [
      { name: 'Selenium WebDriver', level: 62 },
      { name: 'TestNG', level: 65 },
      { name: 'NUnit', level: 60 },
      { name: 'RestAssured', level: 62 },
      { name: 'Allure Reports', level: 60 },
    ],
  },
  {
    category: 'DevOps & Cloud',
    skills: [
      { name: 'Docker', level: 60 },
      { name: 'GitHub Actions', level: 75 },
      { name: 'AWS', level: 68 },
      { name: 'Kubernetes', level: 55 },
      { name: 'Istio', level: 45 },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', level: 80 },
      { name: 'Postman', level: 75 },
      { name: 'IntelliJ IDEA', level: 78 },
      { name: 'VS Code', level: 82 },
      { name: 'Visual Studio', level: 65 },
    ],
  },
]

// Maps a 0-100 level to a fill color along a dim -> bright accent ramp.
// Lower levels sit closer to a muted slate-green, higher levels resolve
// to the full saturated accent with a brighter glow.
function levelColor(level) {
  const t = Math.max(0, Math.min(100, level)) / 100
  // Interpolate lightness and saturation along the same hue family
  // so it reads as "the same green, more confident" rather than a
  // traffic-light red/amber/green judgment.
  const lightness = 38 + t * 30 // 38% -> 68%
  const saturation = 35 + t * 45 // 35% -> 80%
  return `hsl(146, ${saturation}%, ${lightness}%)`
}

function SkillBar({ skill, index, prefersReducedMotion }) {
  const color = levelColor(skill.level)

  return (
    <div className="skill-bar-row">
      <div className="skill-bar-label-row">
        <span className="skill-bar-name">{skill.name}</span>
        <span className="skill-bar-pct" style={{ color }}>
          {skill.level}%
        </span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          style={{
            background: color,
            boxShadow: `0 0 10px ${color}`,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 0.9,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }
          }
        />
      </div>
    </div>
  )
}

function Skills() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="skills" id="skills">
      <div className="skills-inner">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-eyebrow">
            <span className="eyebrow-bracket">{'//'}</span> Capabilities
          </span>
          <h2 className="section-title">
            What I <span className="title-accent">work with</span>
          </h2>
          <p className="section-sub">
            Proven across banking systems, real-time platforms, and full QA
            automation pipelines. Bars reflect my own working proficiency,
            not a certification score.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              className="skill-group"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: i * 0.05,
              }}
            >
              <div className="skill-category-row">
                <h3 className="skill-category">{group.category}</h3>
                <span className="skill-count">[{group.skills.length}]</span>
              </div>
              <div className="skill-bars">
                {group.skills.map((skill, idx) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={idx}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills