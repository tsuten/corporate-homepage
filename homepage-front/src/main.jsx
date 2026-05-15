import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import './index.css'
import App from './App.jsx'
import {
  ASSET_PRELOAD_TIMEOUT_MS,
  preloadCriticalAssets,
} from './utils/preloadCriticalAssets.js'

const MIN_LOADING_MS = 1000
const FADE_DURATION = 0.28
const FADE_EASE = [0.4, 0, 0.2, 1]

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function initializeApp() {
  await Promise.race([
    preloadCriticalAssets(),
    delay(ASSET_PRELOAD_TIMEOUT_MS),
  ])
}

function InitialLoadGate({ children }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      await Promise.all([delay(MIN_LOADING_MS), initializeApp()])
      if (!cancelled) setReady(true)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {!ready ? (
        <motion.div
          key="loading"
          className="flex min-h-svh w-full flex-col items-center justify-center bg-[var(--bg)]"
          role="status"
          aria-live="polite"
          aria-busy="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION, ease: FADE_EASE }}
        >
          <div
            className="size-9 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--primary)]"
            aria-hidden
          />
          <span className="sr-only">読み込み中</span>
        </motion.div>
      ) : (
        <motion.div
          key="app"
          className="flex min-h-svh w-full flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FADE_DURATION, ease: FADE_EASE }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

createRoot(document.getElementById('root')).render(
  <InitialLoadGate>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </InitialLoadGate>
)
