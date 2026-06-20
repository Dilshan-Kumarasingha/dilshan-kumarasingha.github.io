import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import '../styles/Navbar.css'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
]

function Navbar() {
  const prefersReducedMotion = useReducedMotion()
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        // If multiple sections intersect in the same batch, prefer the one
        // closest to the top of the viewport for a deterministic result.
        const topMost = visible.reduce((best, entry) =>
          entry.boundingClientRect.top < best.boundingClientRect.top
            ? entry
            : best
        )
        setActiveSection(topMost.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          <span className="logo-bracket">{'<'}</span>
          DK
          <span className="logo-bracket">{'/>'}</span>
        </a>

        <div className="navbar-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${
                activeSection === item.id ? 'nav-link-active' : ''
              }`}
            >
              {activeSection === item.id && (
                <span className="nav-link-dot" aria-hidden="true" />
              )}
              {item.label}
            </a>
          ))}
          <a href="#contact" className="nav-link contact-nav">
            Hire Me
          </a>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar