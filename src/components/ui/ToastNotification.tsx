import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Check, Info, X } from 'lucide-react'
import type { ToastMessage } from '../../lib/toast'

export const ToastNotification: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastMessage>
      if (customEvent.detail) {
        const newToast = {
          ...customEvent.detail,
          id: customEvent.detail.id || `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        }
        setToasts((prev) => [...prev.slice(-2), newToast])

        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== newToast.id))
        }, 3200)
      }
    }

    window.addEventListener('studio:toast', handleToast)
    return () => window.removeEventListener('studio:toast', handleToast)
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none px-4 max-w-md w-full"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#171717]/95 dark:bg-[#FAFAF8]/95 text-[#FAFAF8] dark:text-[#171717] backdrop-blur-xl border border-white/10 dark:border-black/10 shadow-[0_12px_36px_rgba(0,0,0,0.24)] text-xs font-mono"
          >
            <div className="w-5 h-5 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center shrink-0">
              {toast.icon === 'check' ? (
                <Check className="w-3 h-3 text-emerald-400 dark:text-emerald-600" />
              ) : toast.icon === 'info' ? (
                <Info className="w-3 h-3 text-sky-400 dark:text-sky-600" />
              ) : (
                <Sparkles className="w-3 h-3 text-amber-300 dark:text-amber-500" />
              )}
            </div>

            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-semibold tracking-wide">{toast.title}</span>
              {toast.description && (
                <span className="text-[#A8ADB2] dark:text-[#555] font-normal">
                  — {toast.description}
                </span>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="ml-1 p-0.5 text-white/50 dark:text-black/50 hover:text-white dark:hover:text-black transition-colors rounded-full"
              aria-label="Dismiss notification"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
