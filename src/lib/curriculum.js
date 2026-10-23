import { LEVELS } from '@/data/curriculum'
import { SEQUENTIAL_UNLOCK } from '@/config'

export { LEVELS }
export const ALL_LESSONS = LEVELS.flatMap((l) => l.lessons.map((ls) => ({ ...ls, levelId: l.id })))
export const getLevel = (id) => LEVELS.find((l) => l.id === id)
export const getLesson = (id) => ALL_LESSONS.find((l) => l.id === id)

export const isLessonUnlocked = (id, completed) => {
  if (!SEQUENTIAL_UNLOCK) return true
  const i = ALL_LESSONS.findIndex((l) => l.id === id)
  return i <= 0 || !!completed[ALL_LESSONS[i - 1].id]
}
export const isLevelUnlocked = (level, completed) => isLessonUnlocked(level.lessons[0].id, completed)
export const getNextLesson = (completed) => ALL_LESSONS.find((l) => !completed[l.id]) ?? null
export const getFollowingLesson = (id) => {
  const i = ALL_LESSONS.findIndex((l) => l.id === id)
  return ALL_LESSONS[i + 1] ?? null
}
export const levelProgress = (level, completed) => {
  const done = level.lessons.filter((l) => completed[l.id]).length
  return { done, total: level.lessons.length, pct: done / level.lessons.length }
}
export const totalWords = () => ALL_LESSONS.reduce((n, l) => n + l.vocab.length, 0)
