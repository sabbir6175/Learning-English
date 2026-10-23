import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, RotateCcw, Repeat } from 'lucide-react'
import { getAllLessons } from '@/lib/curriculum'
import { useProgress } from '@/store/useProgress'
import { useSiteContent } from '@/store/useSiteContent'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { SpeakButton } from '@/components/SpeakButton'
import { shuffle } from '@/lib/utils'
import { cn } from '@/lib/cn'

export default function FlashcardsPage() {
  const completed = useProgress((s) => s.completed)
  const levels = useSiteContent((s) => s.levels)
  const lessons = useMemo(() => getAllLessons(levels), [levels])
  const [levelId, setLevelId] = useState('all')
  const [round, setRound] = useState(0)

  const pool = useMemo(
    () => lessons.filter((lesson) => completed[lesson.id] && (levelId === 'all' || lesson.levelId === levelId)).flatMap((lesson) => lesson.vocab),
    [lessons, completed, levelId]
  )
  const deck = useMemo(() => shuffle(pool), [pool, round]) // eslint-disable-line react-hooks/exhaustive-deps
  const available = levels.filter((level) => level.lessons.some((lesson) => completed[lesson.id]))

  if (!lessons.some((lesson) => completed[lesson.id])) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="text-3xl font-extrabold">No cards yet</h1>
        <p className="mt-3 text-ink-500">Finish your first lesson and its words will appear here for quick review.</p>
        <Button to="/levels" className="mt-6">Start a lesson</Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-extrabold">Flashcards</h1>
      <p className="mt-1 text-ink-500">Tap the card to flip it. Be honest, it helps you remember.</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {[{ id: 'all', code: 'All' }, ...available].map((lv) => (
          <button key={lv.id} onClick={() => { setLevelId(lv.id); setRound((r) => r + 1) }}
            className={cn('h-9 rounded-full px-4 text-sm font-bold transition-colors', levelId === lv.id ? 'bg-brand-500 text-white' : 'bg-white text-ink-500 ring-1 ring-ink-100 hover:text-ink-900')}>
            {lv.code}
          </button>
        ))}
      </div>
      <Deck key={`${levelId}-${round}`} deck={deck} onRestart={() => setRound((r) => r + 1)} />
    </div>
  )
}

function Deck({ deck, onRestart }) {
  const showBn = useProgress((s) => s.showBn)
  const markWord = useProgress((s) => s.markWord)
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [gotIt, setGotIt] = useState(0)

  if (i >= deck.length) {
    return (
      <div className="mt-10 rounded-3xl border border-ink-100 bg-white p-10 text-center">
        <h2 className="text-2xl font-extrabold">Deck finished</h2>
        <p className="mt-2 text-ink-500">You knew {gotIt} of {deck.length} words.</p>
        <Button className="mt-6" onClick={onRestart}><RotateCcw className="size-4" /> Study again</Button>
      </div>
    )
  }
  const card = deck[i]
  const answer = (known) => {
    markWord(card.w, known)
    if (known) setGotIt((g) => g + 1)
    setFlipped(false)
    setI((n) => n + 1)
  }

  return (
    <div className="mt-8">
      <div className="mb-3 flex items-center gap-3 text-sm font-semibold text-ink-500">
        <ProgressBar value={i / deck.length} /> <span className="shrink-0">{i + 1}/{deck.length}</span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.2 }} style={{ perspective: 1200 }}>
          <button type="button" onClick={() => setFlipped((f) => !f)} aria-label="Flip card" className="relative block h-72 w-full">
            <motion.div className="absolute inset-0" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ type: 'spring', stiffness: 200, damping: 24 }} style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 grid place-items-center rounded-3xl border border-ink-100 bg-white p-6" style={{ backfaceVisibility: 'hidden' }}>
                <div>
                  <p className="font-display text-5xl font-extrabold">{card.w}</p>
                  {showBn && <p className="mt-2 font-semibold text-brand-600">{card.sound}</p>}
                  <p className="mt-6 text-sm text-ink-300">Tap to see meaning</p>
                </div>
              </div>
              <div className="absolute inset-0 grid place-items-center rounded-3xl bg-brand-500 p-6 text-white" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                <div>
                  {showBn && <p className="text-3xl font-bold">{card.bn}</p>}
                  <p className={cn('text-brand-100', showBn ? 'mt-2' : 'text-xl')}>{card.en}</p>
                  <p className="mt-5 font-semibold">“{card.ex}”</p>
                </div>
              </div>
            </motion.div>
          </button>
        </motion.div>
      </AnimatePresence>
      <div className="mt-5 flex items-center justify-center gap-3">
        <SpeakButton text={card.w} size="lg" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button variant="secondary" size="lg" onClick={() => answer(false)}><Repeat className="size-4" /> Still learning</Button>
        <Button variant="success" size="lg" onClick={() => answer(true)}><Check className="size-5" /> Got it</Button>
      </div>
    </div>
  )
}
