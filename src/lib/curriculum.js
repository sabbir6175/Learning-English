import { SEQUENTIAL_UNLOCK } from '@/config'
import { useSiteContent } from '@/store/useSiteContent'

export const getLevels = () => useSiteContent.getState().levels
export const getAllLessons = (levels = getLevels()) =>
  levels.flatMap((level) => level.lessons
    .filter((lesson) => lesson.published !== false)
    .map((lesson) => ({ ...lesson, levelId: level.id })))
export const getLevel = (id, levels = getLevels()) => levels.find((level) => level.id === id)
export const getLesson = (id, levels = getLevels()) =>
  getAllLessons(levels).find((lesson) => lesson.id === id)

export const isLessonUnlocked = (id, completed, levels = getLevels()) => {
  if (!SEQUENTIAL_UNLOCK) return true
  const lessons = getAllLessons(levels)
  const i = lessons.findIndex((lesson) => lesson.id === id)
  return i <= 0 || !!completed[lessons[i - 1].id]
}
export const isLevelUnlocked = (level, completed, levels = getLevels()) =>
  !level.lessons.some((lesson) => lesson.published !== false)
    || isLessonUnlocked(level.lessons.find((lesson) => lesson.published !== false).id, completed, levels)
export const getNextLesson = (completed, levels = getLevels()) =>
  getAllLessons(levels).find((lesson) => !completed[lesson.id]) ?? null
export const getFollowingLesson = (id, levels = getLevels()) => {
  const lessons = getAllLessons(levels)
  const i = lessons.findIndex((lesson) => lesson.id === id)
  return lessons[i + 1] ?? null
}
export const levelProgress = (level, completed) => {
  const lessons = level.lessons.filter((lesson) => lesson.published !== false)
  const done = lessons.filter((lesson) => completed[lesson.id]).length
  const total = lessons.length
  return { done, total, pct: total ? done / total : 0 }
}
export const totalWords = (levels = getLevels()) =>
  getAllLessons(levels).reduce((total, lesson) => total + lesson.vocab.length, 0)
