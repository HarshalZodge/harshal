import React, { useState, useRef, useCallback } from 'react'

interface LiquidTextLensProps {
  children: React.ReactNode
  className?: string
}

export const LiquidTextLens: React.FC<LiquidTextLensProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setLensPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setLensPos(null)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none cursor-default ${className}`}
      data-cursor="displace"
    >
      {/* Base Sharp Typography Layer */}
      <div className="relative z-10 transition-opacity duration-300">
        {children}
      </div>

      {/* Interactive Liquid Refraction & Chromatic Aberration Bubble */}
      {isHovered && lensPos && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden mix-blend-difference hidden sm:block"
        >
          {/* Radial Liquid Mask following cursor */}
          <div
            className="absolute transition-transform duration-75 ease-out"
            style={{
              left: `${lensPos.x}px`,
              top: `${lensPos.y}px`,
              transform: 'translate(-50%, -50%)',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 55%, transparent 75%)',
              filter: 'blur(1px)',
            }}
          />
        </div>
      )}

      {/* Optical Specular Glint Lens Ring */}
      {isHovered && lensPos && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-30 hidden sm:block transition-transform duration-100 ease-out"
          style={{
            left: `${lensPos.x}px`,
            top: `${lensPos.y}px`,
            transform: 'translate(-50%, -50%)',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 0 24px rgba(255, 255, 255, 0.25), inset 0 0 12px rgba(255, 255, 255, 0.2)',
          }}
        />
      )}
    </div>
  )
}
