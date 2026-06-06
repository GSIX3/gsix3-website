import { motion } from 'framer-motion'
import { EASE, cardEntrance } from '../lib/motion'

const cardVariants = {
  rest: { y: 0, transition: { duration: 0.25, ease: EASE } },
  hovered: { y: -10, transition: { duration: 0.25, ease: EASE } },
}

const lineVariants = {
  rest: { scaleX: 0, opacity: 0 },
  hovered: { scaleX: 1, opacity: 1, transition: { duration: 0.3, ease: EASE } },
}

function ServiceCard({ service }) {
  return (
    <motion.div variants={cardEntrance}>
      <motion.article
        className="service-card"
        variants={cardVariants}
        initial="rest"
        animate="rest"
        whileHover="hovered"
      >
        {/* Gradient line revealed by propagated "hovered" variant */}
        <motion.div className="card-accent-line" variants={lineVariants} />

        <div className="card-icon">{service.icon}</div>
        <h3 className="card-title">{service.title}</h3>
        <p className="card-desc">{service.description}</p>

        <div className="card-tags">
          {service.tags.map((tag) => (
            <span key={tag} className="card-tag">
              {tag}
            </span>
          ))}
        </div>
      </motion.article>
    </motion.div>
  )
}

export default ServiceCard
