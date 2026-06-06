import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Marquee from './components/Marquee'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import GrainOverlay from './components/GrainOverlay'
import PageTransition from './components/PageTransition'
import Starfield from './components/Starfield'
import About from './pages/About'
import Services from './pages/Services'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Portfolio from './pages/Portfolio'
import { useLenis } from './hooks/useLenis'

const Home = lazy(() => import('./pages/Home'))

function App() {
  useLenis()

  return (
    <>
      <Starfield />
      <Cursor />
      <GrainOverlay />
      <PageTransition />
      <Navbar />
      <main className="app">
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Home />
        </Suspense>
        <Marquee />
        <About />
        <Services />
        <Portfolio />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
