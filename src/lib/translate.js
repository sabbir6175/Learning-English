import { ALL_LESSONS } from './curriculum'

const commonWords = {
  a: 'একটি', an: 'একটি', the: 'টি', i: 'আমি', you: 'তুমি', he: 'সে', she: 'সে', we: 'আমরা', they: 'তারা', it: 'এটি',
  am: 'হই', is: 'হয়', are: 'হয়', was: 'ছিল', were: 'ছিল', be: 'হওয়া', have: 'আছে', has: 'আছে', do: 'করা', does: 'করে',
  can: 'পারি', will: 'করব', should: 'উচিত', want: 'চাই', like: 'পছন্দ করি', love: 'ভালোবাসি', make: 'তৈরি করা', go: 'যাওয়া',
  to: 'তে', from: 'থেকে', in: 'ভিতরে', on: 'উপর', at: 'এ', with: 'সাথে', for: 'জন্য', and: 'এবং', but: 'কিন্তু',
  this: 'এটি', that: 'সেটি', my: 'আমার', your: 'তোমার', our: 'আমাদের', please: 'দয়া করে', thank: 'ধন্যবাদ', help: 'সাহায্য',
  water: 'পানি', book: 'বই', english: 'ইংরেজি', bangla: 'বাংলা', today: 'আজ', tomorrow: 'আগামীকাল', every: 'প্রতি', day: 'দিন',
  good: 'ভালো', morning: 'সকাল', name: 'নাম', friend: 'বন্ধু', family: 'পরিবার', learn: 'শেখা', study: 'পড়াশোনা করা',
}

export const wordTranslations = new Map([
  ...Object.entries(commonWords),
  ...ALL_LESSONS.flatMap((lesson) => lesson.vocab.map(({ w, bn }) => [w.toLowerCase(), bn])),
])

const phraseTranslations = {
  'how are you': 'আপনি কেমন আছেন', 'i am fine': 'আমি ভালো আছি', 'what is your name': 'আপনার নাম কী',
  'my name is': 'আমার নাম', 'good morning': 'সুপ্রভাত', 'good afternoon': 'শুভ অপরাহ্ণ',
  'good night': 'শুভরাত্রি', 'see you tomorrow': 'আগামীকাল দেখা হবে', 'thank you': 'ধন্যবাদ',
  'thank you for your help': 'আপনার সাহায্যের জন্য ধন্যবাদ', 'i am learning english': 'আমি ইংরেজি শিখছি',
  'i study english every day': 'আমি প্রতিদিন ইংরেজি পড়ি', 'i want to learn english': 'আমি ইংরেজি শিখতে চাই',
  'i like tea': 'আমি চা পছন্দ করি',
  'you are welcome': 'আপনাকে স্বাগতম', 'i do not understand': 'আমি বুঝতে পারছি না',
  'i would like': 'আমি চাই', 'how much does it cost': 'এটির দাম কত', 'where is the bathroom': 'বাথরুম কোথায়',
}

export function translateEnglishToBangla(input) {
  const text = input.trim()
  if (!text) return { text: '', unknown: [] }
  const normalized = text.toLowerCase().replace(/[.!?]+$/, '').trim()
  const exactPhrase = phraseTranslations[normalized]
  if (exactPhrase) return { text: exactPhrase, unknown: [] }

  const unknown = new Set()
  const translated = text.replace(/[A-Za-z]+(?:'[A-Za-z]+)?/g, (word) => {
    const meaning = wordTranslations.get(word.toLowerCase())
    if (!meaning) unknown.add(word)
    return meaning || word
  })
  return { text: translated, unknown: [...unknown] }
}