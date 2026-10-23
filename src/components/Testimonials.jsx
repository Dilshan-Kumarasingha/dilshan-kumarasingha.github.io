import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "../styles/Testimonials.css";

// Only show a quote when the person has agreed to it in writing.
// Set approved to true only after Mr. Silva confirms the exact words.
// Never change the words in "quote" after he approves them.

const TESTIMONIALS = [
  {
    id: "t1",
    approved: false,
    quote:
      "TradeX has been running in our business for more than two years. It handles our daily sales and stock, and Dilshan has helped whenever we needed a change or had a question.",
    name: "Mr. Nissanka Mahesh Silva",
    role: "Owner, N&E Engineering (Pvt) Ltd, Rathmalana",
    context: "Feedback on the TradeX POS system I built",
    highlight: "Running in daily use for more than two years",
    date: "",
    initials: "NS",
    ring: "red",
  },
];

function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const quotes = TESTIMONIALS.filter((item) => item.approved);
  const featured = quotes[active];

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-inner">
        <div className="testimonials-heading-row">
          <div>
            <span className="section-eyebrow">in real use</span>

            <h2 className="section-title">
              Software that runs
              <br />
              <span className="testimonials-title-accent">
                in a real business.
              </span>
            </h2>

            <p className="testimonials-intro">
              TradeX, the POS system I built, has been running at a client site
              for more than two years. I still look after it.
            </p>
          </div>

          <div className="dot-grid dot-grid--red" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>

        {featured ? (
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
        ) : (
          <motion.div
            className="testimonial-featured"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="testimonial-featured-text">
              <p className="testimonial-quote">
                TradeX is a desktop POS system I built in C# and .NET. It
                handles sales, customers, products, employees, expenses and
                payroll, with a machine-bound licence system and database
                backup. It has been in daily use at N&amp;E Engineering (Pvt)
                Ltd in Rathmalana for more than two years.
              </p>

              <div className="testimonial-attribution">
                <span className="testimonial-name">TradeX POS</span>
                <span className="testimonial-role">
                  Live at a client site, still maintained by me
                </span>
              </div>
            </div>

            <div
              className="testimonial-featured-photo testimonial-featured-photo--red"
              aria-hidden="true"
            >
              <span>TX</span>
            </div>
          </motion.div>
        )}

        {quotes.length > 1 && (
          <div className="testimonial-strip">
            {quotes.map((testimonial, index) => (
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
        )}
      </div>
    </section>
  );
}

export default Testimonials;