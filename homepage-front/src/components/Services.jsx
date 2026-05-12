import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { services } from '../data/Services'

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
    transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
  },
}

const arrowLoopAnimate = {
  x: [0, 18, -14, 0],
  opacity: [1, 0, 0, 1],
}

const arrowLoopTransition = {
  duration: 2.1,
  repeat: Infinity,
  repeatDelay: 0.45,
  times: [0, 0.32, 0.36, 1],
  ease: ['easeOut', 'linear', 'easeInOut'],
}

const Services = () => {

  return (
    <section id="services" className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-zinc-900 text-start">Services</h1>
      <p className="mb-6 text-sm text-zinc-600 text-start pb-8">私たちは、最先端のプログラム開発、確かな技術に基づく建設業務、そして迅速かつ安全な輸送業務を軸に、多角的なサービスを展開しています。<br />デジタルの仕組みから物理的なインフラ、そしてそれらをつなぐ物流までをワンストップで提供することで、お客様のビジネスの可能性を広げ、より豊かな社会の実現に貢献します。</p>
      <motion.ul
        className="mx-auto grid max-w-6xl list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((service) => (
          <motion.li key={service.title} variants={cardVariants}>
            <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white hover:cursor-pointer hover:opacity-80 transition-opacity duration-300">
              <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-zinc-100">
                <img
                  src={service.image}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-cover object-center"
                />
                <div
                  className="pointer-events-none absolute inset-0 z-1 bg-linear-to-b from-black/65 via-black/15 to-transparent"
                  aria-hidden
                />
                <h2 className="absolute left-0 top-0 z-10 max-w-[85%] p-4 text-left text-lg font-semibold tracking-tight text-white! drop-shadow-md sm:p-5 sm:text-xl">
                  {service.title}
                </h2>
                <div
                  className="pointer-events-none absolute bottom-0 right-0 z-20 translate-y-1 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:p-5"
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
              </div>
            </article>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}

export default Services