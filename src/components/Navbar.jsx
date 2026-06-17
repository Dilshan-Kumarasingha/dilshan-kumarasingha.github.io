import { motion } from 'framer-motion'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">DK</a>
        <div className="navbar-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#contact" className="nav-link contact-nav">Hire Me</a>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar