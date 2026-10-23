import { useState } from 'react'
import { Volume2, Turtle } from 'lucide-react'
import { speak, speechSupported } from '@/lib/speech'
import { cn } from '@/lib/cn'

export function SpeakButton({ text, slow = false, size = 'md', className }) {
  const [playing, setPlaying] = useState(false)
  if (!speechSupported()) return null
  const Icon = slow ? Turtle : Volume2
  const dims = size === 'lg' ? 'size-16 [&_svg]:size-7' : 'size-10 [&_svg]:size-5'
  return (
    <button
      type="button"
      aria-label={slow ? `Play slowly: ${text}` : `Play: ${text}`}
      onClick={() => {
        setPlaying(true)
        speak(text, { rate: slow ? 0.55 : 0.95, onEnd: () => setPlaying(false) })
      }}
      className={cn(
        'grid shrink-0 place-items-center rounded-full transition-colors',
        playing ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600 hover:bg-brand-100',
        dims, className
      )}
    >
      <Icon />
    </button>
  )
}
