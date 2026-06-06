import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const RANGE = 80
const STRENGTH = 0.35

function MagneticButton({ children, className = '', onClick, href, as: Tag = 'div' }) {
  const ref = useRef()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.6 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < RANGE) {
      rawX.set(dx * STRENGTH)
      rawY.set(dy * STRENGTH)
    }
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  const props = {
    ref,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    style: { x, y, display: 'inline-block' },
  }

  if (href) {
    return (
      <motion.a href={href} {...props}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.div {...props} role="button" tabIndex={0}>
      {children}
    </motion.div>
  )
}

export default MagneticButton
