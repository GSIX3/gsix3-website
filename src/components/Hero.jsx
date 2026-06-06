import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue,useMotionTemplate } from 'framer-motion'
import MagneticButton from './MagneticButton'
import HeroScene from './HeroScene'
import './Hero.css'

const stats = [
  { value: '50+', label: 'Systems Built' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Performance' },
  { value: '3x', label: 'Efficiency Gain' },
]

function Hero() {
  const heroRef = useRef()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Scroll animations
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const blur = useTransform(scrollYProgress, [0, 1], [0, 10])

  const blurFilter = useMotionTemplate`blur(${blur}px)`

  // Mouse interaction
  const mouseX = useMotionValue(0)

  const handleMouseMove = (e) => {
    const { innerWidth } = window
    mouseX.set((e.clientX - innerWidth / 2) / 25)
  }

  const letters = "GSIX3".split("")



  return (
    <div className="hero" ref={heroRef} onMouseMove={handleMouseMove}>

      {/* 3D Scene */}
      <motion.div
        className="hero-scene"
        style={{ x: mouseX, y: sceneY, opacity }}
      >
        <HeroScene />
      </motion.div>

      {/* Glow */}
      <motion.div className="hero-glow" style={{ y: sceneY }} />
      <div className="hero-glow hero-glow--2" />

      {/* Content */}
      <motion.div
        className="hero-content"
        style={{
          opacity,
          filter: `blurFilter`
        }}
      >

        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          FEEL THE POWER OF REAL PROBLEM SOLVING SOLUTIONS
        </div>

        {/* Title */}
        <motion.h1 className="hero-title" style={{ y: titleY }}>
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: i * 0.08,
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p className="hero-eyebrow" style={{ y: contentY }}>
          Building Tomorrow's Digital Reality
        </motion.p>

        {/* Description */}
        <motion.p className="hero-description" style={{ y: contentY }}>
          We transform manual, repetitive workflows into intelligent automated
          systems — combining AI, custom software, and automation to help
          businesses scale faster and smarter.
        </motion.p>

        {/* Buttons */}
        <motion.div className="hero-buttons" style={{ y: contentY }}>
          <MagneticButton href="#services" className="btn-primary">
            Explore Our Systems
          </MagneticButton>

          <MagneticButton href="#contact" className="btn-outline">
            Book a Free Consultation
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div className="hero-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <span className="hero-stat-value">{stat.value}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  )
}

export default Hero
