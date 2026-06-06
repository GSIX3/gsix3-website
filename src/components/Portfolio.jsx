import { motion } from 'framer-motion'
import { EASE, sectionHeader, fadeUp, gridContainer, cardEntrance } from '../lib/motion'
import projects from '../data/portfolio'
import './Portfolio.css'

const hoverTransition = { duration: 0.25, ease: EASE }

function PortfolioCard({ project }) {
  return (
    <motion.div variants={cardEntrance}>
      <motion.article
        className="portfolio-card"
        whileHover={{ y: -10 }}
        transition={hoverTransition}
      >
        {/* Coloured thumbnail */}
        <div className="portfolio-thumbnail" style={{ background: project.thumbColor }}>
          <span className="portfolio-emoji">{project.emoji}</span>
        </div>

        {/* Card body */}
        <div className="portfolio-body">
          <div className="portfolio-meta">
            <span className="portfolio-category">{project.category}</span>
          </div>
          <h3 className="portfolio-title">{project.title}</h3>
          <p className="portfolio-excerpt">{project.description}</p>
          <div className="portfolio-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="portfolio-tag-pill">{tag}</span>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

function Portfolio() {
  return (
    <div className="portfolio-inner">
      <motion.div
        className="portfolio-header"
        variants={sectionHeader}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.span className="portfolio-tag" variants={fadeUp}>
          Portfolio
        </motion.span>
        <motion.h2 className="portfolio-heading" variants={fadeUp}>
          Systems we've shipped
        </motion.h2>
        <motion.p className="portfolio-subtext" variants={fadeUp}>
          Real-world automation and AI systems built for clients across
          industries — from retail to healthcare to finance.
        </motion.p>
      </motion.div>

      <motion.div
        className="portfolio-grid"
        variants={gridContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {projects.map((project) => (
          <PortfolioCard key={project.id} project={project} />
        ))}
      </motion.div>
    </div>
  )
}

export default Portfolio
