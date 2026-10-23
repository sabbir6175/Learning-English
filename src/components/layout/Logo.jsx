import { Link } from 'react-router-dom'
import { APP_NAME } from '@/config'

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${APP_NAME} home`}>
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
        <rect width="32" height="32" rx="9" fill="var(--color-brand-600)" />
        <path d="M7 24h6v-5h5v-5h7v-3H15v5h-5v5H7z" fill="#fff" />
        <circle cx="23" cy="8" r="2.6" fill="#e58a65" />
      </svg>
      <span className="font-display text-xl font-bold tracking-tight">Sabbir English</span>
    </Link>
  )
}
