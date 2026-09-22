import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import '../styles/Testimonials.css'

// Placeholder content — swap in real names, quotes and photos later.
const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      "Really easy to work with and explains things clearly. I understood exactly what was being built at every step, and the final result matched what we'd discussed from the start.",
    name: 'Client Name',
    role: 'Role / Company',
    date: 'Month Year',
    initials: 'CN',
  },
  {
    id: 't2',
    quote:
      'Delivered on time and communicated well throughout. Any issues that came up were sorted quickly, and the code was left in a state that was easy to hand over.',
    name: 'Client Name',
    role: 'Role / Company',
    date: 'Month Year',
    initials: 'CN',
  },
  {
    id: 't3',
    quote:
      'Took a vague idea and turned it into something that actually worked well for the team. Would happily work together again on the next project.',
    name: 'Client Name',
    role: 'Role / Company',
    date: 'Month Year',
    initials: 'CN',
  },
  {
    id: 't4',
    quote:
      'Solid technical grounding and good instincts about what to build versus what to skip. Kept scope realistic without cutting corners.',
    name: 'Client Name',
    role: 'Role / Company',
    date: 'Month Year',
    initials: 'CN',
  },
]

function Testimonials() {
  const prefersReducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const featured = TESTIMONIALS[active]

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-inner">
        <span className="section-eyebrow">what people say</span>
        <h2 className="section-title">
          Feedback from people
          <br />
          <span className="testimonials-title-accent">I've worked with.</span>
        </h2>

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
              <span className="testimonial-date">{featured.date}</span>
            </div>
          </div>

          <div className="testimonial-featured-photo" aria-hidden="true">
            <span>{featured.initials}</span>
          </div>
        </motion.div>

        {/* Photo strip — click a card to feature it above */}
        <div className="testimonial-strip">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              className={`testimonial-thumb ${i === active ? 'testimonial-thumb--active' : ''}`}
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

        <p className="testimonials-note">
          Placeholder testimonials — real client quotes and photos go here.
        </p>
      </div>
    </section>
  )
}

export default Testimonials
