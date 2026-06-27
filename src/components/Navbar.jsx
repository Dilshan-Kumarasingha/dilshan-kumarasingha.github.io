import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
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

        const topMost = visible.reduce((best, entry) =>
          entry.boundingClientRect.top < best.boundingClientRect.top
            ? entry
            : best
        )
        setActiveSection(topMost.target.id)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = previousOverflow
      }
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  const handleMobileLinkClick = (e, targetId) => {
    e.preventDefault()
    closeMenu()

    setTimeout(() => {
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
      }
    }, 50)
  }

  return (
    <motion.nav
      className={`dash-navbar ${isScrolled ? 'dash-navbar-scrolled' : ''}`}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="dash-navbar-inner">
        <a href="#" className="dash-navbar-logo" onClick={closeMenu}>
          <span className="dash-logo-dot" />
          Dilshan K.
        </a>

        {/* ---------- Desktop Navigation Links ---------- */}
        <div className="dash-navbar-links">
          <div className="dash-nav-pill-track">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`dash-nav-link ${isActive ? 'dash-nav-link-active' : ''}`}
                >
                  <span className="dash-nav-label-text">{item.label}</span>
                  {isActive && !prefersReducedMotion && (
                    <motion.span
                      className="dash-nav-active-pill"
                      layoutId="navActivePillIndicator"
                      aria-hidden="true"
                      transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                    />
                  )}
                </a>
              )
            })}
          </div>
          <a href="#contact" className="dash-contact-nav-btn">
            Hire me
          </a>
        </div>

        {/* ---------- Mobile Menu Toggle ---------- */}
        <button
          type="button"
          ref={menuButtonRef}
          className={`dash-menu-toggle ${isMenuOpen ? 'dash-menu-toggle-open' : ''}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="dash-mobile-nav-panel"
          aria-label={isMenuOpen ? 'Close system menu' : 'Open system menu'}
        >
          <span className="dash-toggle-bar" />
          <span className="dash-toggle-bar" />
        </button>
      </div>

      {/* ---------- Mobile Slide-Out Panel ---------- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="dash-mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.div
              className="dash-mobile-panel"
              id="dash-mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation matrix"
              initial={{ x: prefersReducedMotion ? 0 : '100%', opacity: prefersReducedMotion ? 1 : 0.95 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: prefersReducedMotion ? 0 : '100%', opacity: prefersReducedMotion ? 1 : 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="dash-mobile-eyebrow">
                <span className="dash-eyebrow-dot" />
                navigation
              </span>
              <div className="dash-mobile-links">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`dash-mobile-link ${
                      activeSection === item.id ? 'dash-mobile-link-active' : ''
                    }`}
                    onClick={(e) => handleMobileLinkClick(e, item.id)}
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.04 + idx * 0.04, duration: 0.3 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
              <motion.a
                href="#contact"
                className="dash-mobile-cta"
                onClick={(e) => handleMobileLinkClick(e, 'contact')}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: 0.3 }}
              >
                Hire me
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar