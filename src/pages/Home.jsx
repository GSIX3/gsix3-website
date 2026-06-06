import { lazy, Suspense } from 'react'

const Hero = lazy(() => import('../components/Hero'))

function Home() {
  return (
    <section id="home">
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Hero />
      </Suspense>
    </section>
  )
}

export default Home
