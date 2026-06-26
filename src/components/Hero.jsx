import { useState, useRef } from 'react'
import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import AIAssistant from './AIAssistant'
import profilePhoto from '../assets/Profile 2.jpeg'
import '../styles/Hero.css'

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

function Hero() {
  const [isAiOpen, setIsAiOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Apple-grade Scroll Mechanics: Subtly compresses opacity and scale down on scroll exit
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96])
  const photoY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -30])

  // Apple Cinematic Fluid Curve Easing [0.16, 1, 0.3, 1]
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const revealUpVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const imageFrameVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 1.05, y: prefersReducedMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
    }
  }

  const textWords = "Engineering systems that hold up under pressure.".split(" ")

  return (
    <section className="apple-hero" ref={heroRef}>
      <motion.div 
        className="apple-hero-frame" 
        style={{ opacity: contentOpacity, scale: contentScale }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="apple-hero-split-container">
          
          {/* LEFT SIDE: Typography Content */}
          <div className="apple-hero-left">
            <div className="apple-mask-overflow">
              <motion.div className="apple-hero-eyebrow" variants={revealUpVariants}>
                Full-Stack Engineer &middot; Colombo, Sri Lanka
              </motion.div>
            </div>

            <div className="apple-mask-overflow">
              <motion.h1 className="apple-hero-headline" variants={revealUpVariants}>
                {textWords.map((word, idx) => {
                  const isAccent = idx >= 3
                  return (
                    <span 
                      key={idx} 
                      className={`apple-headline-word ${isAccent ? 'apple-text-accent' : ''}`}
                    >
                      {word}&nbsp;
                    </span>
                  )
                })}
              </motion.h1>
            </div>

            <div className="apple-mask-overflow">
              <motion.p className="apple-hero-subhead" variants={revealUpVariants}>
                I design and build backend systems in C# and ASP.NET Core, and the React interfaces that sit on top of them — with the same care for testing and reliability that ships software other people can depend on.
              </motion.p>
            </div>

            <motion.div className="apple-hero-actions" variants={revealUpVariants}>
              <motion.a 
                href="#projects" 
                className="apple-btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                View My Work <span className="apple-chevron">&rarr;</span>
              </motion.a>
              <motion.button 
                className="apple-btn-secondary" 
                onClick={() => setIsAiOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                Ask My Assistant
              </motion.button>
            </motion.div>

            <motion.div className="apple-hero-links" variants={revealUpVariants}>
              <a href="https://github.com/Dilshan-Kumarasingha" target="_blank" rel="noreferrer" className="apple-hero-social-link">
                <GithubIcon />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/dilshan-kumarasingha" target="_blank" rel="noreferrer" className="apple-hero-social-link">
                <LinkedinIcon />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Photo Container */}
          <div className="apple-hero-right">
            <motion.div 
              className="apple-hero-photo-wrap"
              variants={imageFrameVariants}
            >
              <motion.div
                className="apple-hero-photo-frame"
                style={prefersReducedMotion ? undefined : { y: photoY }}
              >
                <img
                  src={profilePhoto}
                  alt="Dilshan Kumarasingha"
                  className="apple-hero-photo-img"
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </motion.div>

      <div className="apple-hero-scroll-cue">
        <motion.span
          className="apple-hero-scroll-dot"
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <AnimatePresence>
        {isAiOpen && <AIAssistant onClose={() => setIsAiOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}

export default Hero;