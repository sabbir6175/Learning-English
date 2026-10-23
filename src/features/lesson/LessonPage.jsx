import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { X } from 'lucide-react'
import { isLessonUnlocked } from '@/lib/curriculum'
import { useProgress } from '@/store/useProgress'
import { useSiteContent } from '@/store/useSiteContent'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { BnToggle } from '@/components/BnToggle'
import { stopSpeaking } from '@/lib/speech'
import { buildExercises } from './buildExercises'
import { LearnStep } from './LearnStep'
import { ExerciseStep } from './ExerciseStep'
import { ResultStep } from './ResultStep'

export default function LessonPage() {
  const { lessonId } = useParams()
  const levels = useSiteContent((state) => state.levels)
  const level = levels.find((item) => item.lessons.some((lesson) => lesson.id === lessonId && lesson.published !== false))
  const lesson = level?.lessons.find((item) => item.id === lessonId)
  const lessonWithLevel = lesson ? { ...lesson, levelId: level.id } : null
  const completed = useProgress((s) => s.completed)
  if (!lessonWithLevel) return <Navigate to="/levels" replace />
  if (!isLessonUnlocked(lessonWithLevel.id, completed, levels)) return <Navigate to={`/levels/${lessonWithLevel.levelId}`} replace />
  // key resets all lesson state when navigating lesson -> next lesson
  return <LessonFlow key={lessonWithLevel.id} lesson={lessonWithLevel} levels={levels} />
}

function LessonFlow({ lesson, levels }) {
  const level = levels.find((item) => item.id === lesson.levelId)
  const [phase, setPhase] = useState('learn') // learn | practice | result
  const [attempt, setAttempt] = useState(0)
  const [learnIdx, setLearnIdx] = useState(0)
  const [exIdx, setExIdx] = useState(0)
  const [result, setResult] = useState(null)

  const exercises = useMemo(() => buildExercises(lesson, level), [lesson, level, attempt])
  const learnCount = lesson.vocab.length + 1
  const totalSteps = learnCount + exercises.length
  const done = phase === 'learn' ? learnIdx : phase === 'practice' ? learnCount + exIdx : totalSteps

  const startPractice = () => { setExIdx(0); setPhase('practice') }
  const retry = () => { stopSpeaking(); setAttempt((a) => a + 1); setExIdx(0); setResult(null); setPhase('practice') }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-2xl items-center gap-4 px-4 py-4 sm:px-6">
        <Link to={`/levels/${lesson.levelId}`} onClick={stopSpeaking} aria-label="Close lesson" className="grid size-10 shrink-0 place-items-center rounded-full text-ink-500 hover:bg-ink-100"><X className="size-5" /></Link>
        <ProgressBar value={done / totalSteps} />
        <BnToggle />
      </header>
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pb-8 sm:px-6">
        {phase === 'learn' && <LearnStep lesson={lesson} index={learnIdx} setIndex={setLearnIdx} onDone={startPractice} />}
        {phase === 'practice' && (
          <ExerciseStep key={attempt} exercises={exercises} index={exIdx} setIndex={setExIdx} onFinish={(r) => { setResult(r); setPhase('result') }} />
        )}
        {phase === 'result' && result && (
          <ResultStep lesson={lesson} result={result} onRetry={retry} onReview={() => { setLearnIdx(0); setPhase('learn') }} />
        )}
      </main>
    </div>
  )
}
