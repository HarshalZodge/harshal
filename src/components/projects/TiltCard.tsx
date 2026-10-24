import React, { useRef, useCallback } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  'data-cursor'?: string
  onClick?: () => void
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  'data-cursor': dataCursor,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Normalized coordinates from -0.5 to 0.5
    const normX = x / rect.width - 0.5
    const normY = y / rect.height - 0.5

    // Restrained, premium tilt (max 3.5 degrees) applied directly to GPU transform
    const rotX = (-normY * 5).toFixed(1)
    const rotY = (normX * 5).toFixed(1)
    const gx = ((x / rect.width) * 100).toFixed(1)
    const gy = ((y / rect.height) * 100).toFixed(1)

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
    card.style.transition = 'none'

    if (glareRef.current) {
      glareRef.current.style.opacity = '0.24'
      glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.85) 0%, rgba(168, 173, 178, 0.3) 40%, rgba(255, 255, 255, 0) 65%)`
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'

    if (glareRef.current) {
      glareRef.current.style.opacity = '0'
    }
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor={dataCursor}
      className={`relative will-change-transform ${className}`}
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      }}
    >
      {children}

      {/* Dynamic Specular Liquid Chrome Glare following pointer */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
        aria-hidden="true"
      />
    </div>
  )
}
