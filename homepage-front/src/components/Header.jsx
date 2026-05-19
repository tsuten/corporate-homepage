import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'

const isNavItemActive = (href, pathname) =>
  href === '/'
    ? pathname === '/'
    : pathname === href || pathname.startsWith(`${href}/`)

const navItems = [
  {
    label: '私達について',
    href: '/about-us',
  },
  {
    label: 'サービス',
    href: '/services',
  },
  {
    label: 'お知らせ',
    href: '/announcements',
  },
  // {
  //   label: 'ギャラリー',
  //   href: '#gallery',
  // },
  {
    label: '採用情報',
    href: '/recruitment',
    emphasis: true,
  },
]

const NavLink = ({ item, isActive, emphasis }) => {
  const className = emphasis
    ? [
        'rounded-full px-4 py-2 transition-all duration-300 hover:text-white hover:bg-black/15 bg-emphasis',
        isActive && 'ring-2 ring-white/50 text-white',
      ]
        .filter(Boolean)
        .join(' ')
    : [
        'rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/15 hover:text-white',
        isActive && 'bg-white/20 text-white',
      ]
        .filter(Boolean)
        .join(' ')

  return (
    <Link to={item.href} className={className} aria-current={isActive ? 'page' : undefined}>
      {item.label}
    </Link>
  )
}

export default function Header() {
  const { pathname } = useLocation()
  const [isTop, setIsTop] = useState(true)
  const [isCompactViewport, setIsCompactViewport] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setIsTop(y < 64)
  })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)')
    const apply = () => setIsCompactViewport(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const scrolledInset = isCompactViewport ? 12 : 256
  const scrolledRadius = isCompactViewport ? 16 : 24

  return (
    <motion.header
      className="bg-primary"
      style={{ position: 'fixed', zIndex: 50 }}
      initial={false}
      animate={isTop ? 'top' : 'scrolled'}
      variants={{
        top: {
          top: 0,
          left: 0,
          right: 0,
          borderRadius: 0,
          boxShadow: 'none',
          border: '0px solid transparent',
        },
        scrolled: {
          top: 12,
          left: scrolledInset,
          right: scrolledInset,
          borderRadius: scrolledRadius,
          boxShadow: 'none',
          border: '0px solid transparent',
        },
      }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className={`mx-auto flex h-[4.5rem] items-center justify-between gap-6 ${isCompactViewport ? 'px-4' : 'px-8'}`}
        style={{ borderRadius: 'inherit' }}
      >
        <Link to="/" className="text-lg font-semibold tracking-tight text-white">
          Brian Trust.inc
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-green-50">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              emphasis={item.emphasis}
              isActive={isNavItemActive(item.href, pathname)}
            />
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
