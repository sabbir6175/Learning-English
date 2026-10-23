import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, BookA, BookOpen, Check, Cloud, CloudOff, Database, Download, Globe2, LoaderCircle, LockKeyhole, LogOut, Plus, Save, ShieldAlert, ShieldCheck, Trash2, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/layout/Logo'
import { useSiteContent } from '@/store/useSiteContent'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { firebaseAuth, firestore } from '@/lib/firebase'
import { adminEmail, firebaseConfigIncomplete, firebaseConfigured } from '@/lib/firebaseConfig'

function makeId(value, prefix) {
  const slug = value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `${prefix}-${slug || Date.now()}`
}

function Field({ label, value, onChange, multiline = false, required = false, placeholder = '' }) {
  const shared = 'mt-1.5 w-full rounded-xl border border-ink-200 bg-ink-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-brand-400 focus:bg-white'
  return (
    <label className="block text-sm font-semibold text-ink-700">
      {label}
      {multiline ? (
        <textarea required={required} value={value || ''} onChange={onChange} rows={3} placeholder={placeholder} className={`${shared} resize-y leading-relaxed`} />
      ) : (
        <input required={required} value={value || ''} onChange={onChange} placeholder={placeholder} className={shared} />
      )}
    </label>
  )
}

export default function AdminDashboard() {
  const levels = useSiteContent((state) => state.levels)
  const grammarModules = useSiteContent((state) => state.grammarModules)
  const replaceLevels = useSiteContent((state) => state.replaceLevels)
  const replaceGrammarModules = useSiteContent((state) => state.replaceGrammarModules)
  const resetContent = useSiteContent((state) => state.resetContent)
  const cloudStatus = useSiteContent((state) => state.cloudStatus)
  const cloudError = useSiteContent((state) => state.cloudError)
  const [adminUser, setAdminUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [email, setEmail] = useState(adminEmail)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authBusy, setAuthBusy] = useState(false)
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState('curriculum')
  const [levelId, setLevelId] = useState(levels[0]?.id || '')
  const [lessonId, setLessonId] = useState('')
  const [grammarModuleId, setGrammarModuleId] = useState(grammarModules[0]?.id || '')
  const [newLevelName, setNewLevelName] = useState('')
  const [newLessonTitle, setNewLessonTitle] = useState('')
  const [newLessonBangla, setNewLessonBangla] = useState('')
  const [newWord, setNewWord] = useState('')
  const [newFillQuestion, setNewFillQuestion] = useState('')
  const [newFillAnswer, setNewFillAnswer] = useState('')
  const [newModuleTitle, setNewModuleTitle] = useState('')
  const [newModuleLevel, setNewModuleLevel] = useState('Beginner')
  const [newTopicTitle, setNewTopicTitle] = useState('')
  const [notice, setNotice] = useState('')
  const [dataError, setDataError] = useState('')

  const currentLevel = levels.find((level) => level.id === levelId) || levels[0]
  const currentLesson = currentLevel?.lessons.find((lesson) => lesson.id === lessonId) || currentLevel?.lessons[0]
  const currentGrammarModule = grammarModules.find((module) => module.id === grammarModuleId) || grammarModules[0]
  const wordCount = useMemo(() => levels.reduce((total, level) => total + level.lessons.reduce((sum, lesson) => sum + lesson.vocab.length, 0), 0), [levels])
  const topicCount = useMemo(() => grammarModules.reduce((total, module) => total + module.topics.length, 0), [grammarModules])

  useEffect(() => {
    if (!firebaseConfigured) {
      setAuthReady(true)
      return undefined
    }

    return onAuthStateChanged(firebaseAuth, (user) => {
      if (user && (user.email?.toLowerCase() !== adminEmail || !user.emailVerified)) {
        setAuthError(user.email?.toLowerCase() !== adminEmail
          ? 'This Firebase account is not allowed to manage site content.'
          : 'Verify the administrator email address before managing site content.')
        void signOut(firebaseAuth).catch((error) => setAuthError(error.message))
        setAdminUser(null)
      } else {
        setAdminUser(user)
      }
      setAuthReady(true)
    }, (error) => {
      setAuthError(error.message)
      setAuthReady(true)
    })
  }, [])

  async function handleAuth(event) {
    event.preventDefault()
    setAuthError('')
    if (!firebaseConfigured || !firebaseAuth) {
      setAuthError('Firebase is not configured for this app yet.')
      return
    }

    if (email.trim().toLowerCase() !== adminEmail) {
      setAuthError(`Use the configured administrator email: ${adminEmail}`)
      return
    }

    setAuthBusy(true)
    try {
      await signInWithEmailAndPassword(firebaseAuth, email.trim(), password)
      setPassword('')
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Could not sign in with Firebase.')
    } finally {
      setAuthBusy(false)
    }
  }

  async function handleSignOut() {
    if (!firebaseAuth) return
    try {
      await signOut(firebaseAuth)
    } catch (error) {
      setDataError(error instanceof Error ? error.message : 'Could not sign out.')
    }
  }

  async function saveToCloud() {
    if (!adminUser || !firestore) {
      setDataError('Sign in to Firebase before saving site content.')
      return
    }

    setDataError('')
    setSaving(true)
    try {
      await setDoc(doc(firestore, 'siteContent', 'current'), {
        levels,
        grammarModules,
        updatedAt: serverTimestamp(),
      })
      setNotice('Content saved to Firebase and synced to the website.')
    } catch (error) {
      setDataError(error instanceof Error ? error.message : 'Could not save content to Firebase.')
    } finally {
      setSaving(false)
    }
  }

  function updateLesson(patch) {
    if (!currentLevel || !currentLesson) return
    replaceLevels(levels.map((level) => level.id !== currentLevel.id ? level : {
      ...level,
      lessons: level.lessons.map((lesson) => lesson.id === currentLesson.id ? { ...lesson, ...patch } : lesson),
    }))
  }

  function updateWord(index, patch) {
    if (!currentLesson) return
    updateLesson({ vocab: currentLesson.vocab.map((word, wordIndex) => wordIndex === index ? { ...word, ...patch } : word) })
  }

  function updateFill(index, patch) {
    if (!currentLesson) return
    updateLesson({ fill: currentLesson.fill.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item) })
  }

  function updateGrammarModule(patch) {
    if (!currentGrammarModule) return
    replaceGrammarModules(grammarModules.map((module) => module.id === currentGrammarModule.id ? { ...module, ...patch } : module))
  }

  function addLevel(event) {
    event.preventDefault()
    const name = newLevelName.trim()
    if (!name) return
    const level = {
      id: makeId(name, 'level'),
      code: `L${levels.length + 1}`,
      name,
      nameBn: '',
      bnOptions: true,
      tagline: '',
      lessons: [],
    }
    replaceLevels([...levels, level])
    setLevelId(level.id)
    setNewLevelName('')
    setNotice('Level added. Add its first lesson below.')
  }

  function addLesson(event) {
    event.preventDefault()
    if (!currentLevel || !newLessonTitle.trim()) return
    const lesson = {
      id: makeId(`${currentLevel.id}-${newLessonTitle}`, 'lesson'),
      title: newLessonTitle.trim(),
      titleBn: newLessonBangla.trim(),
      intro: '',
      introBn: '',
      vocab: [],
      fill: [],
      published: false,
    }
    const updatedLevel = { ...currentLevel, lessons: [...currentLevel.lessons, lesson] }
    replaceLevels(levels.map((level) => level.id === currentLevel.id ? updatedLevel : level))
    setLessonId(lesson.id)
    setNewLessonTitle('')
    setNewLessonBangla('')
    setNotice('Draft lesson added. Add at least one word, then publish it.')
  }

  function addWord(event) {
    event.preventDefault()
    if (!currentLesson || !newWord.trim()) return
    const word = { w: newWord.trim(), sound: '', bn: '', en: '', ex: '', exBn: '' }
    updateLesson({ vocab: [...currentLesson.vocab, word] })
    setNewWord('')
  }

  function addFillQuestion(event) {
    event.preventDefault()
    if (!currentLesson || !newFillQuestion.trim() || !newFillAnswer.trim()) return
    updateLesson({ fill: [...currentLesson.fill, { q: newFillQuestion.trim(), a: newFillAnswer.trim(), bn: '', d: [] }] })
    setNewFillQuestion('')
    setNewFillAnswer('')
  }

  function removeLesson() {
    if (!currentLevel || !currentLesson || !window.confirm(`Delete "${currentLesson.title}" and its vocabulary?`)) return
    const remaining = currentLevel.lessons.filter((lesson) => lesson.id !== currentLesson.id)
    replaceLevels(levels.map((level) => level.id === currentLevel.id ? { ...level, lessons: remaining } : level))
    setLessonId(remaining[0]?.id || '')
    setNotice('Lesson deleted from this browser.')
  }

  function removeLevel() {
    if (!currentLevel || !window.confirm(`Delete the "${currentLevel.name}" level and all its lessons?`)) return
    const remaining = levels.filter((level) => level.id !== currentLevel.id)
    replaceLevels(remaining)
    setLevelId(remaining[0]?.id || '')
    setLessonId('')
    setNotice('Level deleted from this browser.')
  }

  function addGrammarModule(event) {
    event.preventDefault()
    if (!newModuleTitle.trim()) return
    const module = { id: makeId(newModuleTitle, 'grammar'), title: newModuleTitle.trim(), level: newModuleLevel, topics: [] }
    replaceGrammarModules([...grammarModules, module])
    setGrammarModuleId(module.id)
    setNewModuleTitle('')
  }

  function addGrammarTopic(event) {
    event.preventDefault()
    if (!currentGrammarModule || !newTopicTitle.trim()) return
    const topic = {
      title: newTopicTitle.trim(),
      bn: '',
      explain: '',
      pattern: '',
      examples: [['', '']],
      practice: '',
    }
    updateGrammarModule({ topics: [...currentGrammarModule.topics, topic] })
    setNewTopicTitle('')
    setNotice('Grammar topic added. Fill in its explanation and examples.')
  }

  function updateGrammarTopic(index, patch) {
    if (!currentGrammarModule) return
    updateGrammarModule({
      topics: currentGrammarModule.topics.map((topic, topicIndex) => topicIndex === index ? { ...topic, ...patch } : topic),
    })
  }

  function removeGrammarTopic(index) {
    if (!currentGrammarModule || !window.confirm('Delete this grammar topic?')) return
    updateGrammarModule({ topics: currentGrammarModule.topics.filter((_, topicIndex) => topicIndex !== index) })
  }

  function removeGrammarModule() {
    if (!currentGrammarModule || !window.confirm(`Delete "${currentGrammarModule.title}" and all its topics?`)) return
    const remaining = grammarModules.filter((module) => module.id !== currentGrammarModule.id)
    replaceGrammarModules(remaining)
    setGrammarModuleId(remaining[0]?.id || '')
  }

  function exportContent() {
    const file = new Blob([JSON.stringify({ levels, grammarModules }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(file)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'sabbir-english-content.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  async function importContent(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setDataError('')
    try {
      const imported = JSON.parse(await file.text())
      const validLevels = Array.isArray(imported.levels) && imported.levels.every((level) =>
        level && typeof level.id === 'string' && typeof level.name === 'string' &&
        Array.isArray(level.lessons) && level.lessons.every((lesson) =>
          lesson && typeof lesson.id === 'string' && typeof lesson.title === 'string' &&
          Array.isArray(lesson.vocab) && Array.isArray(lesson.fill)
        )
      )
      const validGrammar = Array.isArray(imported.grammarModules) && imported.grammarModules.every((module) =>
        module && typeof module.id === 'string' && typeof module.title === 'string' &&
        Array.isArray(module.topics) && module.topics.every((topic) =>
          topic && typeof topic.title === 'string' && Array.isArray(topic.examples)
        )
      )
      if (!validLevels || !validGrammar) {
        throw new Error('This backup has invalid lesson or grammar data and was not imported.')
      }
      replaceLevels(imported.levels)
      replaceGrammarModules(imported.grammarModules)
      setLevelId(imported.levels[0]?.id || '')
      setLessonId('')
      setGrammarModuleId(imported.grammarModules[0]?.id || '')
      setNotice('Content backup restored on this browser.')
    } catch (error) {
      setDataError(error instanceof Error ? error.message : 'Could not import that file.')
    } finally {
      event.target.value = ''
    }
  }

  function restoreStarterContent() {
    if (!window.confirm('Replace all local curriculum and grammar changes with the original starter content?')) return
    resetContent()
    setLevelId('')
    setLessonId('')
    setGrammarModuleId('')
    setNotice('Starter content restored.')
  }

  if (!firebaseConfigured || !authReady || !adminUser) {
    const needsConfig = !firebaseConfigured

    return (
      <div className="min-h-dvh bg-ink-50 px-4 py-6 sm:px-8">
        <header className="mx-auto flex max-w-6xl items-center justify-between"><Logo /><Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500 hover:text-brand-700"><ArrowLeft className="size-4" /> Back to the site</Link></header>
        <main className="mx-auto grid max-w-5xl gap-8 py-10 md:grid-cols-[1fr_.9fr] md:items-center md:py-16">
          <section>
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700"><LockKeyhole className="size-6" /></span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-brand-600">Sabbir English · Admin</p>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{needsConfig ? 'Connect your Firebase project' : 'Welcome back'}</h1>
            <p className="mt-3 max-w-lg leading-relaxed text-ink-500">
              {needsConfig
                ? 'Set up Firebase Authentication and Firestore once. Your published lessons and grammar will then sync across devices.'
                : 'Sign in with the administrator account created in Firebase Authentication.'}
            </p>
            {needsConfig ? (
              <div className="mt-6 space-y-4 rounded-2xl border border-ink-100 bg-white p-5 text-sm leading-relaxed text-ink-600">
                <h2 className="font-bold text-ink-900">Setup checklist</h2>
                <ol className="list-inside list-decimal space-y-2">
                  <li>Create a Firebase project and add a Web app.</li>
                  <li>Enable Email/Password in Authentication and create your admin account.</li>
                  <li>Create a Firestore database and deploy the included <code className="rounded bg-ink-100 px-1">firestore.rules</code>.</li>
                  <li>Copy <code className="rounded bg-ink-100 px-1">.env.example</code> to <code className="rounded bg-ink-100 px-1">.env.local</code> and fill in the Web app config and admin email.</li>
                  <li>Replace the admin email placeholder in Firestore rules with that same email, then restart the dev server.</li>
                </ol>
                <div className="rounded-xl border border-sun-400/40 bg-sun-50 p-3 text-sun-800">
                  <strong className="flex items-center gap-2"><ShieldAlert className="size-4" /> Keep access restricted</strong>
                  <p className="mt-1">Never add a Service Account key to this frontend. Firestore rules allow public reads for lessons and writes only from the verified admin account.</p>
                </div>
              </div>
            ) : (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-800"><Cloud className="size-4" /> Firebase project connected</p>
            )}
          </section>

          {needsConfig && (
            <aside className="relative overflow-hidden rounded-3xl bg-brand-900 p-7 text-white shadow-xl sm:p-9">
              <div className="absolute -right-14 -top-14 size-48 rounded-full border-[24px] border-white/5" />
              <span className="relative grid size-12 place-items-center rounded-2xl bg-white/10"><ShieldCheck className="size-6" /></span>
              <p className="relative mt-7 text-xs font-bold uppercase tracking-[0.16em] text-brand-200">Built for your learning site</p>
              <h2 className="relative mt-2 max-w-sm text-2xl font-extrabold leading-tight sm:text-3xl">One dashboard. Content synced everywhere.</h2>
              <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-white/70">Manage lessons and grammar in one place, then publish updates for every learner.</p>
              <div className="relative mt-8 space-y-4">
                <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3.5"><span className="grid size-10 place-items-center rounded-xl bg-white/10"><Database className="size-5" /></span><span><strong className="block text-sm">Reliable cloud content</strong><span className="text-xs text-white/60">Firestore keeps it in sync</span></span></div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3.5"><span className="grid size-10 place-items-center rounded-xl bg-white/10"><Globe2 className="size-5" /></span><span><strong className="block text-sm">Publish for every learner</strong><span className="text-xs text-white/60">Changes reach the learning pages</span></span></div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3.5"><span className="grid size-10 place-items-center rounded-xl bg-white/10"><LockKeyhole className="size-5" /></span><span><strong className="block text-sm">Admin-only publishing</strong><span className="text-xs text-white/60">Protected by Firebase rules</span></span></div>
              </div>
            </aside>
          )}

          {!needsConfig && (
            <form onSubmit={handleAuth} className="rounded-3xl border border-ink-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold">Admin sign in</h2>
              <p className="mt-1 text-sm text-ink-500">Use your verified Firebase admin email and password.</p>
              <label className="mt-6 block text-sm font-semibold text-ink-700">
                Email address
                <input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 h-12 w-full rounded-xl border border-ink-200 px-4 outline-none focus:border-brand-400" />
              </label>
              <label className="mt-4 block text-sm font-semibold text-ink-700">
                Password
                <input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 h-12 w-full rounded-xl border border-ink-200 px-4 outline-none focus:border-brand-400" />
              </label>
              {authError && <p role="alert" className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{authError}</p>}
              <button type="submit" disabled={authBusy} className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 font-bold text-white transition hover:bg-brand-800 disabled:cursor-wait disabled:opacity-70">
                {authBusy && <LoaderCircle className="size-4 animate-spin" />} Sign in securely
              </button>
            </form>
          )}
          {needsConfig && firebaseConfigIncomplete && <p role="alert" className="md:col-span-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">Firebase settings are incomplete. Fill all required values in <code>.env.local</code>, then restart the dev server.</p>}
          {!authReady && <p className="md:col-span-2 text-center text-sm text-ink-500">Connecting securely to Firebase…</p>}
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-ink-50">
      <header className="border-b border-ink-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logo />
          <div className="flex items-center gap-2">
            <Link to="/" className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-ink-500 hover:bg-ink-50 sm:block">View website</Link>
            <span className="hidden text-xs text-ink-500 sm:block">{adminUser.email}</span>
            <button type="button" onClick={handleSignOut} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-ink-500 hover:bg-ink-50"><LogOut className="size-4" /> Sign out</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-600">Site administration · Firebase</p>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Content dashboard</h1>
            <p className="mt-2 text-sm text-ink-500">Edit the lessons, vocabulary, and grammar learners see on the website.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${cloudStatus === 'connected' ? 'bg-emerald-50 text-emerald-700' : cloudStatus === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-sun-50 text-sun-700'}`}>
              {cloudStatus === 'connected' ? <Check className="size-3.5" /> : cloudStatus === 'error' ? <CloudOff className="size-3.5" /> : <Cloud className="size-3.5" />}
              {cloudStatus === 'connected' ? 'Cloud connected' : cloudStatus === 'empty' ? 'Cloud ready · not published' : cloudStatus === 'error' ? 'Cloud sync error' : 'Connecting cloud'}
            </span>
            <button type="button" onClick={saveToCloud} disabled={saving} className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-700 px-4 text-sm font-bold text-white hover:bg-brand-800 disabled:cursor-wait disabled:opacity-60">
              {saving ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />}
              {saving ? 'Saving…' : 'Save to cloud'}
            </button>
          </div>
        </div>

        {(cloudError || cloudStatus === 'empty') && (
          <p role={cloudError ? 'alert' : 'status'} className={`mt-4 rounded-xl px-4 py-3 text-sm ${cloudError ? 'bg-rose-50 text-rose-700' : 'bg-sun-50 text-sun-800'}`}>
            {cloudError || 'Firestore is connected. Save to cloud to publish the current content for learners.'}
          </p>
        )}
        <div className="mt-6 flex gap-3 overflow-x-auto">
          <div className="rounded-2xl border border-ink-100 bg-white px-4 py-3"><p className="text-xl font-extrabold">{levels.reduce((sum, level) => sum + level.lessons.length, 0)}</p><p className="text-xs font-semibold text-ink-500">Lessons</p></div>
          <div className="rounded-2xl border border-ink-100 bg-white px-4 py-3"><p className="text-xl font-extrabold">{wordCount}</p><p className="text-xs font-semibold text-ink-500">Vocabulary words</p></div>
          <div className="rounded-2xl border border-ink-100 bg-white px-4 py-3"><p className="text-xl font-extrabold">{topicCount}</p><p className="text-xs font-semibold text-ink-500">Grammar topics</p></div>
        </div>

        <div className="mt-7 flex gap-2 border-b border-ink-200" role="tablist" aria-label="Content types">
          {[['curriculum', 'Lessons & vocabulary', BookA], ['grammar', 'Grammar', BookOpen], ['backup', 'Backup', Download]].map(([id, label, Icon]) => (
            <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`inline-flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-bold transition sm:px-4 ${tab === id ? 'border-brand-600 text-brand-700' : 'border-transparent text-ink-500 hover:text-ink-900'}`}>
              <Icon className="size-4" /> {label}
            </button>
          ))}
        </div>

        {notice && <p role="status" className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800">{notice}</p>}
        {dataError && <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{dataError}</p>}

        {tab === 'curriculum' && (
          <div className="mt-5 grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="space-y-4">
              <section className="rounded-2xl border border-ink-100 bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-bold">Levels</h2>
                  {currentLevel && <button type="button" onClick={removeLevel} aria-label="Delete selected level" className="rounded-lg p-2 text-ink-300 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="size-4" /></button>}
                </div>
                <div className="mt-3 space-y-1">
                  {levels.map((level) => <button key={level.id} type="button" onClick={() => { setLevelId(level.id); setLessonId('') }} className={`w-full rounded-xl px-3 py-2.5 text-left text-sm ${level.id === currentLevel?.id ? 'bg-brand-50 font-bold text-brand-800' : 'text-ink-600 hover:bg-ink-50'}`}>{level.code} · {level.name}</button>)}
                  {!levels.length && <p className="py-2 text-sm text-ink-500">Add your first level.</p>}
                </div>
                <form onSubmit={addLevel} className="mt-4 border-t border-ink-100 pt-4">
                  <Field label="New level name" value={newLevelName} onChange={(event) => setNewLevelName(event.target.value)} placeholder="e.g. Foundation" required />
                  <button type="submit" className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3 py-2 text-xs font-bold text-white"><Plus className="size-3.5" /> Add level</button>
                </form>
              </section>

              {currentLevel && <section className="rounded-2xl border border-ink-100 bg-white p-4">
                <div className="flex items-center justify-between"><h2 className="font-bold">Lessons</h2><span className="text-xs text-ink-300">{currentLevel.lessons.length}</span></div>
                <div className="mt-3 max-h-72 space-y-1 overflow-y-auto">
                  {currentLevel.lessons.map((lesson) => <button key={lesson.id} type="button" onClick={() => setLessonId(lesson.id)} className={`w-full rounded-xl px-3 py-2.5 text-left text-sm ${lesson.id === currentLesson?.id ? 'bg-brand-50 font-bold text-brand-800' : 'text-ink-600 hover:bg-ink-50'}`}>{lesson.published === false && <span className="mr-1 text-xs text-sun-700">Draft ·</span>}{lesson.title}</button>)}
                </div>
                <form onSubmit={addLesson} className="mt-4 space-y-3 border-t border-ink-100 pt-4">
                  <Field label="New lesson title" value={newLessonTitle} onChange={(event) => setNewLessonTitle(event.target.value)} placeholder="Everyday introductions" required />
                  <Field label="Bangla title (optional)" value={newLessonBangla} onChange={(event) => setNewLessonBangla(event.target.value)} placeholder="দৈনন্দিন পরিচিতি" />
                  <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3 py-2 text-xs font-bold text-white"><Plus className="size-3.5" /> Add draft lesson</button>
                </form>
              </section>}
            </aside>

            {currentLevel && currentLesson ? (
              <section className="min-w-0 space-y-5">
                <div className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">{currentLevel.code} · Lesson details</p><h2 className="mt-1 text-2xl font-extrabold">{currentLesson.title}</h2></div>
                    <button type="button" onClick={removeLesson} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"><Trash2 className="size-3.5" /> Delete lesson</button>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <Field label="Lesson title (English)" value={currentLesson.title} onChange={(event) => updateLesson({ title: event.target.value })} required />
                    <Field label="Lesson title (Bangla)" value={currentLesson.titleBn} onChange={(event) => updateLesson({ titleBn: event.target.value })} />
                    <Field label="Introduction (English)" value={currentLesson.intro} onChange={(event) => updateLesson({ intro: event.target.value })} multiline />
                    <Field label="Introduction (Bangla)" value={currentLesson.introBn} onChange={(event) => updateLesson({ introBn: event.target.value })} multiline />
                  </div>
                  <div className="mt-6 border-t border-ink-100 pt-5">
                    <h3 className="font-bold">Level details · {currentLevel.code}</h3>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      <Field label="Level name (English)" value={currentLevel.name} onChange={(event) => replaceLevels(levels.map((level) => level.id === currentLevel.id ? { ...level, name: event.target.value } : level))} required />
                      <Field label="Level name (Bangla)" value={currentLevel.nameBn} onChange={(event) => replaceLevels(levels.map((level) => level.id === currentLevel.id ? { ...level, nameBn: event.target.value } : level))} />
                      <Field label="Level code" value={currentLevel.code} onChange={(event) => replaceLevels(levels.map((level) => level.id === currentLevel.id ? { ...level, code: event.target.value } : level))} required />
                      <Field label="Level introduction" value={currentLevel.tagline} onChange={(event) => replaceLevels(levels.map((level) => level.id === currentLevel.id ? { ...level, tagline: event.target.value } : level))} />
                    </div>
                    <label className="mt-4 flex items-center gap-3 text-sm font-semibold text-ink-700">
                      <input type="checkbox" checked={currentLevel.bnOptions} onChange={(event) => replaceLevels(levels.map((level) => level.id === currentLevel.id ? { ...level, bnOptions: event.target.checked } : level))} className="size-4 accent-brand-700" />
                      Use Bangla meanings in beginner exercises
                    </label>
                  </div>
                  <label className="mt-5 flex items-center gap-3 rounded-xl bg-ink-50 p-3.5 text-sm font-semibold">
                    <input type="checkbox" disabled={!currentLesson.vocab.length} checked={currentLesson.published !== false} onChange={(event) => updateLesson({ published: event.target.checked })} className="size-4 accent-brand-700" />
                    Publish this lesson on the website
                  </label>
                  {!currentLesson.vocab.length && <p className="mt-2 text-xs text-sun-700">Add a vocabulary word before publishing this lesson.</p>}
                </div>

                <div className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-7">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div><h2 className="text-xl font-extrabold">Vocabulary</h2><p className="mt-1 text-sm text-ink-500">Edit the definition, Bangla meaning, pronunciation, and example.</p></div>
                    <span className="text-xs font-semibold text-ink-300">{currentLesson.vocab.length} words</span>
                  </div>
                  <form onSubmit={addWord} className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <input required value={newWord} onChange={(event) => setNewWord(event.target.value)} placeholder="Add an English word" className="h-11 min-w-0 flex-1 rounded-xl border border-ink-200 bg-ink-50 px-3.5 text-sm outline-none focus:border-brand-400" />
                    <button type="submit" className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-brand-700 px-4 text-sm font-bold text-white"><Plus className="size-4" /> Add word</button>
                  </form>
                  <div className="mt-4 space-y-3">
                    {currentLesson.vocab.map((word, index) => (
                      <details key={index} className="group rounded-xl border border-ink-100">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5">
                          <span className="min-w-0"><strong className="font-display">{word.w || 'Untitled word'}</strong><span className="ml-2 text-sm text-ink-500">{word.bn}</span></span>
                          <button type="button" onClick={(event) => { event.preventDefault(); const vocab = currentLesson.vocab.filter((_, wordIndex) => wordIndex !== index); updateLesson({ vocab, ...(vocab.length ? {} : { published: false }) }) }} aria-label={`Delete ${word.w}`} className="rounded-lg p-2 text-ink-300 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="size-4" /></button>
                        </summary>
                        <div className="grid gap-4 border-t border-ink-100 p-4 sm:grid-cols-2">
                          <Field label="English word or phrase" value={word.w} onChange={(event) => updateWord(index, { w: event.target.value })} required />
                          <Field label="Pronunciation guide" value={word.sound} onChange={(event) => updateWord(index, { sound: event.target.value })} />
                          <Field label="Bangla meaning" value={word.bn} onChange={(event) => updateWord(index, { bn: event.target.value })} />
                          <Field label="English definition" value={word.en} onChange={(event) => updateWord(index, { en: event.target.value })} />
                          <Field label="Example sentence (English)" value={word.ex} onChange={(event) => updateWord(index, { ex: event.target.value })} />
                          <Field label="Example sentence (Bangla)" value={word.exBn} onChange={(event) => updateWord(index, { exBn: event.target.value })} />
                        </div>
                      </details>
                    ))}
                    {!currentLesson.vocab.length && <p className="rounded-xl bg-sun-50 p-4 text-sm text-sun-700">Add at least one vocabulary word before publishing this lesson.</p>}
                  </div>
                </div>

                <div className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-7">
                  <div><h2 className="text-xl font-extrabold">Practice questions</h2><p className="mt-1 text-sm text-ink-500">Add fill-in-the-blank exercises for this lesson.</p></div>
                  <form onSubmit={addFillQuestion} className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(140px,.5fr)_auto]">
                    <input required value={newFillQuestion} onChange={(event) => setNewFillQuestion(event.target.value)} placeholder="Sentence with ___ blank" className="h-11 min-w-0 rounded-xl border border-ink-200 bg-ink-50 px-3.5 text-sm outline-none focus:border-brand-400" />
                    <input required value={newFillAnswer} onChange={(event) => setNewFillAnswer(event.target.value)} placeholder="Answer" className="h-11 min-w-0 rounded-xl border border-ink-200 bg-ink-50 px-3.5 text-sm outline-none focus:border-brand-400" />
                    <button type="submit" className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-brand-700 px-4 text-sm font-bold text-white"><Plus className="size-4" /> Add</button>
                  </form>
                  <div className="mt-4 space-y-3">
                    {currentLesson.fill.map((item, index) => (
                      <div key={`${item.q}-${index}`} className="rounded-xl border border-ink-100 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-semibold">{item.q} <span className="text-brand-700">· {item.a}</span></p>
                          <button type="button" onClick={() => updateLesson({ fill: currentLesson.fill.filter((_, itemIndex) => itemIndex !== index) })} aria-label="Delete exercise" className="rounded-lg p-2 text-ink-300 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="size-4" /></button>
                        </div>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <Field label="Prompt" value={item.q} onChange={(event) => updateFill(index, { q: event.target.value })} required />
                          <Field label="Correct answer" value={item.a} onChange={(event) => updateFill(index, { a: event.target.value })} required />
                          <Field label="Bangla hint" value={item.bn} onChange={(event) => updateFill(index, { bn: event.target.value })} />
                          <Field label="Wrong options (comma-separated)" value={(item.d || []).join(', ')} onChange={(event) => updateFill(index, { d: event.target.value.split(',').map((option) => option.trim()).filter(Boolean) })} />
                        </div>
                      </div>
                    ))}
                    {!currentLesson.fill.length && <p className="text-sm text-ink-300">No custom practice questions yet. Vocabulary exercises will still be generated automatically.</p>}
                  </div>
                </div>
              </section>
            ) : (
              <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-ink-200 bg-white p-8 text-center text-ink-500">Choose a lesson to edit, or add a new lesson in this level.</div>
            )}
          </div>
        )}

        {tab === 'grammar' && (
          <div className="mt-5 grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="rounded-2xl border border-ink-100 bg-white p-4">
              <h2 className="font-bold">Grammar modules</h2>
              <div className="mt-3 space-y-1">
                {grammarModules.map((module) => <button key={module.id} type="button" onClick={() => setGrammarModuleId(module.id)} className={`w-full rounded-xl px-3 py-2.5 text-left text-sm ${module.id === currentGrammarModule?.id ? 'bg-brand-50 font-bold text-brand-800' : 'text-ink-600 hover:bg-ink-50'}`}>{module.title}</button>)}
                {!grammarModules.length && <p className="py-2 text-sm text-ink-500">Add a grammar module to begin.</p>}
              </div>
              <form onSubmit={addGrammarModule} className="mt-4 space-y-3 border-t border-ink-100 pt-4">
                <Field label="New module title" value={newModuleTitle} onChange={(event) => setNewModuleTitle(event.target.value)} placeholder="e.g. Everyday questions" required />
                <Field label="Level" value={newModuleLevel} onChange={(event) => setNewModuleLevel(event.target.value)} required />
                <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3 py-2 text-xs font-bold text-white"><Plus className="size-3.5" /> Add module</button>
              </form>
            </aside>

            {currentGrammarModule ? (
              <section className="space-y-4">
                <div className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid flex-1 gap-4 sm:grid-cols-3">
                      <Field label="Module title" value={currentGrammarModule.title} onChange={(event) => updateGrammarModule({ title: event.target.value })} required />
                      <Field label="Module title (Bangla)" value={currentGrammarModule.titleBn} onChange={(event) => updateGrammarModule({ titleBn: event.target.value })} />
                      <Field label="Level" value={currentGrammarModule.level} onChange={(event) => updateGrammarModule({ level: event.target.value })} required />
                    </div>
                    <button type="button" onClick={removeGrammarModule} aria-label="Delete module" className="rounded-lg p-2 text-ink-300 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="size-4" /></button>
                  </div>
                  <form onSubmit={addGrammarTopic} className="mt-5 flex flex-col gap-2 border-t border-ink-100 pt-5 sm:flex-row">
                    <input required value={newTopicTitle} onChange={(event) => setNewTopicTitle(event.target.value)} placeholder="New grammar topic title" className="h-11 min-w-0 flex-1 rounded-xl border border-ink-200 bg-ink-50 px-3.5 text-sm outline-none focus:border-brand-400" />
                    <button type="submit" className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-brand-700 px-4 text-sm font-bold text-white"><Plus className="size-4" /> Add topic</button>
                  </form>
                </div>

                {currentGrammarModule.topics.map((topic, index) => (
                <details key={index} className="rounded-2xl border border-ink-100 bg-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4">
                      <span><strong className="font-display">{topic.title || 'Untitled grammar topic'}</strong>{topic.bn && <span className="ml-2 text-sm text-ink-500">{topic.bn}</span>}</span>
                      <button type="button" onClick={(event) => { event.preventDefault(); removeGrammarTopic(index) }} aria-label={`Delete ${topic.title}`} className="rounded-lg p-2 text-ink-300 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="size-4" /></button>
                    </summary>
                    <div className="grid gap-4 border-t border-ink-100 p-5 sm:grid-cols-2">
                      <Field label="Topic title (English)" value={topic.title} onChange={(event) => updateGrammarTopic(index, { title: event.target.value })} required />
                      <Field label="Topic title (Bangla)" value={topic.bn} onChange={(event) => updateGrammarTopic(index, { bn: event.target.value })} />
                      <Field label="Simple explanation" value={topic.explain} onChange={(event) => updateGrammarTopic(index, { explain: event.target.value })} multiline required />
                      <Field label="Sentence pattern" value={topic.pattern} onChange={(event) => updateGrammarTopic(index, { pattern: event.target.value })} multiline required />
                      <div className="space-y-3 sm:col-span-2">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-sm font-semibold text-ink-700">Examples</h3>
                          <button type="button" onClick={() => updateGrammarTopic(index, { examples: [...(topic.examples || []), ['', '']] })} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-brand-700 hover:bg-brand-50"><Plus className="size-3.5" /> Add example</button>
                        </div>
                        {(topic.examples || []).map(([english, bangla], exampleIndex) => (
                          <div key={exampleIndex} className="grid gap-3 rounded-xl bg-ink-50 p-3 sm:grid-cols-2">
                            <Field label={`Example ${exampleIndex + 1} (English)`} value={english} onChange={(event) => updateGrammarTopic(index, { examples: topic.examples.map((example, currentIndex) => currentIndex === exampleIndex ? [event.target.value, example[1]] : example) })} />
                            <div className="flex items-end gap-2">
                              <div className="min-w-0 flex-1"><Field label={`Example ${exampleIndex + 1} (Bangla)`} value={bangla} onChange={(event) => updateGrammarTopic(index, { examples: topic.examples.map((example, currentIndex) => currentIndex === exampleIndex ? [example[0], event.target.value] : example) })} /></div>
                              {topic.examples.length > 1 && <button type="button" onClick={() => updateGrammarTopic(index, { examples: topic.examples.filter((_, currentIndex) => currentIndex !== exampleIndex) })} aria-label={`Delete example ${exampleIndex + 1}`} className="mb-1 rounded-lg p-2 text-ink-300 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="size-4" /></button>}
                            </div>
                          </div>
                        ))}
                      </div>
                      <Field label="Practice prompt" value={topic.practice} onChange={(event) => updateGrammarTopic(index, { practice: event.target.value })} multiline required />
                    </div>
                  </details>
                ))}
              </section>
            ) : (
              <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-ink-200 bg-white p-8 text-center text-ink-500">Add a module to create your grammar course.</div>
            )}
          </div>
        )}

        {tab === 'backup' && (
          <section className="mt-5 max-w-3xl rounded-2xl border border-ink-100 bg-white p-5 sm:p-8">
            <h2 className="text-xl font-extrabold">Keep a copy of your content</h2>
            <p className="mt-2 leading-relaxed text-ink-500">Edits are kept on this device as you work. Use “Save to cloud” to publish them for learners and sync with other devices. Keep a JSON backup as an extra safety copy.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={exportContent} className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-700 px-4 text-sm font-bold text-white hover:bg-brand-800"><Download className="size-4" /> Download backup</button>
              <label className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-ink-200 px-4 text-sm font-bold text-ink-700 hover:bg-ink-50">
                <Upload className="size-4" /> Restore backup
                <input type="file" accept="application/json,.json" onChange={importContent} className="sr-only" />
              </label>
            </div>
            <div className="mt-8 border-t border-ink-100 pt-5">
              <h3 className="font-bold">Restore starter content</h3>
              <p className="mt-1 text-sm text-ink-500">Replace curriculum and grammar edits with the original site content. Save to cloud to publish this reset.</p>
              <button type="button" onClick={restoreStarterContent} className="mt-3 rounded-lg px-3 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50">Reset all content</button>
            </div>
          </section>
        )}

        <p className="mt-6 text-xs leading-relaxed text-ink-300">Lesson and grammar content is publicly readable for learners. Only the verified administrator email can publish changes to Firestore; protect that account and keep the deployed Firestore rules in place.</p>
      </main>
    </div>
  )
}
