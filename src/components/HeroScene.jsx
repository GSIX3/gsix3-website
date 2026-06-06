import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Main stars
function Stars({ count = 600 }) {
  const ref = useRef()

  // Create a circular star texture
  const starTexture = useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    // Draw radial gradient circle
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    )
    gradient.addColorStop(0, 'white')
    gradient.addColorStop(0.2, 'white')
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.6)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    const texture = new THREE.CanvasTexture(canvas)
    return texture
  }, [])

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const pos = ref.current.geometry.attributes.position.array
    for (let i = 0; i < pos.length; i += 3) {
      pos[i + 1] += Math.sin(t + pos[i]) * 0.001
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y = t * 0.01
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={starTexture}  // Use circular texture
        size={0.08}        // Slightly bigger for visibility
        color="#ffffff"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// Shooting stars
function ShootingStars({ count = 2 }) {
  const starsRef = useRef([])
  const meshRef = useRef()

  // Initialize empty stars
  useEffect(() => {
    const interval = setInterval(() => {
      for (let i = 0; i < count; i++) {
        starsRef.current.push({
          pos: [
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 15 + 5,
            (Math.random() - 0.5) * 20,
          ],
          vel: [
            (Math.random() - 0.3) * 0.03,
            -Math.random() * 0.03 - 0.01,
            0,
          ],
          life: 0,
        })
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [count])

  // Pre-allocate buffer once
  const positions = useMemo(() => new Float32Array(count * 6), [count])

  useFrame(() => {
    const stars = starsRef.current
    let aliveCount = 0

    stars.forEach((star) => {
      star.pos[0] += star.vel[0]
      star.pos[1] += star.vel[1]
      star.pos[2] += star.vel[2]
      star.life += 0.01

      if (star.life < 1) {
        positions[aliveCount * 6] = star.pos[0]
        positions[aliveCount * 6 + 1] = star.pos[1]
        positions[aliveCount * 6 + 2] = star.pos[2]

        positions[aliveCount * 6 + 3] = star.pos[0] - star.vel[0] * 20
        positions[aliveCount * 6 + 4] = star.pos[1] - star.vel[1] * 20
        positions[aliveCount * 6 + 5] = star.pos[2] - star.vel[2] * 20

        aliveCount++
      }
    })

    // Keep only alive stars
    starsRef.current = stars.filter((s) => s.life < 1)

    if (meshRef.current) {
      meshRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions.slice(0, aliveCount * 6), 3)
      )
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <lineSegments ref={meshRef}>
      <bufferGeometry />
      <lineBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  )
}
// Orbs
function Orb({ scale, speed }) {
  const ref = useRef()
  useFrame(({ clock, mouse }) => {
    const t = clock.elapsedTime
    ref.current.rotation.x = t * speed + mouse.y * 0.3
    ref.current.rotation.y = t * speed + mouse.x * 0.3
    ref.current.position.y = Math.sin(t * 0.5) * 0.2
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[scale, 1]} />
      <meshBasicMaterial wireframe color="#7aa3ff" transparent opacity={0.15} />
    </mesh>
  )
}

// Camera motion
function CameraMotion({ mouse }) {
  useFrame(({ camera }) => {
    camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.05
    camera.position.y += (mouse.y * 1.2 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })
  return null
}

// Scene
function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#7aa3ff" intensity={2} />
      <Stars />
      <ShootingStars />
      <Orb scale={2.4} speed={0.1} />
      <Orb scale={1.2} speed={-0.15} />
      <CameraMotion mouse={mouse} />
    </>
  )
}

// Main Canvas
export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window
    mouse.current = {
      x: (e.clientX - innerWidth / 2) / innerWidth * 2,
      y: (e.clientY - innerHeight / 2) / innerHeight * 2,
    }
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 58 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0 }}
      onMouseMove={handleMouseMove}
    >
      <Suspense fallback={null}>
        <Scene mouse={mouse.current} />
      </Suspense>
    </Canvas>
  )
}