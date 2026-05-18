import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { createPortal } from 'react-dom'

const heroLayoutId = (title) => `service-hero-${title}`
const frameLayoutId = (title) => `service-frame-${title}`

const easeOutSoft = [0.15, 1, 0.5, 1]

/**
 * @param {{ selected: object|null, onClose: () => void, layoutTransition: object }} props
 */
const ServiceModal = ({ selected, onClose, layoutTransition }) => {
  const reduceMotion = useReducedMotion()

  const titleFadeTransition = reduceMotion
    ? { duration: 0.05 }
    : { duration: 0.4, ease: easeOutSoft, delay: 0.12 }

  const titleExitTransition = reduceMotion
    ? { duration: 0.05 }
    : { duration: 0.32, ease: easeOutSoft }

  const backdropTransition = reduceMotion
    ? { duration: 0.05 }
    : { duration: 0.48, ease: easeOutSoft }

  const overlayHoldTransition = reduceMotion
    ? { duration: 0.05 }
    : { duration: 0.34, ease: easeOutSoft }

  const bodyCopyTransition = reduceMotion
    ? { duration: 0.05 }
    : { duration: 0.48, ease: easeOutSoft, delay: 0.1 }

  return createPortal(
    <AnimatePresence>
      {selected && (
        <motion.div
          key={selected.title}
          role="presentation"
          className="fixed inset-0 z-100 flex cursor-pointer items-center justify-center p-3 sm:p-6"
          initial={false}
          exit={{ opacity: 1 }}
          transition={overlayHoldTransition}
          onClick={onClose}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
          />
          <div className="pointer-events-none relative z-101 w-full max-w-[min(96vw,56rem)]">
            <motion.article
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
              aria-describedby="service-modal-description"
              layoutId={frameLayoutId(selected.title)}
              transition={layoutTransition}
              className="pointer-events-auto relative w-full cursor-pointer overflow-hidden rounded-xl bg-zinc-900 shadow-2xl"
              initial={false}
            >
              <div className="relative aspect-video w-full max-h-[min(88vh,860px)] min-h-[200px] bg-zinc-900">
                <motion.div
                  layoutId={heroLayoutId(selected.title)}
                  className="absolute inset-0 overflow-hidden rounded-xl bg-zinc-900 will-change-transform transform-[translateZ(0)]"
                  transition={layoutTransition}
                  initial={false}
                >
                  <img
                    src={selected.image}
                    alt={selected.title}
                    decoding="async"
                    className="h-full w-full object-cover object-center backface-hidden"
                  />
                </motion.div>
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-[min(100%,560px)] bg-linear-to-t from-black/92 via-black/50 to-transparent sm:h-[min(100%,620px)]"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 z-10 flex max-h-[min(75vh,88%)] flex-col justify-end gap-2.5 overflow-hidden px-5 pb-6 pt-16 sm:gap-3 sm:px-8 sm:pb-8 sm:pt-24">
                  <motion.h2
                    id="service-modal-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: titleExitTransition }}
                    transition={titleFadeTransition}
                    className="pointer-events-auto shrink-0 text-left text-2xl font-semibold tracking-tight text-white drop-shadow-md sm:text-3xl"
                  >
                    {selected.title}
                  </motion.h2>
                  <motion.p
                    id="service-modal-description"
                    initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 3, transition: titleExitTransition }}
                    transition={bodyCopyTransition}
                    className="pointer-events-auto max-h-[min(38vh,300px)] overflow-y-auto overscroll-contain text-left text-sm leading-relaxed text-white/90 [scrollbar-color:rgba(255,255,255,0.35)_transparent] [scrollbar-width:thin] sm:max-h-[min(42vh,340px)] sm:text-base"
                  >
                    {selected.description}
                  </motion.p>
                </div>
              </div>
            </motion.article>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default ServiceModal
