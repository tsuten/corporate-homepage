import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-zinc-100 rounded-2xl m-8">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <div>
            <Link to="/" className="text-base font-semibold tracking-tight text-zinc-900 hover:text-zinc-600">
              Brian Trust.inc
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-600">
              世界を変えない。
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">ナビゲーション</p>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-zinc-700">
              <Link to="/" className="hover:text-zinc-900">
                Home
              </Link>
              <Link to="/about" className="hover:text-zinc-900">
                About
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">お問い合わせ</p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-zinc-600">
              <p>〒000-0000</p>
              <p>都道府県市区町村 番地</p>
              <p className="mt-2">
                <a href="mailto:info@example.com" className="text-zinc-900 underline-offset-4 hover:underline">
                  info@example.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-zinc-200/80 pt-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Brian Trust.inc. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="hover:text-zinc-800">
              プライバシーポリシー
            </a>
            <a href="#" className="hover:text-zinc-800">
              利用規約
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
