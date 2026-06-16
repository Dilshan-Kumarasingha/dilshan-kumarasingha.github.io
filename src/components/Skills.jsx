import { motion } from 'framer-motion'
import '../styles/Skills.css'

const skillGroups = [
  {
    category: 'Backend',
    skills: ['Java', 'Spring Boot', 'ASP.NET Core', 'Python', 'Django REST'],
  },
  {
    category: 'Frontend',
    skills: ['React 18', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'SQL Server', 'MySQL'],
  },
  {
    category: 'QA & Testing',
    skills: ['Selenium WebDriver', 'TestNG', 'NUnit', 'RestAssured', 'Allure Reports'],
  },
  {
    category: 'DevOps & Cloud',
    skills: ['Docker', 'GitHub Actions', 'AWS', 'Kubernetes', 'Istio'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'Postman', 'IntelliJ IDEA', 'VS Code', 'Visual Studio'],
  },
]

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills-inner">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Capabilities</span>
          <h2 className="section-title">What I work with</h2>
          <p className="section-sub">Proven across banking systems, real-time platforms, and full QA automation pipelines.</p>
        </motion.div>

        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              className="skill-group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="skill-category">{group.category}</h3>
              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
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