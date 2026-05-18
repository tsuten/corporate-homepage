import { aboutItems } from '../data/AboutUs'
import { Link } from 'react-router-dom'
const AboutUs = () => {
  const sectionTitle = 'About Us'
  const items = aboutItems

  return (
    <section id="about-us" className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-zinc-900 text-start">{sectionTitle}</h1>
      <p className="text-sm text-zinc-600 text-start pb-8">私たちは、プログラム開発・建設・輸送という3つの専門領域を軸に事業を展開するプロフェッショナル集団です。<br/>
システムという「脳」を創り、建設という「形」を成し、輸送という「血流」を届ける。<br/>これら異なる分野を一つの組織に統合することで、従来の枠組みに捉われない迅速かつ一気通貫したソリューションを提供します。<br/>
ITによる効率化と、現場で培った確かな技術力。その両輪で、変化し続ける社会のニーズに応え、より豊かな未来の基盤を築いていきます。</p>
      <ul className="mx-auto grid list-none grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {items.map((item) => {
          const to =
            item.link.startsWith('#') && item.link.length > 1
              ? `/about-us${item.link}`
              : '/about-us'
          return (
            <li key={item.title}>
              <Link
                to={to}
                className="group block h-full rounded-xl hover:cursor-pointer"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-white">
                  <div className="w-full shrink-0 bg-zinc-100">
                    <img
                      src={item.imagePath}
                      alt={item.title}
                      className="block max-h-72 w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-zinc-100 p-5 sm:p-6">
                    <h2 className="text-lg font-semibold text-zinc-900">{item.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 sm:text-base text-start">
                      {item.description}
                    </p>
                    <p className="mt-4">
                      {/* <a
                    href={item.link}
                    className="text-sm font-medium text-zinc-900 underline-offset-4 hover:underline"
                  >
                    詳しく見る
                  </a> */}
                    </p>
                  </div>
                </article>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default AboutUs
