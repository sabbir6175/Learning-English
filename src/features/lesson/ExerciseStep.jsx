import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SpeakButton } from '@/components/SpeakButton'
import { useProgress } from '@/store/useProgress'
import { normalize } from '@/lib/utils'
import { speak } from '@/lib/speech'
import { cn } from '@/lib/cn'

function OptionList({ ex, answer, setAnswer, status }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {ex.options.map((opt) => {
        const selected = answer === opt
        const isAnswer = opt === ex.answer
        return (
          <button
            key={opt}
            type="button"
            disabled={status !== 'idle'}
            onClick={() => setAnswer(opt)}
            className={cn(
              'rounded-2xl border-2 px-4 py-4 text-left text-lg font-semibold transition-all',
              status === 'idle' && (selected ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-100 bg-white hover:border-brand-300'),
              status !== 'idle' && isAnswer && 'border-mint-500 bg-mint-50 text-mint-700',
              status === 'wrong' && selected && !isAnswer && 'border-rose-400 bg-rose-50 text-rose-700',
              status !== 'idle' && !isAnswer && !selected && 'border-ink-100 bg-white text-ink-300'
            )}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function FillBlank({ ex, answer, setAnswer, status }) {
  const [before, after = ''] = ex.prompt.split('___')
  const blank = ex.options ? (
    <span className={cn('mx-1 inline-flex min-w-24 justify-center border-b-4 px-2', answer ? 'border-brand-500 text-brand-700' : 'border-ink-200 text-transparent')}>
      {answer || '·····'}
    </span>
  ) : (
    <input
      autoFocus
      value={answer}
      disabled={status !== 'idle'}
      onChange={(e) => setAnswer(e.target.value)}
      autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck={false}
      aria-label="Your answer"
      className="mx-1 w-44 border-b-4 border-brand-300 bg-transparent px-1 text-center text-brand-700 outline-none focus:border-brand-500"
    />
  )
  return (
    <>
      <p className="mt-6 text-2xl font-semibold leading-relaxed sm:text-3xl">{before}{blank}{after}</p>
      {ex.options && (
        <div className="mt-8 flex flex-wrap gap-3">
          {ex.options.map((opt) => (
            <button key={opt} type="button" disabled={status !== 'idle'} onClick={() => setAnswer(opt)}
              className={cn('rounded-xl border-2 px-5 py-3 text-lg font-semibold transition-all',
                answer === opt ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-100 bg-white hover:border-brand-300')}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

export function ExerciseStep({ exercises, index, setIndex, onFinish }) {
  const showBn = useProgress((s) => s.showBn)
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState('idle') // idle | correct | wrong
  const [correct, setCorrect] = useState(0)
  const ex = exercises[index]

  // Auto-play audio for listening exercises
  useEffect(() => {
    if (ex.type === 'listen') {
      const t = setTimeout(() => speak(ex.speak), 250)
      return () => clearTimeout(t)
    }
  }, [ex])

  const check = useCallback(() => {
    if (!answer.trim()) return
    const ok = normalize(answer) === normalize(ex.answer)
    setStatus(ok ? 'correct' : 'wrong')
    if (ok) setCorrect((c) => c + 1)
    if (ex.type === 'fill') speak(ex.prompt.replace('___', ex.answer))
  }, [answer, ex])

  const next = useCallback(() => {
    if (index + 1 >= exercises.length) return onFinish({ score: correct, total: exercises.length })
    setIndex(index + 1)
    setAnswer('')
    setStatus('idle')
  }, [index, exercises.length, correct, onFinish, setIndex])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Enter') return
      e.preventDefault()
      status === 'idle' ? check() : next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [status, check, next])

  return (
    <div className="flex flex-1 flex-col">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={ex.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }} className="flex-1 pb-44">
          <p className="text-sm font-semibold text-brand-600">{ex.label}</p>

          {ex.type !== 'fill' && (
            <div className="mt-3 flex items-center gap-4">
              {ex.type === 'listen' ? (
                <><SpeakButton text={ex.speak} size="lg" /><SpeakButton text={ex.speak} slow size="lg" className="bg-sun-50 text-sun-700" /></>
              ) : ex.speak && <SpeakButton text={ex.speak} />}
              <h1 className="text-2xl font-extrabold sm:text-3xl">{ex.prompt}</h1>
            </div>
          )}
          {showBn && ex.type !== 'fill' && <p className="mt-2 text-ink-500">{ex.promptBn}</p>}
          {showBn && ex.type === 'fill' && <p className="mt-3 text-ink-500">{ex.promptBn}</p>}

          {ex.type === 'fill'
            ? <FillBlank ex={ex} answer={answer} setAnswer={setAnswer} status={status} />
            : <OptionList ex={ex} answer={answer} setAnswer={setAnswer} status={status} />}
        </motion.div>
      </AnimatePresence>

      <div className={cn('fixed inset-x-0 bottom-0 z-20 border-t transition-colors', status === 'correct' ? 'border-mint-500/30 bg-mint-50' : status === 'wrong' ? 'border-rose-300 bg-rose-50' : 'border-ink-100 bg-white')}>
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={status} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="min-w-0">
              {status === 'correct' && <p className="flex items-center gap-2 text-lg font-bold text-mint-700"><Check className="size-6" /> Correct!</p>}
              {status === 'wrong' && (
                <div className="text-rose-700">
                  <p className="flex items-center gap-2 text-lg font-bold"><X className="size-6" /> Not quite</p>
                  <p className="truncate text-sm">Correct answer: <span className="font-bold">{ex.answer}</span></p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          {status === 'idle'
            ? <Button size="lg" onClick={check} disabled={!answer.trim()}>Check</Button>
            : <Button size="lg" variant={status === 'correct' ? 'success' : 'primary'} onClick={next}>{index + 1 >= exercises.length ? 'Finish' : 'Continue'}</Button>}
        </div>
      </div>
    </div>
  )
}
