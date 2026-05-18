import { Link } from 'react-router-dom'

/**
 * @param {{ items: { label: string; to?: string }[] }} props
 */
const BreadCrumb = ({ items }) => {
  if (!items?.length) return null

  return (
    <nav aria-label="パンくずリスト" className="px-8 pt-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="select-none text-zinc-400">
                  /
                </span>
              )}
              {isLast || !item.to ? (
                <span
                  className={isLast ? 'font-medium text-zinc-900' : 'text-zinc-600'}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default BreadCrumb
