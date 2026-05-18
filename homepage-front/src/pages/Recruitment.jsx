import { useState } from 'react'
import SpecificPageLayout from '../components/SpecificPageLayout'
import { ContactForm } from '../components/ContactForm'
import BreadCrumb from '../components/BreadCrumb'
import { ExternalLink } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

const RECRUITMENT_FLOW_TITLE = '応募までの流れ'

const RECRUITMENT_FLOW_STEPS = [
  {
    title: '申請フォームの入力',
    body: '希望の職種をお選びのうえ、フォームより必要事項をご入力ください。',
  },
  {
    title: 'メールでの返答',
    body: '受付後、ご登録のメール宛に確認・ご連絡をお送りします。',
  },
  {
    title: '採用',
    body: '書類確認や面談などの選考を経て、採用決定となります。',
  },
]

const RECRUITMENT_ROLES = [
  {
    title: 'Software Engineer',
    tags: 'フルタイム、500,000円/月、東京',
    description:
      'Webアプリケーションの設計・開発から運用まで一貫して担い、チームとともに価値のあるプロダクトを育てていきます。',
    conditions: [
      'Web開発の実務経験2年以上（言語問わず可）',
      'Git等を用いたチーム開発の経験',
      '応募時に開発実績（GitHubポートフォリオ等）の提示にご協力いただける方',
    ],
  },
  {
    title: 'Project Manager',
    tags: 'フルタイム、550,000円/月、東京',
    description:
      '案件全体の計画・進行管理と関係者との調整をリードし、品質とスケジュールの両立を実現していただきます。',
    conditions: [
      'IT／システム開発プロジェクトでのマネジメント経験3年以上',
      '顧客・社内外ステークホルダーとの折衝経験',
      '請求書・見積・工数調整など、案件管理ツール活用に抵抗のない方',
    ],
  },
  {
    title: 'System Engineer',
    tags: 'フルタイム、480,000円/月、東京',
    description:
      'インフラ・ミドルウェアを含むシステム基盤の構築・保守に携わり、安定稼働と改善提案を担っていただきます。',
    conditions: [
      'サーバ／ネットワーク／クラウドいずれかの設計・構築・運用経験2年以上',
      'Linux環境での作業に抵抗のない方',
      'オンコール対応を含む運用業務への理解',
    ],
  },
  {
    title: 'Data Analyst',
    tags: 'フルタイム、450,000円/月、東京',
    description:
      '業務データの集計・分析やダッシュボード整備を通じて、意思決定に直結するインサイトの提供をお任せします。',
    conditions: [
      'SQLを用いた集計・分析の実務経験',
      'BIツール（Tableau／Looker／Power BI 等）の利用経験歓迎',
      '要件をヒアリングし、データで説明できるコミュニケーション力',
    ],
  },
  {
    title: 'Data Scientist',
    tags: 'フルタイム、600,000円/月、東京',
    description:
      '統計・機械学習モデルの設計・実装から評価までを担当し、データに基づく施策立案を技術面から支援します。',
    conditions: [
      'Pythonを用いた分析・モデリングの実務経験（研究・個人開発可）',
      '統計的根拠に基づく検証およびレポーティングができる方',
      'ビジネス課題をデータで捉え直せる思考力',
    ],
  },
]

const APPLY_BUTTON_LABEL_DEFAULT = '申請する'
const APPLY_BUTTON_LABEL_ACTIVE = 'Googleフォーム'

function RecruitmentApplyButton({ className = '' }) {
  const reduceMotion = useReducedMotion()
  const [interactionActive, setInteractionActive] = useState(false)
  /** Hover or keyboard focus: second label + slide-up; hide icon */
  const showActiveLabel = interactionActive

  const labelTransition =
    reduceMotion === true ? { duration: 0 } : { duration: 0.25, ease: [0.4, 0, 0.2, 1] }

  const iconTransition =
    reduceMotion === true ? { duration: 0 } : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }

  const iconSlotPx = 16
  /** gap matches gap-2 (0.5rem) when icon strip is open */
  const iconGapPx = 8

  return (
    <motion.button
      type="button"
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex shrink-0 items-center justify-center rounded-md px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:cursor-pointer sm:px-4 ${interactionActive ? 'bg-purple-700' : 'bg-zinc-900'} ${className}`.trim()}
      onMouseEnter={() => setInteractionActive(true)}
      onMouseLeave={() => setInteractionActive(false)}
      onFocus={() => setInteractionActive(true)}
      onBlur={() => setInteractionActive(false)}
    >
      <motion.span
        aria-hidden
        className="inline-flex shrink-0 overflow-hidden"
        initial={false}
        animate={{
          width: showActiveLabel ? 0 : iconSlotPx,
          opacity: showActiveLabel ? 0 : 1,
          marginRight: showActiveLabel ? 0 : iconGapPx,
        }}
        transition={iconTransition}
      >
        <ExternalLink className="size-4 shrink-0 text-white/90" />
      </motion.span>
      <span className="relative inline-block h-6 shrink-0 overflow-hidden align-middle">
        <motion.div
          className="flex flex-col items-center"
          initial={false}
          animate={{
            y: showActiveLabel ? '-50%' : '0%',
          }}
          transition={labelTransition}
        >
          <span
            className="flex h-6 w-full max-w-full items-center justify-center whitespace-nowrap leading-snug"
            aria-hidden={showActiveLabel}
          >
            {APPLY_BUTTON_LABEL_DEFAULT}
          </span>
          <span
            className="flex h-6 w-full max-w-full items-center justify-center whitespace-nowrap leading-snug"
            aria-hidden={!showActiveLabel}
          >
            {APPLY_BUTTON_LABEL_ACTIVE}
          </span>
        </motion.div>
      </span>
    </motion.button>
  )
}

const Recruitment = () => {
  return (
    <SpecificPageLayout title="Recruitment" breadcrumb={<BreadCrumb items={[{ label: 'ホーム', to: '/' }, { label: '採用情報' }]} />}>
      <div className="flex min-h-[min(70vh,720px)] flex-col gap-8 px-8 pb-8 text-left md:flex-row md:items-stretch">
        <aside className="sticky top-24 z-10 w-full shrink-0 self-start bg-(--bg) pb-6 text-left md:w-72 md:border-r md:border-zinc-200 md:pb-0 md:pr-8">
          <h2 className="text-base font-semibold tracking-tight text-zinc-900">{RECRUITMENT_FLOW_TITLE}</h2>
          <ol className="mt-4 flex flex-col gap-5">
            {RECRUITMENT_FLOW_STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white"
                >
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
        <div className="flex flex-1 flex-col divide-y divide-zinc-200 text-left md:min-w-0">
          {RECRUITMENT_ROLES.map((role) => (
            <article key={role.title} className="py-5 text-left">
              <div className="flex min-w-0 w-full flex-1 flex-col gap-2">
                <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-lg font-semibold tracking-tight text-zinc-900">{role.title}</h2>
                  <p className="text-sm text-zinc-500">{role.tags}</p>
                </div>
                <p className="mt-3 border-l-2 border-zinc-200 pl-4 text-sm leading-relaxed text-zinc-600">
                  {role.description}
                </p>
                <div className="mt-4">
                  <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-start md:gap-8">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-zinc-900">応募条件</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-zinc-600">
                        {role.conditions.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <RecruitmentApplyButton className="shrink-0" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="flex flex-col px-8 pb-8">
        <ContactForm />
      </div>
    </SpecificPageLayout>
  )
}

export default Recruitment
