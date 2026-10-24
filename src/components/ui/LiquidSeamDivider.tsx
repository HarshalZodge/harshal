import React, { useState, useRef, useCallback } from 'react'

interface LiquidSeamDividerProps {
  label?: string
  className?: string
}

export const LiquidSeamDivider: React.FC<LiquidSeamDividerProps> = ({
  label = 'LIQUID SEAM // 60 FPS',
  className = '',
}) => {
  const seamRef = useRef<HTMLDivElement>(null)
  const [beadX, setBeadX] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!seamRef.current) return
    const rect = seamRef.current.getBoundingClientRect()
    setBeadX(e.clientX - rect.left)
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setBeadX(null)
  }, [])

  return (
    <div
      ref={seamRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full py-4 select-none cursor-default overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Base Hairline Rule */}
      <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-[#E5E3DE] to-transparent dark:via-[#242730]" />

      {/* Shimmering Liquid Chrome Wave along Seam */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] opacity-70 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(168, 173, 178, 0.4) 20%, rgba(255, 255, 255, 0.95) 50%, rgba(168, 173, 178, 0.4) 80%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'chrome-shimmer 6s linear infinite',
        }}
      />

      {/* Interactive Cursor-Tracking Molten Mercury Bead */}
      {isHovered && beadX !== null && (
        <div
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-75 ease-out"
          style={{
            left: `${beadX}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Specular Droplet */}
          <div className="w-16 h-2 rounded-full bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_24px_rgba(168,173,178,0.6)]" />
          <div className="w-3 h-3 mx-auto -mt-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      )}

      {/* Technical Seam Label in Center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-[#FAFAF8] dark:bg-[#0D0E11] text-[9px] font-mono uppercase tracking-widest text-[#A8ADB2] border border-[#E5E3DE] dark:border-[#242730]">
        {label}
      </div>
    </div>
  )
}
