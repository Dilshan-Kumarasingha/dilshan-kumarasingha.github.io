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

  return (
    <section className="dash-contact-section" id="contact">
      <div className="dash-contact-container">
        <span className="dash-contact-eyebrow">
          <span className="dash-eyebrow-dot" />
          connection workspace
        </span>

        <div className="dash-contact-split">

          {/* macOS Window Frame Card */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformStyle: 'preserve-3d',
            }}
            className="dash-diagnostics-window"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {!prefersReducedMotion && (
              <motion.div
                className="dash-window-specular-pass"
                style={{
                  background: useTransform(
                    [glowX, glowY],
                    ([latestX, latestY]) => `radial-gradient(380px circle at ${latestX + 240}px ${latestY + 180}px, rgba(61, 214, 140, 0.06), transparent 70%)`
                  )
                }}
              />
            )}

            <div className="dash-window-header-ui">
              <div className="dash-window-controls-dot">
                <span className="dash-dot dash-dot-close" />
                <span className="dash-dot dash-dot-minimize" />
                <span className="dash-dot dash-dot-expand" />
              </div>
              <span className="dash-window-system-title">terminal — diagnostics.sh</span>
            </div>

            <div className="dash-window-terminal-body">
              <div className="dash-terminal-shell-line">
                <span className="dash-shell-prompt">guest@portfolio ~ %</span>
                <span className="dash-shell-command"> ./get_network_coordinates.sh</span>
              </div>

              <div className="dash-terminal-payload-output">
                <p className="dash-payload-title">// persistent comms matrix</p>
                <div className="dash-payload-row">
                  <span className="dash-payload-key">LOC:</span>
                  <span className="dash-payload-val">Colombo, LK (UTC +05:30)</span>
                </div>
                <div className="dash-payload-row">
                  <span className="dash-payload-key">AVAILABILITY:</span>
                  <span className="dash-payload-val dash-token-success">Active // Remote Ops</span>
                </div>
                <div className="dash-payload-row">
                  <span className="dash-payload-key">ROLES:</span>
                  <span className="dash-payload-val">Full-Stack Dev / QA Automation</span>
                </div>
              </div>

              <div className="dash-terminal-system-status">
                <div className="dash-status-ping-beacon">
                  <span className="dash-beacon-core" />
                  <span className="dash-beacon-wave" />
                </div>
                <span className="dash-status-message">Listening for webhooks...</span>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            className="dash-dispatch-card"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="dash-dispatch-header-group">
              <h3 className="dash-dispatch-card-heading">Initiate transmission</h3>
              <p className="dash-dispatch-card-description">
                Drop an architectural query below to push a record into my workspace logs.
              </p>
            </div>

            <form className="dash-dispatch-form" onSubmit={(e) => e.preventDefault()}>
              <div className="dash-form-input-container">
                <input
                  type="text"
                  id="sender-identity"
                  required
                  placeholder=" "
                  className="dash-form-field"
                />
                <label htmlFor="sender-identity" className="dash-form-label">Your name</label>
              </div>

              <div className="dash-form-input-container">
                <input
                  type="email"
                  id="sender-endpoint"
                  required
                  placeholder=" "
                  className="dash-form-field"
                />
                <label htmlFor="sender-endpoint" className="dash-form-label">Email endpoint</label>
              </div>

              <div className="dash-form-input-container">
                <textarea
                  id="transmission-body"
                  rows={3}
                  required
                  placeholder=" "
                  className="dash-form-field dash-field-textarea"
                />
                <label htmlFor="transmission-body" className="dash-form-label">Message string</label>
              </div>

              <div className="dash-form-actions-row">
                <button type="submit" className="dash-action-btn-primary">
                  <Mail size={14} />
                  <span>Send transmission</span>
                </button>

                <a
                  href="https://linkedin.com/in/dilshan-kumarasingha"
                  target="_blank"
                  rel="noreferrer"
                  className="dash-action-btn-secondary"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn link</span>
                </a>
              </div>
            </form>

            <div className="dash-alternative-routes">
              <a
                href="https://github.com/Dilshan-Kumarasingha"
                target="_blank"
                rel="noreferrer"
                className="dash-sub-archival-link"
              >
                <GithubIcon size={13} />
                <span>Repository archive</span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="dash-footer-metadata">
          <span className="dash-metadata-copyright">&copy; 2026 Dilshan Kumarasingha. All rights reserved.</span>
          <span className="dash-metadata-spec">Engineered via Core React Ecosystem &bull; Framework Architecture</span>
        </div>
      </div>
    </section>
  )
}

export default Contact