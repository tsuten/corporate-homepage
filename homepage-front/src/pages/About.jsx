import { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import SpecificPageLayout from '../components/SpecificPageLayout'
import { api } from '../utils/api'

/**
 * @param {unknown} value
 */
const formatCompanyInfoCell = (value) => {
  if (value === null || value === undefined) {
    return 'null'
  }
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }
  return String(value)
}

const COMPANY_INFO_FIELD_DEFS = [
  { key: 'name', label: '社名' },
  { key: 'address', label: '所在地' },
  { key: 'phone', label: '電話番号' },
  { key: 'email', label: 'メール' },
  { key: 'founded_at', label: '設立日' },
  { key: 'employee_count', label: '従業員数' },
  { key: 'capital', label: '資本金' },
  { key: 'website', label: 'Webサイト' },
]

/** @type {{ question: string; answer: string }[]} */
const faqItems = [
  {
    question: '事業内容を教えてください。',
    answer:
      'システム開発、建設、輸送を柱としたソリューションを提供しています。詳細はサービスページやお問い合わせからご確認ください。（プレースホルダー）',
  },
  {
    question: '本社・拠点のアクセスはどうなっていますか。',
    answer:
      '会社概要欄の所在地をご参照ください。最寄り駅や地図の掲載は、確定次第ここに追記できます。（プレースホルダー）',
  },
  {
    question: '採用・インターンの応募は可能ですか。',
    answer:
      '採用情報ページをご覧ください。募集職種や応募方法を順次更新していきます。（プレースホルダー）',
  },
  {
    question: '問い合わせ先（メール・電話）はありますか。',
    answer:
      'お問い合わせフォームまたは掲載予定の連絡先からご連絡ください。内容は後から差し替え可能です。（プレースホルダー）',
  },
]

/** @type {{ imagePath: string; name: string; role: string; bio: string }[]} */
const teamMembers = [
  {
    imagePath: '/img/ceo-face.png',
    name: '山田 太郎',
    role: '代表取締役 CEO',
    bio: '事業戦略と組織体制の整備を担当。システム・建設・輸送の融合による付加価値創出をリードしています。（プレースホルダー）',
  },
  {
    imagePath: '/img/cto.jpg',
    name: '佐藤 花子',
    role: '取締役 CTO',
    bio: '開発体制と技術選定を主管。高品質なソフトウェア開発プロセスの構葉に取り組んでいます。（プレースホルダー）',
  },
  {
    imagePath: '/img/manager.jpg',
    name: '鈴木 一郎',
    role: '執行役員 事業開発',
    bio: 'パートナー連携と新規案件の開拓を担当。現場目線とビジネス要件の橋渡しを行っています。（プレースホルダー）',
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

const aboutBreadcrumbItems = [
  { label: 'ホーム', to: '/' },
  { label: '私達について' },
]

const ABOUT_PAGE_TITLE = '私達について'

/**
 * @param {{ data: Record<string, unknown> }} props
 */
const CompanyInfoTable = ({ data }) => {
  const rows = COMPANY_INFO_FIELD_DEFS.filter((def) =>
    Object.prototype.hasOwnProperty.call(data, def.key),
  )

  if (rows.length === 0) {
    return <p className="text-left text-sm text-zinc-600">表示できる項目がありません。</p>
  }

  return (
    <table className="w-full border-collapse border-0 text-left text-sm">
      <tbody>
        {rows.map(({ key, label }) => (
          <tr key={key}>
            <th
              scope="row"
              className="w-1/3 min-w-32 border-0 py-1.5 pr-4 text-left align-top font-medium text-zinc-500 sm:w-auto sm:min-w-44"
            >
              {label}
            </th>
            <td className="border-0 py-1.5 text-left align-top text-zinc-800 wrap-break-word">
              {formatCompanyInfoCell(data[key] ?? null)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const About = () => {
  const [companyInfo, setCompanyInfo] = useState(/** @type {Record<string, unknown> | null} */ (null))
  const [companyInfoError, setCompanyInfoError] = useState(/** @type {string | null} */ (null))
  const [companyInfoLoading, setCompanyInfoLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setCompanyInfoLoading(true)
    setCompanyInfoError(null)
    api
      .get('/company-info')
      .then((res) => {
        if (!cancelled) {
          setCompanyInfo(res.data && typeof res.data === 'object' ? res.data : null)
        }
      })
      .catch((err) => {
        console.error(err)
        if (!cancelled) {
          setCompanyInfoError('会社情報を読み込めませんでした。')
          setCompanyInfo(null)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setCompanyInfoLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])
  return (
    <SpecificPageLayout title={ABOUT_PAGE_TITLE} breadcrumb={<BreadCrumb items={aboutBreadcrumbItems} />}>
      <div className="flex flex-col gap-8 px-8 pb-8 text-left">

        <div className="grid grid-cols-2 items-start gap-8 text-left">
          <div className="overflow-hidden rounded-xl bg-zinc-100">
            <img
              src="/img/office.webp"
              alt="会社・オフィスの写真"
              className="aspect-4/3 w-full object-cover object-center"
              decoding="async"
            />
          </div>

          <div className="flex flex-col gap-8 bg-zinc-100 p-4 text-left rounded-xl h-full">
            {companyInfoLoading && (
              <p className="text-left text-sm text-zinc-600" aria-live="polite">
                読み込み中…
              </p>
            )}
            {companyInfoError && (
              <p className="text-left text-sm text-red-600" role="alert">
                {companyInfoError}
              </p>
            )}
            {!companyInfoLoading && !companyInfoError && !companyInfo && (
              <p className="text-left text-sm text-zinc-600">会社情報が登録されていません。</p>
            )}
            {!companyInfoLoading && !companyInfoError && companyInfo && (
              <CompanyInfoTable data={companyInfo} />
            )}
          </div>
        </div>

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
