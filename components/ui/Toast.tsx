'use client'

import * as ToastPrimitive from '@radix-ui/react-toast'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import clsx from 'clsx'
import styles from './Toast.module.scss'
import { createContext, useContext, useState, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastType = 'success' | 'error' | 'info'

interface ToastMessage {
  id: string
  type: ToastType
  title: string
  description?: string
}

interface ToastContextValue {
  showToast: (type: ToastType, title: string, description?: string) => void
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback(
    (type: ToastType, title: string, description?: string) => {
      const id = Math.random().toString(36).slice(2)
      setToasts((prev) => [...prev, { id, type, title, description }])
    },
    []
  )

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle size={18} />,
    error: <AlertCircle size={18} />,
    info: <Info size={18} />,
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastPrimitive.Provider swipeDirection="right" duration={4000}>
        {children}

        {toasts.map((toast) => (
          <ToastPrimitive.Root
            key={toast.id}
            className={clsx(styles.toast, styles[toast.type])}
            onOpenChange={(open) => {
              if (!open) dismiss(toast.id)
            }}
            defaultOpen
          >
            <div className={styles.toastInner}>
              <span className={styles.toastIcon}>{icons[toast.type]}</span>
              <div className={styles.toastContent}>
                <ToastPrimitive.Title className={styles.toastTitle}>
                  {toast.title}
                </ToastPrimitive.Title>
                {toast.description && (
                  <ToastPrimitive.Description className={styles.toastDescription}>
                    {toast.description}
                  </ToastPrimitive.Description>
                )}
              </div>
              <ToastPrimitive.Close className={styles.toastClose} aria-label="Закрыть">
                <X size={14} />
              </ToastPrimitive.Close>
            </div>
          </ToastPrimitive.Root>
        ))}

        <ToastPrimitive.Viewport className={styles.viewport} />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}
