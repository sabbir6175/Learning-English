import { ArrowRight, BookOpen, BookA, LayoutDashboard, Languages, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'

const learningLinks = [
  { to: '/levels', label: 'Lessons', icon: BookOpen },
  { to: '/grammar', label: 'Grammar', icon: BookOpen },
  { to: '/vocabulary', label: 'Vocabulary', icon: BookA },
]

const exploreLinks = [
  { to: '/translate', label: 'Translator', icon: Languages },
  { to: '/videos', label: 'Videos', icon: PlayCircle },
  { to: '/dashboard', label: 'Content dashboard', icon: LayoutDashboard },
]

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 pb-6 pt-10 sm:px-6 sm:pt-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-6 text-ink-500">
              Learn useful English one small step at a time, with clear examples and Bangla support when you need it.
            </p>
            <p className="mt-2 text-sm font-medium text-ink-700">ইংরেজি শিখুন, বাংলায় বুঝুন।</p>
            <Link to="/levels" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800">
              Start learning <ArrowRight className="size-4" />
            </Link>
          </div>

          <nav aria-label="Learning links">
            <h2 className="text-sm font-bold text-ink-900">Keep learning</h2>
            <ul className="mt-4 space-y-3">
              {learningLinks.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link to={to} className="inline-flex items-center gap-2.5 text-sm font-medium text-ink-500 transition hover:text-brand-700">
                    <Icon className="size-4 text-brand-600" /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="More links">
            <h2 className="text-sm font-bold text-ink-900">Explore</h2>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link to={to} className="inline-flex items-center gap-2.5 text-sm font-medium text-ink-500 transition hover:text-brand-700">
                    <Icon className="size-4 text-brand-600" /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-ink-100 pt-5 text-xs text-ink-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sabbir English. Keep learning, one word at a time.</p>
          <p>Made for learners, with care.</p>
        </div>
      </div>
    </footer>
  )
}
