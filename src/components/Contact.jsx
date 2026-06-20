import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import '../styles/Contact.css'

// Inline SVG keeps this independent of whatever lucide-react version is installed.
const LinkedinIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const GithubIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">
            <span className="eyebrow-bracket">{'//'}</span> Contact
          </span>
          <h2 className="contact-title">Let's build something that holds.</h2>
          <p className="contact-sub">
            Open to full-stack and QA engineering roles at enterprise
            software companies. Based in Colombo — available immediately.
          </p>

          <div className="contact-actions">
            <a
              href="mailto:dilshan.jkumarasingha@gmail.com"
              className="btn-primary contact-btn"
            >
              <Mail size={18} />
              dilshan.jkumarasingha@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/dilshan-kumarasingha"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost contact-btn"
            >
              <LinkedinIcon size={18} />
              <span>LinkedIn Profile</span>
            </a>
          </div>

          <div className="contact-links">
            <a
              href="https://github.com/Dilshan-Kumarasingha"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              <GithubIcon size={15} />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="contact-prompt"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="prompt-glyph">$</span>
          <span className="prompt-text">awaiting your message</span>
          <motion.span
            className="prompt-cursor"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        <div className="footer-note">
          <span>Dilshan Kumarasingha</span>
          <span>Built with React and Framer Motion</span>
        </div>
      </div>
    </section>
  )
}

export default Contact