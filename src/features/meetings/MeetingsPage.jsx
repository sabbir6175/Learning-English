import { useState } from 'react'
import { BriefcaseBusiness, Check, Copy } from 'lucide-react'
import { SpeakButton } from '@/components/SpeakButton'

const groups = [
  { title: '1. Start the meeting', bn: 'শুরু করুন', phrases: [
    ['Hello, thank you for joining.', 'হ্যালো, যোগ দেওয়ার জন্য ধন্যবাদ।'],
    ['I am glad to meet you.', 'আপনার সাথে দেখা হয়ে ভালো লাগছে।'],
    ['Can you hear me clearly?', 'আপনি কি আমার কথা পরিষ্কার শুনতে পাচ্ছেন?'],
  ] },
  { title: '2. Introduce yourself', bn: 'নিজের পরিচয় দিন', phrases: [
    ['My name is ___. I work with ___.', 'আমার নাম ___. আমি ___-এর সাথে কাজ করি।'],
    ['I will help you with this project.', 'আমি এই project-এ আপনাকে সাহায্য করব।'],
  ] },
  { title: '3. Ask what the client needs', bn: 'Client-এর দরকার জানুন', phrases: [
    ['What is most important for you?', 'আপনার কাছে সবচেয়ে জরুরি বিষয় কোনটি?'],
    ['Could you tell me more about your goal?', 'আপনার লক্ষ্য সম্পর্কে আরেকটু বলবেন?'],
    ['Do you have a deadline?', 'আপনার কি কোনো শেষ সময় আছে?'],
  ] },
  { title: '4. Explain your plan', bn: 'আপনার পরিকল্পনা বলুন', phrases: [
    ['First, I will prepare a draft.', 'প্রথমে আমি একটি খসড়া তৈরি করব।'],
    ['I can send it by Friday.', 'আমি শুক্রবারের মধ্যে এটি পাঠাতে পারব।'],
    ['This may take two days.', 'এতে দুই দিন লাগতে পারে।'],
  ] },
  { title: '5. Check and close', bn: 'বুঝেছেন কি না জানুন, শেষ করুন', phrases: [
    ['Does that sound good to you?', 'এটি কি আপনার কাছে ঠিক মনে হচ্ছে?'],
    ['Let me repeat the next steps.', 'আমি পরের কাজগুলো আবার বলছি।'],
    ['Thank you. I will send a short summary by email.', 'ধন্যবাদ। আমি email-এ ছোট একটি সারাংশ পাঠাব।'],
  ] },
]

export default function MeetingsPage() {
  const [copied, setCopied] = useState('')
  const [checked, setChecked] = useState([])

  async function copyPhrase(english, key) {
    if (!navigator.clipboard) return
    await navigator.clipboard.writeText(english)
    setCopied(key)
    window.setTimeout(() => setCopied(''), 1600)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="border-b border-ink-200 pb-6"><p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-brand-600"><BriefcaseBusiness className="size-4" /> কাজের ইংরেজি</p><h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Client meeting practice</h1><p className="mt-3 max-w-2xl leading-relaxed text-ink-500">সহজ বাক্যগুলো আগে শুনুন, তারপর নিজের কণ্ঠে বলুন। ফাঁকা জায়গায় নিজের নাম বা কাজ বসান।</p></header>
      <section className="mt-6 border-l-4 border-sun-500 bg-sun-50 p-4 sm:p-5"><h2 className="font-bold">ছোট নিয়ম</h2><p className="mt-1 text-sm leading-relaxed text-ink-700">ধীরে বলুন। ছোট বাক্য ব্যবহার করুন। বুঝতে না পারলে বলুন: “Could you say that again, please?”</p></section>
      <div className="mt-8 space-y-8">{groups.map((group) => <section key={group.title}><div className="border-b border-ink-200 pb-2"><h2 className="font-display text-xl font-bold">{group.title}</h2><p className="mt-1 text-sm text-ink-500">{group.bn}</p></div><div className="divide-y divide-ink-100">{group.phrases.map(([english, bangla]) => { const key = `${group.title}-${english}`; const done = checked.includes(key); return <div key={key} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="font-semibold">{english}</p><p className="mt-1 text-sm text-ink-500">{bangla}</p></div><div className="flex items-center gap-2"><SpeakButton text={english.replaceAll('_', 'name')} size="sm" /><button type="button" onClick={() => copyPhrase(english, key)} title="Copy sentence" aria-label={`Copy ${english}`} className="grid size-9 place-items-center rounded-full border border-ink-200 bg-white text-ink-500 hover:text-brand-700">{copied === key ? <Check className="size-4" /> : <Copy className="size-4" />}</button><button type="button" aria-pressed={done} onClick={() => setChecked((items) => done ? items.filter((item) => item !== key) : [...items, key])} className={`h-9 px-3 text-xs font-bold ${done ? 'bg-brand-700 text-white' : 'border border-ink-200 text-ink-500 hover:border-brand-300'}`}>{done ? 'Practice done' : 'Mark practiced'}</button></div></div> })}</div></section>)}</div>
      <p className="mt-8 border-t border-ink-200 pt-5 text-sm text-ink-500">{checked.length}টি বাক্য practice করেছেন। আগামীবার, নিজের project-এর তথ্য দিয়ে blank-গুলো পূরণ করে বলুন।</p>
    </div>
  )
}