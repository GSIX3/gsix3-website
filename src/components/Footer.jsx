import ScrollReveal from './ScrollReveal'
import './Footer.css'

const companyLinks = [
  { label: 'About', id: 'about' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contact', id: 'contact' },
]

const serviceLinks = [
  { label: 'Business Automation', id: 'services' },
  { label: 'AI Integration', id: 'services' },
  { label: 'Data Analytics', id: 'services' },
  { label: 'CRM Systems', id: 'services' },
]

const startedLinks = [
  { label: 'Free Consultation', id: 'contact' },
  { label: 'Book a Call', id: 'contact' },
  { label: 'Contact Us', id: 'contact' },
]

const socials = [
  { label: 'IG', ariaLabel: 'Instagram' },
  { label: 'in', ariaLabel: 'LinkedIn' },
  { label: '𝕏', ariaLabel: 'X / Twitter' },
]

function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-inner">
        <ScrollReveal>
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="footer-logo">GSIX3</span>
              <p className="footer-tagline">
                Innovation with power.
                <br />
                Engineered with quality.
              </p>
              <p className="footer-desc">
                Smart automation and AI systems for businesses ready to operate
                at the next level.
              </p>
            </div>

            <div className="footer-col">
              <p className="footer-col-title">Company</p>
              <ul className="footer-links">
                {companyLinks.map(({ label, id }) => (
                  <li key={label}>
                    <button
                      className="footer-link"
                      onClick={() => scrollTo(id)}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <p className="footer-col-title">Services</p>
              <ul className="footer-links">
                {serviceLinks.map(({ label, id }) => (
                  <li key={label}>
                    <button
                      className="footer-link"
                      onClick={() => scrollTo(id)}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <p className="footer-col-title">Get Started</p>
              <ul className="footer-links">
                {startedLinks.map(({ label, id }) => (
                  <li key={label}>
                    <button
                      className="footer-link"
                      onClick={() => scrollTo(id)}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 GSIX3. All rights reserved. Est. 2025.
          </p>
          <div className="footer-socials">
            {socials.map(({ label, ariaLabel }) => (
              <button
                key={label}
                className="social-btn"
                aria-label={ariaLabel}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
