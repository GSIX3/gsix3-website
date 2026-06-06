import { motion } from 'framer-motion'
import { EASE, sectionHeader, fadeUp, gridContainer, cardEntrance } from '../lib/motion'
import posts from '../data/blog'
import './Blog.css'

const hoverTransition = { duration: 0.25, ease: EASE }

function BlogCard({ post }) {
  return (
    <motion.div variants={cardEntrance}>
      <motion.article
        className="blog-card"
        whileHover={{ y: -10 }}
        transition={hoverTransition}
      >
        <div className="blog-thumbnail" style={{ background: post.bgColor }}>
          <span className="blog-emoji">{post.emoji}</span>
        </div>

        <div className="blog-body">
          <div className="blog-meta">
            <span className="blog-category">{post.category}</span>
            <span className="blog-date">{post.date}</span>
          </div>
          <h3 className="blog-title">{post.title}</h3>
          <p className="blog-excerpt">{post.excerpt}</p>
        </div>
      </motion.article>
    </motion.div>
  )
}

function Blog() {
  return (
    <div className="blog-inner">
      <motion.div
        className="blog-header"
        variants={sectionHeader}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.span className="blog-tag" variants={fadeUp}>
          Blog
        </motion.span>
        <motion.h2 className="blog-heading" variants={fadeUp}>
          Insights on automation & AI
        </motion.h2>
        <motion.p className="blog-subtext" variants={fadeUp}>
          Practical thinking on how businesses can work smarter, move faster,
          and grow without adding unnecessary complexity.
        </motion.p>
      </motion.div>

      <motion.div
        className="blog-grid"
        variants={gridContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </motion.div>
    </div>
  )
}

export default Blog
