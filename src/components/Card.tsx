import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

interface CardProps {
  children: ReactNode
  color?: string
  rotate?: number
  className?: string
  style?: CSSProperties
  tiltOnHover?: boolean
  numbered?: number
}

export const Card = ({
  children,
  color = '#FFF4E0',
  rotate = 0,
  className = '',
  style = {},
  tiltOnHover = false,
  numbered,
}: CardProps) => {
  return (
    <motion.div
      className={`rounded-2xl border border-black/10 p-5 relative overflow-hidden bg-white/50 backdrop-blur-md ${className}`}
      style={{
        backgroundColor: color,
        rotate,
        boxShadow: 'var(--shadow-soft)',
        ...style,
      }}
      whileHover={tiltOnHover ? { rotate: 0, scale: 1.03, boxShadow: 'var(--shadow-soft)' } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {numbered !== undefined && (
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#210100] text-[#FFFAED] flex items-center justify-center text-sm font-bold font-mono shadow-inner">
          {String(numbered).padStart(2, '0')}
        </div>
      )}
      {children}
    </motion.div>
  )
}
