import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, ArrowRight } from 'lucide-react'
import { levelProgress, isLevelUnlocked } from '@/lib/curriculum'
import { useProgress } from '@/store/useProgress'
import { useSiteContent } from '@/store/useSiteContent'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { cn } from '@/lib/cn'

export default function LevelsPage() {
  const completed = useProgress((s) => s.completed)
  const levels = useSiteContent((s) => s.levels)
  return (
    <div>
      <h1 className="text-3xl font-extrabold sm:text-4xl">Choose your step</h1>
      <p className="mt-2 text-ink-500">ধাপে ধাপে এগিয়ে যান। একটি লেভেল শেষ করলে পরেরটি খুলে যাবে।</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {levels.map((level, i) => {
          const unlocked = isLevelUnlocked(level, completed, levels)
          const p = levelProgress(level, completed)
          const body = (
            <Card className={cn('flex h-full flex-col p-6 transition-all', unlocked ? 'hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md' : 'opacity-60')}>
              <div className="flex items-start justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-brand-500 font-display text-xl font-extrabold text-white" style={{ opacity: 0.5 + i * 0.1 }}>
                  {level.code}
                </span>
                {unlocked ? <ArrowRight className="size-5 text-ink-300" /> : <Lock className="size-5 text-ink-300" aria-label="Locked" />}
              </div>
              <h2 className="mt-5 text-xl font-bold">{level.name} <span className="text-base font-medium text-ink-500">· {level.nameBn}</span></h2>
              <p className="mt-1 flex-1 text-ink-500">{level.tagline}</p>
              <div className="mt-5">
                <div className="mb-1.5 flex justify-between text-sm font-semibold text-ink-500">
                  <span>{p.done} of {p.total} lessons</span>
                  <span>{Math.round(p.pct * 100)}%</span>
                </div>
                <ProgressBar value={p.pct} />
              </div>
            </Card>
          )
          return (
            <motion.li key={level.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              {unlocked ? <Link to={`/levels/${level.id}`} className="block h-full rounded-2xl">{body}</Link> : body}
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
