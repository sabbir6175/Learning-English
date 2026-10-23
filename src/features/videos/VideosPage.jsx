import { PlayCircle } from 'lucide-react'

const playlists = [
  { title: 'Grammar in real life', detail: 'Grammar rules with everyday examples', label: 'Grammar' },
  { title: 'Speak with confidence', detail: 'Pronunciation and conversation practice', label: 'Speaking' },
  { title: 'Words in context', detail: 'Vocabulary explained through situations', label: 'Vocabulary' },
]

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <header className="border-b border-ink-200 pb-6"><p className="text-sm font-bold uppercase tracking-[0.12em] text-brand-600">দেখুন, শুনুন, শিখুন</p><h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Video lessons</h1><p className="mt-2 max-w-2xl text-ink-500">ভিডিও পাঠের জন্য আলাদা জায়গা তৈরি আছে। ভিডিও যুক্ত হলে বিষয় ও level অনুযায়ী এখানেই সাজানো যাবে।</p></header>
      <section className="mt-8 border border-dashed border-ink-300 bg-white px-6 py-12 text-center sm:py-16"><span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-50 text-brand-700"><PlayCircle className="size-7" /></span><h2 className="mt-4 text-xl font-bold">আপনার প্রথম lesson video এখানে আসবে</h2><p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-500">এখনও কোনো ভিডিও যোগ করা হয়নি। ভবিষ্যতে YouTube embed বা hosted lesson video এই page-এ যোগ করা যাবে।</p></section>
      <section className="mt-10"><h2 className="font-display text-xl font-bold">যে বিষয়গুলো সাজানো যাবে</h2><div className="mt-4 grid gap-4 sm:grid-cols-3">{playlists.map((item) => <article key={item.title} className="border-t-2 border-brand-300 py-4"><p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-700">{item.label}</p><h3 className="mt-2 font-bold">{item.title}</h3><p className="mt-1 text-sm text-ink-500">{item.detail}</p></article>)}</div></section>
    </div>
  )
}