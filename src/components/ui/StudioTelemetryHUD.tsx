import React, { useState, useEffect } from 'react'
import { useStudio } from '../../hooks/useStudio'
import { soundFx } from '../../lib/soundFx'
import { Activity, Volume2, VolumeX, Sparkles, Command, ChevronDown, ChevronUp, Sun, Moon, Eye, FileText } from 'lucide-react'

export const StudioTelemetryHUD: React.FC = () => {
  const {
    activePreset,
    cyclePreset,
    soundEnabled,
    toggleSound,
    openCommandPalette,
    theme,
    toggleTheme,
    filmGrain,
    toggleFilmGrain,
    openResume,
    fontPreset,
    cycleFontPreset,
  } = useStudio()

  const [fps, setFps] = useState<number>(60)
  const [timeStr, setTimeStr] = useState<string>('')
  const [isMinimized, setIsMinimized] = useState<boolean>(false)

  // Direct FPS telemetry subscription with zero parent re-renders
  useEffect(() => {
    const handleFps = (e: Event) => {
      setFps((e as CustomEvent<number>).detail)
    }
    window.addEventListener('studio:fps', handleFps)
    return () => window.removeEventListener('studio:fps', handleFps)
  }, [])

  // Live IST (Indian Standard Time / Mumbai) clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const formatted = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
        setTimeStr(`${formatted} IST`)
      } catch {
        // Fallback to local time if timezone format unsupported
        setTimeStr(new Date().toLocaleTimeString('en-US', { hour12: false }))
      }
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCyclePreset = () => {
    soundFx.playClick()
    cyclePreset()
  }

  const handleToggleSound = () => {
    toggleSound()
  }

  // Minimized Capsule View
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40 animate-fade-in">
        <button
          onClick={() => {
            soundFx.playClick()
            setIsMinimized(false)
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAFAF8]/90 dark:bg-[#12141A]/90 backdrop-blur-xl border border-[#E5E3DE]/80 dark:border-white/10 shadow-lg text-xs font-mono text-[#171717] dark:text-[#FAFAF8] transition-all hover:scale-105"
          title="Expand Studio Telemetry HUD"
          aria-label="Expand telemetry panel"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider text-[#777773] dark:text-[#A8ADB2]">
            {fps} FPS
          </span>
          <span className="text-[#E5E3DE] dark:text-white/20">|</span>
          <span className="text-[10px] font-semibold uppercase">{activePreset}</span>
          <ChevronUp className="w-3 h-3 text-[#777773] dark:text-[#A8ADB2]" />
        </button>
      </div>
    )
  }

  return (
    <aside
      aria-label="Studio Telemetry Instrumentation"
      className="fixed bottom-4 right-4 z-40 max-w-[calc(100vw-2rem)] animate-fade-in"
    >
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAFAF8]/90 dark:bg-[#12141A]/90 backdrop-blur-xl border border-[#E5E3DE]/80 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] text-[#171717] dark:text-[#FAFAF8]">
        {/* Mumbai Local Time */}
        <div className="hidden md:flex items-center gap-1.5 pr-2.5 border-r border-[#E5E3DE] dark:border-white/10 text-[11px] font-mono text-[#777773] dark:text-[#A8ADB2]">
          <span className="text-[9px] uppercase tracking-widest text-[#A8ADB2] dark:text-neutral-500">MUMBAI</span>
          <span className="text-[#171717] dark:text-[#FAFAF8] font-semibold">{timeStr}</span>
        </div>

        {/* Real-Time GPU Performance */}
        <div className="flex items-center gap-1.5 px-1 sm:px-2 border-r border-[#E5E3DE] dark:border-white/10 text-[11px] font-mono">
          <Activity
            className={`w-3 h-3 ${fps >= 50 ? 'text-emerald-500' : 'text-amber-500'} ${
              fps >= 50 ? 'animate-pulse' : ''
            }`}
          />
          <span className="font-semibold text-[#171717] dark:text-[#FAFAF8]">{fps}</span>
          <span className="hidden sm:inline text-[9px] uppercase tracking-wider text-[#777773] dark:text-[#A8ADB2]">
            FPS
          </span>
        </div>

        {/* Interactive Material Preset Cycler */}
        <button
          onClick={handleCyclePreset}
          className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent hover:border-[#E5E3DE] dark:hover:border-white/20 transition-all text-[11px] font-mono text-[#171717] dark:text-[#FAFAF8] focus-visible:ring-1 focus-visible:ring-[#171717]"
          title="Click to cycle active GPU chrome material"
          aria-label={`Current GPU material: ${activePreset}. Click to cycle.`}
        >
          <Sparkles className="w-3 h-3 text-[#777773] dark:text-[#A8ADB2] group-hover:text-[#171717] dark:group-hover:text-[#FAFAF8] transition-colors" />
          <span className="text-[9px] uppercase tracking-wider text-[#777773] dark:text-[#A8ADB2] hidden lg:inline">
            PRESET:
          </span>
          <span className="font-semibold uppercase tracking-wider text-[10px]">
            {activePreset}
          </span>
        </button>

        {/* Interactive Typography Aesthetic Cycler */}
        <button
          onClick={cycleFontPreset}
          className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent hover:border-[#E5E3DE] dark:hover:border-white/20 transition-all text-[11px] font-mono text-[#171717] dark:text-[#FAFAF8] focus-visible:ring-1 focus-visible:ring-[#171717]"
          title="Click to cycle typography aesthetic (Syne, Clash Display, Unbounded, Modernist)"
          aria-label={`Current Typography: ${fontPreset}. Click to cycle.`}
        >
          <span className="font-display font-extrabold text-xs">Aa</span>
          <span className="text-[9px] uppercase tracking-wider text-[#777773] dark:text-[#A8ADB2] hidden lg:inline">
            FONT:
          </span>
          <span className="font-semibold uppercase tracking-wider text-[10px]">
            {fontPreset}
          </span>
        </button>

        {/* Procedural Audio Engine Toggle */}
        <button
          onClick={handleToggleSound}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all text-[11px] font-mono focus-visible:ring-1 focus-visible:ring-[#171717] ${
            soundEnabled
              ? 'bg-[#171717] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#171717] border-transparent shadow-sm'
              : 'bg-black/5 dark:bg-white/5 text-[#777773] dark:text-[#A8ADB2] border-transparent hover:border-[#E5E3DE] dark:hover:border-white/20 hover:text-[#171717] dark:hover:text-[#FAFAF8]'
          }`}
          title={soundEnabled ? 'Procedural Web Audio enabled. Click to mute.' : 'Procedural Web Audio muted. Click to enable.'}
          aria-label={soundEnabled ? 'Mute procedural audio' : 'Enable procedural audio'}
        >
          {soundEnabled ? (
            <Volume2 className="w-3 h-3 text-emerald-400 dark:text-emerald-600" />
          ) : (
            <VolumeX className="w-3 h-3" />
          )}
          <span className="text-[9px] uppercase tracking-wider hidden sm:inline">
            SFX: {soundEnabled ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* Theme Mode Toggle (Ivory / Obsidian) */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent hover:border-[#E5E3DE] dark:hover:border-white/20 transition-all text-[11px] font-mono text-[#171717] dark:text-[#FAFAF8] focus-visible:ring-1 focus-visible:ring-[#171717]"
          title={`Active Theme: ${theme.toUpperCase()}. Click to toggle.`}
          aria-label="Toggle studio theme"
        >
          {theme === 'obsidian' ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-[#777773] dark:text-[#A8ADB2]" />}
          <span className="text-[10px] uppercase font-semibold hidden md:inline">{theme}</span>
        </button>

        {/* Film Grain Toggle */}
        <button
          onClick={toggleFilmGrain}
          className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all text-[11px] font-mono focus-visible:ring-1 focus-visible:ring-[#171717] ${
            filmGrain
              ? 'bg-[#171717] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#171717] border-transparent shadow-sm'
              : 'bg-black/5 dark:bg-white/5 text-[#777773] dark:text-[#A8ADB2] border-transparent hover:border-[#E5E3DE] dark:hover:border-white/20'
          }`}
          title={filmGrain ? 'Analog 35mm film grain active' : 'Film grain muted'}
          aria-label="Toggle film grain"
        >
          <Eye className="w-3 h-3" />
          <span className="text-[9px] uppercase tracking-wider">GRAIN: {filmGrain ? 'ON' : 'OFF'}</span>
        </button>

        {/* CV Trigger */}
        <button
          onClick={openResume}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent hover:border-[#E5E3DE] dark:hover:border-white/20 text-[11px] font-mono text-[#171717] dark:text-[#FAFAF8] transition-all focus-visible:ring-1 focus-visible:ring-[#171717]"
          title="Open Swiss Modernist Resume (Print / PDF)"
          aria-label="Open resume view"
        >
          <FileText className="w-3 h-3 text-[#777773] dark:text-[#A8ADB2]" />
          <span className="text-[10px] uppercase font-semibold">CV</span>
        </button>

        {/* Command Palette Trigger */}
        <button
          onClick={openCommandPalette}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent hover:border-[#E5E3DE] dark:hover:border-white/20 text-[11px] font-mono text-[#777773] dark:text-[#A8ADB2] hover:text-[#171717] dark:hover:text-[#FAFAF8] transition-all focus-visible:ring-1 focus-visible:ring-[#171717]"
          title="Open Studio Command Palette (Ctrl+K or ⌘K)"
          aria-label="Open command palette"
        >
          <Command className="w-3 h-3" />
          <span className="text-[9px] font-semibold">⌘K</span>
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={() => {
            soundFx.playClick()
            setIsMinimized(true)
          }}
          className="w-6 h-6 rounded-full flex items-center justify-center text-[#777773] dark:text-[#A8ADB2] hover:text-[#171717] dark:hover:text-[#FAFAF8] hover:bg-black/5 dark:hover:bg-white/5 transition-colors ml-0.5"
          title="Minimize Telemetry HUD"
          aria-label="Minimize telemetry panel"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  )
}
