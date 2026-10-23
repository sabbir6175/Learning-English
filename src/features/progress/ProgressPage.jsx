import { Flame, Zap, BookCheck, Languages } from 'lucide-react'
import { levelProgress, getAllLessons, totalWords } from '@/lib/curriculum'
import { useProgress } from '@/store/useProgress'
import { useSiteContent } from '@/store/useSiteContent'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'

export default function ProgressPage() {
  const { xp, streak, completed, knownWords, reset } = useProgress()
  const levels = useSiteContent((s) => s.levels)
  const lessons = getAllLessons(levels)
  const doneLessons = Object.keys(completed).length
  const stats = [
    { icon: Zap, label: 'Total XP', value: xp, tone: 'bg-brand-50 text-brand-600' },
    { icon: Flame, label: 'Day streak', value: streak, tone: 'bg-sun-50 text-sun-500' },
    { icon: BookCheck, label: 'Lessons done', value: `${doneLessons}/${lessons.length}`, tone: 'bg-mint-50 text-mint-600' },
    { icon: Languages, label: 'Words known', value: `${knownWords.length}/${totalWords(levels)}`, tone: 'bg-ink-100 text-ink-700' },
  ]
  return (
    <div>
      <h1 className="text-3xl font-extrabold sm:text-4xl">Your progress</h1>
      <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <li key={s.label}>
            <Card className="p-5">
              <span className={`grid size-10 place-items-center rounded-xl ${s.tone}`}><s.icon className="size-5" /></span>
              <p className="mt-4 font-display text-3xl font-extrabold">{s.value}</p>
              <p className="text-sm text-ink-500">{s.label}</p>
            </Card>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl font-bold">Level by level</h2>
      <Card className="mt-4 divide-y divide-ink-100">
        {levels.map((lv) => {
          const p = levelProgress(lv, completed)
          return (
            <div key={lv.id} className="flex items-center gap-4 p-4 sm:p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-500 font-display font-extrabold text-white">{lv.code}</span>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between text-sm"><span className="font-bold">{lv.name}</span><span className="text-ink-500">{p.done}/{p.total}</span></div>
                <ProgressBar value={p.pct} className="mt-2" />
              </div>
            </div>
          )
        })}
      </Card>

      <div className="mt-10">
        <Button variant="ghost" size="sm" onClick={() => { if (confirm('Reset all progress? This cannot be undone.')) reset() }}>Reset progress</Button>
      </div>
    </div>
  )
}
