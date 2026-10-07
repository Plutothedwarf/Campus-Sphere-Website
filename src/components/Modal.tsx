import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  clean?: boolean // calm zone: removes decoration
  className?: string
}

export const Modal = ({ open, onClose, children, title, className = '' }: ModalProps) => {
  // Handle scroll lock and Esc key
  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-[#210100]/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={`relative flex flex-col w-[min(560px,100%)] max-h-[calc(100dvh-32px)] paper-panel overflow-hidden ${className}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 25 }}
          >
            {title && (
              <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between bg-[#FECE79]/20 shrink-0 sticky top-0 z-10">
                <h2 className="font-display font-black text-xl text-[#210100] uppercase tracking-wider">{title}</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-[#210100]/10 text-[#210100] hover:bg-[#8C0902] hover:text-[#F7F4D5] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}
            <div className="p-6 overflow-y-auto overscroll-contain">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
