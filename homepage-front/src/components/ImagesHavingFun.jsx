import { Splide, SplideSlide } from '@splidejs/react-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import '@splidejs/react-splide/css'
import './ImagesHavingFun.css'
import { landingGalleryImages } from '../data/landingGalleryImages.js'

const splideOptions = {
  type: 'loop',
  drag: 'free',
  fixedWidth: '300px',
  gap: '2rem',
  autoScroll: {
    speed: 0.85,
    rewind: true,
    pauseOnHover: true,
    autoStart: true,
  },
  arrows: false,
  pagination: false,
}

const ImagesHavingFun = () => {
  return (
    <section className="imagesHavingFun container mx-auto">
      {/* <h2 className="mb-6 text-2xl font-semibold tracking-tight text-zinc-900">フォトギャラリー</h2> */}
      <div className="imagesHavingFun-inner">
        <Splide
          className="imagesHavingFun-splide"
          tag="section"
          options={splideOptions}
          extensions={{ AutoScroll }}
          aria-label="フォトギャラリー"
        >
          {landingGalleryImages.map((item) => (
            <SplideSlide key={item.src}>
              <img src={item.src} alt={item.alt} loading="lazy" draggable={false} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  )
}

export default ImagesHavingFun
