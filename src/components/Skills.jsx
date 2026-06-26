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

function VisualTierIndicator({ tier }) {
  const rank = TIERS[tier].rank
  return (
    <div className="apple-tier-indicator-bar-wrap" aria-hidden="true">
      {[1, 2, 3].map((step) => (
        <span 
          key={step} 
          className={`apple-indicator-step ${step <= rank ? `step-active-${tier}` : ''}`} 
        />
      ))}
    </div>
  )
}

function SkillRow({ skill, index, prefersReducedMotion }) {
  return (
    <motion.div
      className="apple-skill-row"
      layout="position"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ 
        type: 'spring',
        stiffness: 400,
        damping: 38,
        delay: prefersReducedMotion ? 0 : index * 0.012 
      }}
    >
      <span className="apple-skill-name">{skill.name}</span>
      <div className="apple-skill-meta">
        <span className={`apple-skill-badge label-tier-${skill.tier}`}>
          {TIERS[skill.tier].label}
        </span>
        <VisualTierIndicator tier={skill.tier} />
      </div>
    </motion.div>
  )
}

function CategoryBlock({ category, skills, prefersReducedMotion, isSolo }) {
  return (
    <motion.div 
      layout
      transition={{ type: 'spring', stiffness: 350, damping: 34 }}
      className={`apple-category-card ${isSolo ? 'card-solo-focus' : ''}`}
    >
      <div className="apple-category-header">
        <h3 className="apple-category-title">{category}</h3>
        <span className="apple-category-count">{skills.length}</span>
      </div>
      <div className="apple-category-rows-container">
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
    <section className="apple-skills-section" id="skills">
      <div className="apple-skills-container">
        <motion.div
          className="apple-skills-header-block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="apple-skills-eyebrow">Technical Competencies</span>
          <h2 className="apple-skills-title">
            Engineered Toolkit. <span className="text-muted-grey">Calibrated for scale.</span>
          </h2>
          <p className="apple-skills-subhead">
            Primary specialization centered around high-integrity enterprise ecosystems built with C# and ASP.NET Core, complemented by performant React client interfaces.
          </p>
        </motion.div>

        {/* Native macOS/iOS Segments Track */}
        <div className="apple-segmented-outer-wrapper">
          <motion.div
            className="apple-segmented-controls-container"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="apple-segmented-track" role="tablist" aria-label="Filter skill matrix">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`apple-segmented-item ${isActive ? 'item-active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    <span className="apple-segmented-label-text">{cat}</span>
                    {isActive && !prefersReducedMotion && (
                      <motion.div 
                        className="apple-segmented-active-thumb" 
                        layoutId="activeSegmentIndicator"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Re-engineered Canvas Layout Container */}
        <motion.div
          layout
          className={`apple-skills-layout-wrapper ${
            isSoloActive ? 'solo-active-layout' : 'multi-columns-masonry'
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