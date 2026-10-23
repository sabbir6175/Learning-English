import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/store/useTheme'

export function ThemeToggle() {
  const theme = useTheme((state) => state.theme)
  const toggleTheme = useTheme((state) => state.toggleTheme)
  const isDark = theme === 'dark'
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <button type="button" onClick={toggleTheme} aria-label={label} title={label} className="grid size-9 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 transition hover:border-brand-300 hover:text-brand-700">
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}