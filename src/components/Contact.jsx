import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'
import ScrollReveal from './ScrollReveal'
import './Contact.css'

const contactItems = [
  { icon: '✉', label: 'Email', value: 'hello@gsix3.com' },
  { icon: '⊕', label: 'Website', value: 'www.gsix3.com' },
  { icon: '◉', label: 'Instagram', value: '@gsix.3' },
]

const serviceOptions = [
  'Business Automation',
  'AI System Integration',
  'Data & Analytics',
  'CRM Systems',
  'Full System Build',
  'Not sure — need advice',
]

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  service: '',
  message: '',
}

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm(initialForm)
    }, 3000)
  }

  return (
    <div className="contact-inner">
      {/* Left — info */}
      <motion.div
        className="contact-info"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <span className="contact-tag">Let's Talk</span>
        <h2 className="contact-heading">Ready to automate your business?</h2>
        <p className="contact-subtext">
          Book a free consultation and find out exactly how GSIX3 can eliminate
          your manual work, reduce costs, and deploy intelligent systems across
          your entire operation.
        </p>

        <div className="contact-items">
          {contactItems.map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 0.1}>
              <div className="contact-item">
                <div className="contact-icon-box">{item.icon}</div>
                <div>
                  <p className="contact-item-label">{item.label}</p>
                  <p className="contact-item-value">{item.value}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </motion.div>

      {/* Right — form */}
      <motion.div
        className="contact-form-wrap"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
      >
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                className="form-input"
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                className="form-input"
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Smith"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              className="form-input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@company.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="company">
              Company
            </label>
            <input
              id="company"
              className="form-input"
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Your company name"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="service">
              Service Interested In
            </label>
            <select
              id="service"
              className="form-select"
              name="service"
              value={form.service}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select a service...
              </option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              className="form-textarea"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className={`form-submit${submitted ? ' form-submit--success' : ''}`}
            disabled={submitted}
          >
            {submitted ? 'Message Sent ✓' : 'Send Message'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default Contact
