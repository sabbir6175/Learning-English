import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

const variants = {
  primary: 'bg-brand-500 text-white shadow-[0_4px_0_0_var(--color-brand-700)] hover:bg-brand-400 active:translate-y-1 active:shadow-none',
  success: 'bg-mint-500 text-white shadow-[0_4px_0_0_var(--color-mint-700)] hover:brightness-105 active:translate-y-1 active:shadow-none',
  secondary: 'bg-white text-ink-900 border border-ink-200 shadow-[0_3px_0_0_var(--color-ink-200)] hover:bg-ink-50 active:translate-y-0.5 active:shadow-none',
  ghost: 'text-ink-700 hover:bg-ink-100',
}
const sizes = { sm: 'h-9 px-3 text-sm', md: 'h-11 px-5 text-[15px]', lg: 'h-13 px-7 text-base' }

export const Button = forwardRef(function Button(
  { as, to, variant = 'primary', size = 'md', className, ...props }, ref
) {
  const Comp = to ? Link : as || 'button'
  return (
    <Comp
      ref={ref}
      to={to}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 select-none',
        'disabled:pointer-events-none disabled:opacity-45',
        variants[variant], sizes[size], className
      )}
      {...props}
    />
  )
})
