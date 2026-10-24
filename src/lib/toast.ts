export interface ToastMessage {
  id: string
  title: string
  description?: string
  icon?: 'sparkles' | 'check' | 'info'
}

/**
 * Dispatch helper to trigger studio toasts from anywhere
 */
export function triggerToast(toast: Omit<ToastMessage, 'id'>) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent<ToastMessage>('studio:toast', {
        detail: {
          id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          ...toast,
        },
      })
    )
  }
}
