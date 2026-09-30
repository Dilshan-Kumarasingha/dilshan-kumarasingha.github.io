import { useRef, useState } from 'react'
import { motion, useReducedMotion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Mail } from 'lucide-react'
import '../styles/Contact.css'

const LinkedinIcon = ({ size = 14 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const GithubIcon = ({ size = 13 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

export function Contact() {
  const prefersReducedMotion = useReducedMotion()
  const cardRef = useRef(null)

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | drafted

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${formData.name}`)
    const body = encodeURIComponent(
      `${formData.message}\n\n— ${formData.name} (${formData.email})`
    )
    window.location.href = `mailto:dilshan.jkumarasingha@gmail.com?subject=${subject}&body=${body}`
    setStatus('drafted')
  }

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 45, stiffness: 280, mass: 0.5 }
  const glowX = useSpring(mouseX, springConfig)
  const glowY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(mouseY, [-250, 250], [3.5, -3.5])
  const rotateY = useTransform(mouseX, [-450, 450], [-4, 4])

  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  const handleMouseMove = (e) => {
    if (!cardRef.current || prefersReducedMotion) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - (rect.left + rect.width / 2))
    mouseY.set(e.clientY - (rect.top + rect.height / 2))
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="contact-section" id="contact">
      <div className="contact-bg" aria-hidden="true" />

      <div className="contact-container">
        <motion.span className="contact-kicker" {...reveal(0)}>
          <span className="contact-kicker-dot" aria-hidden="true" />
          Connection workspace
        </motion.span>

        <div className="contact-split">
          {/* Status card */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformStyle: 'preserve-3d',
            }}
            className="contact-status-card"
            {...reveal(0)}
          >
            {!prefersReducedMotion && (
              <motion.div
                className="contact-card-glow"
                style={{
                  background: useTransform(
                    [glowX, glowY],
                    ([latestX, latestY]) =>
                      `radial-gradient(380px circle at ${latestX + 240}px ${latestY + 180}px, rgba(229, 72, 77, 0.1), transparent 70%)`
                  ),
                }}
              />
            )}

            <span className="contact-card-arch" aria-hidden="true" />

            <header className="contact-status-head">
              <span className="contact-status-badge">
                <span className="contact-beacon" aria-hidden="true">
                  <span className="contact-beacon-core" />
                  <span className="contact-beacon-wave" />
                </span>
                Available for work
              </span>
            </header>

            <dl className="contact-status-list">
              <div className="contact-status-row">
                <dt>Location</dt>
                <dd>Colombo, Sri Lanka (UTC +05:30)</dd>
              </div>
              <div className="contact-status-row">
                <dt>Availability</dt>
                <dd className="contact-status-ok">Open to remote roles</dd>
              </div>
              <div className="contact-status-row">
                <dt>Focus</dt>
                <dd>DevOps &amp; Platform Engineering</dd>
              </div>
            </dl>

            <footer className="contact-status-foot">
              {status === 'drafted'
                ? 'Message drafted — check your mail client'
                : 'Usually replies within a day'}
            </footer>
          </motion.div>

          {/* Form card */}
          <motion.div className="contact-form-card" {...reveal(0.08)}>
            <div className="contact-form-head">
              <h3>Send a message</h3>
              <p>Have a role, project or question in mind? Drop a note below.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-field">
                <input
                  type="text"
                  id="sender-identity"
                  name="name"
                  required
                  placeholder=" "
                  className="contact-input"
                  value={formData.name}
                  onChange={handleChange}
                />
                <label htmlFor="sender-identity">Your name</label>
              </div>

              <div className="contact-field">
                <input
                  type="email"
                  id="sender-endpoint"
                  name="email"
                  required
                  placeholder=" "
                  className="contact-input"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label htmlFor="sender-endpoint">Email address</label>
              </div>

              <div className="contact-field">
                <textarea
                  id="transmission-body"
                  name="message"
                  rows={3}
                  required
                  placeholder=" "
                  className="contact-input contact-textarea"
                  value={formData.message}
                  onChange={handleChange}
                />
                <label htmlFor="transmission-body">Message</label>
              </div>

              <div className="contact-actions">
                <button type="submit" className="contact-btn contact-btn--primary" data-cursor="hover">
                  <Mail size={15} />
                  <span>Send message</span>
                </button>

                <a
                  href="https://linkedin.com/in/dilshan-kumarasingha"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-btn contact-btn--ghost"
                  data-cursor="hover"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </form>

            <div className="contact-alt-route">
              <a
                href="https://github.com/Dilshan-Kumarasingha"
                target="_blank"
                rel="noreferrer"
                className="contact-alt-link"
                data-cursor="hover"
              >
                <GithubIcon size={13} />
                <span>View repositories</span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="contact-footer">
          <span>&copy; {new Date().getFullYear()} Dilshan Kumarasingha. All rights reserved.</span>
          <span>Built with React &bull; Framer Motion</span>
        </div>
      </div>
    </section>
  )
}

export default Contact