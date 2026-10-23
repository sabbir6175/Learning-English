import { Link } from 'react-router-dom'
import { Logo } from './Logo'

const footerLinks = [
  { to: '/levels', label: 'Lessons' },
  { to: '/grammar', label: 'Grammar' },
  { to: '/vocabulary', label: 'Vocabulary' },
  { to: '/translate', label: 'Translator' },
  { to: '/videos', label: 'Videos' },
]

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div><Logo /><p className="mt-2 text-sm text-ink-500">ইংরেজি শিখুন, বাংলায় বুঝুন।</p></div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
          {footerLinks.map((item) => <Link key={item.to} to={item.to} className="text-sm font-semibold text-ink-500 transition hover:text-brand-700">{item.label}</Link>)}
        </nav>
        <p className="text-xs text-ink-300">© {new Date().getFullYear()} Sabbir English</p>
      </div>
    </footer>
  )
}