import { useScroll, useTransform } from 'framer-motion'

/**
 * Returns a MotionValue that maps scroll progress within a target element
 * to a y-offset, creating a parallax effect.
 *
 * @param {React.RefObject} ref - ref attached to the scrollable container
 * @param {number} near - y output at scroll start (px)
 * @param {number} far  - y output at scroll end   (px)
 */
export function useParallax(ref, near = 0, far = -80) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  return useTransform(scrollYProgress, [0, 1], [near, far])
}
