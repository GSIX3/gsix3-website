import { lazy, Suspense } from 'react'

const PortfolioSection = lazy(() => import('../components/Portfolio'))

function Portfolio() {
  return (
    <section id="portfolio">
      <Suspense fallback={<div style={{ minHeight: '600px' }} />}>
        <PortfolioSection />
      </Suspense>
    </section>
  )
}

export default Portfolio
