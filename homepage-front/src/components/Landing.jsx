import { motion } from 'motion/react'
import ImagesHavingFun from './ImagesHavingFun'

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

const Landing = () => {
  return (
    <section>
      <div className="container mx-auto px-8 py-8">
        <div className="relative min-h-[70vh] md:min-h-[80vh] overflow-hidden rounded-2xl">
          <video
            src="/videos/landing-background.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/img/ceo.jpg"
            className="absolute inset-0 size-full object-cover"
          />
          <div
            className="absolute inset-0"
            aria-hidden
          />
          <div className="relative z-10 flex min-h-[70vh] flex-col justify-center px-6 py-16 md:min-h-[80vh] md:px-10 md:py-24">
            <div className="flex max-w-xl flex-col gap-3 md:gap-4 text-start">
              <motion.h1
                className="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
                style={{ color: '#ffffff' }}
                {...fadeIn}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                Make No Difference.
              </motion.h1>
              <motion.p
                className="text-lg text-white/95 md:text-xl lg:text-2xl"
                {...fadeIn}
                transition={{
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.12,
                }}
              >
                何も変えない。
              </motion.p>
            </div>
          </div>
        </div>
      </div>
      <ImagesHavingFun />
    </section>
  )
}

export default Landing
