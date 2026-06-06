import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '../lib/motion'
import LogoImg from '../assets/GSIX3.png'
import './Navbar.css'

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contact', id: 'contact' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const intersectingRef = useRef(new Set())

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled((prev) => (prev === scrolled ? prev : scrolled))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingRef.current.add(entry.target.id)
          } else {
            intersectingRef.current.delete(entry.target.id)
          }
        })
        // Pick the topmost visible section in navLinks order
        const active = navLinks.find(({ id }) => intersectingRef.current.has(id))
        if (active) setActiveSection(active.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    setIsMenuOpen(false)
    // Defer scroll so mobile menu starts closing before the viewport shifts
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <motion.nav
      className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`}
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      <div className="navbar-inner">
        <button className="navbar-logo" onClick={() => scrollTo('home')}>
          <img src={LogoImg} alt="GSIX3" className="navbar-logo-img" />
        </button>

        <ul className="navbar-links">
          {navLinks.map(({ label, id }) => (
            <li key={id}>
              <button
                className={`nav-link${activeSection === id ? ' nav-link--active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="navbar-right">
          <button className="btn-get-started" onClick={() => scrollTo('contact')}>
            Get Started
          </button>

          <button
            className={`hamburger${isMenuOpen ? ' hamburger--open' : ''}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <ul className="mobile-links">
              {navLinks.map(({ label, id }) => (
                <li key={id}>
                  <button
                    className={`mobile-link${activeSection === id ? ' mobile-link--active' : ''}`}
                    onClick={() => scrollTo(id)}
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li className="mobile-cta">
                <button
                  className="btn-get-started btn-get-started--full"
                  onClick={() => scrollTo('contact')}
                >
                  Get Started
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
