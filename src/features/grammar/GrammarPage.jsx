import { useMemo, useState } from 'react'
import { BookOpen, Check, ChevronRight, Search, Sparkles } from 'lucide-react'
import { useProgress } from '@/store/useProgress'
import { useSiteContent } from '@/store/useSiteContent'

export default function GrammarPage() {
  const modules = useSiteContent((state) => state.grammarModules)
  const completed = useProgress((state) => state.grammarCompleted)
  const markGrammarComplete = useProgress((state) => state.markGrammarComplete)
  const showBn = useProgress((state) => state.showBn)
  const [activeModuleId, setActiveModuleId] = useState('')
  const [activeTopicTitle, setActiveTopicTitle] = useState('')
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')
  const allTopics = useMemo(
    () => modules.flatMap((module) => module.topics.map((topic, index) => ({
      ...topic,
      moduleId: module.id,
      moduleTitle: module.title,
      number: index + 1,
    }))),
    [modules]
  )
  const activeModule = modules.find((module) => module.id === activeModuleId) || modules[0]
  const activeId = activeModule?.id
  const visibleTopics = useMemo(() => {
    const term = query.trim().toLowerCase()
    const topics = term ? allTopics : allTopics.filter((topic) => topic.moduleId === activeId)
    return topics.filter((topic) =>
      !term || `${topic.title} ${topic.bn} ${topic.explain} ${topic.pattern}`.toLowerCase().includes(term)
    )
  }, [activeId, allTopics, query])
  const selected = visibleTopics.find((topic) => topic.title === activeTopicTitle) || visibleTopics[0]
  const progress = allTopics.length ? Math.round((completed.length / allTopics.length) * 100) : 0
  const selectedIndex = allTopics.findIndex((topic) => topic.title === selected?.title)

  function selectModule(module) {
    setActiveModuleId(module.id)
    setActiveTopicTitle(module.topics[0]?.title || '')
    setQuery('')
    setDraft('')
  }

  function selectTopic(topic) {
    setActiveModuleId(topic.moduleId)
    setActiveTopicTitle(topic.title)
    setDraft('')
  }

  if (!modules.length || !allTopics.length) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-dashed border-ink-200 bg-white px-6 py-20 text-center">
        <BookOpen className="mx-auto size-10 text-brand-500" />
        <h1 className="mt-4 text-2xl font-extrabold">Your grammar course is ready for lessons</h1>
        <p className="mt-2 text-ink-500">Add a module and its first topic from the content dashboard.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl pb-10">
      <header className="rounded-[2rem] border border-ink-100 bg-white p-6 shadow-sm sm:p-9">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-700">
              <Sparkles className="size-4" /> Grammar, step by step
            </span>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Make English grammar feel simple</h1>
            <p className="mt-3 leading-relaxed text-ink-500">
              Learn one clear idea at a time, see it in real sentences, then try it yourself.
            </p>
            {showBn && <p className="mt-2 leading-relaxed text-ink-500">সহজ ব্যাখ্যা ও উদাহরণ দেখে এক ধাপ করে ইংরেজি grammar শিখুন।</p>}
          </div>
          <div className="min-w-40 rounded-2xl bg-brand-50 p-4">
            <p className="text-2xl font-extrabold text-brand-800">{completed.length}<span className="text-base font-semibold text-brand-600"> / {allTopics.length}</span></p>
            <p className="mt-1 text-sm font-semibold text-brand-700">lessons complete</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-brand-500 transition-[width]" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
        <label className="mt-7 flex h-12 max-w-xl items-center gap-3 rounded-xl border border-ink-200 bg-ink-50 px-4 transition focus-within:border-brand-400 focus-within:bg-white">
          <Search className="size-4 text-ink-300" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a grammar topic..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-ink-300"
          />
        </label>
      </header>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Grammar course modules">
        {modules.map((module, index) => {
          const isActive = !query && (activeId ? activeId === module.id : index === 0)
          return (
            <button
              key={module.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectModule(module)}
              className={`rounded-2xl border p-4 text-left transition ${isActive ? 'border-brand-500 bg-brand-700 text-white shadow-md' : 'border-ink-100 bg-white hover:border-brand-200 hover:shadow-sm'}`}
            >
              <span className={`text-xs font-bold uppercase tracking-[0.1em] ${isActive ? 'text-brand-100' : 'text-brand-600'}`}>
                {String(index + 1).padStart(2, '0')} · {module.level}
              </span>
              <span className="mt-2 block font-display font-bold">{module.title}</span>
              {showBn && module.titleBn && <span className={`mt-0.5 block text-sm ${isActive ? 'text-brand-100' : 'text-ink-500'}`}>{module.titleBn}</span>}
              <span className={`mt-3 block text-xs font-semibold ${isActive ? 'text-brand-100' : 'text-ink-300'}`}>{module.topics.length} lessons</span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-sm lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-ink-100 bg-ink-50/70 p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="font-display font-bold">{query ? 'Search results' : activeModule?.title}</h2>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-ink-500">{visibleTopics.length}</span>
          </div>
          <nav className="grid max-h-[28rem] gap-1 overflow-y-auto sm:grid-cols-2 lg:grid-cols-1" aria-label="Grammar lessons">
            {visibleTopics.map((topic, index) => (
              <button
                key={`${topic.moduleId}-${topic.title}`}
                type="button"
                onClick={() => selectTopic(topic)}
                aria-current={selected?.title === topic.title ? 'page' : undefined}
                className={`flex min-h-12 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${selected?.title === topic.title ? 'bg-white font-bold text-brand-800 shadow-sm ring-1 ring-ink-100' : 'text-ink-600 hover:bg-white'}`}
              >
                <span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${completed.includes(topic.title) ? 'bg-brand-100 text-brand-700' : 'bg-ink-100 text-ink-500'}`}>
                  {completed.includes(topic.title) ? <Check className="size-3.5" /> : index + 1}
                </span>
                <span className="min-w-0 flex-1">{topic.title}</span>
              </button>
            ))}
            {!visibleTopics.length && <p className="py-5 text-sm text-ink-500">No grammar topics match that search.</p>}
          </nav>
        </aside>

        {selected ? (
          <article className="min-w-0 p-5 sm:p-8 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">{selected.moduleTitle} <span className="px-1 text-ink-300">/</span> Lesson {selectedIndex + 1}</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{selected.title}</h2>
            {showBn && selected.bn && <p className="mt-2 text-lg font-semibold text-ink-500">{selected.bn}</p>}

            <section className="mt-8">
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-ink-500">The simple explanation</h3>
              <p className="mt-2 max-w-3xl text-base leading-7 text-ink-700">{selected.explain}</p>
            </section>

            <section className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-700">Sentence pattern</p>
              <p className="mt-3 break-words font-mono text-base font-bold leading-relaxed text-brand-900 sm:text-lg">{selected.pattern}</p>
            </section>

            <section className="mt-7">
              <h3 className="font-display text-lg font-bold">Examples</h3>
              <div className="mt-3 divide-y divide-ink-100 rounded-2xl border border-ink-100 px-4">
                {(selected.examples || []).map(([english, bangla]) => (
                  <div key={english} className="py-4">
                    <p className="font-semibold">{english}</p>
                    {showBn && <p className="mt-1 text-sm text-ink-500">{bangla}</p>}
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-7">
              <label htmlFor="grammar-practice" className="font-display text-lg font-bold">Your turn</label>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">{selected.practice}</p>
              <textarea
                id="grammar-practice"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                rows={3}
                placeholder="Write your own sentence..."
                className="mt-3 w-full resize-y rounded-xl border border-ink-200 bg-ink-50 p-4 text-ink-900 outline-none transition focus:border-brand-400 focus:bg-white"
              />
            </section>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => markGrammarComplete(selected.title)}
                disabled={completed.includes(selected.title)}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-700 px-4 text-sm font-bold text-white transition hover:bg-brand-800 disabled:bg-brand-50 disabled:text-brand-700"
              >
                <Check className="size-4" />
                {completed.includes(selected.title) ? 'Lesson complete' : 'Mark lesson complete'}
              </button>
              {allTopics[selectedIndex + 1] && (
                <button
                  type="button"
                  onClick={() => selectTopic(allTopics[selectedIndex + 1])}
                  className="inline-flex h-11 items-center gap-1 rounded-xl px-3 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
                >
                  Next lesson <ChevronRight className="size-4" />
                </button>
              )}
            </div>
          </article>
        ) : (
          <div className="grid min-h-64 place-items-center p-8 text-center text-ink-500">Choose a grammar lesson to begin.</div>
        )}
      </div>
    </div>
  )
}
