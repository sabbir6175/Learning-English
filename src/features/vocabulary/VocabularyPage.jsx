import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { ALL_LESSONS } from '@/lib/curriculum'
import { SpeakButton } from '@/components/SpeakButton'

const words = ALL_LESSONS.flatMap((lesson) => lesson.vocab.map((word) => ({ ...word, lesson: lesson.titleBn || lesson.title })))

export default function VocabularyPage() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return words
    return words.filter((word) => `${word.w} ${word.bn} ${word.en}`.toLowerCase().includes(term))
  }, [query])

  return (
    <div className="mx-auto max-w-5xl">
      <header className="border-b border-ink-200 pb-6">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-brand-600">শব্দভান্ডার</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-extrabold sm:text-4xl">Vocabulary</h1><p className="mt-2 max-w-2xl text-ink-500">অর্থ ও উদাহরণসহ শব্দ পড়ুন, উচ্চারণ শুনুন, তারপর নিজের বাক্যে ব্যবহার করুন।</p></div><p className="text-sm font-semibold text-ink-500">{filtered.length} / {words.length} শব্দ</p></div>
        <label className="mt-5 flex h-12 max-w-lg items-center gap-3 border border-ink-200 bg-white px-4 focus-within:border-brand-500"><Search className="size-5 text-ink-300" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="English বা বাংলা শব্দ খুঁজুন" className="w-full bg-transparent outline-none placeholder:text-ink-300" /></label>
      </header>
      <div className="mt-6 divide-y divide-ink-100">
        {filtered.map((word, index) => (
          <article key={`${word.w}-${word.lesson}-${index}`} className="grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
            <div><div className="flex flex-wrap items-center gap-3"><h2 className="font-display text-xl font-bold">{word.w}</h2><SpeakButton text={word.w} size="sm" /><span className="text-sm text-ink-300">{word.sound}</span></div><p className="mt-1 font-semibold text-brand-700">{word.bn}</p><p className="mt-1 text-sm text-ink-500">{word.en}</p><p className="mt-3 text-sm text-ink-700">“{word.ex}” <span className="text-ink-300">/</span> {word.exBn}</p></div>
            <span className="text-xs font-semibold text-ink-300">{word.lesson}</span>
          </article>
        ))}
        {!filtered.length && <p className="py-12 text-center text-ink-500">এই শব্দটি পাওয়া যায়নি। অন্য বানানে খুঁজে দেখুন।</p>}
      </div>
    </div>
  )
}