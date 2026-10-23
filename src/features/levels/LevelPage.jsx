import { Link, Navigate, useParams } from 'react-router-dom'
import { ChevronLeft, Check, Lock, Play, Star } from 'lucide-react'
import { getLevel, isLessonUnlocked } from '@/lib/curriculum'
import { useProgress } from '@/store/useProgress'
import { cn } from '@/lib/cn'

export default function LevelPage() {
  const { levelId } = useParams()
  const level = getLevel(levelId)
  const completed = useProgress((s) => s.completed)
  const showBn = useProgress((s) => s.showBn)
  if (!level) return <Navigate to="/levels" replace />

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/levels" className="inline-flex items-center gap-1 text-sm font-semibold text-ink-500 hover:text-ink-900"><ChevronLeft className="size-4" /> All levels</Link>
      <div className="mt-4 flex items-center gap-4">
        <span className="grid size-16 place-items-center rounded-2xl bg-brand-500 font-display text-2xl font-extrabold text-white">{level.code}</span>
        <div>
          <h1 className="text-3xl font-extrabold">{level.name}</h1>
          <p className="text-ink-500">{level.tagline}</p>
        </div>
      </div>

      <ol className="mt-10 space-y-3">
        {level.lessons.map((lesson, i) => {
          const unlocked = isLessonUnlocked(lesson.id, completed)
          const result = completed[lesson.id]
          const row = (
            <div className={cn('flex items-center gap-4 rounded-2xl border bg-white p-4 transition-all', unlocked ? 'border-ink-100 hover:border-brand-300 hover:shadow-sm' : 'border-ink-100 opacity-60')}>
              <span className={cn('grid size-11 shrink-0 place-items-center rounded-full', result ? 'bg-mint-50 text-mint-600' : unlocked ? 'bg-brand-50 text-brand-600' : 'bg-ink-100 text-ink-300')}>
                {result ? <Check className="size-5" /> : unlocked ? <Play className="size-5" /> : <Lock className="size-5" />}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-bold">{i + 1}. {lesson.title}</h2>
                <p className="truncate text-sm text-ink-500">{showBn ? lesson.titleBn + ' · ' : ''}{lesson.vocab.length} words</p>
              </div>
              {result && (
                <span className="flex" aria-label={`${result.stars} of 3 stars`}>
                  {[1, 2, 3].map((s) => <Star key={s} className={cn('size-4', s <= result.stars ? 'fill-sun-400 text-sun-400' : 'text-ink-200')} />)}
                </span>
              )}
            </div>
          )
          return <li key={lesson.id}>{unlocked ? <Link to={`/lesson/${lesson.id}`} className="block rounded-2xl">{row}</Link> : row}</li>
        })}
      </ol>
    </div>
  )
}
