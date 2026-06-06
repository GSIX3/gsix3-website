import { useEffect, useRef } from 'react'
import './Starfield.css'

const STAR_COUNT = 180

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

export default function Starfield() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    // Build star data once
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),          // 0–1 of canvas width
      y: Math.random(),          // 0–1 of canvas height
      r: randomBetween(0.4, 1.4),
      alpha: randomBetween(0.2, 0.9),
      speed: randomBetween(0.00008, 0.0003), // twinkle speed
      phase: Math.random() * Math.PI * 2,   // twinkle phase offset
    }))

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let t = 0
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 1

      for (const s of stars) {
        // Gentle twinkle: alpha oscillates ±30 % around its base value
        const twinkle = Math.sin(t * s.speed * 400 + s.phase) * 0.3
        const a = Math.min(1, Math.max(0, s.alpha + twinkle))

        ctx.beginPath()
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 200, 255, ${a})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
}
