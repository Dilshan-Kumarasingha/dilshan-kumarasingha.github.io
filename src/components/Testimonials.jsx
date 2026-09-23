import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import '../styles/Testimonials.css'

const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      "This is a course that imparts basic knowledge well. I was able to better understand all the explanations, this helped me to gain more knowledge. And all the teaching was done in a friendly manner. I have to say to those who are going to join this course in the future, it will definitely be able to gather a lot of knowledge to join this course.",
    name: 'Mr. Kasun Danajaya',
    role: 'University of Vavuniya',
    date: 'Nov 28, 2021',
    initials: 'KD',
    ring: 'red',
  },
  {
    id: 't2',
    quote:
      'Completed project on-time and best help service. Also got my whole project completed in just one week. Unbelievable and super fast and not only that, it exactly what I asked for. Also he was beside me the entire way and helped me with any problems I had. Highly recommended!',
    name: 'Mr. Bathiya Jayawardana',
    role: 'BSc. (Hons) Computer Networks, University of Plymouth',
    date: '',
    initials: 'BJ',
    ring: 'gold',
  },
]

function Testimonials() {
  const prefersReducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const featured = TESTIMONIALS[active]

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-inner">
        <div className="testimonials-heading-row">
          <div>
            <span className="section-eyebrow">what people say</span>
            <h2 className="section-title">
              Feedback from people
              <br />
              <span className="testimonials-title-accent">I've worked with.</span>
            </h2>
          </div>
          <div className="dot-grid dot-grid--red" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => <span key={i} />)}
          </div>
        </div>

        {/* Featured quote — large card, mirrors the reference layout */}
        <motion.div
          className="testimonial-featured"
          key={featured.id}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="testimonial-featured-text">
            <span className="testimonial-quote-mark" aria-hidden="true">
              &ldquo;
            </span>
            <p className="testimonial-quote">{featured.quote}</p>

            <div className="testimonial-attribution">
              <span className="testimonial-name">{featured.name}</span>
              <span className="testimonial-role">{featured.role}</span>
              {featured.date && <span className="testimonial-date">{featured.date}</span>}
            </div>
          </div>

          <div className={`testimonial-featured-photo testimonial-featured-photo--${featured.ring}`} aria-hidden="true">
            <span>{featured.initials}</span>
          </div>
        </motion.div>

        {/* Photo strip — click a card to feature it above */}
        <div className="testimonial-strip">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              className={`testimonial-thumb testimonial-thumb--${t.ring} ${i === active ? 'testimonial-thumb--active' : ''}`}
              onClick={() => setActive(i)}
              data-cursor="hover"
            >
              <span className="testimonial-thumb-avatar">{t.initials}</span>
              <span className="testimonial-thumb-meta">
                <span className="testimonial-thumb-name">{t.name}</span>
                <span className="testimonial-thumb-role">{t.role}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
