import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { EASE } from '../lib/motion'

function ScrollReveal({ children, delay = 0, className = '', zoom = true }) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30, scale: zoom ? 1.08 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      style={zoom ? { scale, opacity } : { opacity }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal