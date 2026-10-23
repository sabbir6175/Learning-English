import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Flame, Zap, CircleUserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { features } from '@/app/features'
import { useProgress } from '@/store/useProgress'
import { BnToggle } from '@/components/BnToggle'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Logo } from './Logo'
import { cn } from '@/lib/cn'

const navItems = features.filter((f) => f.nav)

export function Navbar() {
  const xp = useProgress((s) => s.xp)
  const streak = useProgress((s) => s.streak)
  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-ink-50/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {navItems.map((f) => (
            <NavLink key={f.id} to={f.path} end={f.path === '/'} className="relative rounded-full px-3 py-2 text-sm font-semibold">
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-brand-100" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  <span className={cn('relative', isActive ? 'text-brand-700' : 'text-ink-500 hover:text-ink-900')}>{f.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="flex h-9 items-center gap-1.5 rounded-full bg-sun-50 px-3 text-sm font-bold text-sun-700" title="Day streak">
            <Flame className="size-4 text-sun-500" /> {streak}
          </span>
          <span className="hidden h-9 items-center gap-1.5 rounded-full bg-brand-50 px-3 text-sm font-bold text-brand-700 sm:flex" title="Total XP">
            <Zap className="size-4 text-brand-500" /> {xp} XP
          </span>
          <div className="hidden sm:block"><BnToggle /></div>
          <ThemeToggle />
          <Link to="/account" className="grid size-9 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 transition hover:border-brand-300 hover:text-brand-700" aria-label="Log in or sign up" title="Log in or sign up">
            <CircleUserRound className="size-5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
