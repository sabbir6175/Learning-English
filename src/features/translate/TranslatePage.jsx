import { useState } from 'react'
import { ArrowLeftRight, Clipboard, ExternalLink, Languages, RotateCcw } from 'lucide-react'
import { translateEnglishToBangla } from '@/lib/translate'

const examples = ['How are you?', 'I am learning English.', 'Thank you for your help.']

export default function TranslatePage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)
  const translate = (value = input) => { setInput(value); setResult(translateEnglishToBangla(value)); setCopied(false) }
  const googleTranslateUrl = `https://translate.google.com/?sl=en&tl=bn&text=${encodeURIComponent(input)}&op=translate`
  async function copyResult() {
    if (!result?.text || !navigator.clipboard) return
    await navigator.clipboard.writeText(result.text)
    setCopied(true)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <header className="border-b border-ink-200 pb-6"><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-brand-600"><Languages className="size-4" /> বাংলা সহায়তা</p><h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">English to Bangla</h1><p className="mt-2 max-w-2xl text-ink-500">পরিচিত শব্দ ও বাক্যাংশের বাংলা অর্থ দেখুন, তারপর শব্দগুলো দিয়ে নিজে বাক্য তৈরি করুন।</p></header>
      <div className="mt-7 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <label className="block"><span className="mb-2 block text-sm font-bold text-ink-700">English</span><textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type a word or sentence..." rows={8} className="w-full resize-y border border-ink-200 bg-white p-4 leading-relaxed outline-none transition focus:border-brand-500" /></label>
        <ArrowLeftRight className="mx-auto hidden size-5 text-ink-300 md:block" />
        <div><span className="mb-2 block text-sm font-bold text-ink-700">বাংলা</span><div aria-live="polite" className="min-h-52 border border-ink-200 bg-brand-50 p-4 leading-relaxed text-brand-900">{result?.text || <span className="text-ink-300">অনুবাদ এখানে দেখা যাবে</span>}</div></div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={() => translate()} className="inline-flex h-11 items-center gap-2 bg-brand-700 px-5 font-bold text-white transition hover:bg-brand-800"><Languages className="size-4" /> অনুবাদ দেখুন</button><a href={input.trim() ? googleTranslateUrl : undefined} target="_blank" rel="noreferrer" aria-disabled={!input.trim()} className="inline-flex h-11 items-center gap-2 border border-ink-200 bg-white px-4 font-semibold text-ink-700 hover:bg-ink-50 aria-disabled:pointer-events-none aria-disabled:opacity-40"><ExternalLink className="size-4" /> Google Translate</a><button type="button" onClick={() => { setInput(''); setResult(null); setCopied(false) }} className="inline-flex h-11 items-center gap-2 border border-ink-200 bg-white px-4 font-semibold text-ink-700 hover:bg-ink-50"><RotateCcw className="size-4" /> মুছুন</button>{result?.text && <button type="button" onClick={copyResult} className="inline-flex h-11 items-center gap-2 border border-ink-200 bg-white px-4 font-semibold text-ink-700 hover:bg-ink-50"><Clipboard className="size-4" /> {copied ? 'কপি হয়েছে' : 'কপি'}</button>}</div>
      {result?.unknown?.length > 0 && <p className="mt-4 border-l-2 border-sun-500 bg-sun-50 px-4 py-3 text-sm leading-relaxed text-ink-700">এই local dictionary-তে নেই: <strong>{result.unknown.join(', ')}</strong>। এগুলো ইংরেজিতেই রাখা হয়েছে। পূর্ণ বাক্যের নির্ভুল অনুবাদের জন্য translation service যুক্ত করতে হবে।</p>}
      <section className="mt-9"><h2 className="font-display text-lg font-bold">দ্রুত চেষ্টা করুন</h2><div className="mt-3 flex flex-wrap gap-2">{examples.map((example) => <button key={example} type="button" onClick={() => translate(example)} className="border border-ink-200 bg-white px-3 py-2 text-sm font-semibold text-ink-700 transition hover:border-brand-300 hover:text-brand-700">{example}</button>)}</div><p className="mt-4 text-xs leading-relaxed text-ink-300">Google Translate-এ পাঠালে অনুবাদ Google-এর সাইটে খুলবে। স্থানীয় dictionary-টি সাধারণ শব্দ ও phrase-এর জন্য।</p></section>
    </div>
  )
}