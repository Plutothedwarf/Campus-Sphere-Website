import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'


interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
  duration?: number
}

const TYPE_STYLES = {
  success: { bg: '#2EC4A0', icon: '✓' },
  error: { bg: '#EE4B3E', icon: '!' },
  info: { bg: '#FFD23F', icon: 'i' },
}

export const Toast = ({ message, type = 'info', onClose, duration = 3000 }: ToastProps) => {
  const styles = TYPE_STYLES[type]

  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <motion.div
      className="flex items-center gap-3 px-5 py-3 rounded-full border border-black/10 font-body font-medium text-[#210100]"
      style={{
        backgroundColor: styles.bg,
        boxShadow: 'var(--shadow-soft)',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}

      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      <span className="w-6 h-6 rounded-full bg-[#210100] text-[#FFFAED] flex items-center justify-center text-xs font-black shadow-inner">
        {styles.icon}
      </span>
      {message}
    </motion.div>
  )
}

// Toast container + hook
import { useState, useCallback } from 'react'

interface ToastItem {
  id: string
  message: string
  type?: 'success' | 'error' | 'info'
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, showToast, removeToast }
}

export const ToastContainer = ({ toasts, removeToast }: { toasts: ToastItem[]; removeToast: (id: string) => void }) => {
  return createPortal(
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast
              message={t.message}
              type={t.type}
              onClose={() => removeToast(t.id)}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  )
}
