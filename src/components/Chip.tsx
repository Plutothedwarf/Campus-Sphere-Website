import type { ReactNode } from 'react'

type ChipVariant = 'free' | 'freemium' | 'premium' | 'club-free' | 'club-pro' | 'custom'

interface ChipProps {
  variant?: ChipVariant
  label?: string
  color?: string
  textColor?: string
  className?: string
  icon?: ReactNode
}

const CHIP_STYLES: Record<ChipVariant, { bg: string; text: string; label: string; icon?: string }> = {
  free: { bg: '#2EC4A0', text: '#14110F', label: 'FREE' },
  freemium: { bg: '#FFD23F', text: '#14110F', label: 'FREEMIUM' },
  premium: { bg: '#FF5FA2', text: 'white', label: 'PREMIUM', icon: '✨' },
  'club-free': { bg: '#2EC4A0', text: '#14110F', label: 'CLUB FREE' },
  'club-pro': { bg: '#7C5CFF', text: 'white', label: 'CLUB PRO', icon: '⚡' },
  custom: { bg: '#FFF4E0', text: '#14110F', label: '' },
}

export const Chip = ({ variant = 'free', label, color, textColor, className = '', icon }: ChipProps) => {
  const styles = CHIP_STYLES[variant]
  const displayLabel = label || styles.label
  const bg = color || styles.bg
  const text = textColor || styles.text
  const displayIcon = icon || styles.icon

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-widest uppercase border border-black/10 shadow-sm ${className}`}
      style={{ backgroundColor: bg, color: text }}
    >
      {displayIcon && <span>{displayIcon}</span>}
      {displayLabel}
    </span>
  )
}
