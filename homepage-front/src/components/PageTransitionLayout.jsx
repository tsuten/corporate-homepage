import { motion } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useLayoutEffect, useRef, useState } from 'react'
import Footer from './Footer'
import About from '../pages/About'
import Index from '../pages/Index'
import Services from '../pages/Services'
import Announcement from '../pages/Announcement'
import Recruitment from '../pages/Recruitment'

const FADE_DURATION = 0.28

function locationsDiffer(a, b) {
  return a.pathname !== b.pathname || a.search !== b.search || a.key !== b.key
}

/** @param {string} hash */
function scrollToHashTarget(hash) {
  const id = hash.replace(/^#/, '')
  if (!id) return false
  const el = document.getElementById(decodeURIComponent(id))
  if (!el) return false
  el.scrollIntoView({ block: 'start', behavior: 'auto' })
  return true
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

    const hash = displayLocation.hash

    if (prevCommittedPathRef.current === null) {
      prevCommittedPathRef.current = displayLocation.pathname
      if (hash) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => scrollToHashTarget(hash))
        })
      }
      return
    }

    const pathChanged = displayLocation.pathname !== prevCommittedPathRef.current

    if (pathChanged) {
      prevCommittedPathRef.current = displayLocation.pathname
      if (hash) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => scrollToHashTarget(hash))
        })
      } else {
        window.scrollTo(0, 0)
      }
      return
    }

    if (hash) {
      scrollToHashTarget(hash)
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
          <Route path="/about-us" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/announcements" element={<Announcement />} />
          <Route path="/recruitment" element={<Recruitment />} />
        </Routes>
      </div>
      <Footer />
    </motion.div>
  )
}
