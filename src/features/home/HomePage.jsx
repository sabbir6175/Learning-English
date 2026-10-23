import { ArrowRight, BookA, BookOpen, BriefcaseBusiness, Languages, PenLine, PlayCircle, Route, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useProgress } from '@/store/useProgress'
import { getNextLesson, getAllLessons, totalWords } from '@/lib/curriculum'
import { useSiteContent } from '@/store/useSiteContent'

const path = [
  { to: '/levels', icon: BookOpen, title: '১. সহজ শব্দ', detail: 'Hello, name, family, work', accent: 'bg-brand-50 text-brand-700' },
  { to: '/vocabulary', icon: BookA, title: '২. দরকারি শব্দ', detail: 'অর্থ শুনুন, উদাহরণ পড়ুন', accent: 'bg-sun-50 text-sun-700' },
  { to: '/grammar', icon: BookOpen, title: '৩. ছোট বাক্য', detail: 'সহজ নিয়মে বাক্য বুঝুন', accent: 'bg-coral-soft accent-coral' },
  { to: '/sentences', icon: PenLine, title: '৪. নিজে বলুন', detail: 'শব্দ জুড়ে বাক্য বানান', accent: 'bg-mint-50 text-mint-700' },
  { to: '/meetings', icon: BriefcaseBusiness, title: '৫. Client meeting', detail: 'কাজের কথা বলার practice', accent: 'bg-brand-50 text-brand-700' },
]

const sections = [
  { to: '/grammar', icon: BookOpen, title: 'Grammar', text: 'সহজ নিয়ম, ছোট উদাহরণ।', color: 'bg-coral-soft accent-coral' },
  { to: '/vocabulary', icon: BookA, title: 'Words', text: 'অর্থ, উচ্চারণ ও বাক্য।', color: 'bg-sun-50 text-sun-700' },
  { to: '/sentences', icon: PenLine, title: 'Make a sentence', text: 'নিজে শব্দ বেছে বাক্য বানান।', color: 'bg-mint-50 text-mint-700' },
  { to: '/translate', icon: Languages, title: 'Google Translate', text: 'কঠিন শব্দ Google Translate-এ দেখুন।', color: 'bg-brand-50 text-brand-700' },
  { to: '/meetings', icon: BriefcaseBusiness, title: 'Client meetings', text: 'কাজের meeting-এ কী বলবেন শিখুন।', color: 'bg-sun-50 text-sun-700' },
  { to: '/videos', icon: PlayCircle, title: 'Videos', text: 'ভবিষ্যতের video lesson এখানে থাকবে।', color: 'bg-coral-soft accent-coral' },
]

export default function HomePage() {
  const completed = useProgress((s) => s.completed)
  const levels = useSiteContent((s) => s.levels)
  const lessons = getAllLessons(levels)
  const next = getNextLesson(completed, levels)
  const doneCount = Object.keys(completed).length
  const started = doneCount > 0

  return (
    <div className="space-y-16 pb-10 sm:space-y-20">
      <section className="relative isolate w-full overflow-hidden bg-brand-900 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(135deg, transparent 48%, rgba(255,255,255,.12) 49%, transparent 50%), linear-gradient(45deg, transparent 48%, rgba(255,255,255,.08) 49%, transparent 50%)', backgroundSize: '34px 34px' }} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-11 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-sm font-semibold text-brand-100"><Sparkles className="size-4 text-sun-400" /> একদম শুরু থেকে</p>
            <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.08] sm:text-6xl">ইংরেজি শিখুন। নিজের কথা বলুন।</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg">আগে সহজ শব্দ। তারপর ছোট বাক্য। শেষে কাজের কথা ও client meeting। প্রতিটি ধাপে বাংলা সাহায্য আছে।</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {next ? <Button to={`/lesson/${next.id}`} size="lg">{started ? 'শেখা চালিয়ে যান' : 'প্রথম পাঠ শুরু করুন'} <ArrowRight className="size-5" /></Button> : <Button to="/progress" size="lg">অগ্রগতি দেখুন <ArrowRight className="size-5" /></Button>}
              <Button to="/roadmap" variant="secondary" size="lg"><Route className="size-4" /> পুরো পথ দেখুন</Button>
            </div>
            <p className="mt-6 text-sm text-brand-100">{lessons.length}টি পাঠ <span className="px-1 text-sun-400">·</span> {totalWords(levels)}টি শব্দ <span className="px-1 text-sun-400">·</span> {doneCount}টি শেষ</p>
          </div>
          <div className="mx-auto w-full max-w-md border-l border-white/25 py-2 pl-5 sm:pl-7"><p className="text-sm font-bold text-sun-400">প্রতিদিন ১৫ মিনিট</p><div className="mt-4 space-y-4">{[['৫ মিনিট', 'নতুন শব্দ পড়ুন'], ['৫ মিনিট', 'শুনে জোরে বলুন'], ['৫ মিনিট', 'নিজের বাক্য বানান']].map(([time, task], index) => <div key={`${time}-${index}`} className="flex items-baseline gap-3"><span className="w-16 shrink-0 text-sm font-bold text-brand-100">{time}</span><p className="font-semibold">{task}</p></div>)}</div><Link to="/roadmap" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white underline decoration-white/40 underline-offset-4">পুরো শেখার পথ <ArrowRight className="size-4" /></Link></div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6" aria-labelledby="learning-sections">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-sm font-bold uppercase tracking-[0.12em] text-brand-600">প্রথম দিন থেকে কাজে ব্যবহার</p><h2 id="learning-sections" className="mt-2 text-3xl font-extrabold">এই ৫ ধাপে এগিয়ে যান</h2></div>
          <Link to="/roadmap" className="inline-flex items-center gap-2 text-sm font-bold text-brand-700">সব ধাপ দেখুন <ArrowRight className="size-4" /></Link>
        </div>
        <div className="mt-7 grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
          {path.map(({ to, icon: Icon, title, detail, accent }) => (
            <Link key={to} to={to} className="group border-t-2 border-ink-200 pt-4 transition hover:border-brand-500">
              <span className={`grid size-10 place-items-center rounded-full ${accent}`}><Icon className="size-5" /></span>
              <span className="mt-3 flex items-center justify-between gap-2 font-bold"><span>{title}</span><ArrowRight className="size-4 shrink-0 text-ink-300 transition group-hover:translate-x-1 group-hover:text-brand-600" /></span>
              <span className="mt-1 block text-sm text-ink-500">{detail}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 border-y border-ink-200 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-center">
        <div><p className="text-sm font-bold uppercase tracking-[0.12em] text-brand-600">কাজের ইংরেজি</p><h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Client meeting-এ কথা বলার practice করুন</h2><p className="mt-3 max-w-2xl leading-relaxed text-ink-500">নিজের পরিচয়, client-এর দরকার বোঝা, প্রশ্ন করা, কাজের সময় বলা—সহজ বাক্য দিয়ে practice করুন।</p></div>
        <Button to="/meetings" size="lg">Meeting practice <ArrowRight className="size-5" /></Button>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6" aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="text-2xl font-extrabold">পড়ুন, শুনুন, practice করুন</h2>
        <div className="mt-5 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">{sections.map(({ to, icon: Icon, title, text, color }) => <Link key={to} to={to} className="group flex items-center gap-4 border-t border-ink-200 py-4"><span className={`grid size-10 shrink-0 place-items-center rounded-xl ${color}`}><Icon className="size-5" /></span><span className="min-w-0 flex-1"><span className="block font-bold">{title}</span><span className="mt-1 block text-sm text-ink-500">{text}</span></span><ArrowRight className="size-4 shrink-0 text-ink-300 group-hover:text-brand-600" /></Link>)}</div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-4 bg-sun-50 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div><p className="text-sm font-bold text-sun-700">আপনার অগ্রগতি</p><h2 className="mt-1 text-2xl font-extrabold">{doneCount ? `${doneCount}টি পাঠ শেষ করেছেন` : 'আজ প্রথম পাঠ শুরু করুন'}</h2></div>
        <Button to={doneCount ? '/progress' : '/levels'} variant="secondary">{doneCount ? 'Progress দেখুন' : 'শুরু করুন'} <ArrowRight className="size-4" /></Button>
      </section>
    </div>
  )
}
