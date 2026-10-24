import React, { useState, useEffect, useCallback, useRef } from 'react'
import type { ChromePreset } from '../components/chrome/LiquidChromeCanvas'
import { soundFx } from '../lib/soundFx'
import { siteConfig } from '../data/siteConfig'
import {
  StudioContext,
  PRESET_ORDER,
  FONT_ORDER,
  type TerminalEntry,
  type StudioTheme,
  type FontPreset,
} from './studioState'

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePreset, setActivePresetState] = useState<ChromePreset>('mercury')
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => soundFx.isEnabled())
  const fps = 60
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false)
  const [terminalLogs, setTerminalLogs] = useState<TerminalEntry[]>([])

  // Studio Theme State (Ivory vs Obsidian)
  const [theme, setThemeState] = useState<StudioTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hz_studio_theme') as StudioTheme
      if (saved === 'ivory' || saved === 'obsidian') return saved
    }
    return 'ivory'
  })

  // Film Grain Overlay State
  const [filmGrain, setFilmGrainState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hz_studio_grain') === 'true'
    }
    return true
  })

  // Swiss Resume View Modal
  const [resumeOpen, setResumeOpen] = useState<boolean>(false)

  // Real-time Scroll Velocity for Physics & Shaders
  const [scrollVelocity, setScrollVelocity] = useState<number>(0)

  // Dynamic Typography Preset: 'unbounded' | 'syne' | 'clash' | 'modernist'
  const [fontPreset, setFontPresetState] = useState<FontPreset>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hz_font_preset') as FontPreset
      if (saved && ['unbounded', 'syne', 'clash', 'modernist'].includes(saved)) {
        return saved
      }
    }
    return 'unbounded'
  })

  // Synchronize Typography with HTML root attribute
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-font', fontPreset)
      localStorage.setItem('hz_font_preset', fontPreset)
    }
  }, [fontPreset])

  const setFontPreset = useCallback((newFont: FontPreset) => {
    setFontPresetState(newFont)
    soundFx.playClick()
  }, [])

  const cycleFontPreset = useCallback((): FontPreset => {
    let nextFont: FontPreset = 'unbounded'
    setFontPresetState((curr) => {
      const currentIndex = FONT_ORDER.indexOf(curr)
      const nextIndex = (currentIndex + 1) % FONT_ORDER.length
      nextFont = FONT_ORDER[nextIndex]
      return nextFont
    })
    soundFx.playClick()
    return nextFont
  }, [])

  // Synchronize Theme with HTML root attribute
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme)
      if (theme === 'obsidian') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('hz_studio_theme', theme)
    }
  }, [theme])

  const setTheme = useCallback((newTheme: StudioTheme) => {
    setThemeState(newTheme)
    soundFx.playClick()
  }, [])

  const toggleTheme = useCallback((): StudioTheme => {
    const nextTheme: StudioTheme = theme === 'ivory' ? 'obsidian' : 'ivory'
    setThemeState(nextTheme)
    soundFx.playClick()
    return nextTheme
  }, [theme])

  const toggleFilmGrain = useCallback((): boolean => {
    const next = !filmGrain
    setFilmGrainState(next)
    if (typeof window !== 'undefined') {
      localStorage.setItem('hz_studio_grain', String(next))
    }
    soundFx.playClick()
    return next
  }, [filmGrain])

  const openResume = useCallback(() => {
    soundFx.playSuccess()
    setResumeOpen(true)
  }, [])

  const closeResume = useCallback(() => {
    setResumeOpen(false)
  }, [])

  // Coordinate shader preset changes
  const setPreset = useCallback((preset: ChromePreset) => {
    setActivePresetState(preset)
    soundFx.playPresetChord(preset)
  }, [])

  const cyclePreset = useCallback(() => {
    setActivePresetState((prev) => {
      const idx = PRESET_ORDER.indexOf(prev)
      const next = PRESET_ORDER[(idx + 1) % PRESET_ORDER.length]
      soundFx.playPresetChord(next)
      return next
    })
  }, [])

  // Audio Toggle
  const toggleSound = useCallback(() => {
    const newState = soundFx.toggle()
    setSoundEnabled(newState)
    return newState
  }, [])

  // Command Palette Open/Close
  const openCommandPalette = useCallback(() => {
    soundFx.playClick()
    setCommandPaletteOpen(true)
  }, [])

  const closeCommandPalette = useCallback(() => {
    setCommandPaletteOpen(false)
  }, [])

  // Real-time FPS Monitor using RequestAnimationFrame (broadcasts to HUD with zero context re-renders)
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(0)
  const fpsRef = useRef(60)

  useEffect(() => {
    let animId: number
    lastTimeRef.current = performance.now()
    frameCountRef.current = 0

    const updateFps = (now: number) => {
      if (document.visibilityState === 'visible') {
        frameCountRef.current++
        const delta = now - lastTimeRef.current

        if (delta >= 800) {
          const computedFps = Math.min(Math.max(Math.round((frameCountRef.current * 1000) / delta), 1), 144)
          fpsRef.current = computedFps
          window.dispatchEvent(new CustomEvent('studio:fps', { detail: computedFps }))
          frameCountRef.current = 0
          lastTimeRef.current = now
        }
      }

      animId = requestAnimationFrame(updateFps)
    }

    animId = requestAnimationFrame(updateFps)
    return () => cancelAnimationFrame(animId)
  }, [])

  // Global Keyboard listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandPaletteOpen((prev) => {
          if (!prev) soundFx.playClick()
          return !prev
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Terminal Command Dispatcher
  const executeCommand = useCallback((rawCmd: string): { success: boolean; message: string } => {
    const cleanCmd = rawCmd.trim()
    if (!cleanCmd) return { success: false, message: 'Empty command' }

    const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false })
    const parts = cleanCmd.replace(/^\//, '').split(/\s+/)
    const main = parts[0]?.toLowerCase()
    const arg = parts[1]?.toLowerCase()

    let entry: TerminalEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: timeStr,
      command: cleanCmd,
      output: '',
      type: 'info',
    }

    let success = true

    switch (main) {
      case 'whoami':
        entry.output = `${siteConfig.identity.name} — ${siteConfig.identity.role}. "${siteConfig.identity.primaryTagline}" Location: ${siteConfig.identity.location}. Focus: Systems Architecture, Real-Time Graphics, and Applied AI.`
        entry.type = 'info'
        soundFx.playCommandAck()
        break

      case 'stack':
      case 'tech':
        entry.output = `CORE ENGINE STACK: WebGL2, Three.js GLSL, React 19, TypeScript, Tailwind CSS v4, PyTorch, Node.js, Vite 8.`
        entry.type = 'info'
        soundFx.playCommandAck()
        break

      case 'theme':
        if (arg === 'ivory' || arg === 'obsidian') {
          setThemeState(arg as StudioTheme)
          entry.output = `Studio Theme shifted to: [ ${arg.toUpperCase()} MODE ].`
          entry.type = 'success'
          soundFx.playClick()
        } else {
          setThemeState((prev) => {
            const next = prev === 'ivory' ? 'obsidian' : 'ivory'
            entry.output = `Studio Theme toggled: [ ${next.toUpperCase()} MODE ].`
            return next
          })
          entry.type = 'success'
          soundFx.playClick()
        }
        break

      case 'grain':
        setFilmGrainState((prev) => {
          const next = !prev
          entry.output = `Analog 35mm Film Grain: [ ${next ? 'ENABLED' : 'MUTED'} ].`
          return next
        })
        entry.type = 'info'
        soundFx.playClick()
        break

      case 'resume':
      case 'cv':
        setResumeOpen(true)
        entry.output = `Opening Swiss Modernist Resume / Printable CV view...`
        entry.type = 'success'
        soundFx.playSuccess()
        break

      case 'preset':
      case 'material':
        if (arg && PRESET_ORDER.includes(arg as ChromePreset)) {
          setPreset(arg as ChromePreset)
          entry.output = `Activated GPU material preset: [ ${arg.toUpperCase()} ]. Normal displacement & optical uniforms updated.`
          entry.type = 'success'
        } else {
          entry.output = `Available presets: mercury, obsidian, iridescent, gold. Example: /preset obsidian`
          entry.type = 'warning'
          success = false
        }
        break

      case 'audio':
      case 'sound':
      case 'sfx':
        if (arg === 'on') {
          soundFx.setEnabled(true)
          setSoundEnabled(true)
          entry.output = `Audio synthesis engine enabled [SFX: ON]. Interactive Web Audio cues active.`
          entry.type = 'success'
        } else if (arg === 'off') {
          soundFx.setEnabled(false)
          setSoundEnabled(false)
          entry.output = `Audio synthesis engine muted [SFX: OFF].`
          entry.type = 'info'
        } else {
          const s = soundFx.toggle()
          setSoundEnabled(s)
          entry.output = `Audio synthesis engine toggled: [${s ? 'ON' : 'OFF'}].`
          entry.type = 'info'
        }
        break

      case 'fps':
      case 'perf':
        entry.output = `Telemetry Performance: ${fpsRef.current} FPS // ~${(1000 / fpsRef.current).toFixed(1)}ms frame latency. Adaptive WebGL2 render pipeline nominal.`
        entry.type = 'info'
        soundFx.playCommandAck()
        break

      case 'contact':
      case 'email':
        navigator.clipboard.writeText(siteConfig.contact.email)
        entry.output = `Direct email (${siteConfig.contact.email}) copied to system clipboard.`
        entry.type = 'success'
        soundFx.playSuccess()
        break

      case 'github':
        window.open(siteConfig.contact.github, '_blank')
        entry.output = `Opening GitHub profile (${siteConfig.contact.github})...`
        entry.type = 'info'
        soundFx.playCommandAck()
        break

      case 'linkedin':
        window.open(siteConfig.contact.linkedin, '_blank')
        entry.output = `Opening LinkedIn profile (${siteConfig.contact.linkedin})...`
        entry.type = 'info'
        soundFx.playCommandAck()
        break

      case 'font':
      case 'typography':
        if (arg === 'syne' || arg === 'avant-garde') {
          setFontPreset('syne')
          entry.output = `Typography switched to "Avant-Garde Studio" [Syne + Plus Jakarta Sans].`
          entry.type = 'success'
        } else if (arg === 'clash' || arg === 'editorial') {
          setFontPreset('clash')
          entry.output = `Typography switched to "Awwwards Editorial" [Clash Display + Satoshi].`
          entry.type = 'success'
        } else if (arg === 'unbounded' || arg === 'cyber') {
          setFontPreset('unbounded')
          entry.output = `Typography switched to "Cyber Kinetic" [Unbounded + Plus Jakarta Sans].`
          entry.type = 'success'
        } else if (arg === 'modernist' || arg === 'swiss') {
          setFontPreset('modernist')
          entry.output = `Typography switched to "Swiss Modernist" [Space Grotesk + Inter].`
          entry.type = 'success'
        } else {
          const next = cycleFontPreset()
          entry.output = `Typography preset cycled to [${next.toUpperCase()}].`
          entry.type = 'info'
        }
        break

      case 'certs':
      case 'certificates':
        window.location.hash = '#certifications'
        entry.output = `Navigating to Certifications Gallery (10 verified credentials: Oracle Agentic AI, Pregrad Full-Stack & AI/ML, Simplilearn n8n, IBM Web Dev)...`
        entry.type = 'success'
        soundFx.playSuccess()
        break

      case 'clear':
        setTerminalLogs([])
        soundFx.playClick()
        return { success: true, message: 'Terminal cleared' }

      case 'help':
        entry.output = `Available Commands:
• whoami           - Print developer identity & biography
• stack            - Inspect technical architecture & tools
• theme <mode>     - Toggle/set theme (ivory | obsidian)
• resume           - Launch Swiss Modernist CV / Print View
• certs            - Navigate to verified credentials gallery
• grain            - Toggle analog 35mm film grain overlay
• preset <name>    - Change shader preset (mercury|obsidian|iridescent|gold)
• audio <on|off>   - Toggle synthesized procedural audio
• fps              - Query real-time GPU frame rate & latency
• email            - Copy direct contact email to clipboard
• github           - Launch GitHub profile in new tab
• linkedin         - Launch LinkedIn profile in new tab
• clear            - Wipe terminal buffer`
        entry.type = 'info'
        soundFx.playCommandAck()
        break

      default:
        entry.output = `Command not recognized: "${cleanCmd}". Type "help" or "/help" for available studio commands.`
        entry.type = 'error'
        success = false
        soundFx.playClick()
        break
    }

    setTerminalLogs((prev) => [entry, ...prev].slice(0, 8))
    return { success, message: entry.output }
  }, [setPreset, setFontPreset, cycleFontPreset])

  const clearTerminalLogs = useCallback(() => {
    setTerminalLogs([])
  }, [])

  return (
    <StudioContext.Provider
      value={{
        activePreset,
        setPreset,
        cyclePreset,
        soundEnabled,
        toggleSound,
        fps,
        commandPaletteOpen,
        openCommandPalette,
        closeCommandPalette,
        terminalLogs,
        executeCommand,
        clearTerminalLogs,
        theme,
        setTheme,
        toggleTheme,
        filmGrain,
        toggleFilmGrain,
        resumeOpen,
        openResume,
        closeResume,
        scrollVelocity,
        setScrollVelocity,
        fontPreset,
        setFontPreset,
        cycleFontPreset,
      }}
    >
      {children}
    </StudioContext.Provider>
  )
}
