import { motion, useReducedMotion } from 'framer-motion'
import { LEVELS } from '@/lib/curriculum'

const heights = [24, 36, 48, 60, 72, 84] // % of container
const tones = [
  'bg-brand-100 text-brand-800', 'bg-brand-200 text-brand-800', 'bg-brand-300 text-brand-900',
  'bg-brand-400 text-white', 'bg-brand-500 text-white', 'bg-brand-700 text-white',
]

// Build keyframes so the dot hops from step to step, once, after the steps have risen.
const n = LEVELS.length
const left = [], bottom = []
for (let i = 0; i < n; i++) {
  left.push(((i + 0.5) * 100) / n)
  bottom.push(heights[i] + 2)
  if (i < n - 1) {
    left.push(((i + 1) * 100) / n)
    bottom.push(Math.max(heights[i], heights[i + 1]) + 12)
  }
}

export function StairsHero() {
  const reduce = useReducedMotion()
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-lg" role="img" aria-label="Six steps from A1 Beginner up to C2 Mastery">
      <div className="absolute inset-0 flex items-end gap-1.5">
        {LEVELS.map((l, i) => (
          <motion.div
            key={l.id}
            className={`flex flex-1 origin-bottom flex-col justify-end rounded-t-2xl p-2 pb-3 ${tones[i]}`}
            style={{ height: `${heights[i]}%` }}
            initial={reduce ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.15 + i * 0.09, type: 'spring', stiffness: 160, damping: 18 }}
          >
            <span className="font-display text-lg font-extrabold leading-none sm:text-xl">{l.code}</span>
            <span className="mt-1 hidden text-[11px] font-semibold leading-tight opacity-80 sm:block">{l.name}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="absolute z-10 size-6 -translate-x-1/2 rounded-full bg-sun-400 shadow-[0_3px_0_0_var(--color-sun-500)]"
        initial={reduce ? false : { left: `${left[0]}%`, bottom: `${bottom[0]}%`, opacity: 0 }}
        animate={reduce ? { left: `${left.at(-1)}%`, bottom: `${bottom.at(-1)}%`, opacity: 1 } : {
          left: left.map((v) => `${v}%`),
          bottom: bottom.map((v) => `${v}%`),
          opacity: 1,
        }}
        transition={{ delay: 1.1, duration: 3.2, ease: 'easeInOut', opacity: { delay: 1.0, duration: 0.2 } }}
      />
    </div>
  )
}
