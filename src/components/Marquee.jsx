import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import './Marquee.css'

const items = [
  'Business Automation',
  'AI Integration',
  'Smart Systems',
  'Data Analytics',
  'CRM Pipelines',
  'Web Applications',
  'Predictive AI',
  'Workflow Design',
]

function Marquee() {
  const trackRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 28,
        ease: 'linear',
      })
    })
    return () => ctx.revert()
  }, [])

  // Double the items so the seamless loop works at -50%
  const doubled = [...items, ...items]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-sep">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
