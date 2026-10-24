import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '../../data/siteConfig'
import { useStudio } from '../../hooks/useStudio'
import { Menu, X, ArrowUpRight, Command, Volume2, VolumeX, Sun, Moon, FileText } from 'lucide-react'

interface NavbarProps {
  onOpenCommandPalette?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const {
    openCommandPalette: studioOpenPalette,
    soundEnabled,
    toggleSound,
    theme,
    toggleTheme,
    openResume,
    fontPreset,
    cycleFontPreset,
  } = useStudio()
  const handleOpenPalette = onOpenCommandPalette || studioOpenPalette
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Monitor scroll state for backdrop blur & active section without layout thrashing
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 25
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    const sections = ['about', 'skills', 'work', 'certifications', 'journey', 'lab', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  // Handle Escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 sm:py-3.5 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#E5E3DE] shadow-[0_2px_16px_rgba(23,23,23,0.04)]'
            : 'py-5 sm:py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Brand Wordmark & Monogram */}
          <a
            href="#"
            className="group flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2"
            aria-label={`${siteConfig.identity.name} home`}
          >
            <div className="w-8 h-8 rounded-none bg-[#171717] text-[#FAFAF8] flex items-center justify-center font-display font-extrabold text-sm tracking-wider transition-transform duration-300 group-hover:scale-105 shadow-sm">
              {siteConfig.identity.monogram}
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-[15px] tracking-[-0.015em] text-[#171717] group-hover:text-[#41464B] transition-colors leading-tight">
                {siteConfig.identity.name}
              </span>
              <span className="font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[#777773] leading-tight mt-0.5">
                {siteConfig.identity.role}
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-none bg-[#FAFAF8]/80 border border-[#E5E3DE] backdrop-blur-md shadow-sm"
          >
            {siteConfig.navigation.map((item) => {
              const sectionId = item.href.replace('#', '')
              const isActive = activeSection === sectionId

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-3.5 py-1 text-[11px] font-body font-semibold uppercase tracking-[0.14em] transition-all focus-visible:ring-2 focus-visible:ring-[#171717] ${
                    isActive
                      ? 'text-[#171717]'
                      : 'text-[#777773] hover:text-[#171717]'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[8.5px] font-body font-bold uppercase tracking-wider bg-[#171717] text-[#FAFAF8]">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-indicator"
                      className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#171717]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Right Action: Typography Selector + Quick Shortcuts + Status + Contact CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Dynamic Typography Preset Toggle */}
            <button
              onClick={cycleFontPreset}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono border border-[#E5E3DE] hover:border-[#171717] bg-[#FAFAF8] text-[#171717] hover:bg-[#F3F0E9] transition-all"
              title={`Active Typography: ${fontPreset.toUpperCase()} — Click to cycle curated aesthetics (Syne, Clash Display, Unbounded, Modernist)`}
              aria-label="Cycle typography aesthetic"
            >
              <span className="font-display font-extrabold text-xs">Aa</span>
              <span className="text-[9px] font-mono uppercase tracking-wider">{fontPreset}</span>
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={handleOpenPalette}
              className="flex items-center gap-1.5 px-2 py-1.5 text-[11px] font-mono text-[#777773] hover:text-[#171717] border border-[#E5E3DE] hover:border-[#171717] transition-all bg-[#FAFAF8] focus-visible:ring-2 focus-visible:ring-[#171717]"
              aria-label="Open command palette"
              title="Press Ctrl+K or Cmd+K"
            >
              <Command className="w-3 h-3" />
              <span className="text-[10px]">⌘K</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`flex items-center gap-1.5 px-2 py-1.5 text-[11px] font-mono border transition-all ${
                soundEnabled
                  ? 'bg-[#171717] text-[#FAFAF8] border-[#171717]'
                  : 'bg-[#FAFAF8] text-[#777773] hover:text-[#171717] border-[#E5E3DE] hover:border-[#171717]'
              }`}
              title={soundEnabled ? 'Mute Procedural Web Audio' : 'Enable Procedural Web Audio'}
              aria-label={soundEnabled ? 'Mute procedural audio' : 'Enable procedural audio'}
            >
              {soundEnabled ? (
                <Volume2 className="w-3 h-3 text-emerald-400" />
              ) : (
                <VolumeX className="w-3 h-3" />
              )}
              <span className="text-[10px] uppercase">SFX</span>
            </button>

            {/* Swiss Resume Modal Trigger */}
            <button
              onClick={openResume}
              className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-mono text-[#171717] border border-[#E5E3DE] hover:border-[#171717] transition-all bg-[#FAFAF8]"
              title="Launch Swiss Modernist Resume / Print View"
              aria-label="Open resume view"
            >
              <FileText className="w-3 h-3 text-[#777773]" />
              <span className="text-[10px] uppercase font-semibold">CV</span>
            </button>

            {/* Theme Toggle (Ivory / Obsidian) */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-2 py-1.5 text-[11px] font-mono border border-[#E5E3DE] hover:border-[#171717] bg-[#FAFAF8] text-[#777773] hover:text-[#171717] transition-all"
              title={`Switch to ${theme === 'ivory' ? 'Obsidian' : 'Ivory'} Studio Theme`}
              aria-label="Toggle studio theme"
            >
              {theme === 'obsidian' ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3" />}
              <span className="text-[10px] uppercase hidden xl:inline">{theme}</span>
            </button>

            {/* Availability indicator */}
            <div className="flex items-center gap-2 px-2.5 py-1 text-[11px] font-body border border-[#E5E3DE] bg-[#FFFFFF]/90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#555]">
                Open for 2025/2026
              </span>
            </div>

            {/* Direct CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#171717] text-[#FAFAF8] text-xs font-body font-semibold uppercase tracking-[0.14em] hover:bg-[#333] transition-colors focus-visible:ring-2 focus-visible:ring-[#171717]"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button (375px–768px) */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleOpenPalette}
              className="w-10 h-10 flex items-center justify-center text-[#171717] border border-[#E5E3DE] bg-[#FAFAF8] active:bg-[#E5E3DE]"
              aria-label="Open command palette"
            >
              <Command className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-[#171717] border border-[#E5E3DE] bg-[#FAFAF8] active:bg-[#E5E3DE] focus-visible:ring-2 focus-visible:ring-[#171717]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#171717]/40 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#FAFAF8] border-l border-[#E5E3DE] p-6 sm:p-8 flex flex-col justify-between shadow-2xl animate-slide-left"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E5E3DE]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-[#171717] text-[#FAFAF8] flex items-center justify-center font-display font-bold text-xs">
                    {siteConfig.identity.monogram}
                  </div>
                  <span className="font-display font-semibold text-sm">
                    {siteConfig.identity.name}
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-[#777773] hover:text-[#171717]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation list with guaranteed 44px+ touch heights */}
              <nav className="mt-6 flex flex-col space-y-2">
                {siteConfig.navigation.map((item, idx) => {
                  const sectionId = item.href.replace('#', '')
                  const isActive = activeSection === sectionId

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`min-h-[44px] flex items-center justify-between px-3 py-2.5 text-xs font-body font-semibold uppercase tracking-[0.16em] border-b border-[#E5E3DE]/50 transition-colors ${
                        isActive
                          ? 'text-[#171717] font-bold bg-[#F3F0E9]/80'
                          : 'text-[#777773] hover:text-[#171717]'
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="text-[10px] font-mono text-[#777773] mr-2.5">0{idx + 1}.</span>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[8.5px] font-bold bg-[#171717] text-white">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  )
                })}
              </nav>
            </div>

            {/* Mobile Footer Status & Audio & CTA */}
            <div className="pt-6 border-t border-[#E5E3DE] space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#777773]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{siteConfig.identity.availability.label}</span>
                </div>
                <button
                  onClick={toggleSound}
                  className="flex items-center gap-1.5 px-2 py-1 border border-[#E5E3DE] text-[10px] uppercase bg-white"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <VolumeX className="w-3 h-3" />
                  )}
                  <span>{soundEnabled ? 'SFX ON' : 'SFX OFF'}</span>
                </button>
              </div>
              {/* Mobile Quick Action Buttons (CV, Theme, SFX) */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    openResume()
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 border border-[#E5E3DE] bg-[#FFFFFF] text-xs font-mono uppercase"
                >
                  <FileText className="w-3.5 h-3.5 text-[#777773]" />
                  <span>View CV</span>
                </button>

                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-1.5 py-2 border border-[#E5E3DE] bg-[#FFFFFF] text-xs font-mono uppercase"
                >
                  {theme === 'obsidian' ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{theme === 'obsidian' ? 'Ivory' : 'Obsidian'}</span>
                </button>
              </div>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 bg-[#171717] text-[#FAFAF8] text-xs font-mono uppercase tracking-wider hover:bg-[#333] transition-colors"
              >
                <span>Initiate Contact</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
