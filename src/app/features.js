/**
 * FEATURE REGISTRY — the single place that decides which pages exist.
 *  - Add a feature: create src/features/<name>/<Name>Page.jsx, then add one entry here.
 *  - Remove a feature: delete its entry (and folder). Nothing else breaks.
 *  - nav: true  -> shows in top/bottom navigation
 *  - layout: 'focus' -> full-screen page without navbar (e.g. lessons)
 */
import { lazy } from 'react'
import { Home, Layers, GalleryVerticalEnd, BarChart3, BookOpen, BookA, Languages, PenLine, PlayCircle, CircleUserRound, Route, BriefcaseBusiness } from 'lucide-react'

export const features = [
  { id: 'home', path: '/', label: 'Home', icon: Home, nav: true, Component: lazy(() => import('@/features/home/HomePage')) },
  { id: 'levels', path: '/levels', label: 'Levels', icon: Layers, nav: true, Component: lazy(() => import('@/features/levels/LevelsPage')) },
  { id: 'level', path: '/levels/:levelId', Component: lazy(() => import('@/features/levels/LevelPage')) },
  { id: 'flashcards', path: '/flashcards', label: 'Flashcards', icon: GalleryVerticalEnd, nav: true, Component: lazy(() => import('@/features/flashcards/FlashcardsPage')) },
  { id: 'progress', path: '/progress', label: 'Progress', icon: BarChart3, nav: true, Component: lazy(() => import('@/features/progress/ProgressPage')) },
  { id: 'vocabulary', path: '/vocabulary', label: 'Vocabulary', icon: BookA, nav: true, Component: lazy(() => import('@/features/vocabulary/VocabularyPage')) },
  { id: 'grammar', path: '/grammar', label: 'Grammar', icon: BookOpen, nav: true, Component: lazy(() => import('@/features/grammar/GrammarPage')) },
  { id: 'roadmap', path: '/roadmap', label: 'Roadmap', icon: Route, nav: false, Component: lazy(() => import('@/features/roadmap/RoadmapPage')) },
  { id: 'meetings', path: '/meetings', label: 'Client meetings', icon: BriefcaseBusiness, nav: false, Component: lazy(() => import('@/features/meetings/MeetingsPage')) },
  { id: 'translate', path: '/translate', label: 'Translate', icon: Languages, nav: false, Component: lazy(() => import('@/features/translate/TranslatePage')) },
  { id: 'sentences', path: '/sentences', label: 'Sentence builder', icon: PenLine, nav: false, Component: lazy(() => import('@/features/sentences/SentencesPage')) },
  { id: 'videos', path: '/videos', label: 'Videos', icon: PlayCircle, nav: false, Component: lazy(() => import('@/features/videos/VideosPage')) },
  { id: 'account', path: '/account', label: 'Log in', icon: CircleUserRound, nav: false, layout: 'focus', Component: lazy(() => import('@/features/account/AccountPage')) },
  { id: 'lesson', path: '/lesson/:lessonId', layout: 'focus', Component: lazy(() => import('@/features/lesson/LessonPage')) },
]
