// Thin wrapper over the browser Speech Synthesis API (no backend needed).
// To switch to a cloud TTS later, only this file needs to change.
export const speechSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window

const pickVoice = () => {
  const voices = window.speechSynthesis.getVoices()
  return (
    voices.find((v) => v.lang === 'en-US' && /Google|Samantha|Aria|Jenny/i.test(v.name)) ||
    voices.find((v) => v.lang.startsWith('en')) ||
    null
  )
}

export function speak(text, { rate = 0.95, onEnd } = {}) {
  if (!speechSupported()) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-US'
  u.rate = rate
  const v = pickVoice()
  if (v) u.voice = v
  u.onend = () => onEnd?.()
  u.onerror = () => onEnd?.()
  window.speechSynthesis.speak(u)
}

export const stopSpeaking = () => speechSupported() && window.speechSynthesis.cancel()
