import { useState } from 'react'
import { ArrowLeft, CircleUserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/layout/Logo'

export default function AccountPage() {
  const [mode, setMode] = useState('login')
  const [notice, setNotice] = useState('')
  const signup = mode === 'signup'
  function handleSubmit(event) {
    event.preventDefault()
    setNotice('এই account form preview mode-এ আছে। কোনো তথ্য সংরক্ষণ বা পাঠানো হয়নি; real login চালু করতে authentication service যুক্ত করতে হবে।')
  }

  return (
    <div className="min-h-dvh bg-ink-50 px-4 py-5 sm:px-8">
      <header className="mx-auto flex max-w-6xl items-center justify-between"><Logo /><Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500 hover:text-brand-700"><ArrowLeft className="size-4" /> শেখায় ফিরে যান</Link></header>
      <main className="mx-auto grid max-w-5xl gap-10 py-12 md:grid-cols-[.9fr_1.1fr] md:items-center md:py-20">
      <section><span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-700"><CircleUserRound className="size-6" /></span><p className="mt-6 text-sm font-bold uppercase tracking-[0.12em] text-brand-600">আপনার শেখার জায়গা</p><h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{signup ? 'নতুন account তৈরি করুন' : 'আবার শেখা শুরু করুন'}</h1><p className="mt-3 leading-relaxed text-ink-500">নিজের শেখার অগ্রগতি দেখতে ও নিয়মিত অনুশীলন করতে account access ব্যবহার করুন।</p></section>
      <section className="border-t-2 border-brand-600 bg-white p-6 sm:p-8">
        <div className="grid grid-cols-2 border-b border-ink-200" role="tablist" aria-label="Account access"><button type="button" role="tab" aria-selected={!signup} onClick={() => { setMode('login'); setNotice('') }} className={`py-3 text-sm font-bold ${!signup ? 'border-b-2 border-brand-600 text-brand-700' : 'text-ink-500'}`}>Log in</button><button type="button" role="tab" aria-selected={signup} onClick={() => { setMode('signup'); setNotice('') }} className={`py-3 text-sm font-bold ${signup ? 'border-b-2 border-brand-600 text-brand-700' : 'text-ink-500'}`}>Sign up</button></div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>{signup && <label className="block text-sm font-semibold text-ink-700">নাম<input required autoComplete="name" className="mt-1.5 h-11 w-full border border-ink-200 px-3 font-normal outline-none focus:border-brand-500" /></label>}<label className="block text-sm font-semibold text-ink-700">Email<input required type="email" autoComplete="email" className="mt-1.5 h-11 w-full border border-ink-200 px-3 font-normal outline-none focus:border-brand-500" /></label><label className="block text-sm font-semibold text-ink-700">Password<input required type="password" autoComplete={signup ? 'new-password' : 'current-password'} minLength={6} className="mt-1.5 h-11 w-full border border-ink-200 px-3 font-normal outline-none focus:border-brand-500" /></label><button type="submit" className="mt-2 h-11 w-full bg-brand-700 px-4 font-bold text-white transition hover:bg-brand-800">{signup ? 'Create account' : 'Log in'}</button></form>
        {notice && <p role="status" className="mt-4 border-l-2 border-sun-500 bg-sun-50 p-3 text-sm leading-relaxed text-ink-700">{notice}</p>}
      </section>
      </main>
    </div>
  )
}