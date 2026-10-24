import React, { useState, useRef, useCallback } from 'react'
import { motion, type Variants } from 'framer-motion'
import { siteConfig } from '../data/siteConfig'
import { LiquidChromeCanvas, type ChromePreset } from '../components/chrome/LiquidChromeCanvas'
import { LiquidTextLens } from '../components/hero/LiquidTextLens'
import { useStudio } from '../hooks/useStudio'
import { MagneticButton } from '../components/ui/MagneticButton'
import { ArrowDown, ArrowUpRight, Sparkles, Sliders } from 'lucide-react'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const HeroSection: React.FC = () => {
  const { activePreset, setPreset } = useStudio()
  const [showPresetControls, setShowPresetControls] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current || !contentRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const normX = (e.clientX - rect.left) / rect.width - 0.5
    const normY = (e.clientY - rect.top) / rect.height - 0.5
    // Subtle, luxurious parallax (max 14px) applied directly to GPU transform without React re-render
    const px = (-normX * 14).toFixed(1)
    const py = (-normY * 14).toFixed(1)
    contentRef.current.style.transform = `translate3d(${px}px, ${py}px, 0)`
  }, [])

  const handleHeroMouseLeave = useCallback(() => {
    if (contentRef.current) {
      contentRef.current.style.transform = 'translate3d(0px, 0px, 0)'
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative min-h-[92svh] lg:min-h-screen w-full flex flex-col justify-between pt-20 sm:pt-24 pb-8 sm:pb-12 overflow-hidden border-b border-[#E5E3DE]"
    >
      {/* Background Liquid Chrome Visual Canvas */}
      <div
        className="absolute inset-0 z-0 pointer-events-auto opacity-100 transition-opacity duration-700"
        aria-hidden="true"
        data-cursor="displace"
      >
        <LiquidChromeCanvas
          preset={activePreset}
          interactive={true}
          strength={1.2}
          deformation={1.1}
          fadeEdges={true}
          className="w-full h-full"
        />
      </div>

      {/* Editorial directional gradient to preserve typography contrast while unveiling flowing liquid chrome */}
      <div className="absolute inset-0 z-10 pointer-events-none hero-gradient-veil" />

      {/* Main Content Grid with Mouse Parallax Depth */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-[1440px] mx-auto w-full px-5 sm:px-8 md:px-12 flex-1 flex flex-col justify-center transition-transform duration-500 ease-out will-change-transform"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl lg:max-w-3xl pt-6 sm:pt-8 pb-8 sm:pb-12"
        >
          {/* Eyebrow / Technical Classification */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-3 py-1 mb-5 sm:mb-6 border border-[#E5E3DE] bg-[#FAFAF8]/95 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-[#171717]" />
            <span className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#171717] font-semibold">
              {siteConfig.hero.eyebrow}
            </span>
          </motion.div>

          {/* Large Hero Headline with Liquid Refraction Lens */}
          <LiquidTextLens>
            <motion.h1
              variants={itemVariants}
              className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] tracking-[-0.035em] text-[#171717] leading-[1.02] mb-6 sm:mb-8"
            >
              <span className="block">{siteConfig.hero.headline.line1}</span>
              <span className="block italic font-medium text-[#26282C] font-display">
                {siteConfig.hero.headline.line2}
              </span>
            </motion.h1>
          </LiquidTextLens>

          {/* Editorial Paragraph */}
          <motion.p
            variants={itemVariants}
            className="font-body text-base sm:text-lg lg:text-xl text-[#26282C] leading-relaxed max-w-xl mb-8 sm:mb-10 font-normal"
          >
            {siteConfig.hero.description}
          </motion.p>

          {/* Action CTAs & Preset Selector */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 sm:gap-4">
            <MagneticButton data-cursor="explore">
              <a
                href={siteConfig.hero.primaryCta.href}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#171717] text-[#FAFAF8] text-xs font-body font-semibold uppercase tracking-[0.16em] hover:bg-[#333] transition-all hover:translate-y-[-1px] shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717]"
              >
                <span>{siteConfig.hero.primaryCta.label}</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href={siteConfig.hero.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#FAFAF8]/90 border border-[#E5E3DE] hover:border-[#171717] text-[#171717] text-xs font-body font-semibold uppercase tracking-[0.16em] backdrop-blur-sm transition-all hover:translate-y-[-1px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717]"
              >
                <span>{siteConfig.hero.secondaryCta.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </MagneticButton>

            {/* Quick Shader Preset Button (Responsive) */}
            <button
              onClick={() => setShowPresetControls(!showPresetControls)}
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-3 sm:py-3.5 border border-[#E5E3DE] bg-[#FAFAF8]/80 hover:bg-[#FFFFFF] text-[#777773] hover:text-[#171717] text-xs font-mono transition-all"
              title="Change Chrome Shader Preset"
              aria-label="Change Chrome Shader Preset"
              data-cursor="preset"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider">
                Material: <strong className="text-[#171717] capitalize">{activePreset}</strong>
              </span>
            </button>
          </motion.div>

          {/* Popover Preset Controls */}
          {showPresetControls && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-[#FAFAF8]/95 backdrop-blur-md border border-[#E5E3DE] flex flex-wrap items-center gap-2 shadow-lg"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#777773] mr-1">
                Shader Material:
              </span>
              {(['mercury', 'obsidian', 'iridescent', 'gold'] as ChromePreset[]).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPreset(p)
                    setShowPresetControls(false)
                  }}
                  className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-all border ${
                    activePreset === p
                      ? 'bg-[#171717] text-[#FAFAF8] border-[#171717]'
                      : 'bg-transparent text-[#777773] hover:text-[#171717] border-transparent hover:border-[#E5E3DE]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Hero Bottom Telemetry & Scroll Prompt */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-5 sm:px-8 md:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 sm:pt-6 border-t border-[#E5E3DE]/60">
        <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-mono text-[#777773]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#171717]" />
            <span className="uppercase tracking-wider">Interactive WebGL2 Canvas</span>
          </div>
          <span className="hidden md:inline text-[#E5E3DE]">/</span>
          <span className="hidden md:inline uppercase tracking-wider">
            Raymarched & Domain-Warped Fluid
          </span>
        </div>

        {/* Animated Scroll Prompt */}
        <a
          href="#work"
          className="group flex items-center gap-2.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#171717] hover:text-[#777773] transition-colors"
          data-cursor="explore"
        >
          <span>Scroll to inspect systems</span>
          <span className="relative flex items-center w-8 h-[1px] bg-[#171717] overflow-hidden">
            <span className="absolute inset-0 bg-[#777773] animate-pulse" />
          </span>
        </a>
      </div>
    </section>
  )
}
