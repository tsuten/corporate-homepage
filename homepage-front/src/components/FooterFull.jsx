import { Link } from 'react-router-dom'
import { companyProfile } from '../data/AboutUs'

export default function Footer() {
  const year = new Date().getFullYear()
  const profile = companyProfile.company_profile
  const { head_office, contact } = profile
  const tagline =
    profile.business_summary?.[0] ??
    'ITソリューションの開発・コンサルティングおよび関連事業を展開しています。'

  const navItems = [
    { label: 'ホーム', href: '/' },
    { label: 'サービス', href: '/services' },
    { label: '私達について', href: '/about-us' },
    { label: 'お知らせ', href: '/announcements' },
    { label: '採用情報', href: '/recruitment' },
    { label: 'お問い合わせ', href: '/services#contact' },
  ]

  return (
    <footer className="mt-auto bg-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <div>
            <Link to="/" className="text-base font-semibold tracking-tight text-zinc-900 hover:text-zinc-600">
              Brian Trust.inc
            </Link>
            <p className="mt-1 text-xs text-zinc-500">{profile.company_name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-600">{tagline}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">ナビゲーション</p>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-zinc-700">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href} className="text-zinc-900 hover:text-zinc-600">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">お問い合わせ</p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-zinc-600">
              <p>{`〒${head_office.postal_code}`}</p>
              <p>{head_office.address}</p>
              <p>{head_office.building}</p>
              <p className="mt-2">
                <a href={`tel:${contact.tel.replace(/-/g, '')}`} className="text-zinc-900 underline-offset-4 hover:underline">
                  {contact.tel}
                </a>
              </p>
              <p className="mt-1">
                <a href={`mailto:${contact.email}`} className="text-zinc-900 underline-offset-4 hover:underline">
                  {contact.email}
                </a>
              </p>
              {contact.website ? (
                <p className="mt-1">
                  <a
                    href={contact.website}
                    className="text-zinc-900 underline-offset-4 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact.website}
                  </a>
                </p>
              ) : null}
            </address>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-zinc-200/80 pt-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.company_name_en}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
