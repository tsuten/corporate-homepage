import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'motion/react'
import BreadCrumb from '../components/BreadCrumb'
import SpecificPageLayout from '../components/SpecificPageLayout'
import { services } from '../data/Services'
import { ContactForm } from '../components/ContactForm'

const stats = [
  { label: '満足度', kind: 'simple', to: 99, suffix: '%', digits: 'ascii' },
  { label: '案件数', kind: 'simple', to: 150, suffix: '件+', digits: 'ascii' },
  { label: '総売上', kind: 'revenue' },
]

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}

function toFullWidthDigits(num) {
  return String(num)
    .split('')
    .map((ch) => {
      const code = ch.charCodeAt(0)
      if (code >= 48 && code <= 57) return String.fromCharCode(0xff10 + (code - 48))
      return ch
    })
    .join('')
}

function RunningRevenueStatNumber({ delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.35 })
  const prefersReducedMotion = usePrefersReducedMotion()
  const [amount, setAmount] = useState(0)
  const [unitSuffix, setUnitSuffix] = useState('万円')

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return

    let cancelled = false
    const controlsList = []

    const stages = [
      { max: 999, unit: '万円', duration: 0.2, ease: 'linear' },
      { max: 99, unit: '億円', duration: 0.5, ease: 'linear' },
      { max: 3, unit: '兆円', duration: 1.05, ease: [0.22, 1, 0.36, 1] },
    ]

    const runStage = (i) => {
      if (cancelled || i >= stages.length) return
      const s = stages[i]
      const ctrl = animate(0, s.max, {
        duration: s.duration,
        ease: s.ease,
        delay: i === 0 ? delay : 0,
        onUpdate: (latest) => {
          if (cancelled) return
          setAmount(Math.round(latest))
          setUnitSuffix(s.unit)
        },
        onComplete: () => {
          if (cancelled) return
          runStage(i + 1)
        },
      })
      controlsList.push(ctrl)
    }

    runStage(0)

    return () => {
      cancelled = true
      controlsList.forEach((c) => c.stop())
    }
  }, [isInView, delay, prefersReducedMotion])

  const displayAmount = isInView && prefersReducedMotion ? 3 : amount
  const displayUnit = isInView && prefersReducedMotion ? '兆円' : unitSuffix

  const numericText = toFullWidthDigits(displayAmount)

  return (
    <motion.span
      ref={ref}
      className="text-3xl font-bold tabular-nums tracking-tight text-zinc-900 sm:text-4xl md:text-[2.75rem] md:leading-none"
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : delay,
      }}
    >
      {numericText}
      {displayUnit}
    </motion.span>
  )
}

function RunningStatNumber({ to, suffix, digits, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.35 })
  const prefersReducedMotion = usePrefersReducedMotion()
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return

    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      delay,
      onUpdate: (latest) => setAnimated(Math.round(latest)),
    })
    return () => controls.stop()
  }, [isInView, to, delay, prefersReducedMotion])

  const display = isInView && prefersReducedMotion ? to : animated

  const numericText = digits === 'fullwidth' ? toFullWidthDigits(display) : String(display)

  return (
    <motion.span
      ref={ref}
      className="text-3xl font-bold tabular-nums tracking-tight text-zinc-900 sm:text-4xl md:text-[2.75rem] md:leading-none"
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : delay,
      }}
    >
      {numericText}
      {suffix}
    </motion.span>
  )
}

const servicesBreadcrumbItems = [
  { label: 'ホーム', to: '/' },
  { label: 'サービス' },
]

const Services = () => {
  return (
    <SpecificPageLayout
      title="Services"
      breadcrumb={<BreadCrumb items={servicesBreadcrumbItems} />}
    >
      <div className="flex flex-col gap-8 px-8 pb-8">
        {services.map((service, index) => {
          const isOddRow = index % 2 === 0
          const imageOrder = isOddRow ? 'order-1' : 'order-2'
          const textOrder = isOddRow ? 'order-2' : 'order-1'

          return (
            <article
              key={service.title}
              className="grid grid-cols-1 items-center gap-12 md:grid-cols-2"
            >
              <div
                className={`relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-100 ${imageOrder}`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className={`flex w-full flex-col gap-3 ${textOrder} items-start`}>
                <h2
                  className={`text-4xl font-semibold tracking-tight text-zinc-900 ${isOddRow ? 'text-start' : 'text-end'}`}
                >
                  {service.title}
                </h2>
                <p className="text-md leading-relaxed text-zinc-600 text-start">{service.description}</p>
              </div>
            </article>
          )
        })}

        <section
          aria-label="実績指標"
          className="grid grid-cols-1 border-t border-zinc-200 pt-8 sm:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-2 text-center bg-zinc-100 py-16 rounded-xl"
            >
              <span className="text-sm font-medium text-zinc-600">{stat.label}</span>
              {stat.kind === 'revenue' ? (
                <RunningRevenueStatNumber delay={index * 0.14} />
              ) : (
                <RunningStatNumber
                  to={stat.to}
                  suffix={stat.suffix}
                  digits={stat.digits}
                  delay={index * 0.14}
                />
              )}
            </div>
          ))}
        </section>
        <ContactForm />
      </div>
    </SpecificPageLayout>
  )
}

export default Services
