import { cn } from '@/lib/cn'
export const Card = ({ className, ...props }) => (
  <div className={cn('rounded-2xl border border-ink-100 bg-white', className)} {...props} />
)
