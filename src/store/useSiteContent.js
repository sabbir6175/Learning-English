import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LEVELS } from '@/data/curriculum'
import { DEFAULT_GRAMMAR_MODULES } from '@/data/grammar'
import { firebaseConfigured } from '@/lib/firebaseConfig'

export const useSiteContent = create(
  persist(
    (set) => ({
      levels: LEVELS,
      grammarModules: DEFAULT_GRAMMAR_MODULES,
      cloudStatus: firebaseConfigured ? 'connecting' : 'local',
      cloudError: '',
      replaceLevels: (levels) => set({ levels }),
      replaceGrammarModules: (grammarModules) => set({ grammarModules }),
      resetContent: () => set({ levels: LEVELS, grammarModules: DEFAULT_GRAMMAR_MODULES }),
      setCloudStatus: (cloudStatus, cloudError = '') => set({ cloudStatus, cloudError }),
      loadCloudContent: (levels, grammarModules) => set({ levels, grammarModules, cloudStatus: 'connected', cloudError: '' }),
    }),
    {
      name: 'sopan-site-content-v1',
      partialize: ({ levels, grammarModules }) => ({ levels, grammarModules }),
    }
  )
)

if (firebaseConfigured) {
  void Promise.all([import('@/lib/firebase'), import('firebase/firestore')])
    .then(([{ firestore }, { doc, onSnapshot }]) => {
      const contentRef = doc(firestore, 'siteContent', 'current')
      onSnapshot(
        contentRef,
        (snapshot) => {
          if (!snapshot.exists()) {
            useSiteContent.getState().setCloudStatus('empty')
            return
          }

          const content = snapshot.data()
          if (!Array.isArray(content.levels) || !Array.isArray(content.grammarModules)) {
            useSiteContent.getState().setCloudStatus('error', 'Cloud content has an invalid format.')
            return
          }

          useSiteContent.getState().loadCloudContent(content.levels, content.grammarModules)
        },
        (error) => {
          useSiteContent.getState().setCloudStatus('error', error.message)
        }
      )
    })
    .catch((error) => {
      useSiteContent.getState().setCloudStatus('error', error instanceof Error ? error.message : 'Could not connect to Firebase.')
    })
}
