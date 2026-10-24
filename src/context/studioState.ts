import { createContext } from 'react'
import type { ChromePreset } from '../components/chrome/LiquidChromeCanvas'

export type StudioTheme = 'ivory' | 'obsidian'
export type FontPreset = 'syne' | 'clash' | 'unbounded' | 'modernist'

export interface TerminalEntry {
  id: string
  timestamp: string
  command: string
  output: string
  type: 'info' | 'success' | 'warning' | 'error'
}

export interface StudioContextType {
  activePreset: ChromePreset
  setPreset: (preset: ChromePreset) => void
  cyclePreset: () => void
  soundEnabled: boolean
  toggleSound: () => boolean
  fps: number
  commandPaletteOpen: boolean
  openCommandPalette: () => void
  closeCommandPalette: () => void
  terminalLogs: TerminalEntry[]
  executeCommand: (cmdString: string) => { success: boolean; message: string }
  clearTerminalLogs: () => void
  // Extended Studio Features
  theme: StudioTheme
  setTheme: (theme: StudioTheme) => void
  toggleTheme: () => StudioTheme
  filmGrain: boolean
  toggleFilmGrain: () => boolean
  resumeOpen: boolean
  openResume: () => void
  closeResume: () => void
  // Scroll Physics State
  scrollVelocity: number
  setScrollVelocity: (v: number) => void
  // Dynamic Typography Preset
  fontPreset: FontPreset
  setFontPreset: (font: FontPreset) => void
  cycleFontPreset: () => FontPreset
}

export const PRESET_ORDER: ChromePreset[] = ['mercury', 'obsidian', 'iridescent', 'gold']
export const FONT_ORDER: FontPreset[] = ['syne', 'clash', 'unbounded', 'modernist']

export const StudioContext = createContext<StudioContextType | undefined>(undefined)
