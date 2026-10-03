import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "../styles/Testimonials.css";

/*
  TESTIMONIAL RULES
  - Never edit the words inside "quote". They are the person's own words.
  - "context" says what the feedback was for. Fill the TODOs with real facts.
  - "highlight" must be something the quote actually says.
  - Keep names and quotes only if the person agreed to be shown publicly.
*/

const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "This course provided a strong foundation and helped me understand the concepts clearly. The explanations were easy to follow, and the teaching style was friendly and supportive. I would recommend it to anyone looking to build practical knowledge.",
    name: "Mr. Kasun Danajaya",
    role: "University of Vavuniya",
    // TODO: replace with the real course name, e.g. "Feedback on a programming course I taught"
    context: "Feedback on a course I taught",
    highlight: "Clear explanations",
    date: "Nov 28, 2021",
    initials: "KD",
    ring: "red",
  },
  {
    id: "t2",
    quote:
      "The project was completed on time with excellent support throughout. Everything was delivered within a week and matched the requirements closely. Communication was clear, and help was available whenever needed. Highly recommended.",
    name: "Mr. Bathiya Jayawardana",
    role: "BSc (Hons) Computer Networks, University of Plymouth",
    // TODO: replace with the real project type, e.g. "Feedback on a project I delivered"
    context: "Feedback on a project I delivered",
    highlight: "On-time delivery and clear communication",
    // TODO: add the month and year, an undated testimonial looks weaker
    date: "",
    initials: "BJ",
    ring: "gold",
  },
];

function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const featured = TESTIMONIALS[active];

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-inner">
        <div className="testimonials-heading-row">
          <div>
            <span className="section-eyebrow">what people say</span>

            <h2 className="section-title">
              Clear communication
              <br />
              <span className="testimonials-title-accent">
                and reliable delivery.
              </span>
            </h2>

            <p className="testimonials-intro">
              Feedback on how I explain technical work and deliver it on time,
              two habits I bring to a DevOps team.
            </p>
          </div>

          <div className="dot-grid dot-grid--red" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>

        {/* Featured testimonial */}
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

              <span className="testimonial-date">
                {featured.context} · {featured.highlight}
              </span>

              {featured.date && (
                <span className="testimonial-date">{featured.date}</span>
              )}
            </div>
          </div>

          <div
            className={`testimonial-featured-photo testimonial-featured-photo--${featured.ring}`}
            aria-hidden="true"
          >
            <span>{featured.initials}</span>
          </div>
        </motion.div>

        {/* Testimonial selector */}
        <div className="testimonial-strip">
          {TESTIMONIALS.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              aria-pressed={index === active}
              className={`testimonial-thumb testimonial-thumb--${testimonial.ring} ${
                index === active ? "testimonial-thumb--active" : ""
              }`}
              onClick={() => setActive(index)}
              data-cursor="hover"
            >
              <span className="testimonial-thumb-avatar">
                {testimonial.initials}
              </span>

              <span className="testimonial-thumb-meta">
                <span className="testimonial-thumb-name">
                  {testimonial.name}
                </span>

                <span className="testimonial-thumb-role">
                  {testimonial.role}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;