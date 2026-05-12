import { ArrowRight } from 'lucide-react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { services } from '../data/Services'

const heroLayoutId = (title) => `service-hero-${title}`

const frameLayoutId = (title) => `service-frame-${title}`

/** Soft ease-out — used for all motion transitions */
const easeOutSoft = [0.15, 1, 0.5, 1]

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.32,
      delayChildren: 0.22,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.12, ease: easeOutSoft },
  },
}

const arrowLoopAnimate = {
  x: [0, 18, -14, 0],
  opacity: [1, 0, 0, 1],
}

const arrowLoopTransition = {
  duration: 2.35,
  repeat: Infinity,
  repeatDelay: 0.48,
  times: [0, 0.32, 0.36, 1],
  ease: ['easeOut', 'easeOut', 'easeOut'],
}

const Services = () => {
  const [selected, setSelected] = useState(null)
  const reduceMotion = useReducedMotion()

  const layoutTransition = reduceMotion
    ? { duration: 0.05 }
    : {
        type: 'tween',
        duration: 0.56,
        ease: easeOutSoft,
      }

  const titleFadeTransition = reduceMotion
    ? { duration: 0.05 }
    : { duration: 0.4, ease: easeOutSoft, delay: 0.12 }

  const titleExitTransition = reduceMotion ? { duration: 0.05 } : { duration: 0.32, ease: easeOutSoft }

  const backdropTransition = reduceMotion ? { duration: 0.05 } : { duration: 0.48, ease: easeOutSoft }

  const overlayHoldTransition = reduceMotion
    ? { duration: 0.05 }
    : { duration: 0.34, ease: easeOutSoft }

  const bodyCopyTransition = reduceMotion
    ? { duration: 0.05 }
    : {
        duration: 0.48,
        ease: easeOutSoft,
        delay: 0.1,
      }

  useEffect(() => {
    if (!selected) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selected])

  useEffect(() => {
    if (!selected) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [selected])

  return (
    <LayoutGroup>
      <section id="services" className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight text-zinc-900 text-start">Services</h1>
        <p className="mb-6 text-sm text-zinc-600 text-start pb-8">私たちは、最先端のプログラム開発、確かな技術に基づく建設業務、そして迅速かつ安全な輸送業務を軸に、多角的なサービスを展開しています。<br />デジタルの仕組みから物理的なインフラ、そしてそれらをつなぐ物流までをワンストップで提供することで、お客様のビジネスの可能性を広げ、より豊かな社会の実現に貢献します。</p>
        <motion.ul
          className="mx-auto grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => {
            const isOpen = selected?.title === service.title
            return (
              <motion.li key={service.title} variants={cardVariants}>
                <button
                  type="button"
                  className="group w-full cursor-pointer border-0 bg-transparent p-0 text-left transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
                  onClick={() => setSelected(service)}
                  aria-haspopup="dialog"
                >
                  <motion.div
                    layoutId={frameLayoutId(service.title)}
                    className="w-full overflow-hidden rounded-xl bg-white shadow-sm"
                    style={{ visibility: isOpen ? 'hidden' : 'visible' }}
                    transition={layoutTransition}
                  >
                    <article className="flex h-full flex-col">
                      <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-zinc-100">
                        <motion.div
                          layoutId={heroLayoutId(service.title)}
                          className="absolute inset-0 overflow-hidden rounded-xl bg-zinc-900 will-change-transform [transform:translateZ(0)]"
                          transition={layoutTransition}
                        >
                          <img
                            src={service.image}
                            alt=""
                            aria-hidden
                            decoding="async"
                            className="h-full w-full object-cover object-center [backface-visibility:hidden]"
                          />
                        </motion.div>
                        {!isOpen && (
                          <div
                            className="pointer-events-none absolute inset-0 z-1 bg-linear-to-b from-black/65 via-black/15 to-transparent"
                            aria-hidden
                          />
                        )}
                        <h2 className="pointer-events-none absolute left-0 top-0 z-10 max-w-[85%] p-4 text-left text-lg font-semibold tracking-tight text-white drop-shadow-md sm:p-5 sm:text-xl">
                          {service.title}
                        </h2>
                        {!isOpen && (
                          <div
                            className="pointer-events-none absolute bottom-0 right-0 z-20 translate-y-1 p-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:p-5"
                            aria-hidden
                          >
                            <motion.span
                              className="inline-flex will-change-transform"
                              animate={arrowLoopAnimate}
                              transition={arrowLoopTransition}
                            >
                              <ArrowRight className="size-7 text-white drop-shadow-md sm:size-8" strokeWidth={2} />
                            </motion.span>
                          </div>
                        )}
                      </div>
                    </article>
                  </motion.div>
                </button>
              </motion.li>
            )
          })}
        </motion.ul>
      </section>

      {createPortal(
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.title}
              role="presentation"
              className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center p-3 sm:p-6"
              initial={false}
              exit={{ opacity: 1 }}
              transition={overlayHoldTransition}
              onClick={() => setSelected(null)}
            >
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-black/55"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={backdropTransition}
              />
              <div className="pointer-events-none relative z-[101] w-full max-w-[min(96vw,56rem)]">
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
                      className="absolute inset-0 overflow-hidden rounded-xl bg-zinc-900 will-change-transform [transform:translateZ(0)]"
                      transition={layoutTransition}
                      initial={false}
                    >
                      <img
                        src={selected.image}
                        alt={selected.title}
                        decoding="async"
                        className="h-full w-full object-cover object-center [backface-visibility:hidden]"
                      />
                    </motion.div>
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[min(100%,560px)] bg-linear-to-t from-black/92 via-black/50 to-transparent sm:h-[min(100%,620px)]"
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
      )}
    </LayoutGroup>
  )
}

export default Services
