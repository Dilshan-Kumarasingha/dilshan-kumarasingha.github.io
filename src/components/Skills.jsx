import { useState, useMemo } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import '../styles/Skills.css'

const RAW_SKILLS = {
  Backend: [
    { name: 'C#', level: 72 },
    { name: 'ASP.NET Core', level: 68 },
    { name: 'Java', level: 75 },
    { name: 'Spring Boot', level: 65 },
    { name: 'Python', level: 68 },
    { name: 'Django REST', level: 55 },
  ],
  Frontend: [
    { name: 'React 18', level: 75 },
    { name: 'TypeScript', level: 65 },
    { name: 'JavaScript', level: 75 },
    { name: 'Tailwind CSS', level: 60 },
    { name: 'Framer Motion', level: 62 },
  ],
  Databases: [
    { name: 'PostgreSQL', level: 75 },
    { name: 'SQL Server', level: 62 },
    { name: 'MySQL', level: 68 },
  ],
  'QA & Testing': [
    { name: 'Selenium WebDriver', level: 62 },
    { name: 'TestNG', level: 65 },
    { name: 'NUnit', level: 60 },
    { name: 'RestAssured', level: 62 },
    { name: 'Allure Reports', level: 60 },
  ],
  'Real-Time & Jobs': [
    { name: 'SignalR', level: 62 },
    { name: 'Hangfire', level: 60 },
  ],
  'DevOps & Tools': [
    { name: 'Git', level: 80 },
    { name: 'GitHub Actions', level: 75 },
    { name: 'Docker', level: 60 },
    { name: 'Postman', level: 75 },
    { name: 'IntelliJ IDEA', level: 78 },
    { name: 'VS Code', level: 82 },
    { name: 'Visual Studio', level: 65 },
  ],
}

const TIERS = {
  core: { label: 'Core', rank: 3, threshold: 70 },
  working: { label: 'Working', rank: 2, threshold: 55 },
  familiar: { label: 'Familiar', rank: 1, threshold: 0 },
}

function tierFor(level) {
  if (level >= TIERS.core.threshold) return 'core'
  if (level >= TIERS.working.threshold) return 'working'
  return 'familiar'
}

const SKILLS = Object.entries(RAW_SKILLS).flatMap(([category, list]) =>
  list.map((s) => ({ ...s, category, tier: tierFor(s.level) }))
)

const CATEGORIES = ['All', ...Object.keys(RAW_SKILLS)]

function groupAndSort(skills) {
  const byCategory = {}
  skills.forEach((s) => {
    if (!byCategory[s.category]) byCategory[s.category] = []
    byCategory[s.category].push(s)
  })
  Object.values(byCategory).forEach((list) =>
    list.sort((a, b) => TIERS[b.tier].rank - TIERS[a.tier].rank)
  )
  return byCategory
}

function SkillRow({ skill, index, prefersReducedMotion }) {
  return (
    <motion.div
      className="dash-skill-row"
      layout="position"
      initial={{ opacity: 0, clipPath: prefersReducedMotion ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
      exit={{ opacity: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: prefersReducedMotion ? 0 : index * 0.05,
      }}
    >
      <div className="dash-skill-row-top">
        <span className="dash-skill-name">{skill.name}</span>
        <span className={`dash-skill-pct dash-pct-tier-${skill.tier}`}>{skill.level}%</span>
      </div>
      <div className="dash-bar-track">
        <motion.div
          className={`dash-bar-fill dash-bar-tier-${skill.tier}`}
          initial={{ width: prefersReducedMotion ? `${skill.level}%` : '0%' }}
          animate={{ width: `${skill.level}%` }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: prefersReducedMotion ? 0 : 0.15 + index * 0.05,
          }}
        />
      </div>
    </motion.div>
  )
}

function CategoryBlock({ category, skills, prefersReducedMotion, isSolo }) {
  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 350, damping: 34 }}
      className={`dash-category-card ${isSolo ? 'dash-card-solo-focus' : ''}`}
    >
      <div className="dash-category-header">
        <h3 className="dash-category-title">{category}</h3>
        <span className="dash-category-count">{String(skills.length).padStart(2, '0')}</span>
      </div>
      <div className="dash-category-rows-container">
        <AnimatePresence mode="popLayout" initial={false}>
          {skills.map((skill, idx) => (
            <SkillRow
              key={skill.name}
              skill={skill}
              index={idx}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function Skills() {
  const prefersReducedMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState('All')

  const visibleSkills = useMemo(
    () =>
      activeCategory === 'All'
        ? SKILLS
        : SKILLS.filter((s) => s.category === activeCategory),
    [activeCategory]
  )

  const grouped = useMemo(() => groupAndSort(visibleSkills), [visibleSkills])
  const categoryOrder =
    activeCategory === 'All' ? Object.keys(RAW_SKILLS) : [activeCategory]

  const isSoloActive = activeCategory !== 'All'

  return (
    <section className="dash-skills-section" id="skills">
      <div className="dash-skills-container">
        <motion.div
          className="dash-skills-header-block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="dash-skills-eyebrow">
            <span className="dash-eyebrow-dot" />
            technical competencies
          </span>
          <h2 className="dash-skills-title">
            Engineered toolkit. <span className="dash-text-muted">Calibrated for scale.</span>
          </h2>
          <p className="dash-skills-subhead">
            Primary specialization centered around high-integrity enterprise ecosystems built with C# and ASP.NET Core, complemented by performant React client interfaces.
          </p>
        </motion.div>

        {/* Segmented filter track */}
        <div className="dash-segmented-outer-wrapper">
          <motion.div
            className="dash-segmented-controls-container"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dash-segmented-track" role="tablist" aria-label="Filter skill matrix">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`dash-segmented-item ${isActive ? 'dash-item-active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    <span className="dash-segmented-label-text">{cat}</span>
                    {isActive && !prefersReducedMotion && (
                      <motion.div
                        className="dash-segmented-active-thumb"
                        layoutId="activeSegmentIndicator"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      >
                        <span className="dash-segment-sweep" />
                      </motion.div>
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Layout container */}
        <motion.div
          layout
          className={`dash-skills-layout-wrapper ${
            isSoloActive ? 'dash-solo-active-layout' : 'dash-multi-columns-masonry'
          }`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {categoryOrder.map((category) =>
              grouped[category] ? (
                <CategoryBlock
                  key={category}
                  category={category}
                  skills={grouped[category]}
                  prefersReducedMotion={prefersReducedMotion}
                  isSolo={isSoloActive}
                />
              ) : null
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills