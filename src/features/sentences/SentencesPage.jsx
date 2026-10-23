import { useState } from 'react'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { translateEnglishToBangla } from '@/lib/translate'

const groups = [
  { label: 'কে?', words: ['I', 'You', 'We', 'They', 'She', 'He'] },
  { label: 'কী করে?', words: ['like', 'study', 'read', 'make', 'want'] },
  { label: 'কী / কাকে?', words: ['English', 'books', 'tea', 'a sentence', 'with friends'] },
  { label: 'কখন?', words: ['every day', 'at home', 'in the morning', 'with my family'] },
]

export default function SentencesPage() {
  const [parts, setParts] = useState([])
  const sentence = parts.join(' ').replace(/\s+([,.!?])/g, '$1')
  const translation = translateEnglishToBangla(sentence)
  return (
    <div className="mx-auto max-w-4xl">
      <header className="border-b border-ink-200 pb-6"><p className="text-sm font-bold uppercase tracking-[0.12em] text-brand-600">নিজে লিখে অনুশীলন</p><h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Build a sentence</h1><p className="mt-2 max-w-2xl text-ink-500">একটি করে শব্দ বেছে নিন। সব শব্দ নেওয়া বাধ্যতামূলক নয়—নিজের মতো বাক্য সাজান।</p></header>
      <section className="mt-7 border-l-4 border-brand-500 bg-brand-50 p-5 sm:p-7" aria-live="polite"><p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-700">আপনার বাক্য</p><p className="mt-3 min-h-10 font-display text-2xl font-bold text-ink-900">{sentence || <span className="text-ink-300">শব্দ বেছে লেখা শুরু করুন...</span>}</p><p className="mt-3 min-h-6 text-lg text-brand-700">{translation.text}</p><button type="button" onClick={() => setParts((current) => current.slice(0, -1))} disabled={!parts.length} className="mt-3 text-sm font-semibold text-ink-500 underline decoration-ink-200 underline-offset-4 disabled:opacity-40">শেষ শব্দ সরান</button></section>
      <div className="mt-7 space-y-6">{groups.map((group) => <section key={group.label}><h2 className="text-sm font-bold text-ink-700">{group.label}</h2><div className="mt-2 flex flex-wrap gap-2">{group.words.map((word) => <button key={word} type="button" onClick={() => setParts((current) => [...current, word])} className="min-h-10 border border-ink-200 bg-white px-4 font-semibold text-ink-700 transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-800">{word}</button>)}</div></section>)}</div>
      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-ink-200 pt-5"><button type="button" onClick={() => setParts([])} className="inline-flex h-10 items-center gap-2 border border-ink-200 px-4 text-sm font-semibold text-ink-700 hover:bg-ink-50"><RotateCcw className="size-4" /> আবার শুরু</button><Link to="/translate" className="inline-flex h-10 items-center gap-2 px-2 text-sm font-bold text-brand-700">আরও শব্দের অর্থ দেখুন <ArrowRight className="size-4" /></Link></div>
    </div>
  )
}