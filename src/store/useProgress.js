import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEY } from '@/config'
import { todayKey, yesterdayKey } from '@/lib/utils'

export const useProgress = create(
  persist(
    (set, get) => ({
      xp: 0,
      streak: 0,
      lastActive: null,
      completed: {}, // { [lessonId]: { stars, score, total } }
      grammarCompleted: [],
      knownWords: [], // words marked "Got it" in flashcards
      showBn: true,

      toggleBn: () => set((s) => ({ showBn: !s.showBn })),

      completeLesson: (id, { score, total, stars, xp }) => {
        const s = get()
        const prev = s.completed[id]
        const better = !prev || stars > prev.stars
        const today = todayKey()
        let streak = s.streak
        if (s.lastActive !== today) streak = s.lastActive === yesterdayKey() ? s.streak + 1 : 1
        set({
          xp: s.xp + xp,
          streak,
          lastActive: today,
          completed: { ...s.completed, [id]: better ? { stars, score, total } : prev },
        })
      },

      markWord: (word, known) =>
        set((s) => ({
          knownWords: known
            ? Array.from(new Set([...s.knownWords, word]))
            : s.knownWords.filter((w) => w !== word),
        })),

      markGrammarComplete: (topic) =>
        set((s) => ({
          grammarCompleted: s.grammarCompleted.includes(topic)
            ? s.grammarCompleted
            : [...s.grammarCompleted, topic],
        })),

      reset: () => set({ xp: 0, streak: 0, lastActive: null, completed: {}, grammarCompleted: [], knownWords: [] }),
    }),
    { name: STORAGE_KEY }
  )
)
