import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SpeakButton } from '@/components/SpeakButton'
import { useProgress } from '@/store/useProgress'

export function LearnStep({ lesson, index, setIndex, onDone }) {
  const showBn = useProgress((s) => s.showBn)
  const [dir, setDir] = useState(1)
  const slides = lesson.vocab.length + 1
  const go = (n) => { setDir(n > index ? 1 : -1); setIndex(n) }
  const isLast = index === slides - 1
  const v = index > 0 ? lesson.vocab[index - 1] : null

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={index}
            custom={dir}
            variants={{
              enter: (d) => ({ opacity: 0, x: d * 40 }),
              center: { opacity: 1, x: 0 },
              exit: (d) => ({ opacity: 0, x: d * -40 }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {!v ? (
              <div className="rounded-3xl border border-ink-100 bg-white p-7 sm:p-9">
                <p className="text-sm font-semibold text-brand-600">{lesson.vocab.length} new words</p>
                <h1 className="mt-2 text-3xl font-extrabold">{lesson.title}</h1>
                <p className="mt-4 text-lg leading-relaxed text-ink-700">{lesson.intro}</p>
                {showBn && <p className="mt-3 text-lg leading-relaxed text-ink-500">{lesson.introBn}</p>}
              </div>
            ) : (
              <div className="rounded-3xl border border-ink-100 bg-white p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-5xl font-extrabold sm:text-6xl">{v.w}</h1>
                    {showBn && <p className="mt-2 text-lg font-semibold text-brand-600">{v.sound}</p>}
                  </div>
                  <div className="flex gap-2">
                    <SpeakButton text={v.w} size="lg" />
                    <SpeakButton text={v.w} slow size="lg" className="bg-sun-50 text-sun-700 hover:bg-sun-400/30" />
                  </div>
                </div>
                {showBn && <p className="mt-6 text-2xl font-bold">{v.bn}</p>}
                <p className={showBn ? 'mt-1 text-ink-500' : 'mt-6 text-lg text-ink-700'}>{v.en}</p>
                <div className="mt-7 flex items-start gap-3 rounded-2xl bg-ink-50 p-4">
                  <SpeakButton text={v.ex} />
                  <div>
                    <p className="text-lg font-semibold">{v.ex}</p>
                    {showBn && <p className="text-ink-500">{v.exBn}</p>}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => go(index - 1)} disabled={index === 0}><ChevronLeft className="size-4" /> Back</Button>
        {isLast
          ? <Button variant="success" size="lg" onClick={onDone}>Start practice <ArrowRight className="size-5" /></Button>
          : <Button size="lg" onClick={() => go(index + 1)}>{index === 0 ? 'Show words' : 'Next'} <ArrowRight className="size-5" /></Button>}
      </div>
    </div>
  )
}
