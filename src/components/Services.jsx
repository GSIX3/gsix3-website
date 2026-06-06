import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import services from '../data/services'
import './Services.css'

function Services() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const sectionScale = useTransform(scrollYProgress, [0, 1], [0.98, 1])
  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 1])

  return (
    <section ref={sectionRef} className="services-section">
      <motion.div
        className="services-inner"
        style={{ scale: sectionScale, opacity: sectionOpacity }}
      >

        {/* Heading with line-by-line 3D animation */}
        <motion.div
          className="services-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="services-tag">Services</span>

          <motion.h2
            className="services-heading"
            initial={{ rotateX: 15, y: 30, opacity: 0 }}
            whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              style={{ display: 'block' }}
              initial={{ rotateX: 15, y: 30, opacity: 0 }}
              whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.05 }}
            >
              Intelligent systems
            </motion.span>
            <motion.span
              style={{ display: 'block' }}
              initial={{ rotateX: 15, y: 30, opacity: 0 }}
              whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              for every challenge
            </motion.span>
          </motion.h2>

          <motion.p
            className="services-subtext"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            From automation to AI — we build systems that elevate your business performance.
          </motion.p>
        </motion.div>

        {/* Cards appear one by one */}
        <div className="services-grid">
          {services.map((service, index) => (
            <ScrollCard
              key={service.id}
              service={service}
              index={index}
              progress={scrollYProgress}
              total={services.length}
            />
          ))}
        </div>

      </motion.div>
    </section>
  )
}

/* Scroll-driven card */
function ScrollCard({ service, index, progress, total }) {
  const visibleRange = 0.85
  const step = visibleRange / total

  const start = index * step
  const mid = start + step * 0.5
  const end = start + step * 0.9

  const opacity = useTransform(progress, [start, mid, end], [0, 1, 1])
  const y = useTransform(progress, [start, mid], [60, 0])
  const scale = useTransform(progress, [start, mid], [0.95, 1])
  const rotateX = useTransform(progress, [start, mid], [15, 0])

  return (
    <motion.div
      style={{ opacity, y, scale, rotateX }}
      className="service-card"
    >
      <div className="service-thumbnail">
        <span className="service-icon">{service.icon}</span>
      </div>

      <div className="service-body">
        <span className="service-category">{service.category}</span>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-excerpt">{service.description}</p>

        <div className="service-tags">
          {service.tags.map(tag => (
            <span key={tag} className="service-tag-pill">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Services