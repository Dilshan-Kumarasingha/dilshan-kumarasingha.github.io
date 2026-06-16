import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import '../styles/Hero.css'

const GithubSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

const LinkedinSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="grid-overlay" />
      </div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.span
          className="hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Full-Stack Engineer · QA Automation · Colombo, Sri Lanka
        </motion.span>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          I build software that <br />
          <span className="hero-accent">ships and holds.</span>
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Java · Spring Boot · React · .NET · PostgreSQL · Selenium — 
          from architecture to the test suite that proves it works.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <a href="#projects" className="btn-primary">See My Work</a>
          <a href="#contact" className="btn-ghost">Get In Touch</a>
        </motion.div>

        <motion.div
          className="hero-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <a href="https://github.com/Dilshan-Kumarasingha" target="_blank" rel="noreferrer"><GithubSVG /></a>
          <a href="https://linkedin.com/in/dilshan-kumarasingha" target="_blank" rel="noreferrer"><LinkedinSVG /></a>
          <a href="mailto:dilshan.jkumarasingha@gmail.com"><Mail size={20} /></a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  )
}

export default Hero