import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useProgress } from '@/store/useProgress'
import { getFollowingLesson, isLessonUnlocked } from '@/lib/curriculum'
import { PASS_PERCENT, XP } from '@/config'
import { starsFor } from './buildExercises'
import { cn } from '@/lib/cn'

export function ResultStep({ lesson, result, onRetry, onReview }) {
  const { score, total } = result
  const pct = score / total
  const passed = pct >= PASS_PERCENT
  const stars = passed ? starsFor(pct) : 0
  const completed = useProgress((s) => s.completed)
  const complete = useProgress((s) => s.completeLesson)
  const wasDone = useRef(!!completed[lesson.id])
  const saved = useRef(false)
  const xp = !passed ? 0 : wasDone.current ? score * 2 : score * XP.correct + XP.lessonBonus + stars * XP.perStar

  useEffect(() => {
    if (passed && !saved.current) {
      saved.current = true
      complete(lesson.id, { score, total, stars, xp })
    }
  }, [passed, complete, lesson.id, score, total, stars, xp])

  const following = getFollowingLesson(lesson.id)
  const canNext = passed && following && isLessonUnlocked(following.id, { ...completed, [lesson.id]: true })

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
      <div className="flex gap-2" aria-label={`${stars} of 3 stars`}>
        {[1, 2, 3].map((s) => (
          <motion.div key={s} initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.15 + s * 0.18, type: 'spring', stiffness: 260, damping: 14 }}>
            <Star className={cn('size-16', s <= stars ? 'fill-sun-400 text-sun-400' : 'text-ink-200')} />
          </motion.div>
        ))}
      </div>
      <h1 className="mt-6 text-4xl font-extrabold">{passed ? (stars === 3 ? 'Perfect step!' : 'Lesson complete') : 'Almost there'}</h1>
      <p className="mt-2 max-w-sm text-ink-500">
        {passed ? `You answered ${score} of ${total} correctly.` : `You answered ${score} of ${total}. Reach ${Math.round(PASS_PERCENT * 100)}% to unlock the next lesson.`}
      </p>
      {passed && (
        <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-4 py-2 font-bold text-brand-700">
          <Zap className="size-4" /> +{xp} XP
        </span>
      )}
      <div className="mt-10 flex w-full max-w-sm flex-col gap-3">
        {canNext && <Button to={`/lesson/${following.id}`} size="lg" variant="success">Next lesson</Button>}
        {!passed && <Button size="lg" onClick={onReview}>Review the words</Button>}
        <Button variant="secondary" size="lg" onClick={onRetry}>{passed ? 'Practice again' : 'Try again'}</Button>
        <Button to={`/levels/${lesson.levelId}`} variant="ghost">Back to lessons</Button>
      </div>
    </div>
  )
}
