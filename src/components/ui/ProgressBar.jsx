import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
export function ProgressBar({ value = 0, className, barClassName }) {
  return (
    <div className={cn('h-2.5 w-full overflow-hidden rounded-full bg-ink-100', className)} role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
      <motion.div
        className={cn('h-full rounded-full bg-mint-500', barClassName)}
        initial={false}
        animate={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
    </div>
  )
}
