import { useMemo, useState } from 'react'
import { Check, ChevronRight, Search } from 'lucide-react'
import { useProgress } from '@/store/useProgress'

const modules = [
  { id: 'first-words', title: '১. বাক্যের শুরু', level: 'Beginner', topics: [
    { title: 'How an English sentence works', bn: 'ইংরেজি বাক্যের গঠন', explain: 'সাধারণ ইংরেজি বাক্যে আগে কে/কী (subject), তারপর কাজ (verb), শেষে কাকে/কী (object) আসে।', pattern: 'Subject + Verb + Object', examples: [['I read books.', 'আমি বই পড়ি।'], ['Rina likes music.', 'রিনা গান পছন্দ করে।']], practice: 'নিজের নাম দিয়ে একটি বাক্য লিখুন: “I ...”' },
    { title: 'Subject and object pronouns', bn: 'I, you, he, she, me, us', explain: 'যে কাজ করে সে subject; যার ওপর কাজ হয় সে object।', pattern: 'I see him. · She helps us.', examples: [['He knows me.', 'সে আমাকে চেনে।'], ['We help them.', 'আমরা তাদের সাহায্য করি।']], practice: 'I, you, he ব্যবহার করে তিনটি বাক্য লিখুন।' },
    { title: 'The verb be: am, is, are', bn: 'পরিচয়, অবস্থা ও জায়গা বলা', explain: 'নাম, পরিচয়, অনুভূতি বা কোথায় আছি বলতে am/is/are ব্যবহার করি।', pattern: 'I am · He/She/It is · You/We/They are', examples: [['I am ready.', 'আমি প্রস্তুত।'], ['They are at home.', 'তারা বাড়িতে আছে।']], practice: 'নিজের পরিচয় বা অবস্থা জানিয়ে বাক্য লিখুন।' },
    { title: 'Nouns and plural nouns', bn: 'নামবাচক শব্দ ও একাধিক', explain: 'মানুষ, জায়গা, বস্তু ও ভাবের নাম noun। একাধিক বোঝাতে সাধারণত -s বা -es যোগ হয়।', pattern: 'one book → two books · one class → two classes', examples: [['I have two sisters.', 'আমার দুই বোন আছে।'], ['The buses are late.', 'বাসগুলো দেরি করছে।']], practice: 'একটি singular এবং একটি plural noun দিয়ে বাক্য লিখুন।' },
    { title: 'A, an and the', bn: 'কোন জিনিস বোঝাচ্ছি', explain: 'সাধারণ একটি জিনিসে a/an; নির্দিষ্ট বা আগে বলা জিনিসে the। vowel sound দিয়ে শুরু হলে an হয়।', pattern: 'a bag · an apple · the bag on the chair', examples: [['She has an idea.', 'তার একটি ধারণা আছে।'], ['The idea is useful.', 'ধারণাটি কাজে লাগবে।']], practice: 'a, an, the দিয়ে তিনটি ছোট phrase লিখুন।' },
    { title: 'Adjectives and describing words', bn: 'কেমন তা বলা', explain: 'Adjective কোনো মানুষ বা জিনিস কেমন তা বলে। সাধারণত noun-এর আগে বসে।', pattern: 'adjective + noun · subject + be + adjective', examples: [['It is a small room.', 'এটি একটি ছোট ঘর।'], ['The room is quiet.', 'ঘরটি শান্ত।']], practice: 'নিজের ঘর বা কাজকে বর্ণনা করে দুটি বাক্য লিখুন।' },
    { title: 'This, that, these, those', bn: 'কাছের ও দূরের জিনিস', explain: 'কাছের একটিতে this, দূরের একটিতে that; একাধিক হলে these এবং those ব্যবহার হয়।', pattern: 'this/that + singular · these/those + plural', examples: [['This is my phone.', 'এটি আমার ফোন।'], ['Those are your books.', 'ওগুলো তোমার বই।']], practice: 'কাছের একটি ও দূরের কয়েকটি জিনিস দেখিয়ে বলুন।' },
  ] },
  { id: 'make-sentences', title: '২. বাক্য বানানো', level: 'Beginner', topics: [
    { title: 'Present simple', bn: 'অভ্যাস ও প্রতিদিনের কাজ', explain: 'অভ্যাস, নিয়মিত কাজ ও সাধারণ সত্য বোঝাতে present simple ব্যবহার হয়। he/she/it হলে verb-এ সাধারণত s যোগ হয়।', pattern: 'I/You/We/They work · He/She works', examples: [['I study every evening.', 'আমি প্রতি সন্ধ্যায় পড়ি।'], ['She works with clients.', 'সে client-দের সাথে কাজ করে।']], practice: 'প্রতিদিন করেন এমন তিনটি কাজ লিখুন।' },
    { title: 'Negative sentences', bn: 'না বলা: do not / does not', explain: 'Present simple-এ না বলতে do not বা does not ব্যবহার হয়। does not-এর পরে মূল verb-এ s থাকে না।', pattern: 'I do not work · He does not work', examples: [['We do not live here.', 'আমরা এখানে থাকি না।'], ['He does not drive.', 'সে গাড়ি চালায় না।']], practice: 'নিজের সম্পর্কে একটি negative বাক্য লিখুন।' },
    { title: 'Questions with do and does', bn: 'হ্যাঁ/না প্রশ্ন করা', explain: 'Present simple-এ প্রশ্নের শুরুতে do বা does বসে।', pattern: 'Do/Does + subject + base verb?', examples: [['Do you speak English?', 'আপনি কি ইংরেজি বলেন?'], ['Does she work here?', 'সে কি এখানে কাজ করে?']], practice: 'একজন সহকর্মীকে করার মতো একটি প্রশ্ন লিখুন।' },
    { title: 'Present continuous', bn: 'এখন যা চলছে', explain: 'এই মুহূর্তে চলমান কাজের জন্য am/is/are-এর সাথে verb-ing ব্যবহার হয়।', pattern: 'Subject + am/is/are + verb-ing', examples: [['I am learning English.', 'আমি ইংরেজি শিখছি।'], ['They are waiting outside.', 'তারা বাইরে অপেক্ষা করছে।']], practice: 'এখন আপনি কী করছেন, একটি বাক্যে লিখুন।' },
    { title: 'Past simple', bn: 'আগে ঘটে শেষ হয়েছে', explain: 'অতীতে শেষ হওয়া কাজ বোঝাতে verb-এর past form ব্যবহার হয়। Regular verb-এ সাধারণত -ed যোগ হয়।', pattern: 'Subject + past verb', examples: [['I finished the report.', 'আমি report শেষ করেছি।'], ['She went home.', 'সে বাড়ি গিয়েছিল।']], practice: 'গতকাল কী করেছিলেন, দুটি বাক্য লিখুন।' },
    { title: 'Future: will and going to', bn: 'ভবিষ্যতের কথা বলা', explain: 'তাৎক্ষণিক সিদ্ধান্ত বা অনুমানে will; আগে থেকে করা পরিকল্পনায় going to ব্যবহার করা যায়।', pattern: 'will + verb · am/is/are going to + verb', examples: [['I will call you later.', 'আমি পরে আপনাকে ফোন করব।'], ['We are going to start at ten.', 'আমরা দশটায় শুরু করতে যাচ্ছি।']], practice: 'আগামীকালের একটি পরিকল্পনা লিখুন।' },
    { title: 'There is and there are', bn: 'কোথাও কিছু আছে বলা', explain: 'একটি জিনিসের জন্য there is, একাধিক হলে there are ব্যবহার হয়।', pattern: 'There is + singular · There are + plural', examples: [['There is a meeting today.', 'আজ একটি meeting আছে।'], ['There are two options.', 'দুটি উপায় আছে।']], practice: 'আপনার ঘর বা workplace নিয়ে বাক্য লিখুন।' },
  ] },
  { id: 'time-and-detail', title: '৩. সময় ও বিস্তারিত', level: 'Elementary', topics: [
    { title: 'The 12 English tenses', bn: '১২টি tense-এর মানচিত্র', explain: 'সময়কে present, past, future এবং কাজের ধরনকে simple, continuous, perfect, perfect continuous দিয়ে বোঝানো হয়।', pattern: 'Present · Past · Future × Simple · Continuous · Perfect · Perfect continuous', examples: [['I work. / I am working.', 'আমি কাজ করি। / আমি এখন কাজ করছি।'], ['I have worked. / I have been working.', 'আমি কাজটি করেছি। / আমি কিছুক্ষণ ধরে কাজ করছি।']], practice: 'আপনার জন্য সবচেয়ে দরকারি দুটি tense বেছে উদাহরণ লিখুন।' },
    { title: 'Past continuous', bn: 'অতীতে চলছিল এমন কাজ', explain: 'অতীতের কোনো সময়ে কাজ চলছিল বোঝাতে was/were-এর সাথে verb-ing বসে।', pattern: 'Subject + was/were + verb-ing', examples: [['I was working at six.', 'ছয়টার সময় আমি কাজ করছিলাম।'], ['They were talking when I arrived.', 'আমি পৌঁছালে তারা কথা বলছিল।']], practice: 'গতকাল নির্দিষ্ট সময়ে কী করছিলেন লিখুন।' },
    { title: 'Present perfect', bn: 'কাজ শেষ, ফল এখন আছে', explain: 'অতীতের কাজের বর্তমান ফল বা জীবনের অভিজ্ঞতা বোঝাতে have/has + past participle ব্যবহার হয়।', pattern: 'Subject + have/has + past participle', examples: [['I have sent the email.', 'আমি email পাঠিয়েছি।'], ['She has visited Sylhet.', 'সে সিলেট ঘুরে এসেছে।']], practice: 'সম্প্রতি শেষ করেছেন এমন কাজ লিখুন।' },
    { title: 'Past perfect', bn: 'অতীতের আগের কাজ', explain: 'অতীতে আরেকটি ঘটনার আগেই কোনো কাজ শেষ হয়েছিল বোঝাতে had + past participle ব্যবহার হয়।', pattern: 'Subject + had + past participle', examples: [['We had left before the rain started.', 'বৃষ্টি শুরুর আগেই আমরা চলে গিয়েছিলাম।'], ['He had finished the task.', 'সে কাজটি শেষ করেছিল।']], practice: 'অতীতে আগে-পরে ঘটা দুটি কাজ লিখুন।' },
    { title: 'Can, could, should, must', bn: 'সক্ষমতা, পরামর্শ, প্রয়োজন', explain: 'Modal verb-এর পরে মূল verb-এর base form বসে। can সক্ষমতা, should পরামর্শ, must প্রয়োজন বোঝায়।', pattern: 'Subject + modal + base verb', examples: [['Could you repeat that?', 'আপনি কি কথাটি আবার বলবেন?'], ['You should save a copy.', 'আপনার একটি copy রাখা উচিত।']], practice: 'একটি ভদ্র অনুরোধ এবং একটি পরামর্শ লিখুন।' },
    { title: 'Adverbs and frequency', bn: 'কাজ কীভাবে/কতবার হয়', explain: 'Adverb কাজের ধরন, সময় বা frequency বোঝায়। usually, often, never-এর মতো শব্দ সাধারণত main verb-এর আগে বসে।', pattern: 'Subject + often + verb · verb + carefully', examples: [['I usually check my email.', 'আমি সাধারণত email দেখি।'], ['Please speak slowly.', 'দয়া করে ধীরে বলুন।']], practice: 'নিজের অভ্যাস সম্পর্কে frequency adverb দিয়ে লিখুন।' },
    { title: 'Prepositions of time and place', bn: 'সময় ও জায়গা বোঝানো', explain: 'in বড় সময়/ভিতরের জায়গা, on দিন/পৃষ্ঠ, at নির্দিষ্ট সময়/স্থানের জন্য ব্যবহৃত হয়।', pattern: 'at 9:00 · on Monday · in July · in the room', examples: [['The meeting is at 3 p.m.', 'meeting-টি বিকেল ৩টায়।'], ['Your file is on the desk.', 'আপনার file ডেস্কের ওপর।']], practice: 'সময়, দিন ও জায়গা দিয়ে একটি বাক্য লিখুন।' },
    { title: 'Countable and uncountable nouns', bn: 'গোনা যায়, গোনা যায় না', explain: 'Book-এর মতো জিনিস গোনা যায়; information-এর মতো শব্দ সাধারণত গোনা যায় না।', pattern: 'many books · much information · a piece of advice', examples: [['We have a few questions.', 'আমাদের কয়েকটি প্রশ্ন আছে।'], ['I need some information.', 'আমার কিছু তথ্য দরকার।']], practice: 'many, much বা some দিয়ে একটি বাক্য লিখুন।' },
  ] },
  { id: 'build-fluency', title: '৪. সঠিক ও স্বাভাবিক ইংরেজি', level: 'Intermediate+', topics: [
    { title: 'Comparatives and superlatives', bn: 'তুলনা করা', explain: 'দুইটির তুলনায় comparative, অনেকের মধ্যে সবচেয়ে বোঝাতে superlative ব্যবহার হয়।', pattern: 'faster than · the fastest · more useful than', examples: [['This option is cheaper.', 'এই উপায়টি সস্তা।'], ['It is the most useful report.', 'এটিই সবচেয়ে দরকারি report।']], practice: 'দুটি tool বা কাজের তুলনা লিখুন।' },
    { title: 'Conjunctions and joining ideas', bn: 'বাক্য জোড়া লাগানো', explain: 'and, but, because, so দিয়ে একাধিক ভাবকে যুক্ত করা যায়।', pattern: 'idea + but/because/so + idea', examples: [['I was busy, but I replied.', 'আমি ব্যস্ত ছিলাম, তবু উত্তর দিয়েছি।'], ['We started early because the task was urgent.', 'কাজটি জরুরি ছিল বলে আমরা আগে শুরু করেছি।']], practice: 'because বা but দিয়ে দুটি ভাব জুড়ে লিখুন।' },
    { title: 'Relative clauses', bn: 'মানুষ বা জিনিস সম্পর্কে বাড়তি তথ্য', explain: 'who মানুষ, which জিনিস, that মানুষ বা জিনিস বোঝাতে relative clause শুরু করে।', pattern: 'person + who · thing + which/that', examples: [['The colleague who called is here.', 'যে সহকর্মী ফোন করেছিলেন তিনি এখানে।'], ['This is the file that I need.', 'এটাই সেই file যা আমার দরকার।']], practice: 'who বা that দিয়ে একজন/একটি জিনিস বর্ণনা করুন।' },
    { title: 'Conditionals: if sentences', bn: 'শর্ত ও তার ফল', explain: 'বাস্তব সম্ভাবনা, সাধারণ সত্য, কল্পিত অবস্থা বা অতীতের আফসোস বলতে আলাদা conditional pattern আছে।', pattern: 'If + present, will + verb · If + past, would + verb', examples: [['If you need help, call me.', 'সাহায্য দরকার হলে আমাকে ফোন করুন।'], ['If I had more time, I would practise.', 'আরও সময় থাকলে আমি অনুশীলন করতাম।']], practice: 'কাজের একটি শর্ত এবং তার ফল লিখুন।' },
    { title: 'Passive voice', bn: 'কাজটিকে সামনে আনা', explain: 'কে করেছে তার চেয়ে কাজ বা ফল গুরুত্বপূর্ণ হলে passive voice ব্যবহার হয়।', pattern: 'Object + be + past participle', examples: [['The report was sent yesterday.', 'report-টি গতকাল পাঠানো হয়েছিল।'], ['The meeting has been moved.', 'meeting-টি সরানো হয়েছে।']], practice: 'একটি কাজ কে করেছে না বলে কাজটি কী হয়েছে লিখুন।' },
    { title: 'Reported speech', bn: 'অন্যের কথা জানানো', explain: 'কারও কথা নিজের বাক্যে জানাতে tense ও pronoun প্রসঙ্গ অনুযায়ী বদলাতে পারে।', pattern: 'She said, “I am busy.” → She said she was busy.', examples: [['He said he would call.', 'সে বলেছিল যে ফোন করবে।'], ['They told me they were ready.', 'তারা আমাকে বলেছিল যে তারা প্রস্তুত।']], practice: 'কেউ আপনাকে কী বলেছে, reported speech-এ লিখুন।' },
    { title: 'Gerunds and infinitives', bn: 'verb-এর পরে -ing না to', explain: 'কিছু verb-এর পরে -ing, কিছু verb-এর পরে to + base verb ব্যবহৃত হয়।', pattern: 'enjoy + verb-ing · want + to + verb', examples: [['I enjoy learning languages.', 'আমি ভাষা শিখতে আনন্দ পাই।'], ['We need to finish this today.', 'আজ আমাদের এটি শেষ করতে হবে।']], practice: 'enjoy এবং want দিয়ে একটি করে বাক্য লিখুন।' },
    { title: 'Phrasal verbs', bn: 'verb-এর সাথে ছোট শব্দ', explain: 'Verb-এর সাথে up, out, off-এর মতো শব্দ যোগ হলে নতুন অর্থ হতে পারে।', pattern: 'find out = discover · follow up = contact again', examples: [['I will follow up tomorrow.', 'আমি আগামীকাল আবার যোগাযোগ করব।'], ['We found out the cause.', 'আমরা কারণটি জানতে পেরেছি।']], practice: 'একটি phrasal verb দিয়ে কাজের বাক্য লিখুন।' },
    { title: 'Articles, punctuation and capitals', bn: 'লেখা পরিষ্কার ও ঠিক রাখা', explain: 'বাক্যের শুরুতে capital letter, শেষে full stop/question mark দিন। নাম ও জায়গার নাম capital দিয়ে লিখুন।', pattern: 'Subject + verb + complete thought + punctuation', examples: [['My name is Rina.', 'আমার নাম রিনা।'], ['Could you send the file?', 'আপনি কি file-টি পাঠাতে পারবেন?']], practice: 'একটি বাক্য লিখে capital letter ও punctuation পরীক্ষা করুন।' },
  ] },
]

const allTopics = modules.flatMap((module) => module.topics.map((topic, index) => ({ ...topic, moduleId: module.id, moduleTitle: module.title, number: index + 1 })))

export default function GrammarPage() {
  const [activeModule, setActiveModule] = useState(modules[0].id)
  const [activeId, setActiveId] = useState(allTopics[0].title)
  const [query, setQuery] = useState('')
  const completed = useProgress((state) => state.grammarCompleted)
  const markGrammarComplete = useProgress((state) => state.markGrammarComplete)
  const [draft, setDraft] = useState('')
  const module = modules.find((item) => item.id === activeModule)
  const visibleTopics = useMemo(() => {
    const term = query.trim().toLowerCase()
    return (term ? allTopics : allTopics.filter((topic) => topic.moduleId === activeModule))
      .filter((topic) => !term || `${topic.title} ${topic.bn} ${topic.explain}`.toLowerCase().includes(term))
  }, [activeModule, query])
  const selected = visibleTopics.find((topic) => topic.title === activeId) || visibleTopics[0]
  const progress = Math.round((completed.length / allTopics.length) * 100)

  function selectModule(id) {
    setActiveModule(id)
    setQuery('')
    setActiveId(modules.find((item) => item.id === id).topics[0].title)
    setDraft('')
  }

  function selectTopic(topic) {
    setActiveModule(topic.moduleId)
    setActiveId(topic.title)
    setDraft('')
  }

  function markComplete() {
    if (!selected || completed.includes(selected.title)) return
    markGrammarComplete(selected.title)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <header className="border-b border-ink-200 pb-6">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-brand-600">Grammar, একদম শুরু থেকে</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-extrabold sm:text-4xl">বাক্য তৈরি থেকে English Grammar</h1><p className="mt-2 max-w-2xl leading-relaxed text-ink-500">একটি lesson করে এগোন। আগে বাক্যের গঠন, তারপর tense, তারপর জটিল বাক্য ও কাজের ইংরেজি।</p></div><p className="text-sm font-bold text-ink-500">{completed.length}/{allTopics.length} lesson · {progress}%</p></div>
        <div className="mt-5 h-2 overflow-hidden bg-ink-100"><div className="h-full bg-brand-500 transition-[width]" style={{ width: `${progress}%` }} /></div>
        <label className="mt-5 flex h-11 max-w-md items-center gap-3 border border-ink-200 bg-white px-3 focus-within:border-brand-500"><Search className="size-4 text-ink-300" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Topic খুঁজুন: tense, question..." className="w-full bg-transparent text-sm outline-none placeholder:text-ink-300" /></label>
      </header>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2" aria-label="Grammar course modules">
        {modules.map((item) => <button key={item.id} type="button" aria-pressed={activeModule === item.id && !query} onClick={() => selectModule(item.id)} className={`shrink-0 border px-4 py-2 text-left ${activeModule === item.id && !query ? 'border-brand-700 bg-brand-700 text-white' : 'border-ink-200 bg-white text-ink-700 hover:border-brand-300'}`}><span className="block text-sm font-bold">{item.title}</span><span className={`mt-0.5 block text-xs ${activeModule === item.id && !query ? 'text-brand-100' : 'text-ink-500'}`}>{item.level} · {item.topics.length} lesson</span></button>)}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(230px,.72fr)_minmax(0,1.6fr)]">
        <aside className="lg:border-r lg:border-ink-200 lg:pr-5">
          <div className="mb-3 flex items-center justify-between"><h2 className="font-display font-bold">{query ? 'Search results' : module.title}</h2><span className="text-xs text-ink-300">{visibleTopics.length}</span></div>
          <nav className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1" aria-label="Grammar lessons">
            {visibleTopics.map((topic) => <button key={topic.title} type="button" onClick={() => selectTopic(topic)} aria-current={selected?.title === topic.title ? 'page' : undefined} className={`flex min-h-11 items-center gap-2 border-l-2 px-3 py-2 text-left text-sm ${selected?.title === topic.title ? 'border-brand-600 bg-brand-50 font-bold text-brand-800' : 'border-transparent text-ink-700 hover:bg-ink-100'}`}><span className="min-w-0 flex-1">{topic.title}</span>{completed.includes(topic.title) && <Check className="size-4 shrink-0 text-brand-600" />}</button>)}
            {!visibleTopics.length && <p className="py-5 text-sm text-ink-500">এই নামে কোনো topic পাওয়া যায়নি।</p>}
          </nav>
        </aside>

        {selected && <article className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">{selected.moduleTitle} · Lesson {allTopics.findIndex((topic) => topic.title === selected.title) + 1}</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">{selected.title}</h2>
          <p className="mt-1 text-lg font-semibold text-ink-500">{selected.bn}</p>
          <section className="mt-6"><h3 className="text-sm font-bold uppercase tracking-[0.1em] text-ink-500">সহজ ব্যাখ্যা</h3><p className="mt-2 max-w-3xl text-base leading-7 text-ink-700">{selected.explain}</p></section>
          <section className="mt-5 border-l-4 border-brand-500 bg-brand-50 p-4 sm:p-5"><h3 className="text-xs font-bold uppercase tracking-[0.1em] text-brand-700">Sentence pattern</h3><p className="mt-2 break-words font-mono text-sm font-bold leading-relaxed text-brand-900 sm:text-base">{selected.pattern}</p></section>
          <section className="mt-6"><h3 className="font-display font-bold">উদাহরণ</h3><div className="mt-3 divide-y divide-ink-100 border-y border-ink-200">{selected.examples.map(([english, bangla]) => <div key={english} className="py-3"><p className="font-semibold">{english}</p><p className="mt-1 text-sm text-ink-500">{bangla}</p></div>)}</div></section>
          <section className="mt-6"><label htmlFor="grammar-practice" className="font-display font-bold">এবার আপনি লিখুন</label><p className="mt-1 text-sm text-ink-500">{selected.practice}</p><textarea id="grammar-practice" value={draft} onChange={(event) => setDraft(event.target.value)} rows={3} placeholder="Write your own sentence..." className="mt-3 w-full resize-y border border-ink-200 bg-white p-3 text-ink-900 outline-none focus:border-brand-500" /></section>
          <div className="mt-4 flex flex-wrap items-center gap-3"><button type="button" onClick={markComplete} disabled={completed.includes(selected.title)} className="inline-flex h-10 items-center gap-2 bg-brand-700 px-4 text-sm font-bold text-white hover:bg-brand-800 disabled:bg-brand-100 disabled:text-brand-800"><Check className="size-4" />{completed.includes(selected.title) ? 'Lesson complete' : 'Mark lesson complete'}</button>{allTopics[allTopics.findIndex((topic) => topic.title === selected.title) + 1] && <button type="button" onClick={() => selectTopic(allTopics[allTopics.findIndex((topic) => topic.title === selected.title) + 1])} className="inline-flex h-10 items-center gap-2 px-2 text-sm font-bold text-brand-700">পরের lesson <ChevronRight className="size-4" /></button>}</div>
        </article>}
      </div>
    </div>
  )
}