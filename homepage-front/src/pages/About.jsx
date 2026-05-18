import BreadCrumb from '../components/BreadCrumb'
import SpecificPageLayout from '../components/SpecificPageLayout'
import { companyProfile } from '../data/AboutUs'

/** @type {{ question: string; answer: string }[]} */
const faqItems = [
  {
    question: '事業内容を教えてください。',
    answer:
      'システム開発、建設、輸送を柱としたソリューションを提供しています。詳細はサービスページやお問い合わせからご確認ください。',
  },
  {
    question: '本社・拠点のアクセスはどうなっていますか。',
    answer:
      '会社概要欄の所在地をご参照ください。最寄り駅や地図の掲載は現在作成中です。',
  },
  {
    question: '採用・インターンの応募は可能ですか。',
    answer:
      '採用情報ページをご覧ください。募集職種や応募方法を順次更新していきます。',
  },
  {
    question: '問い合わせ先（メール・電話）はありますか。',
    answer:
      'お問い合わせフォームまたは掲載予定の連絡先からご連絡ください。内容は後から差し替え可能です。',
  },
]

/** @typedef {{ title: string; subtitle?: string; paragraphs: string[] }} AccessCardData */

const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2088.0073703047156!2d139.75499159038432!3d35.67027044543752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b87b6a8f1df%3A0xa0a2c83faaf7cd72!2sWeWork%20Hibiya%20Park%20Front!5e0!3m2!1sen!2sjp!4v1779074200711!5m2!1sen!2sjp'

/** @type {AccessCardData[]} */
const accessCards = [
  {
    title: '霞ヶ関駅から',
    subtitle: '東京メトロ：丸の内線・日比谷線・千代田線',
    paragraphs: [
      'でお越しの方は、地下通路を歩いて頂き、＜C4出口＞よりお越しください。',
      '地上に出ましたら出口を背に、正面に道路となりますので右手に進んでください。（左手に大通りを見ながら進んでください）',
      '二個目のビル（一個目の白いビルの先）が、弊社が入るテナントビルになります。',
    ],
  },
  {
    title: '内幸町駅から',
    subtitle: '都営三田線',
    paragraphs: [
      'でお越しの方は、＜A7出口＞よりお越しください。',
      '地上に出ましたら、右手に大通りを見ながら進んでください。',
      '三個目のビルが弊社が入るテナントビルになります。',
    ],
  },
  {
    title: 'ビルへのご入館〜19階まで',
    paragraphs: [
      '正面よりガラス張り、二階へ進むエスカレーターが見えます。',
      '二階の受付にて来訪のご対応のうえ、19階までお越しください。',
    ],
  },
]

/** @type {{ imagePath: string; name: string; role: string; bio: string }[]} */
const teamMembers = [
  {
    imagePath: '/img/ceo-face.png',
    name: '山田 太郎',
    role: '代表取締役 CEO',
    bio: '事業戦略と組織体制の整備を担当。システム・建設・輸送の融合による付加価値創出をリードしています。',
  },
  {
    imagePath: '/img/cto.jpg',
    name: '鈴木 一郎',
    role: '取締役 CTO',
    bio: '開発体制と技術選定を主管。高品質なソフトウェア開発プロセスの構葉に取り組んでいます。',
  },
  {
    imagePath: '/img/manager.jpg',
    name: '佐藤 花子',
    role: '執行役員 事業開発',
    bio: 'パートナー連携と新規案件の開拓を担当。現場目線とビジネス要件の橋渡しを行っています。',
  },
]

/**
 * @param {{ member: { imagePath: string; name: string; role: string; bio: string } }} props
 */
const TeamMemberCard = ({ member }) => {
  return (
    <li>
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-white">
        <div className="w-full shrink-0 bg-zinc-100">
          <img
            src={member.imagePath}
            alt={`${member.name}の肖像写真`}
            className="block aspect-3/4 max-h-80 w-full object-cover object-center"
          />
        </div>
        <div className="flex flex-1 flex-col border-t border-zinc-100 p-5 text-left sm:p-6">
          <h3 className="text-lg font-semibold text-zinc-900">{member.name}</h3>
          <p className="mt-1 text-sm font-medium text-zinc-500">{member.role}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 sm:text-base text-left">
            {member.bio}
          </p>
        </div>
      </article>
    </li>
  )
}

/**
 * @param {{ card: AccessCardData }} props
 */
const AccessCard = ({ card }) => {
  return (
    <article className="flex h-full flex-col rounded-xl border border-zinc-200/80 bg-white p-5 sm:p-6">
      <h3 className="text-base font-semibold tracking-tight text-zinc-900">{card.title}</h3>
      {card.subtitle ? (
        <p className="mt-1 text-sm font-medium text-zinc-700">{card.subtitle}</p>
      ) : null}
      <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-zinc-600">
        {card.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}

const aboutBreadcrumbItems = [
  { label: 'ホーム', to: '/' },
  { label: '私達について' },
]

const ABOUT_PAGE_TITLE = '私達について'

const ABOUT_INTRO_MESSAGE = [
  '私たちは次世代のITソリューションとコンサルティングを核に、WEB・モバイルアプリの企画・開発から運用までを一貫して支援しています。さらに、最先端のアグリテック（農業IT）や高度なデータ分析、最適な人材紹介・アウトソーシング事業まで幅広く展開し、多角的なアプローチでお客様のビジネスを強力にバックアップします。',
  '私たちが大切にしているのは、単なるシステム提供にとどまらず、お客様の課題に徹底的に寄り添い、共に未来の価値を創造するパートナーであることです。変化の激しい現代において、確かな信頼（Trust）と革新的なテクノロジーを結びつけ、持続可能な社会の実現へ貢献してまいります。',
  'このページでは、私たちの熱い想いや組織体制の一端をご紹介します。',
]

const PROFILE_TH_CLASS =
  'w-1/3 min-w-32 py-3.5 pr-4 text-left align-top font-medium text-zinc-500 sm:w-auto sm:min-w-44 sm:py-4'

const PROFILE_TD_CLASS = 'py-3.5 text-left align-top text-zinc-800 wrap-break-word sm:py-4'

const PROFILE_ROW_CLASS = 'border-b border-zinc-200'

/**
 * @param {{ profile: typeof companyProfile.company_profile }} props
 */
const CompanyProfileFields = ({ profile }) => {
  const { head_office, contact, management } = profile
  const hqLine = `〒${head_office.postal_code} ${head_office.address} ${head_office.building}`

  return (
    <table className="w-full border-collapse border-t border-zinc-200 text-left text-sm">
      <tbody>
        <tr className={PROFILE_ROW_CLASS}>
          <th scope="row" className={PROFILE_TH_CLASS}>
            社名
          </th>
          <td className={PROFILE_TD_CLASS}>{profile.company_name}</td>
        </tr>
        <tr className={PROFILE_ROW_CLASS}>
          <th scope="row" className={PROFILE_TH_CLASS}>
            社名（英語表記）
          </th>
          <td className={PROFILE_TD_CLASS}>{profile.company_name_en}</td>
        </tr>
        <tr className={PROFILE_ROW_CLASS}>
          <th scope="row" className={PROFILE_TH_CLASS}>
            所在地
          </th>
          <td className={PROFILE_TD_CLASS}>{hqLine}</td>
        </tr>
        <tr className={PROFILE_ROW_CLASS}>
          <th scope="row" className={PROFILE_TH_CLASS}>
            電話番号
          </th>
          <td className={PROFILE_TD_CLASS}>
            <a href={`tel:${contact.tel.replace(/-/g, '')}`} className="underline decoration-zinc-400">
              {contact.tel}
            </a>
          </td>
        </tr>
        <tr className={PROFILE_ROW_CLASS}>
          <th scope="row" className={PROFILE_TH_CLASS}>
            メール
          </th>
          <td className={PROFILE_TD_CLASS}>
            <a href={`mailto:${contact.email}`} className="underline decoration-zinc-400">
              {contact.email}
            </a>
          </td>
        </tr>
        <tr className={PROFILE_ROW_CLASS}>
          <th scope="row" className={PROFILE_TH_CLASS}>
            Webサイト
          </th>
          <td className={PROFILE_TD_CLASS}>
            <a
              href={contact.website}
              className="underline decoration-zinc-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.website}
            </a>
          </td>
        </tr>
        <tr className={PROFILE_ROW_CLASS}>
          <th scope="row" className={PROFILE_TH_CLASS}>
            代表者
          </th>
          <td className={PROFILE_TD_CLASS}>{management.ceo}</td>
        </tr>
        <tr className={PROFILE_ROW_CLASS}>
          <th scope="row" className={PROFILE_TH_CLASS}>
            役員
          </th>
          <td className={PROFILE_TD_CLASS}>{management.coo}</td>
        </tr>
        <tr className={PROFILE_ROW_CLASS}>
          <th scope="row" className={PROFILE_TH_CLASS}>
            設立日
          </th>
          <td className={PROFILE_TD_CLASS}>{profile.establishment_date}</td>
        </tr>
        <tr className={PROFILE_ROW_CLASS}>
          <th scope="row" className={PROFILE_TH_CLASS}>
            資本金
          </th>
          <td className={PROFILE_TD_CLASS}>{profile.capital}</td>
        </tr>
        <tr className={PROFILE_ROW_CLASS}>
          <th scope="row" className={PROFILE_TH_CLASS}>
            従業員数
          </th>
          <td className={PROFILE_TD_CLASS}>{profile.number_of_employees}名</td>
        </tr>
        <tr className={PROFILE_ROW_CLASS}>
          <th scope="row" className={PROFILE_TH_CLASS}>
            事業内容
          </th>
          <td className={PROFILE_TD_CLASS}>
            <ul className="m-0 list-disc pl-4 text-zinc-800">
              {profile.business_summary.map((line) => (
                <li key={line} className="py-0.5">
                  {line}
                </li>
              ))}
            </ul>
          </td>
        </tr>
        <tr className={PROFILE_ROW_CLASS}>
          <th scope="row" className={PROFILE_TH_CLASS}>
            取引銀行
          </th>
          <td className={PROFILE_TD_CLASS}>
            <ul className="m-0 list-disc pl-4 text-zinc-800">
              {profile.main_banks.map((line) => (
                <li key={line} className="py-0.5">
                  {line}
                </li>
              ))}
            </ul>
          </td>
        </tr>
        <tr className={PROFILE_ROW_CLASS}>
          <th scope="row" className={PROFILE_TH_CLASS}>
            決算期
          </th>
          <td className={PROFILE_TD_CLASS}>{profile.fiscal_year_end}</td>
        </tr>
      </tbody>
    </table>
  )
}

const About = () => {
  const profile = companyProfile.company_profile

  return (
    <SpecificPageLayout title={ABOUT_PAGE_TITLE} breadcrumb={<BreadCrumb items={aboutBreadcrumbItems} />}>
      <div className="flex flex-col gap-8 px-8 pb-8 text-left">

        <div className="grid grid-cols-1 items-start gap-8 text-left md:grid-cols-2">
          <div className="overflow-hidden rounded-xl bg-zinc-100">
            <img
              src="/img/office.webp"
              alt="会社・オフィスの写真"
              className="aspect-4/3 w-full object-cover object-center"
              decoding="async"
            />
          </div>

          <div className="flex h-full flex-col justify-center gap-4 rounded-xl bg-zinc-100 p-6 text-left sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">代表メッセージ</h2>
            {ABOUT_INTRO_MESSAGE.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-zinc-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <section className="flex flex-col gap-6 border-t border-zinc-200 pt-8 text-left" aria-labelledby="company-profile-heading">
          <h2 id="company-profile-heading" className="text-xl font-semibold tracking-tight text-zinc-900">
            会社概要
          </h2>
          <CompanyProfileFields profile={profile} />
        </section>

        <section className="flex flex-col gap-6 pt-4 text-left" aria-labelledby="about-team-heading">
          <h2
            id="about-team-heading"
            className="text-xl font-semibold tracking-tight text-zinc-900 text-left"
          >
            人物紹介
          </h2>
          <ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-8 border-t border-zinc-200 pt-8 text-left" aria-labelledby="access-heading">
          <h2 id="access-heading" className="text-xl font-semibold tracking-tight text-zinc-900">
            アクセス
          </h2>
          <ul className="grid list-none grid-cols-1 gap-6 md:grid-cols-3">
            {accessCards.map((card) => (
              <li key={card.title}>
                <AccessCard card={card} />
              </li>
            ))}
          </ul>
          <div>
            <h3 className="mb-4 text-lg font-semibold tracking-tight text-zinc-900">地図</h3>
            <div className="relative aspect-3/2 w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
              <iframe
                className="absolute left-0 top-0 size-full border-0"
                src={MAP_EMBED_SRC}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google マップ — WeWork 日比谷パークフロント（内幸町）"
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6 pt-4 text-left" aria-labelledby="about-faq-heading">
          <h2
            id="about-faq-heading"
            className="text-xl font-semibold tracking-tight text-zinc-900 text-left"
          >
            よくある質問
          </h2>
          <div className="flex flex-col gap-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-zinc-200/80 bg-white px-5 open:border-zinc-300/80"
              >
                <summary className="cursor-pointer list-none py-4 text-left text-sm font-semibold text-zinc-900 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <span className="min-w-0 flex-1">{item.question}</span>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-zinc-400 transition-transform duration-200 group-open:rotate-180"
                    >
                      ▾
                    </span>
                  </span>
                </summary>
                <p className="border-t border-zinc-100 pb-4 pt-3 text-left text-sm leading-relaxed text-zinc-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </SpecificPageLayout>
  )
}

export default About
