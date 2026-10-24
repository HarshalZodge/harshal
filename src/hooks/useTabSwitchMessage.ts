import { useEffect, useRef } from 'react'
import { soundFx } from '../lib/soundFx'
import { triggerToast } from '../lib/toast'

const AWAY_MESSAGES = [
  "⚡ Don't leave yet! // Harshal Zodge",
  "👋 Miss you! Come back to explore AI",
  "🧠 Neural link paused... — Harshal Zodge",
  "🚀 Building the future... Come back!",
]

export function useTabSwitchMessage() {
  const originalTitleRef = useRef<string>('')
  const intervalRef = useRef<number | null>(null)
  const messageIndexRef = useRef<number>(0)

  useEffect(() => {
    if (typeof document === 'undefined') return

    // Cache the pristine original document title
    if (!originalTitleRef.current) {
      originalTitleRef.current = document.title || 'Harshal Deepak Zodge — Software Developer & AI Engineer'
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched to another browser tab
        messageIndexRef.current = 0
        document.title = AWAY_MESSAGES[0]

        // Cycle through away messages every 3 seconds to catch attention in tab bar
        intervalRef.current = window.setInterval(() => {
          messageIndexRef.current = (messageIndexRef.current + 1) % AWAY_MESSAGES.length
          document.title = AWAY_MESSAGES[messageIndexRef.current]
        }, 3000)
      } else {
        // User returned to this tab
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }

        // Show welcome back title temporarily
        document.title = '🚀 Welcome back! // Harshal Zodge'

        // Play soft procedural acoustic chime if sound is enabled
        soundFx.playHover()

        // Trigger floating frosted micro-toast
        triggerToast({
          title: 'Welcome back!',
          description: 'Neural session restored.',
          icon: 'sparkles',
        })

        // Restore permanent original title after 2.5 seconds
        const timeout = setTimeout(() => {
          document.title = originalTitleRef.current
        }, 2500)

        return () => clearTimeout(timeout)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
      if (originalTitleRef.current) {
        document.title = originalTitleRef.current
      }
    }
  }, [])
}
