import { landingGalleryImages } from '../data/landingGalleryImages.js'

/** Paths served from `public/` (same as in Landing and gallery). */
export const LANDING_VIDEO_SRC = '/videos/landing-background.mp4'
export const LANDING_VIDEO_POSTER = '/img/landing_video_thumb.png'

export const ASSET_PRELOAD_TIMEOUT_MS = 12_000

function preloadImage(src) {
  return new Promise((resolve) => {
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      resolve()
    }
    const img = new Image()
    img.addEventListener('load', finish, { once: true })
    img.addEventListener('error', finish, { once: true })
    img.src = src
    if (img.complete) finish()
  })
}

function preloadVideo(src) {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.muted = true
    video.playsInline = true
    video.preload = 'auto'

    const finish = () => {
      video.removeAttribute('src')
      video.load()
      resolve()
    }

    video.addEventListener('canplaythrough', finish, { once: true })
    video.addEventListener('error', finish, { once: true })
    video.src = src
    video.load()
    if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) finish()
  })
}

/**
 * Warms HTTP cache for the landing hero and splide images so the real <video>/<img>
 * nodes can skip the poster flash and pop-in. Races with timeout in the caller.
 */
export function preloadCriticalAssets() {
  return Promise.all([
    preloadVideo(LANDING_VIDEO_SRC),
    preloadImage(LANDING_VIDEO_POSTER),
    ...landingGalleryImages.map((item) => preloadImage(item.src)),
  ])
}
