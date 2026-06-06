import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../lib/motion'
import './PageTransition.css'

let triggerTransition = null

export function usePageTransition() {
  return useCallback((callback) => {
    if (triggerTransition) triggerTransition(callback)
    else callback()
  }, [])
}

function PageTransition() {
  const [active, setActive] = useState(false)
  const [pendingCallback, setPendingCallback] = useState(null)

  useEffect(() => {
    triggerTransition = (callback) => {
      setActive(true)
      setPendingCallback(() => callback)
    }
    return () => { triggerTransition = null }
  }, [])

  const handleAnimationComplete = () => {
    if (pendingCallback) {
      pendingCallback()
      setPendingCallback(null)
    }
    setTimeout(() => setActive(false), 400)
  }

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="page-transition"
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: [0, 1, 1], originY: [0, 0, 1] }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.7, times: [0, 0.45, 1], ease: EASE }}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </AnimatePresence>
  )
}

export default PageTransition
