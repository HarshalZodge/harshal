import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { siteConfig } from '../../data/siteConfig'
import { useStudio } from '../../hooks/useStudio'
import { soundFx } from '../../lib/soundFx'
import {
  Search,
  ArrowRight,
  X,
  Terminal,
  Compass,
  Sparkles,
  Zap,
  Check,
  Cpu,
  Trash2,
} from 'lucide-react'

type PaletteCategory = 'ALL' | 'NAVIGATION' | 'SHADERS' | 'TERMINAL' | 'ACTIONS'

interface PaletteItem {
  id: string
  label: string
  category: 'Navigation' | 'Visual Shaders' | 'Terminal' | 'Actions'
  shortcut?: string
  description?: string
  spec?: {
    label: string
    value: string
  }[]
  action: () => void
}

export const CommandPalette: React.FC = () => {
  const {
    commandPaletteOpen: isOpen,
    closeCommandPalette: onClose,
    setPreset,
    activePreset,
    soundEnabled,
    toggleSound,
    terminalLogs,
    executeCommand,
    clearTerminalLogs,
    theme,
    toggleTheme,
    filmGrain,
    toggleFilmGrain,
    openResume,
    setFontPreset,
  } = useStudio()

  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<PaletteCategory>('ALL')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const navigateTo = useCallback((hash: string) => {
    window.location.hash = hash
  }, [])

  const handleClose = useCallback(() => {
    setQuery('')
    setSelectedIndex(0)
    onClose()
  }, [onClose])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Master Action and Navigation Catalog
  const allItems: PaletteItem[] = useMemo(() => [
    // Navigation
    {
      id: 'nav-about',
      label: 'Biography & Engineering Philosophy',
      category: 'Navigation',
      shortcut: '#about',
      description: 'Engineering mindset, academic background at Dr. Vithalrao Vikhe Patil College of Engineering (SPPU), and core technical values.',
      spec: [
        { label: 'SECTION', value: '01 / 07' },
        { label: 'ANCHOR', value: '#about' },
        { label: 'METRICS', value: '3 Core Pillars' },
      ],
      action: () => navigateTo('#about'),
    },
    {
      id: 'nav-skills',
      label: 'Technology & Dynamic Constellation',
      category: 'Navigation',
      shortcut: '#skills',
      description: 'Interactive 2D graph network and structured capability matrix spanning AI, full-stack, and WebGL.',
      spec: [
        { label: 'SECTION', value: '02 / 07' },
        { label: 'ANCHOR', value: '#skills' },
        { label: 'TECHNOLOGIES', value: '20+ Verified Stacks' },
      ],
      action: () => navigateTo('#skills'),
    },
    {
      id: 'nav-work',
      label: 'Featured Projects & Systems',
      category: 'Navigation',
      shortcut: '#work',
      description: 'Authentic project showcase featuring CurrencyVision AI, CareerPilot AI, Crime Record Management, and Full-Stack web systems.',
      spec: [
        { label: 'SECTION', value: '03 / 07' },
        { label: 'ANCHOR', value: '#work' },
        { label: 'PROJECTS', value: '7 Verified Systems' },
      ],
      action: () => navigateTo('#work'),
    },
    {
      id: 'nav-certifications',
      label: 'Certifications & Professional Learning',
      category: 'Navigation',
      shortcut: '#certifications',
      description: 'Official credentials gallery featuring Oracle Agentic AI, Pregrad Full-Stack & AI/ML mentorships, Simplilearn, and IBM credentials.',
      spec: [
        { label: 'SECTION', value: '04 / 07' },
        { label: 'ANCHOR', value: '#certifications' },
        { label: 'CREDENTIALS', value: '10 Verified Documents' },
      ],
      action: () => navigateTo('#certifications'),
    },
    {
      id: 'nav-journey',
      label: 'Chronology & Academic Milestones',
      category: 'Navigation',
      shortcut: '#journey',
      description: 'Scroll-linked timeline tracking computer engineering degree at SPPU, hackathons, and technical milestones.',
      spec: [
        { label: 'SECTION', value: '05 / 07' },
        { label: 'ANCHOR', value: '#journey' },
        { label: 'TRAJECTORY', value: '2023 — Present' },
      ],
      action: () => navigateTo('#journey'),
    },
    {
      id: 'nav-lab',
      label: 'The Digital Shader Lab',
      category: 'Navigation',
      shortcut: '#lab',
      description: 'Live interactive sandbox for GLSL shaders, procedural normals, and fluid domain deformation.',
      spec: [
        { label: 'SECTION', value: '06 / 07' },
        { label: 'ANCHOR', value: '#lab' },
        { label: 'ENGINE', value: 'WebGL2 / Three.js' },
      ],
      action: () => navigateTo('#lab'),
    },
    {
      id: 'nav-contact',
      label: 'Direct Transmission & Inquiry',
      category: 'Navigation',
      shortcut: '#contact',
      description: 'Connect directly for engineering opportunities, technical collaborations, and research inquiries.',
      spec: [
        { label: 'SECTION', value: '07 / 07' },
        { label: 'ANCHOR', value: '#contact' },
        { label: 'RESPONSE', value: 'Within 24 Hours' },
      ],
      action: () => navigateTo('#contact'),
    },

    // Shader presets
    {
      id: 'shader-mercury',
      label: 'Material Preset: Liquid Mercury',
      category: 'Visual Shaders',
      shortcut: '/preset mercury',
      description: 'High-gloss fluid chrome with balanced Fresnel grazing reflections and liquid surface tension.',
      spec: [
        { label: 'ALBEDO', value: '#F5F5F7 Silver' },
        { label: 'REFRACTIVE INDEX', value: 'η = 1.48' },
        { label: 'ROUGHNESS', value: '0.04 (Near Mirror)' },
        { label: 'DOMAIN WARP', value: '4-Octave Analytical FBM' },
      ],
      action: () => setPreset('mercury'),
    },
    {
      id: 'shader-obsidian',
      label: 'Material Preset: Obsidian Mirror',
      category: 'Visual Shaders',
      shortcut: '/preset obsidian',
      description: 'Deep vapor-deposition titanium with dark light-absorption curve and razor-sharp specular crests.',
      spec: [
        { label: 'ALBEDO', value: '#121214 Obsidian' },
        { label: 'REFRACTIVE INDEX', value: 'η = 2.10' },
        { label: 'ROUGHNESS', value: '0.02 (Ultra Gloss)' },
        { label: 'ABSORPTION', value: '94% Ambient Light' },
      ],
      action: () => setPreset('obsidian'),
    },
    {
      id: 'shader-iridescent',
      label: 'Material Preset: Glancing Iridescence',
      category: 'Visual Shaders',
      shortcut: '/preset iridescent',
      description: 'Prismatic thin-film interference producing grazing spectral dispersion across glancing incident angles.',
      spec: [
        { label: 'ALBEDO', value: 'Prismatic Dispersion' },
        { label: 'INTERFERENCE', value: 'Cosine Wave Phase Shift' },
        { label: 'ROUGHNESS', value: '0.06' },
        { label: 'INCIDENT ANGLE', value: '75° Grazing Peak' },
      ],
      action: () => setPreset('iridescent'),
    },
    {
      id: 'shader-gold',
      label: 'Material Preset: Molten Platinum-Gold',
      category: 'Visual Shaders',
      shortcut: '/preset gold',
      description: 'Warm, dense noble metal with rich champagne highlights and heavy fluid viscosity simulation.',
      spec: [
        { label: 'ALBEDO', value: '#D4AF37 Champagne Gold' },
        { label: 'METALLIC TINT', value: '18K Warm Specular' },
        { label: 'ROUGHNESS', value: '0.08' },
        { label: 'VISCOSITY', value: 'Heavy Molten Flow' },
      ],
      action: () => setPreset('gold'),
    },

    // Typography Aesthetics
    {
      id: 'font-syne',
      label: 'Typography: Avant-Garde Studio (Syne + Plus Jakarta Sans)',
      category: 'Actions',
      shortcut: '/font syne',
      description: 'Sculptural French design studio aesthetics with dynamic variable curves and high-fashion editorial tension.',
      spec: [
        { label: 'HEADLINE FONT', value: 'Syne (Extra-Bold)' },
        { label: 'BODY & NAV', value: 'Plus Jakarta Sans' },
        { label: 'AESTHETIC', value: 'Contemporary Luxury' },
      ],
      action: () => setFontPreset('syne'),
    },
    {
      id: 'font-clash',
      label: 'Typography: Awwwards Editorial (Clash Display + Satoshi)',
      category: 'Actions',
      shortcut: '/font clash',
      description: 'Razor-sharp, geometric high-contrast typography crafted for award-winning digital experiences.',
      spec: [
        { label: 'HEADLINE FONT', value: 'Clash Display' },
        { label: 'BODY & NAV', value: 'Satoshi' },
        { label: 'AESTHETIC', value: 'High-Impact Editorial' },
      ],
      action: () => setFontPreset('clash'),
    },
    {
      id: 'font-unbounded',
      label: 'Typography: Cyber Kinetic (Unbounded + Plus Jakarta Sans)',
      category: 'Actions',
      shortcut: '/font unbounded',
      description: 'Ultra-wide futuristic digital art display typeface paired with precision geometric body.',
      spec: [
        { label: 'HEADLINE FONT', value: 'Unbounded' },
        { label: 'BODY & NAV', value: 'Plus Jakarta Sans' },
        { label: 'AESTHETIC', value: 'Futuristic Generative Tech' },
      ],
      action: () => setFontPreset('unbounded'),
    },
    {
      id: 'font-modernist',
      label: 'Typography: Swiss Modernist (Space Grotesk + Inter)',
      category: 'Actions',
      shortcut: '/font modernist',
      description: 'Rigorous Bauhaus architectural grid typography with clean geometric proportions.',
      spec: [
        { label: 'HEADLINE FONT', value: 'Space Grotesk' },
        { label: 'BODY & NAV', value: 'Inter' },
        { label: 'AESTHETIC', value: 'International Typographic Style' },
      ],
      action: () => setFontPreset('modernist'),
    },

    // Terminal Commands
    {
      id: 'term-whoami',
      label: 'CLI: whoami',
      category: 'Terminal',
      shortcut: 'whoami',
      description: 'Print engineer identity, educational background, and strategic technical focus.',
      spec: [
        { label: 'COMMAND', value: 'whoami' },
        { label: 'OUTPUT', value: 'Engineering Profile' },
      ],
      action: () => executeCommand('whoami'),
    },
    {
      id: 'term-stack',
      label: 'CLI: stack',
      category: 'Terminal',
      shortcut: 'stack',
      description: 'Inspect full technical architecture, graphics libraries, and foundational tools.',
      spec: [
        { label: 'COMMAND', value: 'stack' },
        { label: 'OUTPUT', value: 'Runtime Tech Stack' },
      ],
      action: () => executeCommand('stack'),
    },
    {
      id: 'term-fps',
      label: 'CLI: fps',
      category: 'Terminal',
      shortcut: 'fps',
      description: 'Query live GPU rendering telemetry and frame dispatch latency metrics.',
      spec: [
        { label: 'COMMAND', value: 'fps' },
        { label: 'OUTPUT', value: 'Frame Rate Diagnostics' },
      ],
      action: () => executeCommand('fps'),
    },
    {
      id: 'term-audio',
      label: 'CLI: audio toggle',
      category: 'Terminal',
      shortcut: 'audio',
      description: 'Toggle native Web Audio API procedural sound synthesis on or off.',
      spec: [
        { label: 'COMMAND', value: 'audio toggle' },
        { label: 'OUTPUT', value: soundEnabled ? 'Mute' : 'Enable' },
      ],
      action: () => executeCommand('audio'),
    },
    {
      id: 'term-help',
      label: 'CLI: help',
      category: 'Terminal',
      shortcut: 'help',
      description: 'Display complete instruction manual for all available terminal HUD commands.',
      spec: [
        { label: 'COMMAND', value: 'help' },
        { label: 'OUTPUT', value: 'Command Index' },
      ],
      action: () => executeCommand('help'),
    },

    // Direct Actions
    // Extended Studio Actions
    {
      id: 'action-resume',
      label: 'Swiss Modernist Resume & Print View',
      category: 'Actions',
      shortcut: 'resume',
      description: 'Launch high-typography printable curriculum vitae with instant PDF export layout.',
      spec: [
        { label: 'FORMAT', value: 'Swiss Typographic Grid' },
        { label: 'ACTIONS', value: 'Print / Copy Text' },
      ],
      action: () => openResume(),
    },
    {
      id: 'action-theme-toggle',
      label: `Switch Theme to ${theme === 'ivory' ? 'Obsidian (Dark Mode)' : 'Ivory (Light Mode)'}`,
      category: 'Actions',
      shortcut: 'theme',
      description: 'Switch between Ivory Studio porcelain aesthetic and Obsidian titanium dark mode.',
      spec: [
        { label: 'CURRENT', value: theme === 'ivory' ? 'Ivory Porcelain' : 'Obsidian Titanium' },
        { label: 'TARGET', value: theme === 'ivory' ? 'Obsidian' : 'Ivory' },
      ],
      action: () => toggleTheme(),
    },
    {
      id: 'action-grain-toggle',
      label: `Analog 35mm Film Grain: ${filmGrain ? 'Disable Grain' : 'Enable Grain'}`,
      category: 'Actions',
      shortcut: 'grain',
      description: 'Toggle subtle procedural SVG photographic noise texture overlay across viewport.',
      spec: [
        { label: 'STATE', value: filmGrain ? 'ACTIVE' : 'MUTED' },
        { label: 'TEXTURE', value: 'Fractal Noise SVG' },
      ],
      action: () => toggleFilmGrain(),
    },
    {
      id: 'action-email',
      label: `Copy Email (${siteConfig.contact.email})`,
      category: 'Actions',
      shortcut: 'email',
      description: 'Copy developer direct contact email address to your system clipboard.',
      spec: [
        { label: 'ADDRESS', value: siteConfig.contact.email },
        { label: 'ACTION', value: 'Clipboard Write' },
      ],
      action: () => {
        navigator.clipboard.writeText(siteConfig.contact.email)
        setCopied(true)
        soundFx.playSuccess()
        setTimeout(() => setCopied(false), 2000)
      },
    },
    {
      id: 'action-toggle-audio',
      label: `Procedural Audio: ${soundEnabled ? 'Mute SFX' : 'Enable SFX'}`,
      category: 'Actions',
      shortcut: 'audio',
      description: 'Toggle procedural web audio synthesis for clicks, hover cues, and shader harmonics.',
      spec: [
        { label: 'CURRENT STATE', value: soundEnabled ? 'ACTIVE [ON]' : 'MUTED [OFF]' },
        { label: 'SYNTHESIS', value: 'Native Web Audio API' },
      ],
      action: () => {
        toggleSound()
      },
    },
    {
      id: 'action-github',
      label: 'Launch GitHub Repository Index',
      category: 'Actions',
      shortcut: 'github',
      description: 'Open external GitHub profile to browse open-source repositories and code history.',
      spec: [
        { label: 'TARGET', value: siteConfig.contact.github },
        { label: 'PROTOCOL', value: 'HTTPS External' },
      ],
      action: () => window.open(siteConfig.contact.github, '_blank'),
    },
    {
      id: 'action-linkedin',
      label: 'Connect via LinkedIn',
      category: 'Actions',
      shortcut: 'linkedin',
      description: 'Open LinkedIn network profile for professional engagements and references.',
      spec: [
        { label: 'TARGET', value: siteConfig.contact.linkedin },
        { label: 'PROTOCOL', value: 'HTTPS External' },
      ],
      action: () => window.open(siteConfig.contact.linkedin, '_blank'),
    },
  ], [navigateTo, setPreset, executeCommand, soundEnabled, toggleSound, theme, toggleTheme, filmGrain, toggleFilmGrain, openResume, setFontPreset])

  // Filter based on active category and user search query
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Category filter
      if (activeCategory === 'NAVIGATION' && item.category !== 'Navigation') return false
      if (activeCategory === 'SHADERS' && item.category !== 'Visual Shaders') return false
      if (activeCategory === 'TERMINAL' && item.category !== 'Terminal') return false
      if (activeCategory === 'ACTIONS' && item.category !== 'Actions') return false

      if (!query.trim()) return true

      const q = query.toLowerCase()
      const matchLabel = item.label.toLowerCase().includes(q)
      const matchCategory = item.category.toLowerCase().includes(q)
      const matchShortcut = item.shortcut?.toLowerCase().includes(q)
      const matchDesc = item.description?.toLowerCase().includes(q)

      return matchLabel || matchCategory || matchShortcut || matchDesc
    })
  }, [allItems, activeCategory, query])

  // Current active item for inspection preview
  const currentItem = filteredItems[selectedIndex] || filteredItems[0]

  // Keyboard navigation inside list
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        handleClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        soundFx.playHover()
        setSelectedIndex((prev) => (prev + 1) % Math.max(filteredItems.length, 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        soundFx.playHover()
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(filteredItems.length, 1))
      } else if (e.key === 'Tab') {
        e.preventDefault()
        soundFx.playClick()
        const categories: PaletteCategory[] = ['ALL', 'NAVIGATION', 'SHADERS', 'TERMINAL', 'ACTIONS']
        setActiveCategory((prev) => {
          const idx = categories.indexOf(prev)
          return categories[(idx + (e.shiftKey ? -1 : 1) + categories.length) % categories.length]
        })
        setSelectedIndex(0)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        // If user typed a direct CLI command that doesn't strictly match items
        const raw = query.trim()
        if (raw.startsWith('/') || ['whoami', 'stack', 'fps', 'audio', 'help', 'contact', 'clear'].includes(raw.toLowerCase())) {
          executeCommand(raw)
          setQuery('')
          return
        }

        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action()
          if (filteredItems[selectedIndex].category !== 'Terminal') {
            handleClose()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex, handleClose, query, executeCommand])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 p-3 sm:p-4 bg-[#171717]/65 backdrop-blur-md animate-fade-in"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Studio Command HUD"
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAFAF8] border border-[#E5E3DE] shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Command HUD Top Bar */}
        <div className="flex items-center px-4 py-3 sm:py-3.5 border-b border-[#E5E3DE] bg-[#FFFFFF]">
          <Search className="w-4 h-4 text-[#777773] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Type a command, section, or CLI keyword (e.g. /whoami, obsidian)..."
            className="w-full bg-transparent text-xs sm:text-sm font-mono text-[#171717] placeholder:text-[#A8ADB2] focus:outline-none"
          />
          <button
            onClick={() => {
              soundFx.playClick()
              handleClose()
            }}
            className="w-8 h-8 flex items-center justify-center text-[#777773] hover:text-[#171717] transition-colors"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#E5E3DE] bg-[#FAFAF8] overflow-x-auto text-[10px] font-mono scrollbar-none">
          {(['ALL', 'NAVIGATION', 'SHADERS', 'TERMINAL', 'ACTIONS'] as PaletteCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playClick()
                setActiveCategory(cat)
                setSelectedIndex(0)
              }}
              className={`px-2.5 py-1 uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-[#171717] text-[#FAFAF8]'
                  : 'text-[#777773] hover:text-[#171717] hover:bg-[#F3F0E9]'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-[9px] text-[#A8ADB2] hidden sm:inline">
            TAB TO CYCLE
          </span>
        </div>

        {/* Live Terminal Output Drawer (If commands were executed) */}
        {terminalLogs.length > 0 && (
          <div className="border-b border-[#E5E3DE] bg-[#171717] text-[#FAFAF8] p-3 text-xs font-mono max-h-40 overflow-y-auto">
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10 text-[10px] text-[#A8ADB2]">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-emerald-400" />
                <span className="uppercase tracking-widest">Live Studio Terminal Buffer</span>
              </div>
              <button
                onClick={() => clearTerminalLogs()}
                className="flex items-center gap-1 text-[#A8ADB2] hover:text-white transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
            <div className="space-y-1.5">
              {terminalLogs.map((log) => (
                <div key={log.id} className="leading-relaxed">
                  <div className="flex items-center gap-2 text-[10px] text-white/50">
                    <span>[{log.timestamp}]</span>
                    <span className="text-emerald-400 font-semibold">$ {log.command}</span>
                  </div>
                  <div className={`pl-4 text-[11px] whitespace-pre-wrap ${
                    log.type === 'error' ? 'text-rose-400' : log.type === 'warning' ? 'text-amber-300' : 'text-[#FAFAF8]'
                  }`}>
                    {log.output}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Split View: Left List + Right Inspector Panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[320px] max-h-[380px]">
          {/* Left Column: Command & Navigation List */}
          <div className="md:col-span-7 overflow-y-auto p-2 border-r-0 md:border-r border-[#E5E3DE]">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-[#777773]">
                No matching actions or commands found.
                <div className="mt-2 text-[10px] text-[#A8ADB2]">
                  Try typing "whoami", "stack", "preset obsidian", or "work".
                </div>
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const isSelected = idx === selectedIndex
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action()
                      if (item.category !== 'Terminal') {
                        handleClose()
                      }
                    }}
                    onMouseEnter={() => {
                      if (selectedIndex !== idx) {
                        soundFx.playHover()
                        setSelectedIndex(idx)
                      }
                    }}
                    className={`w-full min-h-[44px] flex items-center justify-between px-3 py-2 text-left text-xs font-mono transition-colors ${
                      isSelected
                        ? 'bg-[#171717] text-[#FAFAF8]'
                        : 'text-[#171717] hover:bg-[#F3F0E9]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      {item.category === 'Navigation' && <Compass className="w-3.5 h-3.5 shrink-0 opacity-70" />}
                      {item.category === 'Visual Shaders' && <Sparkles className="w-3.5 h-3.5 shrink-0 opacity-70" />}
                      {item.category === 'Terminal' && <Terminal className="w-3.5 h-3.5 shrink-0 opacity-70" />}
                      {item.category === 'Actions' && <Zap className="w-3.5 h-3.5 shrink-0 opacity-70" />}

                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.shortcut && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 border ${
                            isSelected
                              ? 'border-white/20 text-neutral-300 bg-white/10'
                              : 'border-[#E5E3DE] text-[#777773] bg-[#FAFAF8]'
                          }`}
                        >
                          {item.shortcut}
                        </span>
                      )}
                      <ArrowRight
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isSelected ? 'text-white' : 'text-[#777773]'
                        }`}
                      />
                    </div>
                  </button>
                )
              })
            )}
          </div>

          {/* Right Column: Contextual Inspector Pane (Desktop) */}
          <div className="hidden md:flex md:col-span-5 flex-col justify-between p-4 bg-[#FAFAF8] overflow-y-auto">
            {currentItem ? (
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E5E3DE]">
                  <span className="text-[10px] uppercase tracking-widest text-[#777773] font-mono">
                    {currentItem.category}
                  </span>
                  {currentItem.id.startsWith('shader-') && currentItem.id.includes(activePreset) && (
                    <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-emerald-700 font-mono font-semibold">
                      <Check className="w-3 h-3" /> ACTIVE PRESET
                    </span>
                  )}
                </div>

                <h4 className="font-display font-semibold text-sm text-[#171717] mb-2">
                  {currentItem.label}
                </h4>

                <p className="font-body text-xs text-[#777773] leading-relaxed mb-4">
                  {currentItem.description}
                </p>

                {/* Technical Specifications Matrix */}
                {currentItem.spec && (
                  <div className="mt-3 pt-3 border-t border-[#E5E3DE] space-y-2 font-mono text-[11px]">
                    <div className="text-[9px] uppercase tracking-wider text-[#A8ADB2] font-semibold mb-1">
                      Technical Spec
                    </div>
                    {currentItem.spec.map((s) => (
                      <div key={s.label} className="flex items-center justify-between py-0.5">
                        <span className="text-[#777773] text-[10px]">{s.label}</span>
                        <span className="text-[#171717] font-semibold text-[10px]">{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-xs font-mono text-[#A8ADB2]">
                Select an item to inspect
              </div>
            )}

            <div className="pt-4 border-t border-[#E5E3DE] flex items-center justify-between text-[10px] font-mono text-[#777773]">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-[#A8ADB2]" />
                <span>Studio HUD 2.0</span>
              </span>
              <span>ENTER to Run</span>
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#F3F0E9] border-t border-[#E5E3DE] flex items-center justify-between text-[10px] font-mono text-[#777773]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select/Run</span>
            <span>Tab Category</span>
            <span>ESC Close</span>
          </div>
          {copied && (
            <span className="text-emerald-700 font-semibold animate-pulse">
              Email copied to clipboard!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
