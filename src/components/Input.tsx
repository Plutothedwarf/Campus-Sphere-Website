import type { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: ReactNode
}

export const Input = ({ label, error, hint, icon, className = '', ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-mono uppercase tracking-widest text-xs opacity-80 mb-1 font-bold">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#210100]/60">{icon}</span>
        )}
        <input
          className={[
            'w-full rounded-lg border border-black/20 bg-white/90 backdrop-blur-sm px-4 py-3 text-[#210100] font-body',
            'shadow-sm outline-none',
            'focus:border-[#8C0902] focus:bg-white focus:shadow-md transition-all duration-150',
            'placeholder:text-[#210100]/40',
            error ? 'border-red-600' : '',
            icon ? 'pl-10' : '',
            className,
          ].join(' ')}
          {...props}
        />
      </div>
      {hint && !error && <p className="text-xs opacity-60 font-serif italic">{hint}</p>}
      {error && <p className="text-xs text-red-600 font-mono">{error}</p>}
    </div>
  )
}
