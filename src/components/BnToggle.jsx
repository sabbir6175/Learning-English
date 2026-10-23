import { useProgress } from '@/store/useProgress'
import { cn } from '@/lib/cn'

export function BnToggle() {
  const showBn = useProgress((s) => s.showBn)
  const toggle = useProgress((s) => s.toggleBn)
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={showBn}
      title="Show or hide Bangla help"
      className={cn(
        'h-9 rounded-full px-3 text-sm font-semibold transition-colors',
        showBn ? 'bg-brand-500 text-white' : 'bg-ink-100 text-ink-500 hover:bg-ink-200'
      )}
    >
      বাংলা {showBn ? 'অন' : 'অফ'}
    </button>
  )
}
