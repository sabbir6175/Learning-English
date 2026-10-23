import { useProgress } from '@/store/useProgress'
import { cn } from '@/lib/cn'
import { Languages } from 'lucide-react'

export function BnToggle() {
  const showBn = useProgress((s) => s.showBn)
  const toggle = useProgress((s) => s.toggleBn)
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={showBn}
      title={showBn ? 'Bangla translations are on' : 'Bangla translations are off'}
      aria-label="Toggle English to Bangla translations"
      className={cn(
        'inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition-colors',
        showBn ? 'bg-brand-500 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
      )}
    >
      <Languages className="size-4" />
      <span>EN → বাংলা</span>
      <span className="sr-only">{showBn ? 'on' : 'off'}</span>
    </button>
  )
}
