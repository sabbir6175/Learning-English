import { motion, useReducedMotion } from 'framer-motion'
import { useSiteContent } from '@/store/useSiteContent'

const tones = [
  'bg-brand-100 text-brand-800', 'bg-brand-200 text-brand-800', 'bg-brand-300 text-brand-900',
  'bg-brand-400 text-white', 'bg-brand-500 text-white', 'bg-brand-700 text-white',
]

export function StairsHero() {
  const reduce = useReducedMotion()
  const levels = useSiteContent((state) => state.levels)
  const heights = levels.map((_, index) => Math.min(84, 24 + index * 12))
  const left = []
  const bottom = []
  levels.forEach((_, index) => {
    left.push(((index + 0.5) * 100) / levels.length)
    bottom.push(heights[index] + 2)
    if (index < levels.length - 1) {
      left.push(((index + 1) * 100) / levels.length)
      bottom.push(Math.max(heights[index], heights[index + 1]) + 12)
    }
  })
  if (!levels.length) return null

  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-lg" role="img" aria-label={`${levels.length} learning levels`}>
      <div className="absolute inset-0 flex items-end gap-1.5">
        {levels.map((l, i) => (
          <motion.div
            key={l.id}
            className={`flex flex-1 origin-bottom flex-col justify-end rounded-t-2xl p-2 pb-3 ${tones[i % tones.length]}`}
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
