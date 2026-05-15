import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'

const navItems = [
  {
    label: 'サービス',
    href: '/services',
  },
  {
    label: '私達について',
    href: '#about-us',
  },
  {
    label: 'お知らせ',
    href: '#announcements',
  },
  {
    label: 'ギャラリー',
    href: '#gallery',
  },
  {
    label: '採用情報',
    href: '#recruit',
    emphasis: true,
  },
]

const NavLink = ({ item, isActive, emphasis }) => {
  return (
    <>
    {!emphasis && (
      <Link to={item.href} className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/15 hover:text-white">
        {item.label}
      </Link>
    )}
    {emphasis && (
      <Link to={item.href} className="hover:text-white bg-emphasis px-4 py-2 rounded-full transition-all duration-300 hover:bg-black/15">
        {item.label}
      </Link>
    )}
    </>
  )
}

export default function Header() {
  const [isTop, setIsTop] = useState(true)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setIsTop(y < 64)
  })

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
          left: 256,
          right: 256,
          borderRadius: 24,
          boxShadow: 'none',
          border: '0px solid transparent',
        },
      }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="mx-auto flex h-[4.5rem] items-center justify-between gap-6 px-8" style={{ borderRadius: 'inherit' }}>
        <Link to="/" className="text-lg font-semibold tracking-tight text-white">
          Brian Trust.inc
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-green-50">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} emphasis={item.emphasis} />
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
