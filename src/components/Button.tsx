import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
  loading?: boolean
  icon?: ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-[#8C0902] text-[#F7F4D5] rounded-xl border border-black/10',
  secondary: 'bg-[#E6A341] text-[#210100] rounded-xl border border-black/10',
  ghost: 'bg-transparent text-[#210100] hover:bg-black/5 rounded-xl',
  danger: 'bg-[#B14A36] text-[#F7F4D5] rounded-xl border border-black/10',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-base',
  md: 'px-8 py-3.5 text-xl',
  lg: 'px-12 py-5 text-2xl',
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      className={[
        'inline-flex items-center gap-3 font-display uppercase tracking-widest cursor-pointer rounded-none',
        'magnetic-btn transition-all duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
      disabled={disabled || loading}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      {...(props as any)}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon}
      {children}
    </motion.button>
  )
}
