import React, { useRef, useState } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  'data-cursor'?: string
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.28,
  onClick,
  'data-cursor': dataCursor,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor={dataCursor}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  )
}
