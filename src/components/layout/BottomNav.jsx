import { NavLink } from 'react-router-dom'
import { features } from '@/app/features'
import { cn } from '@/lib/cn'

const navItems = features.filter((f) => f.nav)

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden" aria-label="Main">
      <ul className="mx-auto flex max-w-xl justify-around">
        {navItems.map((f) => (
          <li key={f.id}>
            <NavLink to={f.path} end={f.path === '/'} className={({ isActive }) => cn('flex min-w-0 flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold sm:text-[11px]', isActive ? 'text-brand-600' : 'text-ink-500')}>
              <f.icon className="size-5" />
              {f.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
