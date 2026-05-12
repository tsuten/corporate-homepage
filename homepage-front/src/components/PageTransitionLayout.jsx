import { motion } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useLayoutEffect, useRef, useState } from 'react'
import Footer from './Footer'
import About from '../pages/About'
import Index from '../pages/Index'
import Services from '../pages/Services'

const FADE_DURATION = 0.28

function locationsDiffer(a, b) {
  return a.pathname !== b.pathname || a.search !== b.search || a.key !== b.key
}

export default function PageTransitionLayout() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)

  const needsFadeOut = locationsDiffer(location, displayLocation)

  const prevCommittedPathRef = useRef(null)

  useLayoutEffect(() => {
    if (locationsDiffer(location, displayLocation)) {
      return
    }
    if (prevCommittedPathRef.current === null) {
      prevCommittedPathRef.current = displayLocation.pathname
      return
    }
    if (displayLocation.pathname !== prevCommittedPathRef.current) {
      window.scrollTo(0, 0)
      prevCommittedPathRef.current = displayLocation.pathname
    }
  }, [location, displayLocation])

  return (
    <motion.div
      className="flex w-full min-h-0 flex-1 flex-col"
      initial={false}
      animate={{ opacity: needsFadeOut ? 0 : 1 }}
      transition={{ duration: FADE_DURATION, ease: [0.4, 0, 0.2, 1] }}
      onAnimationComplete={() => {
        if (locationsDiffer(location, displayLocation)) {
          setDisplayLocation(location)
        }
      }}
    >
      <div className="flex min-h-0 w-full flex-1 flex-col">
        <Routes location={displayLocation}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </div>
      <Footer />
    </motion.div>
  )
}
