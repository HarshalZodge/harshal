import React, { useState, useEffect } from 'react'
import { siteConfig } from '../../data/siteConfig'
import { ArrowUp, ShieldCheck } from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

export const Footer: React.FC = () => {
  const [timeString, setTimeString] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Display IST (UTC+5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      setTimeString(new Intl.DateTimeFormat('en-US', options).format(now))
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#FAFAF8] text-[#171717] border-t border-[#E5E3DE] py-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#E5E3DE]">
          {/* Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#171717] text-white flex items-center justify-center font-display font-bold text-xs">
                {siteConfig.identity.monogram}
              </div>
              <span className="font-display font-bold text-base tracking-tight">
                {siteConfig.identity.name}
              </span>
            </div>
            <p className="font-body text-xs text-[#777773] max-w-sm leading-relaxed">
              {siteConfig.identity.primaryTagline}
            </p>
          </div>

          {/* Quick Section Anchors */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs font-mono uppercase tracking-wider">
            <div className="space-y-2">
              <a href="#work" className="block text-[#777773] hover:text-[#171717] transition-colors">
                • Selected Work
              </a>
              <a href="#about" className="block text-[#777773] hover:text-[#171717] transition-colors">
                • Biography
              </a>
              <a href="#skills" className="block text-[#777773] hover:text-[#171717] transition-colors">
                • Technology
              </a>
            </div>
            <div className="space-y-2">
              <a href="#journey" className="block text-[#777773] hover:text-[#171717] transition-colors">
                • Milestones
              </a>
              <a href="#lab" className="block text-[#777773] hover:text-[#171717] transition-colors">
                • The Lab
              </a>
              <a href="#contact" className="block text-[#777773] hover:text-[#171717] transition-colors">
                • Contact
              </a>
            </div>
          </div>

          {/* Local Coordinates & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div className="text-left md:text-right">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#777773] block mb-1">
                Local Time (IST)
              </span>
              <span className="font-mono text-sm text-[#171717] font-semibold tracking-wider">
                {timeString || '12:00:00'} UTC+5:30
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 md:mt-0 inline-flex items-center gap-2 px-3.5 py-2 border border-[#E5E3DE] hover:border-[#171717] bg-[#FAFAF8] text-xs font-mono uppercase tracking-wider transition-colors"
              aria-label="Back to top of page"
            >
              <span>Back to Apex</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#777773]">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {CURRENT_YEAR} {siteConfig.identity.name}.</span>
            <span className="hidden sm:inline">•</span>
            <span>Crafted with React, TypeScript, Three.js & GLSL Shaders.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>WCAG 2.2 AA Compliant</span>
            </span>
            <span>•</span>
            <span>60 FPS WebGL2</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
