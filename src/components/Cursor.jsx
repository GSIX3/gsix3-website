import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './Cursor.css'

function Cursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  const springConfig = { damping: 24, stiffness: 280, mass: 0.5 }
  const x = useSpring(rawX, springConfig)
  const y = useSpring(rawY, springConfig)

  useEffect(() => {
    const onMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onEnter = (e) => {
      if (
        e.target.closest('a, button, [data-cursor-hover], input, textarea, select')
      ) {
        setIsHovering(true)
      }
    }
    const onLeave = (e) => {
      if (
        e.target.closest('a, button, [data-cursor-hover], input, textarea, select')
      ) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [isVisible, rawX, rawY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <motion.div
      className={`cursor${isHovering ? ' cursor--hover' : ''}${isVisible ? ' cursor--visible' : ''}`}
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  )
}

export default Cursor
