import { useMemo, useState } from 'react'
import { BookOpen, Check, Search, Volume2 } from 'lucide-react'
import { getAllLessons } from '@/lib/curriculum'
import { SpeakButton } from '@/components/SpeakButton'
import { useProgress } from '@/store/useProgress'
import { useSiteContent } from '@/store/useSiteContent'

export default function VocabularyPage() {
  const [query, setQuery] = useState('')
  const [lessonId, setLessonId] = useState('all')
  const levels = useSiteContent((state) => state.levels)
  const showBn = useProgress((state) => state.showBn)
  const knownWords = useProgress((state) => state.knownWords)
  const markWord = useProgress((state) => state.markWord)
  const lessons = useMemo(() => getAllLessons(levels), [levels])
  const words = useMemo(
    () => lessons.flatMap((lesson) => lesson.vocab.map((word) => ({ ...word, lesson: lesson.title, lessonId: lesson.id }))),
    [lessons]
  )
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return words.filter((word) => {
      const matchesQuery = !term || `${word.w} ${word.bn} ${word.en} ${word.ex}`.toLowerCase().includes(term)
      return matchesQuery && (lessonId === 'all' || word.lessonId === lessonId)
    })
  }, [lessonId, query, words])
  const learnedCount = words.filter((word) => knownWords.includes(word.w)).length

  return (
    <div className="mx-auto max-w-6xl pb-10">
      <header className="overflow-hidden rounded-[2rem] bg-brand-900 px-6 py-8 text-white sm:px-10 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-100">
              <BookOpen className="size-4" /> Your word library
            </span>
            <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">Build a stronger vocabulary</h1>
            <p className="mt-3 max-w-xl leading-relaxed text-brand-100">
              Search, listen, and learn each word in context. Keep track of the words you already know.
            </p>
            {showBn && <p className="mt-2 leading-relaxed text-brand-100/80">শব্দ খুঁজুন, উচ্চারণ শুনুন, উদাহরণ দেখুন—আর শেখা শব্দগুলো চিহ্নিত করুন।</p>}
          </div>
          <div className="flex gap-3">
            <div className="min-w-28 rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-extrabold">{words.length}</p>
              <p className="mt-1 text-xs font-semibold text-brand-100">WORDS</p>
            </div>
            <div className="min-w-28 rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-extrabold">{learnedCount}</p>
              <p className="mt-1 text-xs font-semibold text-brand-100">LEARNED</p>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <label className="flex h-14 items-center gap-3 rounded-2xl bg-white px-4 text-ink-900 shadow-sm focus-within:ring-2 focus-within:ring-sun-400">
            <Search className="size-5 shrink-0 text-ink-300" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={showBn ? 'Search English or Bangla words...' : 'Search English words...'}
              className="w-full bg-transparent outline-none placeholder:text-ink-300"
            />
          </label>
          <label className="flex h-14 min-w-52 items-center rounded-2xl bg-white px-4 text-sm font-semibold text-ink-700 shadow-sm">
            <span className="sr-only">Filter by lesson</span>
            <select value={lessonId} onChange={(event) => setLessonId(event.target.value)} className="w-full bg-transparent outline-none">
              <option value="all">All lessons</option>
              {lessons.map((lesson) => <option key={lesson.id} value={lesson.id}>{lesson.title}</option>)}
            </select>
          </label>
        </div>
      </header>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-xl font-extrabold">Explore words</h2>
          <p className="mt-1 text-sm text-ink-500">Listen to pronunciation and learn from a real example.</p>
        </div>
        <p className="text-sm font-semibold text-ink-500">{filtered.length} of {words.length} words</p>
      </div>

      {filtered.length ? (
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {filtered.map((word, index) => {
            const known = knownWords.includes(word.w)
            return (
              <li key={`${word.lessonId}-${word.w}-${index}`} className="rounded-2xl border border-ink-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-2xl font-extrabold">{word.w}</h3>
                      <SpeakButton text={word.w} size="sm" />
                    </div>
                    {showBn && <p className="mt-1 text-sm font-semibold text-brand-700">{word.sound}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => markWord(word.w, !known)}
                    aria-pressed={known}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition ${known ? 'bg-brand-50 text-brand-700' : 'bg-ink-50 text-ink-500 hover:bg-brand-50 hover:text-brand-700'}`}
                  >
                    <Check className="size-3.5" /> {known ? 'Learned' : 'Mark learned'}
                  </button>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-700">{word.en}</p>
                {showBn && <p className="mt-1 font-semibold text-ink-800">{word.bn}</p>}
                <div className="mt-4 rounded-xl bg-ink-50 p-3.5">
                  <div className="flex items-start gap-2">
                    <Volume2 className="mt-0.5 size-4 shrink-0 text-brand-600" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink-800">“{word.ex}”</p>
                      {showBn && <p className="mt-1 text-sm text-ink-500">{word.exBn}</p>}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-xs font-semibold text-ink-300">{word.lesson}</p>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-16 text-center">
          <Search className="mx-auto size-8 text-ink-300" />
          <p className="mt-3 font-bold">No words found</p>
          <p className="mt-1 text-sm text-ink-500">Try another spelling or select a different lesson.</p>
        </div>
      )}
    </div>
  )
}
