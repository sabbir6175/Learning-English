import { ArrowRight, BookA, BookOpen, BriefcaseBusiness, Headphones, PenLine, Route } from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = [
  { title: 'Start with useful words', bn: 'দরকারি শব্দ দিয়ে শুরু', detail: 'নিজের নাম বলা, পরিচয়, পরিবার, সময়, খাবার আর প্রতিদিনের কাজের শব্দ শিখুন।', link: '/levels', action: 'প্রথম lesson শুরু', icon: BookA, time: 'প্রথম ২ সপ্তাহ' },
  { title: 'Learn small sentence patterns', bn: 'ছোট বাক্য শিখুন', detail: 'I am…, I have…, I want…, Can you…? এই সহজ pattern দিয়ে নিজের কথা বলুন।', link: '/grammar', action: 'সহজ grammar পড়ুন', icon: BookOpen, time: '৩য়–৪র্থ সপ্তাহ' },
  { title: 'Listen and speak every day', bn: 'প্রতিদিন শুনুন ও বলুন', detail: 'একটি বাক্য শুনুন, জোরে বলুন, তারপর নিজের তথ্য দিয়ে নতুন বাক্য বানান।', link: '/sentences', action: 'বাক্য practice করুন', icon: Headphones, time: 'প্রতিদিন ১০ মিনিট' },
  { title: 'Talk about your work', bn: 'নিজের কাজ নিয়ে বলুন', detail: 'আপনার কাজ, সময়, দরকার, সমস্যা ও পরের কাজ সহজ ইংরেজিতে বোঝান।', link: '/meetings', action: 'কাজের কথা practice', icon: PenLine, time: 'পরের ধাপ' },
  { title: 'Practise a client meeting', bn: 'Client meeting practice', detail: 'পরিচয় দিন, client-এর দরকার জানুন, প্রশ্ন করুন, কাজের সময় ঠিক করুন, পরের step বলুন।', link: '/meetings', action: 'Meeting phrases দেখুন', icon: BriefcaseBusiness, time: 'কাজের জন্য প্রস্তুতি' },
]

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="border-b border-ink-200 pb-6"><p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-brand-600"><Route className="size-4" /> সহজ শেখার পথ</p><h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">একদম শুরু থেকে client meeting</h1><p className="mt-3 max-w-2xl leading-relaxed text-ink-500">একদিনে সব শিখতে হবে না। প্রতিদিন একটু করে শিখুন, বলুন, আবার practice করুন।</p></header>
      <ol className="mt-8 border-l-2 border-brand-200 pl-5 sm:pl-8">{steps.map(({ title, bn, detail, link, action, icon: Icon, time }, index) => <li key={title} className="relative pb-9 last:pb-0"><span className="absolute -left-[2rem] top-0 grid size-9 place-items-center rounded-full border-2 border-brand-200 bg-ink-50 text-brand-700 sm:-left-[3rem]"><Icon className="size-4" /></span><p className="text-xs font-bold uppercase tracking-[0.1em] text-brand-600">Step {index + 1} <span className="px-1 text-sun-500">·</span> {time}</p><h2 className="mt-1 font-display text-xl font-bold">{title}</h2><p className="mt-1 font-semibold text-ink-700">{bn}</p><p className="mt-2 max-w-2xl leading-relaxed text-ink-500">{detail}</p><Link to={link} className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-700">{action} <ArrowRight className="size-4" /></Link></li>)}</ol>
      <section className="mt-10 border-t border-ink-200 pt-6"><h2 className="text-xl font-bold">প্রতিদিনের ছোট routine</h2><div className="mt-4 grid gap-4 sm:grid-cols-3"><div className="border-l-2 border-brand-400 pl-4"><p className="font-bold">৫ মিনিট পড়ুন</p><p className="mt-1 text-sm text-ink-500">৫টি নতুন শব্দ ও অর্থ।</p></div><div className="border-l-2 border-sun-500 pl-4"><p className="font-bold">৫ মিনিট শুনুন</p><p className="mt-1 text-sm text-ink-500">শব্দের audio শুনে আবার বলুন।</p></div><div className="border-l-2 border-ink-300 pl-4"><p className="font-bold">৫ মিনিট বলুন</p><p className="mt-1 text-sm text-ink-500">নিজের জীবনের ৩টি বাক্য বানান।</p></div></div></section>
    </div>
  )
}