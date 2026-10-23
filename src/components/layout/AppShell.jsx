import { useLocation, useOutlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { BottomNav } from './BottomNav'
import { Footer } from './Footer'
import { cn } from '@/lib/cn'

export function AppShell() {
  const { pathname } = useLocation()
  const outlet = useOutlet()
  const isHome = pathname === '/'
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">Skip to content</a>
      <Navbar />
      <main
        key={pathname}
        id="main"
        className={cn('w-full flex-1 pb-28 md:pb-16', isHome ? '' : 'mx-auto max-w-6xl px-4 pt-8 sm:px-6')}
      >
        {outlet}
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
