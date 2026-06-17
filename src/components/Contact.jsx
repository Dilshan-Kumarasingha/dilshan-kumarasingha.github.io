import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import '../styles/Contact.css'

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
          <span className="section-eyebrow">Contact</span>
          <h2 className="contact-title">Let us build something that holds.</h2>
          <p className="contact-sub">
            Open to full-stack and QA engineering roles at enterprise software companies.
            Based in Colombo — available immediately.
          </p>
          <div className="contact-actions">
            <a href="mailto:dilshan.jkumarasingha@gmail.com" className="btn-primary contact-btn">
              <Mail size={18} />
              dilshan.jkumarasingha@gmail.com
            </a>
            <a href="https://linkedin.com/in/dilshan-kumarasingha" target="_blank" rel="noreferrer" className="btn-ghost contact-btn">
              LinkedIn Profile
            </a>
          </div>
          <div className="contact-links">
            <a href="https://github.com/Dilshan-Kumarasingha" target="_blank" rel="noreferrer" className="contact-link">
              GitHub
            </a>
          </div>
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