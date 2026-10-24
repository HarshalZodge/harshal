import React, { useState, useRef, useCallback, useEffect } from 'react'

interface LiquidCurtainSeamProps {
  label?: string
  className?: string
}

export const LiquidCurtainSeam: React.FC<LiquidCurtainSeamProps> = ({
  label = 'SEAM // LIQUID CHROME 60 FPS',
  className = '',
}) => {
  const seamRef = useRef<HTMLDivElement>(null)
  const glowPathRef = useRef<SVGPathElement>(null)
  const hairlinePathRef = useRef<SVGPathElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const widthRef = useRef(1440)

  const [dimensions, setDimensions] = useState({ width: 1440, height: 60 })
  const [beadX, setBeadX] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Measure container width for responsive SVG path calculation
  useEffect(() => {
    const updateSize = () => {
      if (seamRef.current) {
        const w = seamRef.current.clientWidth || 1440
        widthRef.current = w
        setDimensions({ width: w, height: 60 })
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Zero-render scroll flexure animation with self-sleeping spring RAF loop
  useEffect(() => {
    let animId: number | null = null
    let targetFlex = 0
    let currentFlex = 0

    const update = () => {
      currentFlex += (targetFlex - currentFlex) * 0.18
      const isSettled = Math.abs(targetFlex - currentFlex) < 0.08 && Math.abs(currentFlex) < 0.08

      if (isSettled) {
        currentFlex = 0
        animId = null
      } else {
        animId = requestAnimationFrame(update)
      }

      const w = widthRef.current
      const d = `M 0,30 Q ${w / 2},${(30 + currentFlex).toFixed(1)} ${w},30`
      if (glowPathRef.current) glowPathRef.current.setAttribute('d', d)
      if (hairlinePathRef.current) hairlinePathRef.current.setAttribute('d', d)
      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate(-50%, calc(-50% + ${(currentFlex * 0.5).toFixed(1)}px))`
      }
    }

    const handleScrollVel = (e: Event) => {
      const v = (e as CustomEvent<number>).detail
      targetFlex = Math.max(Math.min(v * 9.5, 32), -32)
      if (animId === null && Math.abs(targetFlex) > 0.05) {
        animId = requestAnimationFrame(update)
      }
    }
    window.addEventListener('studio:scroll-velocity', handleScrollVel)

    return () => {
      if (animId !== null) cancelAnimationFrame(animId)
      window.removeEventListener('studio:scroll-velocity', handleScrollVel)
    }
  }, [])

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

  const baseCenterY = 30
  const initialPathD = `M 0,${baseCenterY} Q ${dimensions.width / 2},${baseCenterY} ${dimensions.width},${baseCenterY}`

  return (
    <div
      ref={seamRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-[60px] select-none cursor-default overflow-visible ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox={`0 0 ${dimensions.width} 60`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="mercury-seam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="25%" stopColor="#A8ADB2" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#A8ADB2" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Ambient Fluid Glow Path */}
        <path
          ref={glowPathRef}
          d={initialPathD}
          fill="none"
          stroke="url(#mercury-seam-grad)"
          strokeWidth="3"
          className="opacity-80"
        />

        {/* Crisp Hairline Structural Rule */}
        <path
          ref={hairlinePathRef}
          d={initialPathD}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[#E5E3DE] dark:text-[#242730]"
        />
      </svg>

      {/* Interactive Molten Mercury Bead tracking mouse hover */}
      {isHovered && beadX !== null && (
        <div
          className="absolute pointer-events-none transition-transform duration-75 ease-out"
          style={{
            left: `${beadX}px`,
            top: `${baseCenterY}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Specular Droplet */}
          <div className="w-14 h-2 rounded-full bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_24px_rgba(168,173,178,0.6)]" />
          <div className="w-2.5 h-2.5 mx-auto -mt-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      )}

      {/* Technical Seam Label in Center */}
      <div
        ref={badgeRef}
        className="absolute left-1/2 -translate-x-1/2 px-3 bg-[#FAFAF8] dark:bg-[#0D0E11] text-[9px] font-mono uppercase tracking-widest text-[#A8ADB2] border border-[#E5E3DE] dark:border-[#242730] transition-transform duration-150 ease-out"
        style={{
          top: `${baseCenterY}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {label}
      </div>
    </div>
  )
}
