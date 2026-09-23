import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion'
import '../styles/Navbar.css'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'testimonials', label: 'Testimonials' },
]

const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '-20% 0px -65% 0px',
  threshold: 0,
}

function Navbar() {
  const prefersReducedMotion = useReducedMotion()

  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuButtonRef = useRef(null)
  const mobilePanelRef = useRef(null)
  const previousActiveElementRef = useRef(null)

  /*
   * ------------------------------------------------------------
   * Scroll state
   * ------------------------------------------------------------
   */

  useEffect(() => {
    let frameId = null

    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 20)
      frameId = null
    }

    const handleScroll = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateScrollState)
      }
    }

    updateScrollState()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  /*
   * ------------------------------------------------------------
   * Active section detection
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const sections = NAV_ITEMS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    if (sections.length === 0) {
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top
        )

      if (visibleSections.length > 0) {
        setActiveSection(visibleSections[0].target.id)
      }
    }, OBSERVER_OPTIONS)

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  /*
   * ------------------------------------------------------------
   * Body scroll lock
   * ------------------------------------------------------------
   */

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight

    document.body.style.overflow = 'hidden'

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
    }
  }, [isMenuOpen])

  /*
   * ------------------------------------------------------------
   * Mobile menu focus management
   * ------------------------------------------------------------
   */

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    previousActiveElementRef.current = document.activeElement

    const panel = mobilePanelRef.current

    if (!panel) {
      return undefined
    }

    const focusableElements = panel.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    const firstFocusableElement = focusableElements[0]

    requestAnimationFrame(() => {
      firstFocusableElement?.focus()
    })

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const elements = panel.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )

      if (elements.length === 0) {
        return
      }

      const firstElement = elements[0]
      const lastElement = elements[elements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      requestAnimationFrame(() => {
        const previousElement = previousActiveElementRef.current

        if (
          previousElement &&
          typeof previousElement.focus === 'function'
        ) {
          previousElement.focus()
        }
      })
    }
  }, [isMenuOpen])

  /*
   * ------------------------------------------------------------
   * Navigation helpers
   * ------------------------------------------------------------
   */

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const scrollToId = (targetId) => {
    const behavior = prefersReducedMotion ? 'auto' : 'smooth'

    if (!targetId) {
      window.scrollTo({
        top: 0,
        behavior,
      })

      setActiveSection('')
      return
    }

    const targetElement = document.getElementById(targetId)

    if (!targetElement) {
      return
    }

    targetElement.scrollIntoView({
      behavior,
      block: 'start',
    })
  }

  const handleNavigation = (event, targetId) => {
    event.preventDefault()

    if (isMenuOpen) {
      closeMenu()
    }

    scrollToId(targetId)
  }

  const handleLogoClick = (event) => {
    event.preventDefault()

    closeMenu()
    scrollToId('')
  }

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current)
  }

  /*
   * ------------------------------------------------------------
   * Animation configuration
   * ------------------------------------------------------------
   */

  const navbarInitial = {
    opacity: 0,
    y: prefersReducedMotion ? 0 : -12,
  }

  const navbarAnimate = {
    opacity: 1,
    y: 0,
  }

  const navbarTransition = {
    duration: prefersReducedMotion ? 0 : 0.5,
    ease: [0.25, 1, 0.5, 1],
  }

  return (
    <motion.nav
      className={`dash-navbar ${
        isScrolled ? 'dash-navbar-scrolled' : ''
      }`}
      initial={navbarInitial}
      animate={navbarAnimate}
      transition={navbarTransition}
      aria-label="Primary navigation"
    >
      <div className="dash-navbar-inner">
        {/* Logo */}
        <a
          href="/"
          className="dash-navbar-logo"
          onClick={handleLogoClick}
          aria-label="Dilshan K. — Back to top"
        >
          <span
            className="dash-logo-dot"
            aria-hidden="true"
          />

          <span>Dilshan K.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="dash-navbar-links">
          <nav
            className="dash-nav-pill-track"
            aria-label="Section navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`dash-nav-link ${
                    isActive ? 'dash-nav-link-active' : ''
                  }`}
                  onClick={(event) =>
                    handleNavigation(event, item.id)
                  }
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="dash-nav-label-text">
                    {item.label}
                  </span>

                  {isActive && !prefersReducedMotion && (
                    <motion.span
                      className="dash-nav-active-pill"
                      layoutId="navActivePillIndicator"
                      aria-hidden="true"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 35,
                      }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          <a
            href="#contact"
            className="dash-contact-nav-btn"
            onClick={(event) =>
              handleNavigation(event, 'contact')
            }
          >
            <span>Hire me</span>
            <span
              className="dash-contact-arrow"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          ref={menuButtonRef}
          className={`dash-menu-toggle ${
            isMenuOpen ? 'dash-menu-toggle-open' : ''
          }`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="dash-mobile-nav-panel"
          aria-label={
            isMenuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
        >
          <span
            className="dash-toggle-bar"
            aria-hidden="true"
          />
          <span
            className="dash-toggle-bar"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.button
              type="button"
              className="dash-mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.2,
              }}
              onClick={closeMenu}
              aria-label="Close navigation menu"
            />

            <motion.aside
              ref={mobilePanelRef}
              id="dash-mobile-nav-panel"
              className="dash-mobile-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{
                x: prefersReducedMotion ? 0 : '100%',
                opacity: prefersReducedMotion ? 1 : 0.98,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: prefersReducedMotion ? 0 : '100%',
                opacity: prefersReducedMotion ? 1 : 0.98,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="dash-mobile-panel-header">
                <span className="dash-mobile-eyebrow">
                  <span
                    className="dash-eyebrow-dot"
                    aria-hidden="true"
                  />

                  navigation
                </span>

                <button
                  type="button"
                  className="dash-mobile-close"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <nav
                className="dash-mobile-links"
                aria-label="Mobile section navigation"
              >
                {NAV_ITEMS.map((item, index) => {
                  const isActive =
                    activeSection === item.id

                  return (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`dash-mobile-link ${
                        isActive
                          ? 'dash-mobile-link-active'
                          : ''
                      }`}
                      onClick={(event) =>
                        handleNavigation(event, item.id)
                      }
                      initial={{
                        opacity: 0,
                        x: prefersReducedMotion ? 0 : 16,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: prefersReducedMotion
                          ? 0
                          : 0.04 + index * 0.04,
                        duration: prefersReducedMotion
                          ? 0
                          : 0.3,
                      }}
                      aria-current={
                        isActive ? 'page' : undefined
                      }
                    >
                      <span>{item.label}</span>

                      <span
                        className="dash-mobile-link-arrow"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </motion.a>
                  )
                })}
              </nav>

              <motion.a
                href="#contact"
                className="dash-mobile-cta"
                onClick={(event) =>
                  handleNavigation(event, 'contact')
                }
                initial={{
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.2,
                  duration: prefersReducedMotion ? 0 : 0.3,
                }}
              >
                <span>Hire me</span>
                <span aria-hidden="true">↗</span>
              </motion.a>

              <p className="dash-mobile-footer">
                Available for selected projects
              </p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar