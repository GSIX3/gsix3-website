import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import LaptopImg from '../assets/Laptop.png'
import './About.css'

const pillars = [
  { icon: '⚡', title: 'Automate Work', desc: 'Run repetitive tasks automatically, 24/7.' },
  { icon: '📊', title: 'Real-Time Insights', desc: 'Live dashboards for faster decisions.' },
  { icon: '💰', title: 'Reduce Costs', desc: 'Replace manual processes with efficient systems.' },
  { icon: '🚀', title: 'Scale Easily', desc: 'Systems that grow seamlessly with your business.' },
]

function About() {
  const sectionRef = useRef()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  // ── Laptop animations
  const laptopScale = useTransform(scrollYProgress, [0, 0.5], [2.2, 1])
  const laptopX = useTransform(scrollYProgress, [0, 0.5], ['50%', '0%'])
  const laptopY = useTransform(scrollYProgress, [0, 0.5], ['10%', '0%'])
  const laptopRotateX = useTransform(scrollYProgress, [0, 0.5], [10, 0])
  const laptopOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1])

  // ── Heading & paragraph fade-in after laptop zooms
  const headingOpacity = useSpring(useTransform(laptopScale, [1.3, 1], [0, 1]), { stiffness: 80, damping: 20 })
  const headingY = useSpring(useTransform(laptopScale, [1.3, 1], [30, 0]), { stiffness: 80, damping: 20 })

  // ── Pillars staggered reveal, each after previous one
  const pillarOpacities = pillars.map((_, i) =>
    useSpring(
      useTransform(scrollYProgress, [0.55 + i * 0.08, 0.8 + i * 0.08], [0, 10], { clamp: true }),
      { stiffness: 60, damping: 25 }
    )
  )
  const pillarYs = pillars.map((_, i) =>
    useSpring(
      useTransform(scrollYProgress, [0.55 + i * 0.08, 0.8 + i * 0.08], [0, 0], { clamp: true }),
      { stiffness: 60, damping: 25 }
    )
  )

  return (
    <section ref={sectionRef} className="about-section">
      <div className="about-sticky">
        <div className="about-layout">

          {/* Left: Laptop */}
          <div className="about-left">
            <motion.div
              className="laptop-scene"
              style={{
                scale: laptopScale,
                x: laptopX,
                y: laptopY,
                rotateX: laptopRotateX,
                opacity: laptopOpacity,
              }}
            >
              <img src={LaptopImg} alt="GSIX3 platform" className="laptop-img" draggable={false} />
            </motion.div>

            <motion.div className="depth-dots" style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-25%']) }}>
              <span className="depth-dot depth-dot-a" />
              <span className="depth-dot depth-dot-b" />
              <span className="depth-dot depth-dot-c" />
            </motion.div>
          </div>

          {/* Right: Text */}
          <motion.div className="about-content">
            <motion.span className="section-tag" style={{ opacity: headingOpacity, y: headingY }}>
              Who We Are
            </motion.span>
            <motion.h2 className="about-heading">
              <motion.span style={{ display: 'block', opacity: headingOpacity, y: headingY }}>
                Innovation with Power.
              </motion.span>
              <motion.span style={{ display: 'block', opacity: headingOpacity, y: headingY }}>
                Engineered with Quality
              </motion.span>
            </motion.h2>
            <motion.p className="about-para" style={{ opacity: headingOpacity, y: headingY }}>
              GSIX3 builds AI-powered automation systems to save time, reduce errors, and boost efficiency.
            </motion.p>

            <div className="about-pillars">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  className="pillar-card"
                  style={{ opacity: pillarOpacities[i], y: pillarYs[i] }}
                >
                  <span className="pillar-icon">{pillar.icon}</span>
                  <strong className="pillar-title">{pillar.title}</strong>
                  <p className="pillar-desc">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default About