import React, { useState, useEffect } from 'react'
import { LiquidChromeCanvas } from './LiquidChromeCanvas'
import { useStudio } from '../../hooks/useStudio'

export const GlobalChromeAtmosphere: React.FC = () => {
  const { activePreset } = useStudio()
  const [isPastHero, setIsPastHero] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      // Fade in atmospheric liquid canvas once user scrolls past hero section to prevent dual-canvas GPU contention
      const past = window.scrollY > (window.innerHeight * 0.85)
      setIsPastHero((prev) => (prev !== past ? past : prev))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ${
        isPastHero ? 'opacity-22 dark:opacity-32' : 'opacity-0'
      }`}
    >
      <LiquidChromeCanvas
        preset={activePreset}
        interactive={true}
        strength={1.3}
        deformation={1.15}
        fadeEdges={false}
        active={isPastHero}
        dprScale={0.65}
        className="w-full h-full"
      />
    </div>
  )
}
