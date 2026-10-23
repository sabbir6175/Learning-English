import { shuffle } from '@/lib/utils'

/**
 * Turns lesson content into a list of exercises.
 * To add a new exercise type: push a new { type, ... } here, then render it in ExerciseStep.
 */
export function buildExercises(lesson, level) {
  const bnMode = level.bnOptions
  const meaning = (v) => (bnMode ? v.bn : v.en)
  const words = shuffle(lesson.vocab)
  const list = []

  words.slice(0, 3).forEach((w) => {
    const wrong = shuffle(lesson.vocab.filter((v) => v.w !== w.w)).slice(0, 3).map(meaning)
    list.push({
      id: `meaning-${w.w}`, type: 'choice',
      label: bnMode ? 'Choose the meaning' : 'Choose the best definition',
      prompt: bnMode ? `What does “${w.w}” mean?` : `Which definition matches “${w.w}”?`,
      promptBn: bnMode ? `“${w.w}” মানে কী?` : `“${w.w}” এর সঠিক সংজ্ঞা কোনটি?`,
      speak: w.w,
      options: shuffle([meaning(w), ...wrong]),
      answer: meaning(w),
    })
  })

  shuffle(lesson.vocab).slice(0, 2).forEach((w) => {
    const wrong = shuffle(lesson.vocab.filter((v) => v.w !== w.w)).slice(0, 3).map((v) => v.w)
    list.push({
      id: `listen-${w.w}`, type: 'listen',
      label: 'Listen',
      prompt: 'Which word do you hear?', promptBn: 'কোন শব্দটি শুনলেন?',
      speak: w.w,
      options: shuffle([w.w, ...wrong]),
      answer: w.w,
    })
  })

  lesson.fill.forEach((f, i) => {
    list.push({
      id: `fill-${i}`, type: 'fill',
      label: 'Fill in the blank',
      prompt: f.q, promptBn: f.bn,
      options: f.d ? shuffle([f.a, ...f.d]) : null, // word bank for beginners, typing for others
      answer: f.a,
    })
  })

  return shuffle(list)
}

export const starsFor = (pct) => (pct >= 0.9 ? 3 : pct >= 0.75 ? 2 : 1)
